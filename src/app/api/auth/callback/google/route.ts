import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const origin = 'https://busalatiai.com';
  const redirectUri = `${origin}/api/auth/callback/google`;

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  try {
    // 1. Exchange code for access_token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      console.error('Google token exchange error:', tokenData);
      return NextResponse.redirect(`${origin}/login?error=token_exchange_failed`);
    }

    // 2. Fetch user profile from Google API
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userData = await userRes.json();

    const userProfile = {
      id: userData.id || `google-${Date.now()}`,
      name: userData.name || 'طالب بوصلتي',
      email: userData.email || '',
      image: userData.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      plan: 'FREE',
      signedInAt: new Date().toISOString(),
    };

    // 3. Render client bridge that writes to localStorage and navigates to dashboard immediately
    const userJson = JSON.stringify(userProfile);
    const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8">
    <title>جاري تسجيل الدخول...</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="background:#faf6ea;font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
    <div style="text-align:center;padding:24px;background:#ffffff;border:2px solid #1f1b13;border-radius:20px;box-shadow:4px 4px 0 #1f1b13;max-width:320px;">
      <div style="width:36px;height:36px;border:3px solid #0d9488;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 14px;"></div>
      <h2 style="color:#1f1b13;font-size:18px;margin:0 0 6px;">مرحباً ${userProfile.name}</h2>
      <p style="color:#5c4f3a;font-size:13px;margin:0;">جاري نقلك إلى لوحة التحكم...</p>
    </div>
    <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
    <script>
      try {
        localStorage.setItem('bausalty_user_session', ${JSON.stringify(userJson)});
        window.dispatchEvent(new Event('storage'));
      } catch (e) {}
      window.location.replace('/dashboard');
    </script>
  </body>
</html>`;

    const response = new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });

    response.cookies.set('bausalty_user', userJson, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
    });

    return response;
  } catch (err) {
    console.error('OAuth Callback Fatal Error:', err);
    return NextResponse.redirect(`${origin}/login?error=server_error`);
  }
}
