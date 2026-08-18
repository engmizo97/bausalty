'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Award,
  CheckCircle2,
  BookOpen,
  Brain,
  GraduationCap,
  HelpCircle,
  Zap,
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

  // Lazy auth state initialization
  const [isAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return !!localStorage.getItem('bausalty_user_session');
      } catch {
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?callbackUrl=/personality-test');
    }
  }, [isAuthenticated, router]);

  // UNSELECTED BY DEFAULT: answers initializes as empty object {}
  const [answers, setAnswers] = useState<Record<number, MbtiTrait>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bausalty_mbti_answers');
        if (saved) return JSON.parse(saved);
      } catch {
        // Ignore read error
      }
    }
    return {};
  });

  const [result, setResult] = useState<MbtiResultData | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedResult = localStorage.getItem('bausalty_mbti_result');
        if (savedResult) return JSON.parse(savedResult);
      } catch {
        // Ignore read error
      }
    }
    return null;
  });

  const totalQuestions = MBTI_QUESTIONS.length; // 70 Questions
  const currentQuestion = MBTI_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const answeredCount = Object.keys(answers).length;

  const calculateMbtiResult = (allAnswers: Record<number, MbtiTrait>): MbtiResultData => {
    const counts: Record<MbtiTrait, number> = {
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    };

    MBTI_QUESTIONS.forEach((q) => {
      const trait = allAnswers[q.id];
      if (trait && trait in counts) {
        counts[trait] += 1;
      }
    });

    const letterEI = counts.E > counts.I ? 'E' : 'I';
    const letterSN = counts.S > counts.N ? 'S' : 'N';
    const letterTF = counts.T > counts.F ? 'T' : 'F';
    const letterJP = counts.J > counts.P ? 'J' : 'P';

    const code = `${letterEI}${letterSN}${letterTF}${letterJP}`;

    const totalEI = counts.E + counts.I || 17;
    const totalSN = counts.S + counts.N || 18;
    const totalTF = counts.T + counts.F || 17;
    const totalJP = counts.J + counts.P || 18;

    const percentages = {
      EI: {
        E: Math.round((counts.E / totalEI) * 100),
        I: Math.round((counts.I / totalEI) * 100),
      },
      SN: {
        S: Math.round((counts.S / totalSN) * 100),
        N: Math.round((counts.N / totalSN) * 100),
      },
      TF: {
        T: Math.round((counts.T / totalTF) * 100),
        F: Math.round((counts.F / totalTF) * 100),
      },
      JP: {
        J: Math.round((counts.J / totalJP) * 100),
        P: Math.round((counts.P / totalJP) * 100),
      },
    };

    const archetype = ARCHETYPES[code] || ARCHETYPES['INTJ'];

    return {
      code,
      archetype,
      percentages,
      completedAt: new Date().toISOString(),
    };
  };

  const handleSelectOption = (trait: MbtiTrait) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: trait,
    };
    setAnswers(updatedAnswers);

    try {
      localStorage.setItem('bausalty_mbti_answers', JSON.stringify(updatedAnswers));
    } catch {
      // Ignore write error
    }

    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
      }, 200);
    } else {
      // Completed all 70 questions -> compute final MBTI profile
      setTimeout(() => {
        const computed = calculateMbtiResult(updatedAnswers);
        setResult(computed);
        try {
          localStorage.setItem('bausalty_mbti_result', JSON.stringify(computed));
          localStorage.setItem('bausalty_personality_result', JSON.stringify(computed));

          // Trigger SendGrid Automatic PDF Report Delivery
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
                personalityResult: computed,
              }),
            }).catch(() => {});
          }
        } catch {
          // Ignore
        }
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    if (confirm(isArabic ? 'هل تريد إعادة ضبط إجابات اختبار الشخصية؟' : 'Reset personality test answers?')) {
      setAnswers({});
      setResult(null);
      setCurrentIndex(0);
      try {
        localStorage.removeItem('bausalty_mbti_answers');
        localStorage.removeItem('bausalty_mbti_result');
      } catch {
        // Ignore
      }
    }
  };

  const handleForceFinish = () => {
    if (answeredCount < 12) {
      alert(isArabic ? 'يرجى الإجابة على 12 سؤالاً على الأقل للحصول على نمط دقيق.' : 'Please answer at least 12 questions for an accurate archetype calculation.');
      return;
    }
    const computed = calculateMbtiResult(answers);
    setResult(computed);
    try {
      localStorage.setItem('bausalty_mbti_result', JSON.stringify(computed));

      // Trigger SendGrid Automatic PDF Report Delivery
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
            personalityResult: computed,
          }),
        }).catch(() => {});
      }
    } catch {
      // Ignore
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-1 bg-paper flex items-center justify-center p-12">
        <div className="text-center space-y-4">
          <Lock className="w-10 h-10 text-teal mx-auto animate-bounce" />
          <p className="text-ink font-bold font-display">{isArabic ? 'جاري التحقق من تسجيل الدخول...' : 'Checking Student Authentication...'}</p>
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
            <span>{isArabic ? 'اختبار الشخصية المجاني الشامل (70 سؤالاً MBTI)' : 'Full Free 16Personalities Assessment (70 Items)'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-black text-ink">
            {isArabic ? 'اختبار نمط الشخصية 16Personalities الكامل' : 'Discover Your 16Personalities Archetype'}
          </h1>
          <p className="text-xs sm:text-sm text-ink-soft font-prose max-w-2xl mx-auto">
            {isArabic
              ? 'أجب على الأسئلة لاكتشاف نمط شخصيتك الخماسي (مثل INTJ العقل المدبر أو ENFP المناضل)، وكيف ترتبط أبعاد شخصيتك بالتخصصات الجامعية السعودية.'
              : 'Answer standardized scenario items to calculate your 4-letter Myers-Briggs archetype (e.g. INTJ Architect, ENFP Campaigner) and link your traits to Saudi university majors.'}
          </p>
        </div>

        {/* --- RESULTS DISPLAY SCREEN --- */}
        {result ? (
          <div className="space-y-8">
            
            {/* Result Header Badge */}
            <div className="bg-yellow rounded-3xl p-6 sm:p-10 border-2 border-ink shadow-notebook-md text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-teal text-white border-2 border-ink flex items-center justify-center mx-auto shadow-notebook-xs">
                <Brain className="w-8 h-8 text-yellow" />
              </div>

              <span className="inline-block text-xs font-black uppercase bg-paper-card border border-ink px-3 py-1 rounded-full">
                {isArabic ? result.archetype.groupAr : result.archetype.groupEn}
              </span>

              <h2 className="text-4xl sm:text-5xl font-display font-black text-ink tracking-widest">
                {result.code}
              </h2>

              <h3 className="text-2xl sm:text-3xl font-display font-black text-teal">
                {isArabic ? result.archetype.titleAr : result.archetype.titleEn}
              </h3>

              <p className="text-ink-soft text-sm sm:text-base font-prose max-w-2xl mx-auto leading-relaxed">
                {isArabic ? result.archetype.descriptionAr : result.archetype.descriptionEn}
              </p>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="h-11 px-5 bg-paper hover:bg-paper-inset text-ink border-2 border-ink rounded-xl font-bold text-xs shadow-notebook-xs inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 text-teal" />
                  <span>{isArabic ? 'إعادة الاختبار' : 'Retake Test'}</span>
                </button>

                <Link
                  href="/assessment/quiz"
                  className="h-11 px-5 bg-teal hover:bg-teal-deep text-white border-2 border-ink rounded-xl font-bold text-xs shadow-notebook-xs inline-flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-yellow" />
                  <span>{isArabic ? 'إجراء اختبار هولاند (42 سؤالاً)' : 'Take Full RIASEC Test'}</span>
                </Link>
              </div>
            </div>

            {/* Trait Percentages Breakdown Grid */}
            <div className="bg-paper-card rounded-notebook p-6 sm:p-8 border-2 border-ink shadow-notebook-md space-y-5">
              <h3 className="text-xl font-display font-black text-ink border-b-2 border-ink/10 pb-3">
                {isArabic ? 'تحليل الأبعاد الأربعة للشخصية' : '4-Dimension Trait Breakdown'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* E vs I */}
                <div className="space-y-1.5 bg-paper p-4 rounded-2xl border-2 border-ink">
                  <div className="flex justify-between text-xs font-bold text-ink">
                    <span>Extraversion (E): {result.percentages.EI.E}%</span>
                    <span>Introversion (I): {result.percentages.EI.I}%</span>
                  </div>
                  <div className="w-full h-3 bg-paper-inset rounded-full overflow-hidden p-0.5 border border-ink">
                    <div
                      className="h-full bg-teal rounded-full"
                      style={{ width: `${result.percentages.EI.E}%` }}
                    />
                  </div>
                </div>

                {/* S vs N */}
                <div className="space-y-1.5 bg-paper p-4 rounded-2xl border-2 border-ink">
                  <div className="flex justify-between text-xs font-bold text-ink">
                    <span>Sensing (S): {result.percentages.SN.S}%</span>
                    <span>Intuition (N): {result.percentages.SN.N}%</span>
                  </div>
                  <div className="w-full h-3 bg-paper-inset rounded-full overflow-hidden p-0.5 border border-ink">
                    <div
                      className="h-full bg-purple rounded-full"
                      style={{ width: `${result.percentages.SN.S}%` }}
                    />
                  </div>
                </div>

                {/* T vs F */}
                <div className="space-y-1.5 bg-paper p-4 rounded-2xl border-2 border-ink">
                  <div className="flex justify-between text-xs font-bold text-ink">
                    <span>Thinking (T): {result.percentages.TF.T}%</span>
                    <span>Feeling (F): {result.percentages.TF.F}%</span>
                  </div>
                  <div className="w-full h-3 bg-paper-inset rounded-full overflow-hidden p-0.5 border border-ink">
                    <div
                      className="h-full bg-yellow rounded-full"
                      style={{ width: `${result.percentages.TF.T}%` }}
                    />
                  </div>
                </div>

                {/* J vs P */}
                <div className="space-y-1.5 bg-paper p-4 rounded-2xl border-2 border-ink">
                  <div className="flex justify-between text-xs font-bold text-ink">
                    <span>Judging (J): {result.percentages.JP.J}%</span>
                    <span>Perceiving (P): {result.percentages.JP.P}%</span>
                  </div>
                  <div className="w-full h-3 bg-paper-inset rounded-full overflow-hidden p-0.5 border border-ink">
                    <div
                      className="h-full bg-teal rounded-full"
                      style={{ width: `${result.percentages.JP.J}%` }}
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Strengths & Learning Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Strengths */}
              <div className="bg-paper-card rounded-notebook p-6 border-2 border-ink shadow-notebook-md space-y-4">
                <h3 className="text-lg font-display font-black text-ink flex items-center gap-2">
                  <Award className="w-5 h-5 text-teal" />
                  <span>{isArabic ? 'أبرز نقاط القوة' : 'Core Strengths'}</span>
                </h3>
                <ul className="space-y-2 text-sm font-bold text-ink-soft">
                  {(isArabic ? result.archetype.strengthsAr : result.archetype.strengthsEn).map((str) => (
                    <li key={str} className="flex items-center gap-2 bg-paper p-2.5 rounded-xl border border-ink/20">
                      <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning Style */}
              <div className="bg-paper-card rounded-notebook p-6 border-2 border-ink shadow-notebook-md space-y-4">
                <h3 className="text-lg font-display font-black text-ink flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple" />
                  <span>{isArabic ? 'أسلوب التعلم الأنسب' : 'Optimal Learning Style'}</span>
                </h3>
                <p className="text-sm font-prose text-ink-soft leading-relaxed bg-paper p-4 rounded-2xl border border-ink/20">
                  {isArabic ? result.archetype.learningStyleAr : result.archetype.learningStyleEn}
                </p>
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
                  ? 'يتطابق نمط شخصيتك مع التخصصات الأكاديمية التالية ذات الأكواد الهولندية المتقاطعة:'
                  : 'Your 16Personalities archetype correlates strongly with these high-priority Saudi university majors:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(isArabic ? result.archetype.linkedMajorsAr : result.archetype.linkedMajorsEn).map((m, idx) => (
                  <div key={m} className="bg-paper-card text-ink p-3.5 rounded-2xl border-2 border-ink shadow-notebook-xs flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-sm text-ink">{m}</p>
                      <p className="text-[11px] font-bold text-muted">Holland: {result.archetype.linkedRiasecCodes[idx] || 'IRC'}</p>
                    </div>
                    <Link href="/majors" className="text-teal hover:underline text-xs font-bold shrink-0">
                      Explorer →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* --- QUIZ QUESTION ENGINE --- */
          <div className="space-y-6">
            
            {/* Sticky Progress Bar */}
            <div className="bg-paper-card p-4 rounded-2xl border-2 border-ink shadow-notebook-xs space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-ink">
                <span>{isArabic ? `السؤال ${currentIndex + 1} من ${totalQuestions}` : `Question ${currentIndex + 1} of ${totalQuestions}`}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black bg-yellow border border-ink px-2.5 py-0.5 rounded-full">
                    {answeredCount} / {totalQuestions} {isArabic ? 'مجاب' : 'Answered'}
                  </span>
                  <span className="text-teal font-extrabold">{progressPercent}%</span>
                </div>
              </div>
              <div className="w-full h-3 bg-paper-inset rounded-full overflow-hidden p-0.5 border border-ink">
                <motion.div
                  className="h-full bg-teal rounded-full"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-[#fffdf6] rounded-notebook p-6 sm:p-10 border-2 border-ink shadow-notebook-md space-y-8"
              >
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase bg-yellow border border-ink px-3 py-1 rounded-full shadow-2xs inline-block">
                    Item #{currentIndex + 1} ({currentQuestion.dimension})
                  </span>

                  <h2 className={`font-display font-bold text-ink leading-snug ${isArabic ? 'text-xl sm:text-2xl font-prose text-right' : 'text-xl sm:text-2xl text-left'}`}>
                    {isArabic ? currentQuestion.textAr : currentQuestion.textEn}
                  </h2>
                </div>

                {/* Option A vs Option B Selection Cards — Unselected By Default */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold text-ink-soft uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-teal" />
                    <span>{isArabic ? 'اختر الخيار الذي يمثلك بشكل أفضل:' : 'Choose the option that best describes you:'}</span>
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Option A */}
                    <motion.button
                      whileHover={{ scale: 1.01, translateY: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectOption(currentQuestion.optionA.trait)}
                      className={`p-5 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                        answers[currentQuestion.id] === currentQuestion.optionA.trait
                          ? 'bg-teal-tint border-ink shadow-notebook-xs ring-2 ring-teal'
                          : 'bg-paper-card border-ink/20 hover:border-ink hover:bg-paper-inset'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-teal text-white border-2 border-ink flex items-center justify-center font-display font-black text-sm shrink-0">
                          A
                        </div>
                        <div>
                          <p className="font-bold text-sm sm:text-base text-ink">
                            {isArabic ? currentQuestion.optionA.labelAr : currentQuestion.optionA.labelEn}
                          </p>
                        </div>
                      </div>

                      {answers[currentQuestion.id] === currentQuestion.optionA.trait && (
                        <CheckCircle2 className="w-6 h-6 text-teal fill-yellow shrink-0 ml-2" />
                      )}
                    </motion.button>

                    {/* Option B */}
                    <motion.button
                      whileHover={{ scale: 1.01, translateY: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectOption(currentQuestion.optionB.trait)}
                      className={`p-5 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                        answers[currentQuestion.id] === currentQuestion.optionB.trait
                          ? 'bg-teal-tint border-ink shadow-notebook-xs ring-2 ring-teal'
                          : 'bg-paper-card border-ink/20 hover:border-ink hover:bg-paper-inset'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple text-white border-2 border-ink flex items-center justify-center font-display font-black text-sm shrink-0">
                          B
                        </div>
                        <div>
                          <p className="font-bold text-sm sm:text-base text-ink">
                            {isArabic ? currentQuestion.optionB.labelAr : currentQuestion.optionB.labelEn}
                          </p>
                        </div>
                      </div>

                      {answers[currentQuestion.id] === currentQuestion.optionB.trait && (
                        <CheckCircle2 className="w-6 h-6 text-teal fill-yellow shrink-0 ml-2" />
                      )}
                    </motion.button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`h-12 px-5 rounded-xl font-bold text-sm border-2 transition-all inline-flex items-center gap-2 ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed text-muted border-ink/20 bg-paper-inset'
                    : 'text-ink bg-paper-card border-ink hover:bg-paper-inset shadow-notebook-xs'
                }`}
              >
                <ArrowLeft className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
                <span>{isArabic ? 'السابق' : 'Previous'}</span>
              </button>

              {answeredCount === totalQuestions && (
                <button
                  onClick={handleForceFinish}
                  className="h-12 px-5 rounded-xl bg-yellow text-ink border-2 border-ink font-display font-black text-xs shadow-notebook-xs flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4 text-purple" />
                  <span>{isArabic ? 'إنهاء وحساب النتيجة' : 'Finish & View Result'}</span>
                </button>
              )}

              <button
                onClick={handleReset}
                className="text-xs font-bold text-muted hover:text-rose-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isArabic ? 'إعادة ضبط' : 'Reset'}</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
