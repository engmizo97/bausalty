'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, User, Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === 'ar';

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedSession = localStorage.getItem('bausalty_user_session');
        setIsLoggedIn(!!savedSession);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [pathname]);

  const navLinks = [
    { href: '/', labelEn: 'Home', labelAr: 'الرئيسية' },
    { href: '/assessment', labelEn: 'Quiz Hub', labelAr: 'مركز الاختبارات' },
    { href: '/majors', labelEn: 'Majors Explorer', labelAr: 'مستكشف التخصصات' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fbf6ea]/90 backdrop-blur-md border-b-2 border-dashed border-[#3a2f21]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Action / Auth Button on the Left (in RTL) */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="h-10 px-4 sm:px-5 rounded-xl border-2 border-[#3a2f21] bg-[#ffd66e] text-[#3a2f21] font-display font-bold text-sm shadow-[2.5px_2.5px_0_#3a2f21] hover:translate-x-[-1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#3a2f21] transition-all flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-[#7c3aed]" />
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

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 mr-4">
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

          {/* Logo on the Right (in RTL) */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleLanguage}
              className="text-xs font-bold text-[#5c4f3a] hover:text-[#3a2f21] px-2 py-1 rounded-lg border border-[#3a2f21]/20 hidden sm:inline-block"
              title="Toggle Language"
            >
              {isArabic ? 'EN' : 'عربي'}
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="text-xl sm:text-2xl font-display font-bold text-[#3a2f21]">
                بوصلتي <span className="text-[#7c3aed]">AI</span>
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[11px] bg-[#ffd66e] text-[#3a2f21] border-2 border-[#3a2f21] flex items-center justify-center shadow-[2.5px_2.5px_0_#3a2f21] -rotate-4 group-hover:rotate-0 transition-transform">
                <Compass className="w-5 h-5 text-[#3a2f21]" />
              </div>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
