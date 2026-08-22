'use client';

import React, { useRef, useState } from 'react';
import { Download, Compass, Award, CheckCircle2, QrCode } from 'lucide-react';
import { AssessmentResult, RiasecType } from '@/types';
import { RIASEC_CATEGORIES } from '@/data/questions';
import { useLanguage } from '@/context/LanguageContext';
import { toPng } from 'html-to-image';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

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
  const { language } = useLanguage();
  const isArabic = language === 'ar';

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

  // Radar data for mini chart inside the card
  const categoriesList: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];
  const radarData = categoriesList.map((cat) => ({
    category: isArabic ? RIASEC_CATEGORIES[cat]?.nameAr : cat,
    score: result.normalizedScores[cat] || 0,
    fullMark: 100,
  }));

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 0.98,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `Bausalty-Card-${result.topCode}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating card image:', err);
      alert(isArabic ? 'يمكنك أخذ لقطة شاشة للبطاقة أدناه مباشرة!' : 'You can take a screenshot of your card below!');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      
      {/* --- SHAREABLE DOWNLOADABLE CARD CONTAINER --- */}
      <div
        ref={cardRef}
        className="w-full max-w-lg notebook-paper-lined rounded-[18px] p-6 sm:p-8 text-[#3a2f21] border-2 border-[#3a2f21] shadow-[5px_5px_0_#3a2f21] relative overflow-hidden space-y-5"
      >
        {/* Card Header & Brand */}
        <div className="flex items-center justify-between border-b-2 border-[#3a2f21]/15 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#0d9488] text-white border-2 border-[#3a2f21] flex items-center justify-center shadow-2xs">
              <Compass className="w-6 h-6 text-[#ffd66e]" />
            </div>
            <div>
              <span className="text-xl font-display font-black text-[#3a2f21] tracking-tight block">
                {isArabic ? 'بوصلتي' : 'Bausalty'}
              </span>
              <p className="text-[11px] font-bold text-[#8a7a5f]">
                {isArabic ? 'تحسين التعليمية' : 'Tahseen Education'}
              </p>
            </div>
          </div>

          <div className="bg-[#ffd66e] px-3 py-1.5 rounded-xl border-2 border-[#3a2f21] text-center shadow-2xs">
            <span className="block text-[10px] text-[#3a2f21] font-black uppercase tracking-wider">
              {isArabic ? 'كود الميول' : 'Holland Code'}
            </span>
            <span className="text-xl font-display font-black tracking-widest text-[#3a2f21]">{result.topCode}</span>
          </div>
        </div>

        {/* Archetype Title */}
        <div className="py-2 text-center space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#c9f2e8] text-[#0f766e] border border-[#0d9488] px-3 py-0.5 rounded-full text-xs font-black">
            <Award className="w-3.5 h-3.5 text-[#0d9488]" />
            <span>{isArabic ? 'نمط الشخصية' : 'Personality Archetype'}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-black text-[#3a2f21] leading-tight">
            {isArabic ? archetype.ar : archetype.en}
          </h3>
        </div>

        {/* Mini Radar Chart + Strengths Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-white/90 p-4 rounded-2xl border-2 border-[#3a2f21] relative z-10">
          {/* Radar Chart */}
          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#3a2f21" strokeDasharray="2 2" strokeOpacity={0.25} />
                <PolarAngleAxis dataKey="category" tick={{ fill: '#3a2f21', fontSize: 10, fontWeight: 700 }} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#0d9488"
                  strokeWidth={2}
                  fill="#0d9488"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Top 3 Traits Vector List */}
          <div className="space-y-2">
            <span className="text-[11px] font-black text-[#8a7a5f] uppercase tracking-wider block border-b border-[#3a2f21]/15 pb-1">
              {isArabic ? 'أبرز الميول الشخصية:' : 'Top Trait Dimensions:'}
            </span>
            {topStrengths.map((item, idx) => (
              <div key={item.code} className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-[#3a2f21]">
                  <span className="w-4 h-4 rounded-full bg-[#ffd66e] text-[#3a2f21] border border-[#3a2f21] flex items-center justify-center text-[10px] font-black">
                    {idx + 1}
                  </span>
                  <span>{isArabic ? item.info.nameAr : item.info.nameEn}</span>
                </span>
                <span className="font-mono font-black text-[#0d9488]">{item.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Recommended Major Pill */}
        {topMajor && (
          <div className="bg-[#c9f2e8] p-3.5 rounded-2xl border-2 border-[#0d9488] space-y-1 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#0f766e] block">
              {isArabic ? 'أعلى تخصص موصى به:' : 'Top Recommended Major:'}
            </span>
            <p className="text-base sm:text-lg font-display font-black text-[#3a2f21]">
              {isArabic ? topMajor.nameAr : topMajor.nameEn}
            </p>
            {secondMajor && (
              <p className="text-xs text-[#5c4f3a] font-prose">
                {isArabic ? 'التخصص البديل:' : 'Alternative Match:'}{' '}
                <strong>{isArabic ? secondMajor.nameAr : secondMajor.nameEn}</strong>
              </p>
            )}
          </div>
        )}

        {/* Card Footer Stamp */}
        <div className="pt-2 border-t-2 border-dashed border-[#3a2f21]/20 flex items-center justify-between text-[11px] font-bold text-[#8a7a5f] relative z-10">
          <span>{isArabic ? 'رؤية السعودية ٢٠٣٠' : 'Saudi Vision 2030'}</span>
          <span>{isArabic ? 'منصة بوصلتي' : 'Bausalty Platform'}</span>
        </div>
      </div>

      {/* Download Action Button */}
      <button
        onClick={handleDownloadImage}
        disabled={isDownloading}
        className="h-12 px-6 rounded-2xl bg-[#ffd66e] hover:bg-amber-300 text-[#3a2f21] border-2 border-[#3a2f21] font-display font-black text-sm shadow-[3px_3px_0_#3a2f21] flex items-center gap-2 hover:scale-105 transition-all"
      >
        <Download className="w-4 h-4 text-[#3a2f21]" />
        <span>
          {isDownloading
            ? (isArabic ? 'جاري تجهيز الصورة...' : 'Generating Image...')
            : (isArabic ? 'تحميل بطاقة الشخصية (صورة)' : 'Download Personality Card (PNG)')}
        </span>
      </button>

    </div>
  );
}
