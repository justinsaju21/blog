import { NextRequest, NextResponse } from 'next/server';
import { generatePostContent } from '@/lib/gemini';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = await generatePostContent(body);
        
        return NextResponse.json({ success: true, data: result });
    } catch (error: unknown) {
        console.error("Generate Post error:", error);
        const msg = error instanceof Error ? error.message : 'Internal error';
        return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
}
