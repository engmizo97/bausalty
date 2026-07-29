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
      
      {/* --- HERO BANNER SECTION WITH NOTEBOOK AESTHETIC --- */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-paper border-b-2 border-ink overflow-hidden notebook-margin-line">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Tahseen AI Group Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-yellow text-ink border-2 border-ink px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold shadow-notebook-xs"
            >
              <Sparkles className="w-4 h-4 text-purple" />
              <span>{isArabic ? 'مجموعة تحسين للذكاء الاصطناعي | Tahseen AI Group' : 'Tahseen AI Group | مجموعة تحسين للذكاء الاصطناعي'}</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight leading-tight text-ink"
            >
              {isArabic ? (
                <>
                  بوصلتك الذكية نحو <span className="hl-yellow">التخصص الجامعي الأنسب</span> في السعودية
                </>
              ) : (
                <>
                  Discover Your Ideal College Major in <span className="hl-yellow">Saudi Arabia</span>
                </>
              )}
            </motion.h1>

            {/* Value Proposition Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl text-ink-soft font-prose leading-relaxed"
            >
              {isArabic
                ? 'تعتمد بوصالتي على نموذج هولاند (RIASEC) النفسي المعتمد عالمياً والمكيف خصيصاً للطلاب في السعودية لمطابقة ميولك واهتماماتك مع التخصصات المستهدفة في رؤية السعودية 2030.'
                : 'Bausalty uses the psychometric Holland Code (RIASEC) framework adapted specifically for Saudi high school graduates to align your unique personality strengths with high-demand Saudi Vision 2030 university majors.'}
            </motion.p>

            {/* Action Buttons with 48px touch targets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/assessment"
                className="w-full sm:w-auto h-14 min-h-[48px] inline-flex items-center justify-center gap-3 bg-teal hover:bg-teal-deep text-white px-8 rounded-2xl font-display font-black text-lg border-2 border-ink shadow-notebook-md hover:scale-102 active:scale-98 transition-all group"
              >
                <Compass className="w-6 h-6 text-yellow group-hover:rotate-45 transition-transform duration-300" />
                <span>{isArabic ? 'ابدأ اختبار هولاند الآن' : 'Start Personality Test'}</span>
                <ArrowRight className={`w-5 h-5 text-white ${isArabic ? 'rotate-180' : ''}`} />
              </Link>

              <Link
                href="/majors"
                className="w-full sm:w-auto h-14 min-h-[48px] inline-flex items-center justify-center gap-2 bg-paper-card text-ink border-2 border-ink px-6 rounded-2xl font-bold text-base shadow-notebook-xs hover:bg-paper-inset transition-all"
              >
                <span>{isArabic ? 'مستكشف التخصصات السعودية' : 'Explore Saudi Majors'}</span>
              </Link>
            </motion.div>

            {/* Trust Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-6 text-xs sm:text-sm font-bold text-ink border-t-2 border-ink/20 mt-8">
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal" />
                <span>{isArabic ? '42 سؤالاً تقييمياً' : '42 Psychometric Items'}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Award className="w-4 h-4 text-purple" />
                <span>{isArabic ? 'نموذج RIASEC المعتمد' : 'Holland RIASEC Engine'}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Target className="w-4 h-4 text-orange" />
                <span>{isArabic ? 'رؤية السعودية 2030' : 'Saudi Vision 2030 Tagged'}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- VISION 2030 SECTORS HIGHLIGHTS --- */}
      <section className="py-16 md:py-20 bg-paper-card border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-ink bg-yellow border-2 border-ink px-3 py-1 rounded-full shadow-notebook-xs">
              {isArabic ? 'تخصصات المستقبل في السعودية' : 'Future-Proof Higher Education'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-ink tracking-tight">
              {isArabic ? 'قطاعات واعدة متوافقة مع رؤية السعودية 2030' : 'Aligned with High-Demand Saudi Vision 2030 Sectors'}
            </h2>
            <p className="text-ink-soft text-base sm:text-lg font-prose">
              {isArabic
                ? 'يربط محرك بوصالتي نتائج كودك الشخصي مباشرة مع القطاعات الاستراتيجية الوطنية ضمن برنامج تنمية القدرات البشرية.'
                : 'Bausalty maps your Holland Code profile directly to strategic national sectors developed under the Human Capability Development Program.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {vision2030Highlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.titleEn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-paper border-2 border-ink rounded-notebook p-6 shadow-notebook-sm hover:shadow-notebook-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-2xl ${item.bgAccent} border-2 border-ink text-ink flex items-center justify-center shadow-notebook-xs group-hover:scale-105 transition-transform`}>
                      <IconComp className="w-7 h-7 text-teal" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-display font-bold text-ink">
                        {isArabic ? item.titleAr : item.titleEn}
                      </h3>
                      <p className="text-xs font-bold text-muted">
                        {isArabic ? item.titleEn : item.titleAr}
                      </p>
                    </div>

                    <p className="text-ink-soft text-sm font-prose leading-relaxed">
                      {isArabic ? item.descriptionAr : item.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t-2 border-ink/10 mt-4 flex items-center justify-between text-xs font-bold">
                    <span className="text-teal-deep bg-teal-soft px-2.5 py-1 rounded-full border border-teal font-extrabold">
                      Vision 2030
                    </span>
                    <Link href="/majors" className="text-ink hover:text-teal font-extrabold inline-flex items-center gap-1">
                      <span>{isArabic ? 'استكشف التخصصات' : 'View Majors'}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* --- HOW IT WORKS / RIASEC PROCESS --- */}
      <section className="py-16 md:py-20 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-ink bg-teal-soft border-2 border-ink px-3 py-1 rounded-full shadow-notebook-xs">
              {isArabic ? 'طريقة عمل المحرك' : 'The Bausalty Engine'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-ink tracking-tight">
              {isArabic ? '3 خطوات بسيطة لاكتشاف تخصصك المستقبلي' : '3 Simple Steps to Your Career Blueprint'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-paper-card rounded-notebook p-8 border-2 border-ink shadow-notebook-sm relative space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-teal text-white border-2 border-ink flex items-center justify-center text-xl font-display font-black shadow-notebook-xs">
                  {item.step}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-display font-bold text-ink">
                    {isArabic ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="text-xs font-bold text-muted">
                    {isArabic ? item.titleEn : item.titleAr}
                  </p>
                </div>

                <p className="text-ink-soft text-sm font-prose leading-relaxed">
                  {isArabic ? item.descAr : item.descEn}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Quick CTA Card with notebook styling */}
          <div className="mt-16 bg-yellow rounded-3xl p-8 sm:p-12 border-2 border-ink shadow-notebook-lg flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-display font-black text-ink">
                {isArabic ? 'جاهز لاكتشاف تخصصك الجامعي الأنسب؟' : 'Ready to Find Your Major?'}
              </h3>
              <p className="text-ink-soft text-base font-prose max-w-xl">
                {isArabic
                  ? 'يستغرق الاختبار من 5 إلى 7 دقائق فقط. أجب على الأسئلة واحصل فوراً على بطاقة شخصيتك الهولندية!'
                  : 'Takes only 5 to 7 minutes. Complete the assessment and download your personalized Bausalty Personality Card!'}
              </p>
            </div>

            <Link
              href="/assessment"
              className="h-14 min-h-[48px] bg-teal hover:bg-teal-deep text-white border-2 border-ink px-8 rounded-2xl font-display font-black text-lg shadow-notebook-sm hover:scale-105 transition-all shrink-0 inline-flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5 text-yellow" />
              <span>{isArabic ? 'ابدأ الاختبار الآن' : 'Start Test Now'}</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
