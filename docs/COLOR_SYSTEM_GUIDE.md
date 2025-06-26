# LingoDeutsch Color System Guide

## Overview

This document defines the standardized color system for LingoDeutsch to ensure consistency across all platform components and features. We use DaisyUI semantic colors with a single, consistent color per purpose.

## Color Philosophy

-  **One color per purpose**: Avoid multiple shades of the same semantic color
-  **Semantic consistency**: Blue for German, Green for Spanish/Success, Orange for Warning/Medium, Red for Error/Hard
-  **DaisyUI-first**: Use semantic DaisyUI classes directly instead of utility functions

## Simplified Color Mapping

### Core Semantic Colors

```css
primary: #805AF2     /* Purple - Main brand color for buttons, highlights */
secondary: #e5defc   /* Light purple - Secondary elements */
accent: #FFC107      /* Gold/amber - Interactive elements, hover states */

info: #3B82F6        /* Blue - German content, informational messages */
success: #10B981     /* Green - Spanish content, success states, easy difficulty */
warning: #F59E0B     /* Orange - Warnings, medium difficulty, review states */
error: #EF4444       /* Red - Error states, hard difficulty */

neutral: #444444     /* Gray - Text and neutral elements */
```

### Color Usage Rules

| Purpose               | Color  | DaisyUI Classes                                |
| --------------------- | ------ | ---------------------------------------------- |
| **German content**    | Blue   | `text-info`, `bg-info`, `border-info`          |
| **Spanish content**   | Green  | `text-success`, `bg-success`, `border-success` |
| **Easy difficulty**   | Green  | `text-success`, `btn-success`, `radio-success` |
| **Medium difficulty** | Orange | `text-warning`, `btn-warning`, `radio-warning` |
| **Hard difficulty**   | Red    | `text-error`, `btn-error`, `radio-error`       |
| **Success states**    | Green  | `text-success`, `bg-success`, `alert-success`  |
| **Warning states**    | Orange | `text-warning`, `bg-warning`, `alert-warning`  |
| **Error states**      | Red    | `text-error`, `bg-error`, `alert-error`        |

## Usage Examples

### ✅ Correct Usage

#### Language Content

```tsx
// German content - uses info (blue)
<div className="border-info/30 bg-info/10">
  <span className="text-info">German word</span>
</div>

// Spanish content - uses success (green)
<div className="border-success/30 bg-success/10">
  <span className="text-success">Spanish word</span>
</div>
```

#### Difficulty Levels

```tsx
// Easy - uses success (green)
<input className="radio radio-success" type="radio" />
<button className="btn btn-success">Easy</button>

// Medium - uses warning (orange)
<input className="radio radio-warning" type="radio" />
<button className="btn btn-warning">Medium</button>

// Hard - uses error (red)
<input className="radio radio-error" type="radio" />
<button className="btn btn-error">Hard</button>
```

#### Cards and Containers

```tsx
// Use opacity variations for subtle backgrounds
<div className="border-primary/30 bg-primary/5">Primary card</div>
<div className="border-warning/30 bg-warning/5">Warning card</div>
```

### ❌ Avoid These Patterns

```tsx
// Don't use hardcoded Tailwind colors
<div className="bg-blue-500 text-blue-800">❌</div>
<button className="bg-green-600">❌</button>

// Don't use multiple shades for the same purpose
<div className="bg-blue-500">German</div>
<div className="bg-blue-600">Also German</div> // ❌ Inconsistent

// Don't mix color systems
<div className="bg-info">
  <span className="text-blue-600">❌ Mixed systems</span>
</div>
```

## Migration Guide

### Replace Hardcoded Colors

```tsx
// Before
className = 'bg-blue-500 text-blue-800 border-blue-200'

// After
className = 'bg-info text-info-content border-info'
```

### Simplify Color Logic

```tsx
// Before (complex)
const colors = getLanguageColors('german')
className={`${colors.background} ${colors.border}`}

// After (simple)
className="bg-info/10 border-info/30"
```

## Updated Components

### ✅ Already Updated

-  `MoleculeFlipCard` - Uses `info` for German, `success` for Spanish
-  `QuizModeSelection` - Uses `primary` and `warning` semantic colors
-  `PracticeVocabulary` - Uses semantic radio colors

### 📋 Still Need Updates

-  `MoleculeTimeLine` - Replace `green-500` with `success`
-  `MoleculeScore` - Replace `yellow-400` with `warning`
-  `HomePage` icons - Standardize with semantic colors
-  Any components with `blue-*`, `green-*`, `red-*`, `yellow-*` classes

## Consistency Checklist

-  [ ] German content uses `info` (blue) colors
-  [ ] Spanish content uses `success` (green) colors
-  [ ] Easy difficulty uses `success` (green)
-  [ ] Medium difficulty uses `warning` (orange)
-  [ ] Hard difficulty uses `error` (red)
-  [ ] No hardcoded `blue-*`, `green-*`, etc. classes
-  [ ] Opacity variations (`/10`, `/30`) for subtle backgrounds
-  [ ] Consistent semantic meaning across all components

## Benefits of This Approach

1. **Simplicity**: No utility functions needed, just use DaisyUI classes
2. **Consistency**: One color per semantic meaning
3. **Maintainability**: Easy to change colors globally in `tailwind.config.ts`
4. **Performance**: No JavaScript overhead for color calculations
5. **Developer Experience**: Autocomplete and IntelliSense work perfectly
