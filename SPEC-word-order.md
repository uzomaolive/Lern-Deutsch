# Spec: In-depth German Word Order content

## Objective

Teach German word order — the types and how each one works — in depth, then let
learners practice every type in a dedicated game. Two deliverables:

1. A ready course lesson "Wortstellung erklärt: German Word Order" in the A1
   grammar deep-dive unit. It explains each word-order type, how it works, with
   examples, tips, tables, glossed sentences, vocabulary, and exercises.
2. A new game "Word Order (Satzbau)" in the Games section, one level per word
   order type, each round a sentence-building exercise carrying a rule
   explanation and an English translation.

## Capability map

| Module id      | Responsibility                                          | Depends on |
| -------------- | ------------------------------------------------------- | ---------- |
| lesson-content | The in-depth Wortstellung lesson (sections, vocab, exercises) | existing lesson schema + page |
| game-content   | The Satzbau game (4 levels of word-order rounds)        | existing game schema + round views |

Build order: lesson-content, game-content (independent, no shared code changes).

## The types of word order covered (how it works)

1. **Verb-second rule (Aussagesatz)** — the finite verb is the second element of
   every statement. Second element, not second word: subject-first and
   adverb-first sentences both keep the verb in position 2.
2. **Questions** — yes/no questions put the verb first; W-questions put the
   question word first, then the verb, then the subject.
3. **Inversion** — when anything other than the subject opens the sentence
   (heute, dann, im Sommer...), the subject moves after the verb; the verb stays
   in position 2.
4. **Time, manner, place** — adverbials inside the sentence run time before
   manner before place (te-ka-mo-lo).
5. **The sentence frame (Satzklammer)** — the conjugated verb is the "opening
   bracket" and the rest of the verb group closes it: modal + infinitive,
   Perfekt (haben/sein + Partizip II), separable prefixes at the end.
6. **Subordinate clauses (Nebensatz)** — weil/dass/wenn/obwohl push the
   conjugated verb to the end; a main clause after a subordinate clause starts
   with the verb (verb-first).
7. **Negation and imperatives** — nicht goes before the element it negates and
   closes a whole-sentence negation; imperatives put the verb first.

## Commands

```
Build:   npm run build
Test:    npm test
Lint:    npm run lint
Typecheck: npm run typecheck
Dev:     npm run dev
```

## Project structure

```
content/a1/units/wortstellung.ts   → the new lesson (exported Lesson)
content/a1/units/grammatik-kompakt-1.ts → registers the lesson in the unit
content/games/word-order.ts        → the new game (exported Game)
content/games/index.ts             → registers the game
content/games/word-order.test.ts   → game data integrity test
content/a1/units/wortstellung.test.ts → lesson data integrity test
```

The lesson follows the pattern of `grammatik-kompakt-1.ts` lessons:
`sections[]` of heading + blocks (paragraph, example, gloss, tip, table),
`vocab[]` (at least half with `audio: true`), and `exercises[]`.

The game follows the pattern of `content/games/scramble.ts`: a hand-authored
Game object with `kind: "exercise"` rounds whose exercise type is
`"word-order"` (chunks, translation, explain). Registered in
`content/games/index.ts` alongside the other single-game files.

## Code style

Same conventions as the existing content: 2-space indent, double quotes,
kebab-case ids with no umlauts (validated by content/integrity.test.ts), no
logic in content files, explanations written in clear learner-facing English.

## Testing strategy

- `content/integrity.test.ts` already validates every lesson and game globally
  (id slugs, unique ids, ready lessons carry sections/vocab/exercises, at least
  half of vocab is audio, word-order chunks are unique and >= 2, game rounds
  well-formed). The new content must satisfy all of it.
- New `content/games/word-order.test.ts`: chunks of every round join exactly to
  a sentence ending in German punctuation, and each round has a translation and
  an explain rule.
- New `content/a1/units/wortstellung.test.ts`: the lesson covers all seven
  word-order types as section headings, and each word-order exercise joins to
  the sentence its instruction describes.

## Boundaries

- Always: run `npm test`, `npm run typecheck`, and `npm run build` before
  finishing; keep ids kebab-case and unique; keep rule explanations accurate.
- Ask first: changing the content schema, adding dependencies, changing TTS
  generation.
- Never: commit secrets; add exercises whose chunks do not form the exact
  sentence shown in the translation.

## Success criteria

- The lesson renders at `/l/a1/grammatik-kompakt-1/wortstellung-erklaert` with
  seven sections covering the types above, each with examples and at least one
  tip or table, plus vocabulary and exercises that drill every type.
- The game renders at `/games/satzbau` with four levels, appears under Grammar
  on the games index, and every round is a sentence-building exercise with a
  translation and a rule explanation.
- `npm test` (166 existing + new tests), `npm run typecheck`, and `npm run build`
  all pass; the build exports the two new pages.