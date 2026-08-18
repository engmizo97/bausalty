import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/sendgrid';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const verificationToken = Math.random().toString(36).substring(2, 8).toUpperCase();
    const magicLink = `http://localhost:3000/login?token=${verificationToken}&email=${encodeURIComponent(email)}`;

    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #fbf6ea; padding: 24px; color: #3a2f21;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fffdf6; border: 2px solid #3a2f21; border-radius: 18px; padding: 32px; box-shadow: 4px 4px 0px #3a2f21;">
          <h1 style="color: #0d9488; font-size: 24px; margin-bottom: 8px;">Verify Your Email | Bausalty</h1>
          <p style="font-size: 15px; line-height: 1.6; color: #3a2f21;">
            Your Bausalty verification code is: <strong style="font-size: 20px; color: #7c3aed; background-color: #ffd66e; padding: 4px 12px; border-radius: 8px;">${verificationToken}</strong>
          </p>
          <p style="font-size: 14px; margin-top: 16px;">
            Or click the magic link below to complete sign in:
          </p>
          <a href="${magicLink}" style="display: inline-block; background-color: #0d9488; color: #ffffff; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: bold; margin-top: 8px;">
            Verify & Sign In to Bausalty
          </a>
        </div>
      </div>
    `;

    const success = await sendEmail({
      to: email,
      subject: `Bausalty Verification Code: ${verificationToken}`,
      text: `Your Bausalty verification code is: ${verificationToken}`,
      html,
    });

    return NextResponse.json({
      success,
      token: verificationToken,
      message: `Verification code sent to ${email}`,
    });
  } catch (err: unknown) {
    const errorObj = err as { message?: string };
    console.error('Email verification API error:', err);
    return NextResponse.json({ error: errorObj?.message || 'Failed to send verification email' }, { status: 500 });
  }
}
