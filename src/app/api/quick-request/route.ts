import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { vehType, phone } = await req.json();

  if ( !vehType || !phone ) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const payload = {
    VehicleType: vehType,
    Phone: phone
  }

  try {
    const res = await fetch('https://hooks.zapier.com/hooks/catch/21501396/u37fcll/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ success: true, res: res });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
