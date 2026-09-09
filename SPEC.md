# Spec: Lern Deutsch A1-A2

Interactive German learning website covering the complete A1-A2 syllabus (Goethe-curriculum aligned), with exercises. This spec covers all modules in the approved capability map.

## 1. Objective

A self-paced German course for beginners who want to pass the A1 and A2 levels (CEFR). The user opens the site, sees the full course map for A1 and A2, opens a lesson, reads a short grammar/vocab explanation, drills it with interactive exercises, gets instant feedback, and watches their progress accumulate on the course map.

User stories:

- As a learner, I see every topic I must know for A1 and A2 in one syllabus, with my progress on each.
- As a learner, I open a lesson and get the grammar rule, example sentences, and vocabulary needed for that topic.
- As a learner, I can tap any German word or sentence and hear it spoken (browser TTS, de-DE).
- As a learner, I practice with varied exercise types and get instant, kind feedback with the correct answer when I err.
- As a learner, my completion, scores, and vocab mastery persist between visits without creating an account.
- As a learner, I can keep a daily streak and see where to continue next time.

## 2. Success Criteria

- The syllabus index lists the complete A1 and A2 topic inventory (all units/lessons in this spec's syllabus section); unwritten lessons render as accurate, non-broken "coming soon" shells with full metadata.
- v1 authored content: at least the complete A1 Unit 1 (introductions: greetings, alphabet, numbers, countries/languages, sein) as fully written lessons, each embedding exercises covering every v1 exercise type at least once across the unit.
- Every exercise gives instant feedback and records a score; wrong answers reveal the correct answer with a short hint where authored.
- Progress (completed lessons, per-exercise best scores, vocab mastery, streak) survives a full page reload, stored in localStorage behind an interface that could later be swapped for a cloud API.
- TTS playback works for every vocab item and example sentence that declares `audio: true`, with graceful degradation when speechSynthesis is unavailable.
- Course map shows per-unit progress bars and a computed "continue here" next step.
- `npm run build`, `npm run lint`, `npm run typecheck`, and `npm test` all pass.

## 3. Tech Stack

- Next.js App Router (latest stable at scaffold time), React, TypeScript strict
- Tailwind CSS (latest stable, per create-next-app defaults)
- Vitest + React Testing Library for tests
- Web Speech API (`speechSynthesis`) for pronunciation; de-DE voice
- No backend, no database, no auth in v1; localStorage for persistence
- Content authored as typed TypeScript data files (no CMS)

## 4. Commands

```
npm install        Install dependencies
npm run dev        Start dev server on http://localhost:3000
npm run build      Production build (static prerender where possible)
npm run lint       ESLint
npm run typecheck  tsc --noEmit
npm test           Run Vitest once
npm run test:watch Vitest watch mode
```

## 5. Project Structure

```
german-app/
├── app/                     → Next.js App Router routes
│   ├── layout.tsx           → Root layout, header/footer, progress provider
│   ├── page.tsx             → Course map (syllabus home)
│   └── l/[level]/[unit]/[lesson]/page.tsx  → Lesson pages; [level] = a1|a2
├── components/
│   ├── ui/                  → Button, Card, ProgressBar, Badge, SpeakButton
│   ├── syllabus/            → CourseMap, UnitSection, LessonCard, NextUp
│   ├── lessons/             → LessonShell, GrammarSection, VocabTable, ExampleList
│   └── exercises/           → ExerciseHost + per-type: MultipleChoice, FillBlank,
│                               Matching, WordOrder, Flashcard, Listening
├── content/                 → curriculum module
│   ├── schema.ts            → Types: Level, Unit, Lesson, Exercise, VocabItem, blocks
│   ├── a1/index.ts, a1/units/*.ts
│   ├── a2/index.ts, a2/units/*.ts
│   └── index.ts             → CurriculumRepository (typed lookups, ordering, nextUp)
├── lib/
│   ├── progress/            → progress module
│   │   ├── store.ts         → ProgressStore interface + localStorage impl
│   │   ├── scoring.ts       → score → stars, mastery rules (pure, unit-tested)
│   │   └── streak.ts        → streak math (pure, unit-tested)
│   ├── tts/tts.ts           → audio module: speak(text), voice pick, fallback
│   └── utils.ts
├── tests/                   → integration-style tests not colocated
├── CAPABILITY-MAP.md
├── SPEC.md
└── tasks/plan.md, tasks/todo.md
```

## 6. Content Model (curriculum module)

Types live in `content/schema.ts`. Files under `content/a1/units/*.ts` export `Unit` objects; the schema is the single source of truth for structure.

- `Level`: `a1` | `a2` (id, title, subtitle, units)
- `Unit`: id (kebab), title, `cefr` focus note optional, lessons[]
- `Lesson`: id, title, summary, `sections: ContentSection[]`, `vocab: VocabItem[]`, `exercises: Exercise[]`; optional `prereqNote`
- `ContentSection`: titled blocks for explanation: paragraph | example | tip | table | conjugation note
- `VocabItem`: id, `de`, `en`, `part` (noun: gender+plural), optional `phrase`, optional `audio: true`, optional `tip`
- `Exercise`: discriminated union on `type`:
  - `multiple-choice`: prompt, options, correct index, optional audio stem
  - `fill-blank`: sentence with blank(s), accepted answer variants (case/umlaut tolerant), optional hint
  - `matching`: two columns, pairs
  - `word-order`: shuffled sentence chunks, one ordering is correct
  - `flashcard`: deck items (front/back), mastery recorded on "know it"
  - `listening`: TTS-spoken prompt, choose/pick what you heard (text answer options)
  - every exercise: `id`, `title`, `instruction`, optional `explain`

A single source of truth for the complete syllabus lives in the unit index files; every lesson exists in the data with a status (`ready` | `planned`). Planned lessons render a coming-soon card, never a broken page.

## 7. Exercise + Scoring Semantics

- Answers are checked client-side. First attempt correctness drives the score.
- Per-exercise result: percent correct on first attempts. Stars: ≥95% = 3, ≥80% = 2, ≥60% = 1, else 0.
- Exercise counts as completed when attempted once with a score ≥ 60%. Best score is kept.
- Lesson completed when every embedded exercise is completed. Lesson mastery = 3 stars each + vocab session finished.
- Vocab mastery per item: "learning" after one correct flashcard reveal, "known" after 3 correct responses across sessions (stored per item).
- Streak: consecutive calendar days (local timezone) with at least one completed exercise. Streak resets after one full missed day.
- Feedback copy is kind, German-flavored ("Stark!", "Fast!", "Fast richtig. Die Antwort war: ..."), no red "wrong!" walls. Correct answers always shown after a miss.

## 8. Audio (audio module)

`speak(text, { rate })` uses `speechSynthesis`, prefers a de-DE voice, sets `lang = de-DE`, cancels any in-flight speech before new utterance. Exposed via a `SpeakButton` for any `speakable` text. When speechSynthesis is missing (SSR, unsupported browser), the button is hidden/disabled rather than erroring.

## 9. Progress (progress module)

`ProgressStore` interface (get/update state) implemented by `LocalStorageProgress`. All reads go through a single typed `ProgressState`:

```ts
interface ProgressState {
  exercises: Record<string, { best: number; attempts: number }>; // key: lessonId:exerciseId
  vocab: Record<string, { correct: number; known: boolean }>;     // key: flashcard item "<exerciseKey>:<index>"
  lastActiveDay: string | null;                                   // YYYY-MM-DD (local)
  streak: number;                                                 // consecutive active days
  seenFlashcards: string[];                                       // keys with a session
}
```

A React context (`ProgressProvider`) exposes state + updater actions; components never touch localStorage directly. Swapping to accounts + cloud sync later means replacing `LocalStorageProgress` and the provider wiring, not components.

## 10. Routes

- `/` home = course map: A1 then A2, unit sections with progress bars, lesson cards (completed / in progress / locked? no locks, everything open), next-up callout.
- `/l/a1/[unit-slug]/[lesson-slug]` lesson page: header w/ unit trail, sections rendered, vocab table with SpeakButtons, exercises one after another, completion banner on finish, "next lesson" link.
- Unknown level/lesson slugs → `notFound()`.

Planned shells are not routable (no lesson page exists for them); the map links them to nothing until authored, showing a "Coming soon" state instead.

## 11. Code Style

- Strict TypeScript everywhere; `noUncheckedIndexedAccess` style discipline on arrays (guard before indexing).
- Functional components, hooks small; domain logic (scoring, streak) lives in pure functions in `lib/`, unit tested, imported by components.
- Content data files are data only: no JSX, no logic. Components render.
- One real snippet conveying style:

```tsx
// components/exercises/FillBlank.tsx (shape only, not final markup)
export function FillBlank({ exercise, onResult }: Props) {
  const [value, setValue] = useState("");
  const [attempted, setAttempted] = useState(false);
  const correct = checkFillBlank(exercise, value); // pure fn in lib
  return <form onSubmit={(e) => { e.preventDefault(); setAttempted(true); onResult(correct); }}>
    ...
  </form>;
}
```

- Naming: kebab-case files, PascalCase components, `camelCase` fns, `UPPER_SNAKE` for constant content keys. Comments explain why, never what.

## 12. Testing Strategy

- Vitest, colocated `*.test.ts(x)` next to pure-logic and component files.
- Pure logic gets full unit coverage: `scoring`, `streak`, `checkFillBlank` answer tolerance (case, umlaut, trim), `CurriculumRepository` ordering and nextUp, progress merge semantics.
- Components: RenderButton/ExerciseHost happy paths: correct and incorrect fill-blank flow, star computation display.
- TTS is not unit tested (browser API); the `canSpeak` guard is.
- e2e (Playwright) deferred; manual browser pass via Chrome DevTools for flows at each milestone.
- Gate: `npm run lint && npm run typecheck && npm test` before each commit.

## 13. Boundaries

- Always: run lint + typecheck + tests before commit; German content proofread for typos; every user-facing string English UI but German learning content.
- Ask first: adding dependencies; changing the ProgressState shape; changing exercise scoring rules; content model changes; any auth/backend work.
- Never: commit secrets; write content logic into components; ship a planned shell that throws.

## 14. Full A1-A2 Syllabus Inventory

The authoritative checklist. v1 authors Unit 1 of A1 in full; all other units ship as `planned` shells with titles and summaries. Content passes fill units in order. Numbering matches Goethe-style progression: within a level units are thematic, grammar threads run across units.

### Level A1

Themes and vocabulary (word fields):

1. Kennenlernen: greetings, introductions, alphabet + spelling, numbers 0-100, countries, languages, nationalities, personal data (name, address, email, phone), formal "Sie"
2. Familie & Freunde: family members, marital status, children, basic appearance adjectives, hobbies intro
3. Essen & Trinken: food and drink, meals, ordering in a restaurant, preferences (Ich möchte...), prices, paying
4. Tagesablauf & Zeit: clock times, weekdays, months, seasons, daily routine verbs, frequency adverbs
5. Wohnen: rooms, furniture, colors, describing a home, apartment ads
6. Arbeit & Beruf: professions, workplaces, daily tasks, polite requests at work
7. Stadt & Orientierung: city places, directions, asking and giving the way, basic transport
8. Einkaufen: clothes, sizes, colors, prices, shopping dialogues, exchanges/complaints
9. Gesundheit & Körper: body parts, simple ailments, doctor and pharmacy basics
10. Freizeit & Reisen: hobbies, sports, weather basics, holidays and travel basics

Grammar A1 (must-know list, organized by domain):

**A1.1 Nouns: gender and plural**
- Noun gender: der/die/das (masculine/feminine/neuter); natural gender, common suffixes as orientation (-ung, -heit, -keit, -schaft, -ion → feminine; -er, -ling → masculine; -chen, -lein → neuter)
- Plural formation, complete A1 inventory: no-change with umlaut (Mutter → Mütter), + -e / -¨e (Tisch → Tische, Hand → Hände), + -er / -¨er (Kind → Kinder, Buch → Bücher), + -n / -en (Frau → Frauen, Student → Studenten), + -s (Auto → Autos, foreign words), specials (Mann → Männer); plural article "die"; plural of ein-words is keine (no indefinite plural)
- Compound words (die Haustür = das Haus + die Tür; last word determines gender)
- Nouns from verbs and adjectives (essen → das Essen) as encountered in the word fields

**A1.2 Articles and determiners (Begleiter), full declension**
- Definite article der/die/das/den with full case table: Nominative, Accusative, Dative
- Indefinite article ein/eine/ein; negative determiner kein/keine/kein/keinen (full table); kein plural = no article plural
- Possessive determiners full set mein/dein/sein/ihr/unser/euer + Ihr (formal), declined like ein-words across Nominative and Accusative (A1), Dative for fixed structures (mit meinem Bruder)
- Interrogative determiner welcher/welche/welches + was für ein
- Contractions: am, im, zum, zur, beim, vom, ins, aufs, ans, übers, durchs; meanings and usage

**A1.3 Pronouns, full set**
- Personal pronouns all persons, Nominative (ich, du, er/sie/es, wir, ihr, sie, Sie)
- Accusative pronouns: mich, dich, ihn, sie, es, uns, euch
- Dative pronouns: mir, dir, ihm, ihr, uns, euch, ihnen (A1 use: mir geht es gut, Das schmeckt mir, fixed dative phrases; gefallen/helfen reserved for A2 dative-verb lesson)
- Reflexive basics (A1 end): ich freue mich, wir treffen uns (full systematic reflexive work in A2)
- man as indefinite subject (Man spricht Deutsch)
- es: formal subject (Es regnet, Es ist kalt), placeholder es (Es gibt + Accusative)
- Demonstrative dieser/diese/dieses (this one here) basic Nominative/Accusative
- Pronoun order: es before personal dative (Ich gebe es ihm) intro as pattern at A1 end, systematic in A2

**A1.4 Cases**
- What the four cases are and what their jobs are: Nominative (subject), Accusative (direct object + nach bestimmten Verben), Dative (indirect object + fixed contexts), Genitive (ownership, introduced as von + Dative alternative "das Auto von Anna")
- Questions per case: wer? wen? wem? wessen?
- Verbs with Accusative object: haben, essen, trinken, kaufen, sehen, machen, lesen, schreiben, brauchen, suchen, finden, kennen, nehmen, möchten
- Verbs with fixed Dative structure (A1 surface): gefallen only in Das gefällt mir (deep dative-verb list in A2)

**A1.5 Verbs**
- sein and haben: full present conjugation, both as main and helper of key structures
- Regular verbs: conjugation pattern; stems ending in -t/-d (arbeit-en → du arbeitest) and -s/-ß/-z (heißen → du heißt)
- Vowel-changing strong verbs: e→i(e): sprechen, essen, geben, nehmen, sehen, lesen, helfen, treffen; a→ä: fahren, schlafen, laufen, tragen; full pattern table
- Verb + complement frames: transitive verbs taking Accusative object (A1.4), fixed-preposition intro at A1 end (warten auf + Accusative, sich interessieren für + Accusative; full list in A2)
- Modal verbs present: können, möchten, wollen, müssen, dürfen (A1: intro polite dürfen), sollen (A1 end, recognition); conjugated modal + infinitive at sentence end; meaning of each
- Imperative, all three forms:
  - du (informal): verb stem, -e optional (Komm/Komme!); vowel change e→i(e) preserved (Sprich! Iss!); separable prefix goes to the end (Steh auf!); irregular sein → Sei!, haben → Hab!
  - ihr (informal plural): ihr-form of present tense without pronoun (Geht! Arbeitet!); sein → Seid!
  - Sie (formal): infinitive + Sie, verb first (Kommen Sie bitte!); with separable verbs the prefix stays at the end (Rufen Sie mich an!)
  - inclusive wir suggestion: Gehen wir!
  - negation of imperatives with nicht (Komm nicht so spät!); softening with bitte, mal
- Separable verbs (present): aufstehen, anfangen, anrufen, ankommen, abfahren, aufmachen, zumachen, einkaufen, einladen, fernsehen, mitkommen, mitnehmen, zurückkommen, weggehen; stressed prefix, splits off and goes to sentence end in main clauses (Ich stehe um sieben auf), stays attached after modals (Ich muss um sieben aufstehen)
- Inseparable prefix verbs: prefixes be-, ge-, er-, ver-, zer-, ent-, emp-, miss- never split and are unstressed; A1 verbs: verstehen, bekommen, besuchen, bezahlen, erzählen, verkaufen, verdienen, beginnen, gefallen, gehören; they take no ge- in the participle (verstanden, bezahlt), introduced here, drilled in A2 Perfekt
- Present for future meaning (Ich fliege morgen nach Berlin)
- Perfekt (intro at A1 end, full system in A2): haben or sein in present + Partizip II at the end (Satzklammer: Ich habe gestern Pizza gegessen)
  - regular participles: ge + stem + t (machen → gemacht, wohnen → gewohnt, arbeiten → gearbeitet); -ieren verbs without ge- (studieren → studiert)
  - irregular participles ge + stem + en with vowel change (essen → gegessen, trinken → getrunken, sehen → gesehen, schreiben → geschrieben, sprechen → gesprochen, nehmen → genommen, lesen → gelesen); sein → gewesen, haben → gehabt, werden → geworden
  - sein as helper for movement or change of state: gehen, kommen, fahren, fliegen, laufen, aufstehen, bleiben; haben as default helper
  - separable verbs: ge- between prefix and stem (aufgestanden, eingekauft, ferngesehen); inseparable prefixes take no ge- (verstanden)
  - spoken-past framing with gestern, letzte Woche (Ich habe gestern Deutsch gelernt, Wir sind letzte Woche nach Berlin gefahren)
- No other past tense at A1; Präteritum of sein/haben/modals arrives with A2

**A1.6 Prepositions**
- Accusative-only (A1 set): für, um, durch, ohne, gegen (+ bis)
- Dative-only (A1 set): mit, nach, aus, zu, von, bei, seit (time), gegenüber (late A1)
- Two-way (an, auf, in, über, unter, vor, hinter, neben, zwischen): A1 = Wo? + Dative for static location (Das Buch liegt auf dem Tisch), Wohin? + Accusative for movement (Ich lege das Buch auf den Tisch); systematic rules in A2
- Place: nach + city/country without article (nach Berlin, nach Spanien), in + country/article countries (in die Schweiz, in den Iran), aus + country, zu + person/place (zum Bahnhof, zur Arbeit, zu Anna), nach Hause vs zu Hause, bei der Oma
- Time: um + clock (um 8 Uhr), am + day/part-of-day (am Montag, am Abend), im + month/season (im Juli, im Winter), von...bis, seit + present (A1 end: Ich lerne seit einem Jahr Deutsch)
- Everyday chunks: mit dem Bus, ohne Zucker, für dich, gegen Kopfschmerzen, aus Deutschland, von 9 bis 17 Uhr

**A1.7 Adjectives and adverbs**
- Predicative adjectives (Das Haus ist groß) — no endings
- Small attributive set with ein/der endings modeled as chunks (ein guter Freund, die gute Idee); systematic attributive declension is A2
- Adverbs of frequency: immer, oft, manchmal, selten, nie, jeden Tag, am Wochenende
- Adverbs of time: heute, morgen, gestern, jetzt, dann, bald, spät, früh
- Adverbs of place: hier, da, dort, links, rechts, geradeaus
- Comparative of gern/lieber/am liebsten; sehr vs zu; ganz

**A1.8 Sentence structure**
- Word order: verb always in second position (statements and W-questions), verb-first yes/no questions; subject-verb inversion after fronted elements (Heute lerne ich Deutsch)
- Sentence bracket (Satzklammer): the conjugated verb holds position two while everything that splits off goes to the end: modals + infinitive (Ich möchte morgen früh aufstehen), Perfekt auxiliary + participle (Ich habe gestern Fußball gespielt), separable prefix (Ich stehe um sieben auf); nicht stands before the end element
- Time before place (Ich gehe heute Abend ins Kino)
- Verbs with two objects: pattern Dative-before-Accusative noun, Accusative-pronoun-before-Dative-noun (A1 end, chunk-based: Ich gebe dem Kind den Ball / Ich gebe ihn dem Kind)
- Negation: nicht placement (end, before specific element, before predicate adjective/noun complement), kein vs nicht choice rule; nicht with modal sentences (Ich kann nicht kommen) before the infinitive bracket
- Sentence connectors: und, oder, aber, denn (main clause, verb second after denn), sondern after negation; no inversion after und/oder/aber/denn
- Question words full A1 set: wer, was, wo, woher, wohin, wie, wann, warum, wie viel, wie viele, welcher, was für ein
- Formal vs informal address: du/Sie, greeting and leave-taking register, titles (Herr, Frau)
- Alphabet, pronunciation, spelling (Buchstabieren)

**A1.9 Numbers and time**
- Cardinal numbers 0 to 1,000,000: unit-before-ten reading (einundzwanzig), hundreds and thousands (dreihundert, zweitausend), decimals with comma (3,5), Euro prices with cents (19,99 € reads neunzehn neunundneunzig), weights (ein Kilo, ein halbes Kilo), years as cardinals (2024 = zweitausendvierundzwanzig)
- Phone numbers digit by digit, chunks, and doubling (Null, zwei, vier, sieben; 22 = zwei zwei or zweiundzwanzig)
- Ordinal numbers 1-31: -te/-ste suffixes, dates (der erste Mai, am ersten Mai; format 01.05.2024), birthdays (Wann hast du Geburtstag?)
- Clock times: formal (Es ist vierzehn Uhr dreißig) and informal (Es ist halb drei, Viertel nach/vor zwei, fünf nach halb drei); Wie spät ist es? Um wie viel Uhr? Wann?
- Days relative and named: heute, morgen, gestern, übermorgen, vorgestern; Montag...Sonntag, montags (recurring), am Montag, am Wochenende; letzte/diese/nächste Woche/Monat/Jahr
- Months and seasons: Januar...Dezember, Frühling, Sommer, Herbst, Winter; im Juli, im Winter
- Duration and ranges: eine Stunde, eine halbe Stunde, zwei Tage; von...bis, bis wann?, seit wann? + present, wie lange?
- Sequencing routine events: zuerst, dann, danach, zum Schluss (day-routine stories)

### Level A2

Themes and vocabulary:

1. Beziehungen & Feste: invitations, celebrations, gifts, small talk, family events
2. Alltagsgeschichten: narrating the past, daily life changes, luck and chance
3. Arbeit & Kommunikation: phone calls, messages, meetings, arranging and changing appointments
4. Wohnen & Nachbarn: moving, room ads, neighbors, house rules
5. Einkaufen & Service: shops, complaints, returns, services (post, bank)
6. Gesundheit & Termine: body, illness, doctor, pharmacy, healthy habits, accidents
7. Mobilität & Reisen: trips, planning travel, tickets, hotels, complaints on travel
8. Freizeit & Kultur: hobbies deepen, media (radio, TV, internet), culture, events
9. Lernen & Berufswahl: school subjects, training, job applications basics
10. Wetter & Natur: forecasts, seasons deepened, environment basics

Grammar A2 (must-know list):

- Perfekt (systematizes the A1-end intro): haben vs sein rules deepened, complete common irregular and mixed verb participle inventory (bringen → gebracht, denken → gedacht, wissen → gewusst, bleiben, fliegen, schwimmen), separable and inseparable participles in depth, Perfekt in subordinate clauses
- Perfekt with time markers: gestern, letzte Woche, vor zwei Tagen
- Präteritum: war, hatte; modal verbs in Präteritum (konnte, musste, wollte, sollte)
- Complete imperative: du, ihr, Sie
- Reflexive verbs: sich freuen, sich anziehen, sich treffen; dative reflexive (sich die Zähne putzen)
- Subordinate clauses: weil, dass, wenn, ob + verb-final; inversion when the clause comes first
- Infinitive with zu: beginnen, versuchen, vergessen, helfen + zu; es ist wichtig zu...
- Modal verbs review in past and Perfekt (double infinitive recognition)
- Two-way prepositions: an, auf, in, über, unter, vor, hinter, neben, zwischen; Wo? Dative, Wohin? Accusative
- Temporal prepositions: für, seit, vor, nach (+ Dative), bis
- Adjectives: comparative and superlative (+ als), adjective endings after der/ein words (Nominative, Accusative, Dative basics), sehr vs zu
- Pronouns: man; es; demonstrative dieser/diese/dieses; dative personal pronouns with verbs (helfen, gefallen, gehören, antworten, danken); object order (mir + es: Ich gebe es dir)
- Konjunktiv II: würde + infinitive, hätte, wäre, könnte (polite requests and wishes)
- Future: werden + infinitive for plans and predictions; contrast with present + time word
- Word order: time-manner-place; pronoun before noun objects
- Connectors: deshalb, dann, danach, vorher, zuerst, endlich, trotzdem
- Reported/polite framing: Ich finde, dass...; Er sagt, dass...

Boundary notes: passive voice, relative clauses, genitive, obwohl/als-clauses, Konjunktiv II past, and um...zu/damit are B1 territory. Not in this spec; documented here so scope stays honest.

## 15. Open Questions

- Product name and visual identity (working title in code: "Lern Deutsch A1-A2"). Trivial to change later.
- Nothing else blocks v1; content additions beyond A1 Unit 1 are follow-up content passes in the same architecture.

## 16. Verification

- [x] Capability map approved (CAPABILITY-MAP.md)
- [x] Spec reviewed and approved by human
- [x] Success criteria section 2 testable end-to-end at milestone ends
  - [x] Full A1-A2 syllabus index ships as planned shells (105 lessons, 20 units)
  - [x] A1 Unit 1 authored in full (5 lessons, all six exercise types, TTS)
  - [x] Progress survives reload (verified in browser and by unit tests)
  - [x] Course map shows unit progress, next-up, coming-soon states
  - [x] Lighthouse: Accessibility 100, Best Practices 100, SEO 100 (home + lesson, desktop + mobile)
  - [x] Final gate: lint, typecheck, 92 tests, production build all pass
