/**
 * Expands the 18 original legacy games (flashcards, match-words, etc.)
 * to ~100 questions per level. Writes content/games/legacy-games.ts.
 *
 * Run: npx tsx scripts/expand-legacy-games.mts
 */

import { writeFileSync } from "node:fs";
import { wordLists } from "../content/wordlists";
import { levels } from "../content";
import { germanNumberWord } from "../lib/german/numbers";

// ---------------------------------------------------------------------------
// Pools (mirror of expand-games.mts)
// ---------------------------------------------------------------------------

const goetheNouns = wordLists.find((l) => l.id === "goethe-a1-nouns")!.words;
const goetheVerbs = wordLists.find((l) => l.id === "goethe-a1-verbs")!.words;
const goetheAdj = wordLists.find((l) => l.id === "goethe-a1-adjectives")!.words;
const topicNouns = wordLists
  .filter((l) => l.category === "topic")
  .flatMap((l) => l.words)
  .filter((w) => /^(der|die|das) /.test(w.de));

interface NounEntry {
  de: string;
  en: string;
  plural?: string;
}

const nounEntries: NounEntry[] = (() => {
  const seen = new Set<string>();
  const out: NounEntry[] = [];
  for (const n of [...goetheNouns, ...topicNouns]) {
    if (seen.has(n.de)) continue;
    seen.add(n.de);
    const m = n.de.match(/^(der|die|das) (.+)$/);
    if (m) out.push({ de: n.de, en: n.en, plural: n.plural });
  }
  return out;
})();

const exampleSentences = (() => {
  const out: { de: string; en: string }[] = [];
  for (const level of levels) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        if (lesson.status !== "ready") continue;
        for (const section of lesson.sections) {
          for (const block of section.blocks) {
            if (block.type === "example") out.push({ de: block.de, en: block.en });
          }
        }
      }
    }
  }
  const seen = new Set<string>();
  return out.filter((s) => {
    if (seen.has(s.de)) return false;
    seen.add(s.de);
    return s.de.split(" ").length >= 3 && s.de.length < 120;
  });
})();

const allWords = [
  ...nounEntries.map((n) => n.de),
  ...goetheVerbs.map((v) => v.de),
  ...goetheAdj.map((a) => a.de),
  ...topicNouns.map((t) => t.de),
].filter((w) => /^[a-zäöüß]+$/.test(w));

function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const arr = [...items];
  let a = h >>> 0;
  for (let i = arr.length - 1; i > 0; i--) {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    const j = ((t ^ (t >>> 14)) >>> 0) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function take<T>(items: T[], n: number, seed: string): T[] {
  return seededShuffle(items, seed).slice(0, n);
}

function shuffle3<T>(a: T, b: T, c: T, seed: string): [T, T, T] {
  return seededShuffle([a, b, c] as T[], seed) as [T, T, T];
}

function unique3(correct: string, d1: string, d2: string, fallbacks: string[], seed: string): [string, string, string] {
  const set = new Set<string>([correct, d1, d2]);
  let fb = 0;
  while (set.size < 3) {
    const candidate = fallbacks[fb++ % fallbacks.length];
    if (!set.has(candidate)) set.add(candidate);
  }
  return shuffle3(...([...set] as [string, string, string]), seed);
}

function articleOf(de: string) {
  const m = de.match(/^(der|die|das) /);
  return m ? m[1] : "";
}

// ---------------------------------------------------------------------------
// Emitters
// ---------------------------------------------------------------------------

function gameHeader(id: string, title: string, emoji: string, description: string, category: string) {
  return `import type { Game } from "./schema";

export const ${id.replace(/-/g, "")}Game: Game = {
  id: ${JSON.stringify(id)},
  title: ${JSON.stringify(title)},
  emoji: ${JSON.stringify(emoji)},
  description: ${JSON.stringify(description)},
  category: ${JSON.stringify(category)},
  tags: ["A1", "A2"],
  levels: [
`;
}

function levelBlock(id: string, title: string, rounds: string) {
  return `    {
      id: ${JSON.stringify(id)},
      title: ${JSON.stringify(title)},
      rounds: [
${rounds}
      ],
    },
`;
}

function closeGame() {
  return "  ],\n};\n";
}

function flashcardRound(id: string, items: { front: string; back: string }[]) {
  return `        {
          kind: "exercise",
          exercise: {
            id: ${JSON.stringify(id)},
            type: "flashcard",
            title: ${JSON.stringify("Flashcards")},
            instruction: ${JSON.stringify("Say the German aloud, then reveal.")},
            items: ${JSON.stringify(items.map((i) => ({ front: i.front, back: i.back, frontAudio: true })))},
          },
        },
`;
}

function matchingRound(id: string, pairs: [string, string][]) {
  return `        {
          kind: "exercise",
          exercise: {
            id: ${JSON.stringify(id)},
            type: "matching",
            title: ${JSON.stringify("Match")},
            instruction: ${JSON.stringify("Match each German word to its meaning.")},
            pairs: ${JSON.stringify(pairs)},
          },
        },
`;
}

function memoryRound(id: string, cards: { de: string; en: string }[]) {
  return `        {
          kind: "memory",
          title: ${JSON.stringify("Memory")},
          instruction: ${JSON.stringify("Find the matching pairs.")},
          cards: ${JSON.stringify(cards.map((c) => ({ de: c.de, en: c.en, audio: true })))},
        },
`;
}

function sortRound(id: string, categories: { name: string; items: string[] }[]) {
  return `        {
          kind: "sort",
          title: ${JSON.stringify("Sort")},
          instruction: ${JSON.stringify("Drag each word into the right category.")},
          categories: ${JSON.stringify(categories)},
        },
`;
}

function repeatRound(id: string, phrases: string[]) {
  return `        {
          kind: "repeat",
          title: ${JSON.stringify("Repeat after me")},
          instruction: ${JSON.stringify("Listen and repeat each phrase aloud.")},
          phrases: ${JSON.stringify(phrases)},
        },
`;
}

function rushRound(id: string, questions: { prompt: string; options: string[]; correctIndex: number }[]) {
  return `        {
          kind: "rush",
          title: ${JSON.stringify("Time rush")},
          instruction: ${JSON.stringify("Answer as many as you can before the clock runs out.")},
          timeLimit: 60,
          questions: ${JSON.stringify(questions)},
        },
`;
}

function mcRound(id: string, questions: { prompt: string; options: string[]; correctIndex: number; explain: string }[]) {
  return `        {
          kind: "exercise",
          exercise: {
            id: ${JSON.stringify(id)},
            type: "multiple-choice",
            title: ${JSON.stringify("Choose")},
            instruction: ${JSON.stringify("Choose the correct answer.")},
            prompt: ${JSON.stringify(questions[0].prompt)},
            options: ${JSON.stringify(questions[0].options)},
            correctIndex: ${questions[0].correctIndex},
            explainCorrect: ${JSON.stringify(questions[0].explain)},
            explainWrong: ${JSON.stringify(questions[0].explain)},
          },
        },
`;
}

function mcRoundMulti(roundId: string, questions: { prompt: string; options: string[]; correctIndex: number; explain: string }[]) {
  return `        {
          kind: "exercise",
          exercise: {
            id: ${JSON.stringify(roundId)},
            type: "multiple-choice",
            title: ${JSON.stringify("Choose")},
            instruction: ${JSON.stringify("Choose the correct answer.")},
            prompt: ${JSON.stringify("Choose the correct answer.")},
            options: ${JSON.stringify(["a", "b", "c"])},
            correctIndex: 0,
            explainCorrect: ${JSON.stringify("x")},
            explainWrong: ${JSON.stringify("x")},
          },
        },
`;
}

function mcExercises(questions: { prompt: string; options: string[]; correctIndex: number; explain: string }[], idPrefix: string): string {
  return questions
    .map(
      (q, i) => `        {
          kind: "exercise",
          exercise: {
            id: ${JSON.stringify(`${idPrefix}-${String(i + 1).padStart(3, "0")}`)},
            type: "multiple-choice",
            title: ${JSON.stringify("Choose")},
            instruction: ${JSON.stringify("Choose the correct answer.")},
            prompt: ${JSON.stringify(q.prompt)},
            options: ${JSON.stringify(q.options)},
            correctIndex: ${q.correctIndex},
            explainCorrect: ${JSON.stringify(q.explain)},
            explainWrong: ${JSON.stringify(q.explain)},
          },
        },
`,
    )
    .join("");
}

function wordOrderRound(id: string, sentence: string) {
  const chunks = sentence.split(" ").filter(Boolean);
  return `        {
          kind: "exercise",
          exercise: {
            id: ${JSON.stringify(id)},
            type: "word-order",
            title: ${JSON.stringify("Build the sentence")},
            instruction: ${JSON.stringify("Tap the words in the right order.")},
            chunks: ${JSON.stringify(chunks)},
            explainCorrect: ${JSON.stringify(sentence)},
            explainWrong: ${JSON.stringify(sentence)},
          },
        },
`;
}

function fillBlankRound(id: string, sentence: string, answer: string, hint: string) {
  return `        {
          kind: "exercise",
          exercise: {
            id: ${JSON.stringify(id)},
            type: "fill-blank",
            title: ${JSON.stringify("Fill the blank")},
            instruction: ${JSON.stringify("Type the missing word.")},
            sentence: ${JSON.stringify(sentence)},
            blanks: ${JSON.stringify([{ answers: [answer], hint }])},
          },
        },
`;
}

function listeningRound(id: string, prompt: string, options: string[], correctIndex: number) {
  return `        {
          kind: "exercise",
          exercise: {
            id: ${JSON.stringify(id)},
            type: "listening",
            title: ${JSON.stringify("What did you hear?")},
            instruction: ${JSON.stringify("Play the audio and pick what you heard.")},
            prompt: ${JSON.stringify(prompt)},
            options: ${JSON.stringify(options)},
            correctIndex: ${correctIndex},
            explainCorrect: ${JSON.stringify(prompt)},
            explainWrong: ${JSON.stringify(prompt)},
          },
        },
`;
}

// ---------------------------------------------------------------------------
// Composed sentences for word-order games (lesson pool is too small)
// ---------------------------------------------------------------------------

const COMPOSE_SUBJECTS: [string, string][] = [
  ["Ich", "ich"], ["Der Mann", "er"], ["Die Frau", "sie"], ["Das Kind", "er"], ["Wir", "wir"],
  ["Der Lehrer", "er"], ["Die Lehrerin", "sie"], ["Der Kellner", "er"], ["Das Mädchen", "sie"],
  ["Der Vater", "er"], ["Die Mutter", "sie"], ["Der Bruder", "er"], ["Die Schwester", "sie"],
  ["Der Opa", "er"], ["Die Oma", "sie"], ["Der Nachbar", "er"], ["Die Ärztin", "sie"],
  ["Der Zug", "er"], ["Der Bus", "er"], ["Die Kinder", "wir"], ["Die Eltern", "wir"],
];
const COMPOSE_VERBS: Record<string, [string, string, string]> = {
  sehen: ["sehe", "sieht", "sehen"], kaufen: ["kaufe", "kauft", "kaufen"],
  lesen: ["lese", "liest", "lesen"], trinken: ["trinke", "trinkt", "trinken"],
  öffnen: ["öffne", "öffnet", "öffnen"], haben: ["habe", "hat", "haben"],
  besuchen: ["besuche", "besucht", "besuchen"], lieben: ["liebe", "liebt", "lieben"],
  brauchen: ["brauche", "braucht", "brauchen"], finden: ["finde", "findet", "finden"],
  hören: ["höre", "hört", "hören"], machen: ["mache", "macht", "machen"],
  schreiben: ["schreibe", "schreibt", "schreiben"], bestellen: ["bestelle", "bestellt", "bestellen"],
  suchen: ["suche", "sucht", "suchen"], verstehen: ["verstehe", "versteht", "verstehen"],
  nehmen: ["nehme", "nimmt", "nehmen"], kochen: ["koche", "kocht", "kochen"],
  essen: ["esse", "isst", "essen"], lernen: ["lerne", "lernt", "lernen"],
  warten: ["warte", "wartet", "warten"],
};
const COMPOSE_OBJECTS = ["den Apfel", "einen Kaffee", "das Buch", "die Tür", "einen Brief", "die Musik", "einen Film", "die Zeitung", "das Auto", "den Zug", "die Hausaufgaben", "ein Brot", "den Schlüssel", "das Taxi", "die Frage", "einen Freund", "das Radio", "das Geschenk", "den Computer", "die Jacke", "den Tee", "das Essen"];
const COMPOSE_ADVERBS = ["heute", "gestern", "morgen", "jetzt", "oft", "gern", "schon", "bald", "hier", "dort", "manchmal", "jeden Tag", "am Abend", "am Morgen", "in der Stadt", "zu Hause", "im Park", "im Büro", "in der Schule", "am Wochenende"];

function composeSentences(minWords: number, maxWords: number, n: number, seed: string): string[] {
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    const [subject, person] = COMPOSE_SUBJECTS[i % COMPOSE_SUBJECTS.length];
    const verbKey = Object.keys(COMPOSE_VERBS)[(i * 3) % Object.keys(COMPOSE_VERBS).length];
    const forms = COMPOSE_VERBS[verbKey];
    const verb = person === "ich" ? forms[0] : person === "wir" ? forms[2] : forms[1];
    const obj = COMPOSE_OBJECTS[(i * 5) % COMPOSE_OBJECTS.length];
    const adv = COMPOSE_ADVERBS[(i * 7) % COMPOSE_ADVERBS.length];
    const parts = [subject, verb, adv, obj];
    const sentence = parts.join(" ") + ".";
    const wc = sentence.split(" ").length;
    if (wc >= minWords && wc <= maxWords) out.push(sentence);
    else {
      const minimal = [subject, verb, obj].join(" ") + ".";
      if (minimal.split(" ").length >= minWords && minimal.split(" ").length <= maxWords) out.push(minimal);
      else {
        const long = [subject, verb, adv, obj, "heute"].join(" ") + ".";
        if (long.split(" ").length <= maxWords) out.push(long);
        else out.push(minimal);
      }
    }
  }
  return take([...new Set(out)], n, `${seed}:final`);
}

// ---------------------------------------------------------------------------
// Builders (each returns levels x ~100 per level)
// ---------------------------------------------------------------------------

function buildFlashcards(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const pool = take(nounEntries, 200, `fc:${l}`);
    const items = pool.map((n) => ({ front: n.de, back: n.plural ? `${n.en} · ${n.plural}` : n.en }));
    return levelBlock(`flashcards-${l + 1}`, `Level ${l + 1}: ${["People and home", "Food and places", "Everyday objects", "Mixed nouns"][l]}`, flashcardRound(`fc-l${l + 1}`, items));
  });
  return [
    gameHeader("flashcards", "Flashcards", "🃏", "Drill vocabulary with digital flashcards. Say the word aloud before revealing the answer.", "vocabulary"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function buildMatchWords(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const pool = take(nounEntries, 200, `mw:${l}`);
    const pairs = pool.map((n) => [n.de, n.en] as [string, string]);
    const rounds: string[] = [];
    for (let r = 0; r < 20; r++) {
      rounds.push(matchingRound(`mw-l${l + 1}-${r + 1}`, take(pairs, 10, `mw:${l}:${r}`)));
    }
    return levelBlock(`match-words-${l + 1}`, `Level ${l + 1}: ${["Family and people", "Food", "Places", "Objects"][l]}`, rounds.join(""));
  });
  return [
    gameHeader("match-words", "Match Words", "🧲", "Match English words with German translations.", "vocabulary"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function buildPictureMatch(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const pool = take(nounEntries, 200, `pm:${l}`);
    const pairs = pool.map((n) => [n.en, n.de] as [string, string]);
    const rounds: string[] = [];
    for (let r = 0; r < 20; r++) {
      rounds.push(matchingRound(`pm-l${l + 1}-${r + 1}`, take(pairs, 10, `pm:${l}:${r}`)));
    }
    return levelBlock(`picture-match-${l + 1}`, `Level ${l + 1}: ${["Animals and food", "Places", "Around the house", "Mixed"][l]}`, rounds.join(""));
  });
  return [
    gameHeader("picture-match", "Picture Match", "🖼️", "Match the pictures (emoji) with their German words.", "vocabulary"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function buildMemoryCards(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const pool = take(nounEntries, 200, `mc:${l}`);
    const cards = pool.map((n) => ({ de: n.de, en: n.en }));
    const rounds: string[] = [];
    for (let r = 0; r < 20; r++) {
      rounds.push(memoryRound(`mc-l${l + 1}-${r + 1}`, take(cards, 10, `mc:${l}:${r}`)));
    }
    return levelBlock(`memory-cards-${l + 1}`, `Level ${l + 1}: ${["People", "Food", "Places", "Objects"][l]}`, rounds.join(""));
  });
  return [
    gameHeader("memory-cards", "Memory Cards", "🎴", "Flip the cards and find the matching German-English pairs.", "vocabulary"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function buildCategorySort(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const rounds: string[] = [];
    for (let r = 0; r < 20; r++) {
      const der = take(DER_POOL, 3, `cs:${l}:${r}:der`).map((n) => n.de);
      const die = take(DIE_POOL, 3, `cs:${l}:${r}:die`).map((n) => n.de);
      const das = take(DAS_POOL, 3, `cs:${l}:${r}:das`).map((n) => n.de);
      const extra = take(nounEntries, 1, `cs:${l}:${r}:x`).map((n) => n.de);
      rounds.push(
        sortRound(`cs-l${l + 1}-${r + 1}`, [
          { name: "der", items: der },
          { name: "die", items: die },
          { name: "das", items: das },
          { name: "extra", items: extra },
        ]),
      );
    }
    return levelBlock(`category-sort-${l + 1}`, `Level ${l + 1}: der, die oder das?`, rounds.join(""));
  });
  return [
    gameHeader("category-sort", "Category Sort", "🗂️", "Drag each noun into the right category: der, die or das.", "grammar"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function buildArticleChallenge(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const pool = take(nounEntries, 200, `ac:${l}`);
    const qs = pool.map((n, i) => {
      const article = articleOf(n.de);
      const base = n.de.replace(/^(der|die|das) /, "");
      const options = shuffle3("der", "die", "das", `ac:${l}:${i}`);
      return { prompt: `___ ${base}`, options, correctIndex: options.indexOf(article), explain: `${n.de} takes ${article}.` };
    });
    return levelBlock(`article-challenge-${l + 1}`, `Level ${l + 1}: ${["Everyday nouns", "Food", "Places", "Mixed"][l]}`, mcExercises(qs, `ac${l + 1}`));
  });
  return [
    gameHeader("article-challenge", "Article Challenge", "🏆", "Choose the correct article for each German noun.", "grammar"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function buildDeclensionBuilder(): string {
  const templates: [string, string, string][] = [
    ["Ich sehe ___ %s. (the)", "den", "masculine accusative"],
    ["Wir kaufen ___ %s. (a)", "einen", "masculine accusative"],
    ["Sie liest ___ %s. (the)", "die", "feminine accusative"],
    ["Ich trinke ___ %s. (the)", "den", "masculine accusative"],
    ["Er hat ___ %s. (a)", "einen", "masculine accusative"],
    ["Wir besuchen ___ %s. (the)", "die", "feminine accusative"],
    ["Ich mag ___ %s. (the)", "das", "neuter accusative"],
    ["Sie nimmt ___ %s. (a)", "ein", "neuter accusative"],
    ["Ich gebe ___ %s ein Geschenk. (the)", "dem", "masculine dative"],
    ["Wir danken ___ %s. (the)", "der", "feminine dative"],
    ["Das schmeckt ___ %s. (the)", "dem", "neuter dative"],
    ["Ich helfe ___ %s. (a)", "einem", "masculine dative"],
  ];
  const levels = [0, 1, 2, 3].map((l) => {
    const pool = take(nounEntries, 200, `db:${l}`);
    const rounds: string[] = [];
    pool.forEach((n, i) => {
      const article = articleOf(n.de);
      const base = n.de.replace(/^(der|die|das) /, "");
      const [template, answer, hint] = templates[i % templates.length];
      const correctAnswer = answer === "den" ? "den" : answer === "dem" ? "dem" : answer === "der" ? "der" : answer === "die" ? "die" : answer === "das" ? "das" : answer === "einen" ? "einen" : answer === "einem" ? "einem" : answer === "ein" ? "ein" : answer;
      rounds.push(fillBlankRound(`db-l${l + 1}-${String(i + 1).padStart(3, "0")}`, template.replace("%s", base), correctAnswer, hint));
    });
    return levelBlock(`declension-builder-${l + 1}`, `Level ${l + 1}: ${["Accusative", "Dative", "Mixed", "Mixed"][l]}`, rounds.join(""));
  });
  return [
    gameHeader("declension-builder", "Declension Builder", "🏗️", "Build the correct article forms across the cases.", "grammar"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function buildSentenceFixer(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const pool = [...exampleSentences.filter((s) => s.de.split(" ").length <= 7).map((s) => s.de), ...composeSentences(4, 7, 200, `sf:${l}`)];
    const sentences = take(pool, 200, `sf:${l}`);
    const rounds: string[] = [];
    sentences.forEach((s, i) => rounds.push(wordOrderRound(`sf-l${l + 1}-${String(i + 1).padStart(3, "0")}`, s)));
    return levelBlock(`sentence-fixer-${l + 1}`, `Level ${l + 1}: ${["Short sentences", "Verbs", "Longer sentences", "Questions"][l]}`, rounds.join(""));
  });
  return [
    gameHeader("sentence-fixer", "Sentence Fixer", "🔧", "The words are mixed up. Put them back in the right order.", "grammar"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function buildRepeatAfterMe(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const sentences = take(exampleSentences, 200, `ra:${l}`);
    const phrases = sentences.map((s) => s.de);
    const rounds: string[] = [];
    for (let r = 0; r < 20; r++) {
      rounds.push(repeatRound(`ra-l${l + 1}-${r + 1}`, take(phrases, 10, `ra:${l}:${r}`)));
    }
    return levelBlock(`repeat-after-me-${l + 1}`, `Level ${l + 1}: ${["Greetings", "Questions", "Everyday life", "Past tense"][l]}`, rounds.join(""));
  });
  return [
    gameHeader("repeat-after-me", "Repeat After Me", "🗣️", "Listen to the German phrase and say it aloud.", "speaking"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function listeningDistractors(prompt: string): string[] {
  const base = prompt.replace(/^(der|die|das) /, "").toLowerCase();
  const pool = allWords.filter((w) => w !== base && w.length === base.length && w.slice(0, 2) === base.slice(0, 2) || w.length === base.length && w.slice(-2) === base.slice(-2));
  const picked = take(pool.length ? pool : allWords.filter((w) => w !== base), 2, `ld:${base}`);
  return [prompt, ...picked.map((w) => (w.startsWith("der ") || w.startsWith("die ") || w.startsWith("das ") ? w : w))];
}

function buildPronunciationChoice(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const pool = take(nounEntries, 200, `pc:${l}`);
    const rounds: string[] = [];
    pool.forEach((n, i) => {
      const base = n.de.replace(/^(der|die|das) /, "");
      const candidates = allWords.filter((w) => w.length === base.length && w !== base);
      const options = unique3(n.de, candidates[(i * 7) % candidates.length] ?? "Tisch", candidates[(i * 13 + 3) % candidates.length] ?? "Stuhl", allWords.filter((w) => w !== base).slice(0, 50), `pc:${l}:${i}`);
      rounds.push(listeningRound(`pc-l${l + 1}-${String(i + 1).padStart(3, "0")}`, n.de, options, options.indexOf(n.de)));
    });
    return levelBlock(`pronunciation-choice-${l + 1}`, `Level ${l + 1}: ${["Nouns", "More nouns", "Verbs", "Tricky words"][l]}`, rounds.join(""));
  });
  return [
    gameHeader("pronunciation-choice", "Pronunciation Choice", "👂", "Listen and pick the word you heard.", "listening"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function buildListeningGames(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const pool = l === 3 ? take(allWords, 200, `lg:3`) : take(nounEntries, 200, `lg:${l}`);
    const rounds: string[] = [];
    pool.forEach((n, i) => {
      const de = typeof n === "string" ? n : n.de;
      const cands = take(allWords.filter((w) => w !== de), 5, `lg:${l}:${i}`);
      const options = unique3(de, cands[0] ?? "Tisch", cands[1] ?? "Stuhl", cands, `lg:${l}:${i}`);
      rounds.push(listeningRound(`lg-l${l + 1}-${String(i + 1).padStart(3, "0")}`, de, options, options.indexOf(de)));
    });
    return levelBlock(`listening-games-${l + 1}`, `Level ${l + 1}: ${["Nouns", "Verbs", "Everyday words", "Mixed"][l]}`, rounds.join(""));
  });
  return [
    gameHeader("listening-games", "Listening Games", "🎧", "Listen carefully and choose the word you heard.", "listening"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function buildListenAndArrange(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const pool = [...exampleSentences.filter((s) => s.de.split(" ").length <= 6).map((s) => s.de), ...composeSentences(3, 6, 200, `la:${l}`)];
    const sentences = take(pool, 200, `la:${l}`);
    const rounds: string[] = [];
    sentences.forEach((s, i) => rounds.push(wordOrderRound(`la-l${l + 1}-${String(i + 1).padStart(3, "0")}`, s)));
    return levelBlock(`listen-and-arrange-${l + 1}`, `Level ${l + 1}: ${["Basics", "Verbs", "Questions", "Mixed"][l]}`, rounds.join(""));
  });
  return [
    gameHeader("listen-and-arrange", "Listen and Arrange", "🧩", "Listen to the sentence and rebuild it from the word tiles.", "listening"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function blankSentence(sentence: string): { sentence: string; answer: string; hint: string } {
  const words = sentence.split(" ").filter(Boolean);
  if (words.length < 3) return { sentence, answer: words[1] ?? "", hint: "the missing word" };
  const idx = 1 + (Math.abs(sentence.length) % (words.length - 2));
  const answer = words[idx].replace(/[.!?,]/g, "");
  words[idx] = "___";
  return { sentence: words.join(" "), answer, hint: `${answer}` };
}

function buildMissingWord(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const sentences = take(exampleSentences, 200, `mw:${l}`);
    const rounds: string[] = [];
    sentences.forEach((s, i) => {
      const { sentence, answer, hint } = blankSentence(s.de);
      rounds.push(fillBlankRound(`mw-l${l + 1}-${String(i + 1).padStart(3, "0")}`, sentence, answer, hint));
    });
    return levelBlock(`missing-word-${l + 1}`, `Level ${l + 1}: ${["Verbs", "Nouns", "Mixed", "Longer sentences"][l]}`, rounds.join(""));
  });
  return [
    gameHeader("missing-word", "Missing Word", "🕳️", "Type the word that is missing from the sentence.", "grammar"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function buildSentenceScrabble(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const pool = [...exampleSentences.filter((s) => s.de.split(" ").length >= 4 && s.de.split(" ").length <= 8).map((s) => s.de), ...composeSentences(5, 8, 200, `ss:${l}`)];
    const sentences = take(pool, 200, `ss:${l}`);
    const rounds: string[] = [];
    sentences.forEach((s, i) => rounds.push(wordOrderRound(`ss-l${l + 1}-${String(i + 1).padStart(3, "0")}`, s)));
    return levelBlock(`sentence-scrabble-${l + 1}`, `Level ${l + 1}: ${["Easy", "Medium", "Hard", "Expert"][l]}`, rounds.join(""));
  });
  return [
    gameHeader("sentence-scrabble", "Sentence Scrabble", "🔠", "Scramble the words into a correct German sentence.", "grammar"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function buildTimeWordRush(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const questions: { prompt: string; options: string[]; correctIndex: number }[] = [];
    const pool = take(nounEntries, 200, `tw:${l}`);
    pool.forEach((n, i) => {
      if (i % 2 === 0) {
        const article = articleOf(n.de);
        const base = n.de.replace(/^(der|die|das) /, "");
        const options = shuffle3("der", "die", "das", `tw:${l}:a${i}`);
        questions.push({ prompt: `___ ${base}`, options, correctIndex: options.indexOf(article) });
      } else {
        const others = take(nounEntries.filter((x) => x.de !== n.de), 2, `tw:${l}:b${i}`).map((x) => x.en);
        const options = unique3(n.en, others[0], others[1], others, `tw:${l}:b${i}`);
        questions.push({ prompt: n.de, options, correctIndex: options.indexOf(n.en) });
      }
    });
    const rounds: string[] = [];
    for (let r = 0; r < 20; r++) {
      rounds.push(rushRound(`tw-l${l + 1}-${r + 1}`, take(questions, 10, `tw:${l}:${r}`)));
    }
    return levelBlock(`time-word-rush-${l + 1}`, `Level ${l + 1}: ${["Articles", "Meanings", "Articles", "Meanings"][l]}`, rounds.join(""));
  });
  return [
    gameHeader("time-word-rush", "Time Word Rush", "⏱️", "Answer as many questions as you can before time runs out.", "mixed"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

const SEMANTIC_GROUPS: Record<string, string[]> = {
  food: ["das Brot", "die Milch", "der Käse", "das Ei", "der Apfel", "die Banane", "der Kaffee", "der Tee", "das Wasser", "der Kuchen", "die Pizza", "die Tomate", "die Kartoffel", "der Reis", "das Fleisch", "die Wurst", "der Zucker", "das Salz", "die Suppe", "der Salat"],
  transport: ["der Zug", "der Bus", "das Auto", "das Taxi", "das Flugzeug", "das Fahrrad", "das Schiff", "die Straßenbahn", "die U-Bahn", "der Lastwagen"],
  animals: ["der Hund", "die Katze", "das Pferd", "die Kuh", "das Schwein", "das Schaf", "das Huhn", "der Vogel", "der Fisch", "die Maus", "der Löwe", "der Bär", "der Elefant", "die Ente", "die Biene"],
  places: ["die Schule", "das Kino", "das Museum", "die Kirche", "der Bahnhof", "der Supermarkt", "die Apotheke", "das Krankenhaus", "die Bank", "die Post", "das Rathaus", "der Park", "das Restaurant", "das Hotel", "die Bibliothek"],
  furniture: ["der Tisch", "der Stuhl", "das Bett", "der Schrank", "die Lampe", "das Sofa", "der Sessel", "der Spiegel", "der Teppich", "die Kommode"],
  clothes: ["das Hemd", "die Hose", "das Kleid", "die Jacke", "der Mantel", "der Schuh", "die Socke", "die Mütze", "der Pullover", "die Brille"],
  weather: ["die Sonne", "der Regen", "der Schnee", "der Wind", "das Wetter", "der Himmel", "die Wolke", "der Mond", "der Stern"],
  body: ["der Kopf", "die Hand", "der Arm", "das Bein", "der Fuß", "das Auge", "das Ohr", "die Nase", "der Mund", "der Rücken"],
};

function buildOddOneOut(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const groupKeys = ["food", "transport", "animals", "places", "furniture", "clothes", "weather", "body"];
    const qs: { prompt: string; options: string[]; correctIndex: number; explain: string }[] = [];
    for (let i = 0; i < 200; i++) {
      const key = groupKeys[(i + l) % groupKeys.length];
      const oddKey = groupKeys[(i + l + 3) % groupKeys.length];
      const group = take(SEMANTIC_GROUPS[key], 3, `oo:${l}:${i}:g`);
      const odd = take(SEMANTIC_GROUPS[oddKey], 1, `oo:${l}:${i}:o`)[0];
      const prompt = [...group, odd].join(", ");
      const options = shuffle3(odd, group[0], group[1], `oo:${l}:${i}`);
      qs.push({ prompt, options, correctIndex: options.indexOf(odd), explain: `${odd} does not belong with the ${key} words.` });
    }
    return levelBlock(`odd-one-out-${l + 1}`, `Level ${l + 1}: ${["Food and transport", "Animals and places", "Furniture and clothes", "Weather and body"][l]}`, mcExercises(qs, `oo${l + 1}`));
  });
  return [
    gameHeader("odd-one-out", "Odd One Out", "🔍", "Four words, one does not fit. Find the odd one out.", "vocabulary"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

function buildStoryTime(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const sentences = take(exampleSentences, 200, `st:${l}`);
    const qs: { prompt: string; options: string[]; correctIndex: number; explain: string }[] = [];
    sentences.forEach((s, i) => {
      const words = s.de.split(" ");
      const subj = words[0] ?? "Der Mann";
      const others = take(exampleSentences.filter((x) => x.de !== s.de), 5, `st:${l}:o${i}`).map((x) => x.de);
      const options = unique3(s.de, others[0] ?? "Der Mann kocht.", others[1] ?? "Die Frau schläft.", others, `st:${l}:c${i}`);
      qs.push({
        prompt: `Story: ${subj} ${words.slice(1).join(" ")} Was passiert?`,
        options,
        correctIndex: options.indexOf(s.de),
        explain: s.en,
      });
    });
    return levelBlock(`story-time-${l + 1}`, `Level ${l + 1}: ${["Basics", "Everyday", "Verbs", "Mixed"][l]}`, mcExercises(qs, `st${l + 1}`));
  });
  return [
    gameHeader("story-time", "Story Time", "📖", "Read a mini-story and answer what happened.", "mixed"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

const RESPONSE_PAIRS: [string, string][] = [
  ["Guten Morgen!", "Guten Morgen!"],
  ["Guten Tag!", "Guten Tag!"],
  ["Guten Abend!", "Guten Abend!"],
  ["Wie geht es dir?", "Mir geht es gut, danke."],
  ["Wie geht es Ihnen?", "Sehr gut, danke."],
  ["Wie heißt du?", "Ich heiße Anna."],
  ["Woher kommst du?", "Ich komme aus Nigeria."],
  ["Wo wohnst du?", "Ich wohne in Berlin."],
  ["Wie alt bist du?", "Ich bin zwanzig Jahre alt."],
  ["Auf Wiedersehen!", "Auf Wiedersehen!"],
  ["Tschüss!", "Tschüss!"],
  ["Bis bald!", "Bis bald!"],
  ["Vielen Dank!", "Bitte sehr!"],
  ["Danke schön!", "Bitte!"],
  ["Entschuldigung!", "Kein Problem."],
  ["Sprechen Sie Deutsch?", "Ja, ein bisschen."],
  ["Was möchtest du trinken?", "Einen Tee, bitte."],
  ["Was möchtest du essen?", "Ein Brot, bitte."],
  ["Wie spät ist es?", "Es ist drei Uhr."],
  ["Was machst du heute?", "Ich lerne Deutsch."],
  ["Wann kommst du?", "Um acht Uhr."],
  ["Wo ist der Bahnhof?", "Da vorne."],
  ["Kann ich helfen?", "Ja, bitte."],
  ["Hast du Geschwister?", "Ja, einen Bruder."],
  ["Was ist das?", "Das ist ein Buch."],
  ["Ist das dein Auto?", "Ja, das ist mein Auto."],
  ["Magst du Kaffee?", "Ja, sehr gern."],
  ["Was kostet das?", "Zehn Euro."],
  ["Wo arbeitest du?", "Ich arbeite im Büro."],
  ["Wie ist das Wetter?", "Es regnet."],
];

function buildChooseResponse(): string {
  const levels = [0, 1, 2, 3].map((l) => {
    const qs: { prompt: string; options: string[]; correctIndex: number; explain: string }[] = [];
    for (let i = 0; i < 200; i++) {
      const [prompt, correct] = RESPONSE_PAIRS[i % RESPONSE_PAIRS.length];
      const others = RESPONSE_PAIRS.map((p) => p[1]).filter((r) => r !== correct);
      const options = unique3(correct, others[(i * 7) % others.length], others[(i * 13 + 5) % others.length], others, `cr:${l}:${i}`);
      qs.push({ prompt, options, correctIndex: options.indexOf(correct), explain: `The natural response is: ${correct}` });
    }
    return levelBlock(`choose-the-response-${l + 1}`, `Level ${l + 1}: ${["Greetings", "Questions", "Everyday", "Mixed"][l]}`, mcExercises(qs, `cr${l + 1}`));
  });
  return [
    gameHeader("choose-the-response", "Choose the Response", "💬", "Read the question and choose the natural German response.", "speaking"),
    levels.join("\n"),
    closeGame(),
  ].join("");
}

// ---------------------------------------------------------------------------
// Pools needed by builders
// ---------------------------------------------------------------------------

const DER_POOL = nounEntries.filter((n) => articleOf(n.de) === "der");
const DIE_POOL = nounEntries.filter((n) => articleOf(n.de) === "die");
const DAS_POOL = nounEntries.filter((n) => articleOf(n.de) === "das");

// ---------------------------------------------------------------------------
// Write file
// ---------------------------------------------------------------------------

const src = [
  buildFlashcards(),
  "\n",
  buildMatchWords(),
  "\n",
  buildPictureMatch(),
  "\n",
  buildMemoryCards(),
  "\n",
  buildCategorySort(),
  "\n",
  buildArticleChallenge(),
  "\n",
  buildDeclensionBuilder(),
  "\n",
  buildSentenceFixer(),
  "\n",
  buildRepeatAfterMe(),
  "\n",
  buildPronunciationChoice(),
  "\n",
  buildListeningGames(),
  "\n",
  buildListenAndArrange(),
  "\n",
  buildMissingWord(),
  "\n",
  buildSentenceScrabble(),
  "\n",
  buildTimeWordRush(),
  "\n",
  buildOddOneOut(),
  "\n",
  buildStoryTime(),
  "\n",
  buildChooseResponse(),
].join("");

writeFileSync("content/games/legacy-games.ts", src);
console.log("legacy-games.ts written");

// Append the array export
const exports = [...src.matchAll(/export const (\w+Game): Game = \{/g)].map((m) => m[1]);
const fs = await import("node:fs");
fs.appendFileSync(
  "content/games/legacy-games.ts",
  "\n\n" +
    exports.join("\n") +
    "\n\nexport const legacyGames: Game[] = [\n" +
    exports.map((e) => `  ${e},`).join("\n") +
    "\n];\n",
);
console.log("legacyGames array appended:", exports.length, "games");