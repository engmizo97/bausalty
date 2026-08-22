import { NextResponse } from 'next/server';
import { generateRiasecPdf, generatePersonalityPdf } from '@/lib/pdfGenerator';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, testType, riasecResult, personalityResult } = body;

    const userName = name || 'Student';
    let pdfBuffer: Buffer | null = null;
    let filename = 'Bausalty-Results.pdf';

    if (testType === '16PERSONALITIES' && personalityResult) {
      pdfBuffer = generatePersonalityPdf(personalityResult, userName);
      filename = `Bausalty-Personality-Report-${personalityResult.code}.pdf`;
    } else if (riasecResult) {
      pdfBuffer = generateRiasecPdf(riasecResult, userName);
      filename = `Bausalty-RIASEC-Report-${riasecResult.topCode}.pdf`;
    }

    if (!pdfBuffer) {
      return NextResponse.json({ error: 'Invalid result payload' }, { status: 400 });
    }

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (err) {
    console.error('PDF download error:', err);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
