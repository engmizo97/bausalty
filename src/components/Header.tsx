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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-dashed border-[#8b5cf6]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* RIGHT SIDE (in RTL): Logo & Desktop Navigation Links */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-[11px] border-2 border-[#1f1b13] overflow-hidden shadow-[2.5px_2.5px_0_#1f1b13] -rotate-2 group-hover:rotate-0 transition-transform bg-white shrink-0 flex items-center justify-center">
                <Image
                  src="/bawsalati-logo.webp"
                  alt="بوصلتي"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <span className="text-xl sm:text-2xl font-display font-bold text-[#1f1b13]">
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
                    className={`text-sm font-bold transition-colors ${
                      isActive ? 'text-[#0d9488]' : 'text-[#5c4f3a] hover:text-[#3a2f21]'
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
            
            {/* Notebook Interactive Language Switch */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="relative inline-flex items-center p-1 bg-white border-2 border-[#3a2f21] rounded-full shadow-[2px_2px_0_#3a2f21] hover:shadow-[1px_1px_0_#3a2f21] transition-all cursor-pointer select-none"
              title={isArabic ? 'Switch to English' : 'التحويل إلى العربية'}
              aria-label={isArabic ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <div className="flex items-center text-xs font-black relative z-10">
                <span
                  className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                    isArabic
                      ? 'bg-[#0d9488] text-white shadow-xs'
                      : 'text-[#5c4f3a] hover:text-[#3a2f21]'
                  }`}
                >
                  عربي
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                    !isArabic
                      ? 'bg-[#7c3aed] text-white shadow-xs'
                      : 'text-[#5c4f3a] hover:text-[#3a2f21]'
                  }`}
                >
                  EN
                </span>
              </div>
            </button>

            {isLoggedIn || !!session?.user ? (
              <Link
                href="/dashboard"
                className="h-10 px-4 sm:px-5 rounded-xl border-2 border-[#3a2f21] bg-[#ffd66e] text-[#3a2f21] font-display font-bold text-sm shadow-[2.5px_2.5px_0_#3a2f21] hover:translate-x-[-1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#3a2f21] transition-all flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-[#0d9488]" />
                <span>{isArabic ? 'لوحة التحكم' : 'Dashboard'}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="h-10 px-4 sm:px-5 rounded-xl border-2 border-[#3a2f21] bg-[#ffd66e] text-[#3a2f21] font-display font-bold text-sm shadow-[2.5px_2.5px_0_#3a2f21] hover:translate-x-[-1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#3a2f21] transition-all flex items-center justify-center"
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
