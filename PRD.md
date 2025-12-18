# **PRODUCT REQUIREMENTS DOCUMENT**

## **LingoDeutsch (Blabling)**

### _German Language Learning Platform for Spanish Speakers_

**Document Version:** 1.0
**Last Updated:** December 18, 2025
**Status:** Active Development

---

## **1. EXECUTIVE SUMMARY**

**LingoDeutsch** (branded as "Blabling") is a **German language learning platform** designed to help Spanish-speaking users reach intermediate proficiency (A1-B2 CEFR levels) through interactive, gamified, evidence-based learning methods combining vocabulary building, grammar lessons, contextual reading, and spaced repetition.

**Core Value Proposition:**

-  Learn German through real content (articles) with instant word translations
-  Personalized spaced repetition that adapts to your learning pace
-  Structured grammar curriculum aligned to international standards
-  Gamification (streaks, leaderboards) maintaining engagement
-  Bilingual interface (Spanish/German) removing language barriers

**Business Model:** Freemium (inferred) with premium content access potential

---

## **2. PRODUCT OVERVIEW**

### **2.1 Vision**

Become the preferred German learning platform for Spanish-speaking learners by combining pedagogically-sound methods (spaced repetition, CEFR framework) with engaging user experience (gamification, interactive reading).

### **2.2 Target Markets**

-  **Primary:** Spanish speakers aged 18+ seeking conversational German
-  **Secondary:** Language enthusiasts wanting structured learning
-  **Tertiary:** Professionals needing German for work/travel

### **2.3 Success Definition**

-  Users complete daily learning streaks
-  80%+ of saved vocabulary reaches "mastered" level
-  Articles completed with quiz scores ≥60%
-  Regular weekly engagement (3+ sessions)
-  User retention >50% at 30-day mark

---

## **3. USER PERSONAS**

### **Persona A: Maria - The Motivated Professional**

-  **Age:** 28, Madrid, Spain
-  **Goal:** Reach B1 to communicate at work
-  **Learning Style:** Structured, goal-oriented
-  **Frequency:** 45 minutes daily
-  **Needs:** Progress tracking, structured curriculum, real-world context

### **Persona B: Carlos - The Casual Learner**

-  **Age:** 35, Mexico City, Mexico
-  **Goal:** Hobby learning, travel preparation
-  **Learning Style:** Flexible, content-driven
-  **Frequency:** 15 minutes, 4x/week
-  **Needs:** Short lessons, inspiring content, no pressure

### **Persona C: Sofia - The Visual Learner**

-  **Age:** 22, Argentina, student
-  **Goal:** Improve grammar, academic German
-  **Learning Style:** Interactive, visual
-  **Frequency:** 30 minutes, 5x/week
-  **Needs:** Visual explanations, grammar clarity, quizzes

---

## **4. CORE FEATURES**

### **4.1 Feature: Interactive Article Reading**

**Description:** Users read curated German articles with inline translation lookup and comprehension quizzes.

**Key Capabilities:**

-  Browse articles filtered by CEFR level (A1, A2, B1, B2)
-  Interactive word selection: click any word to see:
   -  Spanish translation
   -  Grammatical info (gender, case, tense)
   -  Examples in context
   -  Pronunciation (IPA)
   -  Frequency ranking
-  Track progress: mark article completed upon quiz ≥60%
-  Save unknown words directly to vocabulary list
-  View article metadata: difficulty, estimated read time, word count

**Functional Requirements:**

-  [ ] Articles paginated, default 12 per page
-  [ ] Sort by date (newest), level, completion status
-  [ ] Search articles by title/content
-  [ ] Quiz modal appears after article selection
-  [ ] Highest score tracking per article
-  [ ] Attempt counter for progress analytics
-  [ ] Saved words auto-tagged with "hard" difficulty

**Success Metrics:**

-  Avg 3+ words saved per article read
-  Quiz completion rate >70% of article reads
-  Avg time on article: 8-12 minutes

---

### **4.2 Feature: Spaced Repetition Vocabulary Practice**

**Description:** Personalized flashcard review system using proven spaced repetition intervals to optimize retention.

**Key Capabilities:**

-  Flashcard deck with German word front, Spanish translation back
-  Show extended word details: examples, conjugations, synonyms, antonyms
-  Rate difficulty: Easy (7-day interval) | Medium (3-day) | Hard (1-day)
-  Auto-shuffle deck for randomization
-  Track "last seen" date for each word
-  Filter by level (All, Easy, Medium, Hard)
-  Daily recommendation: "You have 12 words due for review"

**Functional Requirements:**

-  [ ] Only show words due for review (today's date ≥ last_seen + interval)
-  [ ] Never-seen words always due
-  [ ] Prevent cards from appearing until review date
-  [ ] Update `times_seen` counter on each review
-  [ ] Maintain `level_history` array for analytics
-  [ ] Prevent duplicate card display in single session
-  [ ] Support drag-drop for accessibility
-  [ ] Show progress bar: "8 of 15 reviewed today"

**Business Logic:**

```typescript
Review Intervals:
- Easy:   7 days
- Medium: 3 days
- Hard:   1 day

Word marked Due if:
  !lastSeenDate || (now - lastSeenDate) >= interval
```

**Success Metrics:**

-  Users spend avg 8-12 min/session on practice
-  65%+ of words reach "easy" level eventually
-  Daily active users doing ≥1 practice session: 40%+

---

### **4.3 Feature: Structured Grammar Curriculum**

**Description:** Self-paced grammar lessons organized by CEFR level with embedded quizzes and progress tracking.

**Key Capabilities:**

-  Grammar topics grouped by level: A1 → A2 → B1 → B2
-  Topics include: articles, tenses, cases, modal verbs, etc.
-  Each topic contains: explanations, examples, conjugation tables
-  Interactive lesson format (markdown-rendered content)
-  Quiz embedded in each topic (auto-grade, ≥60% = pass)
-  Visual progress indicator per level
-  Lock/unlock system: must complete Level N before accessing N+1

**Functional Requirements:**

-  [ ] Display 3-5 topics per CEFR level
-  [ ] Render markdown grammar content with syntax highlighting
-  [ ] Quiz questions randomized, multi-choice format
-  [ ] Mark topic complete when quiz ≥60%
-  [ ] Track `dateCompleted` for analytics
-  [ ] Show lock icon on unavailable levels
-  [ ] Progress bar: "2 of 5 topics completed in A1"
-  [ ] Recommended next topic highlighted

**Grammar Topics (Minimum Scope):**
| A1 | A2 | B1 | B2 |
|---|---|---|---|
| Articles (der, die, das) | Dative case | Perfect tense | Conditional |
| Present tense | Accusative case | Subordinate clauses | Subjunctive mood |
| Cases overview | Plural formation | Passive voice | Word order (main/subordinate) |
| Verb conjugation | Comparatives | Modal verbs (advanced) | Infinitive constructions |

**Success Metrics:**

-  Avg time per lesson: 12-18 minutes
-  Quiz completion rate: >85%
-  Users advancing to B1+: >30% of active users
-  Grammar practice correlation with vocabulary growth: +15% mastery

---

### **4.4 Feature: Dashboard & Progress Analytics**

**Description:** Unified dashboard showing user's learning progress, daily stats, and motivational elements.

**Key Capabilities:**

-  **Stats Cards:**

   -  Total words saved
   -  Words mastered (level = easy)
   -  Weak words (medium + hard count)
   -  Vocabulary mastery % (mastered / total)
   -  Daily streak (consecutive days practiced)
   -  Words practiced today

-  **7-Day Activity Calendar:** Visual grid showing practiced/not-practiced each day

-  **Quick Actions:**

   -  "Continue vocabulary practice"
   -  "New article to read"
   -  "Next grammar lesson"

-  **Recommended Content:**

   -  Latest articles (3 most recent)
   -  Due vocabulary words count
   -  Grammar progress indicator

-  **Weekly Leaderboard:** Top 10 users by score (global ranking)

**Functional Requirements:**

-  [ ] Real-time stat calculation from PocketBase
-  [ ] 7-day calendar auto-populates from `userVocabularyProgress` records
-  [ ] Streak counter: min 1 word reviewed = day completed
-  [ ] Leaderboard updates daily, cached for performance
-  [ ] "Mastery %" = (easy_words / total_words) \* 100
-  [ ] Show motivational message for 0-streak users
-  [ ] Animated stat cards on page load

**Gamification Elements:**

-  Streak badges: 🔥 7-day, 🎯 30-day, 🏆 100-day milestones
-  Leaderboard ranking with position number
-  "Don't break the chain" messaging

**Success Metrics:**

-  Dashboard engagement: >60% daily active users
-  Streak maintenance: avg 6+ days for active users
-  Vocabulary progress correlation with login frequency

---

### **4.5 Feature: User Authentication & Profiles**

**Description:** Secure user accounts with OAuth authentication and customizable profiles.

**Key Capabilities:**

-  Google OAuth 2.0 sign-in (no password management)
-  Auto-create user account + score record on first login
-  User profile page showing:

   -  Name, email, avatar
   -  Native language (Spanish/German preference)
   -  Account creation date
   -  Total learning stats
   -  Grammar progress summary

-  Edit profile: change name, email, avatar upload

**Functional Requirements:**

-  [ ] Redirect unauthenticated users to `/[locale]/login`
-  [ ] PocketBase OAuth redirect handling
-  [ ] Auto-create `score` record with score=0 on signup
-  [ ] Store user preference for UI language (es/de)
-  [ ] Avatar file storage in PocketBase (max 5MB)
-  [ ] Logout functionality with session cleanup
-  [ ] Email verification optional (PocketBase handles)
-  [ ] Profile update form with validation

**Security Requirements:**

-  [ ] HTTPS only
-  [ ] No plain-text password storage
-  [ ] GDPR-compliant data handling
-  [ ] Session timeout: 30 days inactivity
-  [ ] Rate limit login attempts: 5 per minute per IP

**Success Metrics:**

-  OAuth success rate: >99%
-  Time to first authenticated page: <2 sec
-  Profile completion rate: >75% within 7 days

---

### **4.6 Feature: Internationalization (i18n)**

**Description:** Multi-language support with Spanish/German UI locales.

**Key Capabilities:**

-  All UI text in Spanish or German user's choice
-  Articles available in German with Spanish interface
-  Error messages localized
-  Date/time formatting per locale
-  Grammar examples in German with Spanish explanations

**Functional Requirements:**

-  [ ] URL structure includes locale: `/[locale]/app/vocabulary`
-  [ ] Locale stored in user profile
-  [ ] Dynamic content translation from `messages/es.json`, `messages/de.json`
-  [ ] Missing translations fallback to English (dev only)
-  [ ] 300+ keys covering all UI surfaces
-  [ ] Grammar/lesson content HTML rendered

**Supported Locales:**

-  `es` - Spanish (default)
-  `de` - German

**Success Metrics:**

-  Translation completeness: 100% UI coverage
-  User language retention: 95%+

---

## **5. USER WORKFLOWS**

### **5.1 User Journey: New User Onboarding**

```
1. Visit landing page (/)
2. See marketing messaging about Blabling
3. Click "Comienza a aprender" (Get Started)
4. Redirect to /[locale]/login
5. Click "Sign in with Google"
6. Google OAuth flow (consent screen)
7. Redirect to PocketBase callback
8. Auto-create user + score record
9. Redirect to /[locale]/app/home (dashboard)
10. First-time modal: "Welcome! Here's how to get started"
11. CTA: "Read your first article"
```

**Expected Duration:** 3-5 minutes
**Success Criteria:** User reaches dashboard and views ≥1 article

---

### **5.2 User Journey: Learn Through Reading**

```
1. Navigate to /[locale]/app/article
2. Browse article list (filtered by level or search)
3. Click article card
4. Open article view with German text
5. Select unknown word → translation tooltip shows
6. Click "Save word" button
7. Word added to vocabulary (level=hard)
8. Continue reading / scroll to bottom
9. Click "Take quiz" button
10. Answer 5-10 quiz questions (multiple choice)
11. Submit quiz → see score
12. If score ≥60%: "Article completed! ✓"
13. Redirect to next recommended article
```

**Expected Duration:** 12-15 minutes
**Success Criteria:**

-  ≥3 words saved
-  Quiz completed with ≥60%
-  Word count for article: 500-1500 words

---

### **5.3 User Journey: Daily Spaced Repetition Practice**

```
1. Dashboard shows "12 words due for review"
2. Navigate to /[locale]/app/vocabulary/practice
3. See first card: German word + pronunciation
4. Click to reveal: Spanish translation + examples
5. Rate difficulty: Easy | Medium | Hard
6. Card moves to "reviewed" pile
7. Next card loads (shuffled, new word)
8. Repeat steps 4-7 for all due cards
9. Progress bar shows: "8 of 12 reviewed"
10. Final card → "Session complete!"
11. Show stats: "You reviewed 12 words in 8 minutes"
12. Option: "Continue" or return to dashboard
```

**Expected Duration:** 8-15 minutes
**Success Criteria:**

-  ≥80% of due words reviewed
-  All ratings saved correctly
-  No duplicate cards in single session

---

### **5.4 User Journey: Learn Grammar**

```
1. Navigate to /[locale]/app/grammar
2. See levels: A1 (completed 4/5) | A2 (locked) | B1 (locked) | B2 (locked)
3. Click A1 level → expand topics
4. See topics: articles, present tense, cases, etc.
5. Click "Present tense" topic
6. Read markdown lesson with examples
7. See conjugation table: ich, du, er, wir, ihr, sie
8. Click "Take quiz" button
9. Answer 5 grammar questions (fill-in-blank or multiple choice)
10. Submit quiz
11. If ≥60%: "Topic complete!" → mark as done
12. If <60%: "Try again" → retry quiz
13. Level progress updates: "5 of 5 complete!"
14. A2 level unlocks
```

**Expected Duration:** 15-20 minutes per topic
**Success Criteria:**

-  Quiz ≥60% to mark complete
-  Lesson content fully readable
-  Progress persists across sessions

---

### **5.5 User Journey: Check Progress & Motivation**

```
1. Visit /[locale]/app/home (dashboard)
2. See stats cards:
   - "423 words saved"
   - "284 mastered"
   - "67% vocabulary mastery"
   - "🔥 7-day streak"
3. View 7-day calendar: show which days practiced
4. See leaderboard: "You're #14 this week"
5. Get recommendation: "Read 'Kaffeekultur' article next"
6. See quick links: "Continue practice | New article | Grammar"
7. Feel motivated to continue learning
```

**Expected Duration:** 2-3 minutes
**Success Criteria:** Dashboard loads in <2 sec, accurate stat calculations

---

## **6. FUNCTIONAL REQUIREMENTS BY FEATURE**

### **6.1 Non-Functional Requirements**

| Requirement       | Target                                            |
| ----------------- | ------------------------------------------------- |
| Page Load Time    | <2 sec (95th percentile)                          |
| API Response Time | <500ms                                            |
| Uptime            | 99.5%                                             |
| Mobile Responsive | 100% (iOS Safari, Android Chrome)                 |
| Accessibility     | WCAG 2.1 AA                                       |
| Browser Support   | Chrome, Firefox, Safari, Edge (latest 2 versions) |
| Database Queries  | <100ms per request                                |
| Concurrent Users  | 1000+ simultaneous                                |
| Data Backup       | Daily, 30-day retention                           |

### **6.2 Data Requirements**

**Vocabulary Collection (PocketBase)**

-  Minimum 2000+ German words
-  Each word includes: conjugations, examples (2-3), cases, frequency rank, CEFR level
-  Prioritize: A1-B1 frequency range
-  Update frequency: quarterly (add new words)

**Articles Collection**

-  Minimum 50 articles across all levels:
   -  A1: 15 articles
   -  A2: 15 articles
   -  B1: 12 articles
   -  B2: 8 articles
-  Each article: 500-1500 words
-  Include metadata: difficulty, read time estimate, quiz (5 questions min)
-  Curate topics: culture, news, daily life, technology

**Grammar Topics Collection**

-  16+ grammar topics (4 per level)
-  Content: markdown-formatted explanations + examples
-  Each topic: 800-1200 words
-  Include conjugation tables, charts, real-world examples

**Quiz Questions**

-  200+ questions across all articles & grammar
-  Multiple-choice format with 4 options
-  Question types:
   -  Vocabulary (word selection)
   -  Grammar (fill-in-blank, verb conjugation)
   -  Comprehension (true/false about article)
-  Random selection: 5-10 questions per quiz

---

## **7. TECHNICAL ARCHITECTURE**

### **7.1 Tech Stack (Current)**

-  **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS, DaisyUI
-  **State Management:** React Query (@tanstack/react-query)
-  **Backend:** PocketBase 0.10.1 (self-hosted)
-  **Authentication:** OAuth 2.0 (Google)
-  **i18n:** next-intl
-  **External APIs:** LinguaTools (RapidAPI) for word specs
-  **Hosting:** [TBD - assumed Vercel or self-hosted]

### **7.2 Data Model (PocketBase Collections)**

```typescript
// users
{
  id: string
  email: string
  name: string
  avatar: File
  score: number
  language_preference: 'es' | 'de'
  created: Date
}

// vocabulary (master word list)
{
  id: string
  german_word: string
  spanish_translation: string
  conjugation: object
  examples: string[]
  cases: {nominative, genitive, dative, accusative}
  synonyms: string[]
  antonyms: string[]
  ipa_pronunciation: string
  frequency_rank: number (1-5000)
  cefr_level: 'A1' | 'A2' | 'B1' | 'B2'
}

// userVocabularyProgress (per-user word tracking)
{
  id: string
  user_id: string
  word_id: string
  level: 'easy' | 'medium' | 'hard'
  last_time_seen: Date
  times_seen: number
  level_history: array
  created: Date
}

// articles
{
  id: string
  title: string
  level: 'A1' | 'A2' | 'B1' | 'B2'
  text_content: string (German)
  image: File
  estimated_read_time: number (minutes)
  word_count: number
  quiz_id: string
  created: Date
}

// userArticlesProgress
{
  id: string
  user_id: string
  article_id: string
  is_completed: boolean
  highest_score_ever: number
  number_of_attempts: number
  created: Date
  updated: Date
}

// grammar
{
  id: string
  level: 'A1' | 'A2' | 'B1' | 'B2'
  topic_name: {es: string, de: string}
  content: string (markdown)
  quiz_id: string
  difficulty: 1-5
  created: Date
}

// userGrammarProgress
{
  id: string
  user_id: string
  grammar_id: string
  isCompleted: boolean
  dateCompleted: Date
  created: Date
}

// quizzes
{
  id: string
  article_id: string | null
  grammar_id: string | null
  questions: array [
    {question_de: string, question_es: string, options: [4], correct: string, type: string}
  ]
}

// score (leaderboard)
{
  id: string
  user_id: string
  score: number
  position: number
  week_starting: Date
}
```

---

## **8. SUCCESS METRICS & KPIs**

### **Engagement Metrics**

| Metric                            | Target  | Frequency |
| --------------------------------- | ------- | --------- |
| Daily Active Users (DAU)          | 500+    | Daily     |
| Weekly Active Users (WAU)         | 1500+   | Weekly    |
| Monthly Active Users (MAU)        | 3000+   | Monthly   |
| Avg Session Duration              | 15+ min | Daily     |
| Sessions per User/Week            | 4+      | Weekly    |
| Vocabulary practice sessions/week | 3+      | Weekly    |

### **Learning Outcomes**

| Metric                       | Target                           | Frequency |
| ---------------------------- | -------------------------------- | --------- |
| Vocabulary mastery rate      | 65%+ of saved words reach "easy" | Monthly   |
| Article completion rate      | >70% of opened articles          | Daily     |
| Quiz pass rate (≥60%)        | 75%+                             | Daily     |
| Grammar topic completion     | 30%+ users reach B1              | Quarterly |
| Streak maintenance (7+ days) | 40%+ of DAU                      | Weekly    |

### **Retention Metrics**

| Metric           | Target    | Frequency |
| ---------------- | --------- | --------- |
| 1-day retention  | 60%+      | Daily     |
| 7-day retention  | 40%+      | Weekly    |
| 30-day retention | 25%+      | Monthly   |
| Churn rate       | <5%/month | Monthly   |

### **Content Metrics**

| Metric                       | Target             | Frequency |
| ---------------------------- | ------------------ | --------- |
| Words saved per article read | 3+                 | Daily     |
| Article read time (avg)      | 10-15 min          | Daily     |
| New articles read/user/week  | 1.5+               | Weekly    |
| Grammar topics started (avg) | 1+ per active user | Monthly   |

### **Business Metrics**

| Metric                   | Target       | Note                         |
| ------------------------ | ------------ | ---------------------------- |
| Acquisition cost (CAC)   | <€2 per user | Social/organic focus         |
| Lifetime value (LTV)     | >€20         | Based on freemium conversion |
| Conversion to premium    | 8-12%        | [TBD if premium tier exists] |
| NPS (Net Promoter Score) | 50+          | Quarterly survey             |

---

## **9. OUT OF SCOPE (Phase 1)**

The following features are NOT part of the current MVP but could be future enhancements:

-  [ ] Mobile native app (iOS/Android)
-  [ ] Offline mode / PWA
-  [ ] Social features (friend connections, group study)
-  [ ] Audio recording for pronunciation practice
-  [ ] AI-powered conversational partner
-  [ ] Writing practice with auto-correction
-  [ ] Podcast/video content
-  [ ] Premium subscription tier
-  [ ] Certification exams
-  [ ] Instructor/teacher dashboard

---

## **10. ACCEPTANCE CRITERIA & QA**

### **Feature: Interactive Article Reading**

-  [ ] User can select any word and see tooltip with translation
-  [ ] Tooltip disappears on click outside
-  [ ] "Save word" button saves to vocabulary with level=hard
-  [ ] Duplicate saves don't create duplicate records
-  [ ] Quiz appears after scroll to bottom
-  [ ] Quiz ≥60% marks article as completed
-  [ ] Highest score persists across attempts
-  [ ] Mobile: single-tap selects word (no double-tap)
-  [ ] A11y: keyboard navigation works for all buttons

### **Feature: Spaced Repetition**

-  [ ] Cards show only if word is due for review
-  [ ] Never-seen words always show
-  [ ] Shuffle removes duplicate cards in one session
-  [ ] Difficulty rating updates `level` and `last_time_seen`
-  [ ] Easy/Medium/Hard buttons all functional
-  [ ] Progress bar updates in real-time
-  [ ] Session can be abandoned and resumed (cards don't reset)
-  [ ] Mobile: swipe to next card supported

### **Feature: Grammar**

-  [ ] Locked levels show lock icon + "Complete Level X first"
-  [ ] Level unlock happens on (5 of 5 topics complete)
-  [ ] Quiz is mandatory to mark complete
-  [ ] Quiz <60% shows "Try again" button
-  [ ] Markdown renders correctly with syntax highlighting
-  [ ] Conjugation tables display properly on mobile
-  [ ] Navigation to next level works after unlock
-  [ ] A11y: all form inputs keyboard accessible

### **Feature: Dashboard**

-  [ ] All stats calculate correctly (verify against DB)
-  [ ] 7-day calendar shows correct practice days
-  [ ] Streak counter matches max consecutive days
-  [ ] Leaderboard updates daily by 11 PM UTC
-  [ ] Recommended content refreshes on page reload
-  [ ] Mobile: stats stack vertically, no overflow
-  [ ] All CTAs navigate to correct pages

---

## **11. RELEASE PLAN & ROADMAP**

### **Phase 1: MVP (Current)**

✅ Core learning loop (articles → vocabulary → grammar)
✅ Spaced repetition engine
✅ User authentication
✅ Dashboard with basic stats
✅ Gamification (streaks, leaderboard)
✅ Internationalization (es/de)

**Target:** Q4 2025 (public beta)

### **Phase 2: Growth (Q1 2026)**

-  [ ] Expand vocabulary database (5000+ words)
-  [ ] Add 30+ more articles
-  [ ] User engagement campaigns
-  [ ] Performance optimization
-  [ ] Advanced analytics dashboard

### **Phase 3: Premium (Q2 2026)**

-  [ ] Premium tier with ad removal
-  [ ] Offline article downloads
-  [ ] Dedicated tutoring (live sessions)
-  [ ] Progress reports/certification

### **Phase 4: Scale (Q3+ 2026)**

-  [ ] Mobile apps (iOS/Android)
-  [ ] Additional languages
-  [ ] AI tutoring features
-  [ ] Corporate training packages

---

## **12. ASSUMPTIONS & CONSTRAINTS**

### **Assumptions**

1. PocketBase remains stable and accessible
2. Google OAuth availability unchanged
3. Users have stable internet connection
4. Majority of users access via desktop/tablet
5. Spanish speakers are primary audience
6. Users commit to daily/weekly practice for best results
7. External APIs (LinguaTools, Reverso) remain available

### **Constraints**

-  **Technical:** PocketBase self-hosted (scaling considerations)
-  **Content:** Limited to 2000+ words initially (expansion needed)
-  **Time:** MVP launched on develop branch (not yet production)
-  **Budget:** No premium revenue stream (freemium model only)
-  **Locales:** Spanish/German only (no expansion yet)

---

## **13. DEPENDENCIES & RISKS**

### **External Dependencies**

| Dependency              | Risk Level | Mitigation                               |
| ----------------------- | ---------- | ---------------------------------------- |
| PocketBase availability | Medium     | Monitor uptime, have backup plan         |
| Google OAuth            | Medium     | Implement fallback auth method           |
| LinguaTools API         | High       | Cache responses, maintain local DB       |
| Vercel/Hosting          | Medium     | Multiple CDN options, self-hosted backup |

### **Internal Risks**

| Risk                     | Impact | Probability | Mitigation                      |
| ------------------------ | ------ | ----------- | ------------------------------- |
| Vocabulary quality       | High   | Low         | Peer review, native speaker QA  |
| User churn after 30 days | High   | Medium      | Improve onboarding, engagement  |
| Performance on mobile    | Medium | Medium      | Optimize images, lazy loading   |
| Data privacy issues      | High   | Low         | GDPR compliance, regular audits |

---

## **14. GLOSSARY & DEFINITIONS**

| Term                  | Definition                                                                 |
| --------------------- | -------------------------------------------------------------------------- |
| **CEFR**              | Common European Framework of Reference for Languages (A1-C2 levels)        |
| **Spaced Repetition** | Learning technique spacing reviews over increasing intervals (7d, 3d, 1d)  |
| **Flashcard**         | Digital study card with German word (front) and Spanish translation (back) |
| **Quiz**              | Multiple-choice assessment (5-10 questions, pass ≥60%)                     |
| **Streak**            | Consecutive days user practices ≥1 vocabulary review                       |
| **Mastered**          | Word classified as "easy" level after multiple reviews                     |
| **Due for Review**    | Word whose last_seen date is older than review interval                    |
| **Leaderboard**       | Weekly ranking of users by score (global, top 10)                          |
| **DAU/WAU/MAU**       | Daily/Weekly/Monthly Active Users                                          |

---

## **15. APPENDIX: FILE REFERENCE**

| File Path                                     | Purpose                                 |
| --------------------------------------------- | --------------------------------------- |
| `src/modules/actions/articles.actions.ts`     | Article CRUD, progress tracking         |
| `src/modules/actions/cards.actions.ts`        | Vocabulary operations, spaced rep logic |
| `src/modules/actions/grammar.actions.ts`      | Grammar lessons, progress               |
| `src/modules/actions/translations.actions.ts` | Word translation, vocabulary save       |
| `src/hooks/`                                  | React Query wrappers for all actions    |
| `src/components/atoms/`                       | 14 basic UI components                  |
| `src/components/molecules/`                   | 18 composite components                 |
| `src/components/organisms/`                   | 14 page sections                        |
| `src/app/[locale]/app/`                       | Protected authenticated pages           |
| `messages/es.json`                            | Spanish translations (~390 keys)        |
| `messages/de.json`                            | German translations (~390 keys)         |

---

**PRD Created:** December 18, 2025
**Document Owner:** Product Team
**Last Review:** Pending stakeholder sign-off
**Next Review Date:** Q1 2026
