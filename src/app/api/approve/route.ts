import { NextRequest, NextResponse } from 'next/server';
import { getSubmissions, updateSubmissionStatus } from '@/lib/sheets';
import { sendRejectionEmail } from '@/lib/email';
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || session.user?.email !== process.env.OWNER_EMAIL) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { id, action } = await req.json();

        if (!id || !action) {
            return NextResponse.json({ error: 'Missing id or action' }, { status: 400 });
        }

        if (action === 'reject') {
            const success = await updateSubmissionStatus(id, 'rejected');
            if (success) {
                // Fetch submission to get email
                const submissions = await getSubmissions();
                const submission = submissions.find(s => s.id === id);
                if (submission?.email) {
                    await sendRejectionEmail({ to: submission.email, name: submission.name }).catch(console.error);
                }
                return NextResponse.json({ success: true, message: 'Submission rejected' });
            } else {
                return NextResponse.json({ error: 'Failed to reject submission' }, { status: 500 });
            }
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Error in /api/approve:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
