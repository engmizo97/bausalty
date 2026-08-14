'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Sparkles, Menu, X, Languages, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const isArabic = language === 'ar';

  // Initialize with false to match server HTML exactly during hydration
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

    // Run immediately on client mount
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
    <header className="sticky top-0 z-50 bg-paper-card/95 backdrop-blur-md border-b border-dashed border-teal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tahseen AI Group Badge */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-teal text-white border-2 border-ink flex items-center justify-center shadow-notebook-xs group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 text-yellow" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-black tracking-tight text-ink">
                بوصلتي
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-ink-soft">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal" />
                <span>مجموعة تحسين للذكاء الاصطناعي</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links (Clean Single-Language) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-extrabold transition-all duration-150 py-1 px-3 rounded-lg ${
                    isActive
                      ? 'bg-yellow text-ink border border-ink shadow-2xs'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <span>{isArabic ? link.labelAr : link.labelEn}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs, Auth Button & Language Toggle */}
          <div className="hidden md:flex items-center gap-2.5">
            
            {/* PROMINENT LANGUAGE TOGGLE BUTTON */}
            <button
              onClick={toggleLanguage}
              className="h-9 px-3 rounded-xl border border-ink/40 bg-paper-card text-ink font-semibold text-xs hover:border-ink transition-all flex items-center gap-1.5 justify-center"
              aria-label="Language Toggle"
            >
              <Languages className="w-3.5 h-3.5 text-teal" />
              <span>{isArabic ? '🇬🇧 English' : '🇸🇦 العربية'}</span>
            </button>

            {/* Dynamic Sign In / Dashboard Button */}
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="h-9 inline-flex items-center gap-1.5 bg-yellow hover:bg-amber-300 text-ink px-4 rounded-xl font-display font-black text-xs border-2 border-ink shadow-notebook-xs hover:scale-102 transition-all"
              >
                <User className="w-3.5 h-3.5 text-purple" />
                <span>{isArabic ? 'لوحة التحكم' : 'Dashboard'}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="h-9 inline-flex items-center gap-1.5 bg-yellow hover:bg-amber-300 text-ink px-5 rounded-xl font-display font-black text-xs border-2 border-ink shadow-notebook-xs hover:scale-102 transition-all"
              >
                <User className="w-3.5 h-3.5 text-ink" />
                <span>{isArabic ? 'تسجيل الدخول' : 'Sign In'}</span>
              </Link>
            )}

            <Link
              href="/assessment"
              className="h-9 inline-flex items-center gap-1.5 bg-paper hover:bg-paper-inset text-ink px-3.5 rounded-xl font-extrabold text-xs border border-ink shadow-2xs hover:scale-102 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal" />
              <span>{isArabic ? 'الاختبارات' : 'Quizzes'}</span>
            </Link>

          </div>

          {/* Mobile Menu & Language Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="h-9 px-2.5 rounded-xl border border-ink/40 bg-paper-card text-ink font-bold text-xs flex items-center gap-1"
            >
              <span>{isArabic ? '🇬🇧 EN' : '🇸🇦 عربي'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 rounded-xl border border-ink bg-paper-card text-ink flex items-center justify-center shadow-2xs"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-dashed border-teal/30 bg-paper-card px-4 pt-3 pb-5 space-y-2.5 shadow-notebook-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-bold border ${
                  isActive
                    ? 'bg-yellow text-ink border-ink shadow-2xs'
                    : 'bg-paper border-transparent text-ink-soft hover:border-ink/30'
                }`}
              >
                <span>{isArabic ? link.labelAr : link.labelEn}</span>
              </Link>
            );
          })}

          <div className="pt-2 space-y-2">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-10 inline-flex items-center justify-center gap-2 bg-yellow text-ink border-2 border-ink rounded-xl font-display font-black text-sm shadow-notebook-xs"
              >
                <User className="w-4 h-4 text-purple" />
                <span>{isArabic ? 'لوحة التحكم' : 'Dashboard'}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-10 inline-flex items-center justify-center gap-2 bg-yellow text-ink border-2 border-ink rounded-xl font-display font-black text-sm shadow-notebook-xs"
              >
                <User className="w-4 h-4 text-ink" />
                <span>{isArabic ? 'تسجيل الدخول' : 'Sign In'}</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
