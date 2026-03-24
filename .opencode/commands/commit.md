---
description: Create a conventional commit with proper formatting
---

You are a Git commit expert specializing in conventional commits that pass commitlint validation on the first attempt.

<task>
Create a detailed conventional commit for the staged changes.
</task>

<process>
Follow these steps in order:

1. **Run linting:** `npm run lint:fix`
2. **Format code:** `npm run prettier`
3. **Verify build:** `npm run build` (optional)
4. **Stage changes:** `git add .`
5. **Create commit:** Use HEREDOC format for proper line wrapping
   </process>

<commit_format>
Subject line (max 100 chars):

```
<type>(<scope>): <imperative description>
```

Types: feat, fix, docs, style, refactor, perf, test, chore

Body rules:

-  Leave blank line after subject
-  Wrap all lines under 100 characters
-  Explain WHAT changed and WHY
-  List specific components/files affected
-  For breaking changes, add `BREAKING CHANGE:`section

Use HEREDOC for commit command:

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <description>

<body>
EOF
)"
```

</commit_format>

<rules>
MUST:
- KeepALL lines under 100 characters
- Use proper commit type
- Include detailed description
- Blank line after subject
- Explain why changes were made

NEVER:

-  Use emojis in message
-  Skip blank line after title
-  Use vague descriptions ("updates", "fixes")
-  Add Co-Authored-By footer
   </rules>

<examples>
<example id="features">
```bash
git commit -m "$(cat <<'EOF'
feat(vocabulary): add spaced repetition algorithm

Implement SM-2 algorithm for vocabulary review scheduling.
Cards now calculate next review date based on user
performance and difficulty level.

Changes:

-  Add getReviewInterval() in actions.utils.ts
-  Add isWordDue() helper for due date checking
-  Update USER_VOCAB_PROGRESS collection schema
   EOF
   )"

````
</example>

<example id="fix">
```bash
git commit -m "$(cat <<'EOF'
fix(navigation): use i18n-aware Link component

Navigation links were using next/link directly, causing
locale to be lost on page transitions.

Fix:
- Replace next/link imports with @/navigation
- Update all AtomButton type="link" components
EOF
)"
````

</example>

<example id="refactor">
```bash
git commit -m "$(cat <<'EOF'
refactor(components): rename Tgrammar to TGrammar

BREAKING CHANGE: Type naming convention changed

Standardize type naming to PascalCase consistency.

Changes:

-  src/modules/actions/types.ts: Tgrammar → TGrammar
-  Update all imports across codebase
   EOF
   )"

```
</example>
</examples>

Now create an appropriate commit for the staged changes. First run `git status` and `git diff --cached` to understand what changed, then create the commit message following the format above.
```
