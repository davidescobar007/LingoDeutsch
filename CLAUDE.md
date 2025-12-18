# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LingoDeutsch** is a German language learning platform built with:
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + DaisyUI
- **State Management:** React Query (@tanstack/react-query)
- **Internationalization:** next-intl (Spanish/German locales)
- **Backend:** PocketBase (self-hosted backend)
- **Language:** TypeScript
- **Architecture:** Strict Atomic Design pattern

## Quick Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Linting and Formatting
npm run lint            # Check for ESLint errors
npm run lint:fix        # Auto-fix ESLint errors
npm run prettier        # Format all code

# Building
npm run build           # Production build
npm start               # Start production server

# Git
npm run commit          # Use commitizen for conventional commits
```

## Architecture Overview

### Atomic Design Hierarchy

The codebase strictly follows: **Atoms → Molecules → Organisms → Templates → Pages**

```
src/components/
├── atoms/              # Basic UI elements (button, input, title, text, badge)
├── molecules/          # 2+ atoms combined (card, modal, carousel, chart)
├── organisms/          # Complex sections (navbar, hero, grammar preview, vocab preview)
└── templates/          # Page-level layouts (LandingTemplate, AboutTemplate, etc.)

src/app/[locale]/      # Next.js App Router pages using templates
```

**Key Files:**
- `ATOMIC_DESIGN_ARCHITECTURE.md` - Full component hierarchy and statistics
- `DEVELOPMENT_GUIDELINES.md` - Detailed style guide (Spanish)
- `.github/copilot-instructions.md` - AI coding guidelines

### Component Structure

- **Atoms:** 14 components - Basic indivisible elements (AtomButton, AtomInput, AtomTitle, AtomText, AtomBadge, AtomAlert, etc.)
- **Molecules:** 18 components - Simple combinations of atoms (MoleculeCard, MoleculeModal, MoleculeCarousel, etc.)
- **Organisms:** 14 components - Complex sections with domain logic (OrganismNavbar, OrganismHero, OrganismGrammarPreview, etc.)
- **Templates:** 4 templates - Page layouts (LandingTemplate, AboutTemplate, PrivacyTemplate, TermsTemplate)
- **Pages:** Next.js pages using templates (landing, app/home, app/grammar, app/article, etc.)

### Data Flow Architecture

1. **Action Layer** (`src/modules/actions/`) - Business logic and API calls
   - Pattern: Custom hooks wrap actions, return React Query hooks
   - Example: `useTranslation()` hooks into `searchTranslationFromSources()` action

2. **React Query** (`src/hooks/`) - Server state management
   - Wraps actions with caching and query management
   - Examples: `useArticles()`, `useUserProfile()`, `useVocabularyCards()`

3. **Components** - Consume hooks and render UI

## Critical Rules

### 1. Atomic Component Usage (Pragmatic Approach)

**ALWAYS use Atomic components when they fit:**
- ✅ `<AtomButton>` instead of `<button>` (complete variants)
- ✅ `<AtomInput>` instead of `<input>` (validation/styling)
- ✅ `<AtomTitle>` / `<AtomText>` for basic text needs

**Use native HTML when Atoms are limited:**
- ✅ `<h1>`, `<h2>`, `<h3>`, `<p>` when requiring `!important` or complex wrappers
- ✅ Always avoid forcing Atoms with `!important` hacks

**Example - CORRECT:**
```tsx
export const OrganismHero = () => {
   return (
      <section>
         <h1 className="mb-6 text-5xl font-bold text-white">Hero Title</h1>
         <p className="text-xl text-white/90">Subtitle</p>
         <AtomButton variant="PRIMARY">Get Started</AtomButton>
      </section>
   )
}
```

### 2. `className` vs `extraClassName`

- **`extraClassName`** (Complex components): AtomButton, AtomTitle, AtomInput
  - Use ONLY for spacing/layout adjustments (margin, padding)
  - Never override base styles - use component props instead

- **`className`** (Simple/flexible components): AtomText, AtomBadge, Icon
  - Can include minor style adjustments
  - More flexible for component-specific styling

**Example - CORRECT:**
```tsx
<AtomButton variant="PRIMARY" size="lg" extraClassName="mt-4 ml-auto">
<AtomText fontSize="huge" isBold className="mb-6">
```

**Example - WRONG:**
```tsx
// ❌ Don't override base styles
<AtomButton extraClassName="bg-red-500 text-white px-8">
```

### 3. Code Style Requirements

- **Arrow functions always** (no `function` declarations)
- **Self-closing tags** (`<Component />`, not `<Component></Component>`)
- **Imports ordered** (react → external packages → @/ → relative → styles)
- **Unused parameters** prefixed with underscore (`_event`, `_props`)
- **Single quotes** (no double quotes)
- **No semicolons** at end of lines
- **3-space indentation** (not 2, not 4)
- **115 character line width**

**Example:**
```tsx
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { AtomButton } from '@/components/atoms'
import { helper } from './utils'

export const MyComponent = () => {
   const [isOpen, setIsOpen] = useState(false)
   const t = useTranslations('home')

   const handleClick = (_event: MouseEvent) => {
      setIsOpen(!isOpen)
   }

   return (
      <div className="flex items-center">
         <AtomButton onClick={handleClick}>{t('title')}</AtomButton>
      </div>
   )
}
```

### 4. Internationalization (i18n)

- **Locales:** `es` (default), `de`
- **Translation files:** `messages/es.json`, `messages/de.json`
- **Navigation:** Use `import { Link } from '@/navigation'` (NOT `next/link`)
- **Usage:** `const t = useTranslations('page_name')` with `'use client'` directive

**Example:**
```tsx
'use client'
import { useTranslations } from 'next-intl'

export const OrganismHero = () => {
   const t = useTranslations('home')
   return <h1>{t('title')}</h1>
}
```

### 5. Data Fetching Pattern

Use React Query hooks from `src/hooks/`:

```typescript
// Hook wraps both action and React Query
export const useArticles = () => {
   return useQuery({
      queryKey: ['articles'],
      queryFn: fetchArticles,
      retry: false
   })
}

// Component usage
const { data, isLoading } = useArticles()
```

## Key Directories Reference

- **`src/components/`** - Atomic Design components (atoms, molecules, organisms, templates)
- **`src/hooks/`** - React Query wrappers for server state
- **`src/modules/actions/`** - Business logic, API calls, data transformations
- **`src/network/setup.ts`** - PocketBase instance configuration
- **`src/utils/`** - Pure utility functions (date, quiz, stats)
- **`src/types/`** - TypeScript type definitions
- **`src/app/[locale]/`** - Next.js App Router pages
- **`messages/`** - i18n translation files (es.json, de.json)

## Common Patterns

### Component Composition (Preferred over Props)

**GOOD - Flexible composition:**
```tsx
<MoleculeCard>
   <AtomTitle type="h3">Title</AtomTitle>
   <AtomText>Description</AtomText>
   <AtomButton variant="PRIMARY">Action</AtomButton>
</MoleculeCard>
```

**AVOID - Rigid props:**
```tsx
<MoleculeCard title="Title" description="Desc" buttonText="Action" />
```

### Action Layer Pattern

```typescript
// src/modules/actions/
export const searchTranslationFromSources = async (word: string): Promise<Translation> => {
   await delay() // Debounce
   const dbResult = await getWordsTranslationFromDB({ field: 'german_translation', operator: '=', param: word })
   if (dbResult) return dbResult

   const apiResult = await fetchData({ method: 'GET', url: `/api/translations?wordToTranslate=${word}` })
   // Save to DB, return result
}
```

## Domain Knowledge

### Vocabulary & Learning Features

- **Spaced Repetition:** `getReviewInterval()`, `isWordDue()` in `actions.utils.ts`
- **Streak Calculation:** `calculateStreak()` returns 7-day learning history
- **Card Levels:** `'easy' | 'medium' | 'hard'` determine review intervals
- **Progress Tracking:** `USER_VOCAB_PROGRESS` collection tracks per-user word stats
- **Backend Collections:** `VOCABULARY`, `USER_VOCAB_PROGRESS`, `ARTICLES`, `GRAMMAR_TOPICS`

### Grammar Features

- **Quiz System:** Quiz components handle grammar exercises with scoring
- **Level Cards:** `OrganismGrammarLevelCard` displays level progression
- **Content Modules:** Grammar content organized by difficulty level

## Common Pitfalls

1. **Don't use `next/link`** - Use `import { Link } from '@/navigation'` for i18n support
2. **Don't access `pb.authStore` directly** - Use helper function `isUserLoged()`
3. **Don't forget `'use client'`** - Required for hooks like `useTranslations()`, `useQuery()`
4. **Don't create duplicate atoms** - Check `src/components/atoms/index.ts` first
5. **Don't use `!important`** - Either use native HTML or improve the atom component
6. **Don't import components without `index.ts` exports** - All component levels must export via index files

## Pre-Commit Checklist

Before committing code:
- [ ] Components follow Atomic Design hierarchy
- [ ] `extraClassName` only used for spacing/layout
- [ ] Arrow functions used throughout
- [ ] Imports properly ordered
- [ ] No unused variables (or prefix with `_`)
- [ ] Self-closing tags where appropriate
- [ ] i18n translations added to `messages/es.json` and `messages/de.json`
- [ ] `npm run lint` passes
- [ ] `npm run prettier` applied
- [ ] Commit message follows conventional commits format

## References

- **Full Style Guide:** `DEVELOPMENT_GUIDELINES.md` (Spanish, comprehensive)
- **Component Architecture:** `ATOMIC_DESIGN_ARCHITECTURE.md` (detailed hierarchy)
- **AI Guidelines:** `.github/copilot-instructions.md` (already integrated above)
- **Atomic Design Methodology:** https://atomicdesign.bradfrost.com/
- **Next.js Docs:** https://nextjs.org/docs
- **DaisyUI:** https://daisyui.com/components/
- **next-intl:** https://next-intl-docs.vercel.app/
