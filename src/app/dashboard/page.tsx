'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Compass,
  Award,
  Crown,
  RotateCcw,
  UserCheck,
  BookOpen,
  Zap,
  LogOut,
  Lock,
  Download,
  Brain,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { AssessmentResult } from '@/types';
import { RIASEC_CATEGORIES } from '@/data/questions';
import PersonalityCard from '@/components/results/PersonalityCard';
import { useLanguage } from '@/context/LanguageContext';

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  plan: 'FREE' | 'PAID';
  image: string;
  signedInAt?: string;
}

interface MbtiResultSaved {
  code: string;
  archetype: {
    titleEn: string;
    titleAr: string;
    groupEn: string;
    groupAr: string;
  };
  completedAt: string;
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [riasecResult, setRiasecResult] = useState<AssessmentResult | null>(null);
  const [mbtiResult, setMbtiResult] = useState<MbtiResultSaved | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedSession = localStorage.getItem('bausalty_user_session');
        if (!savedSession) {
          router.push('/login?callbackUrl=/dashboard');
          return;
        }

        setStudent(JSON.parse(savedSession));

        const savedRiasec = localStorage.getItem('bausalty_assessment_result');
        if (savedRiasec) {
          setRiasecResult(JSON.parse(savedRiasec));
        }

        const savedMbti = localStorage.getItem('bausalty_mbti_result');
        if (savedMbti) {
          setMbtiResult(JSON.parse(savedMbti));
        }
      } catch {
        // Ignore
      } finally {
        setIsLoaded(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [router]);

  const handleSignOut = () => {
    try {
      localStorage.removeItem('bausalty_user_session');
      window.dispatchEvent(new Event('storage'));
    } catch {
      // Ignore
    }
    router.push('/login');
  };

  const handleUpgradePlan = () => {
    if (!student) return;
    const updated = { ...student, plan: 'PAID' as const };
    setStudent(updated);
    try {
      localStorage.setItem('bausalty_user_session', JSON.stringify(updated));
    } catch {
      // Ignore
    }
    alert(isArabic ? 'تم ترقية حسابك بنجاح إلى الفئة الممتازة!' : 'Your account has been upgraded to Premium!');
  };

  const handleDownloadPdfReport = async (testType: 'RIASEC' | '16PERSONALITIES') => {
    if (!student) return;
    setIsDownloadingPdf(true);

    try {
      const res = await fetch('/api/email/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: student.email,
          name: student.name,
          testType,
          riasecResult,
          personalityResult: mbtiResult,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(isArabic ? `تم إرسال تقرير PDF إلى بريدك الإلكتروني: ${student.email}` : `PDF report sent to your email: ${student.email}`);
      } else {
        alert(data?.error || 'Failed to trigger PDF report.');
      }
    } catch (err) {
      console.error('PDF download error:', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  if (!isLoaded || !student) {
    return (
      <div className="flex-1 bg-paper flex items-center justify-center p-12">
        <div className="text-center space-y-4">
          <Lock className="w-10 h-10 text-teal mx-auto animate-bounce" />
          <p className="text-ink font-bold font-display">{isArabic ? 'جاري تحميل لوحة التحكم...' : 'Loading Student Dashboard...'}</p>
        </div>
      </div>
    );
  }

  const signupDateFormatted = student.signedInAt
    ? new Date(student.signedInAt).toLocaleDateString()
    : new Date().toLocaleDateString();

  return (
    <div className="flex-1 bg-paper py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        
        {/* --- STUDENT PROFILE HEADER CARD --- */}
        <div className="bg-paper-card rounded-3xl p-6 sm:p-10 border-2 border-ink shadow-notebook-md flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left dir-ltr">
            
            {/* Student Avatar */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-ink overflow-hidden shadow-notebook-xs relative bg-paper-inset">
                {student.image ? (
                  <Image
                    src={student.image}
                    alt={student.name || 'Student Avatar'}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-teal text-white flex items-center justify-center font-display font-black text-2xl">
                    {student.name?.[0] || 'S'}
                  </div>
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-ink flex items-center justify-center text-white text-[10px]">
                ✓
              </span>
            </div>

            {/* Name, Email, Account Badge, Signup Date */}
            <div className="space-y-1.5 text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-display font-black text-ink">
                  {student.name}
                </h1>

                {/* Account Status Badge */}
                {student.plan === 'PAID' ? (
                  <span className="inline-flex items-center gap-1 bg-yellow text-ink border border-ink px-3 py-0.5 rounded-full text-xs font-black shadow-2xs">
                    <Crown className="w-3.5 h-3.5 text-purple" />
                    <span>Premium Student</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-teal-soft text-teal-deep border border-teal px-3 py-0.5 rounded-full text-xs font-black">
                    <UserCheck className="w-3.5 h-3.5 text-teal" />
                    <span>Free Plan / خطة مجانية</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-ink-soft font-bold font-mono">
                {student.email}
              </p>

              <div className="flex items-center gap-2 text-xs text-muted font-bold pt-1">
                <Calendar className="w-3.5 h-3.5 text-teal" />
                <span>{isArabic ? `تاريخ التسجيل: ${signupDateFormatted}` : `Signed Up: ${signupDateFormatted}`}</span>
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full md:w-auto">
            {student.plan === 'FREE' && (
              <button
                onClick={handleUpgradePlan}
                className="h-12 min-h-[48px] px-5 rounded-2xl bg-yellow hover:bg-amber-300 text-ink border-2 border-ink font-display font-black text-xs sm:text-sm shadow-notebook-xs flex items-center gap-2 hover:scale-102 transition-all"
              >
                <Crown className="w-4 h-4 text-purple" />
                <span>{isArabic ? 'ترقية التقرير الشامل' : 'Upgrade to Premium'}</span>
              </button>
            )}

            <button
              onClick={handleSignOut}
              className="h-12 min-h-[48px] px-4 rounded-2xl bg-paper hover:bg-paper-inset text-ink border-2 border-ink font-bold text-xs sm:text-sm shadow-notebook-xs flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>{isArabic ? 'خروج' : 'Sign Out'}</span>
            </button>
          </div>
        </div>

        {/* --- FREE TIER UPGRADE CTA BANNER --- */}
        {student.plan === 'FREE' && (
          <div className="bg-yellow rounded-3xl p-6 sm:p-8 text-ink border-2 border-ink shadow-notebook-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-paper-card px-3 py-1 rounded-full border border-ink text-xs font-extrabold shadow-2xs">
                <Crown className="w-4 h-4 text-purple" />
                <span>Bausalty Premium Report / التقرير الممتاز الشامل</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-black text-ink">
                {isArabic ? 'احصل على الخريطة الأكاديمية الشاملة لقبولك الجامعي!' : 'Unlock Your Full Academic Admission Roadmap!'}
              </h3>

              <p className="text-xs sm:text-sm text-ink-soft font-prose max-w-2xl">
                {isArabic
                  ? 'احصل على تحليل موسع لـ 16Personalities، وخارطة طريق للقبول في أفضل 5 جامعات سعودية، مع نسب الموزونة والحد الأدنى لدرجات القدرات والتحصيلي.'
                  : 'Get extended 16Personalities analysis, 5 top Saudi university admission roadmaps, weighted GPA requirements, and target Qudurat & Tahsili scores.'}
              </p>
            </div>

            <button
              onClick={handleUpgradePlan}
              className="h-12 min-h-[48px] bg-teal hover:bg-teal-deep text-white border-2 border-ink px-6 rounded-2xl font-display font-black text-sm shadow-notebook-xs shrink-0 inline-flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Zap className="w-4 h-4 text-yellow" />
              <span>{isArabic ? 'ترقية الحساب الآن' : 'Upgrade Account Now'}</span>
            </button>
          </div>
        )}

        {/* --- SAVED ASSESSMENTS HISTORY LIST --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Saved Assessment History List */}
          <div className="lg:col-span-1 bg-paper-card rounded-notebook p-6 border-2 border-ink shadow-notebook-md space-y-6">
            <div className="flex items-center justify-between border-b-2 border-ink/10 pb-4">
              <h2 className="text-lg font-display font-black text-ink">
                {isArabic ? 'سجل الاختبارات المحفوظة' : 'Completed Assessment History'}
              </h2>
              <Award className="w-5 h-5 text-teal" />
            </div>

            {/* 1. Holland Code (RIASEC) Card */}
            <div className="bg-paper p-4 rounded-2xl border-2 border-ink space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-ink flex items-center gap-1">
                  <Compass className="w-4 h-4 text-teal" />
                  <span>Holland Code (RIASEC)</span>
                </span>
                <span className="text-[10px] font-black text-teal bg-teal-soft px-2 py-0.5 rounded border border-teal">Active</span>
              </div>

              {riasecResult ? (
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-display font-black text-ink tracking-widest">{riasecResult.topCode}</span>
                    <span className="text-[11px] font-bold text-muted">
                      {new Date(riasecResult.completedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-ink-soft">
                    Dominant: {RIASEC_CATEGORIES[riasecResult.primaryType]?.nameEn} ({RIASEC_CATEGORIES[riasecResult.primaryType]?.nameAr})
                  </p>

                  <div className="pt-2 flex flex-col gap-2">
                    <Link
                      href="/results"
                      className="w-full h-9 inline-flex items-center justify-center gap-1.5 bg-teal text-white border border-ink rounded-xl font-bold text-xs shadow-2xs"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-yellow" />
                      <span>{isArabic ? 'عرض النتائج التفصيلية' : 'View Detailed Results'}</span>
                    </Link>

                    <button
                      onClick={() => handleDownloadPdfReport('RIASEC')}
                      disabled={isDownloadingPdf}
                      className="w-full h-9 inline-flex items-center justify-center gap-1.5 bg-yellow text-ink border border-ink rounded-xl font-bold text-xs shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5 text-purple" />
                      <span>{isDownloadingPdf ? 'جاري الإرسال...' : (isArabic ? 'تحميل التقرير (PDF)' : 'Download PDF Report')}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-2">
                  <p className="text-xs text-muted font-bold">No saved Holland test result yet.</p>
                  <Link href="/assessment/quiz" className="text-xs font-extrabold text-teal hover:underline mt-1 inline-block">
                    Take 42-item RIASEC Test →
                  </Link>
                </div>
              )}
            </div>

            {/* 2. 16Personalities MBTI Card */}
            <div className="bg-paper p-4 rounded-2xl border-2 border-ink space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-ink flex items-center gap-1">
                  <Brain className="w-4 h-4 text-purple" />
                  <span>16Personalities Test</span>
                </span>
                <span className="text-[10px] font-black text-purple bg-purple-soft px-2 py-0.5 rounded border border-purple">Matched</span>
              </div>

              {mbtiResult ? (
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-display font-black text-ink">{mbtiResult.code}</span>
                    <span className="text-[11px] font-bold text-muted">
                      {new Date(mbtiResult.completedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-ink-soft">
                    {isArabic ? mbtiResult.archetype.titleAr : mbtiResult.archetype.titleEn}
                  </p>

                  <div className="pt-2 flex flex-col gap-2">
                    <Link
                      href="/personality-test"
                      className="w-full h-9 inline-flex items-center justify-center gap-1.5 bg-paper-card text-ink border border-ink rounded-xl font-bold text-xs shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-teal" />
                      <span>{isArabic ? 'عرض تحليل الشحصة' : 'View Profile Details'}</span>
                    </Link>

                    <button
                      onClick={() => handleDownloadPdfReport('16PERSONALITIES')}
                      disabled={isDownloadingPdf}
                      className="w-full h-9 inline-flex items-center justify-center gap-1.5 bg-yellow text-ink border border-ink rounded-xl font-bold text-xs shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5 text-purple" />
                      <span>{isDownloadingPdf ? 'جاري الإرسال...' : (isArabic ? 'تحميل التقرير (PDF)' : 'Download PDF Report')}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-2">
                  <p className="text-xs text-muted font-bold">No saved 16Personalities test result yet.</p>
                  <Link href="/personality-test" className="text-xs font-extrabold text-teal hover:underline mt-1 inline-block">
                    Take Free 16Personalities Test →
                  </Link>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <Link
                href="/assessment/quiz"
                className="w-full h-11 min-h-[44px] inline-flex items-center justify-center gap-2 bg-paper hover:bg-paper-inset text-ink border-2 border-ink rounded-xl font-bold text-xs shadow-notebook-xs transition-all"
              >
                <RotateCcw className="w-4 h-4 text-teal" />
                <span>{isArabic ? 'إعادة إجراء الاختبار' : 'Retake Assessment'}</span>
              </Link>
            </div>

          </div>

          {/* Personality Card Display Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-paper-card rounded-notebook p-6 sm:p-8 border-2 border-ink shadow-notebook-md space-y-6">
              <div className="flex items-center justify-between border-b-2 border-ink/10 pb-4">
                <div>
                  <h2 className="text-xl font-display font-black text-ink">
                    {isArabic ? 'بطاقة شخصية بوصالتي الرسمية' : 'Official Bausalty Personality Card'}
                  </h2>
                  <p className="text-xs font-semibold text-muted">
                    {isArabic ? 'بطاقة التقرير المعتمدة لمشاركتها مع التوجيه الأكاديمي' : 'Official shareable profile card'}
                  </p>
                </div>

                {riasecResult && (
                  <span className="text-xs font-extrabold bg-yellow border border-ink px-3 py-1 rounded-full shadow-2xs">
                    {riasecResult.topCode}
                  </span>
                )}
              </div>

              {riasecResult ? (
                <PersonalityCard result={riasecResult} />
              ) : (
                <div className="text-center py-12 space-y-4">
                  <Compass className="w-12 h-12 text-teal mx-auto animate-pulse" />
                  <p className="text-ink-soft text-sm font-bold">Please complete the test first to generate your personality card.</p>
                  <Link
                    href="/assessment/quiz"
                    className="inline-flex items-center gap-2 bg-teal text-white border-2 border-ink px-6 py-3 rounded-xl font-black text-sm shadow-notebook-xs"
                  >
                    <span>Start Test Now</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
