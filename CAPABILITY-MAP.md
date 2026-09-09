# Capability Map: German A1-A2 Learning Platform

| Module id | Responsibility | Depends on |
|---|---|---|
| `curriculum` | Typed content model + data files: levels (A1, A2) → units → lessons; vocab items; complete syllabus outline | — |
| `audio` | Browser TTS wrapper (de-DE), speak words/phrases/sentences | `curriculum` |
| `lessons` | Lesson page: grammar explanation, vocab cards, examples, tables | `curriculum`, `audio` |
| `exercises` | Exercise engine: multiple choice, fill-in-blank, matching, word order, flashcards, listening; instant feedback + scoring | `curriculum`, `audio` |
| `progress` | localStorage: lesson completion, scores, vocab mastery, streak | `exercises`, `lessons` |
| `syllabus` | Home/course map: full A1-A2 topic index, progress per unit, "next lesson" | `curriculum`, `progress` |

Build order: `curriculum` → `audio` → `lessons` + `exercises` → `progress` → `syllabus`

Approved by user on 2026-09-09.
