import type { Game, GameRound } from "./schema";

interface McData {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explain: string;
}

interface WoData {
  id: string;
  chunks: string[];
  translation: string;
  explain: string;
}

interface FbData {
  id: string;
  sentence: string;
  translation: string;
  answers: string[];
  explain: string;
}

interface MtData {
  id: string;
  pairs: [string, string][];
  explain: string;
}

interface LsData {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explain: string;
}

function mc(round: McData): GameRound {
  return {
    kind: "exercise",
    exercise: {
      id: round.id,
      type: "multiple-choice",
      title: "Practice",
      instruction: "Choose the correct answer.",
      prompt: round.prompt,
      options: round.options,
      correctIndex: round.correctIndex,
      explain: round.explain,
    },
  };
}

function wo(round: WoData): GameRound {
  return {
    kind: "exercise",
    exercise: {
      id: round.id,
      type: "word-order",
      title: "Practice",
      instruction: `Build the sentence: ${round.translation}`,
      chunks: round.chunks,
      translation: round.translation,
      explain: round.explain,
    },
  };
}

function fb(round: FbData): GameRound {
  return {
    kind: "exercise",
    exercise: {
      id: round.id,
      type: "fill-blank",
      title: "Practice",
      instruction: "Complete the sentence.",
      sentence: round.sentence,
      translation: round.translation,
      blanks: [{ answers: round.answers }],
      explain: round.explain,
    },
  };
}

function mt(round: MtData): GameRound {
  return {
    kind: "exercise",
    exercise: {
      id: round.id,
      type: "matching",
      title: "Practice",
      instruction: "Match each item with its partner.",
      pairs: round.pairs,
      explain: round.explain,
    },
  };
}

function ls(round: LsData): GameRound {
  return {
    kind: "exercise",
    exercise: {
      id: round.id,
      type: "listening",
      title: "Practice",
      instruction: "Listen and choose the sentence you hear.",
      prompt: round.prompt,
      options: round.options,
      correctIndex: round.correctIndex,
      explain: round.explain,
    },
  };
}

const level1Rounds: GameRound[] = [
  {
    kind: "sort",
    title: "Sort",
    instruction: "Drag each verb into the right category.",
    categories: [
      {
        name: "trennbar",
        items: ["aufstehen", "einkaufen", "mitkommen", "anrufen", "abfahren", "aussteigen"],
      },
      {
        name: "untrennbar",
        items: ["verstehen", "besuchen", "erklären", "entschuldigen", "gehören", "zerbrechen"],
      },
    ],
  },
  {
    kind: "sort",
    title: "Sort",
    instruction: "Drag each prefix into the right category.",
    categories: [
      {
        name: "trennbar",
        items: ["auf-", "an-", "ein-", "mit-", "ab-", "aus-", "vor-", "nach-", "zu-", "weg-"],
      },
      {
        name: "untrennbar",
        items: ["be-", "ent-", "er-", "ge-", "ver-", "zer-", "miss-"],
      },
    ],
  },
  mc({
    id: "tv1-1",
    prompt: "Which prefix is always separable?",
    options: ["auf-", "ver-", "be-"],
    correctIndex: 0,
    explain: "auf- is separable: aufstehen, aufräumen. ver- and be- never split.",
  }),
  mc({
    id: "tv1-2",
    prompt: "Which prefix is always inseparable?",
    options: ["er-", "ein-", "auf-"],
    correctIndex: 0,
    explain: "er- is inseparable: erklären, erzählen. ein- and auf- split.",
  }),
  mc({
    id: "tv1-3",
    prompt: "Which prefix is always separable?",
    options: ["mit-", "ge-", "ver-"],
    correctIndex: 0,
    explain: "mit- is separable: mitkommen, mitbringen. ge- and ver- never split.",
  }),
  mt({
    id: "tv1-4",
    pairs: [
      ["abfahren", "to depart"],
      ["ankommen", "to arrive"],
      ["aufstehen", "to get up"],
      ["einkaufen", "to shop"],
      ["mitkommen", "to come along"],
      ["verstehen", "to understand"],
      ["besuchen", "to visit"],
      ["erklären", "to explain"],
    ],
    explain: "The prefix carries the meaning: ab- (away), an- (arrival), auf- (up), ver- (inseparable).",
  }),
];

const level2Rounds: GameRound[] = [
  wo({
    id: "tv2-1",
    chunks: ["Ich", "stehe", "um sieben Uhr", "auf."],
    translation: "I get up at seven o'clock.",
    explain: "The separable prefix auf closes the sentence frame.",
  }),
  wo({
    id: "tv2-2",
    chunks: ["Er", "ruft", "seine", "Mutter", "an."],
    translation: "He calls his mother.",
    explain: "The prefix an closes the frame: ruft ... an.",
  }),
  wo({
    id: "tv2-3",
    chunks: ["Wir", "kaufen", "heute", "ein."],
    translation: "We are going shopping today.",
    explain: "einkaufen splits: ein closes the frame.",
  }),
  wo({
    id: "tv2-4",
    chunks: ["Der", "Zug", "fährt", "um", "14:30", "Uhr", "ab."],
    translation: "The train departs at 14:30.",
    explain: "abfahren splits: the time phrase sits between the verb and ab.",
  }),
  wo({
    id: "tv2-5",
    chunks: ["Ich", "mache", "das", "Fenster", "zu."],
    translation: "I am closing the window.",
    explain: "zumachen splits: zu closes the frame.",
  }),
  wo({
    id: "tv2-6",
    chunks: ["Sie", "kommt", "heute", "mit."],
    translation: "She is coming along today.",
    explain: "mitkommen splits: the prefix mit closes the sentence.",
  }),
  wo({
    id: "tv2-7",
    chunks: ["Kommst", "du", "mit?"],
    translation: "Are you coming along?",
    explain: "In the question the verb is first, the prefix still closes the frame.",
  }),
];

const level3Rounds: GameRound[] = [
  fb({
    id: "tv3-1",
    sentence: "Ich bin heute früh ___.",
    translation: "I got up early today.",
    answers: ["aufgestanden"],
    explain: "aufstehen → aufgestanden: ge- sits between auf- and the stem.",
  }),
  fb({
    id: "tv3-2",
    sentence: "Wir haben gestern ___.",
    translation: "We went shopping yesterday.",
    answers: ["eingekauft"],
    explain: "einkaufen → eingekauft: the prefix keeps ge- after it.",
  }),
  fb({
    id: "tv3-3",
    sentence: "Sie hat mich gestern ___.",
    translation: "She called me yesterday.",
    answers: ["angerufen"],
    explain: "anrufen → angerufen: ge- goes between an- and rufen.",
  }),
  fb({
    id: "tv3-4",
    sentence: "Wir haben die Aufgabe ___.",
    translation: "We understood the task.",
    answers: ["verstanden"],
    explain: "ver- never splits, so the participle takes no ge-: verstanden.",
  }),
  wo({
    id: "tv3-5",
    chunks: ["Ich", "bin", "um", "sieben", "Uhr", "aufgestanden."],
    translation: "I got up at seven o'clock.",
    explain: "aufstehen takes sein; the participle closes the frame.",
  }),
  wo({
    id: "tv3-6",
    chunks: ["Wir", "haben", "gestern", "eingekauft."],
    translation: "We went shopping yesterday.",
    explain: "einkaufen takes haben; eingekauft closes the frame.",
  }),
  wo({
    id: "tv3-7",
    chunks: ["Er", "hat", "die", "Frage", "verstanden."],
    translation: "He understood the question.",
    explain: "Inseparable verbs take no ge-: verstanden.",
  }),
];

const level4Rounds: GameRound[] = [
  wo({
    id: "tv4-1",
    chunks: ["Ich", "muss", "um sieben Uhr", "aufstehen."],
    translation: "I have to get up at seven o'clock.",
    explain: "With a modal the prefix stays attached: aufstehen closes the sentence.",
  }),
  wo({
    id: "tv4-2",
    chunks: ["Wir", "wollen", "morgen", "einkaufen."],
    translation: "We want to go shopping tomorrow.",
    explain: "wollen second, the full infinitive einkaufen at the end.",
  }),
  wo({
    id: "tv4-3",
    chunks: ["Steh", "bitte", "auf!"],
    translation: "Please get up!",
    explain: "The imperative opens with the verb, the prefix closes it.",
  }),
  wo({
    id: "tv4-4",
    chunks: ["Stehen", "Sie", "bitte", "auf!"],
    translation: "Please stand up! (formal)",
    explain: "Formal imperative: infinitive + Sie, the prefix still closes the sentence.",
  }),
  wo({
    id: "tv4-5",
    chunks: ["Mach", "die", "Tür", "zu!"],
    translation: "Close the door!",
    explain: "zumachen in the imperative: zu ... mach, the prefix closes the command.",
  }),
  mc({
    id: "tv4-6",
    prompt: "Which is the correct participle of aufstehen?",
    options: ["aufgestanden", "aufstanden", "gestanden"],
    correctIndex: 0,
    explain: "aufgestanden: ge- slides in after the prefix auf-.",
  }),
  mc({
    id: "tv4-7",
    prompt: "Which is the correct participle of verstehen?",
    options: ["verstanden", "geverstanden", "verstandt"],
    correctIndex: 0,
    explain: "ver- never splits, so the participle has no ge-: verstanden.",
  }),
  ls({
    id: "tv4-8",
    prompt: "Wir haben gestern eingekauft.",
    options: [
      "Wir haben gestern eingekauft.",
      "Wir sind gestern eingekauft.",
      "Wir haben gestern gekauft.",
    ],
    correctIndex: 0,
    explain: "einkaufen takes haben, and the participle is eingekauft, not gekauft.",
  }),
];

export const separableVerbsGame: Game = {
  id: "trennbare-verben",
  title: "Separable & Inseparable Verbs",
  emoji: "🧩",
  description:
    "Learn which prefixes split and which never do: build the sentence frame with auf ... stehen, form the perfect tense with ge- in the right place, and use separable verbs with modals and imperatives.",
  category: "grammar",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "trennbare-1",
      title: "Level 1: Which prefix splits?",
      rounds: level1Rounds,
    },
    {
      id: "trennbare-2",
      title: "Level 2: The sentence frame (Satzklammer)",
      rounds: level2Rounds,
    },
    {
      id: "trennbare-3",
      title: "Level 3: The perfect tense",
      rounds: level3Rounds,
    },
    {
      id: "trennbare-4",
      title: "Level 4: Modal verbs and imperatives",
      rounds: level4Rounds,
    },
  ],
};