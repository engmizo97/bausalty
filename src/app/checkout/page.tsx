'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Compass,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowRight,
  Crown,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [paymentMethod, setPaymentMethod] = useState<'MADA' | 'CARD' | 'APPLE_PAY'>('MADA');
  const [cardName, setCardName] = useState('Fahad Al-Saudi');
  const [cardNumber, setCardNumber] = useState('4847 •••• •••• 9201');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('882');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Save paid status to localStorage
      try {
        localStorage.setItem('bausalty_is_paid', 'true');

        // Update user session if exists
        const savedSession = localStorage.getItem('bausalty_user_session');
        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          parsed.plan = 'PAID';
          localStorage.setItem('bausalty_user_session', JSON.stringify(parsed));
        }
      } catch {
        // Ignore
      }

      // Redirect back to assessment quiz after 1.5 seconds
      setTimeout(() => {
        router.push('/assessment');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="flex-1 bg-paper py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl border-2 border-ink overflow-hidden shadow-notebook-xs bg-white shrink-0">
              <Image
                src="/logo.png"
                alt="بوصلتي"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-right">
              <span className="text-3xl font-display font-black text-ink block">بوصلتي</span>
              <span className="text-xs font-bold text-teal block">مجموعة تحسين للذكاء الاصطناعي</span>
            </div>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-display font-black text-ink">
            {isArabic ? 'إتمام الدفع الآمن (49 ر.س)' : 'Secure Checkout (49 SAR)'}
          </h1>
          <p className="text-xs sm:text-sm text-ink-soft font-prose">
            {isArabic
              ? 'افتـح اختبار هولاند الكامل (42 سؤالاً) مع تقارير التخصصات وتوصيات القبول الجامعي.'
              : 'Unlock the full 42-question RIASEC assessment & Vision 2030 major recommendations.'}
          </p>
        </div>

        {/* Success Alert Banner */}
        {isSuccess ? (
          <div className="bg-yellow rounded-3xl p-8 border-2 border-ink shadow-notebook-md text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-teal mx-auto animate-bounce" />
            <h2 className="text-2xl font-display font-black text-ink">
              {isArabic ? 'تمت عملية الدفع بنجاح! 🎉' : 'Payment Successful! 🎉'}
            </h2>
            <p className="text-sm font-bold text-ink-soft">
              {isArabic
                ? 'تم فتح جميع الأسئلة الـ 42 بنجاح. جاري تحويلك الآن لإكمال الاختبار...'
                : 'All 42 questions have been unlocked. Redirecting to assessment now...'}
            </p>
          </div>
        ) : (
          <div className="bg-paper-card rounded-notebook p-6 sm:p-8 border-2 border-ink shadow-notebook-md space-y-6">
            
            {/* Order Summary Box */}
            <div className="bg-yellow rounded-2xl p-5 border-2 border-ink shadow-notebook-xs space-y-3">
              <div className="flex items-center justify-between border-b border-ink/20 pb-3">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-purple" />
                  <span className="font-display font-black text-ink text-base">
                    {isArabic ? 'باقة التقرير الكامل والاختبار الشامل' : 'Bausalty Full Assessment Package'}
                  </span>
                </div>
                <span className="text-xs font-black bg-rose-600 text-white px-2 py-0.5 rounded-full">
                  50% OFF
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink-soft">
                  {isArabic ? 'اختبار هولاند 42 سؤالاً + بطاقة التقرير + توصيات رؤية 2030' : '42-Item Assessment + Report Card + Vision 2030 Majors'}
                </span>
                <div className="text-right">
                  <span className="text-xs text-muted line-through block">98 SAR</span>
                  <span className="text-2xl font-display font-black text-ink">49 SAR</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-ink block">
                {isArabic ? 'اختر طريقة الدفع:' : 'Select Payment Method:'}
              </label>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('MADA')}
                  className={`p-3 rounded-xl border-2 font-black text-xs transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'MADA'
                      ? 'bg-teal text-white border-ink shadow-notebook-xs'
                      : 'bg-paper border-ink/20 text-ink-soft hover:border-ink'
                  }`}
                >
                  <span className="text-sm font-extrabold">مدى Mada</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3 rounded-xl border-2 font-black text-xs transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'CARD'
                      ? 'bg-teal text-white border-ink shadow-notebook-xs'
                      : 'bg-paper border-ink/20 text-ink-soft hover:border-ink'
                  }`}
                >
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('APPLE_PAY')}
                  className={`p-3 rounded-xl border-2 font-black text-xs transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'APPLE_PAY'
                      ? 'bg-teal text-white border-ink shadow-notebook-xs'
                      : 'bg-paper border-ink/20 text-ink-soft hover:border-ink'
                  }`}
                >
                  <span>Apple Pay</span>
                </button>
              </div>
            </div>

            {/* Payment Simulation Form */}
            <form onSubmit={handleProcessPayment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-ink block">
                  {isArabic ? 'اسم حامل البطاقة:' : 'Cardholder Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full h-11 min-h-[44px] px-3.5 rounded-xl border-2 border-ink bg-paper text-ink text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-ink block">
                  {isArabic ? 'رقم بطاقة مدى / الفيزا:' : 'Card Number (Mada / Visa):'}
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full h-11 min-h-[44px] pl-10 pr-3 rounded-xl border-2 border-ink bg-paper text-ink text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-ink block">
                    {isArabic ? 'تاريخ الانتهاء:' : 'Expiry Date:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full h-11 min-h-[44px] px-3.5 rounded-xl border-2 border-ink bg-paper text-ink text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-ink block">
                    {isArabic ? 'رمز الأمان (CVV):' : 'CVV Code:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-full h-11 min-h-[44px] px-3.5 rounded-xl border-2 border-ink bg-paper text-ink text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full h-14 min-h-[48px] bg-teal hover:bg-teal-deep text-white border-2 border-ink rounded-2xl font-display font-black text-base shadow-notebook-sm flex items-center justify-center gap-2 hover:scale-102 transition-all"
              >
                <Lock className="w-5 h-5 text-yellow" />
                <span>
                  {isProcessing
                    ? (isArabic ? 'جاري معالجة الدفع...' : 'Processing Payment...')
                    : (isArabic ? 'إتمام الدفع الفوري (49 ر.س)' : 'Complete Payment (49 SAR)')}
                </span>
                <ArrowRight className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
              </button>
            </form>

            <p className="text-center text-xs text-muted flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-teal" />
              <span>{isArabic ? 'معاملة مشفرة بمستوى أمان عالي' : 'Encrypted 256-bit Secure Transaction'}</span>
            </p>

          </div>
        )}

      </div>
    </div>
  );
}
