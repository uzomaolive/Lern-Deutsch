# Lern Deutsch A1-A2

Interactive German course covering the complete A1-A2 syllabus: grammar, vocabulary, and exercises. No backend: content ships as typed data files, progress lives in the browser (localStorage).

## Commands

```bash
npm install        Install dependencies
npm run dev        Start dev server on http://localhost:3000
npm run build      Production build
npm run lint       ESLint
npm run typecheck  TypeScript check (tsc --noEmit)
npm test           Run Vitest once
npm run test:watch Vitest watch mode
```

## Audio generation

The app ships pre-generated audio files in `public/tts/`. Run these scripts whenever curriculum content changes or when you want to add the Gemini AI voice.

**Collect strings** (required before any generation):
```bash
npm run collect:tts
```

**Generate all audio** (Edge + Gemini, requires `GOOGLE_API_KEY`):
```bash
cp .env.example .env.local   # fill in GOOGLE_API_KEY
source .env.local             # or export GOOGLE_API_KEY=...
npm run generate:tts
```

**Generate only the Gemini AI voice** (requires `GOOGLE_API_KEY`):
```bash
export GOOGLE_API_KEY=your_key_here
python3 scripts/generate-tts-gemini.py
# or for a quick smoke test: python3 scripts/generate-tts-gemini.py 20
```

**Generate only the Edge voices** (no API key required):
```bash
pip install edge-tts
python3 scripts/generate-tts-edge.py
```

The Gemini voice appears in the voice picker as "Kore (Gemini AI)". Change the voice via the `TTS_VOICE` environment variable; see `.env.example` for all options.

## Structure

- `app/` Next.js App Router routes. `/` is the course map; `/l/[level]/[unit]/[lesson]` are lesson pages.
- `content/` typed curriculum data: levels, units, lessons, vocab, exercises. The full A1-A2 syllabus is mirrored here; lessons marked `planned` render as coming-soon shells.
- `components/` UI, syllabus, lesson, and exercise components.
- `lib/` pure domain logic: progress store, scoring, streak, TTS.
- `SPEC.md` the product spec (success criteria, syllabus inventory, scoring rules). `tasks/` holds the build plan and task list.

## Development notes

- Exercise scoring rules live in `lib/progress/scoring.ts` as pure functions; change rules there, not in components.
- Content files are data only (no JSX). The schema in `content/schema.ts` is the single source of truth.
- Before writing code, read the Next.js docs bundled in `node_modules/next/dist/docs/`; this project pins current Next.js which may differ from older training data.