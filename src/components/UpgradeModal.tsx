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
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose?: () => void;
  questionsCompleted?: number;
}

export default function UpgradeModal({
  isOpen,
  onClose,
  questionsCompleted = 12,
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
          className="bg-paper-card rounded-3xl border-2 border-ink shadow-notebook-lg max-w-lg w-full p-6 sm:p-8 relative space-y-6 overflow-hidden"
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
          <div className="text-center space-y-3 pt-2">
            <div className="w-14 h-14 rounded-2xl bg-yellow border-2 border-ink flex items-center justify-center mx-auto shadow-notebook-xs">
              <Crown className="w-8 h-8 text-purple animate-bounce" />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-teal-soft text-teal-deep border border-teal px-3 py-1 rounded-full text-xs font-black">
              <Lock className="w-3.5 h-3.5 text-teal-deep" />
              <span>{isArabic ? `اكتملت المعاينة (السؤال ${questionsCompleted} من 42)` : `Free Preview Complete (${questionsCompleted}/42 Questions)`}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-black text-ink leading-snug">
              {isArabic ? (
                <>
                  افتـح اختبار هولاند الكامل <span className="hl-yellow">(42 سؤالاً)</span> وتوصيات رؤية 2030
                </>
              ) : (
                <>
                  Unlock the full <span className="hl-yellow">42-question RIASEC assessment</span> & Vision 2030 major recommendations
                </>
              )}
            </h2>
          </div>

          {/* Pricing Banner Badge */}
          <div className="bg-yellow rounded-2xl p-4 border-2 border-ink shadow-notebook-xs flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-muted line-through">120 SAR</span>
                <span className="bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-full uppercase">
                  50% OFF
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-display font-black text-ink">60</span>
                <span className="text-sm font-extrabold text-ink">SAR / ر.س</span>
              </div>
              <span className="text-[11px] font-extrabold text-ink-soft block">
                {isArabic ? 'دفع لمرة واحدة فقط — وصول مدى الحياة' : 'One-time payment — Lifetime access'}
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
          <div className="space-y-2.5 text-xs sm:text-sm font-bold text-ink">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
              <span>{isArabic ? 'الوصول لجميع الأسئلة الـ 42 في اختبار هولاند المقيس' : 'Full 42-item standardized RIASEC assessment questions'}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
              <span>{isArabic ? 'توصيات التخصصات المتوافقة مع رؤية السعودية 2030' : 'Detailed Saudi Vision 2030 high-demand major matching'}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
              <span>{isArabic ? 'بطاقة الشخصية المعتمدة القابلة للتحميل والصور' : 'Downloadable Bausalty Personality Card (PNG)'}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
              <span>{isArabic ? 'أهداف درجات القدرات والتحصيلي المطلوبة للقبول' : 'Target Qudurat & Tahsili admission score roadmaps'}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 space-y-3">
            <Link
              href="/checkout"
              className="w-full h-14 min-h-[48px] bg-teal hover:bg-teal-deep text-white border-2 border-ink rounded-2xl font-display font-black text-base shadow-notebook-sm flex items-center justify-center gap-2 hover:scale-102 transition-all"
            >
              <Sparkles className="w-5 h-5 text-yellow" />
              <span>{isArabic ? 'الانتقال للدفع وتفعيل الاختبار (60 ر.س)' : 'Proceed to Checkout (60 SAR)'}</span>
              <ArrowRight className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
            </Link>

            <p className="text-center text-[11px] font-bold text-muted flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-teal" />
              <span>{isArabic ? 'دفع آمن عبر مدى / الفيزا / Apple Pay' : 'Secured via Mada / Visa / Apple Pay'}</span>
            </p>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
