'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Brain, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
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
            <span>{isArabic ? 'مركز اختبارات الشخصية والتخصصات' : 'Bausalty Assessment Hub'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-black text-ink">
            {isArabic ? 'اختر الاختبار المناسب لمسارك' : 'Choose Your Assessment Path'}
          </h1>
          <p className="text-sm sm:text-base text-ink-soft font-prose leading-relaxed">
            {isArabic
              ? 'اختبارات علمية مدروسة لمساعدتك في فهم نمط شخصيتك واكتشاف التخصصات الجامعية السعودية المتوافقة مع ميولك ورؤية المملكة ٢٠٣٠.'
              : 'Scientifically validated assessments designed to analyze your personality archetype and match you with high-demand Saudi university majors.'}
          </p>
        </div>

        {/* 2 Quiz Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* CARD 1: 16Personalities (FREE) */}
          <div className="notebook-paper-lined rounded-notebook p-6 sm:p-8 border-2 border-ink shadow-notebook-md flex flex-col justify-between space-y-6 hover:shadow-notebook-lg transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-teal text-white border-2 border-ink flex items-center justify-center shadow-notebook-xs">
                  <Brain className="w-7 h-7 text-yellow" />
                </div>
                <span className="bg-emerald-100 text-emerald-900 border-2 border-emerald-700 px-3.5 py-1 rounded-full text-xs font-black uppercase shadow-2xs">
                  {isArabic ? 'مجاني ١٠٠٪' : '100% FREE'}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-display font-black text-ink leading-tight">
                  {isArabic ? 'اختبار الأنماط الستة عشر للشخصية' : '16Personalities Archetype Test'}
                </h2>
                <p className="text-xs font-bold text-muted mt-1">
                  {isArabic ? 'استكشاف الأبعاد الأربعة للشخصية' : '4-Dimension Personality Assessment'}
                </p>
              </div>

              <p className="text-sm text-ink-soft font-prose leading-relaxed">
                {isArabic
                  ? 'يقيس هذا الاختبار أبعاد شخصيتك الأربعة (الانبساط/الانطواء، الحدس/الحس، التفكير/المشاعر، الحكم/الإدراك) لتحديد نمطك النفسي وطريقة تفاعلك مع البيئة المحيطة.'
                  : 'Measures your personality across 4 core dimensions to identify your personal strengths and optimal cognitive style.'}
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

          {/* CARD 2: Holland Code Career Test */}
          <div className="bg-yellow rounded-notebook p-6 sm:p-8 border-2 border-ink shadow-notebook-md flex flex-col justify-between space-y-6 hover:shadow-notebook-lg transition-all relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-teal text-white border-2 border-ink flex items-center justify-center shadow-notebook-xs">
                  <Award className="w-7 h-7 text-yellow" />
                </div>
                <span className="bg-paper-card text-ink border-2 border-ink px-3.5 py-1 rounded-full text-xs font-black uppercase shadow-2xs">
                  {isArabic ? 'معاينة مجانية / تقرير شامل' : 'Sample Free / Full Report'}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-display font-black text-ink leading-tight">
                  {isArabic ? 'اختبار هولاند لتحديد الميول والتخصصات' : 'Holland Code Career Test'}
                </h2>
                <p className="text-xs font-bold text-ink-soft mt-1">
                  {isArabic ? 'مطابقة التخصصات الجامعية مع رؤية ٢٠٣٠' : 'Major Recommendation & Vision 2030 Engine'}
                </p>
              </div>

              <p className="text-sm text-ink-soft font-prose leading-relaxed">
                {isArabic
                  ? 'يقيس ميولك المهنية عبر ٤٢ سؤالاً نفسياً معتمداً لمطابقة نمطك الشخصي مع التخصصات المستهدفة في رؤية المملكة ٢٠٣٠.'
                  : '42 psychometric items calculating your Holland profile matched with high-demand Saudi Vision 2030 university majors.'}
              </p>

              <ul className="space-y-2 text-xs font-bold text-ink pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>{isArabic ? 'معاينة مجانية لأول ١٢ سؤالاً' : 'Free Preview Sample for first 12 questions'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>{isArabic ? 'توصيات بأفضل التخصصات والجامعات السعودية' : 'Top Saudi Majors & University Recommendations'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>{isArabic ? 'بطاقة شخصية قابلة للتحميل والمشاركة' : 'Downloadable Personality Card'}</span>
                </li>
              </ul>
            </div>

            <Link
              href="/assessment/quiz"
              className="w-full h-14 min-h-[48px] bg-teal hover:bg-teal-deep text-white border-2 border-ink rounded-2xl font-display font-black text-base shadow-notebook-xs flex items-center justify-center gap-2 hover:scale-102 transition-all mt-4"
            >
              <Compass className="w-5 h-5 text-yellow" />
              <span>{isArabic ? 'ابدأ اختبار التخصصات' : 'Start Career Assessment'}</span>
              <ArrowRight className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
