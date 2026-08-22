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
          <p className="text-ink font-bold font-display">{isArabic ? 'جاري تحليل نتيجتك...' : 'Calculating Your Profile...'}</p>
        </div>
      </div>
    );
  }

  // Format data for Recharts Radar Chart
  const categoriesList: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  const radarData = categoriesList.map((catKey) => {
    const catInfo = RIASEC_CATEGORIES[catKey];
    return {
      category: isArabic ? catInfo.nameAr : catInfo.nameEn,
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
              <Sparkles className="w-4 h-4 text-teal" />
              <span>{isArabic ? 'تم تحليل النتيجة بنجاح' : 'Assessment Completed'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight">
              {isArabic ? 'رمز نمطك المهني:' : 'Your Holland Code:'} <span className="hl-teal">{result.topCode}</span>
            </h1>

            <p className="text-ink-soft text-base sm:text-lg font-prose leading-relaxed">
              {isArabic ? (
                <>
                  بناءً على إجاباتك، فإن السمات الأكثر توافقاً مع شخصيتك هي:{' '}
                  <strong className="font-black text-ink">
                    {RIASEC_CATEGORIES[result.primaryType]?.nameAr}
                  </strong>.
                </>
              ) : (
                <>
                  Based on your responses, your dominant personality dimension is:{' '}
                  <strong className="font-black text-ink">
                    {RIASEC_CATEGORIES[result.primaryType]?.nameEn}
                  </strong>.
                </>
              )}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="h-12 min-h-[48px] inline-flex items-center gap-2 bg-teal hover:bg-teal-deep text-white px-6 rounded-2xl font-display font-black text-sm border-2 border-ink shadow-notebook-xs hover:scale-102 transition-transform"
              >
                <span>{isArabic ? 'الانتقال إلى لوحة التحكم' : 'Go to Dashboard'}</span>
              </Link>

              <Link
                href="/assessment"
                className="h-12 min-h-[48px] inline-flex items-center gap-2 bg-paper-card text-ink hover:bg-paper-inset px-5 rounded-2xl font-bold text-sm border-2 border-ink shadow-notebook-xs transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isArabic ? 'إعادة الاختبار' : 'Retake Assessment'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* --- SECTION 1: RADAR CHART + TRAIT BREAKDOWN --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Radar Chart */}
          <div className="lg:col-span-6 notebook-paper-lined rounded-notebook p-6 sm:p-8 border-2 border-ink shadow-notebook-md space-y-4">
            <div className="flex items-center justify-between border-b-2 border-ink/10 pb-4">
              <div>
                <h2 className="text-xl font-display font-black text-ink">
                  {isArabic ? 'مخطط أبعاد الميول المهنية' : 'Career Dimensions Radar Chart'}
                </h2>
                <p className="text-xs font-bold text-muted">
                  {isArabic ? 'توزيع نسب التوافق عبر الأبعاد الستة' : 'Normalized vector scores across 6 categories'}
                </p>
              </div>
              <Compass className="w-6 h-6 text-teal" />
            </div>

            <div className="h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#3a2f21" strokeDasharray="3 3" strokeOpacity={0.25} />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: '#3a2f21', fontSize: 11, fontWeight: 700 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#8a7a5f" strokeOpacity={0.4} />
                  <Radar
                    name={isArabic ? 'درجة التوافق' : 'Score'}
                    dataKey="score"
                    stroke="#0d9488"
                    strokeWidth={2.5}
                    fill="#0d9488"
                    fillOpacity={0.4}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fffdf6',
                      borderColor: '#3a2f21',
                      borderWidth: '2px',
                      borderRadius: '12px',
                      fontFamily: 'Noto Naskh Arabic, serif',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Scores List */}
          <div className="lg:col-span-6 space-y-3">
            <div className="border-b-2 border-ink/10 pb-2">
              <h2 className="text-xl font-display font-black text-ink">
                {isArabic ? 'تفاصيل الأبعاد والدرجات' : 'Detailed Dimension Breakdown'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categoriesList.map((catKey) => {
                const info = RIASEC_CATEGORIES[catKey];
                const score = result.normalizedScores[catKey] || 0;
                const isPrimary = result.primaryType === catKey;

                return (
                  <div
                    key={catKey}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      isPrimary
                        ? 'bg-yellow border-ink shadow-notebook-sm'
                        : 'notebook-paper-lined border-ink/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-sm text-ink">
                        {isArabic ? info.nameAr : info.nameEn}
                      </span>
                      <span className="font-mono font-black text-base text-teal-deep">
                        {score}%
                      </span>
                    </div>
                    <p className="text-xs text-ink-soft font-prose mt-1">
                      {isArabic ? info.descriptionAr : info.descriptionEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* --- SECTION 2: PERSONALITY CARD FOR DOWNLOAD --- */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-display font-black text-ink">
              {isArabic ? 'بطاقة شخصية بوصلتي' : 'Your Personality Card'}
            </h2>
            <p className="text-ink-soft text-sm font-prose">
              {isArabic
                ? 'حمل بطاقة شخصيتك بتصميم الدفتر الأنيق لمشاركتها مع أولياء الأمور والمرشدين الأكاديميين.'
                : 'Download your customized profile card styled with Bausalty notebook colors.'}
            </p>
          </div>

          <PersonalityCard result={result} />
        </div>

        {/* --- SECTION 3: TAHSEEN ECOSYSTEM CTA BANNER --- */}
        <div className="bg-teal rounded-3xl p-6 sm:p-10 text-white border-2 border-ink shadow-notebook-lg relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-yellow text-ink border-2 border-ink px-3 py-1 rounded-full text-xs font-black shadow-notebook-xs">
                <Target className="w-4 h-4 text-teal" />
                <span>{isArabic ? 'تحقيق القبول الجامعي' : 'Admission Targets'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
                {isArabic ? (
                  <>
                    ضمان القبول في تخصصك المستهدف: <span className="text-yellow">{topMajor?.nameAr}</span>
                  </>
                ) : (
                  <>
                    Secure Admission into Your Top Match: <span className="text-yellow">{topMajor?.nameEn}</span>
                  </>
                )}
              </h2>

              <p className="text-teal-tint text-sm sm:text-base font-prose leading-relaxed">
                {isArabic
                  ? 'لضمان القبول في تخصصك المستهدف بالجامعات السعودية الكبرى، احرص على تحقيق درجة قدرات مرتفعة وتحصيلي ممتاز مع منصات تحسين التعليمية.'
                  : 'To secure admission into your top match at Saudi Universities, achieve top scores in your national admission exams.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <a
                href="https://quduratai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-12 min-h-[48px] inline-flex items-center justify-center gap-2 bg-yellow hover:bg-amber-300 text-ink border-2 border-ink px-6 rounded-2xl font-display font-black text-sm shadow-notebook-xs hover:scale-105 transition-transform"
              >
                <GraduationCap className="w-5 h-5 text-ink" />
                <span>{isArabic ? 'منصة قدرات' : 'Qudurat Prep'}</span>
                <ExternalLink className="w-4 h-4 text-ink" />
              </a>

              <a
                href="https://tahsili.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-12 min-h-[48px] inline-flex items-center justify-center gap-2 bg-paper-card text-ink hover:bg-paper-inset border-2 border-ink px-6 rounded-2xl font-bold text-sm shadow-notebook-xs transition-all"
              >
                <span>{isArabic ? 'منصة تحصيلي' : 'Tahsili Prep'}</span>
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
                {isArabic ? 'التخصصات الجامعية الموصى بها' : 'Recommended College Majors'}
              </h2>
              <p className="text-xs font-semibold text-muted">
                {isArabic ? 'مرتبة حسب نسبة التوافق مع نمطك الشخصي' : 'Ranked by vector match score'}
              </p>
            </div>

            {/* Vision 2030 Filter */}
            <button
              onClick={() => setFilterVision2030(!filterVision2030)}
              className={`h-11 px-4 rounded-xl text-xs font-black border-2 inline-flex items-center gap-2 transition-all shadow-notebook-xs ${
                filterVision2030
                  ? 'bg-yellow text-ink border-ink'
                  : 'bg-paper-card text-ink-soft border-ink/20 hover:border-ink'
              }`}
            >
              <Sparkles className="w-4 h-4 text-teal" />
              <span>{isArabic ? 'رؤية السعودية ٢٠٣٠ فقط' : 'Saudi Vision 2030 Only'}</span>
            </button>
          </div>

          {/* Grid of Majors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMajors.map((major) => {
              const isExpanded = expandedMajorId === major.id;

              return (
                <div
                  key={major.id}
                  className="notebook-paper-lined rounded-notebook p-6 border-2 border-ink shadow-notebook-sm hover:shadow-notebook-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header badges */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black bg-paper-inset text-ink border border-ink px-2.5 py-1 rounded-lg">
                        {isArabic ? `توافق: ${major.matchScore}%` : `Match: ${major.matchScore}%`}
                      </span>

                      {major.isVision2030 && (
                        <span className="text-[10px] font-black bg-yellow text-ink border border-ink px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs">
                          <Sparkles className="w-3 h-3 text-teal" />
                          <span>{isArabic ? 'رؤية ٢٠٣٠' : 'Vision 2030'}</span>
                        </span>
                      )}
                    </div>

                    {/* Major Title */}
                    <div>
                      <h3 className="text-xl font-display font-extrabold text-ink leading-snug">
                        {isArabic ? major.nameAr : major.nameEn}
                      </h3>
                    </div>

                    <p className="text-ink-soft text-xs font-prose leading-relaxed line-clamp-3">
                      {isArabic ? major.descriptionAr : major.descriptionEn}
                    </p>

                    {/* Expandable Info */}
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
                            <span>{isArabic ? 'أبرز الجامعات السعودية:' : 'Top Saudi Universities:'}</span>
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
                    <span>
                      {isExpanded
                        ? (isArabic ? 'إخفاء التفاصيل' : 'Hide Details')
                        : (isArabic ? 'عرض الفرص والجامعات' : 'View Careers & Universities')}
                    </span>
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
