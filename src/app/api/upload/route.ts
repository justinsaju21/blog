import { NextRequest, NextResponse } from 'next/server';
import { insertPost, updateSubmissionStatus, getSubmissions } from '@/lib/sheets';
import { sendApprovalEmail } from '@/lib/email';
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || session.user?.email !== process.env.OWNER_EMAIL) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const category = formData.get('category') as string;
        const readTime = formData.get('readTime') as string;
        const authorName = formData.get('authorName') as string;
        const excerpt = formData.get('excerpt') as string;
        const body = formData.get('body') as string;
        
        const cloudinaryId = (formData.get('image') as string) || '';
        const submissionId = formData.get('submissionId') as string | null;

        // Ensure unique slug
        const randomHash = Math.random().toString(36).substring(2, 6);
        let finalSlug = slug;
        if (!finalSlug.match(/-[a-z0-9]{4}$/)) {
            finalSlug = `${finalSlug}-${randomHash}`;
        }

        const id = await insertPost({
            title,
            slug: finalSlug,
            category,
            readTime,
            authorName,
            excerpt,
            body,
            cloudinaryId,
        });

        if (submissionId) {
            await updateSubmissionStatus(submissionId, 'approved');
            
            const submissions = await getSubmissions();
            const submission = submissions.find(s => s.id === submissionId);
            
            if (submission?.email) {
                await sendApprovalEmail({
                    to: submission.email,
                    name: submission.name,
                    articleTitle: title,
                    articleSlug: slug,
                }).catch(console.error); // Catch but don't fail upload
            }
        }
        
        // Trigger on-demand revalidation to ensure the site updates instantly
        await fetch(`${process.env.AUTH_URL}/api/revalidate`, {
            method: 'POST',
            headers: { 'x-revalidate-secret': process.env.AUTH_SECRET || '' }
        }).catch(console.error);

        return NextResponse.json({ success: true, id });
    } catch (error: unknown) {
        console.error("Upload error:", error);
        const msg = error instanceof Error ? error.message : 'Internal error';
        return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
}
