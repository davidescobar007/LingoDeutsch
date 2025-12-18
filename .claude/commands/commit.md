Create a detailed conventional commit that passes commitlint validation on first attempt.

## Process

1. Stage all changes: `git add .`
2. Use `npm run commit` for interactive commitizen CLI
3. Follow the structure below to ensure all validations pass

## Commit Structure (MUST follow this exactly)

### Line 1: Type and Scope (max 100 chars)

```
feat(scope): brief imperative description
```

**Types:** feat, fix, docs, style, refactor, perf, test, chore
**Scope:** feature area or component being changed

### Line 2: BLANK LINE (required)

### Lines 3+: Body (max 100 chars per line)

-  Wrap long lines to stay under 100 characters
-  Use natural line breaks for readability
-  Separate related changes into paragraphs
-  Be specific about what changed and why

### Breaking Changes

If there's a breaking change, add this section:

```
BREAKING CHANGE: Describe what broke and migration path
```

### Footer (CRITICAL - max 100 chars per line)

```
Co-Authored-By: Claude <noreply@anthropic.com>
```

## Key Rules (Commitlint Validation)

✅ **MUST DO:**

-  Keep ALL lines under 100 characters (including footer)
-  Use proper commit type from list above
-  Include detailed description of changes
-  Wrap body text if it exceeds 100 chars
-  List specific components/files changed
-  Explain WHY changes were made, not just WHAT

❌ **NEVER DO:**

-  Use emojis in the message (causes line length issues)
-  Write footer lines longer than 100 characters
-  Skip the blank line after title
-  Use vague descriptions like "updates" or "fixes stuff"
-  Include file paths in main commit message (detail in body only)

## Example Commit (PASSES validation)

```
feat(home, components): refactor page with new template

BREAKING CHANGE: Renamed Tgrammar → TGrammar for consistency

Restructured home page architecture to improve
maintainability and follow Atomic Design patterns.
Created reusable template and organism components to
replace inline UI logic.

New Components:
- TemplateHome: Consolidates home page layout
- OrganismArticleCarousel: Article carousel organism
- OrganismScoreSidebar: Score display sidebar

Key Changes:
- Fixed type naming: Tgrammar → TGrammar
- Fixed navigation: next/link → @/navigation
- Simplified home/page.tsx: 104 lines → 14 lines

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Testing Before Commit

Check line lengths:

```bash
# Count characters (should all be < 100)
git diff --cached | head -20
```

## Troubleshooting

**Error: "footer's lines must not be longer than 100 characters"**

-  Check Co-Authored-By line length (47 chars is OK)
-  Reduce body text line widths by wrapping earlier
-  Remove any URLs or long text strings

**Commitlint still failing?**

-  Use git commit directly (not npm run commit) for full control
-  Recount all line lengths manually
-  Ensure blank line exists after subject
