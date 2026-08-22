'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Award,
  CheckCircle2,
  BookOpen,
  Brain,
  GraduationCap,
  Download,
  Share2,
  AlertTriangle,
  TrendingUp,
  Users,
  Lock,
} from 'lucide-react';
import { MBTI_QUESTIONS, MbtiTrait } from '@/data/mbtiDataset';
import { ARCHETYPES } from '@/data/archetypes';
import { ArchetypeInfo } from '@/types/personality';
import { useLanguage } from '@/context/LanguageContext';

interface MbtiResultData {
  code: string;
  archetype: ArchetypeInfo;
  percentages: {
    EI: { E: number; I: number };
    SN: { S: number; N: number };
    TF: { T: number; F: number };
    JP: { J: number; P: number };
  };
  completedAt: string;
}

export default function PersonalityTestPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, MbtiTrait>>({});
  const [result, setResult] = useState<MbtiResultData | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Restore saved progress or results from localStorage
  useEffect(() => {
    try {
      const savedResult = localStorage.getItem('bausalty_mbti_result');
      if (savedResult) {
        setResult(JSON.parse(savedResult));
      }

      const savedAnswers = localStorage.getItem('bausalty_mbti_answers');
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
    } catch {
      // Ignore read error
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const totalQuestions = MBTI_QUESTIONS.length;
  const currentQuestion = MBTI_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (trait: MbtiTrait) => {
    const updated = {
      ...answers,
      [currentQuestion.id]: trait,
    };
    setAnswers(updated);

    try {
      localStorage.setItem('bausalty_mbti_answers', JSON.stringify(updated));
    } catch {
      // Ignore write error
    }

    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
      }, 250);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    if (confirm(isArabic ? 'هل تريد إعادة إجراء اختبار الشخصية من البداية؟' : 'Are you sure you want to reset your test answers?')) {
      setAnswers({});
      setResult(null);
      setCurrentIndex(0);
      try {
        localStorage.removeItem('bausalty_mbti_answers');
        localStorage.removeItem('bausalty_mbti_result');
      } catch {
        // Ignore write error
      }
    }
  };

  const handleCalculateResult = () => {
    if (answeredCount < totalQuestions) {
      const missingCount = totalQuestions - answeredCount;
      if (
        !confirm(
          isArabic
            ? `لديك ${missingCount} أسئلة غير مجاب عليها. هل ترغب بمتابعة حساب النمط؟`
            : `You have ${missingCount} unanswered items. Proceed?`
        )
      ) {
        return;
      }
    }

    // Tally traits
    const counts: Record<MbtiTrait, number> = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    };

    Object.values(answers).forEach((trait) => {
      counts[trait] = (counts[trait] || 0) + 1;
    });

    const E_total = counts.E + counts.I || 1;
    const S_total = counts.S + counts.N || 1;
    const T_total = counts.T + counts.F || 1;
    const J_total = counts.J + counts.P || 1;

    const ePct = Math.round((counts.E / E_total) * 100);
    const iPct = 100 - ePct;

    const sPct = Math.round((counts.S / S_total) * 100);
    const nPct = 100 - sPct;

    const tPct = Math.round((counts.T / T_total) * 100);
    const fPct = 100 - tPct;

    const jPct = Math.round((counts.J / J_total) * 100);
    const pPct = 100 - jPct;

    const code = `${counts.E >= counts.I ? 'E' : 'I'}${counts.S >= counts.N ? 'S' : 'N'}${
      counts.T >= counts.F ? 'T' : 'F'
    }${counts.J >= counts.P ? 'J' : 'P'}`;

    const archetype = ARCHETYPES[code] || ARCHETYPES['INTJ'];

    const resultData: MbtiResultData = {
      code,
      archetype,
      percentages: {
        EI: { E: ePct, I: iPct },
        SN: { S: sPct, N: nPct },
        TF: { T: tPct, F: fPct },
        JP: { J: jPct, P: pPct },
      },
      completedAt: new Date().toISOString(),
    };

    setResult(resultData);

    try {
      localStorage.setItem('bausalty_mbti_result', JSON.stringify(resultData));

      // Trigger automatic welcome/results email in background
      const savedSession = localStorage.getItem('bausalty_user_session');
      if (savedSession) {
        const user = JSON.parse(savedSession);
        fetch('/api/email/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            testType: '16PERSONALITIES',
            personalityResult: resultData,
          }),
        }).catch(() => {});
      }
    } catch {
      // Ignore write error
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadPdf = async () => {
    if (!result) return;
    setIsDownloadingPdf(true);

    try {
      const res = await fetch('/api/pdf/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Student',
          testType: '16PERSONALITIES',
          personalityResult: result,
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Bausalty-Personality-Report-${result.code}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        alert(isArabic ? 'حدث خطأ أثناء تحميل التقرير' : 'Error downloading PDF report');
      }
    } catch (err) {
      console.error('PDF error:', err);
      alert(isArabic ? 'فشل تحميل التقرير' : 'Failed to download report');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleShare = async () => {
    if (!result) return;
    const shareData = {
      title: isArabic ? `نمط شخصيتي (${result.code}) | بوصلتي` : `My Personality Profile (${result.code}) | Bausalty`,
      text: isArabic
        ? `اكتشفت نمط شخصيتي (${result.code} - ${result.archetype.titleAr}) عبر منصة بوصلتي! جرب الاختبار واكتشف تخصصك الأنسب:`
        : `I discovered my 16Personalities archetype (${result.code} - ${result.archetype.titleEn}) on Bausalty!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert(isArabic ? 'تم نسخ رابط النتيجة إلى الحافظة بنجاح!' : 'Link copied to clipboard!');
      } catch {}
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex-1 bg-paper flex items-center justify-center p-12">
        <div className="text-center space-y-4">
          <Brain className="w-10 h-10 text-teal mx-auto animate-bounce" />
          <p className="text-ink font-bold font-display">{isArabic ? 'جاري تحميل الاختبار...' : 'Loading Assessment...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-paper min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Title Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-yellow text-ink border-2 border-ink px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold shadow-notebook-xs">
            <Sparkles className="w-4 h-4 text-purple" />
            <span>{isArabic ? 'اختبار الشخصية الشامل (٧٠ سؤالاً)' : 'Full Free Personality Assessment (70 Items)'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-black text-ink">
            {isArabic ? 'اختبار الأنماط الستة عشر للشخصية' : 'Discover Your 16Personalities Archetype'}
          </h1>
          <p className="text-xs sm:text-sm text-ink-soft font-prose max-w-2xl mx-auto leading-relaxed">
            {isArabic
              ? 'أجب على الأسئلة لاكتشاف نمط شخصيتك القياسي، وتحليل نقاط القوة والضعف، وأبرز الشخصيات والمشاهير المشابهين، ومواءمة التخصصات السعودية.'
              : 'Discover your standardized 4-letter Myers-Briggs archetype with in-depth strengths, blindspots, famous figures, and aligned Saudi university majors.'}
          </p>
        </div>

        {/* --- RESULTS DISPLAY SCREEN --- */}
        {result ? (
          (() => {
            const activeArchetype = ARCHETYPES[result.code] || result.archetype;
            const famousList = activeArchetype.famousFigures || [
              { nameAr: 'ستيف جوبز', nameEn: 'Steve Jobs', roleAr: 'مبتكر ورائد أعمال', roleEn: 'Tech Pioneer' },
              { nameAr: 'وارن بافيت', nameEn: 'Warren Buffett', roleAr: 'مستثمر عالمي', roleEn: 'Global Investor' },
              { nameAr: 'هنري فورد', nameEn: 'Henry Ford', roleAr: 'رائد الصناعة الحديثة', roleEn: 'Industrialist' },
            ];

            return (
              <div className="space-y-8">
                
                {/* Result Header Badge */}
                <div className="bg-yellow rounded-3xl p-6 sm:p-10 border-2 border-ink shadow-notebook-md text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-teal text-white border-2 border-ink flex items-center justify-center mx-auto shadow-notebook-xs">
                    <Brain className="w-8 h-8 text-yellow" />
                  </div>

                  <span className="inline-block text-xs font-black uppercase bg-white border border-ink px-3.5 py-1 rounded-full shadow-2xs">
                    {isArabic ? activeArchetype.groupAr : activeArchetype.groupEn}
                  </span>

                  <h2 className="text-4xl sm:text-5xl font-display font-black text-ink tracking-widest">
                    {result.code}
                  </h2>

                  <h3 className="text-2xl sm:text-3xl font-display font-black text-teal">
                    {isArabic ? activeArchetype.titleAr : activeArchetype.titleEn}
                  </h3>

                  <p className="text-ink-soft text-sm sm:text-base font-prose max-w-2xl mx-auto leading-relaxed">
                    {isArabic ? activeArchetype.descriptionAr : activeArchetype.descriptionEn}
                  </p>

                  {/* Action Buttons: PDF Download + Share + Retake */}
                  <div className="pt-3 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={handleDownloadPdf}
                      disabled={isDownloadingPdf}
                      className="h-12 px-6 bg-teal hover:bg-teal-deep text-white border-2 border-ink rounded-xl font-display font-black text-sm shadow-notebook-xs inline-flex items-center gap-2 hover:scale-102 transition-all"
                    >
                      <Download className="w-4 h-4 text-yellow" />
                      <span>{isDownloadingPdf ? (isArabic ? 'جاري التحميل...' : 'Downloading...') : (isArabic ? 'تحميل التقرير (PDF)' : 'Download PDF Report')}</span>
                    </button>

                    <button
                      onClick={handleShare}
                      className="h-12 px-5 bg-white hover:bg-[#faf6ea] text-ink border-2 border-ink rounded-xl font-bold text-sm shadow-notebook-xs inline-flex items-center gap-2 hover:scale-102 transition-all"
                    >
                      <Share2 className="w-4 h-4 text-purple" />
                      <span>{isArabic ? 'مشاركة النتيجة' : 'Share Result'}</span>
                    </button>

                    <button
                      onClick={handleReset}
                      className="h-12 px-5 bg-white hover:bg-[#faf6ea] text-ink border-2 border-ink rounded-xl font-bold text-sm shadow-notebook-xs inline-flex items-center gap-2 transition-all"
                    >
                      <RotateCcw className="w-4 h-4 text-teal" />
                      <span>{isArabic ? 'إعادة الاختبار' : 'Retake Test'}</span>
                    </button>
                  </div>
                </div>

                {/* Detailed Personality Bio / Overview Card */}
                <div className="bg-white rounded-notebook p-6 sm:p-8 border-2 border-ink shadow-notebook-md space-y-3">
                  <div className="flex items-center gap-2.5 border-b-2 border-ink/10 pb-3">
                    <Brain className="w-6 h-6 text-teal" />
                    <h3 className="text-xl font-display font-black text-ink">
                      {isArabic ? `نبذة تفصيلية عن شخصية (${result.code} - ${activeArchetype.titleAr})` : `Detailed Profile: (${result.code} - ${activeArchetype.titleEn})`}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base font-prose text-ink-soft leading-relaxed pt-1">
                    {isArabic ? activeArchetype.descriptionAr : activeArchetype.descriptionEn}
                  </p>
                </div>

                {/* Trait Percentages Breakdown Grid with Full Arabic Labels */}
                <div className="bg-white rounded-notebook p-6 sm:p-8 border-2 border-ink shadow-notebook-md space-y-5">
                  <h3 className="text-xl font-display font-black text-ink border-b-2 border-ink/10 pb-3">
                    {isArabic ? 'تحليل الأبعاد الأربعة للشخصية' : '4-Dimension Trait Breakdown'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* E vs I */}
                    <div className="space-y-2 bg-[#faf6ea] p-4 rounded-2xl border-2 border-ink">
                      <div className="flex justify-between text-xs font-black text-ink">
                        <span>{isArabic ? 'الانفتاح الاجتماعي (E)' : 'Extraversion (E)'}: {result.percentages.EI.E}%</span>
                        <span>{isArabic ? 'الانطواء والتركيز (I)' : 'Introversion (I)'}: {result.percentages.EI.I}%</span>
                      </div>
                      <div className="w-full h-3.5 bg-white rounded-full overflow-hidden p-0.5 border border-ink">
                        <div
                          className="h-full bg-teal rounded-full transition-all duration-500"
                          style={{ width: `${result.percentages.EI.E}%` }}
                        />
                      </div>
                    </div>

                    {/* S vs N */}
                    <div className="space-y-2 bg-[#faf6ea] p-4 rounded-2xl border-2 border-ink">
                      <div className="flex justify-between text-xs font-black text-ink">
                        <span>{isArabic ? 'الواقعية والتفاصيل (S)' : 'Sensing (S)'}: {result.percentages.SN.S}%</span>
                        <span>{isArabic ? 'الحدس والرؤية (N)' : 'Intuition (N)'}: {result.percentages.SN.N}%</span>
                      </div>
                      <div className="w-full h-3.5 bg-white rounded-full overflow-hidden p-0.5 border border-ink">
                        <div
                          className="h-full bg-purple rounded-full transition-all duration-500"
                          style={{ width: `${result.percentages.SN.S}%` }}
                        />
                      </div>
                    </div>

                    {/* T vs F */}
                    <div className="space-y-2 bg-[#faf6ea] p-4 rounded-2xl border-2 border-ink">
                      <div className="flex justify-between text-xs font-black text-ink">
                        <span>{isArabic ? 'التفكير والمنطق (T)' : 'Thinking (T)'}: {result.percentages.TF.T}%</span>
                        <span>{isArabic ? 'المشاعر والقيم (F)' : 'Feeling (F)'}: {result.percentages.TF.F}%</span>
                      </div>
                      <div className="w-full h-3.5 bg-white rounded-full overflow-hidden p-0.5 border border-ink">
                        <div
                          className="h-full bg-yellow rounded-full transition-all duration-500"
                          style={{ width: `${result.percentages.TF.T}%` }}
                        />
                      </div>
                    </div>

                    {/* J vs P */}
                    <div className="space-y-2 bg-[#faf6ea] p-4 rounded-2xl border-2 border-ink">
                      <div className="flex justify-between text-xs font-black text-ink">
                        <span>{isArabic ? 'الحزم والتنظيم (J)' : 'Judging (J)'}: {result.percentages.JP.J}%</span>
                        <span>{isArabic ? 'المرونة والاستكشاف (P)' : 'Perceiving (P)'}: {result.percentages.JP.P}%</span>
                      </div>
                      <div className="w-full h-3.5 bg-white rounded-full overflow-hidden p-0.5 border border-ink">
                        <div
                          className="h-full bg-teal rounded-full transition-all duration-500"
                          style={{ width: `${result.percentages.JP.J}%` }}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Strengths & Weaknesses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Strengths */}
                  <div className="bg-white rounded-notebook p-6 border-2 border-ink shadow-notebook-md space-y-4">
                    <h3 className="text-lg font-display font-black text-ink flex items-center gap-2">
                      <Award className="w-5 h-5 text-teal" />
                      <span>{isArabic ? 'أبرز نقاط القوة' : 'Core Strengths'}</span>
                    </h3>
                    <ul className="space-y-2.5 text-sm font-bold text-ink-soft">
                      {(isArabic ? activeArchetype.strengthsAr : activeArchetype.strengthsEn).map((str) => (
                        <li key={str} className="flex items-center gap-2.5 bg-[#faf6ea] p-3 rounded-xl border border-ink/20">
                          <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses & Blindspots */}
                  <div className="bg-white rounded-notebook p-6 border-2 border-ink shadow-notebook-md space-y-4">
                    <h3 className="text-lg font-display font-black text-ink flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      <span>{isArabic ? 'أبرز التحديات ونقاط الضعف' : 'Blindspots & Challenges'}</span>
                    </h3>
                    <ul className="space-y-2.5 text-sm font-bold text-ink-soft">
                      {((isArabic ? activeArchetype.weaknessesAr : activeArchetype.weaknessesEn) || [
                        isArabic ? 'المثالية المفرطة في بعض المواقف' : 'Over-perfectionism in certain scenarios',
                        isArabic ? 'الحاجة لتطوير المرونة مع المتغيرات المفاجئة' : 'Need for flexibility with sudden changes',
                        isArabic ? 'صعوبة التعبير عن المشاعر تحت الضغط' : 'Difficulty expressing emotions under pressure',
                      ]).map((weak) => (
                        <li key={weak} className="flex items-center gap-2.5 bg-[#faf6ea] p-3 rounded-xl border border-ink/20">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                          <span>{weak}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Growth Advice & Learning Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* How to Improve & Growth Advice */}
                  <div className="bg-white rounded-notebook p-6 border-2 border-ink shadow-notebook-md space-y-3">
                    <h3 className="text-lg font-display font-black text-ink flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#0d9488]" />
                      <span>{isArabic ? 'كيف تطور شخصيتك وتتفوق؟' : 'Actionable Growth Strategies'}</span>
                    </h3>
                    <p className="text-sm font-prose text-ink-soft leading-relaxed bg-[#faf6ea] p-4 rounded-2xl border border-ink/20">
                      {(isArabic ? activeArchetype.growthAdviceAr : activeArchetype.growthAdviceEn) ||
                        (isArabic
                          ? 'احرص على الموازنة بين منطقك الصارم ومرونتك الإنسانية، واستثمر في الاستماع الفعال وتقبل وجهات النظر البديلة لتحقيق أقصى نجاح أكاديمي ومهني.'
                          : 'Balance logic with empathy, invest in active listening, and embrace calculated risks for maximum career success.')}
                    </p>
                  </div>

                  {/* Learning Style */}
                  <div className="bg-white rounded-notebook p-6 border-2 border-ink shadow-notebook-md space-y-3">
                    <h3 className="text-lg font-display font-black text-ink flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple" />
                      <span>{isArabic ? 'أسلوب التعلم الأنسب' : 'Optimal Learning Style'}</span>
                    </h3>
                    <p className="text-sm font-prose text-ink-soft leading-relaxed bg-[#faf6ea] p-4 rounded-2xl border border-ink/20">
                      {isArabic ? activeArchetype.learningStyleAr : activeArchetype.learningStyleEn}
                    </p>
                  </div>

                </div>

                {/* Famous Figures & Role Models */}
                <div className="bg-white rounded-notebook p-6 sm:p-8 border-2 border-ink shadow-notebook-md space-y-4">
                  <div className="flex items-center gap-2 border-b-2 border-ink/10 pb-3">
                    <Users className="w-5 h-5 text-purple" />
                    <h3 className="text-xl font-display font-black text-ink">
                      {isArabic ? `أبرز القادة والمشاهير بنمط (${result.code})` : `Famous Figures & Leaders (${result.code})`}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    {famousList.map((fig) => (
                      <div
                        key={fig.nameEn}
                        className="bg-[#faf6ea] p-4 rounded-2xl border-2 border-ink shadow-notebook-xs space-y-1.5 text-center"
                      >
                        <div className="w-10 h-10 rounded-full bg-yellow border-2 border-ink flex items-center justify-center mx-auto text-base font-black text-ink">
                          ⭐
                        </div>
                        <p className="font-display font-bold text-base text-ink pt-1">
                          {isArabic ? fig.nameAr : fig.nameEn}
                        </p>
                        <p className="text-xs font-bold text-muted">
                          {isArabic ? fig.roleAr : fig.roleEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Linked RIASEC College Majors */}
                <div className="bg-teal text-white rounded-3xl p-6 sm:p-8 border-2 border-ink shadow-notebook-lg space-y-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-yellow" />
                    <h3 className="text-xl font-display font-black text-white">
                      {isArabic ? `التخصصات السعودية المرتبطة بنمط (${result.code})` : `Saudi Majors Aligned with (${result.code})`}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-teal-tint font-prose">
                    {isArabic
                      ? 'يتطابق نمط شخصيتك مع التخصصات الأكاديمية التالية ذات الأكواد الهولندية المتقاطعة ضمن رؤية المملكة ٢٠٣٠:'
                      : 'Your 16Personalities archetype correlates strongly with these high-priority Saudi university majors:'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {(isArabic ? activeArchetype.linkedMajorsAr : activeArchetype.linkedMajorsEn).map((m, idx) => (
                      <div key={m} className="bg-white text-ink p-3.5 rounded-2xl border-2 border-ink shadow-notebook-xs flex items-center justify-between">
                        <div>
                          <p className="font-extrabold text-sm text-ink">{m}</p>
                          <p className="text-[11px] font-bold text-muted">Holland: {activeArchetype.linkedRiasecCodes[idx] || 'IRC'}</p>
                        </div>
                        <Link href="/majors" className="text-teal hover:underline text-xs font-bold shrink-0">
                          Explorer →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })()
        ) : (
          /* --- QUIZ QUESTION ENGINE --- */
          <div className="space-y-6">
            
            {/* Sticky Progress Bar */}
            <div className="bg-paper-card p-4 rounded-2xl border-2 border-ink shadow-notebook-xs space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-ink">
                <span>{isArabic ? `السؤال ${currentIndex + 1} من ${totalQuestions}` : `Question ${currentIndex + 1} of ${totalQuestions}`}</span>
                <div className="flex items-center gap-3">
                  <span className="text-ink-soft font-semibold">{progressPercent}%</span>
                  <button
                    onClick={handleReset}
                    className="text-xs text-muted hover:text-ink font-bold flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{isArabic ? 'إعادة ضبط' : 'Reset'}</span>
                  </button>
                </div>
              </div>

              <div className="w-full h-3 bg-paper-inset rounded-full overflow-hidden p-0.5 border border-ink">
                <motion.div
                  className="h-full bg-teal rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>

            {/* Question Card Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="notebook-paper-lined rounded-notebook p-6 sm:p-10 border-2 border-ink shadow-notebook-md space-y-8"
              >
                {/* Question Header */}
                <div className="flex items-center justify-between border-b-2 border-ink/10 pb-4">
                  <span className="text-xs font-black uppercase bg-yellow border border-ink px-3 py-1 rounded-full shadow-2xs inline-block">
                    {isArabic ? `السؤال ${currentIndex + 1}` : `Scenario ${currentIndex + 1}`}
                  </span>
                  <span className="text-xs font-bold text-muted">
                    {isArabic ? 'اختر الخيار الأقرب لطبيعتك العفوية' : 'Pick the closest match to your natural style'}
                  </span>
                </div>

                {/* Scenario Statement */}
                <h2 className="text-xl sm:text-2xl font-prose font-bold text-ink leading-relaxed">
                  {isArabic ? currentQuestion.textAr : currentQuestion.textEn}
                </h2>

                {/* Options (A or B) */}
                <div className="space-y-4">
                  {[
                    { key: 'A', option: currentQuestion.optionA },
                    { key: 'B', option: currentQuestion.optionB },
                  ].map(({ key, option }) => {
                    const isSelected = answers[currentQuestion.id] === option.trait;

                    return (
                      <motion.button
                        key={key}
                        whileHover={{ scale: 1.01, translateY: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectOption(option.trait)}
                        className={`w-full min-h-[56px] p-4 sm:p-5 rounded-2xl border-2 text-left flex items-center justify-between transition-all duration-150 ${
                          isSelected
                            ? 'bg-teal-tint border-ink shadow-notebook-xs ring-2 ring-teal'
                            : 'bg-paper-card border-ink/20 hover:border-ink hover:bg-paper-inset'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-8 h-8 rounded-lg ${key === 'A' ? 'bg-teal' : 'bg-purple'} text-white border-2 border-ink flex items-center justify-center font-display font-black text-sm shrink-0`}>
                            {key}
                          </div>
                          <p className="font-bold text-sm sm:text-base text-ink">
                            {isArabic ? option.labelAr : option.labelEn}
                          </p>
                        </div>

                        {isSelected ? (
                          <CheckCircle2 className="w-6 h-6 text-teal fill-yellow shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-ink/30 shrink-0" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`h-12 min-h-[48px] inline-flex items-center gap-2 px-5 rounded-xl font-bold text-sm border-2 transition-all ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed text-muted border-ink/20 bg-paper-inset'
                    : 'text-ink bg-paper-card border-ink hover:bg-paper-inset shadow-notebook-xs'
                }`}
              >
                <ArrowLeft className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
                <span>{isArabic ? 'السابق' : 'Previous'}</span>
              </button>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  onClick={handleNext}
                  className="h-12 min-h-[48px] inline-flex items-center gap-2 bg-teal hover:bg-teal-deep text-white px-6 rounded-xl font-extrabold text-sm border-2 border-ink shadow-notebook-xs transition-all hover:scale-102 active:scale-98"
                >
                  <span>{isArabic ? 'التالي' : 'Next'}</span>
                  <ArrowRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <button
                  onClick={handleCalculateResult}
                  className="h-12 min-h-[48px] inline-flex items-center gap-2 bg-yellow hover:bg-amber-300 text-ink px-7 rounded-xl font-display font-black text-base border-2 border-ink shadow-notebook-md hover:scale-102 active:scale-98 transition-all"
                >
                  <Sparkles className="w-5 h-5 text-teal" />
                  <span>{isArabic ? 'عرض تحليل الشخصية الكامل' : 'Calculate & View Archetype'}</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
