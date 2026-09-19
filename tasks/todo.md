# Games Section Overhaul — Task List

Plan: `tasks/plan.md`. Catalog: the user's full list (34 games across 4
categories). All phases complete.

## Coverage map

**Noun & Article (11):** Artikel Drop ✅, Der Die Das Rules ✅, Time
Expressions ✅, Dativ Prepositions ✅, Guess the Word from Image ✅, True or
False (Nouns) ✅, Noun Plurals ✅, English Nouns to German ✅, Guess the Word
MC ✅, Guess the Word (typing) ✅, Guess the Artikel ✅ (existing
article-challenge)

**Verb (8):** Present to Perfekt ✅, Partizip II ✅, Conjugation Full Table ✅,
English Verbs to German ✅, Guess the Verb MC ✅, German Verbs to English ✅,
Conjugation MC ✅, Conjugation (present) ✅

**Number (7):** Number Drop ✅, Math in German ✅, Number Tap ✅, Time Short
Form ✅, German Time (analog clock) ✅, Words to Numbers ✅, Numbers to Words ✅

**Vocabulary & Sentence (8):** 9 Words ✅, German Wordle ✅, Word Match Grid ✅,
German to English Sentence ✅, Sentence Order ✅ (existing sentence-scrabble),
Buchstabensalat ✅, Word Matching ✅ (existing match-words), Word Guessing ✅

## Implementation notes

- New round kinds (additive to `content/games/schema.ts`): `typing`, `drop`,
  `hangman`, `wordsearch`, `time`, `keypad`; each with a dedicated component.
- Pure logic extracted and tested: Wordle grading (`WordleGame.test.tsx`),
  German number words (`lib/german/numbers.ts`), word-search grid generation
  (`lib/games/wordsearch.ts`).
- Reusable `AnswerInput` typing component (umlaut-tolerant via
  `normalizeAnswer`); `Clock` SVG for the time game; `DropGame` arcade shared
  by Artikel Drop and Number Drop.
- Games index redesigned (featured banner, category sections, level chips).
- TTS: collector extended for typing/scramble audio; 503 new clips per voice
  generated; manifest now tracks 40,704 clips.
- Build: 166 static pages, clean. Tests: 162 pass.

## Verification

- [x] Typecheck clean
- [x] npm test — 162/162 pass
- [x] npm run build — clean, all 47 game pages exported