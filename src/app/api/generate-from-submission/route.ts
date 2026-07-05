import { NextRequest, NextResponse } from 'next/server';
import { getSubmissions } from '@/lib/sheets';
import { generatePostContent, PartialPost } from '@/lib/gemini';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    try {
        const { submissionId } = await req.json();

        if (!submissionId) {
            return NextResponse.json({ error: 'Missing submissionId' }, { status: 400 });
        }

        // Fetch all submissions to find the one to process
        const submissions = await getSubmissions();
        const submission = submissions.find(s => s.id === submissionId);

        if (!submission) {
            return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
        }

        // Generate content using Gemini based on the submission's title and story
        const partialPost = {
            title: submission.title,
            body: submission.story,
            category: submission.keywords.join(', '),
            authorName: submission.name,
        };

        const randomHash = Math.random().toString(36).substring(2, 6);

        try {
            const geminiResult = await generatePostContent(partialPost);
            
            const baseSlug = geminiResult.slug || submission.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const finalSlug = `${baseSlug}-${randomHash}`;

            const processedData = {
                title: geminiResult.title || submission.title,
                slug: finalSlug,
                excerpt: geminiResult.excerpt || '',
                body: geminiResult.body || submission.story,
                readTime: geminiResult.readTime || '5 min',
                category: geminiResult.category || submission.keywords.join(', ') || 'Uncategorized',
                authorName: submission.name,
                image: submission.uploadedImageUrl || '',
            };

            return NextResponse.json({ success: true, data: processedData });
        } catch (err) {
            console.error("Gemini failed in generate-from-submission:", err);
            
            const baseSlug = submission.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const finalSlug = `${baseSlug}-${randomHash}`;
            
            // Fallback if AI fails, simply format what we have
            const fallbackData = {
                title: submission.title,
                slug: finalSlug,
                excerpt: submission.story.substring(0, 150) + '...',
                body: submission.story,
                readTime: '5 min',
                category: submission.keywords.join(', ') || 'Uncategorized',
                authorName: submission.name,
                image: submission.uploadedImageUrl || '',
            };

            return NextResponse.json({ success: true, data: fallbackData, fallback: true });
        }
    } catch (error) {
        console.error('Error in /api/generate-from-submission:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
