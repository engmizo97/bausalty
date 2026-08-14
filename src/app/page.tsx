'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Compass,
  Sparkles,
  ShieldAlert,
  Cpu,
  Coins,
  Building2,
  SunMedium,
  Palmtree,
  ArrowRight,
  CheckCircle2,
  Award,
  Target,
  Users,
  Check,
  Brain,
  Zap,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const vision2030Highlights = [
    {
      icon: ShieldAlert,
      titleEn: 'Cybersecurity & Defense',
      titleAr: 'الأمن السيبراني والدفاع الرقمي',
      descriptionEn: 'Protects Saudi Arabia’s national digital infrastructure and cloud systems.',
      descriptionAr: 'حماية البنية التحتية الرقمية والشبكات الوطنية والبيانات السحابية للمملكة.',
      bgAccent: 'bg-teal-soft',
    },
    {
      icon: Cpu,
      titleEn: 'AI & Machine Learning',
      titleAr: 'الذكاء الاصطناعي وتعلم الآلة',
      descriptionEn: 'Pioneering generative models and smart systems under SDAIA initiatives.',
      descriptionAr: 'تطوير النماذج التوليدية والأنظمة الذكية ضمن مبادرات سدايا الوطنية.',
      bgAccent: 'bg-[#f5efff]',
    },
    {
      icon: Coins,
      titleEn: 'Financial Technology (FinTech)',
      titleAr: 'التقنية المالية (الفينتك)',
      descriptionEn: 'Transforming digital banking and algorithmic finance in Saudi Arabia.',
      descriptionAr: 'تحول المصرفية الرقمية والتمويل الخوارزمي في المملكة العربية السعودية.',
      bgAccent: 'bg-yellow-soft',
    },
    {
      icon: Building2,
      titleEn: 'Sustainable Architecture',
      titleAr: 'العمارة المستدامة والمدن الذكية',
      descriptionEn: 'Designing zero-carbon cities for NEOM, THE LINE, and Red Sea Global.',
      descriptionAr: 'تصميم المدن الذكية الخالية من الكربون في نيوم وذا لاين والبحر الأحمر.',
      bgAccent: 'bg-teal-tint',
    },
    {
      icon: SunMedium,
      titleEn: 'Renewable Energy',
      titleAr: 'الطاقة المتجددة والنظيفة',
      descriptionEn: 'Advancing solar, wind, and green hydrogen power under the Saudi Green Initiative.',
      descriptionAr: 'تطوير تقنيات الطاقة الشمسية والهيدروجين الأخضر ضمن مبادرة السعودية الخضراء.',
      bgAccent: 'bg-emerald-100',
    },
    {
      icon: Palmtree,
      titleEn: 'Tourism & Hospitality',
      titleAr: 'السياحة والضيافة العالمية',
      descriptionEn: 'Managing heritage and luxury destinations across Diriyah, AlUla, and Red Sea.',
      descriptionAr: 'إدارة الوجهات السياحية العالمية والتراثية في الدرعية والعلا والبحر الأحمر.',
      bgAccent: 'bg-orange-100',
    },
  ];

  const steps = [
    {
      step: '01',
      titleEn: 'Answer 42 RIASEC Questions',
      titleAr: 'أجب على 42 سؤالاً في اختبار هولاند',
      descEn: 'Evaluate your interests across Realistic, Investigative, Artistic, Social, Enterprising, and Conventional categories.',
      descAr: 'تقييم ميولك في المهارات العملية، والبحثية، والإبداعية، والاجتماعية، والقيادية، والتنظيمية.',
    },
    {
      step: '02',
      titleEn: 'Generate Your Holland Profile',
      titleAr: 'تحليل رمز هولاند الخاص بك',
      descEn: 'Our engine calculates your 3-letter Holland Code (e.g., IRC, IAS) with precision percentage vectors.',
      descAr: 'يحسب المحرك كودك الثلاثي (مثل IRC أو IAS) ونسب التوافقيات الشخصية بدقة.',
    },
    {
      step: '03',
      titleEn: 'Discover Saudi Major Recommendations',
      titleAr: 'اكتشف التخصصات الجامعية المناسبة',
      descEn: 'Get matched with top Saudi university majors explicitly tagged with Saudi Vision 2030 sectors.',
      descAr: 'احصل على توصيات دقيقة للتخصصات في الجامعات السعودية مع مراعاة متطلبات سوق العمل ورؤية 2030.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-paper overflow-x-hidden">
      
      {/* --- HERO BANNER SECTION (FULL VIEWPORT NOTEBOOK LANDING LAYOUT) --- */}
      <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center py-8 md:py-12 bg-paper border-b border-dashed border-teal/20 overflow-hidden notebook-margin-line">
        
        {/* Decorative Purple Plus Doodle */}
        <div className="absolute top-8 left-8 md:left-16 text-purple/30 text-4xl font-display font-black pointer-events-none select-none">
          +
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* --- RIGHT COLUMN (TEXT, TITLE, CTAS, STATS) --- */}
            <div className="lg:col-span-7 space-y-5 text-right">
              
              {/* Dashed Pill Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-paper-card border border-dashed border-teal px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold text-teal shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-teal" />
                <span>{isArabic ? 'أحدث المعايير النفسية (RIASEC) • مدعوم بالذكاء الاصطناعي' : 'Holland RIASEC Framework • AI Powered'}</span>
              </motion.div>

              {/* Calligraphic Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[1.15] text-ink"
              >
                {isArabic ? (
                  <>
                    لا تدرس عشوائياً <br />
                    <span className="hl-yellow inline-block mt-1">اكتشف تخصصك الأنسب</span>
                  </>
                ) : (
                  <>
                    Don't Choose Randomly <br />
                    <span className="hl-yellow inline-block mt-1">Find Your Ideal Major</span>
                  </>
                )}
              </motion.h1>

              {/* Description Body */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-lg text-ink-soft font-prose leading-relaxed max-w-2xl"
              >
                {isArabic
                  ? 'طريقك نحو التخصص الجامعي الأنسب يبدأ من هنا: حلل مهاراتك وميولك باختبار هولاند المعتمد (RIASEC)، وخلّ الذكاء الاصطناعي يطابقك مع التخصصات السعودية ورؤية 2030 — كأن معك موجه أكاديمي في دفترك.'
                  : 'Your journey to the ideal university major starts here: assess your personality with the validated Holland Code (RIASEC), and let AI align your strengths with Saudi market demand.'}
              </motion.p>

              {/* CTAs Side by Side */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-2 flex flex-col sm:flex-row items-center gap-4"
              >
                <Link
                  href="/assessment"
                  className="w-full sm:w-auto h-13 min-h-[48px] inline-flex items-center justify-center gap-3 bg-teal hover:bg-teal-deep text-white px-8 rounded-2xl font-display font-black text-base sm:text-lg border-2 border-ink shadow-notebook-md hover:scale-102 active:scale-98 transition-all group"
                >
                  <Compass className="w-5.5 h-5.5 text-yellow group-hover:rotate-45 transition-transform duration-300" />
                  <span>{isArabic ? 'أنشئ تقريرك مجاناً ←' : 'Start Assessment Free ←'}</span>
                </Link>

                <Link
                  href="/majors"
                  className="w-full sm:w-auto h-13 min-h-[48px] inline-flex items-center justify-center gap-2 text-ink font-extrabold text-sm sm:text-base hover:text-teal transition-all underline decoration-dashed underline-offset-8 decoration-ink/40 hover:decoration-teal"
                >
                  <span>{isArabic ? 'شاهد التخصصات المتاحة' : 'Explore Available Majors'}</span>
                </Link>
              </motion.div>

              {/* Stats Row */}
              <div className="pt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-dashed border-ink/20 mt-6">
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-black text-ink">٤٢</div>
                  <div className="text-xs font-bold text-ink-soft">{isArabic ? 'سؤالاً تقييمياً' : 'Assessment Items'}</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-black text-teal">٦</div>
                  <div className="text-xs font-bold text-ink-soft">{isArabic ? 'مجالات RIASEC' : 'Holland Domains'}</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-black text-purple">+٥٠</div>
                  <div className="text-xs font-bold text-ink-soft">{isArabic ? 'تخصصاً موصى به' : 'Saudi Majors'}</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-black text-ink">١٠٠٪</div>
                  <div className="text-xs font-bold text-ink-soft">{isArabic ? 'مجاني ومتاح فوراً' : 'Free & Instant'}</div>
                </div>
              </div>

            </div>

            {/* --- LEFT COLUMN (NOTEBOOK INTERACTIVE PREVIEW CARD & MASCOT) --- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              
              {/* Mascot / Avatar Badge Floating on Top Left */}
              <div className="absolute -top-8 -left-3 z-20 w-14 h-14 sm:w-16 sm:h-16 bg-yellow rounded-2xl border-2 border-ink shadow-notebook-xs flex items-center justify-center -rotate-6 hover:rotate-0 transition-transform">
                <Brain className="w-8 h-8 text-ink" />
              </div>

              {/* Notebook Question Preview Card */}
              <div className="bg-paper-card rounded-2xl p-6 sm:p-7 border-2 border-ink shadow-notebook-md relative -rotate-1 hover:rotate-0 transition-transform duration-300 space-y-4">
                
                {/* Yellow Washi Tape Strip at top */}
                <div className="absolute -top-3.5 right-1/3 w-32 h-6 bg-yellow/90 border border-ink/40 shadow-2xs rotate-2 flex items-center justify-center text-[11px] font-black text-ink uppercase tracking-wider">
                  {isArabic ? 'معاينة الاختبار' : 'Quiz Preview'}
                </div>

                {/* Card Header & Timer */}
                <div className="flex items-center justify-between border-b border-dashed border-ink/20 pb-3 pt-1">
                  <span className="text-xs font-extrabold text-ink-soft bg-paper border border-ink/50 px-3 py-1 rounded-full shadow-2xs">
                    {isArabic ? 'سؤال ٠١ من ٤٢ • تقييم هولاند (RIASEC)' : 'Question 01 of 42 • RIASEC'}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-teal flex items-center gap-1">
                    <span>04:32</span>
                    <span>⏱️</span>
                  </span>
                </div>

                {/* Question Text */}
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-xl font-display font-black text-ink leading-snug">
                    {isArabic
                      ? 'ما هي الأنشطة التي تجد نفسك أكثر شغفاً وإبداعاً عند ممارستها؟'
                      : 'Which activities drive your creative passion and focus?'}
                  </h3>
                </div>

                {/* Question Options: First option is SELECTED */}
                <div className="space-y-2.5">
                  
                  {/* OPTION 1: SELECTED */}
                  <div className="p-3 sm:p-3.5 rounded-xl border-2 border-ink bg-teal-soft text-ink text-xs sm:text-sm font-extrabold flex items-center justify-between shadow-2xs">
                    <span className="text-teal-deep">{isArabic ? 'تحليل البيانات والبرمجة وحل المشكلات المعقدة' : 'Data analysis, programming & problem solving'}</span>
                    <span className="w-5 h-5 rounded-full bg-teal text-white flex items-center justify-center shrink-0 border border-ink">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  </div>

                  {/* OPTION 2: UNSELECTED */}
                  <div className="p-3 sm:p-3.5 rounded-xl border border-ink/30 bg-paper text-ink-soft text-xs sm:text-sm font-bold flex items-center justify-between hover:border-ink transition-colors">
                    <span>{isArabic ? 'تصميم الواجهات، الفنون، وصناعة المحتوى التفاعلي' : 'UI/UX Design, creative arts & media'}</span>
                    <span className="w-5 h-5 rounded-full border border-ink/30 shrink-0" />
                  </div>

                  {/* OPTION 3: UNSELECTED */}
                  <div className="p-3 sm:p-3.5 rounded-xl border border-ink/30 bg-paper text-ink-soft text-xs sm:text-sm font-bold flex items-center justify-between hover:border-ink transition-colors">
                    <span>{isArabic ? 'إدارة المشاريع، القيادة، والريادة في الأعمال' : 'Project management, leadership & venture growth'}</span>
                    <span className="w-5 h-5 rounded-full border border-ink/30 shrink-0" />
                  </div>

                </div>

                {/* AI Recommendation Box */}
                <div className="p-3 rounded-xl border border-dashed border-purple/60 bg-purple-soft text-purple-deep text-xs font-extrabold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple shrink-0" />
                  <span>
                    {isArabic
                      ? 'الذكاء الاصطناعي يوصي بـ: الأمن السيبراني والذكاء الاصطناعي'
                      : 'AI Recommendation: Cybersecurity & Artificial Intelligence'}
                  </span>
                </div>

                {/* Taped Sticky Note Preview on Bottom Corner */}
                <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-yellow border border-ink p-2.5 rounded-xl shadow-2xs rotate-3 text-xs font-black text-ink flex items-center gap-1.5 z-20">
                  <Zap className="w-3.5 h-3.5 text-orange fill-orange" />
                  <span>{isArabic ? 'تذكير: كودك الثلاثي المتوقع I-A-E ⚡' : 'Expected Code: I-A-E ⚡'}</span>
                </div>

              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* --- VISION 2030 SECTORS HIGHLIGHTS --- */}
      <section className="py-12 md:py-16 bg-paper-card border-b border-dashed border-teal/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-ink bg-yellow border border-ink px-3 py-1 rounded-full shadow-2xs">
              {isArabic ? 'تخصصات المستقبل في السعودية' : 'Future-Proof Higher Education'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-ink tracking-tight">
              {isArabic ? 'قطاعات واعدة متوافقة مع رؤية السعودية 2030' : 'Aligned with High-Demand Saudi Vision 2030 Sectors'}
            </h2>
            <p className="text-ink-soft text-xs sm:text-sm font-prose">
              {isArabic
                ? 'يربط محرك بوصلتي نتائج كودك الشخصي مباشرة مع القطاعات الاستراتيجية الوطنية ضمن برنامج تنمية القدرات البشرية.'
                : 'Bausalty maps your Holland Code profile directly to strategic national sectors developed under the Human Capability Development Program.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {vision2030Highlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.titleEn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-paper border border-ink/80 rounded-2xl p-5 shadow-2xs hover:shadow-notebook-xs hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-2xl ${item.bgAccent} border border-ink text-ink flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}>
                      <IconComp className="w-6 h-6 text-teal" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-display font-bold text-ink">
                        {isArabic ? item.titleAr : item.titleEn}
                      </h3>
                    </div>

                    <p className="text-ink-soft text-xs font-prose leading-relaxed">
                      {isArabic ? item.descriptionAr : item.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-ink/10 flex items-center justify-between mt-4">
                    <span className="text-[10px] font-black text-ink-soft bg-paper-card border border-ink/40 px-2 py-0.5 rounded-full">
                      Vision 2030
                    </span>
                    <Link
                      href="/majors"
                      className="text-xs font-extrabold text-teal hover:text-teal-deep flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>{isArabic ? 'استكشف التخصصات' : 'Explore Majors'}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* --- HOW IT WORKS (3 SIMPLE STEPS) --- */}
      <section className="py-12 md:py-16 bg-paper border-b border-dashed border-teal/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-teal bg-teal-soft border border-ink/40 px-3 py-1 rounded-full shadow-2xs">
              {isArabic ? 'طريقة عمل المحرك' : 'Simple 3-Step Process'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-ink tracking-tight">
              {isArabic ? '3 خطوات بسيطة لاكتشاف تخصصك المستقبلي' : 'Discover Your Future Major in 3 Simple Steps'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {steps.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-paper-card border border-ink/80 rounded-2xl p-6 shadow-2xs relative flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow text-ink border border-ink flex items-center justify-center font-display font-black text-lg shadow-2xs">
                    {item.step}
                  </div>

                  <h3 className="text-xl font-display font-black text-ink">
                    {isArabic ? item.titleAr : item.titleEn}
                  </h3>

                  <p className="text-ink-soft text-xs sm:text-sm font-prose leading-relaxed">
                    {isArabic ? item.descAr : item.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* --- BOTTOM CALL TO ACTION BANNER --- */}
      <section className="py-12 bg-yellow border-b border-dashed border-ink/30">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-display font-black text-ink">
            {isArabic ? 'جاهز لاكتشاف تخصصك الجامعي الأنسب؟' : 'Ready to Discover Your Ideal Saudi College Major?'}
          </h2>
          <p className="text-ink font-prose text-xs sm:text-sm max-w-lg mx-auto font-medium">
            {isArabic
              ? 'انضم الآن لآلاف الطلاب وابدأ اختبار هولاند (RIASEC) مجاناً واحصل على توصيات دقيقة فوراً.'
              : 'Join thousands of Saudi high school graduates and get your personalized major report now.'}
          </p>
          <div className="pt-1">
            <Link
              href="/assessment"
              className="h-12 inline-flex items-center justify-center gap-2.5 bg-teal hover:bg-teal-deep text-white px-8 rounded-2xl font-display font-black text-base border border-ink shadow-notebook-xs hover:scale-105 active:scale-98 transition-all"
            >
              <Compass className="w-5 h-5 text-yellow" />
              <span>{isArabic ? 'ابدأ الاختبار الآن' : 'Start Free Assessment'}</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
