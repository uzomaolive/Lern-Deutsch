# Spec: Sprechen üben — German Speaking Practice

## Objective

A speaking practice page that goes beyond Ankommo's random-topic generator. The learner picks a level (A1 or A2), draws a topic card, gets a cheat sheet (words, sentence starters, connectors), prepares on a timer, then speaks for one minute. Where Ankommo stops at a timer, this page uses the free browser Web Speech API to **transcribe the learner's speech live**, count which cheat-sheet words and sentence starters they actually used, measure speaking time, and offer a **local recording replay**. No backend, no uploads, no API keys: everything happens in the browser.

User stories:

- As an A1 learner, I pick a topic like "Sich vorstellen", see the words and sentence starters I need, prepare for two minutes, then speak and see which cheat-sheet words I managed to use.
- As an A2 learner, I draw a harder topic ("Im Restaurant reklamieren"), hide the cheat sheet for a challenge, speak, and replay my recording to hear myself.
- As a learner on Firefox/Safari, I still get the full practice flow (topic, cheat sheet, timers, self-assessment) even without speech recognition.

Success criteria:

- `/practice` page renders and is linked from the header.
- A1 and A2 topic banks exist with at least 12 topics per level, each with words, sentence starters, connectors, and a question/example sentence.
- Speech recognition on Chrome/Edge: live transcript appears, cheat-sheet word coverage is highlighted, speaking time and word count are reported, and a local recording can be replayed.
- Graceful degradation: Firefox/Safari get the same flow with a manual "Done" button instead of recognition.
- All tests, typecheck, lint, and build pass; the page is fully keyboard accessible.

## Tech Stack

- Next.js (static export, app router), React, Tailwind, TypeScript strict
- Web Speech API (`webkitSpeechRecognition` / `SpeechRecognition`, `de-DE`) — recognition only
- MediaRecorder API — local recording playback
- Existing browser speech synthesis + generated TTS clips for speaking cheat-sheet words aloud
- Existing localStorage progress store for session history

## Commands

```
npm run dev        # dev server
npm test           # vitest
npm run typecheck  # tsc
npm run lint       # eslint
npm run build      # static export to out/
```

## Project Structure

```
content/practice/            → topic bank data (new)
  index.ts                   → practiceTopics: { level, topics }[]
  schema.ts                  → SpeakingTopic, CheatSheet types
app/practice/page.tsx        → /practice route (new)
components/practice/         → UI components (new)
  SpeakingPractice.tsx       → client page shell, state machine
  TopicCard.tsx              → topic + cheat sheet display
  PrepTimer.tsx              → preparation countdown
  SpeakPhase.tsx             → recognition/recording + timer
  FeedbackReport.tsx         → transcript, word coverage, stats, replay
  useSpeechRecognition.ts    → Web Speech API hook with capability detection
  useMediaRecorder.ts        → local recording hook
lib/practice/                → pure logic + tests (new)
  coverage.ts                → cheat-sheet word/starters used vs transcript
  timing.ts                  → formatted countdown helpers
```

## Code Style

Follow the existing conventions: small pure functions with unit tests, client components with `"use client"`, Tailwind with the site's stone/amber palette, `aria-label` on icon-only buttons, no new dependencies, no `console.log` (structured logging only). Types live in content/practice/schema.ts and are imported by components.

```ts
// lib/practice/coverage.ts — pure, unit tested
export function findCoveredItems(
  cheat: CheatSheet,
  transcript: string,
): { usedWords: string[]; usedStarters: string[]; usedConnectors: string[] } {
  const lower = normalize(transcript);
  return {
    usedWords: cheat.words.filter((w) => lower.includes(normalize(w))),
    usedStarters: cheat.sentenceStarters.filter((s) => lower.includes(normalize(s))),
    usedConnectors: cheat.connectors.filter((c) => lower.includes(normalize(c))),
  };
}
```

## Testing Strategy

- Vitest, colocated `*.test.ts` next to source (existing convention).
- Unit tests: coverage matching (normalization: case, umlauts, punctuation), timing helpers, topic bank integrity (unique ids, per-level min topics, non-empty fields).
- Component tests with Testing Library: state machine (topic → prep → speak → feedback), fallback without recognition, timer renders, feedback report renders coverage.
- Manual check: Chrome real speech session; Firefox fallback flow.

## Boundaries

- **Always:** run tests/typecheck/lint before commit; keep topic ids kebab-case and unique; keep recognition code behind capability detection; persist nothing except progress history in localStorage; give every interactive element an accessible name.
- **Ask first:** adding npm dependencies (goal: zero new ones); changing the progress store schema; changing CI; adding routes outside /practice.
- **Never:** upload or transmit audio or transcripts anywhere (site is static; there is no backend — this must stay true); hardcode API keys; use em dashes in content.

## Open Questions

- Should the session history count toward the existing streak, or stay separate? (Proposal: separate lightweight history, streak untouched — the progress store is exercise-based.)
- Topic language: German-only instructions with English gloss, or German with the existing pattern of English hints? (Proposal: German instructions, English in parentheses where the cheat sheet needs it, matching the rest of the site.)