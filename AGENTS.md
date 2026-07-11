# LingoDeutsch - Agent Coding Guidelines

## Commands

```bash
# Development (Bun is the package manager & runtime)
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:3000)
bun run build            # Production build
bun start                # Start production server

# Code Quality
bun run lint             # Check ESLint errors
bun run lint:fix         # Auto-fix linting issues
bun run prettier         # Format files (115 char width, 3-space tabs, single quotes)

# Testing
# No test framework configured - add if needed
```

## Architecture: Atomic Design

```
src/components/
├── atoms/          # Basic elements (AtomButton, AtomInput, AtomTitle, AtomText)
├── molecules/      # 2+ atoms combined (MoleculeCard, MoleculeModal)
├── organisms/      # Complex sections (OrganismNavbar, OrganismHero)
└── templates/      # Page layouts (TemplateLanding)
```

**Naming:** `export const AtomButton = () => {}` - prefix with Atom/Molecule/Organism/Template
**Exports:** Always export via `index.ts` in alphabetical order

## Code Style

### Functions & Components

-  Arrow functions only (no function declarations)
-  Self-closing tags (`<Component />`)
-  Unused params prefixed with underscore (`_event`, `_props`)

```tsx
// Correct
export const MyComponent = () => {
   const handleClick = (_event: MouseEvent) => {}
   return <AtomButton onClick={handleClick} />
}
```

### Import Order (enforced by eslint-plugin-simple-import-sort)

1. React & external packages
2. Internal packages (`@/`, `components/`)
3. Side effect imports
4. Parent imports (`..`)
5. Relative imports (same folder)
6. Style imports (`.css`)

### Formatting(Prettier)

-  Single quotes, no semicolons
-  3-space indentation, 115 char line width
-  No trailing commas
-  Tailwind classes sorted via `prettier-plugin-tailwindcss`

## Component Patterns

### Pragmatic Atom Usage

-  **Use Atoms:** `<AtomButton>`, `<AtomInput>` (complete variants)
-  **Use native HTML:** `<h1>`, `<h2>`, `<p>` when Atom would need `!important`

```tsx
// Correct
<h1 className="mb-6 text-5xl font-bold">Title</h1>
<AtomButton variant="PRIMARY">Action</AtomButton>
// Wrong - don't force Atoms with !important
<AtomTitle extraClassName="!text-5xl !font-bold">Title</AtomTitle>
```

### className vs extraClassName

-  **`extraClassName`** (AtomButton, AtomTitle, AtomInput): ONLY for spacing/layout (margin, padding)
-  **`className`** (AtomText, AtomBadge, Icon): Can include minor adjustments

```tsx
<AtomButton variant="PRIMARY" size="lg" extraClassName="mt-4">
<AtomText fontSize="huge" isBold className="mb-6">
```

### Component Composition (Preferred)

```tsx
// Good - Flexible composition
<MoleculeCard>
   <AtomTitle type="h3">Title</AtomTitle>
   <AtomText>Description</AtomText>
</MoleculeCard>
// Avoid - Rigid props
<MoleculeCard title="Title" description="Desc" />
```

## TypeScript

-  Strict mode enabled
-  Path alias: `@/*` maps to `./src/*`
-  Shared types: `src/modules/actions/types.ts`
-  Never use `any` - use proper types or `unknown`

## Internationalization (i18n)

-  **Locales:** `es` (default), `de`
-  **Translation files:** `messages/es.json`, `messages/de.json`
-  **Navigation:** Use `import { Link } from '@/navigation'` (NOT `next/link`)
-  **Client components:** Require `'use client'` + `useTranslations()`

```tsx
'use client'
import { useTranslations } from 'next-intl'

export const OrganismHero = () => {
   const t = useTranslations('home')
   return <h1>{t('title')}</h1>
}
```

## Data Flow (React Query + PocketBase)

Pattern: **Actions → Hooks → Components**

```tsx
// Action (src/modules/actions/)
export const searchTranslationFromSources = async (word: string) => {
   await delay()
   const dbResult = await pbGetSingleRecordQuery({ collection, field, param: word })
   return dbResult
}
// Hook (src/hooks/)
export const useTranslation = ({ wordToTranslate }) => {
   return useQuery({
      queryKey: ['translation', wordToTranslate],
      queryFn: () => searchTranslationFromSources(wordToTranslate),
      retry: false
   })
}

// Component
const { data, isLoading } = useTranslation({ wordToTranslate: 'Haus' })
```

**PocketBase Helpers:** `pbGetList()`, `pbCreateRecord()`, `pbGetSingleRecordQuery()`, `pbUpdateRecord()`

## Error Handling

-  Try-catch blocks with typed errors in actions
-  Use `handleErrorModal()` from `global.actions.ts` for UI errors
-  Throw meaningful error messages for i18n: `throw new Error('translation.error')`

```tsx
try {
   const result = await pbGetSingleRecordQuery({ collection, field, param })
   return result
} catch (error) {
   handleErrorModal(error as any)
   throw error
}
```

## Common Pitfalls

1. Using `next/link` → Use `import { Link } from '@/navigation'`
2. Accessing `pb.authStore` directly → Use `isUserLoged()` helper
3. Forgetting `'use client'` → Required for hooks (`useTranslations`, `useQuery`)
4. Creating new atoms → Check `src/components/atoms/index.ts` first
5. Using `!important` → Prefer native HTML or improve the atom

## Pre-Commit Checklist

-  [ ] Components follow Atomic Design hierarchy
-  [ ] `extraClassName` only for spacing/layout
-  [ ] Arrow functions, ordered imports, self-closing tags
-  [ ] No unused variables (prefix with `_`)
-  [ ] Translations in both `messages/es.json` and `messages/de.json`
-  [ ] `npm run lint` passes
-  [ ] `npm run prettier` applied

## Key Files

| File/Dir                          | Purpose                                |
| --------------------------------- | -------------------------------------- |
| `.eslintrc.json`                  | ESLint rules with simple-import-sort   |
| `.prettierrc`                     | 3-space, 115 char width, single quotes |
| `src/components/atoms/index.ts`   | Check existing atoms before creating   |
| `src/modules/actions/types.ts`    | Shared TypeScript types                |
| `src/network/setup.ts`            | PocketBase instance                    |
| `src/navigation.ts`               | i18n-aware navigation (use this)       |
| `messages/*.json`                 | Translation files                      |
| `.github/copilot-instructions.md` | Extended AI guidelines                 |
