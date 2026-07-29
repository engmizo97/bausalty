'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Brain, Award, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AssessmentHubPage() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="flex-1 bg-paper py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Hub Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-yellow text-ink border-2 border-ink px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold shadow-notebook-xs">
            <Compass className="w-4 h-4 text-teal" />
            <span>{isArabic ? 'مركز اختبارات الشخصية والتخصصات' : 'Bausalty Quiz & Assessment Hub'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-black text-ink">
            {isArabic ? 'اختر الاختبار المناسب لمسارك' : 'Choose Your Assessment Path'}
          </h1>
          <p className="text-sm sm:text-base text-ink-soft font-prose leading-relaxed">
            {isArabic
              ? 'اختبارات علمية مدروسة لمساعدتك في فهم نمط شخصيتك واكتشاف التخصصات الجامعية السعودية المتوافقة مع ميولك ورؤية 2030.'
              : 'Scientifically validated assessments designed to analyze your personality archetype and match you with high-demand Saudi university majors.'}
          </p>
        </div>

        {/* 2 Quiz Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* CARD 1: 16Personalities (FREE) */}
          <div className="bg-paper-card rounded-notebook p-6 sm:p-8 border-2 border-ink shadow-notebook-md flex flex-col justify-between space-y-6 hover:shadow-notebook-lg transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple text-white border-2 border-ink flex items-center justify-center shadow-notebook-xs">
                  <Brain className="w-7 h-7 text-yellow" />
                </div>
                <span className="bg-emerald-100 text-emerald-900 border-2 border-emerald-700 px-3.5 py-1 rounded-full text-xs font-black uppercase shadow-2xs">
                  {isArabic ? 'مجاني 100%' : '100% FREE'}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-display font-black text-ink leading-tight">
                  {isArabic ? 'اختبار نمط الشخصية (16Personalities)' : '16Personalities Archetype Test'}
                </h2>
                <p className="text-xs font-bold text-muted mt-1">
                  {isArabic ? 'استكشاف الأبعاد الأربعة للشخصية' : '4-Dimension Myers-Briggs Assessment'}
                </p>
              </div>

              <p className="text-sm text-ink-soft font-prose leading-relaxed">
                {isArabic
                  ? 'يقيس هذا الاختبار أبعاد شخصيتك الأربعة (الانبساط/الانطواء، الحدس/الحس، التفكير/المشاعر، الحكم/الإدراك) لتحديد نمطك النفسي.'
                  : 'Measures your personality across 4 core dimensions (E/I, S/N, T/F, J/P) to identify your archetype (e.g. INTJ Architect, ENFP Campaigner).'}
              </p>

              <ul className="space-y-2 text-xs font-bold text-ink pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>{isArabic ? 'بدون أي رسوم — نتائج فورية' : 'Completely Free — Instant Results'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>{isArabic ? 'تحليل نقاط القوة وأسلوب التعلم الأنسب' : 'Strengths & Optimal Learning Style Breakdown'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>{isArabic ? 'ربط مباشر مع التخصصات الجامعية' : 'Direct linkage to Saudi University Majors'}</span>
                </li>
              </ul>
            </div>

            <Link
              href="/personality-test"
              className="w-full h-14 min-h-[48px] bg-teal hover:bg-teal-deep text-white border-2 border-ink rounded-2xl font-display font-black text-base shadow-notebook-xs flex items-center justify-center gap-2 hover:scale-102 transition-all mt-4"
            >
              <Sparkles className="w-5 h-5 text-yellow" />
              <span>{isArabic ? 'ابدأ اختبار الشخصية المجاني' : 'Start Free Personality Test'}</span>
              <ArrowRight className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          {/* CARD 2: Holland Code (RIASEC) Career Test */}
          <div className="bg-yellow rounded-notebook p-6 sm:p-8 border-2 border-ink shadow-notebook-md flex flex-col justify-between space-y-6 hover:shadow-notebook-lg transition-all relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-teal text-white border-2 border-ink flex items-center justify-center shadow-notebook-xs">
                  <Award className="w-7 h-7 text-yellow" />
                </div>
                <span className="bg-paper-card text-ink border-2 border-ink px-3.5 py-1 rounded-full text-xs font-black uppercase shadow-2xs">
                  {isArabic ? 'معاينة مجانية / 60 ر.س للتقرير الكامل' : 'Sample Free / 60 SAR Full Access'}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-display font-black text-ink leading-tight">
                  {isArabic ? 'اختبار هولاند للتخصصات (RIASEC)' : 'Holland Code (RIASEC) Career Test'}
                </h2>
                <p className="text-xs font-bold text-ink-soft mt-1">
                  {isArabic ? 'محرك مطابقة التخصصات ورؤية 2030' : 'Major Recommendation & Vision 2030 Engine'}
                </p>
              </div>

              <p className="text-sm text-ink-soft font-prose leading-relaxed">
                {isArabic
                  ? 'يقيس ميولك المهنية عبر 42 سؤالاً نفسياً معتمداً لمطابقة كودك الخماسي (IRC, IAS) مع التخصصات المستهدفة في رؤية السعودية 2030.'
                  : '42 psychometric items calculating your Holland Code vector (e.g. IRC, IAS) matched with high-demand Saudi Vision 2030 university majors.'}
              </p>

              <ul className="space-y-2 text-xs font-bold text-ink pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>{isArabic ? 'معاينة مجانية لأول 12 سؤالاً' : 'Free Preview Sample for first 12 questions'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>{isArabic ? 'رسم هولاند الخماسي التفاعلي (Radar Chart)' : 'Interactive RIASEC Radar Profile Chart'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>{isArabic ? 'بطاقة شخصية قابلة للتحميل + أهداف القبول' : 'Downloadable Bausalty Card & Admission Targets'}</span>
                </li>
              </ul>
            </div>

            <Link
              href="/assessment/quiz"
              className="w-full h-14 min-h-[48px] bg-teal hover:bg-teal-deep text-white border-2 border-ink rounded-2xl font-display font-black text-base shadow-notebook-xs flex items-center justify-center gap-2 hover:scale-102 transition-all mt-4"
            >
              <Zap className="w-5 h-5 text-yellow" />
              <span>{isArabic ? 'ابدأ اختبار هولاند للتخصصات' : 'Start RIASEC Career Test'}</span>
              <ArrowRight className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
