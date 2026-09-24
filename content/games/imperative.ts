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

interface FcData {
  id: string;
  cards: { front: string; back: string }[];
}

function mc(round: McData): GameRound {
  return {
    kind: "exercise",
    exercise: {
      id: round.id,
      type: "multiple-choice",
      title: "Practice",
      instruction: "Choose the correct imperative.",
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
      instruction: `Build the command: ${round.translation}`,
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
      instruction: "Complete the command.",
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
      instruction: "Match each form with its meaning.",
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
      instruction: "Listen and choose the command you hear.",
      prompt: round.prompt,
      options: round.options,
      correctIndex: round.correctIndex,
      explain: round.explain,
    },
  };
}

function fc(round: FcData): GameRound {
  return {
    kind: "exercise",
    exercise: {
      id: round.id,
      type: "flashcard",
      title: "Practice",
      instruction: "Say the German command before revealing the meaning.",
      items: round.cards.map((card) => ({ ...card, frontAudio: true })),
    },
  };
}

const level1Rounds: GameRound[] = [
  mt({
    id: "imp1-1",
    pairs: [
      ["du", "Geh!"],
      ["ihr", "Geht!"],
      ["Sie (formal)", "Gehen Sie!"],
      ["wir", "Gehen wir!"],
    ],
    explain: "The du form drops the -st, the ihr form keeps the -t, the formal uses infinitive + Sie.",
  }),
  mc({
    id: "imp1-2",
    prompt: "Go home! (du)",
    options: ["Geh nach Hause!", "Gehst nach Hause!", "Gehen nach Hause!"],
    correctIndex: 0,
    explain: "The du form drops the -st.",
  }),
  mc({
    id: "imp1-3",
    prompt: "Go home! (ihr)",
    options: ["Geht nach Hause!", "Geh nach Hause!", "Gehen Sie nach Hause!"],
    correctIndex: 0,
    explain: "The ihr form takes -t.",
  }),
  mc({
    id: "imp1-4",
    prompt: "Go home! (formal)",
    options: ["Gehen Sie nach Hause!", "Geh nach Hause!", "Geht nach Hause!"],
    correctIndex: 0,
    explain: "The formal imperative: infinitive + Sie.",
  }),
  mc({
    id: "imp1-5",
    prompt: "Let's go to the cinema! (wir)",
    options: ["Gehen wir ins Kino!", "Gehen ins Kino!", "Geht ins Kino!"],
    correctIndex: 0,
    explain: "The wir form invites: infinitive + wir.",
  }),
  fc({
    id: "imp1-6",
    cards: [
      { front: "Geh nach Hause!", back: "Go home! (du)" },
      { front: "Geht nach Hause!", back: "Go home! (ihr)" },
      { front: "Gehen Sie nach Hause!", back: "Go home! (formal)" },
      { front: "Gehen wir nach Hause!", back: "Let's go home!" },
    ],
  }),
];

const level2Rounds: GameRound[] = [
  mc({
    id: "imp2-1",
    prompt: "Be quiet! (du)",
    options: ["Sei ruhig!", "Seist ruhig!", "Sein ruhig!"],
    correctIndex: 0,
    explain: "The sein imperative is Sei, not Seist.",
  }),
  mc({
    id: "imp2-2",
    prompt: "Have fun! (du)",
    options: ["Hab Spaß!", "Hast Spaß!", "Haben Spaß!"],
    correctIndex: 0,
    explain: "The haben imperative is Hab, dropping the -st.",
  }),
  mc({
    id: "imp2-3",
    prompt: "Look at that! (du)",
    options: ["Sieh dir das an!", "Siehst dir das an!", "Sieh das an dir!"],
    correctIndex: 0,
    explain: "sehen → Sieh; ansehen splits, so an closes the command.",
  }),
  fb({
    id: "imp2-4",
    sentence: "___ ruhig!",
    translation: "Be quiet! (du)",
    answers: ["Sei"],
    explain: "The du imperative of sein is Sei.",
  }),
  fb({
    id: "imp2-5",
    sentence: "___ Spaß!",
    translation: "Have fun! (du)",
    answers: ["Hab"],
    explain: "The du imperative of haben is Hab.",
  }),
  wo({
    id: "imp2-6",
    chunks: ["Geh", "nach", "Hause!"],
    translation: "Go home! (du)",
    explain: "The du imperative opens with the verb: Geh.",
  }),
  wo({
    id: "imp2-7",
    chunks: ["Mach", "die", "Tür", "zu!"],
    translation: "Close the door! (du)",
    explain: "zumachen splits: the prefix zu closes the command.",
  }),
  wo({
    id: "imp2-8",
    chunks: ["Sieh", "dir", "das", "an!"],
    translation: "Look at that! (du)",
    explain: "ansehen splits: Sieh ... an, with the dative dir.",
  }),
];

const level3Rounds: GameRound[] = [
  mc({
    id: "imp3-1",
    prompt: "Take the second street on the right! (formal)",
    options: [
      "Nehmen Sie die zweite Straße rechts!",
      "Nehmen die zweite Straße rechts!",
      "Nehmt die zweite Straße rechts!",
    ],
    correctIndex: 0,
    explain: "The formal imperative keeps Sie: Nehmen Sie.",
  }),
  mc({
    id: "imp3-2",
    prompt: "Open the window! (formal)",
    options: ["Öffnen Sie das Fenster!", "Öffnet das Fenster!", "Öffnen das Fenster!"],
    correctIndex: 0,
    explain: "Formal: infinitive + Sie, so Öffnen Sie.",
  }),
  fb({
    id: "imp3-3",
    sentence: "___ Sie bitte Platz!",
    translation: "Please take a seat! (formal)",
    answers: ["Nehmen"],
    explain: "The formal imperative is the infinitive: Nehmen Sie.",
  }),
  fb({
    id: "imp3-4",
    sentence: "___ nach Hause! (ihr)",
    translation: "Go home! (ihr)",
    answers: ["Geht"],
    explain: "The ihr form keeps the -t: Geht.",
  }),
  mt({
    id: "imp3-5",
    pairs: [
      ["Gehen Sie!", "formal"],
      ["Geht!", "ihr"],
      ["Machen Sie!", "formal"],
      ["Macht!", "ihr"],
    ],
    explain: "The formal is infinitive + Sie; the ihr form keeps -t.",
  }),
  ls({
    id: "imp3-6",
    prompt: "Nehmen Sie die zweite Straße rechts!",
    options: [
      "Nehmen Sie die zweite Straße rechts!",
      "Nehmt die zweite Straße rechts!",
      "Nehmen die zweite Straße rechts!",
    ],
    correctIndex: 0,
    explain: "The formal command keeps Sie: Nehmen Sie die zweite Straße rechts.",
  }),
];

const level4Rounds: GameRound[] = [
  wo({
    id: "imp4-1",
    chunks: ["Steh", "um", "6", "Uhr", "auf!"],
    translation: "Get up at 6 o'clock! (du)",
    explain: "aufstehen splits in the imperative: the prefix auf closes the command.",
  }),
  wo({
    id: "imp4-2",
    chunks: ["Ruf", "mich", "später", "an!"],
    translation: "Call me later! (du)",
    explain: "anrufen splits: Ruf ... an, the object and time sit between.",
  }),
  wo({
    id: "imp4-3",
    chunks: ["Stehen", "Sie", "um", "6", "Uhr", "auf!"],
    translation: "Please get up at 6 o'clock! (formal)",
    explain: "Formal imperative: Stehen Sie ... auf, the prefix still closes the sentence.",
  }),
  wo({
    id: "imp4-4",
    chunks: ["Kauf", "ein!"],
    translation: "Go shopping! (du)",
    explain: "einkaufen splits: Kauf ... ein.",
  }),
  mc({
    id: "imp4-5",
    prompt: "Call me! (du)",
    options: ["Ruf mich an!", "Anruf mich!", "Ruf an mich!"],
    correctIndex: 0,
    explain: "The separable verb: Ruf ... an. The object never sits between the verb and the prefix.",
  }),
  mc({
    id: "imp4-6",
    prompt: "Get up at 6 o'clock! (du)",
    options: ["Steh um 6 Uhr auf!", "Steh auf um 6 Uhr!", "Aufsteh um 6 Uhr!"],
    correctIndex: 0,
    explain: "The prefix closes the command: Steh um 6 Uhr auf.",
  }),
  ls({
    id: "imp4-7",
    prompt: "Ruf mich später an!",
    options: ["Ruf mich später an!", "Ruf mich an später!", "Ruf später mich an!"],
    correctIndex: 0,
    explain: "The command is Ruf mich später an: verb first, prefix at the end.",
  }),
  fc({
    id: "imp4-8",
    cards: [
      { front: "Steh auf!", back: "Get up! (du)" },
      { front: "Ruf mich an!", back: "Call me! (du)" },
      { front: "Mach die Tür zu!", back: "Close the door! (du)" },
      { front: "Kauf ein!", back: "Go shopping! (du)" },
    ],
  }),
];

export const imperativeGame: Game = {
  id: "imperativ",
  title: "The Imperative",
  emoji: "📣",
  description:
    "Practice giving commands in German: the du, ihr, Sie and wir forms, the exceptions sein and haben, and separable verbs that split their prefix in commands.",
  category: "grammar",
  tags: ["A1"],
  levels: [
    {
      id: "imperativ-1",
      title: "Level 1: The four forms",
      rounds: level1Rounds,
    },
    {
      id: "imperativ-2",
      title: "Level 2: The du form",
      rounds: level2Rounds,
    },
    {
      id: "imperativ-3",
      title: "Level 3: The ihr and Sie forms",
      rounds: level3Rounds,
    },
    {
      id: "imperativ-4",
      title: "Level 4: Commands with separable verbs",
      rounds: level4Rounds,
    },
  ],
};