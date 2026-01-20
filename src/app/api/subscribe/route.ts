import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email } = await request.json();

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const API_KEY = process.env.CONVERTKIT_API_KEY;
    const FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID;

    if (!API_KEY || !FORM_ID) {
        return NextResponse.json({ error: 'Missing ConvertKit configuration' }, { status: 500 });
    }

    try {
        const res = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: API_KEY,
                email: email,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ error: data.message || 'Something went wrong' }, { status: res.status });
        }

        return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
    } catch (_error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
