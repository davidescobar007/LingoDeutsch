### Generate quiz array aligned to lesson content, CEFR level, and topic vocabulary

**Instructions:**

- Output must be an array of question objects only, matching the exact template schema below.
- Use the lesson content provided in the “content” field as the only source of truth. Reuse the same vocabulary, examples, and phrasing whenever possible.
- Adapt language complexity to the specified CEFR level and the topic’s vocabulary scope.
- Ensure every correct answer is directly supported by the lesson text.
- Avoid introducing concepts not covered in the lesson.

**Input variables you will receive:**

- `content`: Markdown string of the lesson’s content.
- `cefrLevel`: One of `"A1"`, `"A2"`, `"B1"`, `"B2"`, `"C1"`, `"C2"`.
- `topic`: Short topic label (e.g., `"Alphabet und Aussprache"`).
- `languagePrimary`: `"de"` (German is always primary for options; questions must include both `de` and `es`).
- `numQuestions`: Integer 3–10.
- `allowedTypes`: Array subset of `["single", "multiple", "true_or_false", "autocomplete"]`.
- `requireSpanishQuestion`: boolean (`true` = every question has both `de` and `es`).
- `minOptions`: Integer (default 3).
- `maxOptions`: Integer (default 4).
- `multipleMinCorrect`: Integer (default 2).
- `balance`: Object controlling mix, e.g., `{ "single": 2, "multiple": 1, "true_or_false": 1 }` (best-effort if counts don’t sum exactly).

**Target schema to produce (array of question objects):**
```javascript
[
  {
    "id": "q1",
    "type": "single|multiple|true_or_false|autocomplete",
    "question": {
      "de": "string",
      "es": "string"
    },
    "options": {
      "o1": "string",
      "o2": "string",
      "o3": "string"
    },
    "correctAnswers": ["o1"]
  }
]
```

**Authoring requirements:**

1. **Alignment with lesson and topic vocabulary**  
   - Extract 1 core idea per question. Prefer high-salience points emphasized in headings, bullet lists, callouts, or examples.  
   - Reuse exact terms, examples, and mini-phrases from the lesson (e.g., letters ä/ö/ü/ß, sounds “sp/st”, example words like *Zeit*, *Sport*).  
   - Do not invent facts not in the lesson. If a fine point is uncertain, do not write a question about it.

2. **CEFR calibration**  
   - **A1–A2**: short, concrete sentences; direct recall; minimal subordination; avoid passive voice and abstract phrasing. Use vocabulary present in the lesson or standard classroom words (*Frage*, *wählen*, *richtig*).  
   - **B1–B2**: mix recall and application; allow brief contrasts or “choose the correct example” tasks; still avoid niche terminology not taught.  
   - **C1–C2**: allow subtle distinctions and application to novel but closely related examples, but remain grounded in the lesson contents.

3. **Question types and structure**  
   - Use only the types in `allowedTypes`.  
   - For `type=true_or_false`:  
     - Keep it as a single clear statement in German (`de`) and Spanish (`es`).  
     - Provide exactly two options if you include them (`o1`: “Wahr”, `o2`: “Falsch”) OR omit options and still follow the schema by keeping options with “Wahr/Falsch”. For this template, always include options with “Wahr” and “Falsch”.  
     - `correctAnswers` must be `["o1"]` for true and `["o2"]` for false.  
   - For `type=single`:  
     - Exactly one correct answer. Options count: `minOptions`–`maxOptions`.  
   - For `type=multiple`:  
     - At least `multipleMinCorrect` correct answers. Options count: `minOptions`–(`maxOptions`+1). Ensure distractors are plausible confusions from the lesson.
   - For `type=autocomplete`:  
     - The question must present a short sentence with one blank (represented by `___`) in the German text.
     - The Spanish text should describe or contextualize the missing word.
     - The correct answer must be exactly one word or short phrase that appears in the lesson.

4. **Wording quality**  
   - German (`de`) is the authoritative language for options. Avoid code-switching.  
   - Spanish (`es`) is only for the question text. Use clear, simple Spanish aligned to the CEFR target. Do not overtranslate technical phonetic descriptions; mirror the lesson phrasing.  
   - Avoid negative stems (“Which is NOT…”) unless the lesson explicitly contrasts items that way.  
   - Avoid “All of the above”/“None of the above”.

5. **Plausible distractors**  
   - Distractors must reflect common mix-ups in the lesson (e.g., z vs s, v vs w, sp/st initial clusters).  
   - Do not include silly or irrelevant distractors.

6. **IDs and stability**  
   - Question ids: `q1..qN` in order.  
   - Option ids per question: `o1..oM`.  
   - Do not reuse option ids across questions.

7. **Validation rules**  
   - All strings non-empty; trim whitespace.  
   - For `single`: exactly 1 `correctAnswers` entry and it must exist in `options`.  
   - For `multiple`: `correctAnswers` length ≥ `multipleMinCorrect` and all ids exist in `options`.  
   - For `true_or_false`: `options` must be `{"o1":"Wahr","o2":"Falsch"}` and `correctAnswers` either `["o1"]` or `["o2"]`.  
   - Options count: respect `minOptions`/`maxOptions` for `single`; for `multiple` allow one extra if needed to include plausible distractors.  
   - Use only characters present in the lesson for orthographic items (e.g., ä, ö, ü, ß) where relevant.

8. **Balance and coverage**  
   - Try to follow the `balance` object. If not provided, aim for:  
     - **A1–A2**: 50–70% single, 20–40% true_or_false, 0–20% multiple.  
     - **B1–B2**: 40–60% single, 20–40% multiple, 10–30% true_or_false.  
     - **C1–C2**: 30–50% multiple, 30–50% single, 10–30% true_or_false.  
   - Cover at least 3 distinct sub-points from the lesson.

9. **Output format**  
   - Return an array of question objects that strictly matches the template. No comments, no extra keys, no explanations, no wrapper object.

   **Example output** (based on an A1 lesson on *Alphabet und Aussprache*; `allowedTypes` `["single","multiple","true_or_false","autocomplete"]`; `numQuestions` 4; `minOptions` 3; `maxOptions` 4; `multipleMinCorrect` 2; `requireSpanishQuestion=true`):


```javascript
[
  {
    "id": "q1",
    "type": "single",
    "question": {
      "de": "Wie klingt der Buchstabe „z" im Deutschen?",
      "es": "¿Cómo suena la letra «z» en alemán?"
    },
    "options": {
      "o1": "Wie „s"",
      "o2": "Wie „ts"",
      "o3": "Wie „sch"",
      "o4": "Wie ein stimmhaftes englisches „z""
    },
    "correctAnswers": ["o2"]
  },
  {
    "id": "q2",
    "type": "true_or_false",
    "question": {
      "de": "„sp" am Wortanfang klingt wie „shp".",
      "es": "«sp» al inicio de palabra suena como «shp»."
    },
    "options": {
      "o1": "Wahr",
      "o2": "Falsch"
    },
    "correctAnswers": ["o1"]
  },
  {
    "id": "q3",
    "type": "multiple",
    "question": {
      "de": "Welche Buchstaben sind Umlaute?",
      "es": "¿Qué letras son vocales con diéresis (umlaut)?"
    },
    "options": {
      "o1": "ä",
      "o2": "ö",
      "o3": "ü",
      "o4": "ß"
    },
    "correctAnswers": ["o1", "o2", "o3"]
  },
  {
    "id": "q4",
    "type": "autocomplete",
    "question": {
      "de": "Das ist ein ___.",
      "es": "Completa la frase: 'Das ist ein ...'"
    },
    "options": {
      "o1": "Hund",
      "o2": "Katze",
      "o3": "Auto"
    },
    "correctAnswers": ["o1"]
  }
]
```
  ```

**Implementation hint:**

- If `numQuestions` exceeds clear points in the lesson, prioritize breadth (distinct sub-points) before depth (variants of the same point).

---

**the grammar topic to extrac info for quiz is the following:**

