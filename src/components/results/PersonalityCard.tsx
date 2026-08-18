'use client';

import React, { useRef, useState } from 'react';
import { Download, Compass, Award, CheckCircle2, QrCode } from 'lucide-react';
import { AssessmentResult, RiasecType } from '@/types';
import { RIASEC_CATEGORIES } from '@/data/questions';
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
    category: cat,
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
      
      {/* --- SHAREABLE DOWNLOADABLE CARD CONTAINER WITH NOTEBOOK DESIGN SYSTEM --- */}
      <div
        ref={cardRef}
        className="w-full max-w-lg bg-[#fffdf6] rounded-[18px] p-6 sm:p-8 text-[#3a2f21] border-2 border-[#3a2f21] shadow-[5px_5px_0_#3a2f21] relative overflow-hidden space-y-5"
      >
        {/* Card Header & Brand */}
        <div className="flex items-center justify-between border-b-2 border-[#3a2f21]/15 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#0d9488] text-white border-2 border-[#3a2f21] flex items-center justify-center shadow-2xs">
              <Compass className="w-6 h-6 text-[#ffd66e]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-display font-black text-[#3a2f21] tracking-tight">Bausalty</span>
                <span className="text-lg font-display font-bold text-[#0d9488]">بوصلتي</span>
              </div>
              <p className="text-[11px] font-bold text-[#8a7a5f]">
                Tahseen AI Group | مجموعة تحسين
              </p>
            </div>
          </div>

          <div className="bg-[#ffd66e] px-3 py-1.5 rounded-xl border-2 border-[#3a2f21] text-center shadow-2xs">
            <span className="block text-[10px] text-[#3a2f21] font-black uppercase tracking-wider">Holland Code</span>
            <span className="text-xl font-display font-black tracking-widest text-[#3a2f21]">{result.topCode}</span>
          </div>
        </div>

        {/* Archetype Title */}
        <div className="py-2 text-center space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#c9f2e8] text-[#0f766e] border border-[#0d9488] px-3 py-0.5 rounded-full text-xs font-black">
            <Award className="w-3.5 h-3.5 text-[#0d9488]" />
            <span>Personality Archetype</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-black text-[#3a2f21] leading-tight">
            {archetype.en}
          </h3>
          <p className="text-base sm:text-lg font-display font-bold text-[#0d9488]">
            {archetype.ar}
          </p>
        </div>

        {/* EMBEDDED MINI RECHARTS RADAR CHART */}
        <div className="bg-[#fbf6ea] rounded-2xl p-3 border-2 border-[#3a2f21] space-y-1 relative z-10">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-display font-black text-[#3a2f21]">RIASEC Trait Polygon</span>
            <span className="text-[10px] font-bold text-[#8a7a5f]">6-Axis Profile</span>
          </div>

          <div className="w-full h-44 sm:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#3a2f21" strokeDasharray="2 2" opacity={0.3} />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: '#3a2f21', fontSize: 11, fontWeight: 800, fontFamily: 'Baloo Bhaijaan 2' }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#8a7a5f" tick={false} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#0d9488"
                  fill="#ffd66e"
                  fillOpacity={0.75}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 3 Strengths Breakdown */}
        <div className="bg-[#fbf6ea] rounded-2xl p-3.5 border-2 border-[#3a2f21] space-y-2 relative z-10">
          <p className="text-xs font-display font-black text-[#3a2f21] uppercase tracking-wider">
            Top 3 RIASEC Traits
          </p>

          <div className="grid grid-cols-3 gap-2 text-center">
            {topStrengths.map((item) => (
              <div key={item.code} className="bg-[#fffdf6] rounded-xl p-2 border border-[#3a2f21]">
                <span className="text-lg font-display font-black text-[#0d9488] block">{item.score}%</span>
                <span className="text-[11px] font-bold text-[#3a2f21] block truncate">{item.info.nameEn}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 2 Major Recommendations */}
        <div className="bg-[#fbf6ea] rounded-2xl p-3.5 border-2 border-[#3a2f21] space-y-2 relative z-10">
          <p className="text-xs font-display font-black text-[#3a2f21] uppercase tracking-wider flex items-center justify-between">
            <span>Top Major Matches</span>
            <span className="text-[#0d9488] font-black">{topMajor?.matchScore}% Match</span>
          </p>

          {topMajor && (
            <div className="flex items-start gap-2 text-xs font-bold text-[#3a2f21] bg-[#fffdf6] p-2.5 rounded-xl border border-[#3a2f21]">
              <CheckCircle2 className="w-4 h-4 text-[#0d9488] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#3a2f21] font-extrabold">{topMajor.nameEn}</p>
                <p className="text-[#5c4f3a] font-bold text-[11px]">{topMajor.nameAr}</p>
              </div>
            </div>
          )}

          {secondMajor && (
            <div className="flex items-start gap-2 text-xs font-bold text-[#3a2f21] bg-[#fffdf6] p-2.5 rounded-xl border border-[#3a2f21]">
              <CheckCircle2 className="w-4 h-4 text-[#7c3aed] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#3a2f21] font-extrabold">{secondMajor.nameEn}</p>
                <p className="text-[#5c4f3a] font-bold text-[11px]">{secondMajor.nameAr}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer & QR Link */}
        <div className="pt-3 border-t-2 border-[#3a2f21]/15 flex items-center justify-between text-xs text-[#5c4f3a] relative z-10">
          <div className="flex items-center gap-2">
            <QrCode className="w-7 h-7 text-[#3a2f21]" />
            <div>
              <p className="font-extrabold text-[#3a2f21] text-[11px]">Bausalty.com</p>
              <p className="text-[10px] text-[#8a7a5f]">Tahseen AI Major Engine</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-bold text-[#5c4f3a]">Saudi Arabia Higher Ed</p>
            <p className="text-[10px] font-black text-[#0d9488]">Saudi Vision 2030</p>
          </div>
        </div>

      </div>

      {/* Download Action Button */}
      <button
        onClick={handleDownloadImage}
        disabled={isDownloading}
        className="h-12 min-h-[48px] inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white px-6 rounded-2xl font-display font-black text-sm border-2 border-[#3a2f21] shadow-[3px_3px_0_#3a2f21] hover:scale-102 active:scale-98 transition-all"
      >
        <Download className="w-4 h-4 text-[#ffd66e]" />
        <span>
          {isDownloading
            ? 'Generating Image... / جاري التحميل'
            : 'Download Personality Card (PNG) / تحميل بطاقة الشخصية'}
        </span>
      </button>

    </div>
  );
}
