'use client';

import React, { useRef, useState } from 'react';
import { Download, Compass, Award, CheckCircle2, QrCode } from 'lucide-react';
import { AssessmentResult, RiasecType } from '@/types';
import { RIASEC_CATEGORIES } from '@/data/questions';
import { toPng } from 'html-to-image';

interface PersonalityCardProps {
  result: AssessmentResult;
}

const ARCHETYPE_TITLES: Record<RiasecType, { en: string; ar: string }> = {
  R: { en: 'The Practical Innovator & Engineer', ar: 'المبتكر والمهندس التطبيقي' },
  I: { en: 'The Analytical Researcher & Scientist', ar: 'الباحث والتحليلي الخبير' },
  A: { en: 'The Creative Visionary & Designer', ar: 'المبدع والمصمم الرائد' },
  S: { en: 'The Empathetic Educator & Leader', ar: 'الموجه والقيادي المجتمعي' },
  E: { en: 'The Strategic Entrepreneur & Director', ar: 'الرائد وواضع الاستراتيجيات' },
  C: { en: 'The Systematic Specialist & Controller', ar: 'المنظم والخبير التنظيمي' },
};

export default function PersonalityCard({ result }: PersonalityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const primaryCat = result.primaryType;
  const archetype = ARCHETYPE_TITLES[primaryCat] || ARCHETYPE_TITLES['I'];
  const topMajor = result.matchingMajors[0];
  const secondMajor = result.matchingMajors[1];

  // Top 3 strengths
  const topStrengths = [result.primaryType, result.secondaryType, result.tertiaryType].map(
    (code) => ({
      code,
      info: RIASEC_CATEGORIES[code],
      score: result.normalizedScores[code] || 0,
    })
  );

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 0.95,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `Bausalty-Personality-Card-${result.topCode}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating personality card image:', err);
      alert('Could not download image directly. You can take a screenshot of your card below!');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      
      {/* --- SHAREABLE DOWLOADABLE CARD CONTAINER --- */}
      <div
        ref={cardRef}
        className="w-full max-w-lg bg-gradient-to-br from-[#1E3A8A] via-[#1D4ED8] to-[#0284C7] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-sky-300/30"
      >
        {/* Background Accent Grids */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-blue-900/40 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header & Brand */}
        <div className="flex items-center justify-between border-b border-white/15 pb-5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white text-[#1E3A8A] flex items-center justify-center shadow-lg">
              <Compass className="w-6 h-6 text-[#0284C7]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white tracking-tight">Bausalty</span>
                <span className="text-lg font-bold text-sky-200">بوصلتي</span>
              </div>
              <p className="text-[11px] font-semibold text-sky-200">
                Tahseen AI Group | مجموعة تحسين
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-center">
            <span className="block text-[10px] text-sky-200 font-bold uppercase tracking-wider">Holland Code</span>
            <span className="text-xl font-black tracking-widest text-white">{result.topCode}</span>
          </div>
        </div>

        {/* Archetype Title */}
        <div className="py-6 text-center space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-200 border border-amber-300/30 px-3 py-1 rounded-full text-xs font-extrabold">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Personality Archetype</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {archetype.en}
          </h3>
          <p className="text-lg font-bold text-sky-200 font-sans dir-rtl">
            {archetype.ar}
          </p>
        </div>

        {/* Top 3 Strengths Breakdown */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-3 relative z-10 my-2">
          <p className="text-xs font-bold text-sky-200 uppercase tracking-wider">
            Top 3 RIASEC Traits / أبرز السمات الشخصية
          </p>

          <div className="grid grid-cols-3 gap-2 text-center">
            {topStrengths.map((item) => (
              <div key={item.code} className="bg-white/10 rounded-xl p-2.5 border border-white/10">
                <span className="text-xl font-black text-amber-300 block">{item.score}%</span>
                <span className="text-xs font-bold text-white block truncate">{item.info.nameEn}</span>
                <span className="text-[10px] font-semibold text-sky-200 block font-sans truncate">{item.info.nameAr}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 2 Major Recommendations */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-2.5 relative z-10">
          <p className="text-xs font-bold text-sky-200 uppercase tracking-wider flex items-center justify-between">
            <span>Top Major Matches / أفضل التخصصات</span>
            <span className="text-amber-300 text-[11px] font-black">{topMajor?.matchScore}% Match</span>
          </p>

          {topMajor && (
            <div className="flex items-start gap-2 text-xs font-bold text-white bg-white/10 p-2.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-extrabold">{topMajor.nameEn}</p>
                <p className="text-sky-200 font-sans font-semibold text-[11px]">{topMajor.nameAr}</p>
              </div>
            </div>
          )}

          {secondMajor && (
            <div className="flex items-start gap-2 text-xs font-bold text-white bg-white/5 p-2.5 rounded-xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-extrabold">{secondMajor.nameEn}</p>
                <p className="text-sky-200 font-sans font-semibold text-[11px]">{secondMajor.nameAr}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer & QR Link */}
        <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-sky-200 relative z-10">
          <div className="flex items-center gap-2">
            <QrCode className="w-8 h-8 text-white/80" />
            <div>
              <p className="font-extrabold text-white text-[11px]">Bausalty.com</p>
              <p className="text-[10px] text-sky-200">Tahseen AI Major Engine</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-semibold text-sky-200">Validated for Saudi Students</p>
            <p className="text-[10px] font-bold text-amber-300">Saudi Vision 2030</p>
          </div>
        </div>

      </div>

      {/* Download Action Button */}
      <button
        onClick={handleDownloadImage}
        disabled={isDownloading}
        className="inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white px-6 py-3.5 rounded-2xl font-black text-sm shadow-xl hover:scale-102 active:scale-98 transition-all"
      >
        <Download className="w-4 h-4 text-sky-300" />
        <span>
          {isDownloading
            ? 'Generating Image... / جاري التحميل'
            : 'Download Personality Card / تحميل بطاقة الشخصية'}
        </span>
      </button>

    </div>
  );
}
