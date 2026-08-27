'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Sparkles, ArrowRight, ShieldCheck, Mail, User, Lock, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function RegisterPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
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

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError(isArabic ? 'يرجى إدخال اسمك الكامل.' : 'Please enter your full name.');
      return;
    }

    if (!email.trim()) {
      setError(isArabic ? 'يرجى إدخال بريدك الإلكتروني.' : 'Please enter your email.');
      return;
    }

    setIsLoading(true);

    const userProfile = {
      id: `student-reg-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      plan: 'FREE' as const,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      signedInAt: new Date().toISOString(),
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

    setTimeout(() => {
      setIsLoading(false);
      router.push(getCallbackUrl());
    }, 250);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: getCallbackUrl() });
    } catch (err) {
      console.error('Google Sign In Error:', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-[#faf6ea] py-10 px-4 sm:px-6">
      <div className="w-full max-w-[420px] space-y-6">
        
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-[11px] border-2 border-[#1F1B13] bg-white shadow-[2.5px_2.5px_0_#1F1B13] -rotate-2 flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src="/bawsalati-logo.webp"
                alt="بوصلتي"
                width={40}
                height={40}
                className="w-10 h-10 object-contain shrink-0"
                priority
              />
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-[#1F1B13] block font-display leading-tight">
                {isArabic ? 'بوصلتي' : 'Bausalty'}
              </span>
              <span className="text-[11px] font-bold text-[#0d9488] block">
                {isArabic ? 'تحسين التعليمية' : 'Tahseen Education'}
              </span>
            </div>
          </Link>

          <h1 className="text-xl sm:text-2xl font-black text-[#1F1B13] font-display pt-2">
            {isArabic ? 'إنشاء حساب طالب جديد' : 'Create Student Account'}
          </h1>
          <p className="text-xs text-[#5c4f3a] font-medium">
            {isArabic
              ? 'انضم لمنصة بوصلتي لحفظ تقرير ميولك واكتشاف التخصص الأنسب.'
              : 'Join Bausalty to save your assessment report and discover top majors.'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#1F1B13] shadow-[5px_5px_0_#1F1B13] space-y-5">
          
          {/* Google Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            type="button"
            className="w-full h-11 bg-white hover:bg-[#faf6ea] text-[#1F1B13] border-2 border-[#1F1B13] rounded-xl font-bold text-xs sm:text-sm shadow-[2px_2px_0_#1F1B13] flex items-center justify-center gap-2.5 transition-all active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
            <span>{isArabic ? 'التسجيل السريع بواسطة Google' : 'Sign up with Google'}</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-[#1F1B13]/15 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-[#8a7a5f] uppercase">
              {isArabic ? 'أو بالبيانات الشخصية' : 'Or with details'}
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-black text-[#1F1B13] block">
                {isArabic ? 'الاسم الكامل:' : 'Full Name:'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8a7a5f] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isArabic ? 'مثال: فهد السعدي' : 'e.g. Fahad Al-Saudi'}
                  className="w-full h-10 pl-9 pr-3 rounded-xl border-2 border-[#1F1B13] bg-[#faf6ea] text-[#1F1B13] text-xs sm:text-sm font-bold focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-[#1F1B13] block">
                {isArabic ? 'البريد الإلكتروني:' : 'Email Address:'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8a7a5f] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@kaust.edu.sa"
                  className="w-full h-10 pl-9 pr-3 rounded-xl border-2 border-[#1F1B13] bg-[#faf6ea] text-[#1F1B13] text-xs sm:text-sm font-bold focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-[#1F1B13] block">
                {isArabic ? 'كلمة المرور (اختياري):' : 'Password (optional):'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8a7a5f] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 pl-9 pr-3 rounded-xl border-2 border-[#1F1B13] bg-[#faf6ea] text-[#1F1B13] text-xs sm:text-sm font-bold focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-[#0d9488] hover:bg-[#0f766e] text-white border-2 border-[#1F1B13] rounded-xl font-display font-black text-sm shadow-[2.5px_2.5px_0_#1F1B13] flex items-center justify-center gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 mt-2"
            >
              <Sparkles className="w-4 h-4 text-[#ffd66e]" />
              <span>{isLoading ? (isArabic ? 'جاري إنشاء الحساب...' : 'Creating Account...') : (isArabic ? 'إنشاء الحساب ومتابعة التقييم' : 'Create Account & Continue')}</span>
              <ArrowRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
            </button>
          </form>

        </div>

        {/* Already have an account? */}
        <div className="text-center">
          <Link
            href="/login"
            className="text-xs sm:text-sm font-bold text-[#5c4f3a] hover:text-[#0d9488] transition-colors"
          >
            {isArabic ? 'لديك حساب بالفعل؟ تسجيل الدخول ←' : 'Already have an account? Sign in →'}
          </Link>
        </div>

        {/* Security Note */}
        <p className="text-center text-[11px] text-[#5c4f3a] flex items-center justify-center gap-1 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0d9488]" />
          <span>{isArabic ? 'آمن ومعتمد لطلاب الجامعات السعودية' : 'Secure & Validated for Saudi Students'}</span>
        </p>

      </div>
    </div>
  );
}
