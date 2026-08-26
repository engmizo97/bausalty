'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Compass, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <footer className="bg-paper-inset text-ink border-t-2 border-ink pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/bawsalati-logo.webp"
                alt="بوصلتي"
                width={40}
                height={40}
                className="w-10 h-10 object-contain shrink-0"
              />
              <div>
                <span className="text-2xl font-display font-black text-ink">
                  {isArabic ? 'بوصلتي' : 'Bausalty'}
                </span>
              </div>
            </div>

            <p className="text-ink-soft text-sm sm:text-base leading-relaxed max-w-md font-prose">
              {isArabic
                ? 'بوصلتي هي منصة لتحديد الميول المهنية ومطابقة أنماط الشخصية مع التخصصات الجامعية لطلاب وطالبات المملكة العربية السعودية، بما يتوافق مع متطلبات سوق العمل ورؤية المملكة ٢٠٣٠.'
                : 'Bausalty is a career guidance and psychometric personality alignment engine designed for Saudi high school and university students, aligned with Saudi Vision 2030.'}
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-paper-card border-2 border-ink text-xs font-bold text-teal shadow-notebook-xs">
              <span>{isArabic ? 'تحسين التعليمية' : 'Tahseen Education'}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-base font-display font-bold text-ink uppercase tracking-wider">
              {isArabic ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2 text-sm font-bold">
              <li>
                <Link href="/" className="text-ink-soft hover:text-teal transition-colors">
                  {isArabic ? 'الرئيسية' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="text-ink-soft hover:text-teal transition-colors">
                  {isArabic ? 'الاختبارات الأكاديمية' : 'Assessments'}
                </Link>
              </li>
              <li>
                <Link href="/majors" className="text-ink-soft hover:text-teal transition-colors">
                  {isArabic ? 'مستكشف التخصصات' : 'Majors Explorer'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Vision 2030 & Accreditation */}
          <div className="space-y-3">
            <h3 className="text-base font-display font-bold text-ink uppercase tracking-wider">
              {isArabic ? 'رؤية السعودية ٢٠٣٠' : 'Saudi Vision 2030'}
            </h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed font-prose">
              {isArabic
                ? 'تم تصميم المحرك لدعم برنامج تنمية القدرات البشرية في قطاعات الأمن السيبراني، والذكاء الاصطناعي، والطاقة المتجددة، والسياحة.'
                : 'Designed to support the Human Capability Development Program across cybersecurity, AI, renewable energy, and tourism sectors.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-black text-teal">
              <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
              <span>{isArabic ? 'متوافق مع برنامج تنمية القدرات البشرية' : 'Aligned with Human Capability Development'}</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t-2 border-ink flex flex-col sm:flex-row items-center justify-between text-xs text-ink-soft gap-4">
          <p>
            {isArabic
              ? `© ${new Date().getFullYear()} بوصلتي. جميع الحقوق محفوظة. تحسين التعليمية.`
              : `© ${new Date().getFullYear()} Bausalty. All rights reserved. Tahseen Education.`}
          </p>
          <div className="flex items-center gap-1 font-bold">
            <span>{isArabic ? 'صُنعت بحب لشباب وبنات الوطن' : 'Engineered with passion for Saudi Youth'}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
