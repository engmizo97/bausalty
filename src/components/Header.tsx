'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Sparkles, Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', labelEn: 'Home', labelAr: 'الرئيسية' },
    { href: '/assessment', labelEn: 'Assessment', labelAr: 'اختبار الشخصية' },
    { href: '/majors', labelEn: 'Majors Explorer', labelAr: 'مستكشف التخصصات' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tahseen AI Group Badge */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#0284C7] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-7 h-7 animate-spin-slow" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  Bausalty
                </span>
                <span className="text-xl font-bold text-[#0284C7]">
                  بوصالتي
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                <span>Tahseen AI Group</span>
                <span className="text-[10px] bg-sky-100 text-[#0284C7] px-1.5 py-0.5 rounded font-bold">
                  تحسين
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#1E3A8A] font-bold border-b-2 border-[#0284C7] pb-1'
                      : 'text-slate-600 hover:text-[#0284C7]'
                  }`}
                >
                  <span>{link.labelEn}</span>
                  <span className="text-xs text-slate-400 font-normal">({link.labelAr})</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#0284C7] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:brightness-110 active:scale-98 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4" />
              <span>Take Test / ابدأ الاختبار</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-semibold ${
                  isActive
                    ? 'bg-sky-50 text-[#1E3A8A] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{link.labelEn}</span>
                  <span className="text-xs text-slate-500 font-normal">{link.labelAr}</span>
                </div>
              </Link>
            );
          })}

          <div className="pt-2">
            <Link
              href="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1E3A8A] to-[#0284C7] text-white px-5 py-3 rounded-xl font-bold text-base shadow-md"
            >
              <Sparkles className="w-5 h-5" />
              <span>Take Test / ابدأ الاختبار</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
