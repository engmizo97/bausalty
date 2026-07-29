'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MAJORS } from '@/data/majors';
import { RIASEC_CATEGORIES } from '@/data/questions';
import { RiasecType } from '@/types';
import {
  Search,
  Sparkles,
  Building,
  Briefcase,
  ChevronRight,
  Compass,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function MajorsExplorerPage() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<RiasecType | 'ALL'>('ALL');
  const [onlyVision2030, setOnlyVision2030] = useState<boolean>(false);
  const [expandedMajorId, setExpandedMajorId] = useState<string | null>(null);

  const categoriesList: (RiasecType | 'ALL')[] = ['ALL', 'R', 'I', 'A', 'S', 'E', 'C'];

  const filteredMajors = useMemo(() => {
    return MAJORS.filter((major) => {
      // Search term filter
      const matchesSearch =
        searchTerm === '' ||
        major.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        major.nameAr.includes(searchTerm) ||
        major.riasecCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        major.sampleCareersEn.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
        major.sampleCareersAr.some((c) => c.includes(searchTerm));

      // Category filter
      const matchesCategory =
        selectedCategory === 'ALL' || major.primaryType === selectedCategory;

      // Vision 2030 filter
      const matchesVision2030 = !onlyVision2030 || major.isVision2030;

      return matchesSearch && matchesCategory && matchesVision2030;
    });
  }, [searchTerm, selectedCategory, onlyVision2030]);

  return (
    <div className="flex-1 bg-paper py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Header Banner */}
        <div className="bg-yellow rounded-3xl p-6 sm:p-12 text-ink border-2 border-ink shadow-notebook-md relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-paper-card px-3.5 py-1.5 rounded-full border-2 border-ink text-xs font-bold shadow-notebook-xs">
              <Compass className="w-4 h-4 text-teal" />
              <span>{isArabic ? 'دليل التخصصات والجامعات السعودية' : 'Saudi Universities & Vision 2030 Catalogue'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight text-ink">
              {isArabic ? 'مستكشف التخصصات الجامعية السعودية' : 'Saudi College Majors Explorer'}
            </h1>

            <p className="text-ink-soft text-base sm:text-lg font-prose leading-relaxed">
              {isArabic
                ? 'استكشف التخصصات الأكاديمية المتاحة في الجامعات السعودية، المبوّبة حسب أتياد هولاند (RIASEC) والقطاعات الوطنية المستهدفة في رؤية السعودية 2030.'
                : 'Explore academic majors offered across Saudi Arabian universities, categorized by Holland Code (RIASEC) traits and tagged with high-demand Saudi Vision 2030 national development sectors.'}
            </p>

            <div className="pt-2">
              <Link
                href="/assessment"
                className="h-12 min-h-[48px] inline-flex items-center gap-2 bg-teal hover:bg-teal-deep text-white px-6 rounded-2xl font-display font-black text-sm border-2 border-ink shadow-notebook-xs hover:scale-102 transition-transform"
              >
                <Sparkles className="w-4 h-4 text-yellow" />
                <span>{isArabic ? 'مطابقة التخصص مع نتائج اختبارك' : 'Match Your Profile with Assessment'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-paper-card rounded-3xl p-6 border-2 border-ink shadow-notebook-md space-y-6">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isArabic ? 'ابحث عن تخصص، مسار وظيفي، أو كود هولاند (مثل الأمن السيبراني، الذكاء الاصطناعي، IRC)...' : 'Search majors, careers, or Holland codes (e.g. Cybersecurity, AI, IRC)...'}
              className="w-full h-12 min-h-[48px] pl-12 pr-4 py-3 rounded-2xl border-2 border-ink bg-paper text-ink placeholder:text-muted text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal"
            />
          </div>

          {/* Category Pills & Vision 2030 Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t-2 border-ink/10">
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categoriesList.map((catKey) => {
                const isSelected = selectedCategory === catKey;
                const catName = catKey === 'ALL'
                  ? (isArabic ? 'جميع الفئات' : 'All Categories')
                  : (isArabic ? RIASEC_CATEGORIES[catKey].nameAr : RIASEC_CATEGORIES[catKey].nameEn);

                return (
                  <button
                    key={catKey}
                    onClick={() => setSelectedCategory(catKey)}
                    className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-black border-2 transition-all ${
                      isSelected
                        ? 'bg-teal text-white border-ink shadow-notebook-xs'
                        : 'bg-paper border-ink/20 text-ink-soft hover:border-ink'
                    }`}
                  >
                    {catKey === 'ALL' ? catName : `${catKey} - ${catName}`}
                  </button>
                );
              })}
            </div>

            {/* Vision 2030 Toggle */}
            <button
              onClick={() => setOnlyVision2030(!onlyVision2030)}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-black inline-flex items-center gap-2 transition-all shrink-0 border-2 ${
                onlyVision2030
                  ? 'bg-yellow text-ink border-ink shadow-notebook-xs'
                  : 'bg-teal-soft text-teal-deep border-teal hover:bg-teal-soft/80'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple" />
              <span>{isArabic ? 'رؤية السعودية 2030 فقط' : 'Saudi Vision 2030 Only'}</span>
            </button>

          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-bold text-ink-soft px-2">
          <span>{isArabic ? `عرض ${filteredMajors.length} من أصل ${MAJORS.length} تخصصاً` : `Showing ${filteredMajors.length} of ${MAJORS.length} Majors`}</span>
          {onlyVision2030 && <span className="text-teal-deep font-extrabold">{isArabic ? 'تصفية مفعلة: رؤية السعودية 2030' : 'Filter active: Saudi Vision 2030 High Priority'}</span>}
        </div>

        {/* Majors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMajors.map((major) => {
            const isExpanded = expandedMajorId === major.id;

            return (
              <div
                key={major.id}
                className="bg-paper-card rounded-notebook p-6 border-2 border-ink shadow-notebook-sm hover:shadow-notebook-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Badges */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black bg-paper-inset text-ink border border-ink px-2.5 py-1 rounded-lg">
                      Holland Code: {major.riasecCode}
                    </span>

                    {major.isVision2030 && (
                      <span className="text-[10px] font-black bg-yellow text-ink border border-ink px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs">
                        <Sparkles className="w-3 h-3 text-purple" />
                        <span>Vision 2030</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-ink leading-snug">
                      {isArabic ? major.nameAr : major.nameEn}
                    </h3>
                    <p className="text-xs font-bold text-muted">
                      {isArabic ? major.nameEn : major.nameAr}
                    </p>
                  </div>

                  <p className="text-ink-soft text-xs font-prose leading-relaxed line-clamp-3">
                    {isArabic ? major.descriptionAr : major.descriptionEn}
                  </p>

                  {/* Expandable Details */}
                  {isExpanded && (
                    <div className="pt-3 border-t-2 border-ink/10 space-y-3 text-xs">
                      <div>
                        <p className="font-bold text-ink flex items-center gap-1 mb-1">
                          <Briefcase className="w-3.5 h-3.5 text-teal" />
                          <span>{isArabic ? 'الفرص الوظيفية:' : 'Sample Careers:'}</span>
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 text-ink-soft pl-1 font-prose">
                          {(isArabic ? major.sampleCareersAr : major.sampleCareersEn).map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-bold text-ink flex items-center gap-1 mb-1">
                          <Building className="w-3.5 h-3.5 text-teal" />
                          <span>{isArabic ? 'أبرز الجامعات:' : 'Top Saudi Universities:'}</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {(isArabic ? major.saudiUniversitiesAr : major.saudiUniversitiesEn).map((uni) => (
                            <span
                              key={uni}
                              className="bg-paper-inset text-ink border border-ink/30 px-2 py-0.5 rounded text-[11px] font-bold"
                            >
                              {uni}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                <button
                  onClick={() => setExpandedMajorId(isExpanded ? null : major.id)}
                  className="mt-4 pt-3 border-t border-ink/10 w-full text-xs font-bold text-teal hover:text-teal-deep flex items-center justify-between min-h-[44px]"
                >
                  <span>{isExpanded ? (isArabic ? 'إخفاء التفاصيل' : 'Hide Details') : (isArabic ? 'عرض الفرص والجامعات' : 'View Careers & Universities')}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
