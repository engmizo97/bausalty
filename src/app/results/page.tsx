'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';
import {
  Sparkles,
  Compass,
  Building,
  Briefcase,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  RotateCcw,
  Target,
} from 'lucide-react';
import { AssessmentResult, RiasecType } from '@/types';
import { RIASEC_CATEGORIES } from '@/data/questions';
import PersonalityCard from '@/components/results/PersonalityCard';
import { useLanguage } from '@/context/LanguageContext';

export default function ResultsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Lazy state initialization from localStorage
  const [result] = useState<AssessmentResult | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedResult = localStorage.getItem('bausalty_assessment_result');
        if (savedResult) {
          return JSON.parse(savedResult);
        }
      } catch {
        // Ignore read error
      }
    }
    return null;
  });

  const [filterVision2030, setFilterVision2030] = useState<boolean>(false);
  const [expandedMajorId, setExpandedMajorId] = useState<string | null>(null);

  useEffect(() => {
    if (!result) {
      router.push('/assessment');
    }
  }, [result, router]);

  if (!result) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 bg-paper">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-teal text-white border-2 border-ink flex items-center justify-center mx-auto animate-spin shadow-notebook-xs">
            <Compass className="w-6 h-6 text-yellow" />
          </div>
          <p className="text-ink font-bold font-display">{isArabic ? 'جاري تحليل نتيجتك...' : 'Calculating Your Bausalty Profile...'}</p>
        </div>
      </div>
    );
  }

  // Format data for Recharts Radar Chart
  const categoriesList: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  const radarData = categoriesList.map((catKey) => {
    const catInfo = RIASEC_CATEGORIES[catKey];
    return {
      category: isArabic ? `${catInfo.nameAr} (${catKey})` : `${catInfo.nameEn} (${catKey})`,
      score: result.normalizedScores[catKey] || 0,
      fullMark: 100,
    };
  });

  const filteredMajors = result.matchingMajors.filter((m) =>
    filterVision2030 ? m.isVision2030 : true
  );

  const topMajor = result.matchingMajors[0];

  return (
    <div className="flex-1 bg-paper py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        
        {/* --- HEADER SUMMARY BANNER WITH NOTEBOOK STYLING --- */}
        <div className="bg-yellow rounded-3xl p-6 sm:p-12 text-ink border-2 border-ink shadow-notebook-md relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-paper-card px-3.5 py-1.5 rounded-full border-2 border-ink text-xs font-bold shadow-notebook-xs">
              <Sparkles className="w-4 h-4 text-purple" />
              <span>{isArabic ? 'تم تحليل النتيجة بنجاح' : 'Assessment Completed'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight">
              {isArabic ? 'رمز هولاند الخاص بك:' : 'Your Holland Code:'} <span className="hl-teal">{result.topCode}</span>
            </h1>

            <p className="text-ink-soft text-base sm:text-lg font-prose leading-relaxed">
              {isArabic
                ? `بناءً على إجاباتك الـ 42، فإن سماتك الشخصية المهيمنة هي: **${RIASEC_CATEGORIES[result.primaryType]?.nameAr} (${RIASEC_CATEGORIES[result.primaryType]?.nameEn})**.`
                : `Based on your 42 items, your dominant profile is **${RIASEC_CATEGORIES[result.primaryType]?.nameEn} (${RIASEC_CATEGORIES[result.primaryType]?.nameAr})**.`}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/assessment"
                className="h-11 inline-flex items-center gap-2 bg-teal hover:bg-teal-deep text-white px-5 rounded-xl font-bold text-sm border-2 border-ink shadow-notebook-xs transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-yellow" />
                <span>{isArabic ? 'إعادة الاختبار' : 'Retake Test'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* --- SECTION 1: RIASEC BREAKDOWN & RECHARTS RADAR CHART --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Radar Chart Card */}
          <div className="bg-paper-card rounded-notebook p-6 sm:p-8 border-2 border-ink shadow-notebook-md space-y-4">
            <div className="flex items-center justify-between border-b-2 border-ink/10 pb-4">
              <div>
                <h2 className="text-xl font-display font-black text-ink">
                  {isArabic ? 'رسم هولاند الخماسي (Radar Chart)' : 'RIASEC Radar Profile'}
                </h2>
                <p className="text-xs font-semibold text-muted">
                  {isArabic ? 'التوزيع البصري لسماتك الشخصية الست' : 'Visual mapping across 6 Holland dimensions'}
                </p>
              </div>
              <span className="text-xs font-black bg-teal-soft text-teal-deep px-3 py-1 rounded-full border border-teal">
                0 - 100%
              </span>
            </div>

            <div className="w-full h-80 sm:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#3a2f21" strokeDasharray="3 3" opacity={0.2} />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: '#3a2f21', fontSize: 12, fontWeight: 700, fontFamily: 'Baloo Bhaijaan 2' }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#8a7a5f" />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#0d9488"
                    fill="#ffd66e"
                    fillOpacity={0.6}
                  />
                  <Tooltip
                    formatter={(val) => [`${val}%`, 'Score']}
                    contentStyle={{ borderRadius: '12px', border: '2px solid #3a2f21', backgroundColor: '#fffdf6', boxShadow: '3px 3px 0px #3a2f21' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Percentage Progress Bars */}
          <div className="bg-paper-card rounded-notebook p-6 sm:p-8 border-2 border-ink shadow-notebook-md space-y-5">
            <div className="border-b-2 border-ink/10 pb-4">
              <h2 className="text-xl font-display font-black text-ink">
                {isArabic ? 'تفاصيل الدرجات النسبية' : 'Category Breakdown'}
              </h2>
              <p className="text-xs font-semibold text-muted">
                {isArabic ? 'النسب المئوية لكل سمة من سمات هولاند' : 'Detailed scores by RIASEC trait'}
              </p>
            </div>

            <div className="space-y-4">
              {categoriesList.map((catKey) => {
                const catInfo = RIASEC_CATEGORIES[catKey];
                const scorePct = result.normalizedScores[catKey] || 0;
                const isTop3 = [result.primaryType, result.secondaryType, result.tertiaryType].includes(catKey);

                return (
                  <div key={catKey} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm font-bold">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-teal text-white border-2 border-ink font-black text-xs flex items-center justify-center shadow-notebook-xs">
                          {catKey}
                        </span>
                        <span className="text-ink font-display font-bold">
                          {isArabic ? catInfo.nameAr : catInfo.nameEn}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isTop3 && (
                          <span className="text-[10px] font-black uppercase bg-yellow text-ink border border-ink px-2 py-0.5 rounded shadow-2xs">
                            Top Trait
                          </span>
                        )}
                        <span className="text-teal-deep font-black">{scorePct}%</span>
                      </div>
                    </div>

                    <div className="w-full h-3 bg-paper-inset rounded-full overflow-hidden p-0.5 border border-ink">
                      <div
                        className="h-full rounded-full transition-all duration-500 bg-teal"
                        style={{ width: `${scorePct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* --- SECTION 2: BAUSALTY PERSONALITY CARD --- */}
        <div className="bg-paper-card rounded-notebook p-6 sm:p-10 border-2 border-ink shadow-notebook-md space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-ink bg-teal-soft border-2 border-ink px-3 py-1 rounded-full shadow-notebook-xs">
              {isArabic ? 'بطاقة شخصيتك القابلة للمشاركة' : 'Shareable Profile'}
            </span>
            <h2 className="text-3xl font-display font-black text-ink">
              {isArabic ? 'بطاقة شخصية بوصلتي' : 'Your Bausalty Personality Card'}
            </h2>
            <p className="text-ink-soft text-sm font-prose">
              {isArabic
                ? 'حمل بطاقة شخصيتك بتصميم الدفتر الأنيق لمشاركتها مع أولياء الأمور والمرشدين الأكاديميين.'
                : 'Download your customized Holland Code profile card styled with Bausalty notebook colors.'}
            </p>
          </div>

          <PersonalityCard result={result} />
        </div>

        {/* --- SECTION 3: TAHSEEN AI ECOSYSTEM CTA BANNER --- */}
        <div className="bg-teal rounded-3xl p-6 sm:p-10 text-white border-2 border-ink shadow-notebook-lg relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-yellow text-ink border-2 border-ink px-3 py-1 rounded-full text-xs font-black shadow-notebook-xs">
                <Target className="w-4 h-4 text-purple" />
                <span>{isArabic ? 'القبول الجامعي | منظومة تحسين' : 'Admission Targets'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
                {isArabic ? (
                  <>
                    ضمان القبول في تخصصك المستهدف: <span className="text-yellow">{topMajor?.nameAr || topMajor?.nameEn}</span>
                  </>
                ) : (
                  <>
                    Secure Admission into Your Top Match: <span className="text-yellow">{topMajor?.nameEn}</span>
                  </>
                )}
              </h2>

              <p className="text-teal-tint text-sm sm:text-base font-prose leading-relaxed">
                {isArabic
                  ? 'لضمان القبول في تخصصك المستهدف بالجامعات السعودية الكبرى (مثل جامعة الملك سعود، KFUPM، كاوست)، احرص على تحقيق درجة قدرات +88 ودرجة تحصيلي +85. ابدأ الاستعداد الآن مع منصات تحسين الذكية.'
                  : 'To secure admission into your top match at your choice of Saudi University (e.g. KFUPM, KSU), aim for a Qudurat score of 88+ and Tahsili score of 85+. Start prep with Qudurat AI & Tahsili AI.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <a
                href="https://qudurat.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-12 min-h-[48px] inline-flex items-center justify-center gap-2 bg-yellow hover:bg-amber-300 text-ink border-2 border-ink px-6 rounded-2xl font-display font-black text-sm shadow-notebook-xs hover:scale-105 transition-transform"
              >
                <GraduationCap className="w-5 h-5 text-ink" />
                <span>Start Qudurat AI</span>
                <ExternalLink className="w-4 h-4 text-ink" />
              </a>

              <a
                href="https://tahsili.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-12 min-h-[48px] inline-flex items-center justify-center gap-2 bg-paper-card text-ink hover:bg-paper-inset border-2 border-ink px-6 rounded-2xl font-bold text-sm shadow-notebook-xs transition-all"
              >
                <span>Tahsili AI Prep</span>
                <ExternalLink className="w-4 h-4 text-teal" />
              </a>
            </div>
          </div>
        </div>

        {/* --- SECTION 4: MATCHING MAJORS RECOMMENDATIONS GRID --- */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-ink/10 pb-4">
            <div>
              <h2 className="text-2xl font-display font-black text-ink">
                {isArabic ? 'التخصصات الجامعية الموصى بها' : 'Recommended Saudi College Majors'}
              </h2>
              <p className="text-xs font-semibold text-muted">
                {isArabic ? 'مرتبة حسب نسبة التوافق مع كودك الشخصي' : 'Ranked by vector match score against your RIASEC profile'}
              </p>
            </div>

            {/* Saudi Vision 2030 Filter */}
            <div className="flex items-center gap-2 bg-paper-card p-1.5 rounded-2xl border-2 border-ink shadow-notebook-xs">
              <button
                onClick={() => setFilterVision2030(false)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                  !filterVision2030 ? 'bg-teal text-white border-2 border-ink' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {isArabic ? `جميع التخصصات (${result.matchingMajors.length})` : `All Majors (${result.matchingMajors.length})`}
              </button>
              <button
                onClick={() => setFilterVision2030(true)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors inline-flex items-center gap-1.5 ${
                  filterVision2030 ? 'bg-yellow text-ink border-2 border-ink' : 'text-ink-soft hover:text-ink'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple" />
                <span>{isArabic ? `رؤية 2030 فقط (${result.matchingMajors.filter((m) => m.isVision2030).length})` : `Vision 2030 Only (${result.matchingMajors.filter((m) => m.isVision2030).length})`}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMajors.map((major) => {
              const isExpanded = expandedMajorId === major.id;

              return (
                <div
                  key={major.id}
                  className="bg-paper-card rounded-notebook p-6 border-2 border-ink shadow-notebook-sm hover:shadow-notebook-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    
                    {/* Card Top Badges */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black bg-paper-inset text-ink border border-ink px-2.5 py-1 rounded-lg">
                        Holland: {major.riasecCode}
                      </span>

                      <div className="bg-yellow text-ink border border-ink px-3 py-1 rounded-full text-xs font-black shadow-2xs">
                        {major.matchScore}% {isArabic ? 'توافق' : 'Match'}
                      </div>
                    </div>

                    {/* Major Title */}
                    <div>
                      <h3 className="text-xl font-display font-extrabold text-ink leading-snug">
                        {isArabic ? major.nameAr : major.nameEn}
                      </h3>
                      <p className="text-xs font-bold text-muted">
                        {isArabic ? major.nameEn : major.nameAr}
                      </p>
                    </div>

                    <p className="text-ink-soft text-xs font-prose leading-relaxed line-clamp-3">
                      {isArabic ? major.descriptionAr : major.descriptionEn}
                    </p>

                    {major.isVision2030 && (
                      <div className="bg-teal-soft/80 border border-teal rounded-xl p-2.5 text-xs text-teal-deep font-bold space-y-0.5">
                        <span className="font-black text-teal-deep block">
                          Vision 2030: {isArabic ? major.vision2030SectorAr : major.vision2030SectorEn}
                        </span>
                      </div>
                    )}

                    {/* Expandable Details */}
                    {isExpanded && (
                      <div className="pt-3 border-t-2 border-ink/10 space-y-3 text-xs">
                        <div>
                          <p className="font-bold text-ink flex items-center gap-1 mb-1">
                            <Briefcase className="w-3.5 h-3.5 text-teal" />
                            <span>{isArabic ? 'الفرص الوظيفية:' : 'Sample Careers:'}</span>
                          </p>
                          <ul className="list-disc list-inside space-y-0.5 text-ink-soft pl-1 font-prose">
                            {(isArabic ? major.sampleCareersAr : major.sampleCareersEn).map((c) => (
                              <li key={c}>{c}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="font-bold text-ink flex items-center gap-1 mb-1">
                            <Building className="w-3.5 h-3.5 text-teal" />
                            <span>{isArabic ? 'أبرز الجامعات:' : 'Top Saudi Universities:'}</span>
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {(isArabic ? major.saudiUniversitiesAr : major.saudiUniversitiesEn).map((uni) => (
                              <span
                                key={uni}
                                className="bg-paper-inset text-ink border border-ink/30 px-2 py-0.5 rounded text-[11px] font-bold"
                              >
                                {uni}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  <button
                    onClick={() => setExpandedMajorId(isExpanded ? null : major.id)}
                    className="mt-4 pt-3 border-t border-ink/10 w-full text-xs font-bold text-teal hover:text-teal-deep flex items-center justify-between min-h-[44px]"
                  >
                    <span>{isExpanded ? (isArabic ? 'إخفاء التفاصيل' : 'Hide Details') : (isArabic ? 'عرض الفرص والجامعات' : 'View Careers & Universities')}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
