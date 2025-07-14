import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const payload = await req.json();

  if (!payload || payload === null) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.GMAIL_USER,
  //     pass: process.env.GMAIL_PASS,
  //   },
  // });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Destructure key fields for email preview
    const {
      quoteRequest = {},
      step1 = {},
      step2 = {},
      step3 = {},
      step5 = {},
      step6 = {},
      vehicles = [],
    } = payload;

    const fullName = `${step2.firstName || ''} ${step2.middleInitial || ''} ${step2.lastName || ''} ${step2.suffix || ''}`.trim();
    const dob = step2.dob || '';
    const email = step2.email || '';
    const phone = step2.phone1 + step2.phone2 + step2.phone3 || '';
    const businessName = step1.businessName || '';
    const zipCode = step2.zipCode || '';
    const policyStartDate = payload.quoteRequest?.policyStartDate || ''; // if this field exists

    // Build plain text email
    const emailText = `
    🚗 Routeway Insurance Quote Request

    📄 Applicant Info
    -----------------
    Name: ${fullName}
    DOB: ${dob}
    Email: ${email}
    Phone: ${phone}
    Zip Code: ${zipCode}

    🏢 Business Info
    -----------------
    Business Name: ${businessName}
    Business Structure: ${step1.businessStructure || ''}
    DBA Name: ${step1.dbaName || ''}
    USDOT Number Status: ${step1.usdotNumberStatus || ''}
    Keyword: ${step1.businessKeyword || ''}

    🚘 Vehicle Info
    -----------------
    Number of Vehicles: ${vehicles.length}
    Policy Start Date: ${policyStartDate}

    📬 Message sent via form
    ------------------------
    This is an automated submission from the Routeway Insurance quote form.
    `;

    // const emailResponse = await transporter.sendMail({
    //   from: process.env.GMAIL_USER,
    //   to: email, // or a static recipient
    //   subject: 'Routeway Insurance Quote Request',
    //   text: emailText,
    // });

    // console.log('Email sent:', emailResponse.response);
    // const flattenedVehicles = vehicles
    // .map((v, i) => 
    //   `Vehicle ${i + 1}: ${v.year || ''} ${v.make || ''} - ${v.vehicleType || ''}, ${v.grossWeight || ''} lbs`
    // )
    // .join('\n');
    
    // Build Google Sheet payload (your existing structure)
    const sheetPayload = {
      policyStart: policyStartDate,
      phone: phone,
      email: email,
      vehicleType: quoteRequest.vehicleType || '',
      zipCode: zipCode,
      businessKeyword: step1.businessKeyword || '',
      businessName: businessName,
      businessStructure: step1.businessStructure || '',
      dbaName: step1.dbaName || '',
      usdotNumberStatus: step1.usdotNumberStatus || '',
      usDotNumber: step1.usDotNumber || '',
      city: step2.city || '',
      state: step2.state || '',
      dob: dob,
      firstName: step2.firstName || '',
      lastName: step2.lastName || '',
      middleInitial: step2.middleInitial || '',
      phoneFull: step2.phone1 + step2.phone2 + step2.phone3 || '',
      // ssn: step2.ssn || '',
      streetAddress: step2.streetAddress || '',
      suffix: step2.suffix || '',
      addVehicleBy: step3.addVehicleBy || '',
      antiLockBrakes: step3.antiLockBrakes || '',
      antiTheftDevices: step3.antiTheftDevices.toString() || '',
      driverAirbag: step3.driverAirbag || '',
      farthestDistance: step3.farthestDistance || '',
      grossVehicleWeight: step3.grossVehicleWeight || '',
      loanLease: step3.loanLease || '',
      make: step3.make || '',
      rearAxles: step3.rearAxles || '',
      year: step3.year || '',
      vin: step3.vin || '',
      bodyType: step3.bodyType || '',
      // vehicles: vehicles.map((vehicle: any) => ({
      //   addBy: vehicle.addBy || '',
      //   antiTheftDevices: vehicle.antiTheftDevices || '',
      //   bodyStyle: vehicle.bodyStyle || '',
      //   grossWeight: vehicle.grossWeight || '',
      //   make: vehicle.make || '',
      //   hasAbs: vehicle.hasAbs || '',
      //   hasAirbag: vehicle.hasAirbag || '',
      //   id: vehicle.id || '',
      //   loanLeaseStatus: vehicle.loanLeaseStatus || '',
      //   name: vehicle.name || '',
      //   rearAxles: vehicle.rearAxles || '',
      //   travelDistance: vehicle.travelDistance || '',
      //   vehicleType: vehicle.vehicleType || '',
      //   year: vehicle.year || '',
      //   zipCode: vehicle.zipCode || '',
      // })),
      vehicles: vehicles.toString() || '',
      hasAccidents: step5.hasAccidents || '',
      hasCdl: step5.hasCdl || '',
      isExcluded: step5.isExcluded || '',
      licenseState: step5.licenseState || '',
      hasAutoInsurance: step6.hasAutoInsurance || '',
      numNamedInsureds: step6.numNamedInsureds || '',
      numWaiverHolders: step6.numWaiverHolders || '',
      otherCoverageType: step6.otherCoverageType.toString() || '',
      requiresBlanketInsured: step6.requiresBlanketInsured || '',
      requiresBlanketWaiver: step6.requiresBlanketWaiver || '',
      requiresFiling: step6.requiresFiling || '',
    };
    console.log(sheetPayload);

    // Send to Google Sheets
    // if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
    //   await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(sheetPayload),
    //   });
    // }
    
    const res = await fetch('https://hooks.zapier.com/hooks/catch/21501396/u3f9ib8/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sheetPayload),
    });
    return NextResponse.json({ success: true, res: res });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
