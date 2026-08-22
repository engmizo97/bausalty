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
 * Generates an official, beautifully styled Arabic PDF report for RIASEC Holland Code Assessment
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
            <span class="trait-name">${info.nameAr} (${code})</span>
            <span class="trait-score">${score}%</span>
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
      const careers = (major.sampleCareersAr || major.sampleCareersEn || []).slice(0, 3).join('، ');
      const unis = (major.saudiUniversitiesAr || major.saudiUniversitiesEn || []).slice(0, 3).join('، ');

      return `
        <div class="major-card">
          <div class="major-header">
            <span class="major-title">${idx + 1}. ${major.nameAr || major.nameEn}</span>
            <span class="match-badge">توافق ${major.matchScore}%</span>
          </div>
          <div class="major-meta">
            ${careers ? `<p><strong>المسارات المهنية والوظائف:</strong> ${careers}</p>` : ''}
            ${unis ? `<p><strong>الجامعات السعودية المتاحة:</strong> ${unis}</p>` : ''}
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
    size: A4;
    margin: 14mm 16mm 14mm 16mm;
    @bottom-center {
      content: "منصة بوصلتي • مجموعة تحسين للذكاء الاصطناعي | صفحة " counter(page) " من " counter(pages);
      font-family: 'Noto Naskh Arabic', serif;
      font-size: 8.5pt;
      color: #8a7a5f;
    }
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Noto Naskh Arabic', 'Noto Sans Arabic', serif;
    color: #3a2f21;
    background-color: #ffffff;
    line-height: 1.55;
    font-size: 10pt;
  }
  .header {
    background: #0d9488;
    color: #ffffff;
    padding: 16px 20px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    border: 2px solid #3a2f21;
  }
  .header-text h1 {
    font-size: 18pt;
    font-weight: 700;
    margin-bottom: 4px;
    color: #ffffff;
  }
  .header-text p {
    font-size: 9.5pt;
    color: #e6fffa;
  }
  .logo-box {
    width: 52px;
    height: 52px;
    border-radius: 10px;
    background: #ffffff;
    border: 2px solid #3a2f21;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .student-box {
    background: #f8f6fc;
    border: 1.5px solid #3a2f21;
    border-radius: 10px;
    padding: 12px 16px;
    margin-bottom: 18px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 16px;
    font-size: 9.5pt;
  }
  .student-box div {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed rgba(58,47,33,0.15);
    padding-bottom: 3px;
  }
  .student-box div:last-child {
    border-bottom: none;
  }
  .student-box strong {
    color: #0d9488;
    font-weight: 700;
  }
  .section-title {
    font-size: 12pt;
    font-weight: 700;
    color: #3a2f21;
    border-bottom: 2px solid #0d9488;
    padding-bottom: 4px;
    margin-top: 14px;
    margin-bottom: 12px;
  }
  .trait-row {
    margin-bottom: 8px;
    background: #ffffff;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid rgba(58,47,33,0.12);
  }
  .trait-row.primary-trait {
    background: #fff8e1;
    border: 1.5px solid #ffd66e;
  }
  .trait-header {
    display: flex;
    justify-content: space-between;
    font-size: 9pt;
    font-weight: 700;
    margin-bottom: 3px;
  }
  .bar-container {
    height: 7px;
    background: #ede5f7;
    border-radius: 4px;
    overflow: hidden;
  }
  .bar-fill {
    height: 100%;
    background: #0d9488;
    border-radius: 4px;
  }
  .trait-row.primary-trait .bar-fill {
    background: #d97706;
  }
  .major-card {
    background: #ffffff;
    border: 1.5px solid #3a2f21;
    border-radius: 10px;
    padding: 10px 14px;
    margin-bottom: 9px;
    box-shadow: 2px 2px 0px rgba(58,47,33,0.1);
    page-break-inside: avoid;
  }
  .major-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }
  .major-title {
    font-weight: 700;
    font-size: 10pt;
    color: #3a2f21;
  }
  .match-badge {
    background: #0d9488;
    color: #ffffff;
    font-size: 8pt;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 6px;
  }
  .major-meta p {
    font-size: 8.5pt;
    color: #5c4f3a;
    margin-top: 2px;
  }
  .vision-box {
    margin-top: 14px;
    background: #f4eefb;
    border: 1.5px dashed #7c3aed;
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 8.5pt;
    color: #4c1d95;
    page-break-inside: avoid;
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
  ${categoryRows}

  <div class="section-title">٢. التخصصات الجامعية السعودية الأكثر توافقاً مع قدراتك</div>
  ${majorsRows}

  <div class="vision-box">
    <strong>🇸🇦 موائمة رؤية المملكة ٢٠٣٠ وبرنامج تنمية القدرات البشرية:</strong>
    تتوافق التوصيات المذكورة أعلاه مع متطلبات سوق العمل السعودي الحديث والقطاعات الوطنية الواعدة (الذكاء الاصطناعي، الأمن السيبراني، الطاقة المتجددة، التقنية المالية، والسياحة).
  </div>

</body>
</html>`;

  return renderHtmlToPdf(html);
}

/**
 * Generates an official, beautifully styled Arabic PDF report for 16Personalities Assessment
 */
export function generatePersonalityPdf(result: PersonalityResult, userName: string = 'طالب بوصلتي'): Buffer {
  const logoData = getLogoBase64();
  const dateStr = new Date(result.completedAt || Date.now()).toLocaleDateString('ar-SA');

  const dims = [
    {
      title: 'الانفتاح الاجتماعي (E) مقابل الانطواء والتركيز الداخلي (I)',
      val1: `انفتاح: ${result.percentages.EI.E}%`,
      val2: `انطواء: ${result.percentages.EI.I}%`,
      percent: result.percentages.EI.E,
    },
    {
      title: 'الواقعية والتفاصيل (S) مقابل الحدس والرؤية المستقبلية (N)',
      val1: `واقعي: ${result.percentages.SN.S}%`,
      val2: `حدسي: ${result.percentages.SN.N}%`,
      percent: result.percentages.SN.S,
    },
    {
      title: 'التفكير والمنطق (T) مقابل المشاعر والقيم (F)',
      val1: `منطقي: ${result.percentages.TF.T}%`,
      val2: `عاطفي: ${result.percentages.TF.F}%`,
      percent: result.percentages.TF.T,
    },
    {
      title: 'التنظيم والحسم (J) مقابل المرونة والاستكشاف (P)',
      val1: `حازم: ${result.percentages.JP.J}%`,
      val2: `مرن: ${result.percentages.JP.P}%`,
      percent: result.percentages.JP.J,
    },
  ];

  const dimRows = dims
    .map((d) => `
      <div class="trait-row">
        <div class="trait-header">
          <span class="trait-name">${d.title}</span>
          <span class="trait-score">${d.val1} | ${d.val2}</span>
        </div>
        <div class="bar-container">
          <div class="bar-fill" style="width: ${Math.max(d.percent, 5)}%;"></div>
        </div>
      </div>
    `)
    .join('');

  const strengths = (result.archetype?.strengthsAr || result.archetype?.strengthsEn || []).join(' • ');
  const learningStyle = result.archetype?.learningStyleAr || result.archetype?.learningStyleEn || '';
  const majors = (result.archetype?.linkedMajorsAr || result.archetype?.linkedMajorsEn || []).slice(0, 5);

  const majorsHtml = majors
    .map((m, idx) => `<li style="margin-bottom: 4px;"><strong>${idx + 1}.</strong> ${m}</li>`)
    .join('');

  const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<style>
  @page {
    size: A4;
    margin: 14mm 16mm 14mm 16mm;
    @bottom-center {
      content: "منصة بوصلتي • تقرير تحليل الشخصية ومواءمة التخصصات | صفحة " counter(page) " من " counter(pages);
      font-family: 'Noto Naskh Arabic', serif;
      font-size: 8.5pt;
      color: #8a7a5f;
    }
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Noto Naskh Arabic', 'Noto Sans Arabic', serif;
    color: #3a2f21;
    background-color: #ffffff;
    line-height: 1.55;
    font-size: 10pt;
  }
  .header {
    background: #7c3aed;
    color: #ffffff;
    padding: 16px 20px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    border: 2px solid #3a2f21;
  }
  .header-text h1 {
    font-size: 18pt;
    font-weight: 700;
    margin-bottom: 4px;
    color: #ffffff;
  }
  .header-text p {
    font-size: 9.5pt;
    color: #f5efff;
  }
  .logo-box {
    width: 52px;
    height: 52px;
    border-radius: 10px;
    background: #ffffff;
    border: 2px solid #3a2f21;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .student-box {
    background: #f8f6fc;
    border: 1.5px solid #3a2f21;
    border-radius: 10px;
    padding: 12px 16px;
    margin-bottom: 18px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 16px;
    font-size: 9.5pt;
  }
  .student-box div {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed rgba(58,47,33,0.15);
    padding-bottom: 3px;
  }
  .student-box div:last-child {
    border-bottom: none;
  }
  .student-box strong {
    color: #7c3aed;
    font-weight: 700;
  }
  .section-title {
    font-size: 12pt;
    font-weight: 700;
    color: #3a2f21;
    border-bottom: 2px solid #7c3aed;
    padding-bottom: 4px;
    margin-top: 14px;
    margin-bottom: 12px;
  }
  .trait-row {
    margin-bottom: 8px;
    background: #ffffff;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid rgba(58,47,33,0.12);
  }
  .trait-header {
    display: flex;
    justify-content: space-between;
    font-size: 9pt;
    font-weight: 700;
    margin-bottom: 3px;
  }
  .bar-container {
    height: 7px;
    background: #ede5f7;
    border-radius: 4px;
    overflow: hidden;
  }
  .bar-fill {
    height: 100%;
    background: #7c3aed;
    border-radius: 4px;
  }
  .info-card {
    background: #ffffff;
    border: 1.5px solid #3a2f21;
    border-radius: 10px;
    padding: 12px 16px;
    margin-bottom: 12px;
    page-break-inside: avoid;
  }
  .info-card h3 {
    font-size: 10.5pt;
    color: #7c3aed;
    margin-bottom: 6px;
  }
  .info-card p {
    font-size: 9pt;
    color: #5c4f3a;
    line-height: 1.6;
  }
  .majors-list {
    list-style: none;
    padding-right: 0;
  }
  .majors-list li {
    background: #f8f6fc;
    border: 1px solid #dccfe8;
    padding: 6px 12px;
    border-radius: 8px;
    margin-bottom: 6px;
    font-size: 9pt;
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
  ${dimRows}

  <div class="section-title">٢. نقاط القوة وأسلوب التعلم المثالي</div>
  <div class="info-card">
    <h3>أبرز السمات ونقاط القوة الشخصية:</h3>
    <p>${strengths || 'التحليل السريع، التفكير المنطقي، إدارة المواقف الميدانية والحلول الابتكارية.'}</p>
  </div>

  <div class="info-card">
    <h3>بيئة وأسلوب التعلّم الأنسب:</h3>
    <p>${learningStyle || 'يتعلم بشكل أفضل من خلال التطبيق العملي والمشاريع الواقعية والتفاعل المباشر.'}</p>
  </div>

  <div class="section-title">٣. التخصصات والمسارات الجامعية المتوافقة مع طبيعة نمطك</div>
  <ul class="majors-list">
    ${majorsHtml}
  </ul>

</body>
</html>`;

  return renderHtmlToPdf(html);
}
