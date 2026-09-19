/**
 * Expands the reference-catalog games to ~100 questions per level.
 * Composes from existing pools: Goethe/topic word lists, lesson example
 * sentences, the German number-word generator, and curated verb tables.
 *
 * Run: npx tsx scripts/expand-games.mts
 */

import { writeFileSync } from "node:fs";
import { wordLists } from "../content/wordlists";
import { levels } from "../content";
import { germanNumberWord } from "../lib/german/numbers";

// ---------------------------------------------------------------------------
// Pools
// ---------------------------------------------------------------------------

function pool(id: string) {
  return wordLists.find((l) => l.id === id)!.words;
}

const goetheNouns = pool("goethe-a1-nouns");
const goetheVerbs = pool("goethe-a1-verbs");
const goetheAdj = pool("goethe-a1-adjectives");
const topicNouns = wordLists
  .filter((l) => l.category === "topic")
  .flatMap((l) => l.words)
  .filter((w) => /^(der|die|das) /.test(w.de));

interface NounEntry {
  de: string; // "der Mann"
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

const byArticle = (a: string) => nounEntries.filter((n) => n.de.startsWith(a));
const DER = byArticle("der");
const DIE = byArticle("die");
const DAS = byArticle("das");

const verbEntries = goetheVerbs.map((v) => ({ de: v.de, en: v.en }));

// Lesson example sentences (de/en) for translation games.
const exampleSentences = (() => {
  const out: { de: string; en: string }[] = [];
  for (const level of levels) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        if (lesson.status !== "ready") continue;
        for (const section of lesson.sections) {
          for (const block of section.blocks) {
            if (block.type === "example") {
              out.push({ de: block.de, en: block.en });
            }
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

// Deterministic shuffle (FNV-ish) so builds are stable.
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

/** Three distinct options, replacing duplicates with fallbacks. */
function unique3(correct: string, d1: string, d2: string, fallbacks: string[], seed: string): [string, string, string] {
  const set = new Set<string>([correct, d1, d2]);
  let fb = 0;
  while (set.size < 3) {
    const candidate = fallbacks[fb++ % fallbacks.length];
    if (!set.has(candidate)) set.add(candidate);
  }
  return shuffle3(...([...set] as [string, string, string]), seed);
}

// ---------------------------------------------------------------------------
// Emitter helpers
// ---------------------------------------------------------------------------

function mcExercise(
  id: string,
  prompt: string,
  options: string[],
  correctIndex: number,
  explain: string,
) {
  return `        {
          kind: "exercise",
          exercise: {
            id: ${JSON.stringify(id)},
            type: "multiple-choice",
            title: ${JSON.stringify("Practice")},
            instruction: ${JSON.stringify("Choose the correct answer.")},
            prompt: ${JSON.stringify(prompt)},
            options: ${JSON.stringify(options)},
            correctIndex: ${correctIndex},
            explainCorrect: ${JSON.stringify(explain)},
            explainWrong: ${JSON.stringify(explain)},
          },
        },
`;
}

function typingExercise(id: string, items: { prompt: string; accept: string[]; hint?: string; audio?: boolean }[]) {
  return `        {
          kind: "typing",
          title: ${JSON.stringify("Practice")},
          instruction: ${JSON.stringify("Type the answer.")},
          items: [
${items
  .map(
    (it) =>
      `            { prompt: ${JSON.stringify(it.prompt)}, accept: [${it.accept
        .map((a) => JSON.stringify(a))
        .join(", ")}],${it.hint ? ` hint: ${JSON.stringify(it.hint)},` : ""}${it.audio ? " audio: true," : ""} },`,
  )
  .join("\n")}
          ],
        },
`;
}

function esc(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

// ---------------------------------------------------------------------------
// Article helpers
// ---------------------------------------------------------------------------

function articleOf(de: string) {
  const m = de.match(/^(der|die|das) /);
  return m ? m[1] : "";
}

function pluralDistractors(plural: string): string[] {
  const cands = [`${plural}n`, `${plural}s`, plural.replace(/e$/, ""), `${plural}e`, plural.replace(/(ä|ö|ü|.)$/i, "$1en")];
  const out: string[] = [];
  for (const c of cands) {
    if (c !== plural && c.length > 1 && !out.includes(c)) out.push(c);
  }
  return out.slice(0, 2);
}

// ---------------------------------------------------------------------------
// Game: Artikel Drop (3 levels x 100)
// ---------------------------------------------------------------------------

function artikelDropItems(level: number, seed: string): { text: string; gateId: string }[] {
  let poolNouns = level === 1 ? [...DER, ...DIE, ...DAS] : level === 2 ? [...DER, ...DIE, ...DAS] : [...DER, ...DIE, ...DAS];
  if (level === 2) poolNouns = take(poolNouns, 100, `${seed}:2`);
  if (level === 3) poolNouns = take(poolNouns, 100, `${seed}:3`);
  return take(poolNouns, 100, `${seed}:${level}`).map((n) => ({
    text: n.de.replace(/^(der|die|das) /, ""),
    gateId: articleOf(n.de),
  }));
}

// ---------------------------------------------------------------------------
// Game: Der Die Das Rules (2 levels x 100)
// ---------------------------------------------------------------------------

function articleRuleExplain(noun: string): string {
  const base = noun.replace(/^(der|die|das) /, "");
  const article = articleOf(noun);
  if (base.endsWith("ung")) return "Nouns ending in -ung are always feminine: die Wohnung, die Zeitung.";
  if (base.endsWith("chen") || base.endsWith("lein")) return "Nouns ending in -chen or -lein are always neuter.";
  if (base.endsWith("heit") || base.endsWith("keit") || base.endsWith("schaft")) return "Abstract nouns in -heit, -keit, -schaft are always feminine.";
  if (base.endsWith("ion") || base.endsWith("tät") || base.endsWith("ik")) return "Foreign nouns in -ion, -tät, -ik are always feminine.";
  if (base.endsWith("ling")) return "Nouns ending in -ling are masculine: der Schmetterling, der Lehrling.";
  if (base.endsWith("er") && article === "der") return "Most nouns ending in -er are masculine: der Lehrer, der Computer. (Exceptions: die Mutter, die Schwester.)";
  if (base.endsWith("e") && article === "die") return "Many nouns ending in -e are feminine: die Lampe, die Tasche.";
  if (article === "das" && base.endsWith("chen")) return "-chen is neuter: das Mädchen, das Brötchen.";
  return `Most German nouns just have to be learned with their article: ${noun}.`;
}

function articleRules(seed: string) {
  const specials = [
    "die Wohnung", "die Zeitung", "die Übung", "die Meinung", "die Ordnung",
    "das Mädchen", "das Brötchen", "das Häuschen", "das Kätzchen", "das Fräulein",
    "die Freiheit", "die Krankheit", "die Möglichkeit", "die Freundschaft", "die Mannschaft",
    "die Nation", "die Information", "die Universität", "die Musik", "die Politik",
    "der Lehrling", "der Schmetterling", "der Zwilling",
  ];
  const normalized: { de: string; en: string; plural?: string }[] = [
    ...specials.map((s) => ({ de: s, en: "" })),
    ...take(nounEntries, 80, `${seed}:suffix`),
  ];
  const groups = [
    ...DER.filter((n) => /Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag|Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember|Sommer|Winter|Frühling|Herbst/.test(n.de)),
    ...DAS.filter((n) => /Holz|Glas|Metall|Papier|Wasser|Bier|Eisen|Gold/.test(n.de)),
    ...DIE.filter((n) => /Nacht|Blume|Tasche|Lampe|Pizza|Banane/.test(n.de)),
  ];
  const picks = take(normalized, 60, `${seed}:a`).concat(take(groups.length > 30 ? groups : nounEntries, 40, `${seed}:b`));
  return take(picks, 100, `${seed}:final`);
}

// ---------------------------------------------------------------------------
// Game: Time Expressions (2 levels x 100)
// ---------------------------------------------------------------------------

const DAYS = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const SEASONS = ["Frühling", "Sommer", "Herbst", "Winter"];
const PARTS = ["Morgen", "Mittag", "Abend", "Vormittag", "Nachmittag"];
const TIMES = (() => {
  const out: string[] = [];
  for (let h = 1; h <= 12; h++) {
    const hw = germanNumberWord(h);
    out.push(`${hw} Uhr`, `halb ${h === 12 ? "eins" : germanNumberWord(h + 1)}`, `viertel nach ${hw}`, `viertel vor ${h === 12 ? "eins" : germanNumberWord(h + 1)}`, `${hw} Uhr 10`, `${hw} Uhr 20`, `${hw} Uhr 40`, `${hw} Uhr 50`);
  }
  return [...new Set(out)];
})();

interface TimeQ {
  prompt: string;
  options: [string, string, string];
  correct: string;
  explain: string;
}

function timeQuestions(seed: string): TimeQ[] {
  const qs: TimeQ[] = [];
  for (const d of DAYS) {
    qs.push({ prompt: `___ ${d}`, options: shuffle3("am", "im", "um", `${seed}:d:${d}`), correct: "am", explain: "Days take am: am Montag, am Samstag." });
  }
  for (const m of MONTHS) {
    qs.push({ prompt: `___ ${m}`, options: shuffle3("im", "am", "um", `${seed}:m:${m}`), correct: "im", explain: "Months take im: im Januar, im Dezember." });
  }
  for (const s of SEASONS) {
    qs.push({ prompt: `___ ${s}`, options: shuffle3("im", "am", "um", `${seed}:s:${s}`), correct: "im", explain: "Seasons take im: im Sommer, im Winter." });
  }
  for (const p of PARTS) {
    qs.push({ prompt: `___ ${p}`, options: shuffle3("am", "im", "um", `${seed}:p:${p}`), correct: "am", explain: `Parts of the day take am: am ${p}.` });
  }
  for (const t of TIMES) {
    qs.push({ prompt: `___ ${t}`, options: shuffle3("um", "am", "im", `${seed}:t:${t}`), correct: "um", explain: "Clock times take um: um 8 Uhr, um halb drei." });
  }
  qs.push({ prompt: "___ Nacht", options: shuffle3("in der", "am", "im", `${seed}:nacht`), correct: "in der", explain: "Nacht is the exception: in der Nacht." });
  qs.push({ prompt: "___ Wochenende", options: shuffle3("am", "im", "um", `${seed}:we`), correct: "am", explain: "am Wochenende is fixed: at the weekend." });
  qs.push({ prompt: "___ Jahr 2026", options: shuffle3("im", "am", "um", `${seed}:j`), correct: "im", explain: "Years take im: im Jahr 2026." });
  qs.push({ prompt: "heute ___", options: shuffle3("— (nothing)", "am", "um", `${seed}:heute`), correct: "— (nothing)", explain: "heute, morgen and gestern take no preposition." });
  qs.push({ prompt: "morgen ___", options: shuffle3("— (nothing)", "am", "im", `${seed}:morgen`), correct: "— (nothing)", explain: "heute, morgen and gestern take no preposition." });
  qs.push({ prompt: "gestern ___", options: shuffle3("— (nothing)", "am", "im", `${seed}:gestern`), correct: "— (nothing)", explain: "heute, morgen and gestern take no preposition." });
  return take(qs, 100, `${seed}:final`);
}

// ---------------------------------------------------------------------------
// Game: Dativ Prepositions (2 levels x 100)
// ---------------------------------------------------------------------------

interface DativQ {
  prompt: string;
  options: [string, string, string];
  correct: string;
  explain: string;
}

function dativQuestions(seed: string): DativQ[] {
  const cities = ["Berlin", "München", "Hamburg", "Köln", "Frankfurt", "Wien", "Zürich", "Paris", "London", "Rom"];
  const countries = ["Deutschland", "Nigeria", "Frankreich", "Italien", "Spanien", "Österreich", "der Schweiz", "den USA", "Japan", "Brasilien"];
  const buildings = [
    ["der Supermarkt", "dem Supermarkt", "den Supermarkt", "zu dem (zum) Supermarkt", "aus dem Supermarkt"],
    ["die Schule", "der Schule", "die Schule", "zu der (zur) Schule", "aus der Schule"],
    ["das Kino", "dem Kino", "das Kino", "zu dem (zum) Kino", "aus dem Kino"],
    ["der Bahnhof", "dem Bahnhof", "den Bahnhof", "zu dem (zum) Bahnhof", "aus dem Bahnhof"],
    ["die Apotheke", "der Apotheke", "die Apotheke", "zu der (zur) Apotheke", "aus der Apotheke"],
    ["das Krankenhaus", "dem Krankenhaus", "das Krankenhaus", "zu dem (zum) Krankenhaus", "aus dem Krankenhaus"],
    ["die Bank", "der Bank", "die Bank", "zu der (zur) Bank", "aus der Bank"],
    ["das Restaurant", "dem Restaurant", "das Restaurant", "zu dem (zum) Restaurant", "aus dem Restaurant"],
    ["die Post", "der Post", "die Post", "zu der (zur) Post", "aus der Post"],
    ["das Museum", "dem Museum", "das Museum", "zu dem (zum) Museum", "aus dem Museum"],
    ["das Café", "dem Café", "das Café", "zu dem (zum) Café", "aus dem Café"],
    ["die Bibliothek", "der Bibliothek", "die Bibliothek", "zu der (zur) Bibliothek", "aus der Bibliothek"],
    ["der Markt", "dem Markt", "den Markt", "zu dem (zum) Markt", "aus dem Markt"],
  ] as const;
  const qs: DativQ[] = [];
  for (const c of cities) {
    qs.push({ prompt: `Ich wohne ___ ${c}.`, options: shuffle3("in", "nach", "aus", `${seed}:wo${c}`), correct: "in", explain: "in + Dativ answers Wo?: Ich wohne in Berlin." });
    qs.push({ prompt: `Ich fliege ___ ${c}.`, options: shuffle3("nach", "in", "zu", `${seed}:fl${c}`), correct: "nach", explain: "nach answers Wohin? with cities: nach Berlin." });
    qs.push({ prompt: `Ich komme aus ___ ${c}.`, options: shuffle3("aus", "von", "zu", `${seed}:ko${c}`), correct: "aus", explain: "aus answers Woher?: Ich komme aus Berlin." });
  }
  for (const co of countries) {
    const simple = co.replace("der ", "").replace("den ", "");
    qs.push({ prompt: `Ich komme aus ___ ${simple}.`, options: shuffle3("aus", "nach", "zu", `${seed}:co${co}`), correct: "aus", explain: "aus answers Woher?: Ich komme aus Deutschland." });
    qs.push({ prompt: `Ich fahre nach ___ ${simple}.`, options: shuffle3("nach", "in", "aus", `${seed}:co2${co}`), correct: "nach", explain: "nach answers Wohin? with countries: nach Deutschland." });
  }
  for (const [nom, dat, akk, zu, aus] of buildings) {
    const noun = nom.replace(/^(der|die|das) /, "");
    qs.push({ prompt: `Ich gehe in ___ ${noun}. (direction)`, options: unique3(akk, dat, nom, ["dem", "die", "das"], `${seed}:in${noun}`), correct: akk, explain: `Wohin? takes the accusative: in ${akk} ${noun}.` });
    qs.push({ prompt: `Ich bin in ___ ${noun}. (position)`, options: unique3(dat, akk, nom, ["dem", "die", "das"], `${seed}:bin${noun}`), correct: dat, explain: `Wo? takes the dative: in ${dat} ${noun}.` });
    qs.push({ prompt: `Ich gehe ${zu.replace(/ \(.*\)$/, "")} ${noun}.`, options: unique3(zu.replace(/ \(.*\)$/, ""), dat, akk, [nom], `${seed}:zu${noun}`), correct: zu.replace(/ \(.*\)$/, ""), explain: `zu + Dativ answers Wohin? with buildings: ${zu}.` });
    qs.push({ prompt: `Ich komme ${aus} ${noun}.`, options: unique3(aus, dat, akk, [nom], `${seed}:aus${noun}`), correct: aus, explain: `aus + Dativ answers Woher?: ${aus} ${noun}.` });
  }
  return take(qs, 100, `${seed}:final`);
}

// ---------------------------------------------------------------------------
// Game: Guess the Word from Image (2 levels x ~40)
// ---------------------------------------------------------------------------

const EMOJI_NOUNS: [string, string][] = [
  ["🐶", "der Hund"], ["🐱", "die Katze"], ["🐴", "das Pferd"], ["🐟", "der Fisch"],
  ["🐭", "die Maus"], ["🐔", "das Huhn"], ["🐷", "das Schwein"], ["🐑", "das Schaf"],
  ["🐄", "die Kuh"], ["🐦", "der Vogel"], ["🦁", "der Löwe"], ["🐻", "der Bär"],
  ["🐘", "der Elefant"], ["🦆", "die Ente"], ["🐝", "die Biene"], ["🐞", "der Käfer"],
  ["🍎", "der Apfel"], ["🍌", "die Banane"], ["🍞", "das Brot"], ["🧀", "der Käse"],
  ["☕", "der Kaffee"], ["🍕", "die Pizza"], ["🍺", "das Bier"], ["🍰", "der Kuchen"],
  ["🥛", "die Milch"], ["🥚", "das Ei"], ["🍇", "die Traube"], ["🍊", "die Orange"],
  ["🥔", "die Kartoffel"], ["🍅", "die Tomate"], ["🍦", "das Eis"], ["🍫", "die Schokolade"],
  ["🚆", "der Zug"], ["🚌", "der Bus"], ["🚗", "das Auto"], ["✈️", "das Flugzeug"],
  ["🚲", "das Fahrrad"], ["🚕", "das Taxi"], ["🚢", "das Schiff"], ["🏠", "das Haus"],
  ["🏢", "das Büro"], ["🏥", "das Krankenhaus"], ["🏫", "die Schule"], ["🏦", "die Bank"],
  ["⛪", "die Kirche"], ["🏰", "das Schloss"], ["🌳", "der Baum"], ["🌷", "die Blume"],
  ["☀️", "die Sonne"], ["🌧️", "der Regen"], ["❄️", "der Schnee"], ["🌊", "das Meer"],
  ["⛰️", "der Berg"], ["🌙", "der Mond"], ["⭐", "der Stern"], ["🕰️", "die Uhr"],
  ["📖", "das Buch"], ["📰", "die Zeitung"], ["✉️", "der Brief"], ["📱", "das Handy"],
  ["💻", "der Computer"], ["📺", "das Fernsehen"], ["📻", "das Radio"], ["🎥", "der Film"],
  ["🎵", "die Musik"], ["⚽", "der Fußball"], ["🏊", "das Schwimmen"], ["🎸", "die Gitarre"],
];

function imageQuestions(seed: string) {
  return EMOJI_NOUNS.map(([emoji, de]) => {
    const article = articleOf(de);
    const base = de.replace(/^(der|die|das) /, "");
    const others = take(nounEntries.filter((n) => n.de !== de), 2, `${seed}:${de}`).map((n) => n.de);
    const three: [string, string, string] = [de, others[0] ?? "der Mann", others[1] ?? "die Frau"];
    const options = shuffle3(three[0], three[1], three[2], `${seed}:opt${de}`);
    return { prompt: emoji, options, correctIndex: options.indexOf(de), explain: `${emoji} ist ${de}.` };
  });
}

// ---------------------------------------------------------------------------
// Game: True or False (Nouns) (2 levels x 100)
// ---------------------------------------------------------------------------

function trueFalseQuestions(seed: string) {
  const withPlural = nounEntries.filter((n) => n.plural) as (NounEntry & { plural: string })[];
  const picks = take(withPlural, 70, `${seed}:pl`);
  const qs: { prompt: string; correctIndex: number; explain: string }[] = [];
  for (const n of picks) {
    const article = articleOf(n.de);
    const base = n.de.replace(/^(der|die|das) /, "");
    const wrongArticle = article === "der" ? "die" : article === "die" ? "das" : "der";
    qs.push({ prompt: `${article} ${base}`, correctIndex: 0, explain: `${n.de} is correct.` });
    qs.push({ prompt: `${wrongArticle} ${base}`, correctIndex: 1, explain: `It is ${n.de}, not ${wrongArticle} ${base}.` });
    qs.push({ prompt: `${n.de} — ${n.plural}`, correctIndex: 0, explain: `${n.de} → ${n.plural} is correct.` });
    const [d1, d2] = pluralDistractors(n.plural);
    if (d1) qs.push({ prompt: `${n.de} — ${d1}`, correctIndex: 1, explain: `The plural of ${base} is ${n.plural}, not ${d1}.` });
    if (d2) qs.push({ prompt: `${n.de} — ${d2}`, correctIndex: 1, explain: `The plural of ${base} is ${n.plural}, not ${d2}.` });
  }
  return take(qs, 100, `${seed}:final`).map((q) => ({
    ...q,
    options: (q.correctIndex === 0 ? ["Richtig", "Falsch"] : ["Falsch", "Richtig"]) as [string, string],
  })) as { prompt: string; options: string[]; correctIndex: number; explain: string }[];
}

// ---------------------------------------------------------------------------
// Game: Noun Plurals (2 levels x 100)
// ---------------------------------------------------------------------------

function pluralQuestions(seed: string) {
  const withPlural = nounEntries.filter((n) => n.plural) as (NounEntry & { plural: string })[];
  const picks = take(withPlural, 100, `${seed}:pl`);
  return picks.flatMap((n) => {
    const base = n.de.replace(/^(der|die|das) /, "");
    const [d1, d2] = pluralDistractors(n.plural);
    const distractors = [d1, d2, n.plural].filter(Boolean).slice(0, 3) as string[];
    while (distractors.length < 3) distractors.push(`${base}n`);
    const options = shuffle3(distractors[0], distractors[1], distractors[2], `${seed}:o${n.de}`) as [string, string, string];
    const correctIndex = options.indexOf(n.plural);
    const baseLower = base[0].toLowerCase() + base.slice(1);
    const wrongSingulars = [`der ${baseLower}`, `das ${baseLower}`, `die ${baseLower}`].filter((w) => w !== n.de);
    const singular = n.de.replace(/^(der|die|das) /, "");
    const sOptions = shuffle3(n.de, wrongSingulars[0] ?? "der Tisch", wrongSingulars[1] ?? "das Haus", `${seed}:s${n.de}`) as [string, string, string];
    return [
      { prompt: `${n.de} → ___`, options, correctIndex, explain: `${n.de} → ${n.plural}.` },
      { prompt: `${n.plural} → ___`, options: sOptions, correctIndex: sOptions.indexOf(n.de), explain: `The singular of ${n.plural} is ${n.de}.` },
    ];
  });
}

// ---------------------------------------------------------------------------
// Games: noun translation games (2 levels x 100 each)
// ---------------------------------------------------------------------------

function enToDeTyping(seed: string) {
  return take(nounEntries, 100, `${seed}:en2de`).map((n) => ({
    prompt: n.en,
    accept: [n.de.toLowerCase()],
    hint: n.de,
  }));
}

function deToEnTyping(seed: string) {
  return take(nounEntries, 100, `${seed}:de2en`).map((n) => ({
    prompt: n.de,
    accept: [n.en.toLowerCase()],
    audio: true,
  }));
}

function deToEnMc(seed: string) {
  return take(nounEntries, 100, `${seed}:mc`).map((n) => {
    const others = take(nounEntries.filter((x) => x.de !== n.de), 5, `${seed}:${n.de}`).map((x) => x.en);
    const options = unique3(n.en, others[0], others[1], others, `${seed}:o${n.de}`);
    return {
      prompt: n.de,
      options,
      correctIndex: options.indexOf(n.en),
      explain: `${n.de} means ${n.en}.`,
    };
  });
}

// ---------------------------------------------------------------------------
// Verb games
// ---------------------------------------------------------------------------

const REGULAR_VERBS: [string, string][] = [
  ["machen", "to make, to do"], ["spielen", "to play"], ["wohnen", "to live"], ["lernen", "to learn"],
  ["kaufen", "to buy"], ["arbeiten", "to work"], ["kochen", "to cook"], ["warten", "to wait"],
  ["tanzen", "to dance"], ["singen", "to sing"], ["hören", "to listen"], ["schreiben", "to write"],
  ["fragen", "to ask"], ["antworten", "to answer"], ["brauchen", "to need"], ["öffnen", "to open"],
  ["kosten", "to cost"], ["suchen", "to search"], ["zeigen", "to show"], ["wohnen", "to live"],
  ["telefonieren", "to phone"], ["reisen", "to travel"], ["feiern", "to celebrate"], ["putzen", "to clean"],
  ["kaufen", "to buy"], ["bezahlen", "to pay"], ["bestellen", "to order"], ["glauben", "to believe"],
  ["lieben", "to love"], ["wohnen", "to live"], ["machen", "to make"], ["spielen", "to play"],
];

const IRREGULAR_VERBS: [string, string][] = [
  ["sein", "to be"], ["haben", "to have"], ["werden", "to become"], ["gehen", "to go"],
  ["kommen", "to come"], ["essen", "to eat"], ["trinken", "to drink"], ["lesen", "to read"],
  ["sehen", "to see"], ["fahren", "to drive"], ["sprechen", "to speak"], ["schlafen", "to sleep"],
  ["helfen", "to help"], ["nehmen", "to take"], ["laufen", "to run"], ["fliegen", "to fly"],
  ["geben", "to give"], ["treffen", "to meet"], ["finden", "to find"], ["bleiben", "to stay"],
  ["verstehen", "to understand"], ["tragen", "to carry"], ["halten", "to hold"], ["waschen", "to wash"],
  ["werfen", "to throw"], ["ziehen", "to pull"], ["rufen", "to call"], ["laufen", "to run"],
  ["möchten", "would like"], ["können", "can"], ["müssen", "must"], ["wollen", "to want"],
  ["dürfen", "may"], ["sollen", "should"], ["sitzen", "to sit"], ["liegen", "to lie"],
  ["stehen", "to stand"], ["geben", "to give"], ["nehmen", "to take"], ["essen", "to eat"],
];

// present tense for ich/du/er/wir/ihr/sie — null where unchanged/unknown
const CONJ: Record<string, [string, string, string, string, string, string]> = {
  machen: ["mache", "machst", "macht", "machen", "macht", "machen"],
  spielen: ["spiele", "spielst", "spielt", "spielen", "spielt", "spielen"],
  wohnen: ["wohne", "wohnst", "wohnt", "wohnen", "wohnt", "wohnen"],
  lernen: ["lerne", "lernst", "lernt", "lernen", "lernt", "lernen"],
  kaufen: ["kaufe", "kaufst", "kauft", "kaufen", "kauft", "kaufen"],
  arbeiten: ["arbeite", "arbeitest", "arbeitet", "arbeiten", "arbeitet", "arbeiten"],
  kochen: ["koche", "kochst", "kocht", "kochen", "kocht", "kochen"],
  warten: ["warte", "wartest", "wartet", "warten", "wartet", "warten"],
  tanzen: ["tanze", "tanzt", "tanzt", "tanzen", "tanzt", "tanzen"],
  singen: ["singe", "singst", "singt", "singen", "singt", "singen"],
  hören: ["höre", "hörst", "hört", "hören", "hört", "hören"],
  schreiben: ["schreibe", "schreibst", "schreibt", "schreiben", "schreibt", "schreiben"],
  fragen: ["frage", "fragst", "fragt", "fragen", "fragt", "fragen"],
  antworten: ["antworte", "antwortest", "antwortet", "antworten", "antwortet", "antworten"],
  brauchen: ["brauche", "brauchst", "braucht", "brauchen", "braucht", "brauchen"],
  öffnen: ["öffne", "öffnest", "öffnet", "öffnen", "öffnet", "öffnen"],
  kosten: ["koste", "kostest", "kostet", "kosten", "kostet", "kosten"],
  suchen: ["suche", "suchst", "sucht", "suchen", "sucht", "suchen"],
  zeigen: ["zeige", "zeigst", "zeigt", "zeigen", "zeigt", "zeigen"],
  telefonieren: ["telefoniere", "telefonierst", "telefoniert", "telefonieren", "telefoniert", "telefonieren"],
  reisen: ["reise", "reist", "reist", "reisen", "reist", "reisen"],
  feiern: ["feiere", "feierst", "feiert", "feiern", "feiert", "feiern"],
  putzen: ["putze", "putzt", "putzt", "putzen", "putzt", "putzen"],
  bezahlen: ["bezahle", "bezahlst", "bezahlt", "bezahlen", "bezahlt", "bezahlen"],
  bestellen: ["bestelle", "bestellst", "bestellt", "bestellen", "bestellt", "bestellen"],
  glauben: ["glaube", "glaubst", "glaubt", "glauben", "glaubt", "glauben"],
  lieben: ["liebe", "liebst", "liebt", "lieben", "liebt", "lieben"],
  sein: ["bin", "bist", "ist", "sind", "seid", "sind"],
  haben: ["habe", "hast", "hat", "haben", "habt", "haben"],
  werden: ["werde", "wirst", "wird", "werden", "werdet", "werden"],
  gehen: ["gehe", "gehst", "geht", "gehen", "geht", "gehen"],
  kommen: ["komme", "kommst", "kommt", "kommen", "kommt", "kommen"],
  essen: ["esse", "isst", "isst", "essen", "esst", "essen"],
  trinken: ["trinke", "trinkst", "trinkt", "trinken", "trinkt", "trinken"],
  lesen: ["lese", "liest", "liest", "lesen", "lest", "lesen"],
  sehen: ["sehe", "siehst", "sieht", "sehen", "seht", "sehen"],
  fahren: ["fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"],
  sprechen: ["spreche", "sprichst", "spricht", "sprechen", "sprecht", "sprechen"],
  schlafen: ["schlafe", "schläfst", "schläft", "schlafen", "schlaft", "schlafen"],
  helfen: ["helfe", "hilfst", "hilft", "helfen", "helft", "helfen"],
  nehmen: ["nehme", "nimmst", "nimmt", "nehmen", "nehmt", "nehmen"],
  laufen: ["laufe", "läufst", "läuft", "laufen", "lauft", "laufen"],
  fliegen: ["fliege", "fliegst", "fliegt", "fliegen", "fliegt", "fliegen"],
  geben: ["gebe", "gibst", "gibt", "geben", "gebt", "geben"],
  treffen: ["treffe", "triffst", "trifft", "treffen", "trefft", "treffen"],
  finden: ["finde", "findest", "findet", "finden", "findet", "finden"],
  bleiben: ["bleibe", "bleibst", "bleibt", "bleiben", "bleibt", "bleiben"],
  verstehen: ["verstehe", "verstehst", "versteht", "verstehen", "versteht", "verstehen"],
  tragen: ["trage", "trägst", "trägt", "tragen", "tragt", "tragen"],
  halten: ["halte", "hältst", "hält", "halten", "haltet", "halten"],
  waschen: ["wasche", "wäschst", "wäscht", "waschen", "wascht", "waschen"],
  werfen: ["werfe", "wirfst", "wirft", "werfen", "werft", "werfen"],
  ziehen: ["ziehe", "ziehst", "zieht", "ziehen", "zieht", "ziehen"],
  rufen: ["rufe", "rufst", "ruft", "rufen", "ruft", "rufen"],
  möchten: ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"],
  können: ["kann", "kannst", "kann", "können", "könnt", "können"],
  müssen: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
  wollen: ["will", "willst", "will", "wollen", "wollt", "wollen"],
  dürfen: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
  sollen: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
  sitzen: ["sitze", "sitzt", "sitzt", "sitzen", "sitzt", "sitzen"],
  liegen: ["liege", "liegst", "liegt", "liegen", "liegt", "liegen"],
  stehen: ["stehe", "stehst", "steht", "stehen", "steht", "stehen"],
  schmecken: ["schmecke", "schmeckst", "schmeckt", "schmecken", "schmeckt", "schmecken"],
  wünschen: ["wünsche", "wünschst", "wünscht", "wünschen", "wünscht", "wünschen"],
  folgen: ["folge", "folgst", "folgt", "folgen", "folgt", "folgen"],
  danken: ["danke", "dankst", "dankt", "danken", "dankt", "danken"],
  gratulieren: ["gratuliere", "gratulierst", "gratuliert", "gratulieren", "gratuliert", "gratulieren"],
  passen: ["passe", "passt", "passt", "passen", "passt", "passen"],
  fehlen: ["fehle", "fehlst", "fehlt", "fehlen", "fehlt", "fehlen"],
  gehören: ["gehöre", "gehörst", "gehört", "gehören", "gehört", "gehören"],
  lachen: ["lache", "lachst", "lacht", "lachen", "lacht", "lachen"],
  schauen: ["schaue", "schaust", "schaut", "schauen", "schaut", "schauen"],
  holen: ["hole", "holst", "holt", "holen", "holt", "holen"],
  sagen: ["sage", "sagst", "sagt", "sagen", "sagt", "sagen"],
  schicken: ["schicke", "schickst", "schickt", "schicken", "schickt", "schicken"],
  packen: ["packe", "packst", "packt", "packen", "packt", "packen"],
  küssen: ["küsse", "küsst", "küsst", "küssen", "küsst", "küssen"],
  rechnen: ["rechne", "rechnest", "rechnet", "rechnen", "rechnet", "rechnen"],
  spazieren: ["spaziere", "spazierst", "spaziert", "spazieren", "spaziert", "spazieren"],
  rennen: ["renne", "rennst", "rennt", "rennen", "rennt", "rennen"],
  schwimmen: ["schwimme", "schwimmst", "schwimmt", "schwimmen", "schwimmt", "schwimmen"],
  springen: ["springe", "springst", "springt", "springen", "springt", "springen"],
  beginnen: ["beginne", "beginnst", "beginnt", "beginnen", "beginnt", "beginnen"],
  verlieren: ["verliere", "verlierst", "verliert", "verlieren", "verliert", "verlieren"],
  gewinnen: ["gewinne", "gewinnst", "gewinnt", "gewinnen", "gewinnt", "gewinnen"],
  vergessen: ["vergesse", "vergisst", "vergisst", "vergessen", "vergesst", "vergessen"],
  einladen: ["lade ein", "lädst ein", "lädt ein", "laden ein", "ladet ein", "laden ein"],
  anrufen: ["rufe an", "rufst an", "ruft an", "rufen an", "ruft an", "rufen an"],
  einsteigen: ["steige ein", "steigst ein", "steigt ein", "steigen ein", "steigt ein", "steigen ein"],
  aussteigen: ["steige aus", "steigst aus", "steigt aus", "steigen aus", "steigt aus", "steigen aus"],
  aufstehen: ["stehe auf", "stehst auf", "steht auf", "stehen auf", "steht auf", "stehen auf"],
  mitkommen: ["komme mit", "kommst mit", "kommt mit", "kommen mit", "kommt mit", "kommen mit"],
  anfangen: ["fange an", "fängst an", "fängt an", "fangen an", "fangt an", "fangen an"],
  aufräumen: ["räume auf", "räumst auf", "räumt auf", "räumen auf", "räumt auf", "räumen auf"],
  einkaufen: ["kaufe ein", "kaufst ein", "kauft ein", "kaufen ein", "kauft ein", "kaufen ein"],
  fernsehen: ["sehe fern", "siehst fern", "sieht fern", "sehen fern", "seht fern", "sehen fern"],
  abholen: ["hole ab", "holst ab", "holt ab", "holen ab", "holt ab", "holen ab"],
  abfahren: ["fahre ab", "fährst ab", "fährt ab", "fahren ab", "fahrt ab", "fahren ab"],
  ankommen: ["komme an", "kommst an", "kommt an", "kommen an", "kommt an", "kommen an"],
  zurückkommen: ["komme zurück", "kommst zurück", "kommt zurück", "kommen zurück", "kommt zurück", "kommen zurück"],
  umziehen: ["ziehe um", "ziehst um", "zieht um", "ziehen um", "zieht um", "ziehen um"],
  vorlesen: ["lese vor", "liest vor", "liest vor", "lesen vor", "lest vor", "lesen vor"],
  abgeben: ["gebe ab", "gibst ab", "gibt ab", "geben ab", "gebt ab", "geben ab"],
};

const PARTIZIP: Record<string, { form: string; aux: "haben" | "sein" }> = {
  machen: { form: "gemacht", aux: "haben" }, spielen: { form: "gespielt", aux: "haben" },
  wohnen: { form: "gewohnt", aux: "haben" }, lernen: { form: "gelernt", aux: "haben" },
  kaufen: { form: "gekauft", aux: "haben" }, arbeiten: { form: "gearbeitet", aux: "haben" },
  kochen: { form: "gekocht", aux: "haben" }, warten: { form: "gewartet", aux: "haben" },
  tanzen: { form: "getanzt", aux: "haben" }, singen: { form: "gesungen", aux: "haben" },
  hören: { form: "gehört", aux: "haben" }, schreiben: { form: "geschrieben", aux: "haben" },
  fragen: { form: "gefragt", aux: "haben" }, antworten: { form: "geantwortet", aux: "haben" },
  brauchen: { form: "gebraucht", aux: "haben" }, öffnen: { form: "geöffnet", aux: "haben" },
  suchen: { form: "gesucht", aux: "haben" }, zeigen: { form: "gezeigt", aux: "haben" },
  feiern: { form: "gefeiert", aux: "haben" }, putzen: { form: "geputzt", aux: "haben" },
  bezahlen: { form: "bezahlt", aux: "haben" }, bestellen: { form: "bestellt", aux: "haben" },
  glauben: { form: "geglaubt", aux: "haben" }, lieben: { form: "geliebt", aux: "haben" },
  essen: { form: "gegessen", aux: "haben" }, trinken: { form: "getrunken", aux: "haben" },
  lesen: { form: "gelesen", aux: "haben" }, sehen: { form: "gesehen", aux: "haben" },
  sprechen: { form: "gesprochen", aux: "haben" }, schlafen: { form: "geschlafen", aux: "haben" },
  helfen: { form: "geholfen", aux: "haben" }, nehmen: { form: "genommen", aux: "haben" },
  geben: { form: "gegeben", aux: "haben" }, treffen: { form: "getroffen", aux: "haben" },
  finden: { form: "gefunden", aux: "haben" }, verstehen: { form: "verstanden", aux: "haben" },
  tragen: { form: "getragen", aux: "haben" }, halten: { form: "gehalten", aux: "haben" },
  waschen: { form: "gewaschen", aux: "haben" }, werfen: { form: "geworfen", aux: "haben" },
  ziehen: { form: "gezogen", aux: "haben" }, rufen: { form: "gerufen", aux: "haben" },
  sitzen: { form: "gesessen", aux: "haben" }, liegen: { form: "gelegen", aux: "haben" },
  stehen: { form: "gestanden", aux: "haben" },
  gehen: { form: "gegangen", aux: "sein" }, kommen: { form: "gekommen", aux: "sein" },
  fahren: { form: "gefahren", aux: "sein" }, laufen: { form: "gelaufen", aux: "sein" },
  fliegen: { form: "geflogen", aux: "sein" }, bleiben: { form: "geblieben", aux: "sein" },
  sein: { form: "gewesen", aux: "sein" }, werden: { form: "geworden", aux: "sein" },
  aufstehen: { form: "aufgestanden", aux: "sein" }, ankommen: { form: "angekommen", aux: "sein" },
  schwimmen: { form: "geschwommen", aux: "sein" },
};

const REGULAR_PARTIZIP: [string, string][] = [
  ["lachen", "gelacht"], ["schauen", "geschaut"], ["holen", "geholt"], ["sagen", "gesagt"],
  ["schicken", "geschickt"], ["packen", "gepackt"], ["küssen", "geküsst"], ["rechnen", "gerechnet"],
  ["spazieren", "spaziert"], ["rennen", "gerannt"], ["springen", "gesprungen"], ["gewinnen", "gewonnen"],
  ["verlieren", "verloren"], ["vergessen", "vergessen"], ["einladen", "eingeladen"],
  ["schmecken", "geschmeckt"], ["wünschen", "gewünscht"], ["folgen", "gefolgt"], ["danken", "gedankt"],
  ["gratulieren", "gratuliert"], ["passen", "gepasst"], ["fehlen", "gefehlt"], ["gehören", "gehört"],
  ["beginnen", "begonnen"], ["enden", "geendet"], ["stoppen", "gestoppt"], ["rauchen", "geraucht"],
  ["träumen", "geträumt"], ["erzählen", "erzählt"], ["fotografieren", "fotografiert"],
  ["probieren", "probiert"], ["studieren", "studiert"], ["parken", "geparkt"], ["tanken", "getankt"],
  ["baden", "gebadet"], ["wandern", "gewandert"], ["radfahren", "radgefahren"], ["basteln", "gebastelt"],
  ["backen", "gebacken"], ["biegen", "gebogen"], ["schieben", "geschoben"], ["schneiden", "geschnitten"],
  ["streiten", "gestritten"], ["schreien", "geschrien"], ["kriechen", "gekrochen"], ["fliehen", "geflohen"],
  ["bitten", "gebeten"], ["singen", "gesungen"], ["trinken", "getrunken"], ["sprechen", "gesprochen"],
  ["klingeln", "geklingelt"], ["wischen", "gewischt"], ["bürsten", "gebürstet"], ["trocknen", "getrocknet"],
  ["spülen", "gespült"], ["bügeln", "gebügelt"], ["nähen", "genäht"], ["stricken", "gestrickt"],
  ["pflanzen", "gepflanzt"], ["gießen", "gegossen"], ["ernten", "geerntet"], ["sammeln", "gesammelt"],
];
for (const [v, form] of REGULAR_PARTIZIP) {
  if (!PARTIZIP[v]) PARTIZIP[v] = { form, aux: "haben" };
}

const PERFECT_SENTENCES: [string, string][] = [
  ["Ich trinke Kaffee.", "Ich habe Kaffee getrunken."],
  ["Wir spielen Fußball.", "Wir haben Fußball gespielt."],
  ["Ich mache die Hausaufgaben.", "Ich habe die Hausaufgaben gemacht."],
  ["Wir sehen einen Film.", "Wir haben einen Film gesehen."],
  ["Du liest das Buch.", "Du hast das Buch gelesen."],
  ["Er hilft seiner Mutter.", "Er hat seiner Mutter geholfen."],
  ["Sie nimmt das Taxi.", "Sie hat das Taxi genommen."],
  ["Ich esse ein Brot.", "Ich habe ein Brot gegessen."],
  ["Ich kaufe einen Apfel.", "Ich habe einen Apfel gekauft."],
  ["Wir lernen Deutsch.", "Wir haben Deutsch gelernt."],
  ["Er arbeitet im Büro.", "Er hat im Büro gearbeitet."],
  ["Sie kocht das Abendessen.", "Sie hat das Abendessen gekocht."],
  ["Ich schreibe einen Brief.", "Ich habe einen Brief geschrieben."],
  ["Wir hören Musik.", "Wir haben Musik gehört."],
  ["Er fragt den Lehrer.", "Er hat den Lehrer gefragt."],
  ["Sie braucht das Geld.", "Sie hat das Geld gebraucht."],
  ["Ich bestelle einen Kaffee.", "Ich habe einen Kaffee bestellt."],
  ["Wir suchen den Schlüssel.", "Wir haben den Schlüssel gesucht."],
  ["Er öffnet die Tür.", "Er hat die Tür geöffnet."],
  ["Sie tanzt gern.", "Sie hat gern getanzt."],
  ["Ich singe ein Lied.", "Ich habe ein Lied gesungen."],
  ["Wir treffen die Freunde.", "Wir haben die Freunde getroffen."],
  ["Er findet den Weg.", "Er hat den Weg gefunden."],
  ["Sie versteht die Frage.", "Sie hat die Frage verstanden."],
  ["Ich trage eine Jacke.", "Ich habe eine Jacke getragen."],
  ["Wir waschen das Auto.", "Wir haben das Auto gewaschen."],
  ["Er wirft den Ball.", "Er hat den Ball geworfen."],
  ["Sie ruft den Arzt an.", "Sie hat den Arzt angerufen."],
  ["Ich sitze am Fenster.", "Ich habe am Fenster gesessen."],
  ["Wir liegen am Strand.", "Wir haben am Strand gelegen."],
  ["Er steht vor der Tür.", "Er hat vor der Tür gestanden."],
  ["Ich feiere meinen Geburtstag.", "Ich habe meinen Geburtstag gefeiert."],
  ["Sie putzt die Wohnung.", "Sie hat die Wohnung geputzt."],
  ["Wir bezahlen die Rechnung.", "Wir haben die Rechnung bezahlt."],
  ["Ich gehe nach Hause.", "Ich bin nach Hause gegangen."],
  ["Sie kommt aus Berlin.", "Sie ist aus Berlin gekommen."],
  ["Ich fahre mit dem Bus.", "Ich bin mit dem Bus gefahren."],
  ["Wir laufen im Park.", "Wir sind im Park gelaufen."],
  ["Er fliegt nach München.", "Er ist nach München geflogen."],
  ["Sie bleibt zu Hause.", "Sie ist zu Hause geblieben."],
  ["Ich bin nach Berlin gefahren.", "Ich bin nach Berlin gefahren."],
  ["Wir sind in den Urlaub gefahren.", "Wir sind in den Urlaub gefahren."],
  ["Er ist um sieben aufgestanden.", "Er ist um sieben aufgestanden."],
  ["Sie ist gestern angekommen.", "Sie ist gestern angekommen."],
  ["Ich bin geschwommen.", "Ich bin geschwommen."],
  ["Ich bin müde.", "Ich war müde."],
  ["Wir haben ein Auto.", "Wir hatten ein Auto."],
  ["Er ist Lehrer.", "Er war Lehrer."],
  ["Ich kann schwimmen.", "Ich konnte schwimmen."],
  ["Sie will nach Hause.", "Sie wollte nach Hause."],
  ["Ich muss arbeiten.", "Ich musste arbeiten."],
  ["Du hast eine Frage.", "Du hattest eine Frage."],
  ["Wir sind in Berlin.", "Wir waren in Berlin."],
  ["Er hat einen Hund.", "Er hatte einen Hund."],
  ["Sie muss lernen.", "Sie musste lernen."],
];

// ---------------------------------------------------------------------------
// Number games
// ---------------------------------------------------------------------------

const NUM_RANGES = {
  "0-20": Array.from({ length: 21 }, (_, i) => i),
  "21-99": Array.from({ length: 79 }, (_, i) => i + 21),
  "0-99": Array.from({ length: 100 }, (_, i) => i),
  "100-999": Array.from({ length: 100 }, (_, i) => 100 + i * 9),
  "1000-9999": Array.from({ length: 100 }, (_, i) => 1000 + i * 90),
};

function mathQuestions(seed: string, level: number) {
  const qs: { prompt: string; accept: string[]; hint: string }[] = [];
  const rand = (n: number, salt: string) => {
    let h = 2166136261;
    const s = `${seed}:${level}:${salt}`;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h % n;
  };
  for (let i = 0; i < 100; i++) {
    const op = level === 1 ? (rand(2, `op${i}`) ? "+" : "−") : level === 2 ? "×" : "÷";
    let a: number, b: number, result: number;
    if (op === "+") {
      a = 1 + rand(60, `a${i}`);
      b = 1 + rand(60, `b${i}`);
      result = a + b;
    } else if (op === "−") {
      a = 10 + rand(80, `a${i}`);
      b = 1 + rand(a - 1, `b${i}`);
      result = a - b;
    } else if (op === "×") {
      a = 2 + rand(9, `a${i}`);
      b = 2 + rand(9, `b${i}`);
      result = a * b;
    } else {
      b = 2 + rand(9, `b${i}`);
      result = 2 + rand(50, `r${i}`);
      a = b * result;
    }
    qs.push({
      prompt: `${a} ${op} ${b} = ?`,
      accept: [germanNumberWord(result), String(result)],
      hint: `${germanNumberWord(result)} (${result})`,
    });
  }
  return qs;
}

function numberWordItems(seed: string, range: number[], level: number) {
  return take(range, 100, `${seed}:${level}`).map((n) => ({
    prompt: String(n),
    accept: [germanNumberWord(n)],
    hint: germanNumberWord(n),
  }));
}

function wordNumberItems(seed: string, range: number[], level: number) {
  return take(range, 100, `${seed}:${level}`).map((n) => ({
    prompt: germanNumberWord(n),
    accept: [String(n)],
    hint: String(n),
  }));
}

function keypadItems(seed: string, range: number[]) {
  return take(range, 100, `${seed}`).map((n) => ({ word: germanNumberWord(n), target: n }));
}

function timePatternItems(seed: string): { minutes: number; accept: string[]; hint: string }[] {
  const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const patterns: { off: number; accept: (h: number) => string[]; hint: (h: number) => string }[] = [
    { off: 0, accept: (h) => [`${h} uhr`, `es ist ${h} uhr`, `punkt ${h < 12 ? (h === 12 ? "zwölf" : h) : ""}`.trim()].filter(Boolean), hint: (h) => `${h} Uhr` },
    { off: 30, accept: (h) => [halfWord(h + 1)], hint: (h) => halfWord(h + 1) },
    { off: 15, accept: (h) => [`viertel nach ${hWord(h)}`], hint: (h) => `viertel nach ${hWord(h)}` },
    { off: 45, accept: (h) => [`viertel vor ${hWord(h + 1)}`], hint: (h) => `viertel vor ${hWord(h + 1)}` },
    { off: 5, accept: (h) => [`fünf nach ${hWord(h)}`], hint: (h) => `fünf nach ${hWord(h)}` },
    { off: 55, accept: (h) => [`fünf vor ${hWord(h + 1)}`], hint: (h) => `fünf vor ${hWord(h + 1)}` },
    { off: 10, accept: (h) => [`zehn nach ${hWord(h)}`], hint: (h) => `zehn nach ${hWord(h)}` },
    { off: 50, accept: (h) => [`zehn vor ${hWord(h + 1)}`], hint: (h) => `zehn vor ${hWord(h + 1)}` },
    { off: 20, accept: (h) => [`zwanzig nach ${hWord(h)}`], hint: (h) => `zwanzig nach ${hWord(h)}` },
    { off: 40, accept: (h) => [`zwanzig vor ${hWord(h + 1)}`], hint: (h) => `zwanzig vor ${hWord(h + 1)}` },
  ];
  const items: { minutes: number; accept: string[]; hint: string }[] = [];
  for (const h of hours) {
    for (const p of patterns) {
      items.push({ minutes: h * 60 + p.off, accept: p.accept(h), hint: p.hint(h) });
    }
  }
  return take(items, 100, `time:${seed}`);
}

function hWord(h: number): string {
  const hh = h % 12;
  if (hh === 0) return "zwölf";
  if (hh === 1) return "eins";
  return germanNumberWord(hh);
}
function halfWord(h: number): string {
  return `halb ${hWord(h)}`;
}

function timeShortFormItems(seed: string) {
  const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const qs: { prompt: string; options: [string, string, string]; correctIndex: number; explain: string }[] = [];
  for (const h of hours) {
    const pairs: [number, string][] = [
      [h * 60 + 5, `fünf nach ${hWord(h)}`],
      [h * 60 + 10, `zehn nach ${hWord(h)}`],
      [h * 60 + 15, `viertel nach ${hWord(h)}`],
      [h * 60 + 30, `halb ${hWord(h + 1)}`],
      [h * 60 + 45, `viertel vor ${hWord(h + 1)}`],
      [h * 60 + 50, `zehn vor ${hWord(h + 1)}`],
      [h * 60 + 55, `fünf vor ${hWord(h + 1)}`],
    ];
    for (const [minutes, answer] of pairs) {
      const others = [
        `fünf nach ${hWord(h + 1)}`,
        `viertel nach ${hWord(h + 1)}`,
        `halb ${hWord(h)}`,
        `viertel vor ${hWord(h)}`,
      ];
      const d1 = others[Math.floor((minutes + h) % others.length)];
      const d2 = others[Math.floor((minutes * 2 + h) % others.length)];
      const options = shuffle3(answer, d1, d2, `${seed}:${minutes}`);
      qs.push({
        prompt: `${String(h).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`,
        options,
        correctIndex: options.indexOf(answer),
        explain: `${String(h).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")} = ${answer}.`,
      });
    }
  }
  return take(qs, 100, `${seed}:final`);
}

// ---------------------------------------------------------------------------
// Word games
// ---------------------------------------------------------------------------

function fiveLetterWords(seed: string) {
  const pool = [...goetheNouns, ...goetheAdj, ...goetheVerbs, ...topicNouns]
    .map((w) => w.de)
    .filter((w) => /^[a-zäöüß]+$/.test(w) && w.length === 5);
  const extra = ["heute", "danke", "lesen", "spiel", "sagen", "holen", "kaufe", "wohne", "liebe", "fahre", "warte", "suche", "kenne", "singt", "tanzt", "gehst", "lauft", "weint", "kocht", "trink", "geben", "tritt", "heben", "zogen", "schön", "küche", "grüße", "müsst", "füsse", "hände", "sätze", "äpfel", "gäste", "bären", "lüfte", "prüfe", "hölle", "trübe", "dünne", "nähte", "sagst", "holst", "magst", "liebt", "lacht", "weint", "wohnt", "fährst", "trägst", "schläft", "fliegt", "läuft", "schwim", "sprich", "nimmst", "gibst", "liest", "siehst", "isst", "trinkt", "kommst", "gehst", "bleib", "finde", "suchen", "tragen", "halten", "werfen", "ziehen", "rufen", "sitzen", "liegen", "stehen", "fliege", "tanze", "singe", "höre", "frage", "warte", "koche", "reise", "feier", "putze", "glaube", "liebe", "möchte", "können", "müssen", "wollen", "dürfen", "sollen"];
  const all = [...new Set([...pool, ...extra])];
  return take(all, 35, `${seed}:five`);
}

const SHORT_WORDS = ["haus", "tisch", "stuhl", "bett", "uhr", "tür", "wand", "kopf", "hand", "fuß", "arm", "bein", "nase", "mund", "auge", "ohr", "brot", "milch", "kaffee", "apfel", "ei", "tee", "bier", "wasser", "garten", "fenster", "küche", "lampe", "tasse", "schuh", "hemd", "jacke", "hose", "kleid", "mütze", "hund", "katze", "pferd", "maus", "fisch", "vogel", "kuh", "schaf", "huhn", "baum", "blume", "sonne", "regen", "mond", "stern", "berg", "meer", "fluss", "see", "wald", "stadt", "dorf", "straße", "platz", "park", "kirche", "schule", "kino", "buch", "heft", "stift", "spiel", "lied", "film", "zug", "bus", "auto", "taxi", "wort", "satz", "brief", "post", "geld", "euro", "cent", "kasse", "markt", "preis", "farbe", "zeit", "tag", "woche", "monat", "jahr", "morgen", "abend", "nacht", "mittag", "zimmer", "teller", "gabel", "messer", "löffel", "glas", "sessel", "spiegel", "teppich", "spieler", "lehrer", "schüler", "arzt", "frau", "mann", "kind", "name", "essen", "trinken", "gehen", "kommen", "sehen", "lesen", "spielen", "wohnen", "lernen", "kaufen", "machen", "sagen", "hören", "suchen", "finden", "warten", "kochen", "helfen", "fragen"];
const MEDIUM_WORDS = ["fenster", "küche", "garten", "schrank", "spiegel", "teppich", "zimmer", "wohnung", "balkon", "treppe", "gabel", "messer", "löffel", "teller", "gläser", "tassen", "banane", "orange", "tomate", "kartoffel", "schokolade", "frühstück", "mittagessen", "abendessen", "supermarkt", "geschäft", "verkäufer", "kellner", "rechnung", "speisekarte", "geburtstag", "wochenende", "schwester", "bruder", "mutter", "vater", "freundin", "nachbar", "kollege", "student", "lehrer", "schule", "museum", "kirche", "bahnhof", "flughafen", "krankenhaus", "apotheke", "fahrkarte", "gepäck", "urlaub", "reise", "hotel", "nummer", "adresse", "telefon", "computer", "zeitschrift", "zeitung", "sommer", "winter", "frühling", "herbst", "montag", "dienstag", "mittwoch", "donnerstag", "freitag", "samstag", "sonntag", "januar", "februar", "märz", "april", "juni", "juli", "august", "september", "oktober", "november", "dezember"];

function wordlistWordsByLength(min: number, max: number, seed: string, n: number) {
  const pool = [...goetheNouns, ...topicNouns, ...goetheAdj]
    .map((w) => w.de.replace(/^(der|die|das) /, ""))
    .filter((w) => /^[a-zäöüß]+$/.test(w) && w.length >= min && w.length <= max);
  return take([...new Set(pool)], n, seed);
}

const LONG_WORDS = [
  "Weihnachten", "Krankenhaus", "Supermarkt", "Kühlschrank", "Regenschirm",
  "Fahrradfahren", "Geschwister", "Handschuhe", "Sonnenbrille", "Geburtstag",
  "Hausaufgaben", "Mittagessen", "Abendessen", "Einkaufen", "Fernsehen",
  "Wochenende", "Schularbeit", "Wiedersehen", "Apfelkuchen", "Gutenmorgen",
  "Straßenbahn", "Arbeitszimmer", "Wohnzimmer", "Schlafzimmer", "Waschmaschine",
  "Spülmaschine", "Kühlschrank", "Geschirrspüler", "Bücherregal", "Schreibtisch",
  "Frühstück", "Nebensatz", "Hauptsatz", "Zusammensetzung", "Entschuldigung",
  "Polizeistation", "Feuerwehr", "Krankenwagen", "Bahnhofstraße", "Bundesland",
  "Jahreszeit", "Wochentag", "Montagmorgen", "Freitagabend", "Samstagnachmittag",
  "Lieblingsessen", "Lieblingsbuch", "Schmetterling", "Regenbogen", "Sonnenuntergang",
  "Feuerwehr", "Polizei", "Zeitung", "Zeitschrift", "Speisekarte", "Rechnung",
  "Geschäft", "Einkauf", "Angebot", "Verkäufer", "Mitarbeiter", "Unterricht",
  "Hausaufgaben", "Schulfach", "Gebäude", "Bibliothek", "Universität", "Apotheke",
  "Krankenhaus", "Krankenwagen", "Bahnhofstraße", "Bundesland", "Jahreszeit",
  "Wochentag", "Montagmorgen", "Freitagabend", "Samstagnachmittag", "Gutenmorgen",
  "Sonnenaufgang", "Regenwolke", "Schneemann", "Eiscreme", "Schokolade",
  "Kartoffel", "Tomate", "Banane", "Orange", "Schlafzimmer", "Arbeitszimmer",
  "Spülmaschine", "Geschirrspüler", "Bücherregal", "Schreibtisch", "Nebensatz",
  "Hauptsatz", "Entschuldigung", "Polizeistation", "Straßenbahn", "Apfelkuchen",
  "Gutenabend", "Gutenacht", "Fahrkarte", "Flughafen", "Haltestelle", "U-Bahn",
  "Zugticket", "Hausschuhe", "Regenjacke", "Wintermantel", "Handschuhe", "Mütze",
  "Pullover", "Hose", "Kleid", "Jacke", "Hemd", "Schuhe", "Socken", "Brille",
];

function scrambleItems(seed: string, level: number) {
  const words = level === 1 ? wordlistWordsByLength(3, 6, `${seed}:1`, 100) : level === 2 ? wordlistWordsByLength(6, 9, `${seed}:2`, 100) : [...wordlistWordsByLength(9, 16, `${seed}:3`, 60), ...LONG_WORDS];
  return words.map((w) => {
    const entry = [...goetheNouns, ...topicNouns, ...goetheAdj].find((x) => x.de.replace(/^(der|die|das) /, "") === w);
    return { de: w, en: entry?.en ?? "", timeLimit: level === 3 ? 40 : 30, audio: true };
  });
}


// ---------------------------------------------------------------------------
// Case Detective expansion (levels to 100 each)
// ---------------------------------------------------------------------------

interface CaseQ {
  prompt: string;
  options: [string, string, string];
  correctIndex: number;
  explain: string;
}

const CASE_SUBJECTS = ["Der Mann", "Die Frau", "Das Kind", "Der Hund", "Die Katze", "Der Lehrer", "Die Lehrerin", "Der Kellner", "Das Mädchen", "Der Vater", "Die Mutter", "Der Bruder", "Die Schwester", "Der Student", "Die Oma", "Der Opa", "Der Nachbar", "Die Ärztin", "Der Zug", "Der Bus", "Die Sonne", "Der Regen", "Die Kinder", "Die Blumen", "Der Freund", "Die Freundin", "Die Familie", "Die Schüler", "Der Polizist", "Die Musik"];
const CASE_VERBS_SUBJECT = ["schläft", "arbeitet", "spielt", "singt", "tanzt", "kocht", "liest", "schreibt", "läuft", "schwimmt", "wartet", "klingelt", "lacht", "weint", "fährt", "fliegt", "kommt", "geht", "steht", "sitzt", "liegt", "schaut", "hört", "träumt", "blüht", "scheint", "fällt", "reist", "feiert", "putzt"];
const CASE_DIRECT_OBJECTS = ["den Mann", "den Hund", "den Kaffee", "den Apfel", "den Schlüssel", "den Computer", "den Film", "den Brief", "den Bus", "den Zug", "die Frau", "die Tür", "die Oma", "die Katze", "die Musik", "die Zeitung", "die Frage", "die Hausaufgaben", "die Blumen", "die Jacke", "die Tasche", "die Pizza", "die Banane", "die Milch", "das Buch", "das Auto", "das Kind", "das Haus", "das Brot", "das Taxi", "das Wetter", "das Radio", "das Lied", "das Essen", "das Geschenk", "das Fahrrad", "das Zimmer", "das Hemd", "das Kleid", "das Geld", "einen Apfel", "einen Kaffee", "einen Film", "einen Brief", "einen Bruder", "einen Freund", "ein Buch", "ein Auto", "ein Haus", "ein Taxi"];
const DATIVE_VERBS = ["helfe", "helfen", "danke", "danken", "antworte", "antworten", "glaube", "glauben", "gratuliere", "gratulieren", "wünsche", "wünschen", "gehöre", "gehören", "folge", "folgen"];
const DATIVE_OBJECTS = ["dem Mann", "dem Lehrer", "dem Kind", "dem Vater", "dem Freund", "dem Nachbarn", "dem Arzt", "dem Kellner", "dem Fahrer", "dem Chef", "dem Studenten", "dem Opa", "dem Bruder", "dem Kollegen", "der Frau", "der Lehrerin", "der Mutter", "der Oma", "der Schwester", "der Ärztin", "der Freundin", "der Tochter", "der Familie", "der Katze", "mir", "dir", "ihm", "ihr", "uns", "den Eltern", "den Kindern", "den Schülern", "den Nachbarn"];
const WOHIN_OBJECTS: [string, string, string, string, string][] = [
  ["der Supermarkt", "den Supermarkt", "dem Supermarkt", "in den Supermarkt", "Wohin? in takes the accusative: in den Supermarkt."],
  ["die Schule", "die Schule", "der Schule", "in die Schule", "Wohin? in takes the accusative: in die Schule."],
  ["das Kino", "das Kino", "dem Kino", "ins Kino", "Wohin? in takes the accusative: ins (in das) Kino."],
  ["der Bahnhof", "den Bahnhof", "dem Bahnhof", "zum Bahnhof", "Wohin? zu takes the dative: zum (zu dem) Bahnhof."],
  ["die Apotheke", "die Apotheke", "der Apotheke", "zur Apotheke", "Wohin? zu takes the dative: zur (zu der) Apotheke."],
  ["das Krankenhaus", "das Krankenhaus", "dem Krankenhaus", "ins Krankenhaus", "Wohin? in takes the accusative: ins Krankenhaus."],
  ["die Bank", "die Bank", "der Bank", "zur Bank", "Wohin? zu takes the dative: zur Bank."],
  ["das Restaurant", "das Restaurant", "dem Restaurant", "ins Restaurant", "Wohin? in takes the accusative: ins Restaurant."],
  ["die Post", "die Post", "der Post", "zur Post", "Wohin? zu takes the dative: zur Post."],
  ["das Museum", "das Museum", "dem Museum", "ins Museum", "Wohin? in takes the accusative: ins Museum."],
  ["die Kirche", "die Kirche", "der Kirche", "in die Kirche", "Wohin? in takes the accusative: in die Kirche."],
  ["der Markt", "den Markt", "dem Markt", "zum Markt", "Wohin? zu takes the dative: zum Markt."],
  ["das Café", "das Café", "dem Café", "ins Café", "Wohin? in takes the accusative: ins Café."],
  ["die Bibliothek", "die Bibliothek", "der Bibliothek", "in die Bibliothek", "Wohin? in takes the accusative: in die Bibliothek."],
];

function caseQuestions(seed: string, level: number): CaseQ[] {
  const qs: CaseQ[] = [];
  if (level === 1) {
    const subjects = take(CASE_SUBJECTS, 50, `${seed}:s`);
    const verbs = take(CASE_VERBS_SUBJECT, 40, `${seed}:v`);
    subjects.forEach((subj, i) => {
      const verb = verbs[i % verbs.length];
      const noun = subj.replace(/^(Der|Die|Das) /, "");
      qs.push({ prompt: `${subj} ${verb}. (${noun})`, options: shuffle3("Nominativ", "Akkusativ", "Dativ", `${seed}:n${i}`), correctIndex: 0, explain: `${subj} is the subject doing the ${verb}: nominative.` });
    });
    const objects = take(CASE_DIRECT_OBJECTS, 35, `${seed}:o`);
    const objVerbs = ["sehe", "kaufe", "lese", "trinke", "öffne", "kenne", "habe", "besuche", "liebe", "mag", "brauche", "finde", "höre", "mache", "schreibe", "bestelle", "suche", "verstehe", "nehme", "vergesse", "frage", "treffe", "warte auf", "lade ein", "fotografiere"];
    objects.forEach((obj, i) => {
      const v1 = objVerbs[i % objVerbs.length];
      const v2 = objVerbs[(i + 7) % objVerbs.length];
      qs.push({ prompt: `Ich ${v1} ${obj}. (${obj})`, options: shuffle3("Akkusativ", "Nominativ", "Dativ", `${seed}:a${i}`), correctIndex: 0, explain: `${obj} is the direct object: accusative.` });
      qs.push({ prompt: `Er ${v2} ${obj}. (${obj})`, options: shuffle3("Akkusativ", "Nominativ", "Dativ", `${seed}:b${i}`), correctIndex: 0, explain: `${obj} is the direct object: accusative.` });
    });
  } else if (level === 2) {
    const verbs = take(DATIVE_VERBS, 16, `${seed}:v`);
    const objects = take(DATIVE_OBJECTS, 34, `${seed}:o`);
    verbs.forEach((verb, i) => {
      objects.forEach((obj, j) => {
        if ((i + j) % 5 !== 0) return;
        const subject = ["Ich", "Wir", "Er", "Sie"][(i + j) % 4];
        qs.push({ prompt: `${subject} ${verb} ${obj}. (${obj})`, options: shuffle3("Dativ", "Akkusativ", "Nominativ", `${seed}:q${i}${j}`), correctIndex: 0, explain: `${verb} takes the dative: ${obj}.` });
      });
    });
  } else if (level === 3) {
    const nouns = take(nounEntries, 100, `${seed}:n`);
    const templates: [string, string, string][] = [
      ["Ich sehe ___ %s.", "den", "sehen takes the accusative"],
      ["Ich gebe ___ %s einen Apfel.", "dem", "The receiver of geben is dative"],
      ["Ich danke ___ %s.", "der", "danken takes the dative"],
      ["Das schmeckt ___ %s gut.", "dem", "schmecken takes the dative"],
      ["Wir antworten ___ %s.", "der", "antworten takes the dative"],
      ["Ich helfe ___ %s.", "dem", "helfen takes the dative"],
      ["Er gibt ___ %s ein Geschenk.", "der", "The receiver of geben is dative"],
      ["Sie liebt ___ %s.", "den", "lieben takes the accusative"],
    ];
    nouns.forEach((n, i) => {
      const article = articleOf(n.de);
      const base = n.de.replace(/^(der|die|das) /, "");
      const [template, correct, explain] = templates[i % templates.length];
      const correctForm = (correct === "den" ? "den" : correct === "der" ? "der" : "dem") + "";
      const optSet = unique3(correctForm, "den", "der", ["dem", "die", "das"], `${seed}:c${i}`);
      qs.push({
        prompt: template.replace("%s", base),
        options: optSet,
        correctIndex: optSet.indexOf(correctForm),
        explain: `${explain}: ${correctForm} ${base}.`,
      });
    });
  } else {
    const places = take(WOHIN_OBJECTS, 14, `${seed}:p`);
    places.forEach(([, akk, dat, full, explain], i) => {
      const nom = places[i][0];
      const base = nom.replace(/^(der|die|das) /, "");
      qs.push({ prompt: `Ich gehe ${full.includes("zu") ? "zu" : "in"} ${full.includes("zu") ? dat : akk} ${base}. (direction)`, options: unique3(full.includes("zu") ? dat : akk, "den", "dem", [akk, nom], `${seed}:w${i}`), correctIndex: 0, explain });
      qs.push({ prompt: `Ich bin in ${dat} ${base}. (position)`, options: unique3(dat, akk, nom, ["dem", "die", "das"], `${seed}:p${i}`), correctIndex: 0, explain: `Wo? position takes the dative: in ${dat} ${base}.` });
      qs.push({ prompt: `Ich komme ${full.includes("zu") ? "aus dem" : "aus der"} ${base}. (origin)`, options: shuffle3(full.includes("zu") ? "aus dem" : "aus der", "aus den", "aus das", `${seed}:u${i}`), correctIndex: 0, explain: `Woher? takes aus + dative: ${full.includes("zu") ? "aus dem" : "aus der"} ${base}.` });
    });
    const vehiclePreps: [string, string, string, string, string][] = [
      ["Ich fahre mit ___ Auto.", "dem", "das", "den", "mit always takes the dative: mit dem Auto."],
      ["Wir fahren mit ___ Bus.", "dem", "den", "das", "mit always takes the dative: mit dem Bus."],
      ["Sie fährt mit ___ Zug.", "dem", "den", "das", "mit always takes the dative: mit dem Zug."],
      ["Er fährt mit ___ Fahrrad.", "dem", "das", "den", "mit always takes the dative: mit dem Fahrrad."],
      ["Ich fahre mit ___ Taxi.", "dem", "das", "den", "mit always takes the dative: mit dem Taxi."],
      ["Wir fliegen mit ___ Flugzeug.", "dem", "das", "den", "mit always takes the dative: mit dem Flugzeug."],
      ["Das Geschenk ist für ___ Oma.", "die", "der", "dem", "für always takes the accusative: für die Oma."],
      ["Der Brief ist für ___ Bruder.", "den", "dem", "der", "für always takes the accusative: für den Bruder."],
      ["Die Karte ist für ___ Mama.", "die", "der", "dem", "für always takes the accusative: für die Mama."],
      ["Das Geschenk ist für ___ Kind.", "das", "dem", "den", "für takes the accusative; neuter stays das."],
      ["Die Blumen sind für ___ Lehrerin.", "die", "der", "dem", "für always takes the accusative: für die Lehrerin."],
      ["Der Brief ist für ___ Kollegen.", "den", "dem", "der", "für always takes the accusative: für den Kollegen."],
      ["Das Paket ist für ___ Vater.", "den", "dem", "der", "für always takes the accusative: für den Vater."],
      ["Die Einladung ist für ___ Schwester.", "die", "der", "dem", "für always takes the accusative: für die Schwester."],
    ];
    const housePreps: [string, string, string, string, string][] = [
      ["Das Bild hängt an ___ Wand. (position)", "der", "die", "dem", "Wo? position takes the dative: an der Wand."],
      ["Ich hänge das Bild an ___ Wand. (direction)", "die", "der", "dem", "Wohin? direction takes the accusative: an die Wand."],
      ["Die Vase steht auf ___ Tisch. (position)", "dem", "den", "das", "Wo? position takes the dative: auf dem Tisch."],
      ["Ich stelle die Vase auf ___ Tisch. (direction)", "den", "dem", "der", "Wohin? direction takes the accusative: auf den Tisch."],
      ["Das Buch liegt in ___ Regal. (position)", "dem", "das", "den", "Wo? position takes the dative: in dem Regal."],
      ["Ich lege das Buch in ___ Regal. (direction)", "das", "dem", "der", "Wohin? direction takes the accusative: in das Regal."],
      ["Der Stuhl steht neben ___ Tisch.", "dem", "den", "der", "Position takes the dative: neben dem Tisch."],
      ["Ich stelle den Stuhl neben ___ Tisch. (direction)", "den", "dem", "der", "Direction takes the accusative: neben den Tisch."],
      ["Der Hund sitzt unter ___ Tisch.", "dem", "den", "der", "Position takes the dative: unter dem Tisch."],
      ["Der Hund läuft unter ___ Tisch. (direction)", "den", "dem", "der", "Direction takes the accusative: unter den Tisch."],
      ["Die Katze schläft auf ___ Sofa. (position)", "dem", "das", "den", "Wo? position takes the dative: auf dem Sofa."],
      ["Die Katze springt auf ___ Sofa. (direction)", "das", "dem", "der", "Direction takes the accusative: auf das Sofa."],
      ["Der Schlüssel liegt zwischen ___ Büchern.", "den", "die", "dem", "zwischen takes the dative for position: zwischen den Büchern."],
      ["Ich stelle die Tasche vor ___ Tür. (position)", "der", "die", "dem", "Wo? position takes the dative: vor der Tür."],
    ];
    vehiclePreps.push(...housePreps);
    vehiclePreps.forEach(([prompt, correct, d1, d2, explain], i) => {
      qs.push({ prompt, options: shuffle3(correct, d1, d2, `${seed}:v${i}`), correctIndex: 0, explain });
    });
    const preps: [string, string, string, string, string][] = [
      ["Ich fahre mit ___ Auto.", "dem", "das", "den", "mit always takes the dative: mit dem Auto."],
      ["Das Geschenk ist für ___ dich.", "dich", "dir", "du", "für always takes the accusative: für dich."],
      ["Ich komme aus ___ Nigeria.", "aus", "von", "zu", "aus answers Woher? without an article: aus Nigeria."],
      ["Die Lampe ist auf ___ Tisch. (position)", "dem", "den", "das", "Wo? position takes the dative: auf dem Tisch."],
      ["Ich lege das Buch auf ___ Tisch. (direction)", "den", "dem", "der", "Wohin? direction takes the accusative: auf den Tisch."],
      ["Wir gehen in ___ Kino. (direction)", "das", "dem", "der", "Wohin? into the cinema: in das Kino."],
      ["Er ist in ___ Schule. (position)", "der", "die", "dem", "Wo? position takes the dative: in der Schule."],
      ["Sie wohnt bei ___ Eltern.", "den", "die", "dem", "bei takes the dative; plural dative is den Eltern."],
      ["Ich fliege nach ___ Berlin.", "nach", "in", "zu", "nach is used with cities without articles: nach Berlin."],
      ["Das Buch ist für ___ Kind.", "das", "dem", "den", "für takes the accusative; neuter stays das."],
      ["Wir treffen uns vor ___ Kino. (position)", "dem", "das", "den", "Wo? position takes the dative: vor dem Kino."],
      ["Ich stelle die Vase auf ___ Tisch. (direction)", "den", "dem", "der", "Wohin? direction takes the accusative: auf den Tisch."],
      ["Das Bild hängt an ___ Wand. (position)", "der", "die", "dem", "Wo? position takes the dative: an der Wand."],
      ["Ich hänge das Bild an ___ Wand. (direction)", "die", "der", "dem", "Wohin? direction takes the accusative: an die Wand."],
      ["Wir fahren mit ___ Bus.", "dem", "den", "das", "mit always takes the dative: mit dem Bus."],
      ["Er wartet auf ___ Freund.", "den", "dem", "der", "warten auf takes the accusative: auf den Freund."],
      ["Sie kommt von ___ Arbeit.", "der", "die", "dem", "von takes the dative: von der Arbeit."],
      ["Ich spreche mit ___ Lehrer.", "dem", "den", "der", "mit always takes the dative: mit dem Lehrer."],
      ["Wir kommen aus ___ Schule.", "der", "die", "dem", "aus takes the dative: aus der Schule."],
      ["Das Geschenk ist von ___ Oma.", "der", "die", "dem", "von takes the dative: von der Oma."],
      ["Ich sitze neben ___ Fenster.", "dem", "das", "den", "neben takes the dative for position: neben dem Fenster."],
      ["Der Stuhl steht neben ___ Tisch.", "dem", "den", "der", "Position takes the dative: neben dem Tisch."],
      ["Ich gehe nach ___ Hause.", "nach", "zu", "in", "nach Hause is the fixed form for going home."],
      ["Er fährt zu ___ Oma.", "der", "die", "dem", "zu takes the dative: zu der Oma (zur Oma)."],
      ["Ich komme zu ___ dir.", "dir", "dich", "du", "zu takes the dative: zu dir."],
      ["Das ist für ___ Mama.", "die", "der", "dem", "für takes the accusative; feminine stays die."],
      ["Wir warten auf ___ Bus.", "den", "dem", "der", "warten auf takes the accusative: auf den Bus."],
      ["Sie fährt mit ___ Zug.", "dem", "den", "das", "mit always takes the dative: mit dem Zug."],
      ["Ich bin seit ___ Jahr in Deutschland.", "einem", "einen", "ein", "seit takes the dative: seit einem Jahr."],
      ["Er wohnt gegenüber ___ Bahnhof.", "dem", "den", "der", "gegenüber takes the dative: gegenüber dem Bahnhof."],
    ];
    preps.forEach(([prompt, correct, d1, d2, explain], i) => {
      qs.push({ prompt, options: shuffle3(correct, d1, d2, `${seed}:p${i}`), correctIndex: 0, explain });
    });
  }
  return take(qs, 100, `${seed}:final`);
}

function hangmanWords(seed: string, level: number) {
  const maxLen = level === 1 ? 6 : level === 2 ? 9 : 99;
  const minLen = level === 1 ? 3 : level === 2 ? 5 : 8;
  const base =
    level === 1
      ? [...wordlistWordsByLength(minLen, maxLen, `${seed}:1`, 60), ...SHORT_WORDS]
      : level === 2
        ? [...wordlistWordsByLength(minLen, maxLen, `${seed}:2`, 60), ...MEDIUM_WORDS]
        : [...wordlistWordsByLength(minLen, maxLen, `${seed}:3`, 50), ...LONG_WORDS];
  const words = take([...new Set(base)], 100, `${seed}:${level}`);
  return words.map((w) => {
    const entry = [...goetheNouns, ...topicNouns, ...goetheAdj].find((x) => x.de.replace(/^(der|die|das) /, "") === w);
    return { word: w, hint: entry?.en ?? "" };
  });
}

function wordsearchWords(seed: string, level: number) {
  const maxLen = level === 1 ? 6 : level === 2 ? 8 : 9;
  return wordlistWordsByLength(4, maxLen, `${seed}:${level}`, 200);
}

function gridPairs(seed: string, level: number) {
  const picks = take(nounEntries, 100, `${seed}:${level}`);
  return picks.map((n) => [n.de, n.en] as [string, string]);
}

// ---------------------------------------------------------------------------
// Write files
// ---------------------------------------------------------------------------

function gameHeader(id: string, title: string, emoji: string, description: string, category: string, tags: string[]) {
  return `import type { Game } from "./schema";

export const ${id.replace(/-/g, "")}Game: Game = {
  id: ${JSON.stringify(id)},
  title: ${JSON.stringify(title)},
  emoji: ${JSON.stringify(emoji)},
  description: ${JSON.stringify(description)},
  category: ${JSON.stringify(category)},
  tags: ${JSON.stringify(tags)},
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

// ---- noun-games.ts ----
{
  let id = 0;
  const nid = () => `ng${String(++id).padStart(3, "0")}`;

  const artikelDropLevels = [1, 2, 3].map((l) =>
    levelBlock(
      `artikel-drop-${l}`,
      `Level ${l}: ${l === 1 ? "Everyday nouns" : l === 2 ? "Places and things" : "Mixed nouns"}`,
      `        {
          kind: "drop",
          title: ${JSON.stringify("Artikel Drop")},
          instruction: ${JSON.stringify("Send each falling noun to der, die or das before it lands.")},
          fallMs: ${4500 - (l - 1) * 500},
          gates: [
            { id: "der", label: "der" },
            { id: "die", label: "die" },
            { id: "das", label: "das" },
          ],
          items: [
${artikelDropItems(l, `ad${l}`)
  .map((it) => `            { text: ${JSON.stringify(it.text)}, gateId: ${JSON.stringify(it.gateId)} },`)
  .join("\n")}
          ],
        },
`,
    ),
  );

  const rulesQuestions = articleRules("rules");
  const rulesLevel1 = rulesQuestions.slice(0, 100).map((n) => mcExercise(nid(), `___ ${esc(n.de.replace(/^(der|die|das) /, ""))}`, shuffle3("der", "die", "das", `r:${n.de}`), ["der", "die", "das"].indexOf(articleOf(n.de)), articleRuleExplain(n.de)));
  const rulesLevel2 = take(nounEntries, 100, "rules2").map((n) => mcExercise(nid(), `___ ${esc(n.de.replace(/^(der|die|das) /, ""))}`, shuffle3("der", "die", "das", `r2:${n.de}`), ["der", "die", "das"].indexOf(articleOf(n.de)), articleRuleExplain(n.de)));

  const timeL1 = timeQuestions("t1").map((q) => mcExercise(nid(), q.prompt, q.options, q.options.indexOf(q.correct), q.explain));
  const timeL2 = timeQuestions("t2").map((q) => mcExercise(nid(), q.prompt, q.options, q.options.indexOf(q.correct), q.explain));

  const datL1 = dativQuestions("d1").map((q) => mcExercise(nid(), q.prompt, q.options, q.options.indexOf(q.correct), q.explain));
  const datL2 = dativQuestions("d2").map((q) => mcExercise(nid(), q.prompt, q.options, q.options.indexOf(q.correct), q.explain));

  const imgQuestions = imageQuestions("img");
  const imgL1 = imgQuestions.slice(0, Math.floor(imgQuestions.length / 2)).map((q) => mcExercise(nid(), q.prompt, q.options, q.correctIndex, q.explain));
  const imgL2 = imgQuestions.slice(Math.floor(imgQuestions.length / 2)).map((q) => mcExercise(nid(), q.prompt, q.options, q.correctIndex, q.explain));

  const tfL1 = trueFalseQuestions("tf1").slice(0, 100).map((q) => mcExercise(nid(), q.prompt, q.options, q.correctIndex, q.explain));
  const tfL2 = trueFalseQuestions("tf2").slice(0, 100).map((q) => mcExercise(nid(), q.prompt, q.options, q.correctIndex, q.explain));

  const plL1 = pluralQuestions("pl1").slice(0, 100).map((q) => mcExercise(nid(), q.prompt, q.options, q.correctIndex, q.explain));
  const plL2 = pluralQuestions("pl2").slice(0, 100).map((q) => mcExercise(nid(), q.prompt, q.options, q.correctIndex, q.explain));

  const en2deL1 = typingExercise(nid(), enToDeTyping("e1"));
  const en2deL2 = typingExercise(nid(), enToDeTyping("e2"));

  const gwmL1 = deToEnMc("m1").map((q) => mcExercise(nid(), q.prompt, q.options, q.correctIndex, q.explain));
  const gwmL2 = deToEnMc("m2").map((q) => mcExercise(nid(), q.prompt, q.options, q.correctIndex, q.explain));

  const gwTypL1 = typingExercise(nid(), deToEnTyping("t1"));
  const gwTypL2 = typingExercise(nid(), deToEnTyping("t2"));

  const src = [
    gameHeader("artikel-drop", "Artikel Drop", "🪂", "Catch falling German nouns by sending them to the right gate (der, die, or das) before they land. Fast arcade-style artikel practice that speeds up as you play.", "grammar", ["A1"]),
    artikelDropLevels.join("\n"),
    closeGame(),
    "\n",
    gameHeader("der-die-das-rules", "Der, Die, Das Rules", "📏", "Pick der, die, or das for each noun and learn the rule behind it, including suffixes like -ung and -chen plus meaning groups like days, months, and materials.", "grammar", ["A1"]),
    levelBlock("rules-1", "Level 1: Suffix rules", rulesLevel1.join("")),
    levelBlock("rules-2", "Level 2: Meaning groups", rulesLevel2.join("")),
    closeGame(),
    "\n",
    gameHeader("time-expressions", "German Time Expressions", "🕐", "Fill in the correct time preposition (um, am, im, in der, or none) and learn the rule behind each answer with instant explanations.", "grammar", ["A1", "A2"]),
    levelBlock("time-expr-1", "Level 1: um, am, im", timeL1.join("")),
    levelBlock("time-expr-2", "Level 2: Tricky cases", timeL2.join("")),
    closeGame(),
    "\n",
    gameHeader("dativ-prepositions", "Dativ Prepositions", "📍", "Fill in the correct preposition or article for Wohin?, Wo?, Woher? sentences. Learn Dativ with cities, buildings, shops, and more.", "grammar", ["A1", "A2"]),
    levelBlock("dativ-1", "Level 1: Cities and countries", datL1.join("")),
    levelBlock("dativ-2", "Level 2: Wo? and Wohin?", datL2.join("")),
    closeGame(),
    "\n",
    gameHeader("guess-word-from-image", "Guess the Word from Image", "🐶", "Look at an image and pick the correct German noun with its artikel, across animals and food & drink categories.", "vocabulary", ["A1"]),
    levelBlock("image-1", "Level 1: Animals", imgL1.join("")),
    levelBlock("image-2", "Level 2: Food, drink and more", imgL2.join("")),
    closeGame(),
    "\n",
    gameHeader("true-or-false-nouns", "True or False (Nouns)", "✅", "See a noun + artikel, plural or mixed statement and decide if it is correct or false. Fast-paced, mobile-friendly noun validation practice.", "grammar", ["A1", "A2"]),
    levelBlock("tf-1", "Level 1: Articles", tfL1.join("")),
    levelBlock("tf-2", "Level 2: Plurals", tfL2.join("")),
    closeGame(),
    "\n",
    gameHeader("noun-plurals", "German Noun Plurals", "🔢", "Learn German plural forms by clicking the correct option. Mobile-friendly multiple choice game.", "grammar", ["A1", "A2"]),
    levelBlock("plurals-1", "Level 1: Plurals", plL1.join("")),
    levelBlock("plurals-2", "Level 2: More plurals", plL2.join("")),
    closeGame(),
    "\n",
    gameHeader("english-nouns-to-german", "English Nouns to German", "📝", "See an English word and type the German translation with its artikel.", "vocabulary", ["A1"]),
    levelBlock("en2de-1", "Level 1: Nouns", en2deL1),
    levelBlock("en2de-2", "Level 2: More nouns", en2deL2),
    closeGame(),
    "\n",
    gameHeader("guess-word-mc", "Guess the Word (Multiple Choice)", "🔍", "See a German noun and click the correct English meaning. Mobile-friendly multiple choice game.", "vocabulary", ["A1"]),
    levelBlock("gwm-1", "Level 1: Nouns", gwmL1.join("")),
    levelBlock("gwm-2", "Level 2: More nouns", gwmL2.join("")),
    closeGame(),
    "\n",
    gameHeader("guess-word-typing", "Guess the Word", "⌨️", "Translate German nouns to English. See a German word with its article and type the English meaning.", "vocabulary", ["A1", "A2"]),
    levelBlock("gwt-1", "Level 1: Nouns", gwTypL1),
    levelBlock("gwt-2", "Level 2: More nouns", gwTypL2),
    closeGame(),
  ].join("");
  writeFileSync("content/games/noun-games.ts", src);
  console.log("noun-games.ts written");
}

// ---- case-detective.ts ----
{
  let id = 0;
  const nid = () => `cdx${String(++id).padStart(3, "0")}`;
  const blocks = [1, 2, 3, 4].map((l) => {
    const qs = caseQuestions(`cd:${l}`, l).slice(0, 100);
    return levelBlock(
      `case-detective-${l}`,
      `Level ${l}: ${l === 1 ? "Nominativ or Akkusativ?" : l === 2 ? "Dativ spotter" : l === 3 ? "Choose the form" : "Preposition detective"}`,
      qs.map((q) => mcExercise(nid(), q.prompt, q.options, q.correctIndex, q.explain)).join(""),
    );
  });
  const src = [
    gameHeader("case-detective", "Case Detective", "🕵️", "Spot the case: nominative, accusative, or dative? Be the grammar detective.", "grammar", ["A1", "A2"]),
    blocks.join("\n"),
    closeGame(),
  ].join("");
  writeFileSync("content/games/case-detective.ts", src);
  console.log("case-detective.ts written");
}

// ---- verb-games.ts (only regenerate the pool-driven games; conjugation data kept) ----
{
  let id = 0;
  const nid = () => `vg${String(++id).padStart(3, "0")}`;

  // conjugation typing: 3 levels x 100
  const conjLevels = [
    { level: 1, verbs: take([...new Set(REGULAR_VERBS.map((v) => v[0]))], 25, "cr"), persons: [0, 1, 2, 3] },
    { level: 2, verbs: take([...new Set(IRREGULAR_VERBS.map((v) => v[0]))], 25, "ci"), persons: [0, 1, 2, 3, 4, 5] },
    { level: 3, verbs: take(["essen", "lesen", "sehen", "fahren", "sprechen", "schlafen", "helfen", "nehmen", "laufen", "tragen", "halten", "waschen", "werfen", "geben", "treffen", "verlieren", "vergessen", "einladen", "einsteigen", "anrufen"], 20, "cv"), persons: [0, 1, 2, 3, 4] },
  ];

  const conjBlocks = conjLevels.map(({ level, verbs, persons }) => {
    const items: { prompt: string; accept: string[]; hint: string; audio: boolean }[] = [];
    for (const verb of verbs) {
      const forms = CONJ[verb];
      if (!forms) continue;
      for (const p of persons) {
        const personLabel = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"][p];
        items.push({ prompt: `${personLabel} · ${verb}`, accept: [forms[p]], hint: forms[p], audio: true });
      }
    }
    return levelBlock(`conj-${level}`, `Level ${level}: ${level === 1 ? "Regular verbs" : level === 2 ? "Irregular verbs" : "Vowel-changing verbs"}`, typingExercise(nid(), take(items, 100, `conj:${level}`)));
  });

  // conjugation MC: 2 levels x 100
  const conjMcLevels = [0, 1].map((level) => {
    const verbs = take(Object.keys(CONJ), 100, `cmc:${level}`);
    const qs = verbs.map((verb) => {
      const forms = CONJ[verb];
      const p = Math.floor(Math.abs(mulberryHash(`${verb}:${level}`)) % 6);
      const person = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"][p];
      const correct = forms[p];
      const distractorPool = Object.values(CONJ).map((f) => f[p]).filter((f) => f !== correct);
      const d1 = distractorPool[Math.floor(mulberryHash(`${verb}:a`) % distractorPool.length)];
      const d2 = distractorPool[Math.floor(mulberryHash(`${verb}:b`) % distractorPool.length)];
      const options = shuffle3(correct, d1, d2, `${verb}:${level}`);
      return mcExercise(nid(), `${person} ___ (${verb})`, options, options.indexOf(correct), `${verb} in the ${person} form is ${correct}.`);
    });
    return levelBlock(`conjmc-${level + 1}`, `Level ${level + 1}: Conjugation MC`, qs.join(""));
  });

  // conjugation full table: 2 levels x 100 (16 verbs x 6 persons + 4)
  const tableBlocks = [0, 1].map((level) => {
    const verbs = take(Object.keys(CONJ).filter((v) => !["möchten", "können", "müssen", "wollen", "dürfen", "sollen"].includes(v)), 17, `ct:${level}`);
    const items: { prompt: string; accept: string[]; hint: string; audio: boolean }[] = [];
    for (const verb of verbs) {
      const forms = CONJ[verb];
      for (let p = 0; p < 6; p++) {
        items.push({ prompt: `${verb} · ${["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"][p]}`, accept: [forms[p]], hint: forms[p], audio: true });
      }
    }
    return levelBlock(`conjtable-${level + 1}`, `Level ${level + 1}: Full tables`, typingExercise(nid(), take(items, 100, `ct:${level}`)));
  });

  // partizip II: 2 levels x 100 typing
  const partizipBlocks = [0, 1].map((level) => {
    const verbs = take(Object.keys(PARTIZIP), 100, `p2:${level}`);
    const items = verbs.map((v) => ({ prompt: v, accept: [PARTIZIP[v].form], hint: PARTIZIP[v].form, audio: true }));
    return levelBlock(`p2-${level + 1}`, `Level ${level + 1}: Partizip II`, typingExercise(nid(), items));
  });

  // partizip II aux: 2 levels x 100 MC
  const auxBlocks = [0, 1].map((level) => {
    const verbs = take(Object.keys(PARTIZIP), 100, `aux:${level}`);
    const qs = verbs.map((v) => {
      const { form, aux } = PARTIZIP[v];
      const other = aux === "haben" ? "bin" : "habe";
      const options = shuffle3(aux === "haben" ? "habe" : "bin", aux === "haben" ? "bin" : "habe", aux === "haben" ? "ist" : "hat", `${v}:aux`);
      return mcExercise(nid(), `Ich ___ ${form}.`, options, options.indexOf(aux === "haben" ? "habe" : "bin"), `${v} takes ${aux} in the Perfekt: Ich ${aux === "haben" ? "habe" : "bin"} ${form}.`);
    });
    return levelBlock(`p2aux-${level + 1}`, `Level ${level + 1}: haben or sein?`, qs.join(""));
  });

  // verbs en->de typing: 2 levels x 100
  const en2deV = [0, 1].map((level) => {
    const verbs = take(goetheVerbs, 100, `ve:${level}`);
    const items = verbs.map((v) => ({ prompt: v.en, accept: [v.de], hint: v.de }));
    return levelBlock(`ev2g-${level + 1}`, `Level ${level + 1}: English verbs to German`, typingExercise(nid(), items));
  });

  // verbs de->en typing: 2 levels x 100
  const de2enV = [0, 1].map((level) => {
    const verbs = take(goetheVerbs, 100, `vd:${level}`);
    const items = verbs.map((v) => ({ prompt: v.de, accept: [v.en.toLowerCase()], audio: true }));
    return levelBlock(`gv2e-${level + 1}`, `Level ${level + 1}: German verbs to English`, typingExercise(nid(), items));
  });

  // guess the verb MC: 2 levels x 100
  const guessVerbMc = [0, 1].map((level) => {
    const verbs = take(goetheVerbs, 100, `gm:${level}`);
    const qs = verbs.map((v) => {
      const others = take(goetheVerbs.filter((x) => x.de !== v.de), 5, `${v.de}:${level}`).map((x) => x.en);
      const options = unique3(v.en, others[0], others[1], others, `${v.de}:o`);
      return mcExercise(nid(), v.de, options, options.indexOf(v.en), `${v.de} means ${v.en}.`);
    });
    return levelBlock(`gvm-${level + 1}`, `Level ${level + 1}: Guess the verb`, qs.join(""));
  });

  // present to perfekt: 3 levels x 100
  const perfItems = [0, 1, 2].map((level) => {
    if (level === 0) {
      const verbs = take(Object.keys(PARTIZIP).filter((v) => PARTIZIP[v].aux === "haben"), 50, "pfh");
      const subjects = ["Ich", "Du", "Er", "Wir", "Sie"];
      const objects = ["Kaffee", "einen Apfel", "das Buch", "Musik", "Fußball", "einen Film", "die Hausaufgaben", "ein Brot", "einen Brief", "das Auto", "die Tür", "eine Jacke", "das Lied", "ein Geschenk", "den Schlüssel", "die Frage"];
      const items: { prompt: string; accept: string[]; hint: string; audio: boolean }[] = [];
      for (let i = 0; i < 100; i++) {
        const v = verbs[i % verbs.length];
        const form = PARTIZIP[v].form;
        const subj = subjects[i % subjects.length];
        const subjForm = subj === "Ich" ? "habe" : subj === "Du" ? "hast" : subj === "Er" ? "hat" : "haben";
        const obj = objects[(i + Math.floor(i / 4)) % objects.length];
        const prompt = `${subj} ${v} ${obj}.`;
        const past = `${subj} ${subjForm} ${form} ${obj}.`;
        items.push({ prompt, accept: [past.toLowerCase()], hint: past, audio: true });
      }
      return items;
    }
    if (level === 1) {
      const verbs = take(Object.keys(PARTIZIP).filter((v) => PARTIZIP[v].aux === "sein"), 30, "pfs");
      const subjects = ["Ich", "Du", "Er", "Wir", "Sie"];
      const places = ["nach Hause", "nach Berlin", "nach München", "in den Park", "in die Stadt", "zum Bahnhof", "ins Kino", "an den See", "in den Urlaub", "nach Hamburg", "zum Flughafen", "in die Schule"];
      const items: { prompt: string; accept: string[]; hint: string; audio: boolean }[] = [];
      for (let i = 0; i < 100; i++) {
        const v = verbs[i % verbs.length];
        const form = PARTIZIP[v].form;
        const subj = subjects[(i + 2) % subjects.length];
        const subjForm = subj === "Ich" ? "bin" : subj === "Du" ? "bist" : subj === "Er" ? "ist" : "sind";
        const place = places[(i + Math.floor(i / 5)) % places.length];
        const prompt = `${subj} ${v} ${place}.`;
        const past = `${subj} ${subjForm} ${form} ${place}.`;
        items.push({ prompt, accept: [past.toLowerCase()], hint: past, audio: true });
      }
      return items;
    }
    const adjectives = ["müde", "glücklich", "krank", "traurig", "froh", "nervös", "sauer", "zufrieden"];
    const things = ["ein Auto", "ein Haus", "eine Frage", "eine Idee", "einen Termin", "einen Hund", "eine Schwester", "ein Problem", "Hunger", "Zeit", "ein Buch", "eine Wohnung"];
    const actions = ["schwimmen", "arbeiten", "kommen", "gehen", "fahren", "helfen", "lesen", "sprechen", "kochen", "tanzen", "singen", "laufen"];
    const items: { prompt: string; accept: string[]; hint: string; audio: boolean }[] = [];
    for (let i = 0; i < 100; i++) {
      const type = i % 3;
      const subj = ["Ich", "Du", "Er", "Wir", "Sie"][i % 5];
      if (type === 0) {
        const adj = adjectives[i % adjectives.length];
        const was = subj === "Ich" ? "war" : subj === "Du" ? "warst" : subj === "Er" ? "war" : "waren";
        items.push({ prompt: `${subj} bin ${adj}.`, accept: [`${subj === "Du" ? "du" : subj === "Er" ? "er" : subj === "Wir" ? "wir" : subj === "Sie" ? "sie" : "ich"} ${was} ${adj}`.toLowerCase()], hint: `${subj} ${was} ${adj}.`, audio: true });
      } else if (type === 1) {
        const thing = things[i % things.length];
        const had = subj === "Ich" ? "hatte" : subj === "Du" ? "hattest" : subj === "Er" ? "hatte" : "hatten";
        items.push({ prompt: `${subj} habe ${thing}.`, accept: [`${subj === "Du" ? "du" : subj === "Er" ? "er" : subj === "Wir" ? "wir" : subj === "Sie" ? "sie" : "ich"} ${had} ${thing}`.toLowerCase()], hint: `${subj} ${had} ${thing}.`, audio: true });
      } else {
        const action = actions[i % actions.length];
        const could = subj === "Ich" ? "konnte" : subj === "Du" ? "konntest" : subj === "Er" ? "konnte" : "konnten";
        items.push({ prompt: `${subj} kann ${action}.`, accept: [`${subj === "Du" ? "du" : subj === "Er" ? "er" : subj === "Wir" ? "wir" : subj === "Sie" ? "sie" : "ich"} ${could} ${action}`.toLowerCase()], hint: `${subj} ${could} ${action}.`, audio: true });
      }
    }
    return items;
  });
  const perfBlocks = perfItems.map((items, level) =>
    levelBlock(`p2p-${level + 1}`, `Level ${level + 1}: ${level === 2 ? "Präteritum (sein, haben, modals)" : level === 1 ? "Perfekt with sein" : "Perfekt with haben"}`, typingExercise(nid(), items)),
  );

  function mulberryHash(s: string): number {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return Math.abs(h);
  }

  const src = [
    gameHeader("verb-conjugation", "Verb Conjugation", "🔤", "Practice conjugating German verbs in present tense for the persons that change: ich, du, er/sie/es, ihr.", "grammar", ["A1"]),
    conjBlocks.join("\n"),
    closeGame(),
    "\n",
    gameHeader("verb-conjugation-mc", "Verb Conjugation (Multiple Choice)", "🎯", "Click the correct conjugation for German verbs. Mobile-friendly multiple choice version.", "grammar", ["A1"]),
    conjMcLevels.join("\n"),
    closeGame(),
    "\n",
    gameHeader("verb-conjugation-full-table", "Verb Conjugation Full Table", "📊", "Fill in the complete conjugation table for German verbs, all six person forms at once for deeper practice.", "grammar", ["A1", "A2"]),
    tableBlocks.join("\n"),
    closeGame(),
    "\n",
    gameHeader("partizip-ii", "German Past Tense (Partizip II) Practice", "⏪", "Type the Partizip II (past participle) for each German verb and pick the correct auxiliary (haben or sein) for the Perfekt tense.", "grammar", ["A1", "A2"]),
    partizipBlocks.join("\n"),
    auxBlocks.join("\n"),
    closeGame(),
    "\n",
    gameHeader("english-verbs-to-german", "English Verbs to German", "🔄", "See an English verb meaning and type the German infinitive form. Reverse translation practice.", "grammar", ["A1"]),
    en2deV.join("\n"),
    closeGame(),
    "\n",
    gameHeader("guess-the-verb-mc", "Guess the Verb (Multiple Choice)", "🧠", "See a German verb and click the correct English meaning. Mobile-friendly multiple choice game.", "grammar", ["A1"]),
    guessVerbMc.join("\n"),
    closeGame(),
    "\n",
    gameHeader("german-verbs-to-english", "German Verbs to English", "📖", "See a German verb and type its English meaning. Perfect for building vocabulary.", "grammar", ["A1", "A2"]),
    de2enV.join("\n"),
    closeGame(),
    "\n",
    gameHeader("present-to-perfekt", "Present to Perfekt", "⏱️", "Type each present-tense sentence in the past tense: Perfekt with haben or sein, or Präteritum for sein, haben and modal verbs.", "grammar", ["A1", "A2"]),
    perfBlocks.join("\n"),
    closeGame(),
  ].join("");
  writeFileSync("content/games/verb-games.ts", src);
  console.log("verb-games.ts written");
}

// ---- number-games.ts ----
{
  let id = 0;
  const nid = () => `num${String(++id).padStart(3, "0")}`;

  const dropLevels = [1, 2, 3].map((l) => {
    // Each level = 10 rounds; each round is one decade with its 10 gates.
    const startDecade = l === 1 ? 0 : l === 2 ? 100 : 200;
    const rounds: string[] = [];
    for (let r = 0; r < 10; r++) {
      const decade = startDecade + r * 10;
      const nums = Array.from({ length: 10 }, (_, i) => decade + i);
      const gates = nums.map((n) => String(n));
      const items = seededShuffle(nums, `nd:${l}:${r}`).map((n) => ({ text: germanNumberWord(n), gateId: String(n) }));
      rounds.push(`        {
          kind: "drop",
          title: ${JSON.stringify(`Round ${r + 1}: ${decade}–${decade + 9}`)},
          instruction: ${JSON.stringify("Send each number word to its gate before it lands.")},
          fallMs: ${4000 - (l - 1) * 400 - r * 100},
          gates: [${gates.map((g) => `{ id: ${JSON.stringify(g)}, label: ${JSON.stringify(g)} }`).join(", ")}],
          items: [
${items.map((it) => `            { text: ${JSON.stringify(it.text)}, gateId: ${JSON.stringify(it.gateId)} },`).join("\n")}
          ],
        },
`);
    }
    return levelBlock(`numdrop-${l}`, `Level ${l}: ${l === 1 ? "0–99" : l === 2 ? "100–199" : "200–299"}`, rounds.join(""));
  });

  const mathLevels = [1, 2, 3].map((l) => levelBlock(`math-${l}`, `Level ${l}: ${l === 1 ? "+ and −" : l === 2 ? "×" : "÷"}`, typingExercise(nid(), mathQuestions("math", l))));

  const keypadLevels = [1, 2, 3].map((l) => {
    const range = l === 1 ? NUM_RANGES["0-99"] : l === 2 ? NUM_RANGES["100-999"] : NUM_RANGES["1000-9999"];
    return levelBlock(
      `numtap-${l}`,
      `Level ${l}: ${l === 1 ? "0–99" : l === 2 ? "100–999" : "1000–9999"}`,
      `        {
          kind: "keypad",
          title: ${JSON.stringify("Number Tap")},
          instruction: ${JSON.stringify("Read the word and tap the matching number.")},
          items: [
${keypadItems(`kt:${l}`, range).map((it) => `            { word: ${JSON.stringify(it.word)}, target: ${it.target} },`).join("\n")}
          ],
        },
`,
    );
  });

  const timeShort = timeShortFormItems("tsf");
  const tsfLevels = [0, 1].map((l) => {
    const qs = take(timeShort, 100, `tsf:${l}`);
    return levelBlock(`tsf-${l + 1}`, `Level ${l + 1}: Short forms`, qs.map((q) => mcExercise(nid(), q.prompt, q.options, q.correctIndex, q.explain)).join(""));
  });

  const timeItems = timePatternItems("time");
  const timeLevels = [0, 1, 2].map((l) => levelBlock(`time-${l + 1}`, `Level ${l + 1}: ${l === 0 ? "Full hours and half" : l === 1 ? "nach and vor" : "halbs and quarters"}`, typingExercise(nid(), take(timeItems, 100, `t:${l}`).map((it) => ({ prompt: `${Math.floor(it.minutes / 60)}:${String(it.minutes % 60).padStart(2, "0")} Uhr?`, accept: it.accept, hint: it.hint })))));

  const w2n = [1, 2, 3].map((l) => levelBlock(`w2n-${l}`, `Level ${l}: ${l === 1 ? "0–99" : l === 2 ? "100–999" : "1000–9999"}`, typingExercise(nid(), wordNumberItems(`w2n:${l}`, l === 1 ? NUM_RANGES["0-99"] : l === 2 ? NUM_RANGES["100-999"] : NUM_RANGES["1000-9999"], l))));
  const n2w = [1, 2, 3].map((l) => levelBlock(`n2w-${l}`, `Level ${l}: ${l === 1 ? "0–99" : l === 2 ? "100–999" : "1000–9999"}`, typingExercise(nid(), numberWordItems(`n2w:${l}`, l === 1 ? NUM_RANGES["0-99"] : l === 2 ? NUM_RANGES["100-999"] : NUM_RANGES["1000-9999"], l))));

  const src = [
    gameHeader("number-drop", "Number Drop", "🌧️", "German number words rush toward you from the distance. Send each one to the gate with the matching numeral before it gets too close. Fast arcade-style number practice that speeds up as you play.", "grammar", ["A1"]),
    dropLevels.join("\n"),
    closeGame(),
    "\n",
    gameHeader("math-in-german", "Math in German", "🧮", "Solve calculations and build the result as a German word. The sum is shown as numerals (8 × 4) or in German words (acht mal vier).", "grammar", ["A1", "A2"]),
    mathLevels.join("\n"),
    closeGame(),
    "\n",
    gameHeader("number-tap", "Number Tap Game", "🔢", "See a German number word and tap the correct number on the keypad. Mobile-friendly number practice.", "grammar", ["A1"]),
    keypadLevels.join("\n"),
    closeGame(),
    "\n",
    gameHeader("time-short-form", "Time Short Form Game", "⏰", "Practice German time with short forms: nach, vor, halb, viertel, and punkt.", "grammar", ["A1", "A2"]),
    tsfLevels.join("\n"),
    closeGame(),
    "\n",
    gameHeader("german-time", "German Time Game", "🕑", "Learn to tell time in German by reading analog clocks and typing time expressions.", "grammar", ["A1", "A2"]),
    timeLevels.join("\n"),
    closeGame(),
    "\n",
    gameHeader("words-to-numbers", "Words to Numbers Game", "➡️", "Practice recognizing German number words and converting them to digits.", "grammar", ["A1", "A2"]),
    w2n.join("\n"),
    closeGame(),
    "\n",
    gameHeader("numbers-to-words", "Numbers to Words Game", "⬅️", "See a number and type the German word. Perfect for learning German number vocabulary.", "grammar", ["A1", "A2"]),
    n2w.join("\n"),
    closeGame(),
  ].join("");
  writeFileSync("content/games/number-games.ts", src);
  console.log("number-games.ts written");
}

// ---- vocab-games.ts ----
{
  let id = 0;
  const nid = () => `vc${String(++id).padStart(3, "0")}`;

  const sentLevels = [0, 1, 2].map((l) => {
    const sentences = take(exampleSentences, 100, `se:${l}`);
    const items = sentences.map((s) => ({
      prompt: s.de,
      accept: [s.en.toLowerCase()],
      hint: s.en,
      audio: true,
    }));
    return levelBlock(`s2e-${l + 1}`, `Level ${l + 1}: Sentences`, typingExercise(nid(), items));
  });

  const salatLevels = [1, 2, 3].map((l) => {
    const rounds: string[] = [];
    const words = wordsearchWords(`ws:${l}`, l);
    for (let r = 0; r < 10; r++) {
      const ten = take(words, 10, `ws:${l}:${r}`);
      rounds.push(`        {
          kind: "wordsearch",
          title: ${JSON.stringify(`Puzzle ${r + 1}`)},
          instruction: ${JSON.stringify("Tap the first and last letter of each hidden word.")},
          words: ${JSON.stringify(ten)},
        },
`);
    }
    return levelBlock(`salat-${l}`, `Level ${l}: ${l === 1 ? "Basics" : l === 2 ? "Around the house" : "Places"}`, rounds.join(""));
  });

  const hangLevels = [1, 2, 3].map((l) => levelBlock(`hangman-${l}`, `Level ${l}: ${l === 1 ? "Short words" : l === 2 ? "Medium words" : "Long words"}`, `        {
          kind: "hangman",
          title: ${JSON.stringify("Hangman")},
          instruction: ${JSON.stringify("Guess the letters of the hidden word.")},
          words: ${JSON.stringify(hangmanWords(`hg:${l}`, l))},
        },
`));

  const src = [
    gameHeader("sentence-to-english", "German to English Sentence", "💬", "Read a German sentence and type its English translation. Practise reading comprehension at A1 or A2 level.", "mixed", ["A1", "A2"]),
    sentLevels.join("\n"),
    closeGame(),
    "\n",
    gameHeader("buchstabensalat", "Word Salad Game (Buchstabensalat)", "🥗", "Unscramble the jumbled letters to find the German word! A fun word puzzle game to test your vocabulary.", "vocabulary", ["A1", "A2"]),
    salatLevels.join("\n"),
    closeGame(),
    "\n",
    gameHeader("word-guessing", "Word Guessing Game", "🙋", "Guess German words letter by letter (hangman style)! Games continue until you lose, and you accumulate points for each word.", "vocabulary", ["A1", "A2"]),
    hangLevels.join("\n"),
    closeGame(),
  ].join("");
  writeFileSync("content/games/vocab-games.ts", src);
  console.log("vocab-games.ts written");
}

// ---- scramble.ts / grid-match.ts / wordle.ts ----
{
  let id = 0;
  const nid = () => `sw${String(++id).padStart(3, "0")}`;
  const scrambleLevels = [1, 2, 3].map((l) => {
    const items = scrambleItems(`sc:${l}`, l);
    const rounds: string[] = [];
    for (let r = 0; r < 4; r++) {
      rounds.push(`        {
          kind: "scramble",
          title: ${JSON.stringify(`Round ${r + 1}`)},
          instruction: ${JSON.stringify("Tap the letter tiles to spell the word. Beat the clock!")},
          items: ${JSON.stringify(take(items, 25, `sc:${l}:${r}`))},
        },
`);
    }
    return levelBlock(`nine-words-${l}`, `Level ${l}: ${l === 1 ? "Short words" : l === 2 ? "Medium words" : "Long words"}`, rounds.join(""));
  });

  const gridLevels = [1, 2, 3].map((l) => {
    const pairs = gridPairs(`gm:${l}`, l);
    const rounds: string[] = [];
    for (let r = 0; r < 10; r++) {
      rounds.push(`        {
          kind: "grid-match",
          title: ${JSON.stringify(`Grid ${r + 1}`)},
          instruction: ${JSON.stringify("Tap a German word, then its English match.")},
          timeLimit: ${45 - (l - 1) * 5},
          pairs: ${JSON.stringify(take(pairs, 10, `gm:${l}:${r}`))},
        },
`);
    }
    return levelBlock(`grid-match-${l}`, `Level ${l}: ${l === 1 ? "Nouns" : l === 2 ? "More nouns" : "Longer words"}`, rounds.join(""));
  });

  const src = [
    gameHeader("nine-words", "9 Words", "🧩", "Nine scrambled German words, 30 seconds each. Tap the letters in the right order before the clock runs out.", "vocabulary", ["A1", "A2"]),
    scrambleLevels.join("\n"),
    closeGame(),
    "\n",
    gameHeader("word-match-grid", "Word Match Grid", "🔗", "Tap matching German and English tiles in a single grid to clear the board. Beat the clock across rounds that get faster each time!", "vocabulary", ["A1", "A2"]),
    gridLevels.join("\n"),
    closeGame(),
  ].join("");
  writeFileSync("content/games/scramble.ts", src);
  console.log("scramble.ts written");
}

// wordle pools expanded
{
  const words = fiveLetterWords("wordle");
  const src = `import type { Game } from "./schema";

/** Five-letter German words. Umlauts count as single letters. */
export const wordleGame: Game = {
  id: "german-wordle",
  title: "German Wordle",
  emoji: "🟩",
  description:
    "Guess the 5-letter German word in six tries. Green = right spot, yellow = wrong spot, grey = not in the word.",
  category: "vocabulary",
  tags: ["A1", "A2"],
  levels: [
${[0, 1, 2]
  .map(
    (l) => `    {
      id: "wordle-${l + 1}",
      title: "Level ${l + 1}: ${l === 0 ? "Everyday words" : l === 1 ? "Verbs and actions" : "Nouns and umlauts"}",
      rounds: [
        {
          kind: "wordle",
          title: "Wordle",
          instruction: "Guess the 5-letter German word.",
          plays: 5,
          words: ${JSON.stringify(take(words, 35, `wl:${l}`))},
        },
      ],
    },
`,
  )
  .join("")}
  ],
};
`;
  writeFileSync("content/games/wordle.ts", src);
  console.log("wordle.ts written");
}

console.log("done");