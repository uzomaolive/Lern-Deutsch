# Implementation Plan: Lern Deutsch A1-A2

## Overview

Interactive German course site (Next.js App Router + TypeScript + Tailwind + Vitest) teaching the full A1-A2 syllabus per SPEC.md. No backend: content ships as typed TS data, progress persists to localStorage. v1 authors A1 Unit 1 fully; every other syllabus unit ships as a planned shell so the course map is complete from day one. Module build order follows the approved capability map: curriculum → audio → lessons/exercises → progress → syllabus.

## Architecture Decisions

- **Static data over CMS/MDX.** Content is typed TS files validated at build and test time by integrity tests. Components render schema blocks; no markdown parser dependency.
- **App Router, static generation.** Content is known at build time; lesson and syllabus routes render statically (SSG) via `generateStaticParams`. Progress lives client-side only.
- **Client boundary.** Lesson page shell is a server component; exercise area and progress reads run under a client `ProgressProvider`. Components read progress through typed actions, never touching localStorage directly, keeping the future accounts/cloud swap contained in the progress module.
- **Exercise scoring rules** (spec section 7) live in pure functions (`lib/progress/scoring.ts`) so tests can drive star math without rendering.
- **Answers normalized** (NFKD, trim, case-insensitive, umlaut-equivalent) in pure `checkFillBlank`; no locale surprises.
- **No locks.** All ready lessons open; "next up" is guidance, not gating.
- **Planned lessons are not routable.** Map shows them as coming-soon chips; lesson route 404s for anything not `ready`.
- **Git:** init repo in phase A. Bootstrap files on `main`, all implementation on `feat/a1-a2-platform`, squash-merge to main on completion. Commits are conventional, gated by lint + typecheck + tests.

## Task List

### Phase A: Foundation

- [ ] Task A1: Scaffold Next.js app (TS, Tailwind, App Router, ESLint flat config), add Vitest + React Testing Library, root layout with header/footer, placeholder home page, README with the spec's commands, git init + branch setup
- [ ] Task A2: Content schema (`content/schema.ts`): Level, Unit, Lesson (status: ready | planned), content blocks, VocabItem, Exercise union of 6 types; plural/gender fields for nouns
- [ ] Task A3: `CurriculumRepository`: typed lookups (level, unit, lesson), syllabus chain ordering, `nextUp` candidate resolution, slug handling; unit tests for ordering, unknown ids, planned filtering

### Checkpoint A: Foundation
- [ ] lint + typecheck + test + build all pass
- [ ] dev server renders placeholder at localhost:3000

### Phase B: Curriculum skeleton (whole syllabus)

- [ ] Task B1: A1 unit/lesson shell inventory mirroring SPEC 14: 10 thematic units, planned lesson titles + summaries for every spec grammar domain and theme (incl. grammar domains A1.1-A1.9 mapped to lessons), shared index
- [ ] Task B2: A2 unit/lesson shell inventory mirroring SPEC 14 grammar + theme lists
- [ ] Task B3: Curriculum integrity tests: globally unique ids, no empty units, every planned lesson has title+summary, every lesson id resolves through repository chain

### Checkpoint B
- [ ] tests prove every spec inventory item is represented in data
- [ ] map data renders nothing yet, but repository answers complete for both levels

### Phase C: Audio module

- [ ] Task C1: `lib/tts/tts.ts`: `speak`, cancel-in-flight, de-DE voice preference, `canSpeak` guard (SSR-safe)
- [ ] Task C2: `SpeakButton` UI component (enabled/disabled states) + tests for guard logic

### Phase D: Lessons + Exercise engine (rendering)

- [ ] Task D1: Exercise scoring core (`lib/progress/scoring.ts`) + answer normalization (`lib/progress/answers.ts`): stars from first-attempt %, tolerance rules; unit tests
- [ ] Task D2: `ExerciseHost` + feedback UI + `MultipleChoice` + `Listening` (pick-what-you-heard, TTS stem) + component tests
- [ ] Task D3: `FillBlank` (typed, tolerant) + `Matching` (two columns) + component tests
- [ ] Task D4: `WordOrder` (reorder chunks) + `Flashcard` (know-it/again with session counter) + component tests
- [ ] Task D5: Lesson page: server renderer for content blocks (paragraph/example/tip/table), VocabTable with SpeakButton, route `/l/[level]/[unit]/[lesson]`, `generateStaticParams` over ready lessons, notFound for unknown/planned, next-lesson footer link (static chain), completion banner UI shell (wired in phase F)

### Checkpoint D
- [ ] fixture lesson renders every block type and all six exercise types interactively
- [ ] build + tests pass

### Phase E: v1 content authoring (A1 Unit 1, full)

- [ ] Task E1: Lesson "Hallo und Guten Tag": greetings/leave-takings, alphabet + spelling, pronunciation basics; vocab with audio flags; MC + listening exercises
- [ ] Task E2: Lesson "Zahlen und Preise": 0-100, prices, phone numbers; fill-blank + listening exercises
- [ ] Task E3: Lesson "Länder und Sprachen": countries/languages/nationalities, formal Sie, personal data questions; matching + flashcard exercises
- [ ] Task E4: Lesson "sein und Personalpronomen": sein full conjugation, pronouns, W-Fragen, word order intro; word-order + MC + fill-blank exercises
- [ ] Task E5: Unit completeness pass: every v1 exercise type appears ≥ once in Unit 1; all 4 lessons `ready`, remaining syllabus stays `planned`; vocab items carry sensible audio coverage

### Checkpoint E
- [ ] manual browser pass: full Unit 1 flow works, TTS speaks, every exercise scores
- [ ] content proofread: German copy reviewed for typos

### Phase F: Progress module

- [ ] Task F1: `lib/progress/store.ts`: `ProgressState` types, `LocalStorageProgress` (load/save/merge, versioned key), `ProgressProvider` context with actions; unit tests incl. corrupt/empty storage
- [ ] Task F2: `lib/progress/streak.ts` streak math + tests; wiring: exercise results dispatch to provider, best-score kept, vocab mastery increments, lesson completion derived, lastActiveDay stamped
- [ ] Task F3: lesson completion banner + per-lesson exercise checklist now live; next-lesson link becomes progress-aware

### Checkpoint F
- [ ] reload persistence verified: complete exercise → reload → state intact
- [ ] streak updates and survives a day-boundary simulation (tested in unit, sanity-checked manually)

### Phase G: Syllabus home (course map)

- [ ] Task G1: `/` course map: A1 then A2, unit sections with per-unit progress bars, lesson cards (completed / started / open / coming-soon), next-up callout, empty-state when no progress yet

### Checkpoint G
- [ ] full flow: complete A1 Unit 1 lesson → map shows progress → reload keeps it → next-up moves
- [ ] responsive layout + keyboard basics pass (frontend-ui skill applied)

### Phase H: Polish and close

- [ ] Task H1: accessibility and responsive audit of lesson + map pages (focus states, contrast, reduced motion, touch targets)
- [ ] Task H2: final gate: lint, typecheck, full test suite, production build; README and SPEC verification sections updated; branch squash-merged to main

### Checkpoint H: Complete
- [ ] all success criteria from SPEC section 2 hold
- [ ] final human review on main

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| create-next-app latest flags differ from docs (e.g. ESLint flat config, Tailwind v4) | Med | Check current docs via context7 at scaffold time; verify with build |
| speechSynthesis quirks (no de-DE voice, silent until gesture, SSR) | Med | `canSpeak` guard, speak only on user gesture via button, graceful disabled state |
| Content authoring volume (spec inventory is huge) | High | Planned shells for everything now; content passes fill units in order after v1 |
| Answer-tolerance frustration (typing umlauts) | Med | Normalized comparison incl. umlaut-equivalence + authored accepted variants + hints |
| localStorage schema evolution after accounts/cloud later | Med | Single typed ProgressState + versioned storage key + merge on read |
| Browser voice for listening exercises sounds robotic | Low | Acceptable for v1; recorded audio is a later swap inside the audio module |

## Open Questions

- None blocking. Deployment target (Vercel) deferred until user asks.
