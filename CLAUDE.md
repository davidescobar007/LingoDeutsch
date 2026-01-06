# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LingoDeutsch** is a German language learning platform built with:

-  **Framework:** Next.js 14 (App Router)
-  **Styling:** Tailwind CSS + DaisyUI
-  **State Management:** React Query (@tanstack/react-query)
-  **Internationalization:** next-intl (Spanish/German locales)
-  **Backend:** PocketBase (self-hosted)
-  **Language:** TypeScript
-  **Architecture:** Strict Atomic Design pattern

## Quick Start Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Code Quality
npm run lint            # Check ESLint errors
npm run lint:fix        # Auto-fix linting issues
npm run prettier        # Format code (3-space tabs, 115 char width, single quotes)

# Production
npm run build           # Build for production
npm start               # Start production server

# Git & Commits
# Commits are automatically created via Claude Code with proper formatting
```

## Architecture Overview

### Atomic Design Hierarchy

The codebase strictly follows: **Atoms → Molecules → Organisms → Templates → Pages**

```
src/components/
├── atoms/              # Basic UI elements (14 components)
├── molecules/          # 2+ atoms combined (18 components)
├── organisms/          # Complex sections (14 components)
└── templates/          # Page layouts (4 templates)

src/app/[locale]/      # Next.js App Router pages
src/hooks/             # React Query wrappers
src/modules/actions/   # Business logic & API calls
src/utils/             # Pure utility functions
src/types/             # TypeScript definitions
```

### Component Naming & Structure

```tsx
// Naming convention
export const AtomButton = () => {} // atoms
export const MoleculeCard = () => {} // molecules
export const OrganismNavbar = () => {} // organisms
export const TemplateAbout = () => {} // templates

// Index exports (alphabetical)
// src/components/atoms/index.ts
export { AlertAtom } from './alert/alert'
export { AtomBadge } from './badge/badge'
export { AtomButton } from './button/button'
```

### Data Flow

1. **Actions** (`src/modules/actions/`) - API calls & business logic
2. **React Query Hooks** (`src/hooks/`) - Wraps actions with caching
3. **Components** - Consume hooks, render UI

Example:

```tsx
// src/hooks/translations.tsx - Query hook wraps action
export const useTranslation = ({ wordToTranslate }) => {
   return useQuery({
      queryKey: ['translation', wordToTranslate],
      queryFn: () => searchTranslationFromSources(wordToTranslate),
      retry: false
   })
}

// src/components/SomeComponent.tsx - Component consumes hook
const { data, isLoading } = useTranslation({ wordToTranslate: 'Haus' })
```

## Critical Rules

### 1. Atomic Component Usage (Pragmatic)

**Always use Atoms when they fit:**

-  ✅ `<AtomButton>` instead of `<button>` (complete variants)
-  ✅ `<AtomInput>` instead of `<input>` (validation/styling)
-  ✅ `<AtomTitle>` / `<AtomText>` for text

**Use native HTML when Atoms are limited:**

-  ✅ `<h1>`, `<h2>`, `<h3>`, `<p>` when requiring `!important` or complex wrappers
-  ❌ Never force Atoms with `!important` hacks

```tsx
// ✅ CORRECT
<h1 className="mb-6 text-5xl font-bold text-white">Hero Title</h1>
<AtomButton variant="PRIMARY">Get Started</AtomButton>

// ❌ WRONG
<AtomTitle extraClassName="!text-5xl !font-bold !text-white">Title</AtomTitle>
```

### 2. `className` vs `extraClassName`

-  **`extraClassName`** (Complex components: AtomButton, AtomTitle, AtomInput)

   -  ONLY for spacing/layout (margin, padding)
   -  Never override base styles—use component props instead

-  **`className`** (Simple components: AtomText, AtomBadge, Icon)
   -  Can include minor style adjustments

```tsx
// ✅ Correct
<AtomButton variant="PRIMARY" size="lg" extraClassName="mt-4 ml-auto">
<AtomText fontSize="huge" isBold className="mb-6">

// ❌ Wrong
<AtomButton extraClassName="bg-red-500 text-white px-8">
```

### 3. Code Style

-  **Arrow functions always** (no `function` declarations)
-  **Self-closing tags** (`<Component />`)
-  **Imports ordered** (react → external → @/ → relative → styles)
-  **Unused parameters** prefixed with underscore (`_event`, `_props`)
-  **Single quotes**, no semicolons
-  **3-space indentation**, **115 character line width**

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

-  **Locales:** `es` (default), `de`
-  **Translation files:** `messages/es.json`, `messages/de.json`
-  **Navigation:** Use `import { Link } from '@/navigation'` (NOT `next/link`)
-  **Components with i18n:** Require `'use client'` directive + `useTranslations()`

```tsx
'use client'
import { useTranslations } from 'next-intl'

export const OrganismHero = () => {
   const t = useTranslations('home')
   return <h1>{t('title')}</h1>
}
```

### 5. Component Composition Pattern

**Preferred: Flexible composition**

```tsx
<MoleculeCard>
   <AtomTitle type="h3">Title</AtomTitle>
   <AtomText>Description</AtomText>
   <AtomButton variant="PRIMARY">Action</AtomButton>
</MoleculeCard>
```

**Avoid: Rigid props pattern**

```tsx
<MoleculeCard title="Title" description="Desc" buttonText="Action" />
```

## Key Directories Reference

| Directory                         | Purpose                                         |
| --------------------------------- | ----------------------------------------------- |
| `src/components/atoms/`           | Basic indivisible UI elements                   |
| `src/components/molecules/`       | Simple combinations of atoms                    |
| `src/components/organisms/`       | Complex sections with domain logic              |
| `src/components/templates/`       | Page-level layouts                              |
| `src/app/[locale]/`               | Next.js App Router pages                        |
| `src/hooks/`                      | React Query wrappers for server state           |
| `src/modules/actions/`            | Business logic, API calls, data transformations |
| `src/modules/actions/types.ts`    | Shared TypeScript types                         |
| `src/network/setup.ts`            | PocketBase instance configuration               |
| `src/utils/`                      | Pure utility functions (date, quiz, stats)      |
| `messages/`                       | i18n translation files (es.json, de.json)       |
| `.github/copilot-instructions.md` | AI coding guidelines                            |

## Domain-Specific Patterns

### Vocabulary & Spaced Repetition

-  **Spaced Repetition:** `getReviewInterval()`, `isWordDue()` in `actions.utils.ts`
-  **Streak Calculation:** `calculateStreak()` returns 7-day learning history
-  **Card Levels:** `'easy' | 'medium' | 'hard'` determine review intervals
-  **User Progress:** `USER_VOCAB_PROGRESS` collection tracks per-user word stats

### PocketBase Backend

-  **Instance:** `src/network/setup.ts` (PocketBase configuration)
-  **Auth Check:** Use `isUserLoged()` helper (don't access `pb.authStore` directly)
-  **Collections:** `VOCABULARY`, `USER_VOCAB_PROGRESS`, `ARTICLES`, `GRAMMAR_TOPICS`
-  **Helper Functions:** `pbGetList()`, `pbCreateRecord()`, `pbGetSingleRecordQuery()`

## Pre-Commit Checklist

Before committing:

-  [ ] Components follow Atomic Design hierarchy
-  [ ] `extraClassName` only used for spacing/layout
-  [ ] Arrow functions, ordered imports, self-closing tags
-  [ ] No unused variables (or prefix with `_`)
-  [ ] Translations added to `messages/es.json` and `messages/de.json`
-  [ ] `npm run lint` passes
-  [ ] `npm run prettier` applied
-  [ ] Commit message follows [conventional commits](https://www.conventionalcommits.org/) format

## Common Pitfalls

1. **Don't use `next/link`** → Use `import { Link } from '@/navigation'` for i18n support
2. **Don't access `pb.authStore` directly** → Use `isUserLoged()` helper
3. **Don't forget `'use client'`** → Required for `useTranslations()`, `useQuery()`, client hooks
4. **Don't duplicate atoms** → Check `src/components/atoms/index.ts` first
5. **Don't use `!important`** → Use native HTML or improve the atom component
6. **Don't import without exports** → All component levels must export via index files

## References

-  **Full Style Guide:** `.github/copilot-instructions.md` - Comprehensive AI coding guidelines
-  **Next.js Docs:** https://nextjs.org/docs
-  **DaisyUI:** https://daisyui.com/components/
-  **next-intl:** https://next-intl-docs.vercel.app/
-  **Atomic Design Methodology:** https://atomicdesign.bradfrost.com/
