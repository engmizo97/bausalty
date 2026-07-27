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

export default function ResultsPage() {
  const router = useRouter();

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
      <div className="flex-1 flex items-center justify-center p-12 bg-slate-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1E3A8A] text-white flex items-center justify-center mx-auto animate-spin">
            <Compass className="w-6 h-6" />
          </div>
          <p className="text-slate-600 font-bold">Calculating Your Bausalty Profile...</p>
        </div>
      </div>
    );
  }

  // Format data for Recharts Radar Chart
  const categoriesList: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  const radarData = categoriesList.map((catKey) => {
    const catInfo = RIASEC_CATEGORIES[catKey];
    return {
      category: `${catInfo.nameEn} (${catKey})`,
      score: result.normalizedScores[catKey] || 0,
      fullMark: 100,
    };
  });

  const filteredMajors = result.matchingMajors.filter((m) =>
    filterVision2030 ? m.isVision2030 : true
  );

  const topMajor = result.matchingMajors[0];

  return (
    <div className="flex-1 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* --- HEADER SUMMARY BANNER --- */}
        <div className="bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#0284C7] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-sky-200">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Assessment Completed / تم تحليل النتيجة بنجاح</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Your Holland Code: <span className="text-amber-300 font-extrabold">{result.topCode}</span>
            </h1>

            <p className="text-sky-100 text-base sm:text-lg leading-relaxed">
              Based on your 42 psychometric items, your dominant profile is **{RIASEC_CATEGORIES[result.primaryType]?.nameEn} ({RIASEC_CATEGORIES[result.primaryType]?.nameAr})**.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 bg-white text-[#1E3A8A] hover:bg-sky-50 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-[#0284C7]" />
                <span>Retake Test / إعادة الاختبار</span>
              </Link>
            </div>
          </div>
        </div>

        {/* --- SECTION 1: RIASEC BREAKDOWN & RECHARTS RADAR CHART --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Radar Chart */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">RIASEC Radar Profile</h2>
                <p className="text-xs font-semibold text-slate-500">Visual mapping across 6 Holland dimensions</p>
              </div>
              <span className="text-xs font-black bg-blue-50 text-[#1E3A8A] px-3 py-1 rounded-full border border-blue-100">
                0 - 100% Normalized
              </span>
            </div>

            <div className="w-full h-80 sm:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 700 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
                  <Radar
                    name="Student Score"
                    dataKey="score"
                    stroke="#1D4ED8"
                    fill="#0284C7"
                    fillOpacity={0.5}
                  />
                  <Tooltip
                    formatter={(val) => [`${val}%`, 'Score']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Percentage Progress Bars */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-extrabold text-slate-900">Category Breakdown</h2>
              <p className="text-xs font-semibold text-slate-500">Detailed scores by RIASEC trait</p>
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
                        <span
                          className="w-6 h-6 rounded-lg text-white font-black text-xs flex items-center justify-center"
                          style={{ backgroundColor: catInfo.color }}
                        >
                          {catKey}
                        </span>
                        <span className="text-slate-900">{catInfo.nameEn}</span>
                        <span className="text-xs font-semibold text-slate-500 font-sans">({catInfo.nameAr})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isTop3 && (
                          <span className="text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                            Top Trait
                          </span>
                        )}
                        <span className="text-[#1E3A8A] font-black">{scorePct}%</span>
                      </div>
                    </div>

                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${scorePct}%`,
                          backgroundColor: catInfo.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* --- SECTION 2: BAUSALTY PERSONALITY CARD --- */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0284C7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Shareable Profile / بطاقة الشخصية
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Your Bausalty Personality Card
            </h2>
            <p className="text-slate-600 text-sm">
              Download your customized Holland Code profile card styled with Bausalty brand colors to share with academic advisors and parents.
            </p>
          </div>

          <PersonalityCard result={result} />
        </div>

        {/* --- SECTION 3: TAHSEEN AI ECOSYSTEM CTA BANNER --- */}
        <div className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-[#1D4ED8] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-blue-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-extrabold">
                <Target className="w-4 h-4 text-amber-300" />
                <span>Tahseen AI Group Ecosystem Hook / قدرات وتخصيلي</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Secure Admission into Your Top Match: <span className="text-sky-300">{topMajor?.nameEn || 'Your Major'}</span>
              </h2>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                To secure admission into your top match at your choice of University, aim for a **Qudurat score of 88+** and **Tahsili score of 85+**. Start prep with Qudurat AI & Tahsili AI.
              </p>

              <p className="text-sky-200 text-xs sm:text-sm font-semibold font-sans dir-rtl text-right lg:text-left">
                للقبول في تخصصك المستهدف بالجامعة (مثل جامعة الملك سعود، KFUPM، كاوست)، احرص على تحقيق درجة قدرات +88 ودرجة تحصيلي +85. ابدأ الاستعداد الآن مع منصات تحسين الذكية.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <a
                href="https://qudurat.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3.5 rounded-2xl font-black text-sm shadow-lg transition-transform hover:scale-105"
              >
                <GraduationCap className="w-5 h-5 text-slate-950" />
                <span>Start Qudurat AI Prep</span>
                <ExternalLink className="w-4 h-4 text-slate-950" />
              </a>

              <a
                href="https://tahsili.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all"
              >
                <span>Tahsili AI Prep</span>
                <ExternalLink className="w-4 h-4 text-sky-200" />
              </a>
            </div>
          </div>
        </div>

        {/* --- SECTION 4: MATCHING MAJORS RECOMMENDATIONS GRID --- */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Recommended Saudi College Majors</h2>
              <p className="text-xs font-semibold text-slate-500">Ranked by vector match score against your RIASEC profile</p>
            </div>

            {/* Saudi Vision 2030 Filter */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setFilterVision2030(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  !filterVision2030 ? 'bg-[#1E3A8A] text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Majors ({result.matchingMajors.length})
              </button>
              <button
                onClick={() => setFilterVision2030(true)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 ${
                  filterVision2030 ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Saudi Vision 2030 Only ({result.matchingMajors.filter((m) => m.isVision2030).length})</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMajors.map((major) => {
              const isExpanded = expandedMajorId === major.id;

              return (
                <div
                  key={major.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    
                    {/* Card Top Badges */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold bg-blue-50 text-[#1E3A8A] border border-blue-100 px-2.5 py-1 rounded-lg">
                        Holland: {major.riasecCode}
                      </span>

                      <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-black">
                        {major.matchScore}% Match
                      </div>
                    </div>

                    {/* Major Title */}
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                        {major.nameEn}
                      </h3>
                      <p className="text-sm font-bold text-[#0284C7] font-sans">
                        {major.nameAr}
                      </p>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      {major.descriptionEn}
                    </p>

                    {major.isVision2030 && (
                      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-900 font-semibold space-y-0.5">
                        <span className="font-extrabold text-emerald-900 block">
                          Vision 2030 Sector: {major.vision2030SectorEn}
                        </span>
                        <span className="text-[11px] font-sans font-bold text-emerald-700 block dir-rtl">
                          {major.vision2030SectorAr}
                        </span>
                      </div>
                    )}

                    {/* Expandable Details */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-100 space-y-3 text-xs">
                        <div>
                          <p className="font-bold text-slate-900 flex items-center gap-1 mb-1">
                            <Briefcase className="w-3.5 h-3.5 text-[#0284C7]" />
                            <span>Sample Careers / الفرص الوظيفية:</span>
                          </p>
                          <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
                            {major.sampleCareersEn.map((c) => (
                              <li key={c}>{c}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="font-bold text-slate-900 flex items-center gap-1 mb-1">
                            <Building className="w-3.5 h-3.5 text-[#1E3A8A]" />
                            <span>Top Saudi Universities / أبرز الجامعات:</span>
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {major.saudiUniversitiesEn.map((uni) => (
                              <span
                                key={uni}
                                className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold"
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
                    className="mt-4 pt-3 border-t border-slate-100 w-full text-xs font-bold text-[#1E3A8A] hover:text-[#0284C7] flex items-center justify-between"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Careers & Universities'}</span>
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
