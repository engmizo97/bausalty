import { Question, RiasecCategoryInfo, RiasecType } from '../types';

export const RIASEC_CATEGORIES: Record<RiasecType, RiasecCategoryInfo> = {
  R: {
    code: 'R',
    nameEn: 'Realistic',
    nameAr: 'العملي / التطبيقي',
    titleEn: 'The Doers',
    titleAr: 'أصحاب المهارات العملية',
    descriptionEn: 'Enjoys working with hands, tools, machinery, outdoor equipment, and tangible physical objects.',
    descriptionAr: 'يفضل العمل باليدين، والتعامل مع الآلات والمعدات، والأعمال الميدانية والتطبيقية.',
    color: '#1E3A8A', // Royal Blue
    iconName: 'Wrench',
  },
  I: {
    code: 'I',
    nameEn: 'Investigative',
    nameAr: 'الاستكشافي / البحثي',
    titleEn: 'The Thinkers',
    titleAr: 'أصحاب الفكر والبحث العلمي',
    descriptionEn: 'Loves research, analyzing complex problems, scientific inquiry, logic, and mathematics.',
    descriptionAr: 'يهوى البحث العلمي، وحل المشكلات المعقدة، والتفكير التحليلي والمنطقي.',
    color: '#1D4ED8', // Royal Blue Light
    iconName: 'Microscope',
  },
  A: {
    code: 'A',
    nameEn: 'Artistic',
    nameAr: 'الفني / الإبداعي',
    titleEn: 'The Creators',
    titleAr: 'المبدعون والفنانون',
    descriptionEn: 'Thrives in creative expression, visual arts, writing, design, music, and innovative thinking.',
    descriptionAr: 'يبدع في التعبير الفني، والتصميم، والكتابة، والابتكار، والأفكار غير التقليدية.',
    color: '#0284C7', // Sky Blue
    iconName: 'Palette',
  },
  S: {
    code: 'S',
    nameEn: 'Social',
    nameAr: 'الاجتماعي / الخدمي',
    titleEn: 'The Helpers',
    titleAr: 'الموجهون ومقدمو المساعدة',
    descriptionEn: 'Passionate about teaching, advising, helping people, healthcare, and community service.',
    descriptionAr: 'يحب تقديم المساعدة للآخرين، والتعليم، والإرشاد، والرعاية الصحية، والخدمة المجتمعية.',
    color: '#38BDF8', // Sky Blue Light
    iconName: 'HeartHandshake',
  },
  E: {
    code: 'E',
    nameEn: 'Enterprising',
    nameAr: 'القيادي / الريادي',
    titleEn: 'The Persuaders',
    titleAr: 'القادة ورجال الأعمال',
    descriptionEn: 'Excels in leadership, negotiations, entrepreneurship, public speaking, and strategic decisions.',
    descriptionAr: 'يتميز بالقيادة، وإدارة الأعمال، والتفاوض، والتأثير في الآخرين، واتخاذ القرارات.',
    color: '#0369A1', // Sky Blue Dark
    iconName: 'TrendingUp',
  },
  C: {
    code: 'C',
    nameEn: 'Conventional',
    nameAr: 'التنظيمي / الإداري',
    titleEn: 'The Organizers',
    titleAr: 'المنظمون والدقيقون',
    descriptionEn: 'Values accuracy, structured data, financial tracking, compliance, and systematic processes.',
    descriptionAr: 'يهتم بالدقة، والتنظيم، والتخطيط المالي، وإدارة البيانات، والالتزام بالإجراءات.',
    color: '#1E40AF', // Royal Blue Medium
    iconName: 'FileCheck',
  },
};

export const QUESTIONS: Question[] = [
  // --- REALISTIC (R) ---
  {
    id: 1,
    textEn: 'Assemble or repair mechanical or electronic devices.',
    textAr: 'تجميع أو إصلاح الأجهزة الميكانيكية أو الإلكترونية.',
    category: 'R',
  },
  {
    id: 2,
    textEn: 'Work outdoors on physical or environmental projects.',
    textAr: 'العمل في الهواء الطلق والمشاريع الميدانية أو البيئية.',
    category: 'R',
  },
  {
    id: 3,
    textEn: 'Operate specialized machinery, drones, or heavy technical equipment.',
    textAr: 'تشغيل الآلات المتخصصة، أو الطائرات المسيرة (الدورن)، أو المعدات التقنية.',
    category: 'R',
  },
  {
    id: 4,
    textEn: 'Build 3D physical prototypes or structural models.',
    textAr: 'بناء نماذج أولية ملموسة أو مجسمات معمارية ثلاثية الأبعاد.',
    category: 'R',
  },
  {
    id: 5,
    textEn: 'Troubleshoot hardware or physical equipment failures.',
    textAr: 'تشخيص الأعطال الفنية في الأجهزة والمعدات المادية وإصلاحها.',
    category: 'R',
  },
  {
    id: 6,
    textEn: 'Engage in hands-on activities requiring physical precision.',
    textAr: 'ممارسة أنشطة عملية تتطلب دقة يدوية ومهارات تطبيقية.',
    category: 'R',
  },
  {
    id: 7,
    textEn: 'Install, maintain, or inspect solar panels or industrial systems.',
    textAr: 'تركيب وفحص الألواح الشمسية أو الأنظمة الصناعية والميدانية.',
    category: 'R',
  },

  // --- INVESTIGATIVE (I) ---
  {
    id: 8,
    textEn: 'Analyze complex mathematical datasets or scientific research.',
    textAr: 'تحليل البيانات الرياضية المعقدة والأبحاث العلمية.',
    category: 'I',
  },
  {
    id: 9,
    textEn: 'Develop algorithms or conduct artificial intelligence research.',
    textAr: 'تطوير خوارزميات الذكاء الاصطناعي وإجراء الأبحاث المتقدمة.',
    category: 'I',
  },
  {
    id: 10,
    textEn: 'Investigate biological systems or genetic engineering models.',
    textAr: 'دراسة الأنظمة البيولوجية ونماذج الهندسة الوراثية.',
    category: 'I',
  },
  {
    id: 11,
    textEn: 'Solve abstract logical puzzles or theoretical challenges.',
    textAr: 'حل الألغاز المنطقية والتحديات النظرية المعقدة.',
    category: 'I',
  },
  {
    id: 12,
    textEn: 'Conduct laboratory experiments or empirical scientific studies.',
    textAr: 'إجراء التجارب المختبرية والدراسات العلمية التجريبية.',
    category: 'I',
  },
  {
    id: 13,
    textEn: 'Explore astronomical phenomena or space exploration technologies.',
    textAr: 'استكشاف الظواهر الفلكية وتقنيات علوم الفضاء.',
    category: 'I',
  },
  {
    id: 14,
    textEn: 'Perform security vulnerability analysis on complex computer networks.',
    textAr: 'تحليل الثغرات الأمنية في شبكات الحاسوب والأنظمة البرمجية.',
    category: 'I',
  },

  // --- ARTISTIC (A) ---
  {
    id: 15,
    textEn: 'Design visual graphics, UI/UX interfaces, or brand identity concepts.',
    textAr: 'تصميم الجرافيك البصري، واجهات المستخدم (UI/UX)، والهويات البصرية.',
    category: 'A',
  },
  {
    id: 16,
    textEn: 'Write creative stories, scripts, or digital media content.',
    textAr: 'كتابة القصص الإبداعية، والسيناريوهات، وصناعة المحتوى الرقمي.',
    category: 'A',
  },
  {
    id: 17,
    textEn: 'Develop 3D character art, animations, or video game environments.',
    textAr: 'تصميم الشخصيات ثلاثية الأبعاد، والرسوم المتحركة، وعوالم الألعاب الإلكترونية.',
    category: 'A',
  },
  {
    id: 18,
    textEn: 'Create aesthetic architectural concepts or interior spaces.',
    textAr: 'ابتكار المخططات المعمارية الإبداعية والتصاميم الداخلية الجمالية.',
    category: 'A',
  },
  {
    id: 19,
    textEn: 'Produce digital video content, podcasts, or multimedia campaigns.',
    textAr: 'إنتاج مقاطع الفيديو الرقمية، والبودكاست، والحملات الإعلامية.',
    category: 'A',
  },
  {
    id: 20,
    textEn: 'Compose music, audio soundscapes, or sound design elements.',
    textAr: 'تأليف الموسيقى والمؤثرات الصوتية وصناعة المحتوى الصوتي.',
    category: 'A',
  },
  {
    id: 21,
    textEn: 'Brainstorm original artistic themes without rigid guidelines.',
    textAr: 'ابتكار أفكار فنية أصيلة بعيداً عن القواعد أو القيود النمطية.',
    category: 'A',
  },

  // --- SOCIAL (S) ---
  {
    id: 22,
    textEn: 'Mentor and advise students on academic or personal growth.',
    textAr: 'إرشاد وتوجيه الطلاب وتطوير مهاراتهم الأكاديمية والشخصية.',
    category: 'S',
  },
  {
    id: 23,
    textEn: 'Care for patients in healthcare, nursing, or clinical environments.',
    textAr: 'تقديم الرعاية الصحية للمرضى والإشراف الطبي في المستشفيات.',
    category: 'S',
  },
  {
    id: 24,
    textEn: 'Organize community development, volunteer initiatives, or charity work.',
    textAr: 'تنظيم المبادرات المجتمعية والأعمال التطوعية والخيرية.',
    category: 'S',
  },
  {
    id: 25,
    textEn: 'Provide psychological counseling, mental health, or emotional support.',
    textAr: 'تقديم الاستشارات النفسية والدعم الاجتماعي للأفراد والمجموعات.',
    category: 'S',
  },
  {
    id: 26,
    textEn: 'Welcome international visitors and offer authentic hospitality guidance.',
    textAr: 'استقبال السياح والزوار الدوليين وتقديم خدمات الضيافة والإرشاد السياحي.',
    category: 'S',
  },
  {
    id: 27,
    textEn: 'Resolve personal or social conflicts through mediation and dialogue.',
    textAr: 'حل الخلافات الشخصية والاجتماعية من خلال الحوار والوساطة.',
    category: 'S',
  },
  {
    id: 28,
    textEn: 'Teach technical or language skills to diverse groups of learners.',
    textAr: 'تدريب وتعليم المهارات المختلفة لمجموعات متنوعة من المتعلمين.',
    category: 'S',
  },

  // --- ENTERPRISING (E) ---
  {
    id: 29,
    textEn: 'Lead a team to launch an innovative startup or commercial enterprise.',
    textAr: 'قيادة فريق لتأسيس شركة ناشئة أو مشروع تجاري مبتكر.',
    category: 'E',
  },
  {
    id: 30,
    textEn: 'Deliver persuasive sales presentations or public speeches.',
    textAr: 'تقديم العروض التقديمية المؤثرة والإلقاء أمام الجمهور لتسويق الأفكار.',
    category: 'E',
  },
  {
    id: 31,
    textEn: 'Negotiate contracts, partnerships, or strategic business deals.',
    textAr: 'التفاوض على العقود، والشراكات الاستراتيجية، والصفقات التجارية.',
    category: 'E',
  },
  {
    id: 32,
    textEn: 'Manage venture investments, financial assets, or FinTech strategies.',
    textAr: 'إدارة الاستثمارات الجريئة والأصول المالية وتقنيات الفينتك (FinTech).',
    category: 'E',
  },
  {
    id: 33,
    textEn: 'Direct major marketing campaigns or brand growth initiatives.',
    textAr: 'إدارة الحملات التسويقية الكبرى ومبادرات نمو العلامات التجارية.',
    category: 'E',
  },
  {
    id: 34,
    textEn: 'Make critical organizational decisions under tight deadlines.',
    textAr: 'اتخاذ القرارات الإدارية الاستراتيجية تحت ضغط الوقت.',
    category: 'E',
  },
  {
    id: 35,
    textEn: 'Influence policy, lead student unions, or chair executive boards.',
    textAr: 'قيادة المجالس الإدارية والتأثير في صنع القرارات والسياسات.',
    category: 'E',
  },

  // --- CONVENTIONAL (C) ---
  {
    id: 36,
    textEn: 'Maintain precise financial statements, ledgers, or audit logs.',
    textAr: 'إعداد ومراجعة القوائم المالية والسجلات المزدوجة بدقة متناهية.',
    category: 'C',
  },
  {
    id: 37,
    textEn: 'Organize structured databases, filing systems, or inventory catalogs.',
    textAr: 'تنظيم قواعد البيانات، وإدارة الملفات، وفهرسة السجلات بكفاءة.',
    category: 'C',
  },
  {
    id: 38,
    textEn: 'Ensure strict compliance with regulatory, legal, or industry standards.',
    textAr: 'متابعة الالتزام باللوائح والأنظمة القانونية والمعايير القياسية.',
    category: 'C',
  },
  {
    id: 39,
    textEn: 'Manage enterprise resource planning (ERP) systems or workflow schedules.',
    textAr: 'إدارة أنظمة تخطيط الموارد (ERP) وجداول سير العمل الإداري.',
    category: 'C',
  },
  {
    id: 40,
    textEn: 'Conduct systematic quality assurance testing on administrative data.',
    textAr: 'فحص وضمان جودة البيانات والمستندات الإدارية بدقة.',
    category: 'C',
  },
  {
    id: 41,
    textEn: 'Calculate operational budgets, payroll, or tax returns accurately.',
    textAr: 'حساب الميزانيات التشغيلية، والرواتب، والتقارير الضريبية بشكل دقيق.',
    category: 'C',
  },
  {
    id: 42,
    textEn: 'Follow established protocols and standard operating procedures (SOPs).',
    textAr: 'اتباع إجراءات العمل المعيارية (SOPs) والبروتوكولات التنظيمية المعتمدة.',
    category: 'C',
  },
];
