import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission } from '@/lib/sheets';
import { sendSubmissionConfirmationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const title = formData.get('title') as string;
        const keywords = (formData.get('keywords') as string || '').split(',').map(k => k.trim());
        const story = formData.get('story') as string;
        
        const uploadedImageUrl = (formData.get('image') as string) || '';

        const id = await insertSubmission({
            name,
            email,
            title,
            keywords,
            story,
            uploadedImageUrl,
        });

        // Send confirmation email (fire and wait)
        if (email) {
            await sendSubmissionConfirmationEmail({ to: email, name }).catch(console.error);
        }

        return NextResponse.json({ success: true, id });
    } catch (error: unknown) {
        console.error("Submission error:", error);
        const msg = error instanceof Error ? error.message : 'Internal error';
        return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
}
