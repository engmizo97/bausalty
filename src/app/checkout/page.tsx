'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowRight,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  React.useEffect(() => {
    window.location.href = 'https://edutahseen.com/checkout?track=busalati&tier=comprehensive';
  }, []);

  const [paymentMethod, setPaymentMethod] = useState<'MADA' | 'CARD' | 'APPLE_PAY'>('MADA');
  const [cardName, setCardName] = useState('فهد السعدي');
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
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-[11px] border-2 border-[#1F1B13] bg-white shadow-[2px_2px_0_#1F1B13] -rotate-2 flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src="/bawsalati-logo.webp"
                alt="بوصلتي"
                width={36}
                height={36}
                className="w-9 h-9 object-contain shrink-0"
                priority
              />
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-[#1F1B13] block font-display leading-tight">
                {isArabic ? 'بوصلتي' : 'Bausalty'}
              </span>
              <span className="text-[11px] font-bold text-[#109E91] block">
                {isArabic ? 'تحسين التعليمية' : 'Tahseen Education'}
              </span>
            </div>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#1F1B13] pt-1">
            {isArabic ? 'إتمام الدفع الآمن (49 ر.س)' : 'Secure Checkout (49 SAR)'}
          </h1>
          <p className="text-xs sm:text-sm text-[#4B4131] font-prose max-w-md mx-auto">
            {isArabic
              ? 'افتح اختبار هولاند الكامل (42 سؤالاً) مع تقارير التخصصات وتوصيات القبول الجامعي.'
              : 'Unlock the full 42-question RIASEC assessment & Vision 2030 major recommendations.'}
          </p>
        </div>

        {/* Success Alert Banner */}
        {isSuccess ? (
          <div className="bg-[#FEF6E8] rounded-2xl p-8 border-2 border-[#1F1B13] shadow-[4px_4px_0_#1F1B13] text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-[#109E91] mx-auto animate-bounce" />
            <h2 className="text-2xl font-display font-black text-[#1F1B13]">
              {isArabic ? 'تمت عملية الدفع بنجاح! 🎉' : 'Payment Successful! 🎉'}
            </h2>
            <p className="text-sm font-semibold text-[#4B4131]">
              {isArabic
                ? 'تم فتح جميع الأسئلة الـ 42 بنجاح. جاري تحويلك الآن لإكمال الاختبار...'
                : 'All 42 questions have been unlocked. Redirecting to assessment now...'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#1F1B13]/15 shadow-[3px_3px_0_#1F1B13] space-y-5">
            
            {/* Order Summary Box */}
            <div className="bg-[#FEF6E8] rounded-xl p-4 border border-[#E5A93C]/40 space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#1F1B13]/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E5A93C]" />
                  <span className="font-display font-bold text-[#1F1B13] text-sm sm:text-base">
                    {isArabic ? 'باقة التقرير الكامل والاختبار الشامل' : 'Full Assessment & Report Package'}
                  </span>
                </div>
                <span className="text-[11px] font-bold bg-[#E5A93C] text-[#1F1B13] px-2 py-0.5 rounded-md">
                  خصم 50%
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[#4B4131]">
                  {isArabic ? 'اختبار هولاند 42 سؤالاً + بطاقة التقرير + توصيات رؤية 2030' : '42-Item Assessment + Report Card + Vision 2030 Majors'}
                </span>
                <div className="text-right shrink-0 mr-2">
                  <span className="text-[11px] text-[#7D715D] line-through block font-mono">98 ر.س</span>
                  <span className="text-xl font-display font-black text-[#109E91] font-mono">49 ر.س</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1F1B13] block">
                {isArabic ? 'اختر طريقة الدفع:' : 'Select Payment Method:'}
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('MADA')}
                  className={`h-12 px-2 rounded-xl border-2 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'MADA'
                      ? 'bg-[#109E91] text-white border-[#1F1B13] shadow-[2px_2px_0_#1F1B13]'
                      : 'bg-[#FAF6EA] border-[#1F1B13]/20 text-[#4B4131] hover:border-[#1F1B13]'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>مدى Mada</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`h-12 px-2 rounded-xl border-2 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'CARD'
                      ? 'bg-[#109E91] text-white border-[#1F1B13] shadow-[2px_2px_0_#1F1B13]'
                      : 'bg-[#FAF6EA] border-[#1F1B13]/20 text-[#4B4131] hover:border-[#1F1B13]'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>بطاقة ائتمان</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('APPLE_PAY')}
                  className={`h-12 px-2 rounded-xl border-2 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'APPLE_PAY'
                      ? 'bg-[#109E91] text-white border-[#1F1B13] shadow-[2px_2px_0_#1F1B13]'
                      : 'bg-[#FAF6EA] border-[#1F1B13]/20 text-[#4B4131] hover:border-[#1F1B13]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Apple Pay</span>
                </button>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleProcessPayment} className="space-y-3.5 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1F1B13] block">
                  {isArabic ? 'اسم حامل البطاقة:' : 'Cardholder Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#1F1B13]/30 bg-[#FAF6EA] text-[#1F1B13] text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#109E91] focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1F1B13] block">
                  {isArabic ? 'رقم بطاقة مدى / البطاقة الائتمانية:' : 'Card Number (Mada / Visa):'}
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-[#7D715D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#1F1B13]/30 bg-[#FAF6EA] text-[#1F1B13] text-xs sm:text-sm font-semibold font-mono focus:outline-none focus:border-[#109E91] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1F1B13] block">
                    {isArabic ? 'تاريخ الانتهاء:' : 'Expiry Date:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full h-10 px-3 rounded-xl border border-[#1F1B13]/30 bg-[#FAF6EA] text-[#1F1B13] text-xs sm:text-sm font-semibold font-mono focus:outline-none focus:border-[#109E91] focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1F1B13] block">
                    {isArabic ? 'رمز الأمان (CVV):' : 'CVV Code:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-full h-10 px-3 rounded-xl border border-[#1F1B13]/30 bg-[#FAF6EA] text-[#1F1B13] text-xs sm:text-sm font-semibold font-mono focus:outline-none focus:border-[#109E91] focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full h-12 bg-[#109E91] hover:bg-[#0D7E74] text-white border-2 border-[#1F1B13] rounded-xl font-display font-bold text-sm shadow-[2.5px_2.5px_0_#1F1B13] flex items-center justify-center gap-2 hover:translate-x-[-1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0_#1F1B13] transition-all cursor-pointer disabled:opacity-50 mt-3"
              >
                <Lock className="w-4 h-4 text-[#FEF6E8]" />
                <span>
                  {isProcessing
                    ? (isArabic ? 'جاري معالجة الدفع...' : 'Processing Payment...')
                    : (isArabic ? 'إتمام الدفع الفوري (49 ر.س)' : 'Complete Payment (49 SAR)')}
                </span>
                <ArrowRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
              </button>
            </form>

            <p className="text-center text-xs text-[#7D715D] flex items-center justify-center gap-1 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#109E91]" />
              <span>{isArabic ? 'معاملة مشفرة وآمنة بالكامل 100%' : '100% Encrypted 256-bit Secure Transaction'}</span>
            </p>

          </div>
        )}

      </div>
    </div>
  );
}
