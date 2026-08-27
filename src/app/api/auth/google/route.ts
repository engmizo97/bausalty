import { NextResponse } from 'next/server';

export async function GET() {
  const origin = 'https://busalatiai.com';
  const redirectUri = `${origin}/api/auth/callback/google`;
  const clientId = process.env.GOOGLE_CLIENT_ID || '';

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account',
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
