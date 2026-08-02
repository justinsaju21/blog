import { NextRequest, NextResponse } from 'next/server';
import { updatePost, deletePost } from '@/lib/sheets';
import { auth } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || session.user?.email !== process.env.OWNER_EMAIL) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const resolvedParams = await params;
        const body = await req.json();
        const success = await updatePost(resolvedParams.id, body);
        
        if (success) {
            await fetch(`${process.env.AUTH_URL}/api/revalidate`, {
                method: 'POST',
                headers: { 'x-revalidate-secret': process.env.AUTH_SECRET || '' }
            }).catch(console.error);
            
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ success: false, error: 'Failed to update post' }, { status: 500 });
    } catch (error: unknown) {
        console.error("Update error:", error);
        return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || session.user?.email !== process.env.OWNER_EMAIL) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const resolvedParams = await params;
        const success = await deletePost(resolvedParams.id);
        
        if (success) {
            await fetch(`${process.env.AUTH_URL}/api/revalidate`, {
                method: 'POST',
                headers: { 'x-revalidate-secret': process.env.AUTH_SECRET || '' }
            }).catch(console.error);
            
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ success: false, error: 'Failed to delete post' }, { status: 500 });
    } catch (error: unknown) {
        console.error("Delete error:", error);
        return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
    }
}
