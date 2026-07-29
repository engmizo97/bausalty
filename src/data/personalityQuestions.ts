import { PersonalityQuestion } from '../types/personality';

export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
  // --- E vs I (Extraversion vs Introversion) ---
  {
    id: 1,
    textEn: 'After a long week of study, how do you prefer to recharge your energy?',
    textAr: 'بعد أسبوع حافل بالدراسة، كيف تفضل تجديد طاقتك؟',
    dimension: 'EI',
    optionA: {
      labelEn: 'Gathering with friends, group events, and social activities',
      labelAr: 'الاجتماع بالأصدقاء والمشاركة في الأنشطة الفعالية والجماعية',
      trait: 'E',
    },
    optionB: {
      labelEn: 'Quiet personal time, reading, gaming, or individual reflection',
      labelAr: 'قضاء وقت هادئ بمفردي، القراءة، أو ممارسة هواياتي الفردية',
      trait: 'I',
    },
  },
  {
    id: 2,
    textEn: 'When working on complex projects in university:',
    textAr: 'عند العمل على مشروع دراسي معقد في الجامعة:',
    dimension: 'EI',
    optionA: {
      labelEn: 'I enjoy brainstorming ideas out loud in lively team discussions',
      labelAr: 'أستمتع بتداول الأفكار بصوت عالٍ في مناقشات جماعية حيوية',
      trait: 'E',
    },
    optionB: {
      labelEn: 'I prefer thinking through the problem deeply before sharing my thoughts',
      labelAr: 'أفضل التفكير بمفردي بعمق قبل مشاركة أفكاري مع الآخرين',
      trait: 'I',
    },
  },
  {
    id: 3,
    textEn: 'In new environments and conferences:',
    textAr: 'عند التواجد في الفعاليات أو المؤتمرات الجديدة:',
    dimension: 'EI',
    optionA: {
      labelEn: 'I easily initiate conversations with new people and enjoy networking',
      labelAr: 'أبدأ المحادثات بلسهولة مع أفراد جدد وأستمتع ببناء معارف جديدة',
      trait: 'E',
    },
    optionB: {
      labelEn: 'I stick to familiar people or observe quietly before engaging',
      labelAr: 'أفضل البقاء مع المعارف أو الملاحظة بتمهل قبل الانخراط',
      trait: 'I',
    },
  },

  // --- S vs N (Sensing vs Intuition) ---
  {
    id: 4,
    textEn: 'When processing information and learning new subjects:',
    textAr: 'عند تلقي المعرفة واستيعاب الموضوعات الجديدة:',
    dimension: 'SN',
    optionA: {
      labelEn: 'I focus on concrete facts, real-world data, and practical details',
      labelAr: 'أركز على الحقائق الملموسة، البيانات الواقعية، والتفاصيل العملية',
      trait: 'S',
    },
    optionB: {
      labelEn: 'I look for underlying patterns, abstract concepts, and future possibilities',
      labelAr: 'أبحث عن الأنماط الخفية، النظريات، والرؤى المستقبلية المبتكرة',
      trait: 'N',
    },
  },
  {
    id: 5,
    textEn: 'How do you approach solving technical problems?',
    textAr: 'كيف تتعامل مع حل التحديات والمشكلات التقنية؟',
    dimension: 'SN',
    optionA: {
      labelEn: 'Relying on proven step-by-step methods and past experience',
      labelAr: 'الاعتماد على الخطوات المجربة والتجارب السابقة الموثوقة',
      trait: 'S',
    },
    optionB: {
      labelEn: 'Inventing novel, creative solutions and non-traditional approaches',
      labelAr: 'ابتكار أساليب جديدة وغير تقليدية وتجربة رؤى مبتكرة',
      trait: 'N',
    },
  },
  {
    id: 6,
    textEn: 'When describing a scenario to others:',
    textAr: 'عند وصف حدث أو موقف للآخرين:',
    dimension: 'SN',
    optionA: {
      labelEn: 'I describe specific events in literal, detailed sequential order',
      labelAr: 'أصف الأحداث بدقة وتفصيل متسلسل ومباشر',
      trait: 'S',
    },
    optionB: {
      labelEn: 'I summarize the big picture, core ideas, and underlying meanings',
      labelAr: 'أركز على الفكرة العامة، الصورة الكبيرة، والمعاني الجوهرية',
      trait: 'N',
    },
  },

  // --- T vs F (Thinking vs Feeling) ---
  {
    id: 7,
    textEn: 'When making important academic or career decisions:',
    textAr: 'عند اتخاذ القرارات الأكاديمية أو المهنية الهامة:',
    dimension: 'TF',
    optionA: {
      labelEn: 'I analyze objective logic, pros/cons, and data-driven consequences',
      labelAr: 'أعتمد على التحليل المنطقي الحيادي، الموازنة بين الإيجابيات والسلبيات',
      trait: 'T',
    },
    optionB: {
      labelEn: 'I consider personal values, impact on people, and emotional harmony',
      labelAr: 'أراعي القيم الشخصية، الأثر الإنساني، والانسجام مع الآخرين',
      trait: 'F',
    },
  },
  {
    id: 8,
    textEn: 'When giving feedback to team members:',
    textAr: 'عند تقديم الملاحظات والتقييمات لأعضاء الفريق:',
    dimension: 'TF',
    optionA: {
      labelEn: 'I prioritize direct honesty and objective truth over feelings',
      labelAr: 'أفضل الصراحة المباشرة والحقيقة الموضوعية لتحقيق الكفاءة',
      trait: 'T',
    },
    optionB: {
      labelEn: 'I prioritize encouragement, tact, and preserving positive morale',
      labelAr: 'أحرص على اللباقة والتشجيع وتجنب جرح مشاعر الآخرين',
      trait: 'F',
    },
  },
  {
    id: 9,
    textEn: 'What motivates you most in a professional environment?',
    textAr: 'ما الذي يمنحك أعلى درجات الدافعية في العمل؟',
    dimension: 'TF',
    optionA: {
      labelEn: 'Mastering challenging skills and executing efficient logic',
      labelAr: 'إتقان المهارات الصعبة وتحقيق نتائج خوارزمية عالية الدقة',
      trait: 'T',
    },
    optionB: {
      labelEn: 'Helping others thrive and contributing to meaningful community impact',
      labelAr: 'مساعدة الآخرين وإحداث أثر إيجابي ومعنوي في المجتمع',
      trait: 'F',
    },
  },

  // --- J vs P (Judging vs Perceiving) ---
  {
    id: 10,
    textEn: 'How do you structure your daily workflow and schedule?',
    textAr: 'كيف تنظم جدولك اليومي وسير أعمالك؟',
    dimension: 'JP',
    optionA: {
      labelEn: 'I maintain organized to-do lists, clear deadlines, and structured plans',
      labelAr: 'ألتزم بقوائم مهام محددة، وجدول زمني منظم، وخطط واضحة',
      trait: 'J',
    },
    optionB: {
      labelEn: 'I prefer flexibility, spontaneous options, and adapting as I go',
      labelAr: 'أفضل المرونة، والخيارات المفتوحة، والتكيف التلقائي حسب المستجدات',
      trait: 'P',
    },
  },
  {
    id: 11,
    textEn: 'When working on university assignments due in two weeks:',
    textAr: 'عند وجود واجبات أو مشاريع جامعية موعد تسليمها بعد أسبوعين:',
    dimension: 'JP',
    optionA: {
      labelEn: 'I divide the work early and finish ahead of deadline to avoid stress',
      labelAr: 'أقسم العمل مبكراً وأنهيه قبل الموعد لإنجاز المهمة بهدوء',
      trait: 'J',
    },
    optionB: {
      labelEn: 'I work best under pressure closer to the deadline with bursts of energy',
      labelAr: 'أعمل بكفاءة عالية تحت ضغط الوقت مع اقتراب الموعد النهائي',
      trait: 'P',
    },
  },
  {
    id: 12,
    textEn: 'Regarding unexpected changes in travel or project plans:',
    textAr: 'عند حدوث تغييرات غير متوقعة في الخطط أو السفر:',
    dimension: 'JP',
    optionA: {
      labelEn: 'I feel uncomfortable when plans change suddenly and prefer predictability',
      labelAr: 'أشعر بعدم الملاءمة عند تغير الخطط فجأة وأفضل الانضباط المسبق',
      trait: 'J',
    },
    optionB: {
      labelEn: 'I easily embrace unexpected changes and view them as exciting adventures',
      labelAr: 'أتأقلم بسرعة مع التغيرات وأراها فرصة للاستكشاف والمرونة',
      trait: 'P',
    },
  },
];
