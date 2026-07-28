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

export default function MajorsExplorerPage() {
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
        major.sampleCareersEn.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory =
        selectedCategory === 'ALL' || major.primaryType === selectedCategory;

      // Vision 2030 filter
      const matchesVision2030 = !onlyVision2030 || major.isVision2030;

      return matchesSearch && matchesCategory && matchesVision2030;
    });
  }, [searchTerm, selectedCategory, onlyVision2030]);

  return (
    <div className="flex-1 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#0284C7] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-sky-200">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Saudi Universities & Vision 2030 Catalogue</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Saudi College Majors Explorer
            </h1>

            <p className="text-sky-100 text-base sm:text-lg leading-relaxed">
              Explore academic majors offered across Saudi Arabian universities, categorized by Holland Code (RIASEC) traits and tagged with high-demand Saudi Vision 2030 national development sectors.
            </p>

            <div className="pt-2">
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 bg-white text-[#1E3A8A] hover:bg-sky-50 px-6 py-3 rounded-2xl font-black text-sm shadow-lg transition-transform hover:scale-102"
              >
                <Sparkles className="w-4 h-4 text-[#0284C7]" />
                <span>Match Your Profile with Assessment / ابدأ الاختبار</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search majors, careers, or Holland codes (e.g. Cybersecurity, AI, IRC)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
            />
          </div>

          {/* Category Pills & Vision 2030 Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-slate-100">
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categoriesList.map((catKey) => {
                const isSelected = selectedCategory === catKey;
                const catName = catKey === 'ALL' ? 'All Trait Categories' : RIASEC_CATEGORIES[catKey].nameEn;

                return (
                  <button
                    key={catKey}
                    onClick={() => setSelectedCategory(catKey)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                      isSelected
                        ? 'bg-[#1E3A8A] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {catKey === 'ALL' ? 'All Categories' : `${catKey} - ${catName}`}
                  </button>
                );
              })}
            </div>

            {/* Vision 2030 Toggle */}
            <button
              onClick={() => setOnlyVision2030(!onlyVision2030)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black inline-flex items-center gap-2 transition-all shrink-0 border ${
                onlyVision2030
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Saudi Vision 2030 Only</span>
            </button>

          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-2">
          <span>Showing {filteredMajors.length} of {MAJORS.length} Majors</span>
          {onlyVision2030 && <span className="text-emerald-700">Filter active: Saudi Vision 2030 High Priority</span>}
        </div>

        {/* Majors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMajors.map((major) => {
            const isExpanded = expandedMajorId === major.id;

            return (
              <div
                key={major.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Badges */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold bg-blue-50 text-[#1E3A8A] border border-blue-100 px-2.5 py-1 rounded-lg">
                      Holland Code: {major.riasecCode}
                    </span>

                    {major.isVision2030 && (
                      <span className="text-[10px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>Vision 2030</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                      {major.nameEn}
                    </h3>
                    <p className="text-sm font-bold text-[#0284C7] font-sans">
                      {major.nameAr}
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {major.descriptionEn}
                  </p>

                  {/* Expandable Details */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-100 space-y-3 text-xs">
                      <div>
                        <p className="font-bold text-slate-900 flex items-center gap-1 mb-1">
                          <Briefcase className="w-3.5 h-3.5 text-[#0284C7]" />
                          <span>Sample Careers / الفرص الوظيفية:</span>
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
                          {major.sampleCareersEn.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-bold text-slate-900 flex items-center gap-1 mb-1">
                          <Building className="w-3.5 h-3.5 text-[#1E3A8A]" />
                          <span>Top Saudi Universities / أبرز الجامعات:</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {major.saudiUniversitiesEn.map((uni) => (
                            <span
                              key={uni}
                              className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold"
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
                  className="mt-4 pt-3 border-t border-slate-100 w-full text-xs font-bold text-[#1E3A8A] hover:text-[#0284C7] flex items-center justify-between"
                >
                  <span>{isExpanded ? 'Hide Details' : 'View Careers & Universities'}</span>
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
