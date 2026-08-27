import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const referer = request.headers.get('referer') || '';
  
  let returnTo = searchParams.get('returnTo') || '';
  if (!returnTo && referer.includes('edutahseen.com')) {
    returnTo = 'https://edutahseen.com/busalati/dashboard';
  }

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
    state: returnTo ? encodeURIComponent(returnTo) : '',
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
