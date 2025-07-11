import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, phone, Date, message } = await req.json();

  if (!name || !email || !Date || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
      const emailText = `
    📨 New Quick Request

    🧑 From:
    Name: ${name}
    Email: ${email}
    Phone: ${phone}

    📅 Policy Start Date:
    ${Date || 'Not provided'}
    `.trim();

    const mBody = {
      email,
      emailText,
    };

    // const res = await fetch("https://hooks.zapier.com/hooks/catch/21501396/u3kbtu8/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ mBody })
    // })

    const sheetPayload = {
      Name: name,
      Email: email, 
      Phone: phone,
      PolicyStartDate: Date,
      EmailText: emailText

    }    
    const sheet = await fetch("https://hooks.zapier.com/hooks/catch/21501396/u3kbtu8/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sheetPayload })
    })


    return NextResponse.json({ success: true, res: sheet });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
