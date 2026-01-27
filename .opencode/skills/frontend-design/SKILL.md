---
name: frontend-design
description: Industry-standard UX/UI patterns and best practices for modern web applications
license: MIT
compatibility: opencode
metadata:
   domain: design
   audience: designers, developers, product managers
   scope: industry-ux-ui
---

# Industry UX/UI Design Patterns

## Core Principles (Industry Standard)

### User-Centered Design

Industry leaders (Google, Apple, Airbnb, Stripe) prioritize:

-  **Clarity**: Users immediately understand what to do
-  **Efficiency**: Minimal steps to complete tasks
-  **Satisfaction**: Interactions feel natural and rewarding
-  **Inclusivity**: Design works for all abilities

### Mental Models

Design based on how users think, not how you think:

**Example**: E-commerce checkout follows expected pattern:

1. Cart → 2. Shipping → 3. Payment → 4. Review → 5. Confirm
   Users expect this flow—don't reinvent it.

### Jakob's Law

Users spend most time on other sites:

-  **Leverage familiarity**: Use patterns users already know
-  **Don't reinvent**: Standard patterns work better than custom ones
-  **Innovation exception**: Only break patterns for significant UX improvement

**Example**: All major sites use hamburger menu on mobile—users expect it.

### Hick's Law

More choices = more decision time:

-  **Limit options**: Present 3-5 choices maximum
-  **Progressive disclosure**: Show complex options progressively
-  **Group related choices**: Categorize to reduce cognitive load

**Industry example**: Airbnb filters by "Price," "Neighborhood," "Amenities"—not 50 checkboxes at once.

---

## Design Systems (Industry Standards)

### Major Design Systems

Learn from industry leaders:

-  **Google Material Design**: Android, Gmail, Google Docs
-  **Apple Human Interface Guidelines**: iOS, macOS, Apple.com
-  **Stripe Design System**: Payment, checkout, dashboard patterns
-  **Shopify Polaris**: E-commerce, product listings, checkout
-  **Atlassian Design System**: Collaboration tools, dashboards

### Common Design System Principles

#### Spacing (8px Grid)

Universal across systems:

```
4px  = 0.25rem (tight)
8px  = 0.5rem  (default)
16px = 1rem    (section)
32px = 2rem    (major)
64px = 4rem    (page)
```

#### Color Semantic System

Standardized meanings:

-  **Primary**: Main action (submit, save, continue)
-  **Secondary**: Supporting action (cancel, back, skip)
-  **Success**: Positive feedback (saved, completed)
-  **Warning**: Caution needed (unsaved, limits)
-  **Error**: Problems (validation errors, failures)
-  **Info**: Neutral information (tips, announcements)

#### Typography Scale

Industry-standard sizes:

```
12px = 0.75rem (small labels, metadata)
14px = 0.875rem (body text - mobile)
16px = 1rem (body text - desktop, form labels)
20px = 1.25rem (H5, button text)
24px = 1.5rem (H4, subheadings)
32px = 2rem (H3)
48px = 3rem (H2)
64px = 4rem (H1)
```

**Line heights**:

-  Headings: 1.1-1.3
-  Body: 1.4-1.6
-  Long-form: 1.6-1.8

---

## Visual Hierarchy (Industry Patterns)

### F-Pattern Scanning

Users scan in F-shape (Nielsen Norman Group research):

```
Primary content (top left) → → →
Secondary content (left)    ↓
                             ↓
                             ↓
```

**Implementation**:

-  **Top-left**: Most important content (headline, primary CTA)
-  **Right side**: Supporting actions (search, profile, settings)
-  **Left sidebar**: Navigation (on desktop)
-  **Center/main**: Primary content area

**Industry examples**: Netflix, YouTube, Gmail, Amazon all follow F-pattern.

### Z-Pattern Layout

For landing pages and marketing sites:

```
Primary CTA (top-left)  →  Secondary (top-right)
                            ↘
                         Content (center-left)  →  Final CTA (bottom-right)
```

**Industry examples**: Stripe, Airbnb homepage, SaaS landing pages.

### Visual Weight Balance

Distribute visual weight evenly:

**Rule of thirds**:

-  Divide layout into 3x3 grid
-  Place important elements at intersection points

**60-30-10 rule** (industry standard):

-  60% neutral (backgrounds, body text)
-  30% primary (headings, key content)
-  10% accent (CTAs, highlights)

---

## Navigation Patterns (Industry Standards)

### Top Navigation Bar

**When to use**: 3-5 top-level items

```
┌──────────────────────────────────────┐
│ [Logo]  [Products]  [Pricing]  [Login]  │
└──────────────────────────────────────┘
```

**Industry examples**: Shopify, Stripe, Atlassian

### Sidebar Navigation

**When to use**: Hierarchical content, 6+ sections

```
┌────────┐  ┌──────────────────────┐
│ Home    │  │ Dashboard          │
│        │  │ Analytics  ← Active│
│ Reports │  │ Reports            │
│        │  │ Settings           │
│ Settings│  └──────────────────────┘
└────────┘
```

**Industry examples**: GitHub, Slack, Jira, Linear

### Breadcrumbs

**When to use**: Deep hierarchies (3+ levels)

```
Home > Products > Electronics > Smartphones > iPhone
```

**Industry examples**: Amazon, eBay, Shopify

### Mega Menu

**When to use**: Large product catalogs

```
┌──────────────────────────────────────────────────┐
│ [Products ▼] →  [Electronics] [Clothing] [Home]  │
│                  ├─ Phones        ├─ Men        │
│                  ├─ Laptops       ├─ Women      │
│                  └─ Tablets       └─ Kids       │
└──────────────────────────────────────────────────┘
```

**Industry examples**: Amazon, Best Buy, Walmart

### Bottom Navigation (Mobile)

**When to use**: 3-5 main sections on mobile

```
┌──────────────────────────────────────┐
│ [Home]  [Search]  [Orders]  [Profile] │
└──────────────────────────────────────┘
```

**Industry examples**: Instagram, Uber, Airbnb (mobile)

---

## Form Patterns (Industry Best Practices)

### Single-Column Layout

Industry research (Luke Wroblewski) shows single column is fastest:

```
Name
[________________]

Email
[________________]

Password
[________________]
```

**Industry examples**: Google Sign In, Shopify checkout, Stripe signup

### Inline Validation

Show errors immediately (industry standard):

```
Email
[invalid@example]
✗ Please enter a valid email address
```

**Industry examples**: Twitter, LinkedIn, SaaS forms

### Password Strength Indicator

Common industry pattern:

```
Password
[••••••••]

Strength: ●●●●○ Strong

- At least 8 characters
- Mix of letters and numbers
```

**Industry examples**: Google, Microsoft, GitHub

### Floating Labels

Material Design pattern (now industry standard):

```
┌─────────────────────┐
│ Email              │ ← Label floats up when typing
│ [user@example.com] │
└─────────────────────┘
```

**Industry examples**: Stripe, Shopify, Material apps

### Multi-Step Forms

For complex processes (checkout, onboarding):

```
Step 1 of 4: Account Information

Name     [________________]
Email    [________________]

[ ← Back ]  [ Continue → ]

████████░░░░ 50% complete
```

**Industry examples**: Airbnb booking, Shopify checkout, Stripe onboarding

---

## Card Patterns (Industry Standards)

### Content Card

Standard content display:

```
┌─────────────────────┐
│  [Image]           │
│  Title             │
│  Description       │
│  [Read More]  🕐 5m│
└─────────────────────┘
```

**Industry examples**: Netflix, YouTube, Medium

### Product Card

E-commerce standard:

```
┌─────────────────────┐
│  [Product Image]    │
│  Product Name       │
│  $99.99           │
│  ⭐⭐⭐⭐⭐ (123)  │
│  [Add to Cart]     │
└─────────────────────┘
```

**Industry examples**: Amazon, Shopify, Best Buy

### Action Card

Dashboard pattern:

```
┌─────────────────────┐
│  📊 Analytics     │
│  1,234 views      │
│  +12% from last   │
│  month            │
│  [View Report]     │
└─────────────────────┘
```

**Industry examples**: Google Analytics, Stripe Dashboard, Shopify Admin

### Hover States

Industry standard: Scale 1.02x + shadow increase:

```tsx
<div className="card hover:scale-102 hover:shadow-lg transition-all duration-300">
```

**Why**: Subtle feedback, indicates interactivity.

---

## Modal Patterns (Industry Standards)

### Confirmation Modal

For destructive or critical actions:

```
┌──────────────────────────────┐
│  ⚠ Delete Account?         │
│                             │
│  This action cannot be       │
│  undone. Are you sure?       │
│                             │
│  [Cancel]  [Delete Account]  │
└──────────────────────────────┘
```

**Industry examples**: GitHub, Google, Stripe

### Form Modal

For quick actions without page navigation:

```
┌──────────────────────────────┐
│  Add New Card               │
│                             │
│  Card Number  [______]       │
│  Expiry      [______]       │
│  CVC         [______]       │
│                             │
│  [Cancel]  [Add Card]       │
└──────────────────────────────┘
```

**Industry examples**: PayPal, Shopify, Airbnb

### Best Practices

-  **Backdrop**: Semi-transparent overlay
-  **Escape key**: Close with Escape
-  **Click outside**: Close when clicking backdrop
-  **Focus trap**: Keep keyboard focus inside modal
-  **Primary action**: Right side, more prominent
-  **Destructive action**: Different color (red), separate position

---

## Feedback Patterns (Industry Standards)

### Success Feedback

```
✓ Changes saved successfully!
✓ Account created! Check your email.
✓ Order #12345 confirmed.
```

**Industry examples**: Shopify, Stripe, Gmail

### Error Feedback

```
✗ Failed to save. Please try again.
✗ Email is already in use. Try another.
✗ Card declined. Please check details.
```

**Industry examples**: All major SaaS and e-commerce

### Loading States

**Spinner** (< 3 seconds):

```
[ Spinner ]
Loading...
```

**Progress bar** (3-10 seconds):

```
████████░░░░ 80%
Uploading file...
```

**Skeleton screen** (content loading):

```
┌─────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ (gray blocks)
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
└─────────────────────┘
```

**Industry examples**: Facebook, LinkedIn, YouTube (skeletons), Stripe (spinners)

### Toast Notifications

Temporary, auto-dismissing:

```
┌─────────────────────────┐
│ ✓ Saved    [×]        │
└─────────────────────────┘
```

**Industry examples**: Slack, Gmail, Notion

---

## Dashboard Patterns (Industry Standards)

### Metrics Card

Key performance indicators:

```
┌─────────────────────┐
│  Revenue           │
│  $124,500         │
│  +23% from last    │
│  month             │
└─────────────────────┘
```

**Industry examples**: Stripe Dashboard, Shopify Admin, Google Analytics

### Chart Container

Data visualization:

```
┌─────────────────────────────┐
│ Monthly Revenue            │
│  $150k │                │
│  $100k │    ▓▓▓▓       │
│  $50k  │    ▓▓▓▓▓▓     │
│         └───────────────  │
│        Jan  Feb  Mar      │
└─────────────────────────────┘
```

**Industry examples**: Mixpanel, Amplitude, Google Analytics

### Table with Actions

Sortable, filterable data:

```
┌──────────────────────────────────────┐
│ Name      │ Status    │ Actions    │
├──────────────────────────────────────┤
│ User A    │ Active    │ [Edit]    │
│ User B    │ Inactive  │ [Edit]    │
│ User C    │ Active    │ [Edit]    │
└──────────────────────────────────────┘
```

**Industry examples**: Admin panels, CRM systems, GitHub issues

---

## E-commerce Patterns (Industry Standards)

### Product Listing Page

```
┌──────────────────────────────────────┐
│ Filters ▼  Sort by: Featured ▼     │
├──────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐     │
│ │      │ │      │ │      │ ...   │
│ │ $99  │ │ $79  │ │ $129 │       │
│ │ ★★★★│ │ ★★★ │ │ ★★★★│       │
│ └──────┘ └──────┘ └──────┘       │
└──────────────────────────────────────┘
```

**Industry examples**: Amazon, Shopify stores, Best Buy

### Product Detail Page

```
┌─────────────────┬────────────────────┐
│                 │  Product Name     │
│  [Product Img]  │  $99.99         │
│                 │  ★★★★☆ (123)   │
│  [Thumbnail]    │                  │
│  [Thumbnail]    │  Add to Cart     │
│  [Thumbnail]    │                  │
│                 │  ✓ Free Shipping │
└─────────────────┴────────────────────┘
```

**Industry examples**: Amazon, Shopify, Nike

### Checkout Flow

Standard 3-step pattern:

1. **Shipping** → Address, method selection
2. **Payment** → Card, PayPal, Apple Pay
3. **Review** → Order summary, confirm

**Industry examples**: Shopify, Amazon, Stripe Checkout

---

## SaaS Patterns (Industry Standards)

### Pricing Table

Standard comparison layout:

```
┌──────────┬──────────┬──────────┬──────────┐
│          │ Basic    │ Pro       │ Enterprise│
├──────────┼──────────┼──────────┼──────────┤
│ $9/mo    │ $29/mo   │ $99/mo   │
│          │ [Popular] │          │
├──────────┼──────────┼──────────┼──────────┤
│ ✓        │ ✓        │ ✓        │
│ ✓        │ ✓        │ ✓        │
│ ✗        │ ✓        │ ✓        │
│ ✗        │ ✗        │ ✓        │
├──────────┼──────────┼──────────┼──────────┤
│ [Start]  │ [Start]  │ [Contact]│
└──────────┴──────────┴──────────┴──────────┘
```

**Industry examples**: Stripe, Shopify, Atlassian

### Onboarding Flow

Progressive introduction:

```
Step 1 of 3: Set up profile

Welcome! Let's set up your workspace.

[Your Name] ___________
[Company Name] _________

[ Skip ]  [ Continue → ]

████░░░░ 33% complete
```

**Industry examples**: Slack, Notion, Figma

### Empty States

Guiding users when no data:

```
┌─────────────────────────────────┐
│  📭                          │
│  No emails yet                 │
│                               │
│  Compose your first email       │
│  to get started.               │
│                               │
│  [ Compose Email ]            │
└─────────────────────────────────┘
```

**Industry examples**: Gmail, Trello, Slack

---

## Accessibility (WCAG Industry Standards)

### WCAG AA vs AAA

-  **WCAG AA**: Minimum legal requirement (4.5:1 contrast, keyboard navigation)
-  **WCAG AAA**: Enhanced accessibility (7:1 contrast)

**Industry standard**: Aim for AA compliance, AAA for critical text.

### Color Contrast Tools

Industry-standard tools:

-  WebAIM Contrast Checker
-  Chrome DevTools Color Picker
-  Stark plugin (Figma)

### Keyboard Navigation

**Must support**:

-  **Tab key**: Navigate through interactive elements
-  **Enter/Space**: Activate buttons, links, inputs
-  **Escape**: Close modals, dropdowns
-  **Arrow keys**: Navigate menus, lists

**Test**: Try using app with only keyboard (no mouse).

### Screen Reader Support

**Semantic HTML** (screen readers interpret correctly):

-  `<h1>`-`<h6>`: Heading structure
-  `<nav>`: Navigation
-  `<main>`: Primary content
-  `<button>`: Actions
-  `<a>`: Links

**Descriptive labels**:

```tsx
// Good
<button aria-label="Close dialog">✕</button>

// Bad
<button>✕</button>
```

---

## Mobile UX Patterns (Industry Standards)

### Bottom Sheet (iOS/Android)

```
┌──────────────────────────────┐
│                              │
│  Main content (behind)        │
│                              │
│  ┌──────────────────────────┐ │
│  │ [Action 1]             │ │ ← Bottom sheet
│  │ [Action 2]             │ │
│  │ [Cancel]                │ │
│  └──────────────────────────┘ │
└──────────────────────────────┘
```

**Industry examples**: iOS Maps, Uber, Google Maps

### Swipe Actions

List item actions:

```
┌──────────────────────────────┐
│  ← Swipe →               │ ← "Archive"
│  Email Subject            │
│  Sender Name             │
└──────────────────────────────┘
```

**Industry examples**: iOS Mail, Gmail (Android), Slack

### Pull to Refresh

```
┌──────────────────────────────┐
│  ↓ Pull to refresh...      │ ← Indicator
│  ┌──────────────────────┐ │
│  │ Content list         │ │
│  │ Item 1              │ │
│  │ Item 2              │ │
│  └──────────────────────┘ │
└──────────────────────────────┘
```

**Industry examples**: Twitter, Gmail, LinkedIn

---

## Dark Mode Patterns (Industry Standard)

### When to Support

-  **Industry standard**: All major apps now support dark mode
-  **User preference**: Respect system preference (media query)
-  **Manual toggle**: Allow users to switch manually

### Implementation

```
// System preference (auto)
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: #ffffff;
  }
}

// Manual toggle (user override)
.dark-mode {
  background: #1a1a1a;
  color: #ffffff;
}
```

**Industry examples**: Apple, Google, Microsoft, all major SaaS

### Best Practices

-  **Maintain contrast**: Dark mode ≠ lower contrast
-  **Adjust saturation**: Dark backgrounds require more vibrant colors
-  **Reduce eye strain**: Dark grays, not pure black (#1a1a1a vs #000000)
-  **Test images**: Ensure images work on both backgrounds

---

## Design Anti-Patterns (Industry Standards)

### Common Industry Anti-Patterns

#### Dark Patterns (Manipulative UX)

-  **Fake urgency**: "Only 2 left!" (when plenty available)
-  **Trick questions**: Opt-in checkboxes hidden in fine print
-  **Roach motels**: Easy to sign up, impossible to cancel
-  **Forced continuity**: Auto-renew without clear notice

**Industry avoidance**: Apple, Google, Stripe explicitly ban dark patterns.

#### Accessibility Anti-Patterns

-  **Color-only communication**: "Red means error" without icon/label
-  **Low contrast**: Light gray on white (< 4.5:1)
-  **No keyboard support**: Mouse-only interactions
-  **Missing labels**: Placeholder-only inputs

#### Performance Anti-Patterns

-  **Over-animation**: Unnecessary animations slow down UX
-  **Large images**: Not optimized, slow loading
-  **Blocking rendering**: JavaScript blocks initial render

---

## When to Use This Skill

Load this skill when designing:

-  **Navigation**: Patterns (top, sidebar, breadcrumbs, mega menu)
-  **Forms**: Layouts, validation, multi-step flows
-  **Cards**: Content, product, action cards
-  **Modals**: Confirmations, forms, actions
-  **Feedback**: Success, error, loading states
-  **Dashboards**: Metrics, charts, data tables
-  **E-commerce**: Product listings, detail pages, checkout
-  **SaaS**: Pricing, onboarding, empty states
-  **Mobile**: Bottom sheets, swipe actions, pull-to-refresh
-  **Dark mode**: Implementation, best practices
-  **Accessibility**: WCAG compliance, keyboard, screen readers
-  **Anti-patterns**: Identifying and avoiding common mistakes
