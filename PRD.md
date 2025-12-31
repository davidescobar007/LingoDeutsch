# **PRODUCT REQUIREMENTS DOCUMENT**

## **LingoDeutsch (Blabling)**

### _German Language Learning Platform for Spanish Speakers_

**Document Version:** 1.0
**Last Updated:** December 18, 2025
**Status:** Active Development

---

## **1. EXECUTIVE SUMMARY**

**LingoDeutsch** (branded as "Blabling") is a **German language learning platform** designed to help Spanish-speaking users build German proficiency through a grammar-first approach: structured grammar foundation → contextual article reading → spaced repetition vocabulary reinforcement. MVP launches with A1 level only, ensuring pedagogical soundness before expansion.

**Core Value Proposition:**

-  Learn German grammar systematically first (A1: articles, present tense, cases, plurals)
-  Understand the German language system before reading articles
-  Read comprehensible A1 articles (75-80% word recognition) after grammar foundation
-  Reinforce learning through spaced repetition (simple, focused vocabulary)
-  Bilingual interface (Spanish/German) with clear progress indicators
-  Gamification (streaks, achievements) maintaining motivation without pressure

**Business Model:** Freemium for MVP (all features free). Premium tier (Phase 2+) to be determined.

---

## **2. PRODUCT OVERVIEW**

### **2.1 Vision**

Become the preferred German learning platform for serious Spanish-speaking learners seeking **pedagogically-sound, structured education** (grammar-first approach, CEFR framework, transparent progress) rather than casual gamification. Differentiate through grammar-first methodology and clear progression pathways.

### **2.2 Target Markets**

-  **Primary:** Spanish speakers aged 18+ seeking conversational German
-  **Secondary:** Language enthusiasts wanting structured learning
-  **Tertiary:** Professionals needing German for work/travel

### **2.3 Success Definition**

-  70%+ of signups complete A1 grammar foundation (5 topics, all quizzes ≥60%)
-  Users progress from grammar → articles within 2-4 weeks
-  70%+ quiz pass rate on grammar lessons (indicates solid pedagogy)
-  Users read 2+ A1 articles per week after grammar completion
-  75%+ comprehension quiz scores on articles (understand content)
-  65%+ of vocabulary reaches "easy" level through spaced rep
-  Streak maintenance: 30%+ of active users maintain 7+ day streaks
-  User retention: 40%+ at 7-day, 25%+ at 30-day mark

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

### **4.1 Feature: Structured Grammar Curriculum (PRIMARY GATE)**

**Description:** Foundational grammar lessons organized by CEFR level (A1 only for MVP). Users learn grammar system first, enabling comprehension of subsequent articles. Grammar completion unlocks article access.

**Key Capabilities:**

-  **MVP (A1 Only):** 5 structured topics
   -  Articles & Gender (der, die, das)
   -  Present Tense Conjugation (ich, du, er, wir, ihr, sie)
   -  Nominative & Accusative Cases
   -  Plurals & Noun Declension
   -  Basic Sentence Structure
-  Each topic contains:
   -  Markdown lesson (15 min) with examples & conjugation tables
   -  15-20 embedded vocabulary words (integrated, not separate)
   -  6-8 question quiz (must score ≥60% to complete)
-  Visual progress indicator per level: "3 of 5 topics complete"
-  Lock/unlock system: Must complete A1 before accessing A2 (Phase 2)
-  Topic recommendations: highlight next suggested topic

**Functional Requirements:**

-  [ ] Display 5 A1 topics (no expansion beyond A1 for MVP)
-  [ ] Render markdown grammar content with syntax highlighting
-  [ ] Embed 15-20 vocabulary words within grammar lesson
-  [ ] Quiz randomized, multi-choice + fill-in-blank format
-  [ ] Mark topic complete when quiz ≥60% (not optional)
-  [ ] Track `dateCompleted` for analytics & progression
-  [ ] Show lock icon on unavailable levels (A2+ locked until A1 complete)
-  [ ] Progress bar: "3 of 5 topics completed in A1"
-  [ ] Grammar completion gates article access (unlock articles only after 5/5 topics)

**MVP Grammar Topics:**

| Topic                   | Vocabulary   | Quiz Q           | Time        |
| ----------------------- | ------------ | ---------------- | ----------- |
| Articles & Gender       | 20 words     | 8                | 15 min      |
| Present Tense           | 20 words     | 8                | 20 min      |
| Nominative & Accusative | 15 words     | 6                | 15 min      |
| Plurals & Declension    | 15 words     | 6                | 12 min      |
| Sentence Structure      | 10 words     | 6                | 12 min      |
| **TOTAL A1**            | **80 words** | **34 questions** | **~75 min** |

**Success Metrics:**

-  70%+ of signups complete A1 grammar (mandatory pathway)
-  Quiz pass rate: >80% (indicates quality lessons)
-  Avg time per topic: 15-20 minutes
-  Users progress to articles within 2-4 weeks

---

### **4.2 Feature: Interactive Article Reading (UNLOCKED AFTER GRAMMAR)**

**Description:** Users read comprehensible A1 German articles (designed with grammar constraints) with inline translation and comprehension quizzes. Articles reinforce grammar learned.

**Key Capabilities:**

-  **MVP (A1 Only):** 10-12 articles, 200-300 words each
   -  Grammar-constrained: present tense only + nominative/accusative cases
   -  Tagged with grammar concepts: "Uses: present tense, accusative case"
   -  Topics: daily life, culture, simple stories
-  Interactive word selection: click any word to see:
   -  Spanish translation
   -  Grammatical info (part of speech, case, tense)
   -  Example sentence
   -  IPA pronunciation
-  Comprehension quiz after article (5-8 questions, ≥60% to complete)
-  Save unknown words directly to vocabulary practice deck
-  Track progress: "8 of 12 articles completed"
-  View article metadata: estimated read time, word count, grammar used

**Functional Requirements:**

-  [ ] Articles locked until A1 grammar 100% complete (gate mechanism)
-  [ ] Display 10-12 A1 articles (no expansion for MVP)
-  [ ] Sort by recommended order (based on grammar complexity progression)
-  [ ] Search/filter by difficulty or grammar tags
-  [ ] Quiz modal after scroll-to-bottom or explicit button click
-  [ ] Highest score tracking per article
-  [ ] Attempt counter for progress analytics
-  [ ] Saved words auto-tagged with source (article name)
-  [ ] Mobile: finger-tap selects words accurately (no double-tap conflict)
-  [ ] Keyboard accessible: tab through words for accessibility

**Success Metrics:**

-  Users read 2+ articles per week (after grammar completion)
-  Comprehension quiz avg score: 75%+ (understand content)
-  Words saved: 1-2 per article (they recognize most words)
-  Avg reading time: 8-12 minutes per article

---

### **4.3 Feature: Spaced Repetition Vocabulary Practice (SUPPORTING)**

**Description:** Personalized flashcard review system reinforcing vocabulary from grammar lessons and articles. Supporting role with focused, contextual word set (~300 words for MVP).

**Key Capabilities:**

-  Flashcard deck: German word (front) + Spanish translation (back)
-  Show extended word details: example sentence, grammatical info (part of speech, case), IPA pronunciation
-  Rate difficulty: Easy (7-day interval) | Medium (3-day) | Hard (1-day)
-  Auto-shuffle deck for randomization
-  Track "last review" date for each word
-  Filter by level (All, Easy, Medium, Hard)
-  Daily recommendation: "X words due for review"
-  Track word source: grammar lesson or article

**Functional Requirements:**

-  [ ] Only show words due for review (today's date ≥ last_review + interval)
-  [ ] Never-reviewed words always due
-  [ ] Prevent cards from appearing until review date
-  [ ] Update `times_reviewed` counter on each review
-  [ ] Maintain review history for analytics
-  [ ] Prevent duplicate card display in single session
-  [ ] Show progress bar: "8 of 12 reviewed today"
-  [ ] Mobile: swipe right/left to rate difficulty
-  [ ] Keyboard accessible: Tab to next card, arrow keys to rate

**Business Logic:**

```typescript
Review Intervals:
- Easy:   7 days
- Medium: 3 days
- Hard:   1 day

Word marked Due if:
  !lastReviewDate || (now - lastReviewDate) >= interval
```

**Success Metrics:**

-  Users spend avg 8-12 min/session on practice
-  65%+ of words reach "easy" level (retention target)
-  Daily practice rate: 40%+ of DAU do ≥1 session
-  Avg words reviewed per session: 10-15

---

### **4.4 Feature: Dashboard & Progress Analytics**

**Description:** User homepage showing grammar progress, vocabulary stats, streaks, and achievement badges. Motivates continued learning and displays clear progression.

**Key Capabilities:**

-  **Progress Cards (Grammar-Centric):**

   -  A1 Grammar: "4 of 5 topics complete (80%)"
   -  Vocabulary learned: "120 words (from grammar + articles)"
   -  Vocabulary mastery %: "65% are 'easy' level"
   -  Streak counter: "🔥 7 days practicing"
   -  Words practiced today: "8 reviewed"

-  **7-Day Activity Calendar:** Visual grid showing days with practice (≥10 min sessions)

-  **Quick Actions (Prioritized):**

   -  "Continue A1 Grammar: [Next Topic]" (primary, if not complete)
   -  "Read next article" (if grammar complete)
   -  "Practice vocabulary (X due)" (supporting)

-  **Achievement Badges:**

   -  🏆 A1 Grammar Master (complete all 5 topics)
   -  📖 Article Starter (read first article)
   -  🔥 Week on Fire (7-day streak)
   -  💪 100 Words Learned

-  **Recommended Next Steps:**

   -  "Complete grammar: 1 topic remaining" (if in progress)
   -  "First article waiting: [Recommended Article]" (if grammar complete)
   -  "Due vocabulary: X words" (ongoing)

**Functional Requirements:**

-  [ ] Real-time stat calculation from PocketBase
-  [ ] Grammar progress calculated: topics_completed / 5 (A1 only for MVP)
-  [ ] Streak counter: ≥10 min practice session = day completed
-  [ ] 7-day calendar auto-populates from practice session timestamps
-  [ ] "Mastery %" = (easy_words / total_words) \* 100
-  [ ] Show different CTA based on user state (grammar-first → articles → vocab)
-  [ ] Animated stat cards on page load
-  [ ] Mobile: stats stack vertically, badges show in row
-  [ ] No leaderboard for MVP (Phase 2+)

**Gamification Elements:**

-  Achievement badges (4 core badges for MVP)
-  Streak counter (motivational, not punitive)
-  Progress bar visibility (grammar % → articles % → mastery %)
-  Optional "freeze" on streak: can skip 1 day/week without breaking (Phase 2)

**Success Metrics:**

-  Dashboard engagement: >60% daily active users
-  Streak maintenance: 30%+ of active users maintain 7+ day streaks
-  Grammar-to-articles conversion: 60%+ of grammar completers read articles

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
2. See marketing: "Learn German grammar systematically"
3. Click "Comienza a aprender" (Get Started)
4. Redirect to /[locale]/login
5. Click "Sign in with Google"
6. Google OAuth flow (consent screen)
7. Redirect to PocketBase callback
8. Auto-create user account
9. Onboarding modal:
   - "Welcome to Blabling!"
   - "You'll learn grammar first, then read articles you understand"
   - Select practice frequency: "10 min / 20 min / 30+ min daily"
10. Redirect to /[locale]/app/grammar
11. First topic highlighted: "Articles & Gender (Start here)"
```

**Expected Duration:** 3-5 minutes
**Success Criteria:** User reaches first grammar lesson and completes ≥1 quiz

---

### **5.2 User Journey: Learn a Grammar Topic**

```
1. Navigate to /[locale]/app/grammar
2. See A1 level: "3 of 5 topics complete"
3. Next incomplete topic highlighted: "Nominative & Accusative Cases"
4. Click topic → Open lesson view
5. Read markdown lesson (15 min):
   - Explanation with examples
   - Conjugation/declension tables
   - Embedded vocabulary (10-15 words shown inline)
   - Practice examples: "Die Frau sieht den Mann"
6. At bottom: "Take quiz" button
7. Quiz modal: 6-8 questions
   - Q1: "Which case is the subject?" (multiple choice)
   - Q2: "Conjugate: Der ___ (man) sieht..." (fill-in-blank)
   - Q3-8: Grammar + vocabulary mix
8. Submit quiz
9. If score ≥60%: "Topic complete! 🎉"
   - Progress updates: "4 of 5 topics"
   - Achievement unlock: "Case Master"
   - Next topic highlighted
10. If <60%: "Try again" → retry quiz immediately
```

**Expected Duration:** 15-20 minutes per topic
**Success Criteria:**

-  Quiz ≥60% to mark complete
-  Lesson markdown renders correctly
-  Vocabulary embedded and visible
-  Progress persists across sessions
-  All 5 topics completable → unlocks articles

---

### **5.3 User Journey: Read Articles (After Grammar Complete)**

```
1. After A1 grammar 100% complete, articles unlock
2. Dashboard CTA: "Read your first article!"
3. Navigate to /[locale]/app/articles
4. See A1 articles: "10-12 available"
5. Recommended article card shown: "Ein Tag in Berlin"
6. Click article → Open reader view
7. Read German text (300 words, present tense + accusative)
8. Click unknown word → tooltip shows:
   - Spanish translation
   - Part of speech & case
   - Example: "Ich sehe den Mann"
   - IPA: [pronunciation]
9. Optional: "Save word" button adds to vocabulary deck
10. Scroll to bottom → comprehension quiz modal
11. Answer 5-8 questions about article content
12. Submit quiz
13. If ≥60%: "Article completed! ✓"
    - Progress: "1 of 12 articles"
    - Stat update: "120 words learned"
    - Recommendation: "Read next article?"
14. If <60%: "Try again" → retake quiz
```

**Expected Duration:** 10-15 minutes per article
**Success Criteria:**

-  Articles only accessible after grammar 100% complete
-  User understands 75%+ of content (quiz avg 75%+)
-  Words saved: 1-2 per article (recognize most words)
-  Mobile: word selection works with finger tap

---

### **5.4 User Journey: Daily Vocabulary Practice**

```
1. Dashboard shows: "8 words due for review"
2. Navigate to /[locale]/app/vocabulary/practice
3. See first flashcard: German word (large) + IPA pronunciation
4. Click card to reveal: Spanish translation + example sentence + grammar info
5. Rate difficulty:
   - Easy (7-day interval) → I know this well
   - Medium (3-day interval) → I recognize it
   - Hard (1-day interval) → I need more practice
6. Card marked as reviewed, next card loads (shuffled)
7. Repeat for all due words
8. Progress bar: "6 of 8 reviewed"
9. Final card → "Session complete! 🎉"
10. Show stats:
    - "You reviewed 8 words in 7 minutes"
    - "Total mastery: 65% (easy level)"
    - "New words this week: 3"
11. Option: "Continue practice" or "Return to dashboard"
```

**Expected Duration:** 8-12 minutes per session
**Success Criteria:**

-  Only due words shown (no cards before review date)
-  Difficulty ratings update intervals correctly
-  No duplicate cards in one session
-  Progress persists across sessions
-  Mobile: swipe left/right to rate difficulty (optional)

---

### **5.5 User Journey: Check Progress & Stay Motivated**

```
1. Visit /[locale]/app/home (dashboard)
2. See grammar progress card: "A1: 4 of 5 topics complete (80%)"
3. See vocabulary stats:
   - "120 words learned"
   - "65% are 'easy' level (mastered)"
4. See streak counter: "🔥 7 days"
5. View 7-day activity calendar: days with practice marked
6. See achievement badges earned:
   - 🏆 A1 Grammar Master (complete all 5)
   - 📖 Article Starter (read 1st article)
   - 🔥 Week on Fire (7-day streak)
7. See quick actions (prioritized):
   - "Continue A1 Grammar: [Nominative & Accusative]" (if not complete)
   - OR "Read next article" (if grammar complete)
   - "Practice vocabulary (5 due today)"
8. See recommendation: "You're doing great! Next up: Read 'Berlin' article"
9. Optional: Share progress or check learning tips
```

**Expected Duration:** 2-3 minutes
**Success Criteria:**

-  Dashboard loads <2 sec
-  Grammar progress visible + primary stat
-  CTAs are contextual (grammar first → articles → vocabulary)
-  Achievements show progress toward goals
-  Mobile: stats stack vertically with no overflow

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

### **6.2 Data Requirements (MVP - A1 Only)**

**Vocabulary Collection**

-  **MVP:** ~300 total German words (80 embedded in grammar + 200-300 from articles)
-  Each word includes: Spanish translation, example sentence, grammatical info (POS, case), IPA pronunciation
-  Prioritize: A1 frequency words (most common 500-1000 German words)
-  Source: Grammar-embedded words + article saves
-  **Phase 2:** Expand to 1000+ words (A1-A2)

**Grammar Topics Collection**

-  **MVP:** 5 A1 topics only
   -  Articles & Gender
   -  Present Tense Conjugation
   -  Nominative & Accusative Cases
   -  Plurals & Noun Declension
   -  Basic Sentence Structure
-  Each topic: markdown lesson (500-800 words) + 15-20 embedded vocabulary
-  Include: conjugation tables, declension charts, 5-8 practice examples
-  **Phase 2:** Add A2 grammar (5 topics)

**Articles Collection**

-  **MVP:** 10-12 A1 articles only
   -  Grammar constraint: present tense + nominative/accusative only
   -  Length: 200-300 words per article
   -  Topics: daily life, basic conversations, simple descriptions
   -  Include metadata: estimated read time, grammar tags, difficulty
   -  Include comprehension quiz (5-8 questions min)
-  **Phase 2:** Add A2 articles (10-12, with dative case + past tense)

**Quiz Questions**

-  **MVP:** ~94 total questions
   -  Grammar quizzes: 34 questions (6-8 per topic × 5 topics)
   -  Article quizzes: 60 questions (5-8 per article × 12 articles)
-  Multiple-choice + fill-in-blank format
-  Question types:
   -  Grammar (conjugation, declension, cases)
   -  Vocabulary (embedded word recall)
   -  Comprehension (article content understanding)
-  Random presentation to prevent memorization

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

### **Learning Outcomes (Primary Metrics - Grammar-First)**

| Metric                           | Target                          | Frequency |
| -------------------------------- | ------------------------------- | --------- |
| A1 Grammar Completion Rate       | 70%+ of signups complete all 5  | Monthly   |
| Grammar Quiz Pass Rate (≥60%)    | 80%+ (well-designed lessons)    | Daily     |
| Time to First Article            | 2-4 weeks from signup           | Monthly   |
| Grammar-to-Articles Conversion   | 60%+ of grammar completers      | Monthly   |
| Article Comprehension (quiz avg) | 75%+ score (understand content) | Daily     |
| Vocabulary Mastery Rate          | 65%+ of learned words "easy"    | Monthly   |
| Articles Read/User/Week (avg)    | 2+ per user (after grammar)     | Weekly    |

### **Engagement Metrics**

| Metric                       | Target                      | Frequency |
| ---------------------------- | --------------------------- | --------- |
| Daily Active Users (DAU)     | 300+                        | Daily     |
| Weekly Active Users (WAU)    | 800+                        | Weekly    |
| Monthly Active Users (MAU)   | 2000+                       | Monthly   |
| Avg Session Duration         | 15-20 min (grammar focused) | Daily     |
| Sessions per User/Week       | 4+                          | Weekly    |
| Streak Maintenance (7+ days) | 30%+ of DAU                 | Weekly    |

### **Retention Metrics**

| Metric           | Target    | Frequency |
| ---------------- | --------- | --------- |
| 1-day retention  | 60%+      | Daily     |
| 7-day retention  | 40%+      | Weekly    |
| 30-day retention | 25%+      | Monthly   |
| Churn rate       | <5%/month | Monthly   |

### **Business Metrics (MVP Phase)**

| Metric                             | Target           | Note                          |
| ---------------------------------- | ---------------- | ----------------------------- |
| Acquisition cost (CAC)             | <€1 per user     | Organic/word-of-mouth focus   |
| Signup → A1 Completion Conversion  | 70%              | Key funnel metric             |
| Signup → First Article Conversion  | 60%              | Grammar-to-articles success   |
| User engagement: session frequency | 4+ sessions/week | Indicates habit formation     |
| Premium conversion (Phase 2+)      | 8-12%            | TBD - depends on premium tier |
| NPS (Net Promoter Score)           | 50+              | Quarterly survey              |

---

## **9. OUT OF SCOPE (MVP Phase)**

The following features are NOT part of the current MVP (A1 only):

-  [ ] A2, B1, B2 grammar & articles (Phase 2+)
-  [ ] Leaderboards/social ranking (Phase 2+)
-  [ ] Mobile native app (iOS/Android)
-  [ ] Offline mode / PWA
-  [ ] Streak "freeze" feature (mercy days)
-  [ ] Audio recording for pronunciation
-  [ ] AI-powered conversational partner
-  [ ] Writing practice with auto-correction
-  [ ] Podcast/video content
-  [ ] Premium subscription tier (Phase 2+)
-  [ ] Certification exams
-  [ ] User profiles / avatar upload
-  [ ] Advanced spaced repetition (SM-2 algorithm)
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

### **Phase 1: MVP - A1 Foundation (Current)**

**Grammar-First Architecture:**
✅ A1 Grammar Curriculum (5 topics, ~80 embedded words)
✅ A1 Articles (10-12, grammar-constrained, 200-300 words)
✅ Spaced Repetition Vocabulary (supporting, ~300 focused words)
✅ User Authentication (Google OAuth)
✅ Dashboard & Progress Tracking (grammar-centric)
✅ Achievement Badges (4 core badges)
✅ Internationalization (es/de)

**MVP Success Criteria:**

-  70%+ of signups complete A1 grammar
-  60%+ of grammar completers read articles
-  75%+ article comprehension (quiz avg)
-  40%+ 7-day retention rate

**Target:** Q1 2026 (public beta)

### **Phase 2: A2 Expansion (Q2 2026)**

-  [ ] A2 Grammar (5 topics, ~100 words, adds dative case + past tense)
-  [ ] A2 Articles (10-12, dative + past tense)
-  [ ] Leaderboards (weekly ranking by streak + grammar level)
-  [ ] User profiles (avatar upload, language preference)
-  [ ] Advanced spaced repetition (SM-2 algorithm)
-  [ ] Performance optimization & caching

### **Phase 3: B1 Content & Premium (Q3 2026)**

-  [ ] B1 Grammar (5 topics, complex structures)
-  [ ] B1 Articles (10-12, subordinate clauses, modal verbs)
-  [ ] Premium tier (unlimited content, ad-free, offline articles)
-  [ ] Mobile app optimization / responsive improvements
-  [ ] User engagement campaigns

### **Phase 4: Scale & Adjacent Features (Q4 2026+)**

-  [ ] B2 Grammar & Articles
-  [ ] Mobile native apps (iOS/Android)
-  [ ] AI tutoring (pronunciation feedback, writing correction)
-  [ ] Certification exams (CEFR-aligned)
-  [ ] Teacher/school dashboard
-  [ ] Additional language pairs (English→German, French→German)

---

## **12. ASSUMPTIONS & CONSTRAINTS**

### **Assumptions**

1. Grammar-first approach improves retention vs. articles-first (hypothesis to validate)
2. PocketBase remains stable and accessible (self-hosted)
3. Google OAuth availability unchanged
4. Users have stable internet connection (web-first)
5. Spanish speakers are primary audience (validated by target market)
6. Users prefer structured learning over chaotic vocabulary lists
7. A1 content (5 topics + 10-12 articles) sufficient for MVP validation
8. Spaced repetition algorithm (7d/3d/1d) drives adequate retention

### **Constraints**

-  **Technical:** PocketBase self-hosted (scaling to 10k MAU before optimization needed)
-  **Content:** MVP limited to A1 only (~5 topics, 10-12 articles, 300 words). A2+ requires Phase 2.
-  **Time:** Target Q1 2026 launch (aggressive, content-heavy)
-  **Budget:** No premium revenue (freemium MVP only). Premium Phase 2+.
-  **Locales:** Spanish/German only (no expansion yet)
-  **Pedagogy:** Grammar-first unproven at scale; may need A/B testing in Phase 2

---

## **13. DEPENDENCIES & RISKS**

### **External Dependencies**

| Dependency              | Risk Level | Mitigation                                  |
| ----------------------- | ---------- | ------------------------------------------- |
| PocketBase availability | Medium     | Monitor uptime, plan scaling before 10k MAU |
| Google OAuth            | Medium     | Have email/password fallback plan           |
| Vercel/Hosting          | Medium     | Monitor performance, CDN caching strategy   |

### **Internal Risks (Grammar-First Specific)**

| Risk                                   | Impact | Probability | Mitigation                                                |
| -------------------------------------- | ------ | ----------- | --------------------------------------------------------- |
| Grammar content quality too high       | High   | Medium      | User testing, iterate on difficulty                       |
| Users skip grammar to read articles    | High   | Medium      | Hard gate: articles locked until grammar 100%             |
| Grammar quizzes too hard (>20% fail)   | High   | Medium      | A/B test quiz design, get feedback                        |
| Content creation slower than expected  | High   | Medium      | Pre-create all A1 content before launch                   |
| User churn if grammar boring           | High   | Medium      | Gamification (badges, progress %), motivational messaging |
| Spaced rep algorithm too simplistic    | Medium | Low         | Upgrade to SM-2 in Phase 2 if needed                      |
| Performance on mobile (complex tables) | Medium | Medium      | Optimize grammar tables, responsive design                |
| PocketBase scaling issues              | High   | Low         | Monitor, have upgrade plan before 10k MAU                 |

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
