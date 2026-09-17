# Implementation Plan: Games Section like learnGermanWithGames.com

## Overview

Rework the Games section to match the quality and coverage of
learngermanwithgames.com: a card-based games index (emoji, title,
description, level badge, "Play" CTA, grouped by category with a featured
game), plus the site's full game catalog implemented as detailed interactive
games on top of the existing content-driven games architecture.

## Reference catalog (26 games on the reference site)

**Number (7):** Number Drop, Math in German, Number Tap, Time Short Form,
German Time (analog clock), Words to Numbers, Numbers to Words

**Verb (16):** 9 Words, German Wordle, Present to Perfekt, Word Match Grid,
Partizip II, German→English Sentence, Sentence Order, Conjugation Full
Table, Buchstabensalat, Word Matching, Word Guessing (hangman), English→
German Verbs, Guess the Verb MC, German Verbs→English, Conjugation MC,
Conjugation Present

**Word/culture (3):** Guess the Movie, der/die/das (Artikel), Flashcards

## Already covered by existing games

Flashcards, article-challenge (≈ der/die/das), match-words (≈ Word
Matching), sentence-scrabble (≈ Sentence Order), choose-the-response
(≈ Guess the Verb MC). These stay as-is.

## New games to build (21)

## Architecture decisions

- **Extend the round schema, don't fork it.** New mechanics get new round
  kinds in `content/games/schema.ts` (e.g. `wordle`, `scramble`, `hangman`,
  `conjugation`, `math`, `numberDrop`, `timeClock`, `gridMatch`). Existing
  kinds keep working unchanged.
- **Typing games live in the content data.** Verb lists, sentence pairs and
  number prompts are authored in `content/games/` TS files like the rest of
  the curriculum; components stay dumb renderers.
- **Games index gets the reference layout.** Featured game banner, category
  sections, level badges (A1/A2), card CTAs. No images in the repo: emoji +
  Tailwind gradients stand in for the reference site's thumbnails.
- **Reuse existing libs.** `shuffleOptions`/`shuffleWithSeed` for option
  order, `tts` for audio on word/sentence games, existing exercise components
  where the mechanic matches.
- **TTS strings:** every German word shown in games is already covered by
  the collector only if flagged; new games add words via existing schemas so
  `collect-tts-strings.ts` picks them up, regenerating audio in one run.

## Task list (phases)

### Phase 1: Games index redesign + flagship games
- Task 1: Redesign `app/games/page.tsx` (featured banner, category sections,
  level badges, card CTAs)
- Task 2: German Wordle (new `wordle` round kind + component, 5-letter word
  list, keyboard, 6 tries)
- Task 3: 9 Words (letter-tile scramble with 30s timer)
- Task 4: Word Match Grid (tap-match tiles, timer, faster rounds)

### Checkpoint: Phase 1 — typecheck, tests, manual play-through of 4 new games

### Phase 2: Verb games (typing)
- Task 5: Verb Conjugation Present (ich/du/er/ihr typing + MC variant)
- Task 6: Verb Conjugation Full Table (6 persons at once)
- Task 7: English Verbs to German / German Verbs to English (typing)
- Task 8: Guess the Verb MC (already close to choose-the-response; upgrade if needed)
- Task 9: Partizip II practice (typing + haben/sein picker)
- Task 10: Present to Perfekt (type Perfekt sentences)

### Checkpoint: Phase 2 — conjugation/verb typing flows work, audio plays

### Phase 3: Word games
- Task 11: Buchstabensalat (unscramble)
- Task 12: Word Guessing (hangman)
- Task 13: German to English Sentence (typing translation)
- Task 14: Guess the Movie (German film titles, MC)

### Checkpoint: Phase 3

### Phase 4: Number games
- Task 15: Words to Numbers / Numbers to Words (typing both directions)
- Task 16: Number Tap (keypad)
- Task 17: Math in German (calculate, build word)
- Task 18: Number Drop (arcade timer)
- Task 19: Time Short Form / German Time (analog clock)

### Checkpoint: Phase 4 — full catalog live, collect + generate any new audio

### Phase 5: Polish
- Task 20: Level badges, scoring display, replay flow on all new games
- Task 21: Final test pass, README note, PR

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Scope is ~21 games | High | Ship in phases with checkpoints; each phase is reviewable independently |
| New round kinds touch the shared GameRoundView | Med | Additive only: existing kinds keep rendering paths unchanged |
| Audio coverage for new words | Med | Collect + generate TTS in one pass after content lands |
| Static export constraints (no API) | Low | All games are client-side data-driven, same as today |

## Open questions

- Keep all 19 existing games alongside the 21 new ones? (Recommendation:
  yes, they cover the same ground and keep content volume high.)
- Phase order OK? (Recommendation: flagship + index first, then verbs,
  words, numbers.)