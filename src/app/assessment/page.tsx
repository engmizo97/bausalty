'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  HelpCircle,
  Award,
} from 'lucide-react';
import { QUESTIONS, RIASEC_CATEGORIES } from '@/data/questions';
import { calculateScores, generateHollandCode, getMajorRecommendations } from '@/lib/scoring';
import { AssessmentResult, RiasecType } from '@/types';

const LIKERT_OPTIONS = [
  {
    value: 1,
    labelEn: 'Strongly Disagree',
    labelAr: 'لا أتفق بشدة',
    color: 'hover:border-rose-300 hover:bg-rose-50/50 text-slate-700',
    selectedColor: 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-400',
    badge: '1',
  },
  {
    value: 2,
    labelEn: 'Disagree',
    labelAr: 'لا أتفق',
    color: 'hover:border-amber-300 hover:bg-amber-50/50 text-slate-700',
    selectedColor: 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-400',
    badge: '2',
  },
  {
    value: 3,
    labelEn: 'Neutral',
    labelAr: 'محايد',
    color: 'hover:border-slate-300 hover:bg-slate-100/60 text-slate-700',
    selectedColor: 'border-slate-500 bg-slate-100 text-slate-900 ring-2 ring-slate-400',
    badge: '3',
  },
  {
    value: 4,
    labelEn: 'Agree',
    labelAr: 'أتفق',
    color: 'hover:border-sky-300 hover:bg-sky-50/50 text-slate-700',
    selectedColor: 'border-[#0284C7] bg-sky-50 text-[#0284C7] ring-2 ring-[#0284C7]',
    badge: '4',
  },
  {
    value: 5,
    labelEn: 'Strongly Agree',
    labelAr: 'أتفق بشدة',
    color: 'hover:border-blue-400 hover:bg-blue-50/50 text-slate-700',
    selectedColor: 'border-[#1E3A8A] bg-blue-50 text-[#1E3A8A] ring-2 ring-[#1E3A8A]',
    badge: '5',
  },
];

export default function AssessmentPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Lazy state initialization from localStorage
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedAnswers = localStorage.getItem('bausalty_quiz_answers');
        if (savedAnswers) {
          return JSON.parse(savedAnswers);
        }
      } catch {
        // Ignore read error
      }
    }
    return {};
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];
  const currentCategory = RIASEC_CATEGORIES[currentQuestion.category];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (value: number) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    };
    setAnswers(updatedAnswers);

    try {
      localStorage.setItem('bausalty_quiz_answers', JSON.stringify(updatedAnswers));
    } catch {
      // Ignore write error
    }

    // Auto advance after 250ms delay for smooth UX if not on last question
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
    if (confirm('Are you sure you want to reset your quiz answers? / هل تريد إعادة ديد الاختبار؟')) {
      setAnswers({});
      setCurrentIndex(0);
      try {
        localStorage.removeItem('bausalty_quiz_answers');
      } catch {
        // Ignore write error
      }
    }
  };

  const handleSubmit = () => {
    if (answeredCount < totalQuestions) {
      const missingCount = totalQuestions - answeredCount;
      if (
        !confirm(
          `You have ${missingCount} unanswered questions. Unanswered questions will be rated as neutral. Proceed? \nلديك ${missingCount} أسئلة غير مجاب عليها. هل ترغب بالمتابعة؟`
        )
      ) {
        return;
      }
    }

    setIsSubmitting(true);

    const { rawScores, normalizedScores } = calculateScores(answers, QUESTIONS);
    const topCode = generateHollandCode(normalizedScores);
    const matchingMajors = getMajorRecommendations(normalizedScores);

    const result: AssessmentResult = {
      scores: rawScores,
      normalizedScores,
      topCode,
      primaryType: topCode[0] as RiasecType,
      secondaryType: topCode[1] as RiasecType,
      tertiaryType: topCode[2] as RiasecType,
      matchingMajors,
      completedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('bausalty_assessment_result', JSON.stringify(result));
    } catch {
      // Ignore write error
    }

    router.push('/results');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      
      {/* --- STICKY PROGRESS BAR --- */}
      <div className="sticky top-20 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700 mb-2">
            
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] animate-ping" />
              <span>Question / السؤال {currentIndex + 1} of {totalQuestions}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#1E3A8A] font-extrabold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                {currentCategory.nameEn} ({currentCategory.nameAr})
              </span>
              <span className="text-slate-500 font-semibold">{progressPercent}%</span>
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <motion.div
              className="h-full bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#0284C7] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* --- MAIN QUESTION CARD CONTAINER --- */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 sm:px-6 flex flex-col justify-center">
        
        {/* Category Header Badge */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs text-xs font-bold text-slate-700">
            <Award className="w-4 h-4 text-[#0284C7]" />
            <span>Category: {currentCategory.titleEn} ({currentCategory.titleAr})</span>
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-semibold text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
            title="Reset Quiz / إعادة الضبط"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Animated Question Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg space-y-8"
          >
            {/* Question Text */}
            <div className="space-y-3 text-center sm:text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#0284C7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Item #{currentIndex + 1}
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                {currentQuestion.textEn}
              </h2>

              <p className="text-xl sm:text-2xl font-bold text-[#1E3A8A] font-sans leading-relaxed dir-rtl text-right sm:text-right border-t border-slate-100 pt-3">
                {currentQuestion.textAr}
              </p>
            </div>

            {/* CARD-SELECTION LAYOUT (Replacing Radio Buttons) */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Select how much this statement describes you / اختر مستوى التوافق</span>
              </p>

              <div className="grid grid-cols-1 gap-3">
                {LIKERT_OPTIONS.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.value;

                  return (
                    <motion.button
                      key={opt.value}
                      whileHover={{ scale: 1.01, translateY: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectOption(opt.value)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-150 ${
                        isSelected ? opt.selectedColor : `bg-white border-slate-200 ${opt.color}`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm transition-colors ${
                            isSelected
                              ? 'bg-[#1E3A8A] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {opt.badge}
                        </div>

                        <div>
                          <p className="font-bold text-base text-slate-900">{opt.labelEn}</p>
                          <p className="text-sm font-semibold text-slate-500 font-sans">{opt.labelAr}</p>
                        </div>
                      </div>

                      {isSelected ? (
                        <CheckCircle2 className="w-6 h-6 text-[#1E3A8A] fill-blue-100 shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* --- NAVIGATION FOOTER BUTTONS --- */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100'
                : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 shadow-xs'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous / السابق</span>
          </button>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-102 active:scale-98"
            >
              <span>Next Question / التالي</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#0284C7] text-white px-7 py-3.5 rounded-xl font-black text-base shadow-xl hover:brightness-110 active:scale-98 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isSubmitting ? 'Calculating...' : 'View Results / عرض النتائج'}</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
