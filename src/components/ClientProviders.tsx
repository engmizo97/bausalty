'use client';

import React, { useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { LanguageProvider } from '@/context/LanguageContext';

function AuthSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      let plan: 'FREE' | 'PAID' = 'FREE';
      let signedInAt = new Date().toISOString();
      try {
        const existing = localStorage.getItem('bausalty_user_session');
        if (existing) {
          const parsed = JSON.parse(existing);
          if (parsed.plan) plan = parsed.plan;
          if (parsed.signedInAt) signedInAt = parsed.signedInAt;

          // Clear mock tests if transitioning from mock account to real Google account
          if (parsed.email === 'sarah.otaibi@ksu.edu.sa' && session.user.email !== 'sarah.otaibi@ksu.edu.sa') {
            localStorage.removeItem('bausalty_assessment_result');
            localStorage.removeItem('bausalty_mbti_result');
          }
        }
      } catch {}

      const userProfile = {
        id: session.user.id || session.user.email || 'google-user',
        name: session.user.name || 'طالب بوصلتي',
        email: session.user.email || '',
        plan: plan,
        image: session.user.image || '',
        signedInAt: signedInAt,
      };

      try {
        localStorage.setItem('bausalty_user_session', JSON.stringify(userProfile));
        window.dispatchEvent(new Event('storage'));

        fetch('/api/email/welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userProfile.email, name: userProfile.name }),
        }).catch(() => {});
      } catch {}
    }
  }, [session, status]);

  return null;
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <AuthSync />
        {children}
      </LanguageProvider>
    </SessionProvider>
  );
}
