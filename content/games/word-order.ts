import type { Game } from "./schema";

interface RoundData {
  id: string;
  chunks: string[];
  translation: string;
  explain: string;
}

function woRound(round: RoundData) {
  return {
    kind: "exercise" as const,
    exercise: {
      id: round.id,
      type: "word-order" as const,
      title: "Practice",
      instruction: `Build the sentence: ${round.translation}`,
      chunks: round.chunks,
      translation: round.translation,
      explain: round.explain,
    },
  };
}

const level1Rounds = [
  { id: "wo1-1", chunks: ["Ich", "lerne", "Deutsch."], translation: "I am learning German.", explain: "Subject first, verb second, object third: the standard statement." },
  { id: "wo1-2", chunks: ["Er", "spricht", "Englisch."], translation: "He speaks English.", explain: "Subject, verb, object: the verb is the second element." },
  { id: "wo1-3", chunks: ["Wir", "wohnen", "in", "Berlin."], translation: "We live in Berlin.", explain: "The place phrase comes after the verb, not first." },
  { id: "wo1-4", chunks: ["Sie", "arbeitet", "heute."], translation: "She is working today.", explain: "Subject, verb, time: the verb stays second." },
  { id: "wo1-5", chunks: ["Heute", "lerne", "ich", "Deutsch."], translation: "Today I am learning German.", explain: "Time word first: verb still second, subject moves after it." },
  { id: "wo1-6", chunks: ["Dann", "gehe", "ich", "nach", "Hause."], translation: "Then I go home.", explain: "dann first: verb second, subject third (inversion)." },
  { id: "wo1-7", chunks: ["Im", "Sommer", "fahre", "ich", "nach", "Italien."], translation: "In the summer I am driving to Italy.", explain: "A time phrase can open the sentence; the verb never leaves position 2." },
  { id: "wo1-8", chunks: ["Morgen", "besuche", "ich", "meine", "Oma."], translation: "Tomorrow I am visiting my grandma.", explain: "Inversion with a time adverb: verb second, subject after it." },
  { id: "wo1-9", chunks: ["Jetzt", "trinke", "ich", "Kaffee."], translation: "Now I am drinking coffee.", explain: "jetzt first, verb second, subject third." },
  { id: "wo1-10", chunks: ["Am", "Montag", "beginnt", "der", "Kurs."], translation: "The course starts on Monday.", explain: "A date first: verb second, subject moves behind it." },
  { id: "wo1-11", chunks: ["Sie", "wohnt", "schon", "lange", "in", "Hamburg."], translation: "She has lived in Hamburg for a long time.", explain: "Subject, verb, time, place: German keeps time before place." },
  { id: "wo1-12", chunks: ["Er", "liest", "gern", "Bücher."], translation: "He likes reading books.", explain: "gern (manner) stands before the object here; the verb stays second." },
];

const level2Rounds = [
  { id: "wo2-1", chunks: ["Lernst", "du", "Deutsch?"], translation: "Are you learning German?", explain: "Yes/no question: verb first, subject second." },
  { id: "wo2-2", chunks: ["Sprichst", "du", "Englisch?"], translation: "Do you speak English?", explain: "Yes/no question: verb opens the sentence." },
  { id: "wo2-3", chunks: ["Wohnst", "du", "in", "Berlin?"], translation: "Do you live in Berlin?", explain: "Verb first, then subject, then the place." },
  { id: "wo2-4", chunks: ["Kommst", "du", "mit?"], translation: "Are you coming along?", explain: "The separable prefix mit still closes the sentence." },
  { id: "wo2-5", chunks: ["Hast", "du", "Zeit?"], translation: "Do you have time?", explain: "Yes/no question with haben: verb first." },
  { id: "wo2-6", chunks: ["Wo", "wohnst", "du?"], translation: "Where do you live?", explain: "W-question: question word, verb, subject." },
  { id: "wo2-7", chunks: ["Wann", "kommst", "du?"], translation: "When are you coming?", explain: "Question word first, verb second, subject third." },
  { id: "wo2-8", chunks: ["Warum", "lernst", "du", "Deutsch?"], translation: "Why are you learning German?", explain: "warum first, verb second, subject third." },
  { id: "wo2-9", chunks: ["Was", "machst", "du?"], translation: "What are you doing?", explain: "was first, verb second, subject third." },
  { id: "wo2-10", chunks: ["Wie", "heißt", "du?"], translation: "What is your name?", explain: "wie first, verb second, subject third." },
  { id: "wo2-11", chunks: ["Wohin", "fährst", "du?"], translation: "Where are you driving to?", explain: "wohin first, verb second, subject third." },
  { id: "wo2-12", chunks: ["Wer", "ist", "das?"], translation: "Who is that?", explain: "wer asks about a person and takes the verb second." },
];

const level3Rounds = [
  { id: "wo3-1", chunks: ["Ich", "möchte", "einen", "Kaffee", "trinken."], translation: "I would like to drink a coffee.", explain: "The modal is second; the infinitive closes the frame." },
  { id: "wo3-2", chunks: ["Ich", "kann", "gut", "schwimmen."], translation: "I can swim well.", explain: "kann second, infinitive at the end." },
  { id: "wo3-3", chunks: ["Du", "musst", "morgen", "arbeiten."], translation: "You have to work tomorrow.", explain: "musst second, infinitive closes the sentence." },
  { id: "wo3-4", chunks: ["Wir", "wollen", "heute", "ins", "Kino", "gehen."], translation: "We want to go to the cinema today.", explain: "wollen second, gehen closes the frame." },
  { id: "wo3-5", chunks: ["Ich", "habe", "gestern", "Deutsch", "gelernt."], translation: "I learned German yesterday.", explain: "haben second, participle closes the frame." },
  { id: "wo3-6", chunks: ["Er", "ist", "nach", "Berlin", "gefahren."], translation: "He drove to Berlin.", explain: "ist second (sein with movement), participle at the end." },
  { id: "wo3-7", chunks: ["Wir", "haben", "Pizza", "gegessen."], translation: "We ate pizza.", explain: "haben second, participle closes the frame." },
  { id: "wo3-8", chunks: ["Ich", "stehe", "um", "sieben", "Uhr", "auf."], translation: "I get up at seven o'clock.", explain: "The separable prefix auf closes the frame." },
  { id: "wo3-9", chunks: ["Der", "Zug", "fährt", "um", "14:30", "Uhr", "ab."], translation: "The train departs at 14:30.", explain: "Time with um, then the separable prefix ab closes the sentence." },
  { id: "wo3-10", chunks: ["Sie", "ruft", "mich", "morgen", "an."], translation: "She is calling me tomorrow.", explain: "The separable prefix an closes the frame." },
  { id: "wo3-11", chunks: ["Ich", "habe", "das", "Buch", "gelesen."], translation: "I read the book.", explain: "haben second, participle at the end." },
  { id: "wo3-12", chunks: ["Du", "hast", "das", "Fenster", "geöffnet."], translation: "You opened the window.", explain: "hast second, participle closes the frame." },
];

const level4Rounds = [
  { id: "wo4-1", chunks: ["Ich", "fahre", "morgen", "mit", "dem", "Zug", "nach", "Berlin."], translation: "I am travelling to Berlin by train tomorrow.", explain: "Time before manner before place." },
  { id: "wo4-2", chunks: ["Wir", "treffen", "uns", "heute", "Abend", "im", "Café."], translation: "We are meeting at the café this evening.", explain: "Time (heute Abend) before place (im Café)." },
  { id: "wo4-3", chunks: ["Er", "geht", "jeden", "Tag", "zu", "Fuß", "zur", "Arbeit."], translation: "He walks to work every day.", explain: "Time (jeden Tag) before manner (zu Fuß) before place (zur Arbeit)." },
  { id: "wo4-4", chunks: ["Sie", "wohnt", "seit", "Jahren", "in", "Hamburg."], translation: "She has lived in Hamburg for years.", explain: "Time phrase before place." },
  { id: "wo4-5", chunks: ["Ich", "bleibe", "zu", "Hause,", "weil", "es", "regnet."], translation: "I stay at home because it is raining.", explain: "weil pushes the verb to the end of the subordinate clause." },
  { id: "wo4-6", chunks: ["Weil", "es", "regnet,", "bleibe", "ich", "zu", "Hause."], translation: "Because it is raining, I stay at home.", explain: "Subordinate clause first; the main clause starts with the verb." },
  { id: "wo4-7", chunks: ["Ich", "weiß,", "dass", "du", "Deutsch", "lernst."], translation: "I know that you are learning German.", explain: "dass pushes the verb to the end." },
  { id: "wo4-8", chunks: ["Wenn", "ich", "Zeit", "habe,", "lese", "ich", "ein", "Buch."], translation: "When I have time, I read a book.", explain: "Subordinate clause first: verb last in it, verb first in the main clause." },
  { id: "wo4-9", chunks: ["Obwohl", "es", "kalt", "ist,", "gehe", "ich", "spazieren."], translation: "Although it is cold, I am going for a walk.", explain: "obwohl sends ist to the end; the main clause opens with the verb." },
  { id: "wo4-10", chunks: ["Ich", "komme,", "wenn", "ich", "fertig", "bin."], translation: "I am coming when I am done.", explain: "wenn sends the verb to the end of the subordinate clause." },
  { id: "wo4-11", chunks: ["Er", "sagt,", "dass", "er", "morgen", "kommt."], translation: "He says that he is coming tomorrow.", explain: "dass clause: subject, time, then the verb last." },
  { id: "wo4-12", chunks: ["Das", "Kind", "schläft,", "weil", "es", "müde", "ist."], translation: "The child is sleeping because it is tired.", explain: "weil clause ends with the verb ist." },
];

export const wordorderGame: Game = {
  id: "satzbau",
  title: "Word Order (Satzbau)",
  emoji: "🧱",
  description:
    "Learn how German word order works: verb-second statements, questions, inversion, time-manner-place, the sentence frame, and subordinate clauses. Build the sentences type by type.",
  category: "grammar",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "satzbau-1",
      title: "Level 1: Verb second (Aussagesatz)",
      rounds: level1Rounds.map(woRound),
    },
    {
      id: "satzbau-2",
      title: "Level 2: Questions (Fragen)",
      rounds: level2Rounds.map(woRound),
    },
    {
      id: "satzbau-3",
      title: "Level 3: Sentence frame (Satzklammer)",
      rounds: level3Rounds.map(woRound),
    },
    {
      id: "satzbau-4",
      title: "Level 4: Time, manner, place and Nebensätze",
      rounds: level4Rounds.map(woRound),
    },
  ],
};