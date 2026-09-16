/**
 * Curriculum content model. Single source of truth for all authored content:
 * levels, units, lessons, vocabulary, and exercises. Content files under
 * content/ must only contain data shaped by these types, never logic.
 */

export type LevelId = "a1" | "a2";

export type LessonStatus = "ready" | "planned";

/** A lesson marked planned exists in the syllabus with metadata but has no page yet. */
export interface Level {
  id: LevelId;
  title: string;
  subtitle: string;
  description: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  title: string;
  theme: string;
  lessons: Lesson[];
}

export interface Lesson {
  /** Slug, unique within the level. */
  id: string;
  title: string;
  summary: string;
  status: LessonStatus;
  /** Empty for planned lessons. */
  sections: ContentSection[];
  vocab: VocabItem[];
  exercises: Exercise[];
}

export interface ContentSection {
  heading: string;
  blocks: ContentBlock[];
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "example"; de: string; en: string }
  | {
      type: "gloss";
      /** Full German sentence, also spoken. */
      de: string;
      /** Smooth English translation of the whole sentence. */
      en: string;
      /** Word-by-word breakdown with part of speech and meaning. */
      words: GlossWord[];
    }
  | { type: "tip"; text: string }
  | {
      type: "table";
      caption?: string;
      head?: string[];
      rows: string[][];
      /**
       * Optional per-row text to speak, aligned with `rows`. When present,
       * the row shows a speaker button that reads this text aloud, e.g.
       * the German letter name in the alphabet table.
       */
      rowSpeak?: (string | undefined)[];
    };

export interface GlossWord {
  /** The word exactly as it appears in the sentence. */
  word: string;
  /** Part of speech: Nomen, Verb, Adjektiv, Adverb, Pronomen, Artikel, Präposition, Konjunktion, Numerale, Interjektion. */
  pos: string;
  /** English meaning of the single word. */
  en: string;
  /**
   * Richer part-of-speech description in English, shown to learners,
   * e.g. "Pronoun in the dative case", "Pronoun / impersonal subject",
   * "Adverb / adjective". Falls back to the German `pos` when absent.
   */
  detail?: string;
}

export interface VocabItem {
  /** Unique within the lesson. */
  id: string;
  de: string;
  en: string;
  /** E.g. "noun m.", "verb", "phrase". Nouns carry article in `de` (die Familie). */
  part?: string;
  /** For nouns: plural form, e.g. "die Familien". */
  plural?: string;
  /** True when `de` is a phrase or sentence rather than a single word. */
  phrase?: boolean;
  /** Speak via TTS when true. */
  audio?: boolean;
  tip?: string;
}

interface ExerciseBase {
  /** Unique within the lesson. */
  id: string;
  title: string;
  instruction: string;
  /** Why the correct answer is right; shown after a correct answer.
   * Falls back to `explain`. */
  explainCorrect?: string;
  /** Why the chosen answer was wrong; shown after a wrong answer.
   * Falls back to `explain`. */
  explainWrong?: string;
  /** Short note shown after a wrong answer (legacy fallback for both). */
  explain?: string;
}

export interface MultipleChoiceExercise extends ExerciseBase {
  type: "multiple-choice";
  prompt: string;
  /** Speak the prompt via TTS when true. */
  promptAudio?: boolean;
  options: string[];
  correctIndex: number;
}

export interface FillBlankExercise extends ExerciseBase {
  type: "fill-blank";
  /** German sentence containing one or more `___` placeholders. */
  sentence: string;
  /** One entry per placeholder, in order. */
  blanks: {
    /** Accepted answers, compared after normalization (case, trim, umlaut). */
    answers: string[];
    hint?: string;
  }[];
}

export interface MatchingExercise extends ExerciseBase {
  type: "matching";
  /** Left column German, right column English (or any pairing). */
  pairs: [string, string][];
}

export interface WordOrderExercise extends ExerciseBase {
  type: "word-order";
  /** The correct order of chunks, first to last. Shuffled for display. */
  chunks: string[];
}

export interface FlashcardItem {
  front: string;
  back: string;
  /** Speak the front via TTS when true. */
  frontAudio?: boolean;
  /**
   * Override what the TTS speaks when `frontAudio` is true.
   * Use when `front` is a display-only label (e.g. "ch (a, o, u)") that
   * would be mispronounced in isolation. Set this to a natural German word
   * containing the target sound (e.g. "noch") so the TTS has phonetic
   * context. The card still displays `front`; only the spoken audio changes.
   */
  frontAudioText?: string;
}

export interface FlashcardExercise extends ExerciseBase {
  type: "flashcard";
  items: FlashcardItem[];
}

export interface ListeningExercise extends ExerciseBase {
  type: "listening";
  /** Spoken via TTS; the learner picks what they heard. */
  prompt: string;
  options: string[];
  correctIndex: number;
}

/**
 * Free writing practice. The learner writes a German text in a textarea,
 * then reveals a model answer and compares. Writing cannot be auto-graded,
 * so the exercise completes when the learner finishes and checks their work.
 */
export interface WritingExercise extends ExerciseBase {
  type: "writing";
  /** The German task, e.g. "Schreiben Sie eine E-Mail an das Hotel." */
  prompt: string;
  /** Content points the text must cover, shown as a checklist. */
  points: string[];
  /** Model answer in German, revealed after the learner finishes writing. */
  modelAnswer: string;
  /** Optional length guidance, e.g. "circa 30 Wörter". */
  wordCount?: string;
}

export type Exercise =
  | MultipleChoiceExercise
  | FillBlankExercise
  | MatchingExercise
  | WordOrderExercise
  | FlashcardExercise
  | ListeningExercise
  | WritingExercise;

/** Global lesson key: "a1/kennenlernen/hallo". */
export type LessonKey = string;

/** Global exercise key: "<lessonKey>:<exerciseId>". */
export type ExerciseKey = string;