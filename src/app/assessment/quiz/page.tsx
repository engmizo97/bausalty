'use client';

import React, { useState, useEffect } from 'react';
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
  Lock,
} from 'lucide-react';
import { QUESTIONS, RIASEC_CATEGORIES } from '@/data/questions';
import { calculateScores, generateHollandCode, getMajorRecommendations } from '@/lib/scoring';
import { AssessmentResult, RiasecType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import UpgradeModal from '@/components/UpgradeModal';

const LIKERT_OPTIONS = [
  {
    value: 1,
    labelEn: 'Strongly Disagree',
    labelAr: 'لا أتفق بشدة',
    badge: '1',
  },
  {
    value: 2,
    labelEn: 'Disagree',
    labelAr: 'لا أتفق',
    badge: '2',
  },
  {
    value: 3,
    labelEn: 'Neutral',
    labelAr: 'محايد',
    badge: '3',
  },
  {
    value: 4,
    labelEn: 'Agree',
    labelAr: 'أتفق',
    badge: '4',
  },
  {
    value: 5,
    labelEn: 'Strongly Agree',
    labelAr: 'أتفق بشدة',
    badge: '5',
  },
];

export default function RiasecQuizPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);

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
      router.push('/login?callbackUrl=/assessment/quiz');
    }
  }, [isAuthenticated, router]);

  // UNSELECTED QUIZ INPUTS: Default to empty object {} so no answers are preselected
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

  const [isPaid] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        if (localStorage.getItem('bausalty_is_paid') === 'true') return true;
        const savedSession = localStorage.getItem('bausalty_user_session');
        if (savedSession && JSON.parse(savedSession).plan === 'PAID') return true;
      } catch {
        // Ignore read error
      }
    }
    return false;
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

    // Free Tier Paywall Check: Question 12 max (index 11)
    if (!isPaid && currentIndex === 11) {
      setTimeout(() => {
        setShowUpgradeModal(true);
      }, 200);
      return;
    }

    // Auto advance after 250ms delay for smooth UX if not on last question
    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
      }, 250);
    }
  };

  const handleNext = () => {
    // Free Tier Paywall Check
    if (!isPaid && currentIndex === 11) {
      setShowUpgradeModal(true);
      return;
    }

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
    if (confirm(isArabic ? 'هل تريد إعادة ضبط جميع إجاباتك؟' : 'Are you sure you want to reset your quiz answers?')) {
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
    if (!isPaid && answeredCount < totalQuestions) {
      setShowUpgradeModal(true);
      return;
    }

    if (answeredCount < totalQuestions) {
      const missingCount = totalQuestions - answeredCount;
      if (
        !confirm(
          isArabic
            ? `لديك ${missingCount} أسئلة غير مجاب عليها. هل ترغب بالمتابعة؟`
            : `You have ${missingCount} unanswered questions. Proceed?`
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
            testType: 'RIASEC',
            riasecResult: result,
          }),
        }).catch(() => {});
      }
    } catch {
      // Ignore write error
    }

    router.push('/results');
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
    <div className="flex-1 flex flex-col bg-paper min-h-screen relative">
      
      {/* --- PAYWALL UPGRADE MODAL --- */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        questionsCompleted={12}
      />

      {/* --- STICKY PROGRESS BAR --- */}
      <div className="sticky top-20 z-40 bg-[#fffdf6] border-b-2 border-ink shadow-notebook-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-bold text-ink gap-1 mb-2">
            
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal animate-ping" />
              <span>{isArabic ? `السؤال ${currentIndex + 1} من ${totalQuestions}` : `Question ${currentIndex + 1} of ${totalQuestions}`}</span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-ink font-extrabold bg-teal-soft px-2.5 py-0.5 rounded-full border border-teal text-xs">
                {isArabic ? currentCategory.nameAr : currentCategory.nameEn}
              </span>
              <span className="text-ink-soft font-semibold">{progressPercent}%</span>
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-3 bg-paper-inset rounded-full overflow-hidden p-0.5 border border-ink">
            <motion.div
              className="h-full bg-teal rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* --- MAIN QUESTION CARD CONTAINER --- */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 sm:py-10 flex flex-col justify-center">
        
        {/* Category Header Badge */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-paper-card px-3.5 py-1.5 rounded-xl border-2 border-ink shadow-notebook-xs text-xs font-bold text-ink">
            <Award className="w-4 h-4 text-teal" />
            <span>{isArabic ? `الفئة: ${currentCategory.titleAr}` : `Category: ${currentCategory.titleEn}`}</span>
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-bold text-ink-soft hover:text-rose-600 flex items-center gap-1 transition-colors py-1 px-2.5 rounded-lg border border-transparent hover:border-rose-300"
            title="Reset Quiz"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isArabic ? 'إعادة ضبط' : 'Reset'}</span>
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
            className="bg-[#fffdf6] rounded-notebook p-6 sm:p-10 border-2 border-ink shadow-notebook-md space-y-6 sm:space-y-8"
          >
            {/* Question Text (Single-Language Clean Display) */}
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-ink bg-yellow border border-ink px-3 py-1 rounded-full shadow-notebook-xs inline-block">
                {isArabic ? `الفقرة رقم ${currentIndex + 1}` : `Item #${currentIndex + 1}`}
              </span>

              <h2 className={`font-display font-bold text-[#3a2f21] leading-snug ${isArabic ? 'text-2xl sm:text-3xl font-prose text-right' : 'text-xl sm:text-2xl text-left'}`}>
                {isArabic ? currentQuestion.textAr : currentQuestion.textEn}
              </h2>
            </div>

            {/* CARD-SELECTION LAYOUT — Unselected By Default */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-ink-soft uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-teal" />
                <span>{isArabic ? 'اختر مستوى التوافق الذي يمثلك:' : 'Select how much this statement describes you:'}</span>
              </p>

              <div className="grid grid-cols-1 gap-3">
                {LIKERT_OPTIONS.map((opt) => {
                  // UNSELECTED BY DEFAULT: answers[currentQuestion.id] is undefined until user clicks
                  const isSelected = answers[currentQuestion.id] === opt.value;

                  return (
                    <motion.button
                      key={opt.value}
                      whileHover={{ scale: 1.01, translateY: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectOption(opt.value)}
                      className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-xl border-2 text-left flex items-center justify-between transition-all duration-150 ${
                        isSelected
                          ? 'bg-teal-tint border-ink shadow-notebook-xs text-ink font-extrabold ring-2 ring-teal'
                          : 'bg-paper-card border-ink/20 hover:border-ink hover:bg-paper-inset text-ink-soft'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg border-2 border-ink flex items-center justify-center font-display font-black text-sm transition-colors ${
                            isSelected
                              ? 'bg-teal text-white'
                              : 'bg-paper-inset text-ink'
                          }`}
                        >
                          {opt.badge}
                        </div>

                        <div>
                          <p className="font-bold text-base text-ink">
                            {isArabic ? opt.labelAr : opt.labelEn}
                          </p>
                        </div>
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
            </div>

          </motion.div>
        </AnimatePresence>

        {/* --- NAVIGATION FOOTER BUTTONS with 48px touch targets --- */}
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
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="h-12 min-h-[48px] inline-flex items-center gap-2 bg-yellow hover:bg-amber-300 text-ink px-7 rounded-xl font-display font-black text-base border-2 border-ink shadow-notebook-md hover:scale-102 active:scale-98 transition-all"
            >
              <Sparkles className="w-5 h-5 text-purple" />
              <span>{isSubmitting ? (isArabic ? 'جاري التحليل...' : 'Calculating...') : (isArabic ? 'عرض النتائج' : 'View Results')}</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
