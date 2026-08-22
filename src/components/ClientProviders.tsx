'use client';

import React, { useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { LanguageProvider } from '@/context/LanguageContext';

function AuthSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      let plan: 'FREE' | 'PAID' = 'FREE';
      try {
        const existing = localStorage.getItem('bausalty_user_session');
        if (existing) {
          const parsed = JSON.parse(existing);
          if (parsed.plan) plan = parsed.plan;
        }
      } catch {}

      const userProfile = {
        id: session.user.id || session.user.email || 'google-user',
        name: session.user.name || 'طالب بوصلتي',
        email: session.user.email || '',
        plan: plan,
        image: session.user.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        signedInAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem('bausalty_user_session', JSON.stringify(userProfile));
        window.dispatchEvent(new Event('storage'));

        // Trigger welcome email on fresh login
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
