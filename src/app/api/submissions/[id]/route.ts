import { NextRequest, NextResponse } from 'next/server';
import { deleteSubmission } from '@/lib/sheets';
import { auth } from "@/lib/auth";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || session.user?.email !== process.env.OWNER_EMAIL) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const resolvedParams = await params;
        const success = await deleteSubmission(resolvedParams.id);
        
        if (success) {
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ success: false, error: 'Failed to delete submission' }, { status: 500 });
    } catch (error: unknown) {
        console.error("Delete error:", error);
        return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
    }
}
