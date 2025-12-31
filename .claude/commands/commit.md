Create a detailed conventional commit that passes commitlint validation on first attempt.

## Process (MUST follow in this order)

1. **Fix linting issues:** Run `npm run lint:fix` to auto-fix ESLint errors
2. **Format code:** Run `npm run prettier` to format all code (3-space tabs, 115 char width, single quotes)
3. **Verify build:** Run `npm run build` to ensure no build errors (optional but recommended)
4. **Stage all changes:** Run `git add .` to stage formatted and fixed files
5. **Create commit:** Use `git commit` directly with a HEREDOC for proper formatting
6. Follow the structure below to ensure all validations pass

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

## Git Commit Command Format

**ALWAYS use HEREDOC for proper formatting:**

```bash
git commit -m "$(cat <<'EOF'
feat(scope): brief imperative description

Detailed explanation of changes made.
Wrap long lines to stay under 100 characters.
Be specific about what changed and why.

Key Changes:
- First change
- Second change
- Third change

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

## Example Commit (PASSES validation)

**Message content:**

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

**Actual command:**

```bash
git commit -m "$(cat <<'EOF'
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
EOF
)"
```

## Pre-Commit Verification

Before creating the commit message, verify:

```bash
# 1. Check that linting passed
npm run lint

# 2. Verify code is formatted
npm run prettier

# 3. View staged changes
git diff --cached

# 4. Check line lengths in commit message (should all be < 100)
git diff --cached | head -20
```

## Troubleshooting

**Linting errors that can't be auto-fixed:**

-  Review `npm run lint` output for manual fixes needed
-  Common issues: unused variables (prefix with `_`), missing dependencies in useEffect
-  Fix manually, then re-run `npm run lint:fix` and `npm run prettier`

**Formatting issues:**

-  If `npm run prettier` makes changes, those changes are automatically applied
-  Re-run `git add .` to stage the formatted files
-  Never commit without running prettier first

**Build errors:**

-  If `npm run build` fails, fix the TypeScript/build errors before committing
-  Common issues: type errors, missing imports, syntax errors
-  Build must pass before creating commit

**Error: "footer's lines must not be longer than 100 characters"**

-  Check Co-Authored-By line length (47 chars is OK)
-  Reduce body text line widths by wrapping earlier
-  Remove any URLs or long text strings

**Commitlint still failing?**

-  Recount all line lengths manually (must be < 100 chars)
-  Ensure blank line exists after subject line
-  Verify HEREDOC format is correct (use `cat <<'EOF'` with single quotes)
-  Check that footer (Co-Authored-By) is exactly as shown in examples
