import React from 'react';
import Link from 'next/link';
import { Compass, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#0284C7] flex items-center justify-center text-white shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">Bausalty</span>
                <span className="text-lg font-bold text-[#38BDF8] ml-2">بوصالتي</span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Bausalty is an AI-powered Holland Code (RIASEC) personality-to-college-major alignment engine built for Saudi high school and university students, empowering decisions aligned with Saudi Vision 2030.
            </p>
            <p className="text-slate-400 text-sm dir-rtl font-sans leading-relaxed max-w-md">
              بوصالتي هي محرك ذكاء اصطناعي لمطابقة الشخصية والأكواد الهولندية (RIASEC) مع التخصصات الجامعية للطلاب في المملكة العربية السعودية بما يتوافق مع رؤية السعودية 2030.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-[#38BDF8]">
              <span>Part of Tahseen AI Group</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span>مجموعة تحسين للذكاء الاصطناعي</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links / روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#38BDF8] transition-colors">
                  Home (الرئيسية)
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="hover:text-[#38BDF8] transition-colors">
                  RIASEC Assessment (الاختبار)
                </Link>
              </li>
              <li>
                <Link href="/majors" className="hover:text-[#38BDF8] transition-colors">
                  Majors Explorer (مستكشف التخصصات)
                </Link>
              </li>
            </ul>
          </div>

          {/* Vision 2030 & Accreditation */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Saudi Vision 2030 Alignment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed to support the Human Capability Development Program (HCDP) across cybersecurity, AI, renewable energy, and tourism sectors.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>رؤية السعودية 2030 | Vision 2030</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Bausalty (بوصالتي). All rights reserved. Tahseen AI Group.</p>
          <div className="flex items-center gap-1">
            <span>Engineered with passion for Saudi Youth</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
