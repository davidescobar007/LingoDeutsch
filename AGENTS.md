# LingoDeutsch - Agent Coding Guidelines

## Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build           # Production build
npm start               # Start production server

# Code Quality
npm run lint            # Check ESLint errors
npm run lint:fix        # Auto-fix linting issues
npm run prettier        # Format all files (115 char width, 3-space tabs, single quotes)

# Testing
# No test framework currently configured - add test setup if needed
```

## Architecture: Strict Atomic Design

Component hierarchy: **Atoms → Molecules → Organisms → Templates → Pages**

```
src/components/
├── atoms/          # Basic elements (AtomButton, AtomInput, AtomTitle, AtomText)
├── molecules/      # 2+ atoms combined (MoleculeCard, MoleculeModal)
├── organisms/      # Complex sections (OrganismNavbar, OrganismHero)
└── templates/      # Page layouts (TemplateLanding)
```

**Naming Convention:**

```tsx
export const AtomButton = () => {} // atoms/
export const MoleculeCard = () => {} // molecules/
export const OrganismNavbar = () => {} // organisms/
export const TemplateLanding = () => {} // templates/
```

**Always export via index.ts (alphabetical order):**

```typescript
export { AtomAlert } from './alert/alert'
export { AtomButton } from './button/button'
```

## Code Style Guidelines

### Functions & Components

-  **Arrow functions only** (no function declarations)
-  **Self-closing tags** (`<Component />`)
-  **Unused params** prefixed with underscore (`_event`, `_props`)

```tsx
// ✅ Correct
export const MyComponent = () => {
   const handleClick = (_event: MouseEvent) => {
      console.log('clicked')
   }
   return <div>Content</div>
}

// ❌ Wrong
export default function MyComponent() {}
const handleClick = (event) => {}
```

### Import Order (enforced by eslint-plugin-simple-import-sort)

1. React & external packages
2. Internal packages starting with `@/` or `components/`
3. Side effect imports
4. Parent imports (`..`)
5. Relative imports (same folder)
6. Style imports (`.css`)

```tsx
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { AtomButton } from '@/components/atoms'
import { helper } from './utils'
import './styles.css'
```

### Formatting (Prettier config)

-  Single quotes, no semicolons
-  3-space indentation
-  115 character line width
-  No trailing commas
-  Tailwind classes sorted via `prettier-plugin-tailwindcss`

## Component Patterns

### Pragmatic Atom Usage

✅ **Always use Atoms when they fit:**

-  `<AtomButton>` instead of `<button>` (complete variants)
-  `<AtomInput>` instead of `<input>` (validation/styling)
-  `<AtomText>` / `<AtomTitle>` for text when sufficient

✅ **Use native HTML when Atoms are limited:**

-  `<h1>`, `<h2>`, `<h3>`, `<p>` when requiring `!important` or complex wrappers
-  Never force Atoms with `!important` hacks

```tsx
// ✅ CORRECT
<h1 className="mb-6 text-5xl font-bold text-white">Hero Title</h1>
<AtomButton variant="PRIMARY">Action</AtomButton>

// ❌ WRONG
<AtomTitle extraClassName="!text-5xl !font-bold !text-white">Title</AtomTitle>
<button className="btn btn-primary">Click</button>
```

### `className` vs `extraClassName`

-  **`extraClassName`** (AtomButton, AtomTitle, AtomInput): ONLY for spacing/layout (margin, padding)
-  **`className`** (AtomText, AtomBadge, Icon): Can include minor adjustments

```tsx
// ✅ Correct
<AtomButton variant="PRIMARY" size="lg" extraClassName="mt-4">
<AtomText fontSize="huge" isBold className="mb-6">

// ❌ Wrong - overriding base styles
<AtomButton extraClassName="bg-red-500 text-white px-8">
```

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

## TypeScript & Types

-  **Strict mode enabled** (`"strict": true` in tsconfig.json)
-  **Path alias:** `@/*` maps to `./src/*`
-  **Shared types:** `src/modules/actions/types.ts`
-  **Never use `any`** - use proper types or `unknown`

## Internationalization (i18n)

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

## Data Flow (React Query + PocketBase)

Pattern: **Actions → React Query Hooks → Components**

```tsx
// 1. Action (src/modules/actions/)
export const searchTranslationFromSources = async (word: string): Promise<Ttranslation> => {
   await delay()
   const dbResult = await getWordsTranslationFromDB({ field: 'german_translation', operator: '=', param: word })
   if (dbResult) return dbResult
   // ...
}

// 2. Hook (src/hooks/)
export const useTranslation = ({ wordToTranslate }) => {
   return useQuery({
      queryKey: ['translation', wordToTranslate],
      queryFn: () => searchTranslationFromSources(wordToTranslate),
      retry: false
   })
}

// 3. Component
const { data, isLoading } = useTranslation({ wordToTranslate: 'Haus' })
```

**PocketBase Helpers:** `pbGetList()`, `pbCreateRecord()`, `pbGetSingleRecordQuery()`

## Critical ESLint Rules

-  `react/self-closing-comp`: Enforce self-closing tags
-  `react/function-component-definition`: Enforce arrow functions
-  `unused-imports/no-unused-vars`: Warn on unused vars (ignore `_` prefix)
-  `simple-import-sort/imports`: Enforce import order

## Common Pitfalls (Don't)

1. Use `next/link` → Use `import { Link } from '@/navigation'` for i18n
2. Access `pb.authStore` directly → Use `isUserLoged()` helper
3. Forget `'use client'` → Required for `useTranslations()`, `useQuery()`, client hooks
4. Create new atoms → Check `src/components/atoms/index.ts` first
5. Use `!important` → Prefer native HTML or improve the atom component
6. Import without exports → All component levels must export via index files

## Pre-Commit Checklist

-  [ ] Components follow Atomic Design hierarchy
-  [ ] `extraClassName` only used for spacing/layout
-  [ ] Arrow functions, ordered imports, self-closing tags
-  [ ] No unused variables (or prefix with `_`)
-  [ ] Translations added to `messages/es.json` and `messages/de.json`
-  [ ] `npm run lint` passes
-  [ ] `npm run prettier` applied

## Key Files Reference

| File/Dir                          | Purpose                                |
| --------------------------------- | -------------------------------------- |
| `.eslintrc.json`                  | ESLint rules with simple-import-sort   |
| `.prettierrc`                     | 3-space, 115 char width, single quotes |
| `tsconfig.json`                   | Strict TypeScript, @/ path alias       |
| `src/network/setup.ts`            | PocketBase instance configuration      |
| `src/components/atoms/index.ts`   | Check existing atoms before creating   |
| `.github/copilot-instructions.md` | Full AI coding guidelines (249 lines)  |
