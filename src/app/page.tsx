'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ShieldAlert,
  Cpu,
  Coins,
  Building2,
  SunMedium,
  Palmtree,
  ArrowRight,
  Pencil,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const vision2030Highlights = [
    {
      icon: ShieldAlert,
      titleEn: 'Cybersecurity & Digital Defense',
      titleAr: 'الأمن السيبراني والدفاع الرقمي',
      descriptionEn: 'Protects national digital infrastructure and cloud systems.',
      descriptionAr: 'حماية البنية التحتية الرقمية والشبكات الوطنية والبيانات السحابية للمملكة.',
      bgAccent: 'bg-[#c9f2e8]',
    },
    {
      icon: Cpu,
      titleEn: 'Artificial Intelligence & Data',
      titleAr: 'الذكاء الاصطناعي وعلوم البيانات',
      descriptionEn: 'Pioneering generative models and smart systems under national initiatives.',
      descriptionAr: 'تطوير النماذج التوليدية والأنظمة الذكية وعلوم البيانات المتقدمة.',
      bgAccent: 'bg-[#f5efff]',
    },
    {
      icon: Coins,
      titleEn: 'Financial Technology',
      titleAr: 'التقنية المالية والمصرفية الرقمية',
      descriptionEn: 'Transforming digital banking and algorithmic finance.',
      descriptionAr: 'تحول المصرفية الرقمية والتمويل وحلول المدفوعات الحديثة.',
      bgAccent: 'bg-[#fff3d1]',
    },
    {
      icon: Building2,
      titleEn: 'Sustainable Architecture & Smart Cities',
      titleAr: 'العمارة المستدامة والمدن الذكية',
      descriptionEn: 'Designing zero-carbon cities for mega projects.',
      descriptionAr: 'تصميم المدن الذكية الخالية من الكربون في المشاريع الكبرى بالمملكة.',
      bgAccent: 'bg-[#e8f7f3]',
    },
    {
      icon: SunMedium,
      titleEn: 'Renewable Energy',
      titleAr: 'الطاقة المتجددة والنظيفة',
      descriptionEn: 'Advancing solar, wind, and green hydrogen power.',
      descriptionAr: 'تطوير تقنيات الطاقة الشمسية والهيدروجين الأخضر ضمن مبادرة السعودية الخضراء.',
      bgAccent: 'bg-emerald-100',
    },
    {
      icon: Palmtree,
      titleEn: 'Tourism & Global Hospitality',
      titleAr: 'السياحة والضيافة العالمية',
      descriptionEn: 'Managing heritage and luxury destinations across the Kingdom.',
      descriptionAr: 'إدارة الوجهات السياحية العالمية والتراثية واستقبال زوار المملكة.',
      bgAccent: 'bg-orange-100',
    },
  ];

  const steps = [
    {
      step: '1',
      titleEn: 'Answer Assessment Questions',
      titleAr: 'الإجابة على أسئلة التقييم',
      descEn: 'Evaluate your interests across practical, analytical, creative, social, leadership, and organizational fields.',
      descAr: 'تقييم ميولك في المجالات العملية، والتحليلية، والإبداعية، والاجتماعية، والقيادية، والتنظيمية.',
    },
    {
      step: '2',
      titleEn: 'Analyze Your Personal Profile',
      titleAr: 'تحليل نمطك وميولك المهنية',
      descEn: 'Our system calculates your unique personality profile and compatibility dimensions.',
      descAr: 'يقوم المحرك بحساب أبعاد شخصيتك وتحديد الميول المهنية المتوافقة معك بدقة.',
    },
    {
      step: '3',
      titleEn: 'Discover Matching Saudi Majors',
      titleAr: 'استكشاف التخصصات الجامعية المناسبة',
      descEn: 'Get matched with top university majors aligned with Saudi Vision 2030 priorities.',
      descAr: 'الحصول على توصيات للتخصصات في الجامعات السعودية المتوافقة مع طموحك ورؤية المملكة.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-paper overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center py-10 sm:py-14 bg-paper border-b border-[#1F1B13]/10 overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* --- HERO COPY & CTAS --- */}
            <div className="lg:col-span-7 flex flex-col items-start gap-4 text-start">
              
              {/* Dashed Tag Pill */}
              <div className="inline-flex items-center gap-2 bg-[#E8F7F5] border border-[#109E91]/40 rounded-full px-3.5 py-1 text-xs font-semibold text-[#0D7E74]">
                <Pencil className="w-3.5 h-3.5 text-[#109E91] shrink-0" />
                <span>{isArabic ? 'مقياس هولاند العلمي (RIASEC) · مواءمة رؤية 2030' : 'Holland Code Assessment · Vision 2030'}</span>
              </div>

              {/* Calligraphic Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-[#1F1B13] leading-tight tracking-tight">
                {isArabic ? (
                  <>تخصصك الأنسب.. <span className="hl-y inline-block">يبدأ من فهمك لنفسك</span></>
                ) : (
                  <span className="hl-y inline-block">Find Your Ideal Major</span>
                )}
              </h1>

              {/* Description Body */}
              <p className="font-prose text-sm sm:text-base text-[#4B4131] leading-relaxed max-w-xl">
                {isArabic
                  ? 'توقف عن الحيرة والتردد. مقياس علمي معتمد يحلل ميولك وشخصيتك في 10 دقائق، ويرشدك بدقة لأفضل التخصصات بالجامعات السعودية المتوافقة مع قدراتك وسوق العمل.'
                  : 'Stop second-guessing your future. Assess your personality in 10 minutes with validated scientific frameworks, matching your strengths with Saudi university majors.'}
              </p>

              {/* Hero CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Link
                  href="/assessment"
                  className="w-full sm:w-auto text-center font-display font-bold text-base text-white bg-[#109E91] hover:bg-[#0D7E74] border-2 border-[#1F1B13] rounded-xl px-7 py-3 shadow-[2.5px_2.5px_0_#1F1B13] hover:translate-x-[-1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0_#1F1B13] transition-all"
                  style={{ color: '#ffffff', textDecoration: 'none' }}
                >
                  {isArabic ? 'ابدأ الآن ←' : 'Start Now →'}
                </Link>

                <Link
                  href="/login"
                  className="text-center font-medium text-sm text-[#4B4131] hover:text-[#109E91] transition-colors self-center px-3 py-2"
                >
                  {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                </Link>
              </div>

              {/* Stats Row */}
              <div className="pt-3 flex items-center justify-between gap-4 sm:gap-8 w-full max-w-lg border-t border-[#1F1B13]/10 mt-2">
                <div className="text-center sm:text-start">
                  <b className="font-display font-black text-xl sm:text-2xl text-[#1F1B13] block"><span dir="ltr">42</span></b>
                  <span className="text-xs text-[#7D715D] font-medium">{isArabic ? 'سؤالاً تقييمياً' : 'Questions'}</span>
                </div>
                <div className="text-center sm:text-start">
                  <b className="font-display font-black text-xl sm:text-2xl text-[#1F1B13] block"><span dir="ltr">6</span></b>
                  <span className="text-xs text-[#7D715D] font-medium">{isArabic ? 'أبعاد للميول' : 'Dimensions'}</span>
                </div>
                <div className="text-center sm:text-start">
                  <b className="font-display font-black text-xl sm:text-2xl text-[#1F1B13] block"><span dir="ltr">50+</span></b>
                  <span className="text-xs text-[#7D715D] font-medium">{isArabic ? 'تخصصاً سعودياً' : 'Saudi Majors'}</span>
                </div>
                <div className="text-center sm:text-start">
                  <b className="font-display font-black text-xl sm:text-2xl text-[#109E91] block"><span dir="ltr">100%</span></b>
                  <span className="text-xs text-[#7D715D] font-medium">{isArabic ? 'تقرير فوري' : 'Instant Report'}</span>
                </div>
              </div>

            </div>

            {/* --- LEFT COLUMN (NOTEBOOK INTERACTIVE QUESTION CARD) --- */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              
              {/* Question Preview Card with lined paper inside */}
              <div className="notebook-paper-lined border-2 border-[#1f1b13] rounded-[18px] shadow-[5px_5px_0_#1f1b13] p-6 relative rotate-0 sm:rotate-1 space-y-3.5 notebook-spiral-edge">
                
                {/* Washi Tape Strip */}
                <div className={`absolute -top-3.5 ${isArabic ? 'right-12' : 'left-12'} w-28 h-6 bg-[#ffd66e]/95 -rotate-2 rounded-xs border border-[#1f1b13]/25 flex items-center justify-center text-[10px] font-black text-[#1f1b13] uppercase tracking-wider`}>
                  {isArabic ? 'نموذج من الدفتر' : 'Notebook Sample'}
                </div>

                {/* Card Header & Timer */}
                <div className="flex items-center justify-between border-b border-dashed border-[#8b5cf6]/35 pb-2.5 pt-1">
                  <span className="text-xs font-bold text-[#7d715d]">
                    {isArabic ? 'السؤال رقم 1 من 42 · مقياس الميول' : 'Question 01 of 42 · Interest Scale'}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-[#0d9488] flex items-center gap-1 font-mono">
                    <span>⏱️ <span dir="ltr">04:32</span></span>
                  </span>
                </div>

                {/* Question Text */}
                <div className="font-prose font-semibold text-base sm:text-lg leading-relaxed text-[#3a2f21] py-1">
                  {isArabic
                    ? 'ما هي الأنشطة التي تجد نفسك أكثر شغفاً وإبداعاً عند ممارستها؟'
                    : 'Which activities drive your creative passion and focus?'}
                </div>

                {/* Question Options */}
                <div className="space-y-2">
                  
                  {/* OPTION 1: SELECTED */}
                  <div className="border-2 border-[#0d9488] bg-[#e8f7f3] text-[#0d9488] font-bold rounded-[10px] p-3 text-xs sm:text-sm flex items-center justify-between shadow-2xs">
                    <span>{isArabic ? 'تحليل البيانات والبرمجة وحل المسائل' : 'Data analysis, programming & problem solving'}</span>
                    <span className="w-5 h-5 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-xs">✓</span>
                  </div>

                  {/* OPTION 2 */}
                  <div className="border border-[#dccfe8] rounded-[10px] p-3 text-[#5c4f3a] text-xs sm:text-sm font-medium bg-white/80">
                    {isArabic ? 'تصميم الواجهات والفنون والابتكار البصري' : 'UI/UX Design, creative arts & media'}
                  </div>

                  {/* OPTION 3 */}
                  <div className="border border-[#dccfe8] rounded-[10px] p-3 text-[#5c4f3a] text-xs sm:text-sm font-medium bg-white/80">
                    {isArabic ? 'إدارة المشاريع والتخطيط وقيادة الفرق' : 'Project management, planning & leadership'}
                  </div>

                </div>

                {/* Recommendation Box */}
                <div className="mt-3 bg-[#f5efff] border-[1.5px] border-dashed border-[#7c3aed] rounded-xl p-3 text-xs text-[#5b21b6] font-prose leading-relaxed">
                  <b>{isArabic ? 'توصية التخصص:' : 'Major Recommendation:'}</b> {isArabic ? 'الأمن السيبراني والذكاء الاصطناعي' : 'Cybersecurity & Artificial Intelligence'}
                </div>

                {/* Sticky Note Badge */}
                <div className="mt-2 bg-[#ffd66e] border-2 border-[#3a2f21] rounded px-3 py-1.5 font-display font-bold text-xs shadow-[2.5px_2.5px_0_rgba(58,47,33,0.3)] inline-block">
                  {isArabic ? 'ملاحظة: تظهر النتائج والتوصيات فور إتمام التقييم ⚡' : 'Note: Instant recommendations upon quiz completion ⚡'}
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= VISION 2030 SECTORS ================= */}
      <section className="py-10 md:py-14 bg-white border-b border-[#1F1B13]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1.5">
            <span className="text-xs font-bold text-[#E5A93C] tracking-wider uppercase">
              {isArabic ? 'تخصصات المستقبل والوظائف الواعدة' : 'Future Majors & Promising Careers'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1F1B13]">
              {isArabic ? (
                <>قطاعات واعدة متوافقة مع <span className="hl-y">رؤية السعودية 2030</span></>
              ) : (
                <>High-Demand <span className="hl-y">Saudi Vision 2030</span> Sectors</>
              )}
            </h2>
            <p className="text-[#4B4131] text-xs sm:text-sm font-prose leading-relaxed">
              {isArabic
                ? 'يربط محرك بوصلتي نتائج تقييمك مباشرة مع القطاعات الاستراتيجية الوطنية ضمن برنامج تنمية القدرات البشرية.'
                : 'Bausalty maps your profile directly to strategic national sectors under the Human Capability Development Program.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {vision2030Highlights.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.titleEn}
                  className="bg-white border border-[#1F1B13]/15 rounded-2xl p-5 shadow-[2px_2px_0_#1F1B13] hover:shadow-[3px_3px_0_#109E91] hover:border-[#109E91] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className={`w-10 h-10 rounded-xl ${item.bgAccent} border border-[#1F1B13]/20 text-[#1F1B13] flex items-center justify-center`}>
                      <IconComp className="w-5 h-5 text-[#109E91]" />
                    </div>

                    <h3 className="text-base font-display font-bold text-[#1F1B13]">
                      {isArabic ? item.titleAr : item.titleEn}
                    </h3>

                    <p className="text-[#4B4131] text-xs font-prose leading-relaxed">
                      {isArabic ? item.descriptionAr : item.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1F1B13]/10 flex items-center justify-between mt-3">
                    <span className="text-[11px] font-semibold text-[#7D715D] bg-[#FAF6EA] border border-[#1F1B13]/15 px-2 py-0.5 rounded-full">
                      {isArabic ? 'رؤية 2030' : 'Vision 2030'}
                    </span>
                    <Link
                      href="/majors"
                      className="text-xs font-bold text-[#109E91] hover:text-[#0D7E74] flex items-center gap-1"
                    >
                      <span>{isArabic ? 'استكشف التخصصات' : 'Explore Majors'}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 3 SIMPLE STEPS ================= */}
      <section className="py-10 md:py-14 bg-paper border-b border-[#1F1B13]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1.5">
            <span className="text-xs font-bold text-[#E5A93C] tracking-wider uppercase">
              {isArabic ? 'خطوات التقييم المبسطة' : 'Assessment Steps'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1F1B13]">
              {isArabic ? (
                <>رحلتك لاكتشاف تخصصك في <span className="hl-y">3 خطوات سهلة</span></>
              ) : (
                <>Discover Your Major in <span className="hl-y">3 Simple Steps</span></>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((item) => (
              <div
                key={item.titleEn}
                className="bg-white border border-[#1F1B13]/15 rounded-2xl p-5 shadow-[2px_2px_0_#1F1B13] space-y-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FEF6E8] text-[#1F1B13] border border-[#E5A93C]/40 flex items-center justify-center font-display font-black text-base shadow-2xs">
                  {item.step}
                </div>

                <h3 className="text-lg font-display font-bold text-[#1F1B13]">
                  {isArabic ? item.titleAr : item.titleEn}
                </h3>

                <p className="text-[#4B4131] text-xs font-prose leading-relaxed">
                  {isArabic ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="py-10 bg-[#FEF6E8] border-b border-[#1F1B13]/10">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-[#1F1B13]">
            {isArabic ? 'جاهز لاكتشاف تخصصك الجامعي الأنسب؟' : 'Ready to Discover Your Ideal College Major?'}
          </h2>
          <p className="text-[#4B4131] font-prose text-xs sm:text-sm max-w-lg mx-auto font-medium leading-relaxed">
            {isArabic
              ? 'انضم الآن لآلاف الطلاب وابدأ اختبار تحديد الميول مجاناً وتعرّف على التخصصات المناسبة لك فوراً.'
              : 'Join thousands of Saudi students and get your personalized major report now.'}
          </p>
          <div className="pt-2">
            <Link
              href="/assessment"
              className="h-11 inline-flex items-center justify-center gap-2 bg-[#109E91] hover:bg-[#0D7E74] text-white px-7 rounded-xl font-display font-bold text-sm border-2 border-[#1F1B13] shadow-[2.5px_2.5px_0_#1F1B13] hover:translate-x-[-1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0_#1F1B13] transition-all"
            >
              <Compass className="w-4 h-4 text-[#FEF6E8]" />
              <span>{isArabic ? 'ابدأ الاختبار الآن' : 'Start Free Assessment'}</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
