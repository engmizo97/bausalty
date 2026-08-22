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
      step: isArabic ? '١' : '1',
      titleEn: 'Answer Assessment Questions',
      titleAr: 'الإجابة على أسئلة التقييم',
      descEn: 'Evaluate your interests across practical, analytical, creative, social, leadership, and organizational fields.',
      descAr: 'تقييم ميولك في المجالات العملية، والتحليلية، والإبداعية، والاجتماعية، والقيادية، والتنظيمية.',
    },
    {
      step: isArabic ? '٢' : '2',
      titleEn: 'Analyze Your Personal Profile',
      titleAr: 'تحليل نمطك وميولك المهنية',
      descEn: 'Our system calculates your unique personality profile and compatibility dimensions.',
      descAr: 'يقوم المحرك بحساب أبعاد شخصيتك وتحديد الميول المهنية المتوافقة معك بدقة.',
    },
    {
      step: isArabic ? '٣' : '3',
      titleEn: 'Discover Matching Saudi Majors',
      titleAr: 'استكشاف التخصصات الجامعية المناسبة',
      descEn: 'Get matched with top university majors aligned with Saudi Vision 2030 priorities.',
      descAr: 'الحصول على توصيات للتخصصات في الجامعات السعودية المتوافقة مع طموحك ورؤية المملكة.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-paper overflow-x-hidden notebook-margin-line">
      
      {/* ================= HERO SECTION (NOTEBOOK AESTHETIC) ================= */}
      <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center py-10 sm:py-16 bg-paper border-b-2 border-dashed border-[#3a2f21]/20 overflow-hidden">
        
        {/* Notebook Spiral Accent Lines on Background */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* --- HERO COPY & CTAS --- */}
            <div className="lg:col-span-7 flex flex-col items-start gap-5 text-right">
              
              {/* Notebook Dashed Tag Pill */}
              <div className="inline-flex items-center gap-2 bg-[#c9f2e8] border-[1.5px] border-dashed border-[#0d9488] rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold text-[#0f766e] -rotate-1 shadow-2xs">
                <Pencil className="w-3.5 h-3.5 text-[#0d9488] shrink-0" />
                <span>{isArabic ? 'دليلك لاختيار التخصص الجامعي المناسب' : 'Your Guide to the Ideal College Major'}</span>
              </div>

              {/* Calligraphic Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-[#3a2f21] leading-[1.3] tracking-tight">
                {isArabic ? (
                  <span className="hl-y inline-block">اكتشف تخصصك الأنسب</span>
                ) : (
                  <span className="hl-y inline-block">Find Your Ideal Major</span>
                )}
              </h1>

              {/* Description Body */}
              <p className="font-prose text-base sm:text-lg text-[#5c4f3a] leading-[2.1] max-w-xl">
                {isArabic
                  ? 'طريقك نحو التخصص الجامعي الأنسب يبدأ من هنا: حلل مهاراتك وميولك باختبارات علمية معتمدة، وتعرف على التخصصات المتوافقة مع قدراتك في الجامعات السعودية وسوق العمل.'
                  : 'Your journey to the ideal university major starts here: assess your personality with validated scientific frameworks, and align your strengths with Saudi market demand.'}
              </p>

              {/* Hero CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/assessment"
                  className="w-full sm:w-auto text-center font-display font-bold text-lg text-white bg-[#0d9488] hover:bg-[#0f766e] border-2 border-[#3a2f21] rounded-[14px] px-8 py-3.5 shadow-[3px_3px_0_#3a2f21] hover:translate-x-[-1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0_#3a2f21] transition-all"
                >
                  {isArabic ? 'ابدأ التقييم مجاناً ←' : 'Start Assessment Free ←'}
                </Link>

                <Link
                  href="/login"
                  className="text-center font-bold text-base text-[#3a2f21] border-b-2 border-dashed border-[#3a2f21] pb-0.5 hover:text-[#0d9488] transition-colors self-center"
                >
                  {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                </Link>
              </div>

              {/* Stats Row */}
              <div className="pt-4 flex items-center justify-between gap-4 sm:gap-8 w-full max-w-lg border-t border-dashed border-[#3a2f21]/20 mt-2">
                <div className="text-center sm:text-right">
                  <b className="font-display font-black text-2xl sm:text-3xl text-[#3a2f21] block">{isArabic ? '٤٢' : '42'}</b>
                  <span className="text-xs text-[#8a7a5f] font-bold">{isArabic ? 'سؤالاً تقييمياً' : 'Questions'}</span>
                </div>
                <div className="text-center sm:text-right">
                  <b className="font-display font-black text-2xl sm:text-3xl text-[#3a2f21] block">{isArabic ? '٦' : '6'}</b>
                  <span className="text-xs text-[#8a7a5f] font-bold">{isArabic ? 'أبعاد للميول' : 'Dimensions'}</span>
                </div>
                <div className="text-center sm:text-right">
                  <b className="font-display font-black text-2xl sm:text-3xl text-[#3a2f21] block">{isArabic ? '+٥٠' : '+50'}</b>
                  <span className="text-xs text-[#8a7a5f] font-bold">{isArabic ? 'تخصصاً سعودياً' : 'Saudi Majors'}</span>
                </div>
                <div className="text-center sm:text-right">
                  <b className="font-display font-black text-2xl sm:text-3xl text-[#0d9488] block">{isArabic ? '١٠٠٪' : '100%'}</b>
                  <span className="text-xs text-[#8a7a5f] font-bold">{isArabic ? 'تقرير فوري' : 'Instant Report'}</span>
                </div>
              </div>

            </div>

            {/* --- LEFT COLUMN (NOTEBOOK INTERACTIVE QUESTION CARD) --- */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              
              {/* Question Preview Card with lined paper inside */}
              <div className="notebook-paper-lined border-2 border-[#3a2f21] rounded-[18px] shadow-[5px_5px_0_#3a2f21] p-6 relative rotate-0 sm:rotate-1 space-y-3.5 notebook-spiral-edge">
                
                {/* Washi Tape Strip */}
                <div className="absolute -top-3.5 right-12 w-28 h-6 bg-[#ffd66e]/95 -rotate-2 rounded-xs border border-[#3a2f21]/25 flex items-center justify-center text-[10px] font-black text-[#3a2f21] uppercase tracking-wider">
                  {isArabic ? 'نموذج من الدفتر' : 'Notebook Sample'}
                </div>

                {/* Card Header & Timer */}
                <div className="flex items-center justify-between border-b border-dashed border-[#3a2f21]/20 pb-2.5 pt-1">
                  <span className="text-xs font-bold text-[#8a7a5f]">
                    {isArabic ? 'السؤال رقم ١ من ٤٢ · مقياس الميول' : 'Question 01 of 42 · Interest Scale'}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-[#0d9488] flex items-center gap-1">
                    <span>⏱️ {isArabic ? '٠٤:٣٢' : '04:32'}</span>
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
      <section className="py-12 md:py-16 bg-white border-b-2 border-dashed border-[#3a2f21]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-[#c2410c] tracking-wider uppercase">
              {isArabic ? 'الصفحة الثانية من الدفتر · تخصصات المستقبل' : 'Page 2 · Future Majors'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#3a2f21]">
              {isArabic ? (
                <>قطاعات واعدة متوافقة مع <span className="hl-y">رؤية السعودية ٢٠٣٠</span></>
              ) : (
                <>High-Demand <span className="hl-y">Saudi Vision 2030</span> Sectors</>
              )}
            </h2>
            <p className="text-[#5c4f3a] text-sm font-prose leading-relaxed">
              {isArabic
                ? 'يربط محرك بوصلتي نتائج تقييمك مباشرة مع القطاعات الاستراتيجية الوطنية ضمن برنامج تنمية القدرات البشرية.'
                : 'Bausalty maps your profile directly to strategic national sectors under the Human Capability Development Program.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vision2030Highlights.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.titleEn}
                  className="notebook-paper-lined border-2 border-[#3a2f21] rounded-[18px] p-6 shadow-[3px_3px_0_#3a2f21] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0_#3a2f21] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-xl ${item.bgAccent} border-2 border-[#3a2f21] text-[#3a2f21] flex items-center justify-center shadow-2xs`}>
                      <IconComp className="w-6 h-6 text-[#0d9488]" />
                    </div>

                    <h3 className="text-lg font-display font-bold text-[#3a2f21]">
                      {isArabic ? item.titleAr : item.titleEn}
                    </h3>

                    <p className="text-[#5c4f3a] text-xs sm:text-sm font-prose leading-relaxed">
                      {isArabic ? item.descriptionAr : item.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#3a2f21]/15 flex items-center justify-between mt-4">
                    <span className="text-[11px] font-bold text-[#8a7a5f] bg-white border border-[#3a2f21]/30 px-2.5 py-0.5 rounded-full">
                      {isArabic ? 'رؤية ٢٠٣٠' : 'Vision 2030'}
                    </span>
                    <Link
                      href="/majors"
                      className="text-xs font-bold text-[#0d9488] hover:text-[#0f766e] flex items-center gap-1"
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
      <section className="py-12 md:py-16 bg-paper border-b-2 border-dashed border-[#3a2f21]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-[#c2410c] tracking-wider uppercase">
              {isArabic ? 'الصفحة الثالثة من الدفتر · خطوات التقييم' : 'Page 3 · Assessment Steps'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#3a2f21]">
              {isArabic ? (
                <>رحلتك لاكتشاف تخصصك في <span className="hl-y">٣ خطوات سهلة</span></>
              ) : (
                <>Discover Your Major in <span className="hl-y">3 Simple Steps</span></>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item) => (
              <div
                key={item.titleEn}
                className="notebook-paper-lined border-2 border-[#3a2f21] rounded-[18px] p-6 shadow-[3px_3px_0_#3a2f21] space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ffd66e] text-[#3a2f21] border-2 border-[#3a2f21] flex items-center justify-center font-display font-black text-lg shadow-2xs">
                  {item.step}
                </div>

                <h3 className="text-xl font-display font-bold text-[#3a2f21]">
                  {isArabic ? item.titleAr : item.titleEn}
                </h3>

                <p className="text-[#5c4f3a] text-xs sm:text-sm font-prose leading-relaxed">
                  {isArabic ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="py-12 bg-[#ffd66e] border-b-2 border-dashed border-[#3a2f21]/30">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-display font-black text-[#3a2f21]">
            {isArabic ? 'جاهز لاكتشاف تخصصك الجامعي الأنسب؟' : 'Ready to Discover Your Ideal College Major?'}
          </h2>
          <p className="text-[#3a2f21] font-prose text-sm max-w-lg mx-auto font-medium leading-relaxed">
            {isArabic
              ? 'انضم الآن لآلاف الطلاب وابدأ اختبار تحديد الميول مجاناً وتعرّف على التخصصات المناسبة لك فوراً.'
              : 'Join thousands of Saudi students and get your personalized major report now.'}
          </p>
          <div className="pt-2">
            <Link
              href="/assessment"
              className="h-12 inline-flex items-center justify-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white px-8 rounded-xl font-display font-bold text-base border-2 border-[#3a2f21] shadow-[3px_3px_0_#3a2f21] hover:translate-x-[-1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0_#3a2f21] transition-all"
            >
              <Compass className="w-5 h-5 text-[#ffd66e]" />
              <span>{isArabic ? 'ابدأ الاختبار الآن' : 'Start Free Assessment'}</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
