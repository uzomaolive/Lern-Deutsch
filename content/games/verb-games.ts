import type { Game } from "./schema";

export const verbConjugationGame: Game = {
  id: "verb-conjugation",
  title: "Verb Conjugation",
  emoji: "🔤",
  description:
    "Practice conjugating German verbs in present tense for the persons that change: ich, du, er/sie/es, ihr.",
  category: "grammar",
  tags: ["A1"],
  levels: [
    {
      id: "conj-1",
      title: "Level 1: Regular verbs",
      rounds: [
        {
          kind: "typing",
          title: "Present tense: machen, spielen, wohnen",
          instruction: "Type the conjugated form for the given person.",
          items: [
            { prompt: "ich · machen", accept: ["mache"], hint: "mache", audio: true },
            { prompt: "du · machen", accept: ["machst"], hint: "machst", audio: true },
            { prompt: "er · machen", accept: ["macht"], hint: "macht", audio: true },
            { prompt: "ihr · machen", accept: ["macht"], hint: "macht", audio: true },
            { prompt: "ich · spielen", accept: ["spiele"], hint: "spiele", audio: true },
            { prompt: "du · spielen", accept: ["spielst"], hint: "spielst", audio: true },
            { prompt: "er · spielen", accept: ["spielt"], hint: "spielt", audio: true },
            { prompt: "ihr · spielen", accept: ["spielt"], hint: "spielt", audio: true },
            { prompt: "ich · wohnen", accept: ["wohne"], hint: "wohne", audio: true },
            { prompt: "du · wohnen", accept: ["wohnst"], hint: "wohnst", audio: true },
            { prompt: "er · wohnen", accept: ["wohnt"], hint: "wohnt", audio: true },
            { prompt: "ihr · wohnen", accept: ["wohnt"], hint: "wohnt", audio: true },
          ],
        },
      ],
    },
    {
      id: "conj-2",
      title: "Level 2: Irregular verbs",
      rounds: [
        {
          kind: "typing",
          title: "Present tense: sein, haben",
          instruction: "Type the conjugated form for the given person.",
          items: [
            { prompt: "ich · sein", accept: ["bin"], hint: "bin", audio: true },
            { prompt: "du · sein", accept: ["bist"], hint: "bist", audio: true },
            { prompt: "er · sein", accept: ["ist"], hint: "ist", audio: true },
            { prompt: "wir · sein", accept: ["sind"], hint: "sind", audio: true },
            { prompt: "ihr · sein", accept: ["seid"], hint: "seid", audio: true },
            { prompt: "sie · sein", accept: ["sind"], hint: "sind", audio: true },
            { prompt: "ich · haben", accept: ["habe"], hint: "habe", audio: true },
            { prompt: "du · haben", accept: ["hast"], hint: "hast", audio: true },
            { prompt: "er · haben", accept: ["hat"], hint: "hat", audio: true },
            { prompt: "ihr · haben", accept: ["habt"], hint: "habt", audio: true },
            { prompt: "ich · werden", accept: ["werde"], hint: "werde", audio: true },
            { prompt: "du · werden", accept: ["wirst"], hint: "wirst", audio: true },
          ],
        },
      ],
    },
    {
      id: "conj-3",
      title: "Level 3: Vowel-changing verbs",
      rounds: [
        {
          kind: "typing",
          title: "Present tense: essen, lesen, fahren",
          instruction: "Type the conjugated form for the given person.",
          items: [
            { prompt: "ich · essen", accept: ["esse"], hint: "esse", audio: true },
            { prompt: "du · essen", accept: ["isst"], hint: "isst", audio: true },
            { prompt: "er · essen", accept: ["isst"], hint: "isst", audio: true },
            { prompt: "ich · lesen", accept: ["lese"], hint: "lese", audio: true },
            { prompt: "du · lesen", accept: ["liest"], hint: "liest", audio: true },
            { prompt: "er · lesen", accept: ["liest"], hint: "liest", audio: true },
            { prompt: "ich · fahren", accept: ["fahre"], hint: "fahre", audio: true },
            { prompt: "du · fahren", accept: ["fährst", "faehrst"], hint: "fährst", audio: true },
            { prompt: "er · fahren", accept: ["fährt", "faehrt"], hint: "fährt", audio: true },
            { prompt: "ich · sprechen", accept: ["spreche"], hint: "spreche", audio: true },
            { prompt: "du · sprechen", accept: ["sprichst"], hint: "sprichst", audio: true },
            { prompt: "er · sprechen", accept: ["spricht"], hint: "spricht", audio: true },
          ],
        },
      ],
    },
  ],
};

export const verbConjugationMcGame: Game = {
  id: "verb-conjugation-mc",
  title: "Verb Conjugation (Multiple Choice)",
  emoji: "🎯",
  description:
    "Click the correct conjugation for German verbs. Mobile-friendly multiple choice version.",
  category: "grammar",
  tags: ["A1"],
  levels: [
    {
      id: "conjmc-1",
      title: "Level 1: Regular verbs",
      rounds: [
        {
          kind: "exercise",
          exercise: {
            id: "conjmc-1a",
            type: "multiple-choice",
            title: "Conjugation MC",
            instruction: "Choose the correct form.",
            prompt: "ich ___ (machen)",
            options: ["mache", "machst", "macht"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "conjmc-1b",
            type: "multiple-choice",
            title: "Conjugation MC",
            instruction: "Choose the correct form.",
            prompt: "du ___ (spielen)",
            options: ["spielst", "spiele", "spielt"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "conjmc-1c",
            type: "multiple-choice",
            title: "Conjugation MC",
            instruction: "Choose the correct form.",
            prompt: "er ___ (wohnen)",
            options: ["wohnt", "wohne", "wohnst"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "conjmc-1d",
            type: "multiple-choice",
            title: "Conjugation MC",
            instruction: "Choose the correct form.",
            prompt: "wir ___ (lernen)",
            options: ["lernen", "lernst", "lerne"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "conjmc-1e",
            type: "multiple-choice",
            title: "Conjugation MC",
            instruction: "Choose the correct form.",
            prompt: "ihr ___ (kaufen)",
            options: ["kauft", "kaufst", "kaufe"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "conjmc-1f",
            type: "multiple-choice",
            title: "Conjugation MC",
            instruction: "Choose the correct form.",
            prompt: "sie ___ (arbeiten)",
            options: ["arbeiten", "arbeitst", "arbeitet"],
            correctIndex: 0,
          },
        },
      ],
    },
    {
      id: "conjmc-2",
      title: "Level 2: Irregular verbs",
      rounds: [
        {
          kind: "exercise",
          exercise: {
            id: "conjmc-2a",
            type: "multiple-choice",
            title: "Conjugation MC",
            instruction: "Choose the correct form.",
            prompt: "ich ___ (sein)",
            options: ["bin", "bist", "ist"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "conjmc-2b",
            type: "multiple-choice",
            title: "Conjugation MC",
            instruction: "Choose the correct form.",
            prompt: "du ___ (haben)",
            options: ["hast", "habe", "hat"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "conjmc-2c",
            type: "multiple-choice",
            title: "Conjugation MC",
            instruction: "Choose the correct form.",
            prompt: "er ___ (werden)",
            options: ["wird", "werde", "wirst"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "conjmc-2d",
            type: "multiple-choice",
            title: "Conjugation MC",
            instruction: "Choose the correct form.",
            prompt: "wir ___ (sein)",
            options: ["sind", "seid", "sindt"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "conjmc-2e",
            type: "multiple-choice",
            title: "Conjugation MC",
            instruction: "Choose the correct form.",
            prompt: "du ___ (essen)",
            options: ["isst", "esst", "esse"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "conjmc-2f",
            type: "multiple-choice",
            title: "Conjugation MC",
            instruction: "Choose the correct form.",
            prompt: "er ___ (lesen)",
            options: ["liest", "lest", "lese"],
            correctIndex: 0,
          },
        },
      ],
    },
  ],
};

export const conjugationTableGame: Game = {
  id: "verb-conjugation-full-table",
  title: "Verb Conjugation Full Table",
  emoji: "📊",
  description:
    "Fill in the complete conjugation table for German verbs, all six person forms at once for deeper practice.",
  category: "grammar",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "conjtable-1",
      title: "Level 1: sein, haben, werden",
      rounds: [
        {
          kind: "typing",
          title: "Full table: sein, haben, werden",
          instruction: "Type each person form of the verb.",
          items: [
            { prompt: "sein · ich", accept: ["bin"], hint: "bin", audio: true },
            { prompt: "sein · du", accept: ["bist"], hint: "bist", audio: true },
            { prompt: "sein · er/sie/es", accept: ["ist"], hint: "ist", audio: true },
            { prompt: "sein · wir", accept: ["sind"], hint: "sind", audio: true },
            { prompt: "sein · ihr", accept: ["seid"], hint: "seid", audio: true },
            { prompt: "sein · sie/Sie", accept: ["sind"], hint: "sind", audio: true },
            { prompt: "haben · ich", accept: ["habe"], hint: "habe", audio: true },
            { prompt: "haben · du", accept: ["hast"], hint: "hast", audio: true },
            { prompt: "haben · er/sie/es", accept: ["hat"], hint: "hat", audio: true },
            { prompt: "haben · wir", accept: ["haben"], hint: "haben", audio: true },
            { prompt: "haben · ihr", accept: ["habt"], hint: "habt", audio: true },
            { prompt: "haben · sie/Sie", accept: ["haben"], hint: "haben", audio: true },
          ],
        },
      ],
    },
    {
      id: "conjtable-2",
      title: "Level 2: gehen, kommen",
      rounds: [
        {
          kind: "typing",
          title: "Full table: gehen, kommen",
          instruction: "Type each person form of the verb.",
          items: [
            { prompt: "gehen · ich", accept: ["gehe"], hint: "gehe", audio: true },
            { prompt: "gehen · du", accept: ["gehst"], hint: "gehst", audio: true },
            { prompt: "gehen · er/sie/es", accept: ["geht"], hint: "geht", audio: true },
            { prompt: "gehen · wir", accept: ["gehen"], hint: "gehen", audio: true },
            { prompt: "gehen · ihr", accept: ["geht"], hint: "geht", audio: true },
            { prompt: "gehen · sie/Sie", accept: ["gehen"], hint: "gehen", audio: true },
            { prompt: "kommen · ich", accept: ["komme"], hint: "komme", audio: true },
            { prompt: "kommen · du", accept: ["kommst"], hint: "kommst", audio: true },
            { prompt: "kommen · er/sie/es", accept: ["kommt"], hint: "kommt", audio: true },
            { prompt: "kommen · wir", accept: ["kommen"], hint: "kommen", audio: true },
            { prompt: "kommen · ihr", accept: ["kommt"], hint: "kommt", audio: true },
            { prompt: "kommen · sie/Sie", accept: ["kommen"], hint: "kommen", audio: true },
          ],
        },
      ],
    },
  ],
};

export const partizipIIGame: Game = {
  id: "partizip-ii",
  title: "German Past Tense (Partizip II) Practice",
  emoji: "⏪",
  description:
    "Type the Partizip II (past participle) for each German verb and pick the correct auxiliary (haben or sein) for the Perfekt tense.",
  category: "grammar",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "p2-1",
      title: "Level 1: Partizip II",
      rounds: [
        {
          kind: "typing",
          title: "Partizip II",
          instruction: "Type the past participle of the verb.",
          items: [
            { prompt: "machen → ___", accept: ["gemacht"], hint: "gemacht", audio: true },
            { prompt: "spielen → ___", accept: ["gespielt"], hint: "gespielt", audio: true },
            { prompt: "wohnen → ___", accept: ["gewohnt"], hint: "gewohnt", audio: true },
            { prompt: "lernen → ___", accept: ["gelernt"], hint: "gelernt", audio: true },
            { prompt: "kaufen → ___", accept: ["gekauft"], hint: "gekauft", audio: true },
            { prompt: "arbeiten → ___", accept: ["gearbeitet"], hint: "gearbeitet", audio: true },
            { prompt: "trinken → ___", accept: ["getrunken"], hint: "getrunken", audio: true },
            { prompt: "essen → ___", accept: ["gegessen"], hint: "gegessen", audio: true },
            { prompt: "lesen → ___", accept: ["gelesen"], hint: "gelesen", audio: true },
            { prompt: "sehen → ___", accept: ["gesehen"], hint: "gesehen", audio: true },
            { prompt: "sprechen → ___", accept: ["gesprochen"], hint: "gesprochen", audio: true },
            { prompt: "nehmen → ___", accept: ["genommen"], hint: "genommen", audio: true },
          ],
        },
      ],
    },
    {
      id: "p2-2",
      title: "Level 2: sein-verbs",
      rounds: [
        {
          kind: "typing",
          title: "Partizip II with sein",
          instruction: "Type the past participle of the verb.",
          items: [
            { prompt: "gehen → ___", accept: ["gegangen"], hint: "gegangen", audio: true },
            { prompt: "kommen → ___", accept: ["gekommen"], hint: "gekommen", audio: true },
            { prompt: "fahren → ___", accept: ["gefahren"], hint: "gefahren", audio: true },
            { prompt: "laufen → ___", accept: ["gelaufen"], hint: "gelaufen", audio: true },
            { prompt: "fliegen → ___", accept: ["geflogen"], hint: "geflogen", audio: true },
            { prompt: "sein → ___", accept: ["gewesen"], hint: "gewesen", audio: true },
            { prompt: "schwimmen → ___", accept: ["geschwommen"], hint: "geschwommen", audio: true },
            { prompt: "bleiben → ___", accept: ["geblieben"], hint: "geblieben", audio: true },
          ],
        },
      ],
    },
    {
      id: "p2-3",
      title: "Level 3: haben or sein?",
      rounds: [
        {
          kind: "exercise",
          exercise: {
            id: "p2-3a",
            type: "multiple-choice",
            title: "haben or sein?",
            instruction: "Which auxiliary does the Perfekt use?",
            prompt: "Ich ___ gefahren.",
            options: ["bin", "habe"],
            correctIndex: 0,
            explain: "Movement verbs take sein: Ich bin gefahren.",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "p2-3b",
            type: "multiple-choice",
            title: "haben or sein?",
            instruction: "Which auxiliary does the Perfekt use?",
            prompt: "Ich ___ gegessen.",
            options: ["habe", "bin"],
            correctIndex: 0,
            explain: "Action verbs take haben: Ich habe gegessen.",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "p2-3c",
            type: "multiple-choice",
            title: "haben or sein?",
            instruction: "Which auxiliary does the Perfekt use?",
            prompt: "Wir ___ gekommen.",
            options: ["sind", "haben"],
            correctIndex: 0,
            explain: "kommen takes sein: Wir sind gekommen.",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "p2-3d",
            type: "multiple-choice",
            title: "haben or sein?",
            instruction: "Which auxiliary does the Perfekt use?",
            prompt: "Sie ___ getrunken.",
            options: ["hat", "ist"],
            correctIndex: 0,
            explain: "trinken takes haben: Sie hat getrunken.",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "p2-3e",
            type: "multiple-choice",
            title: "haben or sein?",
            instruction: "Which auxiliary does the Perfekt use?",
            prompt: "Er ___ gegangen.",
            options: ["ist", "hat"],
            correctIndex: 0,
            explain: "gehen takes sein: Er ist gegangen.",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "p2-3f",
            type: "multiple-choice",
            title: "haben or sein?",
            instruction: "Which auxiliary does the Perfekt use?",
            prompt: "Ich ___ geschlafen.",
            options: ["habe", "bin"],
            correctIndex: 0,
            explain: "schlafen takes haben: Ich habe geschlafen.",
          },
        },
      ],
    },
  ],
};

export const englishVerbsToGermanGame: Game = {
  id: "english-verbs-to-german",
  title: "English Verbs to German",
  emoji: "🔄",
  description:
    "See an English verb meaning and type the German infinitive form. Reverse translation practice.",
  category: "grammar",
  tags: ["A1"],
  levels: [
    {
      id: "ev2g-1",
      title: "Level 1: Common verbs",
      rounds: [
        {
          kind: "typing",
          title: "English verbs to German",
          instruction: "Type the German infinitive.",
          items: [
            { prompt: "to eat", accept: ["essen"], hint: "essen", audio: true },
            { prompt: "to drink", accept: ["trinken"], hint: "trinken", audio: true },
            { prompt: "to go", accept: ["gehen"], hint: "gehen", audio: true },
            { prompt: "to come", accept: ["kommen"], hint: "kommen", audio: true },
            { prompt: "to make / to do", accept: ["machen"], hint: "machen", audio: true },
            { prompt: "to play", accept: ["spielen"], hint: "spielen", audio: true },
            { prompt: "to read", accept: ["lesen"], hint: "lesen", audio: true },
            { prompt: "to see", accept: ["sehen"], hint: "sehen", audio: true },
            { prompt: "to buy", accept: ["kaufen"], hint: "kaufen", audio: true },
            { prompt: "to live", accept: ["wohnen", "leben"], hint: "wohnen", audio: true },
            { prompt: "to learn", accept: ["lernen"], hint: "lernen", audio: true },
            { prompt: "to speak", accept: ["sprechen"], hint: "sprechen", audio: true },
          ],
        },
      ],
    },
    {
      id: "ev2g-2",
      title: "Level 2: Everyday actions",
      rounds: [
        {
          kind: "typing",
          title: "English verbs to German",
          instruction: "Type the German infinitive.",
          items: [
            { prompt: "to sleep", accept: ["schlafen"], hint: "schlafen", audio: true },
            { prompt: "to drive", accept: ["fahren"], hint: "fahren", audio: true },
            { prompt: "to help", accept: ["helfen"], hint: "helfen", audio: true },
            { prompt: "to work", accept: ["arbeiten"], hint: "arbeiten", audio: true },
            { prompt: "to run", accept: ["laufen", "rennen"], hint: "laufen", audio: true },
            { prompt: "to fly", accept: ["fliegen"], hint: "fliegen", audio: true },
            { prompt: "to take", accept: ["nehmen"], hint: "nehmen", audio: true },
            { prompt: "to write", accept: ["schreiben"], hint: "schreiben", audio: true },
            { prompt: "to cook", accept: ["kochen"], hint: "kochen", audio: true },
            { prompt: "to sing", accept: ["singen"], hint: "singen", audio: true },
            { prompt: "to dance", accept: ["tanzen"], hint: "tanzen", audio: true },
            { prompt: "to wait", accept: ["warten"], hint: "warten", audio: true },
          ],
        },
      ],
    },
  ],
};

export const guessVerbMcGame: Game = {
  id: "guess-the-verb-mc",
  title: "Guess the Verb (Multiple Choice)",
  emoji: "🧠",
  description:
    "See a German verb and click the correct English meaning. Mobile-friendly multiple choice game.",
  category: "grammar",
  tags: ["A1"],
  levels: [
    {
      id: "gvm-1",
      title: "Level 1: Common verbs",
      rounds: [
        {
          kind: "exercise",
          exercise: {
            id: "gvm-1a",
            type: "multiple-choice",
            title: "Guess the verb",
            instruction: "Choose the English meaning.",
            prompt: "gehen",
            options: ["to go", "to give", "to get"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "gvm-1b",
            type: "multiple-choice",
            title: "Guess the verb",
            instruction: "Choose the English meaning.",
            prompt: "trinken",
            options: ["to drink", "to think", "to bring"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "gvm-1c",
            type: "multiple-choice",
            title: "Guess the verb",
            instruction: "Choose the English meaning.",
            prompt: "schlafen",
            options: ["to sleep", "to slip", "to slap"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "gvm-1d",
            type: "multiple-choice",
            title: "Guess the verb",
            instruction: "Choose the English meaning.",
            prompt: "kaufen",
            options: ["to buy", "to call", "to cut"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "gvm-1e",
            type: "multiple-choice",
            title: "Guess the verb",
            instruction: "Choose the English meaning.",
            prompt: "helfen",
            options: ["to help", "to hold", "to hope"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "gvm-1f",
            type: "multiple-choice",
            title: "Guess the verb",
            instruction: "Choose the English meaning.",
            prompt: "essen",
            options: ["to eat", "to ask", "to exit"],
            correctIndex: 0,
          },
        },
      ],
    },
    {
      id: "gvm-2",
      title: "Level 2: Everyday verbs",
      rounds: [
        {
          kind: "exercise",
          exercise: {
            id: "gvm-2a",
            type: "multiple-choice",
            title: "Guess the verb",
            instruction: "Choose the English meaning.",
            prompt: "arbeiten",
            options: ["to work", "to walk", "to argue"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "gvm-2b",
            type: "multiple-choice",
            title: "Guess the verb",
            instruction: "Choose the English meaning.",
            prompt: "fahren",
            options: ["to drive", "to farm", "to fear"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "gvm-2c",
            type: "multiple-choice",
            title: "Guess the verb",
            instruction: "Choose the English meaning.",
            prompt: "sprechen",
            options: ["to speak", "to spread", "to spray"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "gvm-2d",
            type: "multiple-choice",
            title: "Guess the verb",
            instruction: "Choose the English meaning.",
            prompt: "warten",
            options: ["to wait", "to warn", "to watch"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "gvm-2e",
            type: "multiple-choice",
            title: "Guess the verb",
            instruction: "Choose the English meaning.",
            prompt: "nehmen",
            options: ["to take", "to name", "to knock"],
            correctIndex: 0,
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "gvm-2f",
            type: "multiple-choice",
            title: "Guess the verb",
            instruction: "Choose the English meaning.",
            prompt: "schreiben",
            options: ["to write", "to shout", "to shine"],
            correctIndex: 0,
          },
        },
      ],
    },
  ],
};

export const germanVerbsToEnglishGame: Game = {
  id: "german-verbs-to-english",
  title: "German Verbs to English",
  emoji: "📖",
  description:
    "See a German verb and type its English meaning. Perfect for building vocabulary.",
  category: "grammar",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "gv2e-1",
      title: "Level 1: Common verbs",
      rounds: [
        {
          kind: "typing",
          title: "German verbs to English",
          instruction: "Type the English meaning.",
          items: [
            { prompt: "gehen", accept: ["go", "to go", "walk", "to walk"], audio: true },
            { prompt: "kommen", accept: ["come", "to come"], audio: true },
            { prompt: "machen", accept: ["make", "do", "to make", "to do"], audio: true },
            { prompt: "spielen", accept: ["play", "to play"], audio: true },
            { prompt: "lesen", accept: ["read", "to read"], audio: true },
            { prompt: "sehen", accept: ["see", "watch", "to see", "to watch"], audio: true },
            { prompt: "essen", accept: ["eat", "to eat"], audio: true },
            { prompt: "trinken", accept: ["drink", "to drink"], audio: true },
            { prompt: "schlafen", accept: ["sleep", "to sleep"], audio: true },
            { prompt: "lernen", accept: ["learn", "to learn"], audio: true },
            { prompt: "wohnen", accept: ["live", "reside", "to live"], audio: true },
            { prompt: "kaufen", accept: ["buy", "to buy"], audio: true },
          ],
        },
      ],
    },
    {
      id: "gv2e-2",
      title: "Level 2: Everyday verbs",
      rounds: [
        {
          kind: "typing",
          title: "German verbs to English",
          instruction: "Type the English meaning.",
          items: [
            { prompt: "arbeiten", accept: ["work", "to work"], audio: true },
            { prompt: "helfen", accept: ["help", "to help"], audio: true },
            { prompt: "fahren", accept: ["drive", "to drive", "ride", "to ride"], audio: true },
            { prompt: "fliegen", accept: ["fly", "to fly"], audio: true },
            { prompt: "laufen", accept: ["run", "walk", "to run", "to walk"], audio: true },
            { prompt: "sprechen", accept: ["speak", "talk", "to speak", "to talk"], audio: true },
            { prompt: "schreiben", accept: ["write", "to write"], audio: true },
            { prompt: "kochen", accept: ["cook", "to cook"], audio: true },
            { prompt: "warten", accept: ["wait", "to wait"], audio: true },
            { prompt: "tanzen", accept: ["dance", "to dance"], audio: true },
            { prompt: "singen", accept: ["sing", "to sing"], audio: true },
            { prompt: "nehmen", accept: ["take", "to take"], audio: true },
          ],
        },
      ],
    },
  ],
};

export const presentToPerfektGame: Game = {
  id: "present-to-perfekt",
  title: "Present to Perfekt",
  emoji: "⏱️",
  description:
    "Type each present-tense sentence in the past tense: Perfekt with haben or sein, or Präteritum for sein, haben and modal verbs.",
  category: "grammar",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "p2p-1",
      title: "Level 1: Perfekt with haben",
      rounds: [
        {
          kind: "typing",
          title: "Present to Perfekt",
          instruction: "Type the sentence in the Perfekt tense.",
          items: [
            { prompt: "Ich trinke Kaffee.", accept: ["ich habe kaffee getrunken"], hint: "Ich habe Kaffee getrunken.", audio: true },
            { prompt: "Wir spielen Fußball.", accept: ["wir haben fußball gespielt", "wir haben fussball gespielt"], hint: "Wir haben Fußball gespielt.", audio: true },
            { prompt: "Ich mache die Hausaufgaben.", accept: ["ich habe die hausaufgaben gemacht"], hint: "Ich habe die Hausaufgaben gemacht.", audio: true },
            { prompt: "Wir sehen einen Film.", accept: ["wir haben einen film gesehen"], hint: "Wir haben einen Film gesehen.", audio: true },
            { prompt: "Du liest das Buch.", accept: ["du hast das buch gelesen"], hint: "Du hast das Buch gelesen.", audio: true },
            { prompt: "Er hilft seiner Mutter.", accept: ["er hat seiner mutter geholfen"], hint: "Er hat seiner Mutter geholfen.", audio: true },
            { prompt: "Sie nimmt das Taxi.", accept: ["sie hat das taxi genommen"], hint: "Sie hat das Taxi genommen.", audio: true },
            { prompt: "Ich esse ein Brot.", accept: ["ich habe ein brot gegessen"], hint: "Ich habe ein Brot gegessen.", audio: true },
          ],
        },
      ],
    },
    {
      id: "p2p-2",
      title: "Level 2: Perfekt with sein",
      rounds: [
        {
          kind: "typing",
          title: "Present to Perfekt",
          instruction: "Type the sentence in the Perfekt tense.",
          items: [
            { prompt: "Ich gehe nach Hause.", accept: ["ich bin nach hause gegangen"], hint: "Ich bin nach Hause gegangen.", audio: true },
            { prompt: "Sie kommt aus Berlin.", accept: ["sie ist aus berlin gekommen"], hint: "Sie ist aus Berlin gekommen.", audio: true },
            { prompt: "Ich fahre mit dem Bus.", accept: ["ich bin mit dem bus gefahren"], hint: "Ich bin mit dem Bus gefahren.", audio: true },
            { prompt: "Wir laufen im Park.", accept: ["wir sind im park gelaufen"], hint: "Wir sind im Park gelaufen.", audio: true },
            { prompt: "Er fliegt nach München.", accept: ["er ist nach münchen geflogen", "er ist nach muenchen geflogen"], hint: "Er ist nach München geflogen.", audio: true },
            { prompt: "Sie bleibt zu Hause.", accept: ["sie ist zu hause geblieben"], hint: "Sie ist zu Hause geblieben.", audio: true },
          ],
        },
      ],
    },
    {
      id: "p2p-3",
      title: "Level 3: Präteritum (sein, haben, modals)",
      rounds: [
        {
          kind: "typing",
          title: "Present to Präteritum",
          instruction: "Type the sentence in the Präteritum tense.",
          items: [
            { prompt: "Ich bin müde.", accept: ["ich war müde", "ich war muede"], hint: "Ich war müde.", audio: true },
            { prompt: "Wir haben ein Auto.", accept: ["wir hatten ein auto"], hint: "Wir hatten ein Auto.", audio: true },
            { prompt: "Er ist Lehrer.", accept: ["er war lehrer"], hint: "Er war Lehrer.", audio: true },
            { prompt: "Ich kann schwimmen.", accept: ["ich konnte schwimmen"], hint: "Ich konnte schwimmen.", audio: true },
            { prompt: "Sie will nach Hause.", accept: ["sie wollte nach hause"], hint: "Sie wollte nach Hause.", audio: true },
            { prompt: "Ich muss arbeiten.", accept: ["ich musste arbeiten"], hint: "Ich musste arbeiten.", audio: true },
            { prompt: "Du hast eine Frage.", accept: ["du hattest eine frage"], hint: "Du hattest eine Frage.", audio: true },
            { prompt: "Wir sind in Berlin.", accept: ["wir waren in berlin"], hint: "Wir waren in Berlin.", audio: true },
          ],
        },
      ],
    },
  ],
};

export const verbGames: Game[] = [
  verbConjugationGame,
  verbConjugationMcGame,
  conjugationTableGame,
  partizipIIGame,
  englishVerbsToGermanGame,
  guessVerbMcGame,
  germanVerbsToEnglishGame,
  presentToPerfektGame,
];