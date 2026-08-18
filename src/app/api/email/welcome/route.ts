import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/sendgrid';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const userName = name || 'Student';
    const success = await sendWelcomeEmail(email, userName);

    return NextResponse.json({
      success,
      message: success
        ? `Welcome email sent to ${email}`
        : 'Welcome email queued in demo mode',
    });
  } catch (err: unknown) {
    const errorObj = err as { message?: string };
    console.error('Welcome email API error:', err);
    return NextResponse.json({ error: errorObj?.message || 'Failed to send welcome email' }, { status: 500 });
  }
}
