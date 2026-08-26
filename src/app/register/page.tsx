'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Mail,
  User,
  Lock,
  Building,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function RegisterPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [targetUniversity, setTargetUniversity] = useState('');

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

    // Validation checks
    if (!firstName.trim() || !lastName.trim()) {
      setError(isArabic ? 'يرجى إدخال الاسم الأول واسم العائلة.' : 'Please enter your first and last name.');
      return;
    }

    if (email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()) {
      setError(isArabic ? 'البريد الإلكتروني وتأكيد البريد الإلكتروني غير متطابقين.' : 'Email and Confirm Email address do not match.');
      return;
    }

    if (password.length < 6) {
      setError(isArabic ? 'كلمة المرور يجب أن تتكون من 6 خانات على الأقل.' : 'Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError(isArabic ? 'كلمة المرور وتأكيد كلمة المرور غير متطابقين.' : 'Password and Confirm Password do not match.');
      return;
    }

    setIsLoading(true);

    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    const userProfile = {
      id: `student-reg-${Date.now()}`,
      name: fullName,
      email: email.trim().toLowerCase(),
      plan: 'FREE' as const,
      targetUniversity: targetUniversity.trim() || (isArabic ? 'جامعة الملك سعود' : 'King Saud University'),
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      signedInAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('bausalty_user_session', JSON.stringify(userProfile));
      // Notify other components (Header) of authentication state change
      window.dispatchEvent(new Event('storage'));

      // Automatically send SendGrid Welcome Email
      fetch('/api/email/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userProfile.email, name: userProfile.name }),
      }).catch(() => {});
    } catch {
      // Ignore write error
    }

    setTimeout(() => {
      setIsLoading(false);
      router.push(getCallbackUrl());
    }, 500);
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: getCallbackUrl() });
    } catch (err) {
      console.error('Google Sign Up Error:', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-paper py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8">
        
        {/* Header Logo */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/bawsalati-logo.webp"
              alt="بوصلتي"
              width={48}
              height={48}
              className="w-12 h-12 object-contain shrink-0"
              priority
            />
            <div className="text-right">
              <span className="text-3xl font-display font-black text-ink block">
                {isArabic ? 'بوصلتي' : 'Bausalty'}
              </span>
              <span className="text-xs font-bold text-[#0d9488] block">
                {isArabic ? 'تحسين التعليمية' : 'Tahseen Education'}
              </span>
            </div>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#3a2f21]">
            {isArabic ? 'إنشاء حساب طالب جديد' : 'Create New Student Account'}
          </h1>
          <p className="text-xs sm:text-sm text-[#5c4f3a] font-prose">
            {isArabic
              ? 'أنشئ حسابك مجاناً لحفظ تقارير اختبار هولاند ونتائج التخصصات السعودية.'
              : 'Create your free account to save your RIASEC major recommendations and PDF reports.'}
          </p>
        </div>

        {/* Notebook Styled Registration Card */}
        <div className="bg-[#fffdf6] rounded-[18px] p-6 sm:p-8 border-2 border-[#3a2f21] shadow-[5px_5px_0_#3a2f21] space-y-6">
          
          {/* GOOGLE SIGN UP BUTTON */}
          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            type="button"
            className="w-full h-12 min-h-[48px] bg-[#f4eefb] hover:bg-[#ede5f7] text-[#3a2f21] border-2 border-[#3a2f21] rounded-xl font-bold text-sm shadow-[3px_3px_0_#3a2f21] flex items-center justify-center gap-3 transition-all hover:scale-102 active:scale-98"
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
            <span>{isArabic ? 'التسجيل بواسطة حساب Google' : 'Sign up with Google'}</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t-2 border-[#3a2f21]/15 w-full" />
            <span className="bg-[#fffdf6] px-3 text-xs font-bold text-[#8a7a5f] uppercase">
              {isArabic ? 'أو أدخل بياناتك الشخصية' : 'Or Fill Your Information'}
            </span>
          </div>

          {/* Validation Error Alert */}
          {error && (
            <div className="bg-rose-50 border-2 border-rose-500 rounded-xl p-3 text-xs font-bold text-rose-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-[#3a2f21] block">
                  {isArabic ? 'الاسم الأول:' : 'First Name:'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8a7a5f] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={isArabic ? 'فهد' : 'Fahad'}
                    className="w-full h-11 min-h-[44px] pl-9 pr-3 rounded-xl border-2 border-[#3a2f21] bg-[#f4eefb] text-[#3a2f21] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-[#3a2f21] block">
                  {isArabic ? 'اسم العائلة:' : 'Last Name:'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8a7a5f] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={isArabic ? 'السعدي' : 'Al-Saudi'}
                    className="w-full h-11 min-h-[44px] pl-9 pr-3 rounded-xl border-2 border-[#3a2f21] bg-[#f4eefb] text-[#3a2f21] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#3a2f21] block">
                {isArabic ? 'البريد الإلكتروني:' : 'Email Address:'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8a7a5f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@ksu.edu.sa"
                  className="w-full h-11 min-h-[44px] pl-10 pr-3 rounded-xl border-2 border-[#3a2f21] bg-[#f4eefb] text-[#3a2f21] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
                />
              </div>
            </div>

            {/* Confirm Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#3a2f21] block">
                {isArabic ? 'تأكيد البريد الإلكتروني:' : 'Confirm Email Address:'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8a7a5f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder="student@ksu.edu.sa"
                  className="w-full h-11 min-h-[44px] pl-10 pr-3 rounded-xl border-2 border-[#3a2f21] bg-[#f4eefb] text-[#3a2f21] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
                />
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-[#3a2f21] block">
                  {isArabic ? 'كلمة المرور:' : 'Password:'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8a7a5f] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 min-h-[44px] pl-9 pr-3 rounded-xl border-2 border-[#3a2f21] bg-[#f4eefb] text-[#3a2f21] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-[#3a2f21] block">
                  {isArabic ? 'تأكيد كلمة المرور:' : 'Confirm Password:'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8a7a5f] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 min-h-[44px] pl-9 pr-3 rounded-xl border-2 border-[#3a2f21] bg-[#f4eefb] text-[#3a2f21] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
                  />
                </div>
              </div>
            </div>

            {/* Target Saudi University / City */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#3a2f21] block">
                {isArabic ? 'الجامعة أو المدينة المستهدفة (اختياري):' : 'Target University / City (Optional):'}
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-[#8a7a5f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={targetUniversity}
                  onChange={(e) => setTargetUniversity(e.target.value)}
                  placeholder={isArabic ? 'جامعة الملك سعود / الرياض' : 'King Saud University / Riyadh'}
                  className="w-full h-11 min-h-[44px] pl-10 pr-3 rounded-xl border-2 border-[#3a2f21] bg-[#f4eefb] text-[#3a2f21] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
                />
              </div>
            </div>

            {/* Submit Registration Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 min-h-[48px] bg-[#0d9488] hover:bg-[#0f766e] text-white border-2 border-[#3a2f21] rounded-xl font-display font-black text-sm shadow-[3px_3px_0_#3a2f21] flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 mt-2"
            >
              <Sparkles className="w-4 h-4 text-[#ffd66e]" />
              <span>{isLoading ? (isArabic ? 'جاري إنشاء الحساب...' : 'Creating Account...') : (isArabic ? 'إنشاء حساب طالب جديد' : 'Create Student Account')}</span>
              <ArrowRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
            </button>
          </form>

        </div>

        {/* Already Have An Account - Sign In CTA Link */}
        <div className="text-center space-y-2 bg-[#fffdf6] rounded-2xl p-4 border-2 border-[#3a2f21] shadow-[3px_3px_0_#3a2f21]">
          <p className="text-xs sm:text-sm font-bold text-[#3a2f21]">
            {isArabic ? 'لديك حساب مسجل بالفعل؟' : 'Already have an account?'}
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-sm font-extrabold text-[#0d9488] hover:underline"
          >
            <span>{isArabic ? 'تسجيل الدخول إلى حسابك ←' : 'Sign In to Your Account ←'}</span>
          </Link>
        </div>

        {/* Security Note */}
        <p className="text-center text-xs text-[#5c4f3a] flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4 text-[#0d9488]" />
          <span>{isArabic ? 'آمن ومعتمد للطلاب في المملكة العربية السعودية' : 'Secure & Validated for Saudi Arabia Students'}</span>
        </p>

      </div>
    </div>
  );
}
