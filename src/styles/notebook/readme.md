# قدرات AI — Design System

**قدرات AI** (Qudurat AI) is an AI-powered prep platform for Saudi Arabia's Qudurat (GAT/قياس) and Tahsili exams, built for high-school students. A product of شركة تحسين للذكاء الاصطناعي (Tahseen AI), Riyadh. Students practice thousands of questions from the latest تجميعات (question collections), get step-by-step AI explanations, adaptive weak-point drills, mock timed tests, and a gamified XP/levels system. Domain: quduratai.com.

## Sources
- **Landing page (ground truth for ALL visual design):** `uploads/Agent_LP/index.html` — the hand-crafted "smart notebook" landing page. Every component in this system derives its styling from it.
- **Product codebase (screen & feature inventory):** https://github.com/w0lak/Qudurat — React/Vite monorepo (`apps/web`). Pages: Home/Landing, Auth (Login/Register/Forgot/Reset), Onboarding, Dashboard, Practice, Latest Collections, Timed Test, Learn-by-Play (lessons + boss battles), Study Plan, Weak Area Drill, Reports, Leaderboard, Profile, Subscription/Checkout — plus an admin area (explicitly out of scope). Explore the repo for exact copy, flows, and the XP/rank logic (`apps/web/src/lib/levels.ts`).

Note: the shipped app currently uses a generic purple/teal Tailwind theme; per the owner's direction this design system **re-bases the whole website on the notebook aesthetic of the landing page**. See `DESIGN.md` for the full per-page spec.

## The big idea: الدفتر الذكي (the smart notebook)
The entire product is styled as a student's paper notebook that came alive: cream ruled paper, a red margin line, ink-drawn borders, hard offset shadows like marker ink, yellow highlighter strokes, sticky notes, washi tape, and a slightly rotated, hand-placed feel. AI moments are always purple; actions are always teal; celebration is yellow.

## CONTENT FUNDAMENTALS
- **Language:** Arabic only, RTL everywhere. English appears only in the brand suffix "AI", URLs, and emails (wrapped in `dir="ltr"`).
- **Numerals:** Eastern Arabic numerals (٠١٢٣٤٥٦٧٨٩) for ALL user-facing numbers — scores, prices, counters, timers, dates (Hijri year ١٤٤٧). Convert programmatically; never show 0-9.
- **Voice:** warm Saudi-dialect friendliness on top of MSA. Conversational contractions: «خلّ», «شوف», «يلا», «وين تقف», «ما عدت أذاكر عشوائي». Direct address in the singular: «طريقك», «نقاط ضعفك», «كأن معك مدرس خصوصي».
- **Tone:** encouraging coach, never scolding. Mistakes are framed as focus areas («ركّز هنا»). Motivational bursts on success: «أحسنت! 👏», «عبقري! 🧠», «ما شاء الله! 🤩».
- **Emoji:** yes — used sparingly as reward/energy markers (⚡💪🏆✏️🔥), mostly at the end of a phrase, and in gamification feedback. Never in formal/legal copy.
- **Metaphor language:** the notebook runs through copy — sections are «الصفحة ٢ من الدفتر», loading is «جاري فتح الدفتر…», the team is «الفريق وراء الدفتر».
- **Headlines:** short, punchy, with one highlighted word: «لا تذاكر أكثر.. ذاكر أذكى». Two-part contrast is a recurring pattern.
- **CTAs:** imperative + benefit: «أنشئ حسابك مجاناً ←», «سجّل مجاناً الآن ←». The left-arrow ← points in the RTL reading direction.

## VISUAL FOUNDATIONS
- **Color:** cream paper `#fbf6ea` page, `#fffdf6` cards, dark-brown ink `#3a2f21` (never pure black). Teal `#0d9488` = primary action. Yellow `#ffd66e` = highlighter/secondary CTA/sticky notes. Purple `#7c3aed` = reserved exclusively for AI features. Orange `#c2410c` = page numbers, "popular" stamps, alerts. Max 1–2 background colors per screen (paper + one dark CTA box `--ink`).
- **Type:** Marhey (display headings, big numbers, sticky-note handwriting) / Baloo Bhaijaan 2 (UI, buttons, labels — the default) / Noto Naskh Arabic (long-form prose, question text, line-height 2). Headings need line-height ≥1.4 or Arabic ascenders clip.
- **Borders:** 2px solid ink on every card/button; 2px dashed for dividers, nav border, footer links, pills; 1.5px dashed accent for tags & AI hint boxes.
- **Shadows:** hard offset only, NEVER blurred: `2.5px 2.5px 0` (small controls) → `6px 6px 0` (hero cards). Shadow color is ink or rgba(58,47,33,.3–.9).
- **Corner radii:** sticky notes/stamps 4px, inputs 10px, buttons 12–14px, cards 18–20px, pills 999px.
- **Rotation:** hand-placed feel — cards rotate ±0.5–2°, sticky notes −3…−4°, tags −1°. Hover usually straightens to 0°.
- **Backgrounds:** fixed ruled-line pattern (teal line every 36px) + fixed red margin line at right:60px + animated SVG grain at 5% opacity. Decorative parallax doodles (plus signs, dashed circles, squiggles) in accent colors at 35–55% opacity.
- **Hover:** buttons translate INTO their shadow (translate(-1px,2px) + shadow shrinks) — a "press into paper" effect; cards lift −6…−8px and straighten; options nudge −4px in reading direction.
- **Press:** scale ~0.95.
- **Motion:** GSAP-style: word-by-word headline reveals rising from below (stagger .06–.07), y+opacity reveals on scroll, `back.out` overshoot for playful pops (sticky notes, mascot), infinite gentle float (±12px, 2.4s sine) on mascot/cards, marquee ticker on yellow band. Respect `prefers-reduced-motion`.
- **Cards:** paper-white fill, 2px ink border, hard shadow, generous 26px padding, optional washi-tape strip or sticky-note attachment. Special fills: `--yellow-soft` for "popular/final", `--purple-soft` for AI, `--teal-tint` for success/selected.
- **Dark box:** the one inversion — CTA sections use `--ink` background with paper-colored text and yellow CTA.
- **Imagery:** warm, illustrated, sticker-style with white die-cut border (see mascot). No photography.

## ICONOGRAPHY
- **Inline SVG line icons**, stroke-based (stroke-width 1.8–2.2, round caps/joins, 24px viewBox), drawn slightly wobbly to match the hand-drawn language, colored via `currentColor`. The app codebase uses **lucide-react**; for HTML use Lucide from CDN and prefer a hand-drawn feel where possible.
- **The mascot** (`assets/mascot.png`): a robot graduate sticker with teal face, purple accents, yellow pencil. Used floating in heroes, in speech-bubble rows, and as the AI persona. Always with drop-shadow `0 12px 16px rgba(74,58,32,.25)`.
- **Logo:** no drawn logo file exists. The mark is typographic: a yellow rounded square (2px ink border, hard shadow, rotate −4°) containing the letter «ق», followed by «قدرات AI» in Marhey with «AI» in purple. Reproduce in HTML/CSS — do not invent a graphic logo.
- **Emoji as icons:** yes, in trust rows (🛡️⏱️⭐), badges (🏢✓), checkmarks «✓», and gamification (🔥⚡🏆).
- **Stars:** text characters ★★★★★ in `--star` color.

## Index
- `styles.css` → `tokens/` (colors, typography, effects, spacing, base)
- `DESIGN.md` — **full per-page design spec for the whole website (excluding admin)**
- `assets/mascot.png` — the mascot sticker
- `components/core/` — Button, Tag, Badge, StickyNote, SpeechBubble, PaperCard
- `components/forms/` — Input, Toggle
- `components/feedback/` — ProgressBar, AiHint, ChatBubble
- `components/practice/` — QuestionCard, QuestionOption
- `components/navigation/` — Navbar, Footer, Accordion
- `guidelines/` — foundation specimen cards
- `ui_kits/website/` — the landing page (verbatim reference)
- `ui_kits/app/` — student app screens (login, dashboard, practice) in the notebook style
- `SKILL.md` — agent skill entry point

## Intentional additions
- `QuestionCard`/`QuestionOption` — generalized from the hero mock + app practice flow (core product surface).
- Fonts load from Google Fonts (no binaries were provided) — flagged below.
