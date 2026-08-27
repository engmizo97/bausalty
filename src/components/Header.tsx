'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === 'ar';
  const { data: session } = useSession();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedSession = localStorage.getItem('bausalty_user_session');
        setIsLoggedIn(!!savedSession || !!session?.user);
      } catch {
        setIsLoggedIn(!!session?.user);
      }
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [pathname, session]);

  const navLinks = [
    { href: '/', labelEn: 'Home', labelAr: 'الرئيسية' },
    { href: '/assessment', labelEn: 'Assessments', labelAr: 'الاختبارات' },
    { href: '/majors', labelEn: 'Majors Explorer', labelAr: 'مستكشف التخصصات' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#1F1B13]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* RIGHT SIDE (in RTL): Logo & Desktop Navigation Links */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-[10px] border-2 border-[#1F1B13] overflow-hidden shadow-[2px_2px_0_#1F1B13] -rotate-2 group-hover:rotate-0 transition-transform bg-white shrink-0 flex items-center justify-center">
                <Image
                  src="/bawsalati-logo.webp"
                  alt="بوصلتي"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <span className="text-xl font-display font-bold text-[#1F1B13]">
                {isArabic ? 'بوصلتي' : 'Bausalty'}
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-semibold transition-colors ${
                      isActive ? 'text-[#109E91]' : 'text-[#4B4131] hover:text-[#1F1B13]'
                    }`}
                  >
                    <span>{isArabic ? link.labelAr : link.labelEn}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* LEFT SIDE (in RTL): Language Switch Toggle & Login / Dashboard Button */}
          <div className="flex items-center gap-3">
            
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="relative inline-flex items-center p-0.5 bg-white border border-[#1F1B13]/30 rounded-full shadow-[1.5px_1.5px_0_#1F1B13] hover:shadow-[1px_1px_0_#1F1B13] transition-all cursor-pointer select-none"
              title={isArabic ? 'Switch to English' : 'التحويل إلى العربية'}
              aria-label={isArabic ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <div className="flex items-center text-xs font-bold relative z-10">
                <span
                  className={`px-2.5 py-0.5 rounded-full transition-all duration-200 ${
                    isArabic
                      ? 'bg-[#109E91] text-white shadow-xs'
                      : 'text-[#4B4131] hover:text-[#1F1B13]'
                  }`}
                >
                  عربي
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full transition-all duration-200 ${
                    !isArabic
                      ? 'bg-[#109E91] text-white shadow-xs'
                      : 'text-[#4B4131] hover:text-[#1F1B13]'
                  }`}
                >
                  EN
                </span>
              </div>
            </button>

            {isLoggedIn || !!session?.user ? (
              <Link
                href="/dashboard"
                className="h-9 px-4 rounded-xl border border-[#1F1B13] bg-[#FEF6E8] text-[#1F1B13] font-display font-bold text-sm shadow-[2px_2px_0_#1F1B13] hover:translate-x-[-1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1F1B13] transition-all flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-[#109E91]" />
                <span>{isArabic ? 'لوحة التحكم' : 'Dashboard'}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="h-9 px-4 rounded-xl border border-[#1F1B13] bg-[#FEF6E8] text-[#1F1B13] font-display font-bold text-sm shadow-[2px_2px_0_#1F1B13] hover:translate-x-[-1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1F1B13] transition-all flex items-center justify-center"
              >
                <span>{isArabic ? 'تسجيل الدخول' : 'Sign In'}</span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
