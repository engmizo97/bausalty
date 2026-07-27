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

export default function HomePage() {
  const vision2030Highlights = [
    {
      icon: ShieldAlert,
      titleEn: 'Cybersecurity & Defense',
      titleAr: 'الأمن السيبراني والدفاع',
      descriptionEn: 'Protects Saudi Arabia’s national digital infrastructure and cloud systems.',
      color: 'from-blue-600 to-indigo-800',
    },
    {
      icon: Cpu,
      titleEn: 'AI & Machine Learning',
      titleAr: 'الذكاء الاصطناعي وتعلم الآلة',
      descriptionEn: 'Pioneering generative models and smart systems under SDAIA initiatives.',
      color: 'from-sky-500 to-blue-700',
    },
    {
      icon: Coins,
      titleEn: 'Financial Technology (FinTech)',
      titleAr: 'التقنية المالية (الفينتك)',
      descriptionEn: 'Transforming digital banking and algorithmic finance in Saudi Arabia.',
      color: 'from-amber-500 to-emerald-700',
    },
    {
      icon: Building2,
      titleEn: 'Sustainable Architecture',
      titleAr: 'العمارة المستدامة والمدن الذكية',
      descriptionEn: 'Designing zero-carbon cities for NEOM, THE LINE, and Red Sea Global.',
      color: 'from-[#0284C7] to-teal-700',
    },
    {
      icon: SunMedium,
      titleEn: 'Renewable Energy',
      titleAr: 'الطاقة المتجددة والخضراء',
      descriptionEn: 'Advancing solar, wind, and green hydrogen power under the Saudi Green Initiative.',
      color: 'from-emerald-500 to-green-700',
    },
    {
      icon: Palmtree,
      titleEn: 'Tourism & Hospitality',
      titleAr: 'السياحة والضيافة العالمية',
      descriptionEn: 'Managing heritage and luxury destinations across Diriyah, AlUla, and Red Sea.',
      color: 'from-orange-500 to-amber-700',
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
      titleAr: 'تحليل رمز هولاند الخماسي الخاص بك',
      descEn: 'Our engine calculates your 3-letter Holland Code (e.g., IRC, IAS) with precision percentage vectors.',
      descAr: 'يحسب المحرك كودك الثلاثي (مثل IRC أو IAS) ونسب التوافقيات الشخصية بدقة.',
    },
    {
      step: '03',
      titleEn: 'Discover Saudi Major Recommendations',
      titleAr: 'اكتشف التخصصات الجامعية السعودية المناسبة',
      descEn: 'Get matched with top Saudi university majors explicitly tagged with Saudi Vision 2030 sectors.',
      descAr: 'احصل على توصيات دقيقة للتخصصات في الجامعات السعودية مع مراعاة متطلبات سوق العمل ورؤية 2030.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-x-hidden">
      
      {/* --- HERO BANNER SECTION --- */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-[#1E3A8A] via-[#1D4ED8] to-[#0284C7] text-white overflow-hidden">
        
        {/* Background Decorative Rings */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-900/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Tahseen AI Group Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-sky-200"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tahseen AI Group | مجموعة تحسين للذكاء الاصطناعي</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white"
            >
              Discover Your Ideal College Major in Saudi Arabia
              <span className="block text-sky-300 font-extrabold mt-2 text-3xl sm:text-4xl md:text-5xl">
                بوصلتك نحو التخصص الجامعي الأنسب
              </span>
            </motion.h1>

            {/* Value Proposition Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-sky-100 font-medium leading-relaxed"
            >
              Bausalty uses the psychometric **Holland Code (RIASEC)** framework adapted specifically for Saudi high school graduates to align your unique personality strengths with high-demand Saudi Vision 2030 university majors.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/assessment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-[#1E3A8A] hover:bg-sky-50 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-102 active:scale-98 transition-all duration-200 group"
              >
                <Compass className="w-6 h-6 text-[#0284C7] group-hover:rotate-45 transition-transform duration-300" />
                <span>Start Personality Test / ابدأ الاختبار</span>
                <ArrowRight className="w-5 h-5 text-[#1E3A8A]" />
              </Link>

              <Link
                href="/majors"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-4 rounded-2xl font-bold text-base transition-all duration-200"
              >
                <span>Explore Saudi Majors / مستكشف التخصصات</span>
              </Link>
            </motion.div>

            {/* Trust Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-6 text-xs sm:text-sm font-semibold text-sky-200 border-t border-white/10 mt-8">
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>42 Psychometric Items</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Holland RIASEC Engine</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Target className="w-4 h-4 text-sky-300" />
                <span>Saudi Vision 2030 Tagged</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- VISION 2030 SECTORS HIGHLIGHTS --- */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0284C7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Future-Proof Higher Education / رؤية السعودية 2030
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Aligned with High-Demand Saudi Vision 2030 Sectors
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Bausalty maps your Holland Code profile directly to strategic national sectors developed under the Human Capability Development Program.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vision2030Highlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.titleEn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <IconComp className="w-7 h-7" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-900 flex items-center justify-between">
                        <span>{item.titleEn}</span>
                      </h3>
                      <p className="text-sm font-bold text-[#0284C7] font-sans">
                        {item.titleAr}
                      </p>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60 mt-4 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 font-bold">
                      Vision 2030 High Priority
                    </span>
                    <Link href="/majors" className="text-[#1E3A8A] hover:text-[#0284C7] font-bold inline-flex items-center gap-1">
                      <span>View Majors</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* --- HOW IT WORKS / RIASEC PROCESS --- */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#1E3A8A] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              The Bausalty Engine / طريقة العمل
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3 Simple Steps to Your Career Blueprint
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center text-xl font-black shadow-md">
                  {item.step}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.titleEn}
                  </h3>
                  <p className="text-sm font-semibold text-[#0284C7] font-sans">
                    {item.titleAr}
                  </p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.descEn}
                </p>
                <p className="text-slate-500 text-xs leading-relaxed font-sans border-t border-slate-100 pt-2">
                  {item.descAr}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Quick CTA Card */}
          <div className="mt-16 bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#0284C7] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-black">
                Ready to Find Your Major? / جاهز لمطابقة تخصصك؟
              </h3>
              <p className="text-sky-100 text-base max-w-xl">
                Takes only 5 to 7 minutes. Complete the assessment and download your personalized Bausalty Personality Card!
              </p>
            </div>

            <Link
              href="/assessment"
              className="bg-white text-[#1E3A8A] hover:bg-sky-50 px-8 py-4 rounded-2xl font-black text-lg shadow-lg hover:scale-105 transition-all duration-200 shrink-0 inline-flex items-center gap-2"
            >
              <Users className="w-5 h-5 text-[#0284C7]" />
              <span>Start Test Now / ابدأ الآن</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
