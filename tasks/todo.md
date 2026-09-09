# Task List: Lern Deutsch A1-A2

Tracked in tasks/plan.md. Tasks are ordered by dependency; checkpoints gate each phase.

## Phase A: Foundation
- [ ] A1: Scaffold Next.js app + Vitest + RTL + layout + README + git init/branches
- [ ] A2: Content schema (Level, Unit, Lesson, blocks, VocabItem, Exercise union)
- [ ] A3: CurriculumRepository + slug/ordering/nextUp tests

## Checkpoint A
- [ ] lint + typecheck + test + build pass; dev server renders

## Phase B: Curriculum skeleton
- [ ] B1: A1 shells: 10 units + all planned lessons per SPEC A1 inventory
- [ ] B2: A2 shells: 10 units + all planned lessons per SPEC A2 inventory
- [ ] B3: Curriculum integrity tests (unique ids, coverage, resolvable chain)

## Checkpoint B
- [ ] repository answers for both levels; inventory fully mirrored

## Phase C: Audio module
- [ ] C1: tts.ts speak/cancel/voice-pick + canSpeak guard
- [ ] C2: SpeakButton + guard tests

## Phase D: Lessons + Exercise engine
- [ ] D1: scoring.ts + answers.ts (stars, normalization) + tests
- [ ] D2: ExerciseHost + feedback UI + MultipleChoice + Listening + tests
- [ ] D3: FillBlank + Matching + tests
- [ ] D4: WordOrder + Flashcard + tests
- [ ] D5: Lesson page renderer (blocks, vocab table) + route + notFound + footer nav

## Checkpoint D
- [ ] fixture lesson renders all blocks + six exercise types; build + tests pass

## Phase E: v1 content (A1 Unit 1)
- [ ] E1: Hallo und Guten Tag lesson (greetings, alphabet, spelling) + MC/listening
- [ ] E2: Zahlen und Preise lesson + fill-blank/listening
- [ ] E3: Länder und Sprachen lesson + matching/flashcard
- [ ] E4: sein und Personalpronomen lesson + word-order/MC/fill-blank
- [ ] E5: Unit completeness pass (all six types present, proofread)

## Checkpoint E
- [ ] full Unit 1 browser pass incl. TTS + scoring

## Phase F: Progress module
- [ ] F1: ProgressState + LocalStorageProgress + ProgressProvider + tests
- [ ] F2: streak.ts + wiring results to provider
- [ ] F3: live completion banner + progress-aware next lesson

## Checkpoint F
- [ ] reload persistence + streak verified

## Phase G: Syllabus home
- [ ] G1: course map page with progress, next-up, coming-soon states

## Checkpoint G
- [ ] end-to-end flow on map; responsive + keyboard pass

## Phase H: Polish and close
- [ ] H1: accessibility + responsive audit
- [ ] H2: final gate (lint/typecheck/test/build), docs in sync, merge to main

## Checkpoint H
- [ ] SPEC section 2 criteria all hold; final human review
