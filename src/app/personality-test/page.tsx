'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';
import { PERSONALITY_QUESTIONS } from '@/data/personalityQuestions';
import { calculatePersonalityType } from '@/lib/personalityScoring';
import { PersonalityResult, PersonalityTrait } from '@/types/personality';
import { useLanguage } from '@/context/LanguageContext';

export default function PersonalityTestPage() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, PersonalityTrait>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bausalty_personality_quiz_answers');
        if (saved) return JSON.parse(saved);
      } catch {
        // Ignore read error
      }
    }
    return {};
  });

  const [result, setResult] = useState<PersonalityResult | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedResult = localStorage.getItem('bausalty_personality_result');
        if (savedResult) return JSON.parse(savedResult);
      } catch {
        // Ignore read error
      }
    }
    return null;
  });

  const totalQuestions = PERSONALITY_QUESTIONS.length;
  const currentQuestion = PERSONALITY_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (trait: PersonalityTrait) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: trait,
    };
    setAnswers(updatedAnswers);

    try {
      localStorage.setItem('bausalty_personality_quiz_answers', JSON.stringify(updatedAnswers));
    } catch {
      // Ignore write error
    }

    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
      }, 250);
    } else {
      // Completed last question -> calculate results
      setTimeout(() => {
        const calculated = calculatePersonalityType(updatedAnswers, PERSONALITY_QUESTIONS);
        setResult(calculated);
        try {
          localStorage.setItem('bausalty_personality_result', JSON.stringify(calculated));
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
        localStorage.removeItem('bausalty_personality_quiz_answers');
        localStorage.removeItem('bausalty_personality_result');
      } catch {
        // Ignore
      }
    }
  };

  return (
    <div className="flex-1 bg-paper min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Title Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-yellow text-ink border-2 border-ink px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold shadow-notebook-xs">
            <Sparkles className="w-4 h-4 text-purple" />
            <span>{isArabic ? 'اختبار الشخصية المجاني (16Personalities)' : 'Free 16Personalities Assessment (100% Free)'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-black text-ink">
            {isArabic ? 'اختبار نمط الشخصية 16Personalities' : 'Discover Your 16Personalities Archetype'}
          </h1>
          <p className="text-xs sm:text-sm text-ink-soft font-prose max-w-2xl mx-auto">
            {isArabic
              ? 'أجب على 12 سؤالاً لاكتشاف نمط شخصيتك الخماسي (مثل INTJ العقل المدبر أو ENFP المناضل)، وكيف ترتبط أبعاد شخصيتك بالتخصصات الجامعية السعودية.'
              : 'Answer 12 quick scenario items to calculate your 4-letter Myers-Briggs archetype (e.g. INTJ Architect, ENFP Campaigner) and link your traits to Saudi university majors.'}
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
                  href="/assessment"
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
                <span className="text-teal font-extrabold">{progressPercent}%</span>
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

                  <h2 className="text-xl sm:text-2xl font-display font-bold text-ink leading-snug">
                    {isArabic ? currentQuestion.textAr : currentQuestion.textEn}
                  </h2>
                  <p className="text-xs text-muted font-bold">
                    {isArabic ? currentQuestion.textEn : currentQuestion.textAr}
                  </p>
                </div>

                {/* Option A vs Option B Selection Cards */}
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
                          <p className="text-xs text-muted font-bold mt-0.5">
                            {isArabic ? currentQuestion.optionA.labelEn : currentQuestion.optionA.labelAr}
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
                          <p className="text-xs text-muted font-bold mt-0.5">
                            {isArabic ? currentQuestion.optionB.labelEn : currentQuestion.optionB.labelAr}
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
