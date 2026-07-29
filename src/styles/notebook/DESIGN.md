# DESIGN.md — قدرات AI · Full Website Design Spec
**Scope:** every student-facing surface of quduratai.com (admin excluded). **Visual ground truth:** the Agent_LP landing page («الدفتر الذكي» — the smart notebook). **Feature/flow ground truth:** https://github.com/w0lak/Qudurat (`apps/web/src/pages`).

---

## 1 · Design language: الدفتر الذكي
The whole product is a student's notebook that came alive. Rules that apply to EVERY page:

- **Canvas:** `--paper #fbf6ea` with fixed ruled lines (`repeating-linear-gradient`, teal `rgba(13,148,136,.09)` line every 36px) + fixed red margin line (2px, `rgba(220,38,38,.18)`, `right:60px`) + SVG grain overlay at 5% opacity.
- **RTL Arabic**, Eastern Arabic numerals everywhere (٠-٩), Hijri year ١٤٤٧.
- **Ink, not black:** all text/borders `#3a2f21` / `#5c4f3a` / `#8a7a5f`.
- **Every card:** `background:#fffdf6` (or `#fff` for elevated), `border:2px solid var(--ink)`, hard offset shadow (no blur), radius 18–20px, padding ~26px, subtle rotation ±0.5–2° that straightens on hover.
- **Buttons:** 2px ink border, hard shadow `2.5–3px offset`; hover presses INTO the shadow (`translate(-1px,2px)`, shadow shrinks to 1px). Primary = teal fill/white text; Secondary = yellow fill/ink text.
- **Color roles:** teal = act, yellow = celebrate/highlight, purple = AI only, orange = meta/stamps/alerts, ink-dark box = the single inverted CTA surface per page.
- **Type:** Marhey = display; Baloo Bhaijaan 2 = UI (default); Noto Naskh Arabic = prose/questions (line-height 2).
- **Page-number motif:** each major section/screen carries an orange caption «الصفحة N من الدفتر».
- **Motion:** GSAP-style word-split headline reveals, y+opacity scroll reveals, `back.out` pops for stickers/notes, ±12px float loops, press-scale .95. Honor `prefers-reduced-motion`.

---

## 2 · Sitemap (student-facing)
1. **Landing** `/` — marketing page (built; see `ui_kits/website/`)
2. **Auth** `/login`, `/register`, `/forgot-password`, `/reset-password`
3. **Onboarding** `/onboarding` — goal + diagnostic level test
4. **App shell** (sidebar layout): Dashboard `/dashboard` · Practice `/practice` · أحدث التجميعات `/collections` · Timed Test `/timed-test` · تعلم الأساسيات `/learn` (+ lesson + boss battle) · Study Plan `/study-plan` · تدريب الضعف `/weak-drill` · Reports `/reports` · Leaderboard `/leaderboard` · Profile `/profile` · Subscription `/subscription` + Checkout

---

## 3 · Landing page `/`
Already fully designed (`ui_kits/website/index.html`). Section order: preloader (pencil progress bar, «جاري فتح الدفتر…») → fixed nav → Hero (headline with yellow highlighter on «ذاكر أذكى», live question-card mock with washi tape + AI hint + sticky note + floating mascot, 4 stats) → yellow marquee band → «رحلتك إلى ١٠٠٪» pinned horizontal 4-step journey → mascot speech-bubble row → 4 feature cards (spotlight hover) → platform demo (browser frame with skill bars + AI chat card + task sticky note) → testimonials dual marquee (handwritten cards, rotated ±1°) → pricing (billing toggle, 3 rotated plans, popular = yellow-soft + orange stamp) → about/team → FAQ accordion → dark ink CTA box → dashed-border footer.

## 4 · Auth screens
Centered single column (max 440px) on ruled paper; logo on top; the form lives on one paper card (`#fffdf6`, 2px ink, `--shadow-lg`, rotate −0.5°) with a washi-tape strip on the top edge. Mascot peeks from behind the card's top corner.
- **Login:** «مرحباً بعودتك! 👋» (Marhey, 26px) + «سجل دخولك للمتابعة» muted. Google button = white paper button with 2px ink border + hard shadow. Dashed divider «أو بالبريد الإلكتروني». Fields: label (600, 14px) above `Input` (white, 1.5px `--border-soft`, radius 10px, focus → 2px teal border + `--teal-tint` fill; icon inside right). «نسيت كلمة المرور؟» teal link, left-aligned. Submit = full-width primary Button «تسجيل الدخول». Footer: «ليس لديك حساب؟ سجل الآن مجاناً».
- **Register:** same card; name/email/phone/password; terms checkbox (hand-drawn square, teal ✓); CTA «أنشئ حسابك مجاناً ←».
- **Forgot/Reset:** single field + primary CTA; success state = sticky note «تحقق من بريدك! ✉️».
- Errors: toast as small sticky note (yellow for info, `#ffe9e0`/orange border for errors), rotate −3°, pops in with `back.out`.

## 5 · Onboarding `/onboarding`
Full-page paper, 3 steps with a pencil progress bar on top (like the preloader). Step cards match the landing «journey» cards. 1) choose track (كمي/لفظي/كلاهما) as large selectable paper cards with badge circles; 2) exam date picker → sticky note preview «اختبارك بعد ٤٥ يوم ⚡»; 3) 5-minute diagnostic (uses QuestionCard). Finish: mascot celebration + «استلم خطتك الذكية» purple AI plan box.

## 6 · App shell (all logged-in pages)
- **Sidebar (right, RTL):** paper column with dashed left border. Logo mark on top. Nav items = ghost rows (Baloo 600, 15px, muted) with lucide icons; active item = `--teal-tint` fill, 2px ink border, hard `--shadow-xs`, slight −1° rotation — like a highlighted line in a notebook. Collapses to icon rail on ≤900px; mobile = bottom tab bar (5 items: dashboard, practice, test, reports, profile).
- Order: لوحة التحكم، التدريب، أحدث التجميعات، اختبار تجريبي، تعلم الأساسيات، خطة الدراسة، تدريب الضعف، التقارير، المتصدرين، الملف الشخصي.
- Bottom of sidebar: upgrade card = dark ink box, yellow CTA «ترقية الاشتراك»; then user row (avatar circle = dashed border, level under name).
- **Top of content:** page title in Marhey + orange page-number caption; XP bar at the far end.

## 7 · Dashboard `/dashboard`
- **Greeting row:** «هلا [الاسم]! 👋» + sticky note countdown «اختبارك بعد ٤٥ يوم ⚡».
- **Stat cards** (4, like landing stats but boxed): أسئلة اليوم، سلسلة الأيام 🔥، نقاط الخبرة، مستوى الإتقان — Marhey numbers 30px, caption muted 13px.
- **XP/Level:** segmented progress bar (20 notches, pencil-stroke fill in rank color), «مستوى ٧ · متدرب». Ranks: مبتدئ→متدرب→ماهر→خبير→عبقري القدرات (levels 1/6/11/21/31, colors amber/gray/yellow/purple/red — keep as small colored stamps, not gradients).
- **«خطة AI لهذا الأسبوع»** purple-soft dashed box (exact style of landing `q-ai`).
- **Skill bars** per topic (الجبر ٨٢٪ teal / الهندسة ٥٤٪ orange-2 / المقارنات ٣٧٪ orange «← ركّز هنا») — 12px track, 1.5px ink border, animated fill.
- **Quick actions:** two big paper buttons «كمّل تدريبك ←» (teal) and «اختبار سريع» (yellow).
- **Recent activity** list on dashed-divided rows.

## 8 · Practice `/practice` (and Collections, Weak Drill — same core surface)
- **Setup view:** choose section (كمي/لفظي) + topic chips (dashed pills, selected = teal fill white text) + count; CTA primary.
- **Question view:** one centered QuestionCard (max 720px, white, 2px ink, `--shadow-xl`, washi tape): meta row «سؤال ١٢ من ٢٤ · كمي» + teal timer; question in Naskh 20px/1.9; options = QuestionOption rows (1.5px `--border-soft`, radius 10px; hover nudge −4px; selected = 2px teal + tint + ✓; correct = green tint; wrong = orange tint + shake). Below: «تلميح 💡» ghost button → AiHint purple box; after answering, AI explanation streams into the purple box.
- **Gamification feedback:** XP toast «+١٠ نقطة خبرة» flies up; combo sticky note «كومبو ممتاز 🔥🔥» rotate −3°; encouraging line «أحسنت! 👏».
- **Session summary:** paper card with big Marhey score, stat row, skill deltas, CTA «راجع أخطاءك» + «جولة ثانية ←».
- **Weak drill** adds an orange header stamp «تدريب الضعف: المقارنات».

## 9 · Timed Test `/timed-test`
Exam mode = the notebook gets serious: doodles/mascot hidden, top bar with big Marhey countdown (turns orange < 5 min), question counter dots, «إنهاء القسم» ghost button. Same QuestionCard minus hints/AI (locked until review). Results page: big score in a circled stamp, section breakdown bars, «قارن مع قياس» note.

## 10 · Learn by Play `/learn`
Duolingo-like path drawn as a dotted pencil line snaking down the page; lesson nodes = round step-badges (64px, 2px ink, hard shadow; done = teal fill ✓, current = yellow + float, locked = dashed + muted). Islands (units) titled with Marhey + highlighter. **Lesson:** sequence of QuestionCards with hearts/XP header. **Boss battle:** dark ink header band, boss avatar vs mascot, HP bars = pencil progress bars (player teal / boss orange).

## 11 · Study Plan `/study-plan`
Weekly notebook spread: 7 day-columns of paper cards; each task = small sticky note (yellow=practice, teal-soft=review, purple-soft=AI session) rotated ±2°; done tasks get a marker strike-through + ✓ stamp. Header: «خطة الأسبوع» + AI regenerate button (purple dashed).

## 12 · Reports `/reports`
- Weekly report browser-frame card (exact landing demo styling) with skill bars.
- Line/area chart of scores over time: hand-drawn feel — 2px ink line, dot markers, dashed grid, paper background. No gradients.
- Topic accuracy table on dashed row dividers; weakest topic row highlighted `--yellow-soft` with «← ركّز هنا».
- «تقرير AI» purple box summarizing the week in prose.

## 13 · Leaderboard `/leaderboard`
Top-3 podium as three rotated paper cards (center bigger, yellow-soft, orange stamp «الأول 🏆»); rest = rows with rank in Marhey, avatar (dashed circle), name, level stamp, XP in Arabic numerals. Current user's row = teal-tint + 2px ink border.

## 14 · Profile `/profile`
Cover strip of ruled paper with taped-on avatar (dashed circle, washi tape). Name (Marhey) + rank stamp + LevelBadge. XP segmented bar. **Achievements** = sticker sheet: earned stickers full-color with die-cut white border (mascot style), unearned = dashed outline + muted. Settings list on paper card with dashed dividers.

## 15 · Subscription & Checkout
Pricing exactly as landing (§3): toggle (ink-fill active segment), 3 rotated plan cards, popular = `--yellow-soft` + orange «الأكثر شعبية!» stamp, prices Marhey 48px with struck-through original, «وفّر X ريال» teal dashed pill, features with teal ✓. Checkout: two-column — order summary sticky-note style + payment form on paper card; trust row 🛡️⏱️⭐; pay CTA primary full-width. Success: mascot + confetti + sticky «تم! فاتورتك في بريدك ✉️».

## 16 · Component inventory (built in `components/`)
| Component | Use |
|---|---|
| Button | primary (teal), secondary (yellow), ghost (dashed underline), CTA-on-dark |
| Tag | dashed teal pill, rotated −1° |
| Badge | dashed pill (badge-pill), stamps (orange, rotated) |
| StickyNote | yellow note, rotate −4°, Marhey |
| SpeechBubble | mascot dialogue |
| PaperCard | base card incl. washi-tape + fill variants |
| Input | form field with focus ring |
| Toggle | segmented billing/section toggle |
| ProgressBar | skill bars + pencil loader + segmented XP |
| AiHint | purple dashed AI box |
| ChatBubble | user (paper) / AI (teal-tint) bubbles |
| QuestionCard / QuestionOption | the core practice surface |
| Navbar / Footer | marketing chrome |
| Accordion | FAQ `details` rows |

## 17 · Do / Don't
- ✅ hard offset shadows · dashed dividers · rotation · Arabic numerals · purple only for AI · one dark box per page
- ❌ blurred/soft shadows · gradients (except highlighter strokes) · pure black/white chrome · photography · Latin numerals · emoji in legal copy · borderless cards
