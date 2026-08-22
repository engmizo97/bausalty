import { execFileSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { AssessmentResult, RiasecType } from '../types';
import { PersonalityResult } from '../types/personality';
import { RIASEC_CATEGORIES } from '../data/questions';

function getLogoBase64(): string {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    if (fs.existsSync(logoPath)) {
      const buffer = fs.readFileSync(logoPath);
      return `data:image/png;base64,${buffer.toString('base64')}`;
    }
  } catch (e) {
    console.error('Error loading logo for PDF:', e);
  }
  return '';
}

function renderHtmlToPdf(html: string): Buffer {
  try {
    return execFileSync('/usr/local/bin/weasyprint', ['-', '-'], {
      input: Buffer.from(html, 'utf-8'),
      maxBuffer: 20 * 1024 * 1024,
      timeout: 15000,
    });
  } catch (err) {
    console.error('WeasyPrint execution error:', err);
    throw new Error('Failed to render PDF using WeasyPrint');
  }
}

/**
 * Generates a sleek, single-page official Arabic PDF report for RIASEC Holland Code Assessment
 */
export function generateRiasecPdf(result: AssessmentResult, userName: string = 'طالب بوصلتي'): Buffer {
  const logoData = getLogoBase64();
  const dateStr = new Date(result.completedAt || Date.now()).toLocaleDateString('ar-SA');
  const categories: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  const categoryRows = categories
    .map((code) => {
      const info = RIASEC_CATEGORIES[code];
      const score = result.normalizedScores[code] || 0;
      const isPrimary = result.primaryType === code;

      return `
        <div class="trait-row ${isPrimary ? 'primary-trait' : ''}">
          <div class="trait-header">
            <span>${info.nameAr} (${code})</span>
            <span>${score}%</span>
          </div>
          <div class="bar-container">
            <div class="bar-fill" style="width: ${Math.max(score, 4)}%;"></div>
          </div>
        </div>
      `;
    })
    .join('');

  const majorsRows = result.matchingMajors
    .slice(0, 5)
    .map((major, idx) => {
      const careers = (major.sampleCareersAr || major.sampleCareersEn || []).slice(0, 2).join('، ');
      const unis = (major.saudiUniversitiesAr || major.saudiUniversitiesEn || []).slice(0, 2).join('، ');

      return `
        <div class="major-card">
          <div class="major-header">
            <span class="major-title">${idx + 1}. ${major.nameAr || major.nameEn}</span>
            <span class="match-badge">توافق ${major.matchScore}%</span>
          </div>
          <div class="major-meta">
            ${careers ? `<p><strong>المسارات:</strong> ${careers}</p>` : ''}
            ${unis ? `<p><strong>الجامعات:</strong> ${unis}</p>` : ''}
          </div>
        </div>
      `;
    })
    .join('');

  const primaryInfo = RIASEC_CATEGORIES[result.primaryType];

  const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<style>
  @page {
    size: A4 portrait;
    margin: 8mm 12mm 8mm 12mm;
    @bottom-center {
      content: "منصة بوصلتي • مجموعة تحسين للذكاء الاصطناعي | تقرير رسمي معتمد";
      font-family: 'Noto Naskh Arabic', serif;
      font-size: 8pt;
      color: #8a7a5f;
    }
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Noto Naskh Arabic', 'Noto Sans Arabic', serif;
    color: #3a2f21;
    background-color: #ffffff;
    line-height: 1.35;
    font-size: 9pt;
  }
  .header {
    background: #0d9488;
    color: #ffffff;
    padding: 10px 14px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    border: 1.5px solid #3a2f21;
  }
  .header-text h1 {
    font-size: 15pt;
    font-weight: 700;
    margin-bottom: 2px;
    color: #ffffff;
  }
  .header-text p {
    font-size: 8.5pt;
    color: #e6fffa;
  }
  .logo-box {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    background: #ffffff;
    border: 1.5px solid #3a2f21;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .logo-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .student-box {
    background: #faf6ea;
    border: 1.5px solid #3a2f21;
    border-radius: 8px;
    padding: 8px 12px;
    margin-bottom: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 16px;
    font-size: 8.5pt;
  }
  .student-box div {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed rgba(58,47,33,0.15);
    padding-bottom: 2px;
  }
  .student-box div:last-child { border-bottom: none; }
  .student-box strong { color: #0d9488; font-weight: 700; }
  .section-title {
    font-size: 10pt;
    font-weight: 700;
    color: #3a2f21;
    border-bottom: 1.5px solid #0d9488;
    padding-bottom: 2px;
    margin-top: 8px;
    margin-bottom: 6px;
  }
  .traits-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px 10px;
    margin-bottom: 8px;
  }
  .trait-row {
    background: #ffffff;
    padding: 4px 8px;
    border-radius: 6px;
    border: 1px solid rgba(58,47,33,0.15);
  }
  .trait-row.primary-trait {
    background: #fff8e1;
    border: 1.5px solid #ffd66e;
  }
  .trait-header {
    display: flex;
    justify-content: space-between;
    font-size: 8pt;
    font-weight: 700;
    margin-bottom: 2px;
  }
  .bar-container {
    height: 5px;
    background: #ede5f7;
    border-radius: 3px;
    overflow: hidden;
  }
  .bar-fill {
    height: 100%;
    background: #0d9488;
    border-radius: 3px;
  }
  .trait-row.primary-trait .bar-fill { background: #d97706; }
  .major-card {
    background: #ffffff;
    border: 1px solid #3a2f21;
    border-radius: 8px;
    padding: 5px 10px;
    margin-bottom: 5px;
  }
  .major-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2px;
  }
  .major-title {
    font-weight: 700;
    font-size: 9pt;
    color: #3a2f21;
  }
  .match-badge {
    background: #0d9488;
    color: #ffffff;
    font-size: 7.5pt;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 4px;
  }
  .major-meta p {
    font-size: 7.5pt;
    color: #5c4f3a;
    line-height: 1.25;
  }
  .vision-box {
    margin-top: 6px;
    background: #f4eefb;
    border: 1px dashed #7c3aed;
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 7.5pt;
    color: #4c1d95;
    line-height: 1.35;
  }
</style>
</head>
<body>
  <div class="header">
    <div class="header-text">
      <h1>تقرير بوصلتي لتحديد الميول والتخصصات</h1>
      <p>مقياس هولاند العالمي المعتمد (RIASEC) • مواءمة التخصصات السعودية ورؤية 2030</p>
    </div>
    ${logoData ? `<div class="logo-box"><img src="${logoData}" alt="Logo" /></div>` : ''}
  </div>

  <div class="student-box">
    <div><span>اسم الطالب:</span><strong>${userName}</strong></div>
    <div><span>تاريخ الاختبار:</span><strong>${dateStr}</strong></div>
    <div><span>رمز النمط المهني:</span><strong>${result.topCode}</strong></div>
    <div><span>النمط السائد:</span><strong>${primaryInfo?.nameAr || result.primaryType}</strong></div>
  </div>

  <div class="section-title">١. تفصيل أبعاد الميول والسمات الستة (RIASEC)</div>
  <div class="traits-grid">
    ${categoryRows}
  </div>

  <div class="section-title">٢. التخصصات الجامعية السعودية الأكثر توافقاً مع قدراتك</div>
  ${majorsRows}

  <div class="vision-box">
    <strong>🇸🇦 موائمة رؤية المملكة ٢٠٣٠ وبرنامج تنمية القدرات البشرية:</strong> تتوافق التوصيات المذكورة أعلاه مع متطلبات سوق العمل السعودي الحديث والقطاعات الوطنية الواعدة (الذكاء الاصطناعي، الأمن السيبراني، الطاقة المتجددة، والتقنية المالية).
  </div>
</body>
</html>`;

  return renderHtmlToPdf(html);
}

/**
 * Generates a sleek, single-page official Arabic PDF report for 16Personalities Assessment
 */
export function generatePersonalityPdf(result: PersonalityResult, userName: string = 'طالب بوصلتي'): Buffer {
  const logoData = getLogoBase64();
  const dateStr = new Date(result.completedAt || Date.now()).toLocaleDateString('ar-SA');

  const dims = [
    {
      title: 'الانفتاح (E) / الانطواء (I)',
      val: `${result.percentages.EI.E}% E / ${result.percentages.EI.I}% I`,
      percent: result.percentages.EI.E,
    },
    {
      title: 'الواقعية (S) / الحدس (N)',
      val: `${result.percentages.SN.S}% S / ${result.percentages.SN.N}% N`,
      percent: result.percentages.SN.S,
    },
    {
      title: 'التفكير (T) / المشاعر (F)',
      val: `${result.percentages.TF.T}% T / ${result.percentages.TF.F}% F`,
      percent: result.percentages.TF.T,
    },
    {
      title: 'الحزم (J) / المرونة (P)',
      val: `${result.percentages.JP.J}% J / ${result.percentages.JP.P}% P`,
      percent: result.percentages.JP.J,
    },
  ];

  const dimRows = dims
    .map((d) => `
      <div class="trait-row">
        <div class="trait-header">
          <span>${d.title}</span>
          <span>${d.val}</span>
        </div>
        <div class="bar-container">
          <div class="bar-fill" style="width: ${Math.max(d.percent, 5)}%;"></div>
        </div>
      </div>
    `)
    .join('');

  const strengths = (result.archetype?.strengthsAr || result.archetype?.strengthsEn || []).join(' • ');
  const learningStyle = result.archetype?.learningStyleAr || result.archetype?.learningStyleEn || '';
  const majors = (result.archetype?.linkedMajorsAr || result.archetype?.linkedMajorsEn || []).slice(0, 4);

  const majorsHtml = majors
    .map((m, idx) => `<li><strong>${idx + 1}.</strong> ${m}</li>`)
    .join('');

  const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<style>
  @page {
    size: A4 portrait;
    margin: 8mm 12mm 8mm 12mm;
    @bottom-center {
      content: "منصة بوصلتي • تقرير تحليل الشخصية ومواءمة التخصصات | تقرير رسمي معتمد";
      font-family: 'Noto Naskh Arabic', serif;
      font-size: 8pt;
      color: #8a7a5f;
    }
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Noto Naskh Arabic', 'Noto Sans Arabic', serif;
    color: #3a2f21;
    background-color: #ffffff;
    line-height: 1.35;
    font-size: 9pt;
  }
  .header {
    background: #7c3aed;
    color: #ffffff;
    padding: 10px 14px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    border: 1.5px solid #3a2f21;
  }
  .header-text h1 { font-size: 15pt; font-weight: 700; margin-bottom: 2px; color: #ffffff; }
  .header-text p { font-size: 8.5pt; color: #f5efff; }
  .logo-box { width: 44px; height: 44px; border-radius: 8px; background: #ffffff; border: 1.5px solid #3a2f21; overflow: hidden; flex-shrink: 0; }
  .logo-box img { width: 100%; height: 100%; object-fit: cover; }
  .student-box {
    background: #faf6ea;
    border: 1.5px solid #3a2f21;
    border-radius: 8px;
    padding: 8px 12px;
    margin-bottom: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 16px;
    font-size: 8.5pt;
  }
  .student-box div { display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(58,47,33,0.15); padding-bottom: 2px; }
  .student-box div:last-child { border-bottom: none; }
  .student-box strong { color: #7c3aed; font-weight: 700; }
  .section-title {
    font-size: 10pt;
    font-weight: 700;
    color: #3a2f21;
    border-bottom: 1.5px solid #7c3aed;
    padding-bottom: 2px;
    margin-top: 8px;
    margin-bottom: 6px;
  }
  .traits-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px 10px;
    margin-bottom: 8px;
  }
  .trait-row {
    background: #ffffff;
    padding: 4px 8px;
    border-radius: 6px;
    border: 1px solid rgba(58,47,33,0.15);
  }
  .trait-header {
    display: flex;
    justify-content: space-between;
    font-size: 8pt;
    font-weight: 700;
    margin-bottom: 2px;
  }
  .bar-container { height: 5px; background: #ede5f7; border-radius: 3px; overflow: hidden; }
  .bar-fill { height: 100%; background: #7c3aed; border-radius: 3px; }
  .info-card {
    background: #ffffff;
    border: 1px solid #3a2f21;
    border-radius: 8px;
    padding: 7px 12px;
    margin-bottom: 6px;
  }
  .info-card h3 { font-size: 9pt; color: #7c3aed; margin-bottom: 3px; }
  .info-card p { font-size: 8pt; color: #5c4f3a; line-height: 1.35; }
  .majors-list { list-style: none; padding-right: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 4px 8px; }
  .majors-list li {
    background: #f8f6fc;
    border: 1px solid #dccfe8;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 8pt;
  }
</style>
</head>
<body>
  <div class="header">
    <div class="header-text">
      <h1>تقرير تحليل نمط الشخصية وأسلوب التعلم</h1>
      <p>نموذج الأنماط الستة عشر (16Personalities / MBTI) • منصة بوصلتي</p>
    </div>
    ${logoData ? `<div class="logo-box"><img src="${logoData}" alt="Logo" /></div>` : ''}
  </div>

  <div class="student-box">
    <div><span>اسم الطالب:</span><strong>${userName}</strong></div>
    <div><span>تاريخ الاختبار:</span><strong>${dateStr}</strong></div>
    <div><span>رمز نمط الشخصية:</span><strong>${result.code} - ${result.archetype?.titleAr || result.archetype?.titleEn}</strong></div>
    <div><span>المجموعة:</span><strong>${result.archetype?.groupAr || result.archetype?.groupEn || 'المستكشفون'}</strong></div>
  </div>

  <div class="section-title">١. تفصيل محاور وأبعاد الشخصية الأربعة</div>
  <div class="traits-grid">
    ${dimRows}
  </div>

  <div class="section-title">٢. نقاط القوة وأسلوب التعلم المثالي</div>
  <div class="info-card">
    <h3>أبرز السمات ونقاط القوة الشخصية:</h3>
    <p>${strengths || 'التحليل السريع، التفكير المنطقي، إدارة المواقف الميدانية والحلول الابتكارية والتفاوض الفعال.'}</p>
  </div>
  <div class="info-card">
    <h3>بيئة وأسلوب التعلّم الأنسب:</h3>
    <p>${learningStyle || 'يتعلم بشكل أفضل من خلال التطبيق العملي والمشاريع الواقعية والتفاعل المباشر وحل التحديات الفورية.'}</p>
  </div>

  <div class="section-title">٣. التخصصات والمسارات الجامعية المتوافقة مع طبيعة نمطك</div>
  <ul class="majors-list">
    ${majorsHtml}
  </ul>
</body>
</html>`;

  return renderHtmlToPdf(html);
}
