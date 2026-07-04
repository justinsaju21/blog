import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
    const secret = req.headers.get('x-revalidate-secret');
    
    if (secret !== process.env.AUTH_SECRET) {
        return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    try {
        revalidatePath('/', 'layout');
        return NextResponse.json({ success: true, message: 'Revalidated successfully' });
    } catch (err) {
        return NextResponse.json({ success: false, message: 'Error revalidating' }, { status: 500 });
    }
}
