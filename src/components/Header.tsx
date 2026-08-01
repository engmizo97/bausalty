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
    <header className="sticky top-0 z-50 bg-[#fffdf6]/95 backdrop-blur-md border-b-2 border-ink shadow-notebook-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tahseen AI Group Badge */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 rounded-xl bg-teal text-white border-2 border-ink flex items-center justify-center shadow-notebook-xs group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-7 h-7 text-yellow" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-display font-black tracking-tight text-ink">
                  Bausalty
                </span>
                <span className="text-xl font-display font-bold text-teal">
                  بوصالتي
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                <span className="inline-block w-2 h-2 rounded-full bg-teal" />
                <span>Tahseen AI Group</span>
                <span className="text-[10px] bg-teal-soft text-teal-deep px-1.5 py-0.5 rounded-full font-bold border border-teal">
                  تحسين
                </span>
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
                  className={`text-sm lg:text-base font-bold transition-all duration-150 py-1.5 px-3 rounded-xl ${
                    isActive
                      ? 'bg-yellow text-ink border-2 border-ink shadow-notebook-xs'
                      : 'text-ink-soft hover:text-ink hover:bg-paper-inset'
                  }`}
                >
                  <span>{isArabic ? link.labelAr : link.labelEn}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs, Auth Button & Language Toggle */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* PROMINENT LANGUAGE TOGGLE BUTTON */}
            <button
              onClick={toggleLanguage}
              className="h-11 px-4 rounded-xl border-2 border-ink bg-paper-card text-ink font-bold text-sm shadow-notebook-xs hover:bg-yellow hover:scale-102 active:scale-98 transition-all flex items-center gap-2 min-w-[120px] justify-center"
              aria-label="Language Toggle"
            >
              <Languages className="w-4 h-4 text-teal" />
              <span>{isArabic ? '🇬🇧 English' : '🇸🇦 العربية'}</span>
            </button>

            {/* Dynamic Sign In / Dashboard Button */}
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="h-11 inline-flex items-center gap-2 bg-yellow hover:bg-amber-300 text-ink px-5 rounded-xl font-display font-black text-sm border-2 border-ink shadow-notebook-xs hover:scale-102 active:scale-98 transition-all"
              >
                <User className="w-4 h-4 text-purple" />
                <span>{isArabic ? 'لوحة التحكم' : 'Dashboard'}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="h-11 inline-flex items-center gap-2 bg-teal hover:bg-teal-deep text-white px-5 rounded-xl font-extrabold text-sm border-2 border-ink shadow-notebook-xs hover:scale-102 active:scale-98 transition-all"
              >
                <User className="w-4 h-4 text-yellow" />
                <span>{isArabic ? 'تسجيل الدخول' : 'Sign In'}</span>
              </Link>
            )}

            <Link
              href="/assessment"
              className="h-11 inline-flex items-center gap-2 bg-paper hover:bg-paper-inset text-ink px-4 rounded-xl font-bold text-sm border-2 border-ink shadow-notebook-xs hover:scale-102 transition-all"
            >
              <Sparkles className="w-4 h-4 text-teal" />
              <span>{isArabic ? 'الاختبارات' : 'Quizzes'}</span>
            </Link>

          </div>

          {/* Mobile Menu & Language Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="h-11 px-3 rounded-xl border-2 border-ink bg-paper-card text-ink font-bold text-xs shadow-notebook-xs flex items-center gap-1.5"
            >
              <span>{isArabic ? '🇬🇧 EN' : '🇸🇦 عربي'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-11 w-11 rounded-xl border-2 border-ink bg-paper-card text-ink flex items-center justify-center shadow-notebook-xs"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-ink bg-[#fffdf6] px-4 pt-4 pb-6 space-y-3 shadow-notebook-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-bold border-2 ${
                  isActive
                    ? 'bg-yellow text-ink border-ink shadow-notebook-xs'
                    : 'bg-paper border-transparent text-ink-soft hover:border-ink'
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
                className="w-full h-12 inline-flex items-center justify-center gap-2 bg-yellow text-ink border-2 border-ink rounded-xl font-display font-black text-base shadow-notebook-sm"
              >
                <User className="w-5 h-5 text-purple" />
                <span>{isArabic ? 'لوحة التحكم' : 'Dashboard'}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-12 inline-flex items-center justify-center gap-2 bg-teal text-white border-2 border-ink rounded-xl font-extrabold text-base shadow-notebook-sm"
              >
                <User className="w-5 h-5 text-yellow" />
                <span>{isArabic ? 'تسجيل الدخول' : 'Sign In'}</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
