# LingoDeutsch (Blabling) – UI Style Guide (Hybrid: Clean Editorial + Playful Academic)

This document defines the visual and interaction guidelines for LingoDeutsch, so any agent (e.g. Claude Code) can generate consistent UI.

---

## 1. Brand Personality & Overall Feel

- **Audience:** Spanish-speaking adults and young adults learning German.
- **Tone:**
  - Primary: calm, clear, trustworthy, "serious but friendly teacher"
  - Secondary: lightly playful, encouraging, gamified
- **Goals:**
  - Feel like a modern learning platform, not a child's game.
  - Reduce anxiety about German; interface should feel warm, safe, and structured.
  - Support focus, not overstimulation.

---

## 1.1 Design Style Hierarchy

LingoDeutsch uses a **hybrid visual approach**:

### Clean Editorial Base (Primary)
- **Apply to:** Grammar lessons, article reading, conjugation tables, long-form content
- **Characteristics:** White space, muted palette, clear typography, minimal decoration
- **Goal:** Focus, comprehension, reduce anxiety about complex grammar
- **Examples:** Grammar lesson pages, article reader, conjugation tables

### Playful Gamification Accents (Secondary)
- **Apply to:** Streaks, badges, achievements, quiz feedback, progress bars
- **Characteristics:** Warm colors (secondary orange/coral), small icons, micro-animations
- **Goal:** Motivation, celebration, without overstimulation
- **Examples:** Streak flames 🔥, achievement badges 🏆, quiz success feedback

### When to Use Which
- **Grammar content → Editorial** (calm, trustworthy teacher)
- **Progress/rewards → Playful** (encouraging, gamified)
- **Quizzes → Hybrid** (editorial question, playful feedback)
- **Dashboard → Hybrid** (editorial stats, playful badges)

---

## 2. Color System

Use a limited, warm palette. White and greys dominate; accent colors are used sparingly.

### 2.1 Base Colors (Backgrounds & Text)

- Backgrounds:
  - BG Main: `#FFFFFF` (pure white)
  - BG Subtle: `#F7F7F7` (light warm grey for sections / cards background)
- Text:
  - Text Primary: `#1F2933` (dark grey, not pure black)
  - Text Secondary: `#6B7280` (medium grey)
  - Text Disabled: `#9CA3AF` (light grey)

### 2.2 Primary Brand Color

- Primary (Action / Brand): confident blue (learning/tech feel)
  - Primary 500: `#2563EB`
  - Primary 600: `#1D4ED8` (hover/active)
  - Primary 100: `#DBEAFE` (light background / badge)

Usage:
- Primary buttons
- Key links/actions ("Start lesson", "Continuar", "Siguiente")
- Progress highlights (current step, active tab)
- Grammar lesson headings and key terms

### 2.3 Secondary / Support Colors

- Secondary (Warm Accent): muted orange/coral
  - Secondary 500: `#F97316`
  - Secondary 100: `#FFEDD5`

Usage:
- Small highlights (XP, streaks, reward badges)
- Empty states illustration accents
- Streak counters and gamification elements
- Never compete with primary CTA; use in smaller surfaces.

- Success / Correct:
  - Success 500: `#16A34A` (also: `#00e200` for neuter gender)
  - Success 100: `#DCFCE7`

- Warning / Medium Difficulty:
  - Warning 500: `#F59E0B`
  - Warning 100: `#FEF3C7`

- Error / Incorrect:
  - Error 500: `#DC2626` (also: `#EF4444`)
  - Error 100: `#FEE2E2`

- Info / Masculine Gender:
  - Info 500: `#3B82F6`
  - Info 100: `#DBEAFE`

### 2.4 Color Usage Rules

- Background mostly white/very light grey.
- Only one strong color per component (e.g., don't mix primary and secondary in one button).
- Use pale tints (100) for subtle backgrounds (cards, alerts, tags).
- Maintain good contrast for accessibility (WCAG AA at least).

### 2.5 Grammar Gender Color-Coding

German nouns have grammatical gender (masculine, feminine, neuter, plural). Use semantic colors consistently for grammar tables and vocabulary:

- **🔵 Masculine → Info blue (#3B82F6)**
  - Example: "der Mann" → highlighted in blue
  - Table rows for masculine nouns
  - Masculine article declensions
  - Gender indicator in vocabulary cards

- **🔴 Feminine → Error red (#EF4444)**
  - Example: "die Frau" → highlighted in red
  - Table rows for feminine nouns
  - Feminine article declensions
  - Gender indicator in vocabulary cards

- **🟢 Neuter → Success green (#00e200)**
  - Example: "das Kind" → highlighted in green
  - Table rows for neuter nouns
  - Neuter article declensions
  - Gender indicator in vocabulary cards

- **🟡 Plural → Warning amber (#F59E0B)**
  - Example: "die Kinder" → highlighted in amber
  - Table rows for plural forms
  - Plural article declensions
  - Gender indicator in vocabulary cards

**Usage Rules:**
- Use in grammar tables, vocabulary cards, example sentences
- Apply as text color, not background (for readability)
- Combine with neutral backgrounds (white, #F7F7F7)
- Ensure WCAG AA contrast (test against backgrounds)
- Show emoji indicators (🔵🔴🟢🟡) in table headers and vocabulary

---

## 2.6 DaisyUI Theme Integration

LingoDeutsch uses **DaisyUI** (Tailwind CSS component library) with a custom theme called `mytheme` defined in `tailwind.config.ts`. All DaisyUI components automatically inherit the theme colors.

### DaisyUI Theme Color Mapping

The `mytheme` DaisyUI theme in `tailwind.config.ts` maps to our design system:

```typescript
mytheme: {
   // Brand Colors
   primary: '#2563EB',              // Main blue - buttons, links, highlights
   'primary-content': '#FFFFFF',    // White text on primary backgrounds

   secondary: '#e5defc',            // Light pastel purple - secondary UI
   'secondary-content': '#4D2C91',  // Dark purple text on secondary

   accent: '#FFC107',               // Amber/Gold - interactive accents
   'accent-content': '#5A3B00',     // Dark gold text on accent

   // Base Colors
   neutral: '#444444',              // Medium gray - main text
   'neutral-content': '#FAFAFA',    // Off-white on neutral backgrounds

   'base-100': '#FAFAFA',           // Off-white/light gray - main background
   'base-200': '#F9FAFB',           // Slightly darker - section differentiation
   'base-300': '#f4f6f7',           // Light gray - dividers, borders
   'base-content': '#222222',       // Dark gray - general text

   // Semantic Colors (Grammar-First System)
   info: '#3B82F6',                 // Blue - German content, masculine gender
   'info-content': '#1E40AF',       // Dark blue text on info

   success: '#00e200',              // Green - Spanish content, easy difficulty, neuter gender
   'success-content': '#065F46',    // Dark green text on success

   warning: '#F59E0B',              // Orange - medium difficulty, plural gender
   'warning-content': '#92400E',    // Dark orange text on warning

   error: '#EF4444',                // Red - error states, hard difficulty, feminine gender
   'error-content': '#7F1D1D'       // Dark red text on error
}
```

### Using DaisyUI Components in Code

All DaisyUI components (`<button>`, `<input>`, `<modal>`, `<card>`, etc.) automatically inherit these colors:

```typescript
// Primary button → uses primary: '#2563EB'
<button className="btn btn-primary">Action</button>

// Success alert → uses success: '#00e200'
<div className="alert alert-success">Success message</div>

// Info badge → uses info: '#3B82F6'
<div className="badge badge-info">German</div>

// Error input → uses error: '#EF4444'
<input className="input input-bordered input-error" />
```

### Theme Application Strategy

1. **LingoDeutsch Atoms** (custom components) - May wrap DaisyUI or use native HTML + Tailwind classes
2. **DaisyUI Components** (modal, card, alert, badge, etc.) - Automatically use `mytheme` colors
3. **Tailwind Utilities** - Classes like `bg-primary`, `text-info`, `border-success` map to theme colors
4. **Component Index** - Export from `src/components/{atoms,molecules,organisms}/index.ts` for Atomic Design adherence

### Color Semantic Mapping for Grammar-First Learning

- **Info** (`#3B82F6`): German language content, masculine nouns (🔵 der)
- **Success** (`#00e200`): Easy difficulty, correct answers, neuter nouns (🟢 das)
- **Warning** (`#F59E0B`): Medium difficulty, plural nouns (🟡 die Plural)
- **Error** (`#EF4444`): Hard difficulty, incorrect answers, feminine nouns (🔴 die Fem.)

This semantic mapping ensures consistency across grammar tables, vocabulary cards, quiz feedback, and progress indicators.

---

## 3. Typography

Use a single, modern sans-serif family with clear hierarchy.

### 3.1 Typeface

- Recommended families (pick one and stick to it):
  - Inter, SF Pro, or Nunito (if more playful).
- Same font for Spanish and German; no serif mixing.

### 3.2 Type Scale (Mobile-first)

- H1 (screen titles): 24–28 px, semi-bold
  - Example: "Nominative & Accusative Cases"
- H2 (section titles): 20–22 px, semi-bold
  - Example: "Vocabulario clave"
- H3 (card titles / smaller headers): 16–18 px, semi-bold
- Body / paragraph: 14–16 px, regular
  - Use generous line height (1.4–1.6).
- Caption / meta text: 12–13 px, regular
  - Example: "3 min", "Nivel A1"

### 3.3 Typography Rules

- Max 2 weights: Regular and Semi-Bold.
- Use sentence case for almost everything (no ALL CAPS titles).
- Limit to 2 text colors per screen (primary + secondary) to keep it calm.

---

## 4. Layout & Spacing

Use an 8pt spacing system, card-based layout, and mobile-first design.

### 4.1 Layout Principles

- Grid: 8 pt spacing; consistent margins.
  - Screen horizontal padding: 16 px on mobile, 24 px on desktop.
  - Vertical sections separated by 16–24 px.
- Cards:
  - Rounded corners: 12 px (for articles, grammar topics, vocabulary)
  - Modal radius: 16 px
  - Button radius: 8 px (rounded, not pill for serious editorial feel)
  - Shadow very subtle or use 1px border in light grey: `#E5E7EB`
- Content width: Center content on desktop; keep line length readable (~60–80 characters max for articles).

### 4.2 Spacing Guidelines

- Inside cards:
  - Padding: 16 px (mobile), 20–24 px (desktop).
- Between components:
  - 8 px for tightly related items (label + input).
  - 16 px between related sections (title and its content).
  - 24–32 px between major sections.

---

## 5. Components

Describe how common components should look and behave.

### 5.1 Buttons

- **Primary Button**
  - Background: Primary 500 (#2563EB)
  - Text: white
  - Corner radius: 8 px (rounded, not pill)
  - Padding: 12 px vertical, 16–20 px horizontal
  - Font: 14–16 px, semi-bold
  - States:
    - Default: Primary 500
    - Hover (desktop): Primary 600
    - Pressed: Primary 700 or slight darkening + scale (0.98)
    - Disabled: `#9CA3AF` background, white text, no shadow
  - Text examples:
    - "Empezar lección"
    - "Continuar"
    - "Siguiente"

- **Secondary Button (Ghost / Outline)**
  - Background: transparent or BG Subtle
  - Border: 1 px Primary 100 or `#E5E7EB`
  - Text: Primary 600
  - Use for low-priority actions: "Ver detalles", "Más tarde"

### 5.2 Inputs

- Shape: 8 px radius
- Border: 1 px `#D1D5DB`
- Background: white
- Focus:
  - Border: Primary 500
  - Shadow: subtle, 1–2 px glow in Primary 100
- Placeholder: Text Secondary, not too light
- Error state:
  - Border: Error 500
  - Helper text below in Error 500, 12–13 px

### 5.3 Cards (Lessons, Exercises, Progress)

- Container:
  - Background: white
  - Border-radius: 12 px
  - Border: `#E5E7EB` or very soft shadow
- Content:
  - Title (H3), optional subtitle, meta info (e.g. "5 min · A1")
  - Small accent elements (icon or dot) in Primary 500 or Secondary 500
- Interaction:
  - Entire card is tappable.
  - Pressed state: slight scale down (0.98) and darker border or background tint.

### 5.4 Navigation

- Mobile bottom nav (if used):
  - Max 4–5 items.
  - Icons: outline style.
  - Active item: Primary 500 icon + small dot/underline.
- Top app bar:
  - Height ~56–64 px.
  - Left: app logo or back button.
  - Center: screen title.
  - Right: secondary actions (profile, settings, help) with icons.

### 5.5 Grammar Tables (Conjugation & Declension)

Grammar lessons include extensive verb conjugation and article declension tables.

**Desktop Layout:**
- Standard HTML table with border-collapse
- Header row: bold, background #F7F7F7
- Cell padding: 12px vertical, 16px horizontal
- Borders: 1px solid #E5E7EB
- Gender color-coding in first column or header (🔵🔴🟢🟡)

**Mobile Layout:**
- Horizontal scroll container OR
- Stack rows vertically with labels (responsive transformation)
- Min-width per cell: 80px (prevent squishing)
- Preserve color-coding in stacked layout

**Example: Verb Conjugation Table (sein - to be)**
```
| Pronoun  | Conjugation |
|----------|-------------|
| ich      | bin         |
| du       | bist        |
| er/sie/es| ist         |
| wir      | sind        |
| ihr      | seid        |
| sie/Sie  | sind        |
```

**Example: Article Declension (Gender Color-Coded)**
```
| Case | 🔵 Masculine | 🔴 Feminine | 🟢 Neuter | 🟡 Plural    |
|------|-------------|-----------|----------|-------------|
| Nom. | der Mann    | die Frau  | das Kind | die Kinder  |
| Acc. | den Mann    | die Frau  | das Kind | die Kinder  |
| Dat. | dem Mann    | der Frau  | dem Kind | den Kindern |
| Gen. | des Mannes  | der Frau  | des Kindes| der Kinder |
```

**Styling Rules:**
- Gender colors applied to text in first column
- Hover row: background #F7F7F7
- Irregular forms: bold or underline (visual distinction)
- Mobile: preserve color-coding even in stacked layout

### 5.6 Grammar Topic Cards

Grammar topics are displayed as cards in a vertical list (A1 → A2 → B1 → B2). Each topic has states: locked, in-progress, recommended, completed.

**Card Structure:**
- Container: white background, 12px radius, 1px border #E5E7EB
- Padding: 20px
- Layout: Icon (left) + Content (center) + Status Badge (right)

**States:**

1. **Locked (A2+ topics before A1 complete):**
   - Icon: 🔒 grey lock
   - Title: grey text (#9CA3AF)
   - Badge: "Locked" in grey
   - Not tappable (no hover state)

2. **Available:**
   - Icon: 📘 book emoji or outline icon
   - Title: primary text (#1F2933)
   - Metadata: "15-20 min · 6 quiz questions"
   - Tappable: hover → border Primary 500, slight scale (1.02)

3. **Recommended (next suggested topic):**
   - Border: 2px Primary 500 (pre-highlighted)
   - Small "Recommended" badge (Primary 100 bg, Primary 700 text)
   - Subtle glow shadow in Primary 100

4. **Completed:**
   - Icon: ✅ green checkmark
   - Badge: "Completed" in Success 500
   - Title: normal text (still accessible for review)
   - Date completed: caption text below ("Completed on Jan 15")

**Progress Indicator:**
- Below topic list: "3 of 5 topics completed in A1"
- Linear progress bar (Primary 500 fill)
- Percentage: "60% complete"

### 5.7 Quiz Components

Quizzes appear as modals after grammar lessons or articles. 4 question types: single-choice, multiple-choice, true/false, autocomplete.

**Modal Container:**
- Background: white
- Max-width: 600px (desktop), full-width (mobile)
- Padding: 24px
- Border-radius: 12px
- Shadow: medium (0 4px 16px rgba(0,0,0,0.1))

**Question Header:**
- Question number: "Question 3 of 8" (caption, grey)
- German question: H2 (20px semi-bold, Primary 600)
- Spanish translation: Body (16px regular, secondary grey)
- Spacing: 8px between de/es, 16px before options

**Question Types:**

1. **Single-Choice (radio buttons):**
   - 3-4 options, vertical stack
   - Each option:
     - Container: 16px padding, 8px radius, 1px border #E5E7EB
     - Radio: Primary 500 when selected
     - Text: 16px regular
     - Hover: background #F7F7F7
     - Selected: border Primary 500, background Primary 100 (#DBEAFE)
   - Spacing: 12px between options

2. **Multiple-Choice (checkboxes):**
   - Same layout as single-choice
   - Checkbox: square, Primary 500 fill when checked
   - Multiple selections allowed

3. **True/False:**
   - 2 large buttons, horizontal on desktop, stacked on mobile
   - Button: 80px height, 48% width (desktop)
   - Icons: ✓ (Success 500) for True, ✗ (Error 500) for False

4. **Autocomplete (text input):**
   - Input field: 8px radius, 1px border #D1D5DB
   - Placeholder: "Escribe la respuesta en alemán..."
   - Focus: border Primary 500, shadow glow
   - Character count (if max length): "5/10 characters"

**Answer States:**
- Unanswered: default styling
- Correct: border Success 500, background Success 100, ✓ icon
- Incorrect: border Error 500, background Error 100, ✗ icon
- Feedback text: 14px below option (Success/Error color)

**Bottom Actions:**
- "Check Answer" button (Primary, full-width mobile)
- "Skip Question" link (secondary grey, right-aligned desktop)
- After answer: "Next Question" button (Primary)

**Quiz Score Modal:**
- Icon: 🎉 (if passed) or 😔 (if failed)
- Title: "Quiz Complete!" or "Try Again"
- Score: Large text (48px), bold - "6/8 correct - 75%"
  - Color: Success 500 if ≥60%, Error 500 if <60%
- Message:
  - Pass: "Great job! Topic completed ✓"
  - Fail: "Review the lesson and try again"
- Achievement unlock (if applicable):
  - Badge display: "A1 Grammar Master 🏆"
  - Small animation: scale up + fade in
- Actions:
  - Pass: "Continue to Next Topic" (Primary button)
  - Fail: "Review Lesson" + "Retry Quiz" (two buttons, stacked mobile)
  - Secondary: "Return to Dashboard" (link)

### 5.8 Vocabulary Flashcards

Flashcards for spaced repetition vocabulary practice.

**Card Container:**
- Size: 80% viewport width (max 500px), 300px height
- Background: white
- Border-radius: 16px
- Border: 2px solid #E5E7EB
- Shadow: medium (0 4px 16px rgba(0,0,0,0.08))
- Center-aligned on screen

**Front (German Word):**
- Word: 32px bold, Primary 600 (#2563EB)
- IPA pronunciation: 16px, secondary grey, italic
- Hint: "Tap to reveal translation" (caption, light grey)
- Center-aligned vertically and horizontally

**Back (Spanish Translation):**
- Translation: 24px regular, #1F2933
- Example sentence: 16px, secondary grey
  - German bold, Spanish regular
- Grammatical info: caption (POS, case, gender color-coded)
- Center-aligned

**Flip Interaction:**
- Desktop: click card to flip
- Mobile: tap card OR swipe up to flip
- Animation: 3D flip (rotateY 180deg), 300ms ease-out

**Difficulty Rating Buttons (after flip):**
- 3 buttons below card: Easy / Medium / Hard
- Layout: horizontal row, equal width
- Styling:
  - Easy: Success 500 bg, white text
  - Medium: Warning 500 bg, white text
  - Hard: Error 500 bg, white text
- Button height: 48px, 8px radius
- Hover: darken by 10%
- Text: "Easy (7 days)" with interval hint

**Progress Indicator:**
- Above card: "8 of 12 reviewed today"
- Linear progress bar (Primary 500)
- Caption: "4 more to go"

**Session Screens:**

Session Start:
- Title: "Vocabulary Practice"
- Subtitle: "8 words due for review"
- Preview: show first 3 words as pills
- CTA: "Start Practice" (Primary button, full-width mobile)

Session Complete:
- Icon: 🎉 or ✓
- Title: "Session Complete!"
- Stats cards:
  - "8 words reviewed in 7 minutes"
  - "Total mastery: 65% (easy level)"
  - "New words this week: 3"
- Visual: small bar chart or circular progress
- Actions:
  - "Continue Practice" (if more words due)
  - "Return to Dashboard" (Primary)

### 5.9 Interactive Article Reading

Users click German words in articles to see translations.

**Word Selection:**
- Hover: underline, cursor pointer
- Selected: background Primary 100, bold
- Mobile: tap target ≥44px height (add padding if needed)

**Translation Tooltip (MoleculeDrawerTranslation):**

Mobile: bottom drawer (slides up from bottom)
- Height: ~40% viewport, rounded top corners (16px)
- Background: white
- Drag handle: grey pill at top (for closing)

Desktop: popover near clicked word
- Position: above word (if space), else below
- Arrow pointing to word
- Max-width: 400px
- Shadow: medium, border 1px #E5E7EB

**Tooltip Content:**
- German word: 20px bold, Primary 600
- Spanish translation: 16px regular, #1F2933
- Part of speech: caption, secondary grey
- Gender (if noun): color-coded icon (🔵🔴🟢🟡)
- Case (if applicable): "Accusative" chip
- Example sentence: 14px, German bold + Spanish regular
- IPA pronunciation: italic, secondary grey

**Actions:**
- "Save Word" button: Secondary 500, outline style
  - Disabled if already saved (grey, "Saved ✓")
- Close: X button (top-right) OR tap outside (mobile) OR ESC key

**Accessibility:**
- Keyboard: Tab to words, Enter to open tooltip
- Screen reader: announce translation + grammatical info

**Article Screen Structure:**

1. Header (OrganismArticleHeader):
   - Title: H1 (24-28px)
   - Metadata row:
     - Level badge: "A1" (Primary 100 bg, Primary 700 text)
     - Read time: "~8 min" (secondary grey)
     - Word count: "300 words" (secondary grey)
     - Grammar tags: pills ("Present tense", "Accusative")
   - Spacing: 16px between elements

2. Body (OrganismArticleContent):
   - Text: 18px, 1.6 line-height (readability optimized)
   - Max-width: 700px (desktop), centered
   - Padding: 0 16px (mobile), 0 24px (desktop)
   - Paragraphs: 24px margin-bottom
   - Interactive words: underline on hover, clickable
   - "Words saved" counter (sticky bottom-right): "3 words saved"

3. Bottom CTA (sticky):
   - "Take Comprehension Quiz" button (Primary)
   - Appears after scroll to 80% OR explicit click
   - Full-width mobile, centered desktop

### 5.10 Dashboard & Progress

Dashboard shows grammar progress, vocabulary stats, streaks, badges.

**Progress Cards Layout:**
- Grid: 2 columns (desktop), 1 column (mobile)
- Gap: 16px between cards
- Card padding: 20px

**Card Types:**

1. **Grammar Progress Card (PRIMARY):**
   - Icon: 📘 or grammar icon (top-left)
   - Title: "A1 Grammar Progress"
   - Circular progress: 80% fill (Primary 500)
     - Center text: "4 of 5" (topics complete)
   - Subtitle: "1 topic remaining"
   - CTA: "Continue: Nominative & Accusative" (link)

2. **Vocabulary Stats Card:**
   - Icon: 📝 or word icon
   - Stats row:
     - "120 words learned" (large number, bold)
     - "65% mastery" (Success 500)
   - Mini bar chart: Easy/Medium/Hard distribution
   - Link: "Practice now (5 due)"

3. **Streak Card (gamification accent):**
   - Icon: 🔥 flame
   - Large number: "7 days" (Secondary 500 - coral, not blue)
   - 7-day calendar grid below (filled dots for practice days)
   - Message: "Keep it up!"

4. **Achievement Badges:**
   - Horizontal scrollable row (mobile)
   - Each badge: 80x80px circle
   - States:
     - Unlocked: full color, icon + label below
     - Locked: greyscale, lock icon overlay
   - Badges:
     - 🏆 A1 Grammar Master
     - 📖 Article Starter
     - 🔥 Week on Fire
     - 💪 100 Words Learned

**Quick Actions Section:**
- Vertical list of cards (prioritized by user state)
- Primary CTA (large card):
  - If grammar incomplete: "Continue A1 Grammar"
  - If grammar complete: "Read next article"
- Secondary CTA: "Practice vocabulary (X due)"
- Tertiary: "Explore more topics"

**7-Day Activity Calendar:**
- Grid: 7 columns (days), 1 row
- Cell size: 40x40px (mobile), 48x48px (desktop)
- Spacing: 4px gap

Day Cell States:
- Practiced: Success 500 fill, white checkmark
- Not practiced: #E5E7EB fill, empty
- Today: Primary 500 border (2px), highlight
- Future days: #F7F7F7 fill, faded

Labels:
- Day names: caption text above grid ("M T W T F S S")
- Streak count: below grid "7-day streak 🔥"

---

## 6. Gamification & Playful Elements

Keep gamification minimalistic and adult-friendly.

### 6.1 Progress & Rewards

- **Progress Bars:**
  - Background: `#E5E7EB`
  - Fill: Primary 500
  - Rounded ends (full radius)

- **XP / Streak Indicators:**
  - Use small badges, not huge flashy blocks.
  - Badge examples:
    - Background: Secondary 100
    - Text: Secondary 700
    - Icon: subtle flame, star, or check

- **Micro-feedback:**
  - Correct answer:
    - Border or background briefly flash Success 100
    - Show small check icon in Success 500
  - Incorrect answer:
    - Border/background Error 100 + short, clear message.

### 6.2 Illustrations & Icons

- **Style:**
  - Simple, flat or slightly rounded, no heavy gradients.
  - Limited color palette: use brand colors + 1 neutral.
- **Usage:**
  - On empty states, onboarding, and key success screens (e.g., "Unidad completada").
  - Not in every card; avoid visual overload.
- **Icons:**
  - Prefer outline icons with 2px stroke.
  - Use consistent library or style across app.

---

## 7. Visual Hierarchy & Content

### 7.1 Language Presentation

- Show German terms clearly (often bold) and Spanish explanations in regular.
  - Example: "**Guten Morgen** – Buenos días (por la mañana)"
- Avoid mixing more than 2 languages in same line if possible.

### 7.2 Sections on Learning Screen

Typical lesson screen structure:

1. Top: Lesson title + progress chip ("2/10 ejercicios").
2. Middle: Main exercise content (question, word, example sentence).
3. Bottom: Primary CTA row (e.g. "Comprobar", "Siguiente"), maybe secondary "Saltar".

Use clear vertical separation (white space) between these.

### 7.3 Grammar Lesson Screen

Grammar lessons are markdown-rendered with embedded vocabulary and examples.

**Screen Structure:**

1. Header (sticky):
   - Topic title (H1): "Nominative & Accusative Cases"
   - Progress chip: "Topic 3 of 5 in A1"
   - Exit button (top-right)

2. Content (scrollable):
   - Markdown sections with syntax highlighting
   - Conjugation/declension tables
   - Example sentences: German bold, Spanish regular
   - Callouts/tips: use DaisyUI alert component (info variant)
     - "Truco de Oro 🌟" → info background (#DBEAFE), blue border
   - Embedded vocabulary: highlighted inline with hover tooltip

3. Bottom CTA (sticky):
   - "Take Quiz" button (Primary, full-width on mobile)
   - Disabled until scroll to bottom OR 2 min elapsed (prevent skipping)

**Markdown Styling:**
- H2 sections: 20px semi-bold, 24px margin-top
- Paragraphs: 16px, 1.6 line-height
- Bold German terms: Primary 600 color
- Lists: 8px margin-left, disc bullets
- Code/inline vocab: background #F7F7F7, 2px padding

**Mobile Considerations:**
- Tables: horizontal scroll or responsive stacking
- Callouts: full-width, no side margins
- Images (if any): max-width 100%, 8px border-radius

### 7.4 Bilingual UI Patterns

LingoDeutsch displays questions and content in both German (learning) and Spanish (UI).

**Quiz Questions:**
- German (primary): H2, 20px semi-bold, Primary 600
- Spanish (translation): Body, 16px regular, secondary grey
- Spacing: 8px vertical between de/es
- Layout: stacked (de above es)

**Example Sentences:**
- German: bold, Primary 600
- Spanish: regular, #1F2933
- Inline: "Ich sehe den Mann - Yo veo al hombre"
- OR stacked in grammar lessons

**Vocabulary Cards:**
- Front: German only (immersion)
- Back: Spanish translation + German example

**Article Content:**
- German only (reading practice)
- Tooltips provide Spanish translations on-demand

**UI Labels:**
- Buttons, navigation, dashboard: Spanish only
- Grammar terms (cases, tenses): German term + (Spanish explanation)
  - Example: "Nominativ (nominativo)" in table headers

---

## 8. Motion & Microinteractions

- Duration: 150–250 ms for small transitions.
- Easing: standard ease-out; no bouncy, cartoonish easing.
- Use motion to:
  - Confirm actions (button press, correct answer).
  - Transition between screens (subtle slide or fade).
  - Flip flashcards (3D rotateY animation)
- Avoid:
  - Long or distracting animations.
  - Animation loops that can cause fatigue.

---

## 9. Tone of Copy (Microcopy)

- Language: Spanish UI, with German as learning content.
- Style:
  - Friendly and concise.
  - Encourage, don't punish.
- Examples:
  - Instead of: "Respuesta incorrecta."
    - Use: "Casi, revisa esta parte:" / "No es correcto aún, intenta de nuevo."
  - Success:
    - "¡Bien hecho!" / "¡Súper! Has aprendido una nueva palabra."

---

## 10. Accessibility (WCAG AA)

LingoDeutsch must be fully accessible for keyboard and screen reader users.

### 10.1 Keyboard Navigation

- All interactive elements: focusable with Tab
- Focus indicator: 2px Primary 500 outline, 2px offset
- Skip links: "Skip to content" for screen readers
- Modal traps: focus locked within modal when open
- Escape key: closes modals, tooltips, drawers

### 10.2 Grammar Tables

- Use semantic HTML `<table>`, `<th>`, `<td>`
- Column headers: `scope="col"`
- Row headers: `scope="row"` (if applicable)
- Screen reader: announces "table with X rows, Y columns"

### 10.3 Quizzes

- Radio/checkbox: native HTML with labels
- Fieldset + legend for question group
- Error messages: `aria-describedby` linking to input
- Success feedback: `aria-live="polite"` announcements

### 10.4 Flashcards

- Announce flip state: "Front - German word" / "Back - Translation"
- Difficulty buttons: `aria-label` with interval info
  - "Easy - Review in 7 days"

### 10.5 Color Contrast

All text: minimum 4.5:1 contrast (WCAG AA)
Interactive elements: 3:1 contrast

Gender colors on white background:
- 🔵 Blue #3B82F6 → 4.6:1 ✓
- 🔴 Red #EF4444 → 4.5:1 ✓
- 🟢 Green #00e200 → ~3.8:1 ⚠️ (may need darkening to #00B800)
- 🟡 Amber #F59E0B → 4.9:1 ✓

### 10.6 Alternative Text

- Icons: `aria-label` or sr-only text
- Decorative images: `aria-hidden="true"`
- Achievement badges: alt="Grammar Master achievement - unlocked"

---

## 11. Do & Don't Summary

**Do:**
- Use lots of white space and a calm layout.
- Use primary blue for main actions and navigation highlights.
- Make gamification subtle and aligned with an adult learner.
- Keep typography simple (one font, few sizes).
- Maintain high contrast and clear states for accessibility.
- Use grammar gender colors (🔵🔴🟢🟡) consistently in tables and vocabulary.
- Apply clean editorial style to grammar/article content, playful accents to rewards/streaks.

**Don't:**
- Use neon or very saturated colors across large areas.
- Mix too many fonts or text styles.
- Over-decorate with icons/illustrations on every element.
- Use childish visuals (cartoon characters, heavy emojis everywhere).
- Use pill-shaped buttons (use 8px rounded for serious feel).
- Mix gender colors arbitrarily—use semantic mapping consistently.

---

**Last Updated:** December 18, 2025
**Version:** 2.0 (Grammar-First Edition)
**Status:** Ready for Implementation (PHASE 0)
