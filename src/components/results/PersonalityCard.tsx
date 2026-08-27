'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Download, Award, Calendar, CheckCircle2, User } from 'lucide-react';
import { AssessmentResult, RiasecType } from '@/types';
import { RIASEC_CATEGORIES } from '@/data/questions';
import { useLanguage } from '@/context/LanguageContext';
import { toPng } from 'html-to-image';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';

interface PersonalityCardProps {
  result: AssessmentResult;
  student?: {
    name?: string;
    image?: string;
    email?: string;
  };
}

const ARCHETYPE_TITLES: Record<RiasecType, { en: string; ar: string }> = {
  R: { en: 'The Practical Innovator & Engineer', ar: 'المبتكر والمهندس التطبيقي' },
  I: { en: 'The Analytical Researcher & Scientist', ar: 'الباحث والتحليلي الخبير' },
  A: { en: 'The Creative Visionary & Designer', ar: 'المبدع والمصمم الرائد' },
  S: { en: 'The Empathetic Educator & Leader', ar: 'الموجه والقيادي المجتمعي' },
  E: { en: 'The Strategic Entrepreneur & Director', ar: 'الرائد وواضع الاستراتيجيات' },
  C: { en: 'The Systematic Specialist & Controller', ar: 'المنظم والخبير التنظيمي' },
};

const RIASEC_SHORT_NAMES: Record<RiasecType, { ar: string; en: string }> = {
  R: { ar: 'العملي', en: 'Realistic' },
  I: { ar: 'الاستكشافي', en: 'Investigative' },
  A: { ar: 'الفني', en: 'Artistic' },
  S: { ar: 'الاجتماعي', en: 'Social' },
  E: { ar: 'القيادي', en: 'Enterprising' },
  C: { ar: 'التنظيمي', en: 'Conventional' },
};

export default function PersonalityCard({ result, student }: PersonalityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [studentInfo, setStudentInfo] = useState<{ name?: string; image?: string } | null>(student || null);

  useEffect(() => {
    if (!studentInfo) {
      try {
        const saved = localStorage.getItem('bausalty_user_session');
        if (saved) {
          setStudentInfo(JSON.parse(saved));
        }
      } catch {}
    }
  }, [student, studentInfo]);

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
    category: isArabic ? RIASEC_SHORT_NAMES[cat].ar : RIASEC_SHORT_NAMES[cat].en,
    score: result.normalizedScores[cat] || 0,
    fullMark: 100,
  }));

  const testDate = result.completedAt
    ? new Date(result.completedAt).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

  const renderCustomPolarTick = (props: any) => {
    const { x, y, cx, cy, payload } = props;
    const text: string = payload?.value || '';
    const dx = x - cx;
    const dy = y - cy;

    let textAnchor: 'start' | 'middle' | 'end' = 'middle';
    let xOffset = 0;
    let yOffset = 0;

    if (Math.abs(dx) < 15) {
      textAnchor = 'middle';
      yOffset = dy < 0 ? -6 : 10;
    } else if (dx < 0) {
      textAnchor = 'end';
      xOffset = -6;
      yOffset = dy < 0 ? -1 : 3;
    } else {
      textAnchor = 'start';
      xOffset = 6;
      yOffset = dy < 0 ? -1 : 3;
    }

    return (
      <text
        x={x + xOffset}
        y={y + yOffset}
        textAnchor={textAnchor}
        fill="#1F1B13"
        fontSize={10}
        fontWeight={700}
        className="select-none font-sans"
      >
        {text}
      </text>
    );
  };

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
    <div className="flex flex-col items-center space-y-5">
      
      {/* --- SHAREABLE DOWNLOADABLE CARD CONTAINER --- */}
      <div
        ref={cardRef}
        className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-7 text-[#1F1B13] border-2 border-[#1F1B13] shadow-[4px_4px_0_#1F1B13] relative overflow-hidden space-y-4"
      >
        {/* Card Header & Brand */}
        <div className="flex items-center justify-between border-b border-[#1F1B13]/10 pb-3 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl border-2 border-[#1F1B13] overflow-hidden shadow-2xs bg-white shrink-0">
              <img
                src="/bawsalati-logo.webp"
                alt="بوصلتي"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
            <div>
              <span className="text-xl font-display font-black text-[#1F1B13] tracking-tight block">
                {isArabic ? 'بوصلتي' : 'Bausalty'}
              </span>
              <p className="text-[11px] font-semibold text-[#109E91]">
                {isArabic ? 'تحسين التعليمية' : 'Tahseen Education'}
              </p>
            </div>
          </div>

          <div className="bg-[#FEF6E8] px-3 py-1 rounded-xl border border-[#E5A93C] text-center shadow-2xs">
            <span className="block text-[9px] text-[#7D715D] font-bold uppercase tracking-wider">
              {isArabic ? 'كود الميول' : 'Holland Code'}
            </span>
            <span className="text-lg font-display font-black tracking-widest text-[#1F1B13] font-mono">{result.topCode}</span>
          </div>
        </div>

        {/* Student Profile Info Bar (Photo + Name + Date) */}
        <div className="flex items-center justify-between bg-[#FAF6EA] p-3 rounded-xl border border-[#1F1B13]/15 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border-2 border-[#1F1B13] overflow-hidden bg-white shrink-0 relative flex items-center justify-center">
              {studentInfo?.image ? (
                <img
                  src={studentInfo.image}
                  alt={studentInfo.name || 'Student'}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              ) : (
                <User className="w-4 h-4 text-[#109E91]" />
              )}
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-[#1F1B13] block">
                {studentInfo?.name || (isArabic ? 'طالب بوصلتي' : 'Bausalty Student')}
              </span>
              <span className="text-[10px] text-[#109E91] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#109E91]" />
                <span>{isArabic ? 'مقياس معتمد وموثق' : 'Verified Assessment'}</span>
              </span>
            </div>
          </div>

          <div className="text-left flex items-center gap-1 text-[11px] font-semibold text-[#7D715D]">
            <Calendar className="w-3 h-3 text-[#109E91]" />
            <span className="font-mono">{testDate}</span>
          </div>
        </div>

        {/* Archetype Title */}
        <div className="py-1 text-center space-y-1 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#E8F7F5] text-[#0D7E74] border border-[#109E91]/30 px-3 py-0.5 rounded-full text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-[#109E91]" />
            <span>{isArabic ? 'نمط الميول والشخصية' : 'Personality Archetype'}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-black text-[#1F1B13] leading-tight">
            {isArabic ? archetype.ar : archetype.en}
          </h3>
        </div>

        {/* Mini Radar Chart + Strengths Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-center bg-white p-3.5 rounded-xl border border-[#1F1B13]/15 relative z-10">
          {/* Radar Chart */}
          <div className="h-48 w-full flex items-center justify-center py-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="55%" data={radarData}>
                <PolarGrid stroke="#1F1B13" strokeDasharray="2 2" strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="category" tick={renderCustomPolarTick} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#109E91"
                  strokeWidth={2}
                  fill="#109E91"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Top 3 Traits Vector List */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#7D715D] uppercase tracking-wider block border-b border-[#1F1B13]/10 pb-1">
              {isArabic ? 'أبرز الميول الشخصية:' : 'Top Trait Dimensions:'}
            </span>
            {topStrengths.map((item, idx) => (
              <div key={item.code} className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-[#1F1B13]">
                  <span className="w-4 h-4 rounded-full bg-[#FEF6E8] text-[#1F1B13] border border-[#E5A93C] flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span>{isArabic ? item.info.nameAr : item.info.nameEn}</span>
                </span>
                <span className="font-mono font-black text-[#109E91]">{item.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Recommended Major Pill */}
        {topMajor && (
          <div className="bg-[#E8F7F5] p-3 rounded-xl border border-[#109E91]/40 space-y-1 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D7E74] block">
              {isArabic ? 'أعلى تخصص موصى به:' : 'Top Recommended Major:'}
            </span>
            <p className="text-base font-display font-black text-[#1F1B13]">
              {isArabic ? topMajor.nameAr : topMajor.nameEn}
            </p>
            {secondMajor && (
              <p className="text-xs text-[#4B4131] font-prose">
                {isArabic ? 'التخصص البديل:' : 'Alternative Match:'}{' '}
                <strong>{isArabic ? secondMajor.nameAr : secondMajor.nameEn}</strong>
              </p>
            )}
          </div>
        )}

        {/* Card Footer Stamp */}
        <div className="pt-2 border-t border-dashed border-[#1F1B13]/15 flex items-center justify-between text-[11px] font-semibold text-[#7D715D] relative z-10">
          <span>{isArabic ? 'رؤية السعودية 2030' : 'Saudi Vision 2030'}</span>
          <span>{isArabic ? 'منصة بوصلتي · تحسين التعليمية' : 'Bausalty · Tahseen Education'}</span>
        </div>
      </div>

      {/* Download Action Button */}
      <button
        onClick={handleDownloadImage}
        disabled={isDownloading}
        className="h-11 px-6 rounded-xl bg-[#109E91] hover:bg-[#0D7E74] text-white border-2 border-[#1F1B13] font-display font-bold text-sm shadow-[2.5px_2.5px_0_#1F1B13] flex items-center gap-2 hover:translate-x-[-1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0_#1F1B13] transition-all cursor-pointer"
      >
        <Download className="w-4 h-4 text-[#FEF6E8]" />
        <span>
          {isDownloading
            ? (isArabic ? 'جاري تجهيز الصورة...' : 'Generating Image...')
            : (isArabic ? 'تحميل بطاقة الشخصية (صورة)' : 'Download Personality Card (PNG)')}
        </span>
      </button>

    </div>
  );
}
