### Generate quiz Array aligned to article content, CEFR level, and article vocabulary

**Instructions:**

-  Output must be an array of question objects only, matching the exact template schema below.
-  Use the article content provided in the "content" field as the only source of truth. Reuse the same vocabulary, examples, and phrasing whenever possible.
-  Adapt language complexity to the specified CEFR level and the article's vocabulary scope.
-  Ensure every correct answer is directly supported by the article text.
-  Avoid introducing concepts not covered in the article.

**Input variables you will receive:**

-  `content`: Markdown string of the article's content.
-  `cefrLevel`: One of `"A1"`, `"A2"`, `"B1"`, `"B2"`, `"C1"`, `"C2"`.
-  `topic`: Short topic label (e.g., `"Deutsche Kultur"`, `"Umwelt"`, `"Technologie"`).
-  `languagePrimary`: `"de"` (German is always primary for options; questions must include both `de` and `es`).
-  `numQuestions`: Integer 5–12.
-  `allowedTypes`: Array subset of `["single", "multiple", "true_or_false", "autocomplete"]`.
-  `requireSpanishQuestion`: boolean (`true` = every question has both `de` and `es`).
-  `minOptions`: Integer (default 3).
-  `maxOptions`: Integer (default 4).
-  `multipleMinCorrect`: Integer (default 2).
-  `balance`: Object controlling mix, e.g., `{ "single": 2, "multiple": 1, "true_or_false": 1 }` (best-effort if counts don't sum exactly).

**Target schema to produce:**

```javascript
;[
   {
      id: 'q1',
      type: 'single|multiple|true_or_false|autocomplete',
      question: {
         de: 'string',
         es: 'string'
      },
      options: {
         o1: 'string',
         o2: 'string',
         o3: 'string'
      },
      correctAnswers: ['o1']
   }
]
```

**Authoring requirements:**

1. **Alignment with article content and topic vocabulary**

   -  Extract 1 core idea per question from key facts, main arguments, or specific details mentioned in the article.
   -  Reuse exact terms, names, dates, locations, and phrases from the article (e.g., proper nouns, statistics, key concepts).
   -  Focus on comprehension: facts stated in the article, cause-and-effect relationships, comparisons, or conclusions drawn by the author.
   -  Do not invent information not in the article. If a detail is ambiguous, do not create a question about it.

2. **CEFR calibration**

   -  **A1–A2**: focus on concrete facts, simple who/what/when/where questions; use basic vocabulary for questions and options; avoid complex sentence structures.
   -  **B1–B2**: include inference questions, compare/contrast elements, ask about reasons or purposes; allow moderate complexity in question stems.
   -  **C1–C2**: test deeper understanding, implicit meanings, author's perspective, subtle distinctions; use sophisticated vocabulary where appropriate.

3. **Question types and structure**

   -  Use only the types in `allowedTypes`.
   -  For `type=true_or_false`:
      -  Present a statement that can be verified as true or false based on the article content.
      -  Provide exactly two options: `{"o1":"Wahr","o2":"Falsch"}`.
      -  `correctAnswers` must be `["o1"]` for true and `["o2"]` for false.
   -  For `type=single`:
      -  Test factual recall or comprehension with exactly one correct answer.
      -  Options count: `minOptions`–`maxOptions`.
   -  For `type=multiple`:
      -  Ask about multiple related facts, characteristics, or examples mentioned in the article.
      -  At least `multipleMinCorrect` correct answers. Options count: `minOptions`–(`maxOptions`+1).
   -  For `type=autocomplete`:
      -  Present a sentence from or based on the article with one missing word/phrase (represented by `___`).
      -  The German text should contain the blank; Spanish should provide context.
      -  The correct answer must be a word or phrase that appears in the article.

4. **Wording quality**

   -  German (`de`) is the authoritative language for options. Use vocabulary and phrasing from the article.
   -  Spanish (`es`) is only for the question text. Use clear, appropriate Spanish for the CEFR level.
   -  Focus on comprehension rather than language mechanics (unless the article specifically discusses language).
   -  Avoid negative stems ("Which is NOT mentioned…") unless clearly justified by article contrasts.
   -  Avoid "All of the above"/"None of the above".

5. **Plausible distractors**

   -  Create distractors that are plausible but incorrect based on the article content.
   -  Use related concepts, similar names, or logical alternatives that weren't mentioned in the article.
   -  For factual questions, use realistic numbers, dates, or locations that could be confused with the correct ones.

6. **IDs and stability**

   -  Question ids: `q1..qN` in order.
   -  Option ids per question: `o1..oM`.
   -  Do not reuse option ids across questions.

7. **Validation rules**

   -  All strings non-empty; trim whitespace.
   -  For `single`: exactly 1 `correctAnswers` entry and it must exist in `options`.
   -  For `multiple`: `correctAnswers` length ≥ `multipleMinCorrect` and all ids exist in `options`.
   -  For `true_or_false`: `options` must be `{"o1":"Wahr","o2":"Falsch"}` and `correctAnswers` either `["o1"]` or `["o2"]`.
   -  Options count: respect `minOptions`/`maxOptions` for `single`; for `multiple` allow one extra if needed to include plausible distractors.

8. **Balance and coverage**

   -  Try to follow the `balance` object. If not provided, aim for:
      -  **A1–A2**: 60–70% single, 20–30% true_or_false, 0–20% multiple.
      -  **B1–B2**: 40–50% single, 25–35% multiple, 15–25% true_or_false.
      -  **C1–C2**: 35–45% multiple, 35–45% single, 10–20% true_or_false.
   -  Cover different sections or aspects of the article (introduction, main points, conclusion, etc.).

9. **Output format**

   -  Return an array of question objects that strictly matches the template. No comments, no extra keys, no explanations, no wrapper object.

   **Example output** (based on a B1 article about _Oktoberfest_; `allowedTypes` `["single","multiple","true_or_false","autocomplete"]`; `numQuestions` 5; `minOptions` 3; `maxOptions` 4; `multipleMinCorrect` 2; `requireSpanishQuestion=true`):

```javascript
;[
   {
      id: 'q1',
      type: 'single',
      question: {
         de: 'In welcher Stadt findet das Oktoberfest statt?',
         es: '¿En qué ciudad se celebra el Oktoberfest?'
      },
      options: {
         o1: 'Berlin',
         o2: 'München',
         o3: 'Hamburg',
         o4: 'Frankfurt'
      },
      correctAnswers: ['o2']
   },
   {
      id: 'q2',
      type: 'true_or_false',
      question: {
         de: 'Das Oktoberfest dauert drei Wochen.',
         es: 'El Oktoberfest dura tres semanas.'
      },
      options: {
         o1: 'Wahr',
         o2: 'Falsch'
      },
      correctAnswers: ['o2']
   },
   {
      id: 'q3',
      type: 'multiple',
      question: {
         de: 'Was kann man auf dem Oktoberfest essen?',
         es: '¿Qué se puede comer en el Oktoberfest?'
      },
      options: {
         o1: 'Bratwurst',
         o2: 'Brezeln',
         o3: 'Hendl',
         o4: 'Sushi'
      },
      correctAnswers: ['o1', 'o2', 'o3']
   },
   {
      id: 'q4',
      type: 'autocomplete',
      question: {
         de: 'Das Oktoberfest wird auch ___ genannt.',
         es: 'Completa: El Oktoberfest también se llama...'
      },
      options: {
         o1: 'Wiesn',
         o2: 'Fest',
         o3: 'Feier'
      },
      correctAnswers: ['o1']
   },
   {
      id: 'q5',
      type: 'single',
      question: {
         de: 'Wann beginnt das Oktoberfest normalerweise?',
         es: '¿Cuándo comienza normalmente el Oktoberfest?'
      },
      options: {
         o1: 'Im Oktober',
         o2: 'Mitte September',
         o3: 'Ende August',
         o4: 'Anfang November'
      },
      correctAnswers: ['o2']
   }
]
```

**Implementation hint:**

-  Focus on reading comprehension rather than language production. Questions should test whether the user understood the article's content.
-  If the article contains dialogue, quotes, or multiple perspectives, create questions that distinguish between different viewpoints or speakers.
-  For cultural or specialized topics, ensure distractors are culturally plausible alternatives.

---

**The article content to extract info for quiz is the following:**
