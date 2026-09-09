# Task List: Lern Deutsch A1-A2

All phases complete on 2026-09-09. v1 shipped: full A1-A2 syllabus structure, five authored A1 Unit 1 lessons, six exercise types, TTS, localStorage progress, course map.

## Phase A: Foundation
- [x] A1: Scaffold Next.js app + Vitest + RTL + layout + README + git init/branches
- [x] A2: Content schema (Level, Unit, Lesson, blocks, VocabItem, Exercise union)
- [x] A3: CurriculumRepository + slug/ordering/nextUp tests

## Checkpoint A
- [x] lint + typecheck + test + build pass; dev server renders

## Phase B: Curriculum skeleton
- [x] B1: A1 shells: 10 units + all planned lessons per SPEC A1 inventory
- [x] B2: A2 shells: 10 units + all planned lessons per SPEC A2 inventory
- [x] B3: Curriculum integrity tests (unique ids, coverage, resolvable chain)

## Checkpoint B
- [x] repository answers for both levels; inventory fully mirrored

## Phase C: Audio module
- [x] C1: tts.ts speak/cancel/voice-pick + canSpeak guard
- [x] C2: SpeakButton + guard tests

## Phase D: Lessons + Exercise engine
- [x] D1: scoring.ts + answers.ts (stars, normalization) + tests
- [x] D2: ExerciseHost + feedback UI + MultipleChoice + Listening + tests
- [x] D3: FillBlank + Matching + tests
- [x] D4: WordOrder + Flashcard + tests
- [x] D5: Lesson page renderer (blocks, vocab table) + route + notFound + footer nav

## Checkpoint D
- [x] fixture lesson renders all blocks + six exercise types; build + tests pass

## Phase E: v1 content (A1 Unit 1)
- [x] E1: Hallo und Guten Tag + Alphabet und Aussprache lessons + MC/listening
- [x] E2: Zahlen 0 bis 100 lesson + fill-blank/listening
- [x] E3: Länder und Sprachen lesson + matching/flashcard
- [x] E4: sein und haben lesson + word-order/MC/fill-blank
- [x] E5: Unit completeness pass (all six types present, proofread)

## Checkpoint E
- [x] full Unit 1 browser pass incl. TTS + scoring

## Phase F: Progress module
- [x] F1: ProgressState + LocalStorageProgress + ProgressProvider + tests
- [x] F2: streak.ts + wiring results to provider
- [x] F3: live completion banner + progress-aware next lesson

## Checkpoint F
- [x] reload persistence + streak verified

## Phase G: Syllabus home
- [x] G1: course map page with progress, next-up, coming-soon states

## Checkpoint G
- [x] end-to-end flow on map; responsive + keyboard pass

## Phase H: Polish and close
- [x] H1: accessibility + responsive audit (Lighthouse 100 across the board, CLS fixed)
- [x] H2: final gate (lint/typecheck/test/build), docs in sync, merge to main

## Checkpoint H
- [x] SPEC section 2 criteria all hold; final human review

## Follow-ups (out of v1 scope)
- Author remaining A1 units (Unit 2 onward), then A2, as content passes
- Accounts + cloud sync behind the ProgressStore interface when requested
- Recorded audio swap inside the audio module
- Deployment target (Vercel) when the user asks