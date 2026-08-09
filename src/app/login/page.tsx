'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Sparkles, ArrowRight, ShieldCheck, Mail, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getCallbackUrl = (): string => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        return params.get('callbackUrl') || '/dashboard';
      } catch {
        return '/dashboard';
      }
    }
    return '/dashboard';
  };

  const handleDemoSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const userProfile = {
      id: 'student-demo-101',
      name: name || (isArabic ? 'فهد السعدي' : 'Fahad Al-Saudi'),
      email: email || 'fahad.saudi@kaust.edu.sa',
      plan: 'FREE', // 'FREE' or 'PAID'
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      signedInAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('bausalty_user_session', JSON.stringify(userProfile));
      // Notify other components of authentication state change
      window.dispatchEvent(new Event('storage'));
    } catch {
      // Ignore write error
    }

    setTimeout(() => {
      setIsLoading(false);
      router.push(getCallbackUrl());
    }, 400);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    const userProfile = {
      id: 'google-student-202',
      name: isArabic ? 'سارة العتيبي' : 'Sarah Al-Otaibi',
      email: 'sarah.otaibi@ksu.edu.sa',
      plan: 'FREE',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      signedInAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('bausalty_user_session', JSON.stringify(userProfile));
      // Notify other components of authentication state change
      window.dispatchEvent(new Event('storage'));
    } catch {
      // Ignore write error
    }

    setTimeout(() => {
      setIsLoading(false);
      router.push(getCallbackUrl());
    }, 500);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-paper py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        
        {/* Header Logo */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal text-white border-2 border-ink flex items-center justify-center shadow-notebook-xs">
              <Compass className="w-7 h-7 text-yellow" />
            </div>
            <div className="text-right">
              <span className="text-3xl font-display font-black text-ink block">بوصالتي</span>
              <span className="text-xs font-bold text-teal block">مجموعة تحسين للذكاء الاصطناعي</span>
            </div>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-display font-black text-ink">
            {isArabic ? 'تسجيل الدخول للطالب' : 'Student Sign In'}
          </h1>
          <p className="text-xs sm:text-sm text-ink-soft font-prose">
            {isArabic
              ? 'سجل دخولك لحفظ نتائج اختبار هولاند ومتابعة توصيات التخصصات السعودية.'
              : 'Sign in to save your Holland Code results and track your Saudi major recommendations.'}
          </p>
        </div>

        {/* Notebook Styled Login Card */}
        <div className="bg-paper-card rounded-notebook p-6 sm:p-8 border-2 border-ink shadow-notebook-md space-y-6">
          
          {/* GOOGLE SIGN IN BUTTON */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full h-12 min-h-[48px] bg-paper hover:bg-paper-inset text-ink border-2 border-ink rounded-xl font-bold text-sm shadow-notebook-xs flex items-center justify-center gap-3 transition-all hover:scale-102 active:scale-98"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isArabic ? 'تسجيل الدخول بواسطة Google' : 'Sign in with Google'}</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t-2 border-ink/10 w-full" />
            <span className="bg-paper-card px-3 text-xs font-bold text-muted uppercase">
              {isArabic ? 'أو عبر البريد الإلكتروني' : 'Or with Email'}
            </span>
          </div>

          {/* Email / Name Demo Form */}
          <form onSubmit={handleDemoSignIn} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-ink block">
                {isArabic ? 'الاسم الكامل:' : 'Full Name:'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isArabic ? 'فهد السعدي' : 'Fahad Al-Saudi'}
                  className="w-full h-11 min-h-[44px] pl-10 pr-3 rounded-xl border-2 border-ink bg-paper text-ink text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-ink block">
                {isArabic ? 'البريد الإلكتروني:' : 'Email Address:'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@ksu.edu.sa"
                  className="w-full h-11 min-h-[44px] pl-10 pr-3 rounded-xl border-2 border-ink bg-paper text-ink text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 min-h-[48px] bg-teal hover:bg-teal-deep text-white border-2 border-ink rounded-xl font-display font-black text-sm shadow-notebook-xs flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-yellow" />
              <span>{isLoading ? (isArabic ? 'جاري التسجيل...' : 'Signing In...') : (isArabic ? 'دخول لوحة التحكم' : 'Sign In to Dashboard')}</span>
              <ArrowRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
            </button>
          </form>

        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-ink-soft flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4 text-teal" />
          <span>{isArabic ? 'آمن ومعتمد للطلاب في المملكة' : 'Secure & Validated for Saudi Students'}</span>
        </p>

      </div>
    </div>
  );
}
