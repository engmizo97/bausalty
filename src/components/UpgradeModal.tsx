'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Lock,
  Crown,
  CheckCircle2,
  X,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onViewFreeResults?: () => void;
  questionsCompleted?: number;
}

export default function UpgradeModal({
  isOpen,
  onClose,
  onViewFreeResults,
  questionsCompleted = 21,
}: UpgradeModalProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-paper-card rounded-3xl border-2 border-ink shadow-notebook-lg max-w-lg w-full p-6 sm:p-8 relative space-y-5 overflow-hidden"
        >
          {/* Close Button if dismissible */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-xl border-2 border-ink bg-paper flex items-center justify-center text-ink hover:bg-paper-inset transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Paywall Header */}
          <div className="text-center space-y-2 pt-2">
            <div className="w-13 h-13 rounded-2xl bg-yellow border-2 border-ink flex items-center justify-center mx-auto shadow-notebook-xs">
              <Crown className="w-7 h-7 text-purple animate-bounce" />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-teal-soft text-teal-deep border border-teal px-3 py-1 rounded-full text-xs font-black">
              <Lock className="w-3.5 h-3.5 text-teal-deep" />
              <span>{isArabic ? `اكتملت المعاينة المجانية (${questionsCompleted} من 42 سؤالاً)` : `Free Preview Complete (${questionsCompleted}/42 Questions)`}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-black text-ink leading-snug">
              {isArabic ? (
                <>
                  أكمل الاختبار واحصل على <span className="hl-yellow">التقرير الشامل وتوصيات 2030</span>
                </>
              ) : (
                <>
                  Complete assessment & unlock <span className="hl-yellow">Full Report & Vision 2030 Recommendations</span>
                </>
              )}
            </h2>
          </div>

          {/* Pricing Banner Badge */}
          <div className="bg-yellow rounded-2xl p-4 border-2 border-ink shadow-notebook-xs flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted line-through">98 SAR</span>
                <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  50% OFF
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-display font-black text-ink">49</span>
                <span className="text-sm font-extrabold text-ink">SAR / ر.س</span>
              </div>
              <span className="text-[10px] font-extrabold text-ink-soft block">
                {isArabic ? 'دفع لمرة واحدة فقط — وصول كامل للتقرير' : 'One-time payment — Full report access'}
              </span>
            </div>

            <div className="shrink-0 text-right">
              <span className="inline-flex items-center gap-1 bg-paper-card border border-ink px-2.5 py-1 rounded-xl text-xs font-black text-teal">
                <Zap className="w-3.5 h-3.5 text-purple" />
                <span>{isArabic ? 'فتح فوري' : 'Instant Unlock'}</span>
              </span>
            </div>
          </div>

          {/* Feature List */}
          <div className="space-y-2 text-xs font-bold text-ink">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
              <span>{isArabic ? 'إكمال الـ 42 سؤالاً بالكامل لتقرير عالي الدقة' : 'Full 42-question comprehensive assessment'}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
              <span>{isArabic ? 'تقرير PDF رسمي معتمد ومفصل في صفحة واحدة' : 'Official accredited single-page PDF report'}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
              <span>{isArabic ? 'مواءمة التخصصات السعودية مع مستهدفات رؤية 2030' : 'Saudi Vision 2030 high-demand major matching'}</span>
            </div>
          </div>

          {/* Action Choice Buttons */}
          <div className="pt-2 space-y-2.5">
            {/* Primary Action: Go to Checkout (49 SAR) */}
            <a
              href="https://edutahseen.com/checkout?track=busalati&tier=comprehensive"
              className="w-full h-13 min-h-[46px] bg-teal hover:bg-teal-deep text-white border-2 border-ink rounded-xl font-display font-black text-sm sm:text-base shadow-notebook-sm flex items-center justify-center gap-2 hover:scale-102 transition-all"
            >
              <Sparkles className="w-4 h-4 text-yellow" />
              <span>{isArabic ? 'إكمال الاختبار والتقرير الشامل (خصم 50% — 49 ر.س)' : 'Complete Quiz & Full Report (49 SAR)'}</span>
              <ArrowRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
            </a>

            {/* Secondary Action: View Free Results */}
            {onViewFreeResults && (
              <button
                type="button"
                onClick={onViewFreeResults}
                className="w-full h-11 min-h-[42px] bg-paper hover:bg-paper-inset text-ink border-2 border-ink rounded-xl font-bold text-xs sm:text-sm shadow-notebook-xs flex items-center justify-center gap-2 transition-all hover:scale-101"
              >
                <BarChart3 className="w-4 h-4 text-[#0d9488]" />
                <span>{isArabic ? 'عرض النتيجة الأولية المجانية (21 سؤالاً)' : 'View Free Preliminary Results (21 Items)'}</span>
              </button>
            )}

            <p className="text-center text-[10px] font-bold text-muted flex items-center justify-center gap-1 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal" />
              <span>{isArabic ? 'دفع آمن عبر مدى / البطاقات الائتمانية / Apple Pay' : 'Secured via Mada / Visa / Apple Pay'}</span>
            </p>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
