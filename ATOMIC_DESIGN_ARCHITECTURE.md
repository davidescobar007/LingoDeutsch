# Atomic Design Architecture - LingoDeutsch

## 📐 Complete Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                         PAGES                                │
│                (Next.js App Router)                          │
│            src/app/[locale]/page.tsx                         │
│                                                              │
│  • Uses Templates with real data                            │
│  • Route-specific implementations                           │
│  • Handles data fetching & state                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      TEMPLATES                               │
│              src/components/templates/                       │
│                                                              │
│  ┌────────────────────────────────────────────┐             │
│  │  TemplateLanding                           │             │
│  │  • Composes organisms into page layout     │             │
│  │  • Defines structure, not content          │             │
│  │  • Reusable across similar pages           │             │
│  └────────────────────────────────────────────┘             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                     ORGANISMS                                │
│              src/components/organisms/                       │
│                                                              │
│  Layout Components:                                          │
│  • OrganismNavbar      • OrganismFooter                      │
│  • OrganismSidebar     • OrganismDrawer                      │
│  • OrganismLayoutContainer                                   │
│                                                              │
│  Landing Sections:                                           │
│  • OrganismHeroSection                                       │
│  • OrganismHowItWorksSection                                 │
│  • OrganismFooterSection                                     │
│  • OrganismMotivationSection                                 │
│                                                              │
│  Feature Components:                                         │
│  • OrganismHero        • OrganismLearningHero                │
│  • OrganismGrammarPreview                                    │
│  • OrganismVocabularyPreview                                 │
│  • OrganismWordSpecification                                 │
│  • OrganismGrammarLevelCard                                  │
│  • OrganismImageCard   • OrganismCardsStats                  │
│  • OrganismCallToActionCard                                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                     MOLECULES                                │
│              src/components/molecules/                       │
│                                                              │
│  • MoleculeAlert       • MoleculeCard                        │
│  • MoleculeBadgeList   • MoleculeCarousel                    │
│  • MoleculeBarChart    • MoleculeCollapse                    │
│  • MoleculeFlipCard    • MoleculeInputCheckGroup             │
│  • MoleculeListItem    • MoleculeMarkdownTable               │
│  • MoleculeMiniCard    • MoleculeModal                       │
│  • MoleculeScore       • MoleculeSimpleCard                  │
│  • MoleculeStat        • MoleculeTab                         │
│  • MoleculeTable       • MoleculeTimeLine                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                       ATOMS                                  │
│               src/components/atoms/                          │
│                                                              │
│  • AtomAlert          • AtomBadge                            │
│  • AtomButton         • AtomCountdown                        │
│  • AtomGrammarTopicTag • Icon                                │
│  • AtomInput          • AtomLoader                           │
│  • AtomText           • AtomProgressBar                      │
│  • AtomSelect         • AtomStat                             │
│  • AtomTitle                                                 │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Component Flow Example

### Landing Page

```
page.tsx
   └─> TemplateLanding (template)
         ├─> OrganismNavbar (organism)
         │     ├─> AtomTitle (atom)
         │     ├─> AtomButton (atom)
         │     └─> Icon (atom)
         │
         ├─> OrganismHeroSection (organism)
         │     ├─> AtomTitle (atom)
         │     ├─> AtomBadge (atom)
         │     └─> AtomButton (atom)
         │
         ├─> OrganismHowItWorksSection (organism)
         │     └─> MoleculeCard (molecule)
         │           ├─> AtomTitle (atom)
         │           ├─> AtomText (atom)
         │           └─> Icon (atom)
         │
         └─> OrganismFooterSection (organism)
               └─> AtomText (atom)
```

## 📊 Component Statistics

| Level      | Count | Complexity | Reusability |
|------------|-------|------------|-------------|
| Atoms      | 14    | Low        | Very High   |
| Molecules  | 18    | Medium     | High        |
| Organisms  | 14    | High       | Medium      |
| Templates  | 1     | Very High  | Medium      |
| Pages      | N/A   | Highest    | Low         |

## 🎯 Usage Guidelines

### When to create an Atom
- It's a basic UI element (button, input, text, icon)
- Cannot be broken down further
- Used across many components
- Has no or minimal business logic

### When to create a Molecule
- Combines 2+ atoms
- Simple, focused functionality
- Reusable in different contexts
- Lightweight composition

### When to create an Organism
- Complex UI section
- Combines molecules and/or atoms
- May have domain-specific logic
- Standalone, meaningful component

### When to create a Template
- Page-level layout structure
- Composes multiple organisms
- Defines content placement
- Reusable for similar page types

### Pages (Next.js App Router)
- Live in `src/app/[locale]/`
- Use templates with real data
- Handle routing and data fetching
- Specific to individual routes
