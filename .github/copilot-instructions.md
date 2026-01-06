# LingoDeutsch - AI Coding Instructions

## 🎯 Project Overview

German language learning platform built with Next.js 14 (App Router), TypeScript, Tailwind CSS, DaisyUI, next-intl for i18n (Spanish/German), and PocketBase backend. Uses React Query for server state and follows strict Atomic Design architecture.

## 🏗️ Architecture Patterns

### Atomic Design (Strict Hierarchy)

Components follow: **Atoms → Molecules → Organisms → Templates → Pages**

```
src/components/
├── atoms/          # Basic elements (AtomButton, AtomInput, AtomTitle, AtomText)
├── molecules/      # 2+ atoms combined (MoleculeCard, MoleculeModal)
├── organisms/      # Complex sections (OrganismNavbar, OrganismHero)
└── templates/      # Page layouts (TemplateLanding)

src/app/[locale]/   # Next.js pages using templates
```

**Critical Rule: Pragmatic Atom Usage**

-  ✅ ALWAYS use `AtomButton` instead of `<button>` (has complete variants)
-  ✅ ALWAYS use `AtomInput` instead of `<input>` (has validation/styling)
-  ✅ Use native `<h1>`, `<h2>`, `<h3>`, `<p>` when Atoms would require `!important` or complex wrappers
-  ✅ Use `AtomText`/`AtomTitle` when their basic props are sufficient

```tsx
// ✅ CORRECT - Native HTML when Atom is limited
<h1 className="text-5xl font-bold text-white mb-6">Hero Title</h1>
<AtomButton variant="PRIMARY">Action</AtomButton>

// ❌ WRONG - Don't force Atoms with !important
<AtomTitle extraClassName="!text-5xl !font-bold !text-white">Title</AtomTitle>

// ❌ WRONG - Native button when AtomButton exists
<button className="btn btn-primary">Click</button>
```

### Component Naming Convention

```tsx
export const AtomButton = () => {} // Atoms
export const MoleculeCard = () => {} // Molecules
export const OrganismNavbar = () => {} // Organisms
export const TemplateLanding = () => {} // Templates
```

### Index Exports (Alphabetical)

```typescript
// src/components/atoms/index.ts
export { AtomAlert } from './alert/alert'
export { AtomButton } from './button/button'
export { AtomInput } from './input/input'
```

## 🎨 Styling System

### `className` vs `extraClassName`

**`extraClassName`** - Complex components with strong base styles:

-  `AtomButton`, `AtomTitle`, `AtomInput` - Use ONLY for spacing/layout
-  Never override base styles (color, size, etc.) - use props instead

**`className`** - Simple/flexible components:

-  `AtomText`, `AtomBadge`, `Icon` - Can include minor adjustments

```tsx
// ✅ Correct
<AtomButton variant="PRIMARY" size="lg" extraClassName="mt-4">
<AtomText fontSize="huge" isBold className="mb-6">

// ❌ Wrong - overriding base styles
<AtomButton extraClassName="bg-red-500 text-white px-8">
```

### Tailwind + DaisyUI

-  Use DaisyUI classes first: `btn btn-primary btn-lg`
-  3-space indentation, 115 char line width
-  Responsive: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
-  Never use inline styles

## 🌐 Internationalization (i18n)

Locales: `es` (default), `de`

```tsx
'use client'
import { useTranslations } from 'next-intl'

export const OrganismHero = () => {
   const t = useTranslations('home')
   return <h1>{t('title')}</h1>
}
```

**Translation files:** `messages/es.json`, `messages/de.json`

**Routing:** All routes prefixed with locale: `/es/app/home`, `/de/app/home`

**Navigation:** Use `import { Link } from '@/navigation'` (not `next/link`)

## 📡 Data Flow

### Server State (React Query)

Pattern: Custom hooks wrap actions, use React Query for caching

```tsx
// src/hooks/translations.tsx
export const useTranslation = ({ wordToTranslate }) => {
   return useQuery({
      queryKey: ['translation', wordToTranslate],
      queryFn: () => searchTranslationFromSources(wordToTranslate),
      retry: false
   })
}

// Usage in component
const { data, isLoading } = useTranslation({ wordToTranslate: 'Haus' })
```

### Backend (PocketBase)

-  API: `process.env.NEXT_PUBLIC_API_ENVIRONMENT`
-  Auth: `pb.authStore.model?.id` for user ID
-  Collections: `constants.VOCABULARY`, `constants.USER_VOCAB_PROGRESS`, etc.
-  Helper functions: `pbGetList()`, `pbCreateRecord()`, `pbGetSingleRecordQuery()`

### Action Layer Pattern

```typescript
// src/modules/actions/translations.actions.ts
export const searchTranslationFromSources = async (word: string): Promise<Ttranslation> => {
   await delay() // Built-in debounce helper
   const dbResult = await getWordsTranslationFromDB({ field: 'german_translation', operator: '=', param: word })
   if (dbResult) return dbResult

   const apiResult = await fetchData({ method: 'GET', url: `/api/translations?wordToTranslate=${word}` })
   // Save to DB, return result
}
```

## 🔧 Code Style (ESLint + Prettier)

### Critical Rules

```tsx
// ✅ Arrow functions always
export const MyComponent = () => {
   return <div>Content</div>
}

// ❌ No function declarations
export default function MyComponent() {}

// ✅ Unused params prefixed with _
const handleClick = (_event: MouseEvent) => {
   console.log('clicked')
}

// ✅ Self-closing tags
;<AtomButton />

// ✅ Import order (simple-import-sort)
import { useState } from 'react' // 1. React/external
import { useTranslations } from 'next-intl' // 2. External packages
import { AtomButton } from '@/components/atoms' // 3. Internal (@/)
import { helper } from './utils' // 4. Relative
import './styles.css' // 5. Styles
```

### Prettier Config

-  Single quotes, no semicolons, 3 spaces, 115 char width

## 🚀 Development Workflow

```bash
npm run dev          # Start dev server (localhost:3000)
npm run lint         # Check for errors
npm run lint:fix     # Auto-fix linting issues
npm run prettier     # Format all files
npm run build        # Production build
```

### Pre-commit Checklist

1. Components follow Atomic Design hierarchy
2. `extraClassName` only for spacing/layout
3. Arrow functions, ordered imports, self-closing tags
4. No unused variables (or prefix with `_`)
5. Translations added to `es.json` and `de.json`
6. Run `npm run lint` and `npm run prettier`

## 📁 Key File Locations

-  **Atoms:** `src/components/atoms/` - Always check for existing atoms before creating molecules
-  **Hooks:** `src/hooks/` - React Query wrappers (translations, user, articles, cards, grammar)
-  **Actions:** `src/modules/actions/` - Backend API calls, business logic
-  **Types:** `src/modules/actions/types.ts` - Shared TypeScript types
-  **i18n:** `messages/es.json`, `messages/de.json` - Translation keys
-  **Utils:** `src/utils/` - Pure functions (date, quiz, statistics)
-  **Network:** `src/network/setup.ts` - PocketBase instance
-  **Guidelines:** `DEVELOPMENT_GUIDELINES.md` - Full style guide
-  **Architecture:** `ATOMIC_DESIGN_ARCHITECTURE.md` - Component hierarchy details

## 🎓 Domain-Specific Patterns

### Vocabulary/Learning Features

-  Spaced repetition: `getReviewInterval()`, `isWordDue()` in `actions.utils.ts`
-  Streak calculation: `calculateStreak()` returns 7-day learning history
-  Card levels: `'easy' | 'medium' | 'hard'` determine review intervals
-  User progress: `USER_VOCAB_PROGRESS` collection tracks per-user word stats

### Component Composition (Preferred)

```tsx
// ✅ GOOD - Flexible composition
<MoleculeCard>
   <AtomTitle type="h3">Title</AtomTitle>
   <AtomText>Description</AtomText>
   <AtomButton variant="PRIMARY">Action</AtomButton>
</MoleculeCard>

// ❌ AVOID - Rigid props
<MoleculeCard title="Title" description="Desc" buttonText="Action" />
```

## 🔍 Common Pitfalls

1. **Don't** use `next/link` - use `import { Link } from '@/navigation'` for i18n
2. **Don't** access `pb.authStore` directly - use `isUserLoged()` helper
3. **Don't** forget `'use client'` for hooks like `useTranslations()`, `useQuery()`
4. **Don't** create new atoms without checking existing ones in `src/components/atoms/index.ts`
5. **Don't** use `!important` in `className`/`extraClassName` - prefer native HTML or improve atom

## 📚 References

See `DEVELOPMENT_GUIDELINES.md` for complete style guide with examples.
See `ATOMIC_DESIGN_ARCHITECTURE.md` for full component hierarchy and statistics.
