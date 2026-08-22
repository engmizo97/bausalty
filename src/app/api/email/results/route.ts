import { NextResponse } from 'next/server';
import { generateRiasecPdf, generatePersonalityPdf } from '@/lib/pdfGenerator';
import { sendEmail } from '@/lib/sendgrid';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, testType, riasecResult, personalityResult } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const userName = name || 'Student';
    let pdfBuffer: Buffer | null = null;
    let filename = 'Bausalty-Results.pdf';
    let subject = 'Your Bausalty (بوصلتي) Assessment PDF Report';

    if (testType === '16PERSONALITIES' && personalityResult) {
      pdfBuffer = generatePersonalityPdf(personalityResult, userName);
      filename = `Bausalty-Personality-Report-${personalityResult.code}.pdf`;
      subject = `Bausalty 16Personalities Report (${personalityResult.code}) - ${userName}`;
    } else if (riasecResult) {
      pdfBuffer = generateRiasecPdf(riasecResult, userName);
      filename = `Bausalty-RIASEC-Report-${riasecResult.topCode}.pdf`;
      subject = `Bausalty RIASEC Career Report (${riasecResult.topCode}) - ${userName}`;
    }

    if (!pdfBuffer) {
      return NextResponse.json({ error: 'Invalid result payload provided' }, { status: 400 });
    }

    const base64Pdf = pdfBuffer.toString('base64');

    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #f4eefb; padding: 24px; color: #3a2f21;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 2px solid #3a2f21; border-radius: 18px; padding: 32px; box-shadow: 4px 4px 0px #3a2f21;">
          <h1 style="color: #0d9488; font-size: 24px; margin-bottom: 8px;">Bausalty Assessment Report</h1>
          <p style="font-size: 16px; color: #5c4f3a;">Hello <strong>${userName}</strong>,</p>
          <p style="font-size: 15px; line-height: 1.6; color: #3a2f21;">
            Congratulations on completing your assessment! Attached is your official PDF summary report containing your archetype breakdown, core strengths, and top recommended Saudi university majors aligned with Saudi Vision 2030.
          </p>
          <div style="margin-top: 24px; padding-top: 20px; border-top: 2px solid #e4dbc8; font-size: 12px; color: #8a7a5f;">
            Bausalty • Tahseen AI Group (مجموعة تحسين للذكاء الاصطناعي)
          </div>
        </div>
      </div>
    `;

    const success = await sendEmail({
      to: email,
      subject,
      text: `Hello ${userName}, Attached is your official Bausalty Assessment PDF Report.`,
      html,
      attachments: [
        {
          content: base64Pdf,
          filename,
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    });

    return NextResponse.json({
      success,
      message: success
        ? `PDF Report successfully sent to ${email}`
        : 'PDF Report generated and queued',
    });
  } catch (err: unknown) {
    const errorObj = err as { message?: string };
    console.error('Results email API error:', err);
    return NextResponse.json({ error: errorObj?.message || 'Failed to send PDF report' }, { status: 500 });
  }
}
