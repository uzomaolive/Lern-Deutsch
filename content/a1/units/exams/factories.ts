import type { Exercise } from "../../../schema";

/**
 * Compact factories for authoring complete Goethe A1 exam papers in the
 * authentic format. Each exam paper has four parts:
 *
 *   Hören    Teil 1: 6 x a/b/c short dialogues (heard twice)
 *            Teil 2: 4 x Richtig/Falsch announcements (heard once)
 *            Teil 3: 5 x a/b/c phone messages (heard twice)
 *   Lesen    Teil 1: 5 x Richtig/Falsch on two short texts
 *            Teil 2: 5 x a/b notices and small ads
 *            Teil 3: 5 x Richtig/Falsch public signs
 *   Schreiben Teil 1: form with five missing fields (fill-blank)
 *            Teil 2: short message (~30 words) built from chunks
 *   Sprechen Teil 1: introduce yourself (word order)
 *            Teil 2: ask for and give information (matching)
 *            Teil 3: formulate requests and react (multiple choice)
 */

export function listen(
  n: number,
  question: string,
  prompt: string,
  options: [string, string, string],
  correct: number,
  explain: string,
): Exercise {
  return {
    id: `h${String(n).padStart(2, "0")}`,
    type: "listening",
    title: `Hören, Aufgabe ${n}`,
    instruction: question,
    prompt,
    options: [...options],
    correctIndex: correct,
    explain,
  };
}

export function listenRF(
  n: number,
  prompt: string,
  correct: boolean,
  explain: string,
): Exercise {
  return {
    id: `h${String(n).padStart(2, "0")}`,
    type: "listening",
    title: `Hören, Aufgabe ${n}`,
    instruction: "Richtig oder falsch? Sie hören den Text einmal.",
    prompt,
    options: ["Richtig", "Falsch"],
    correctIndex: correct ? 0 : 1,
    explain,
  };
}

export function readRF(
  n: number,
  statement: string,
  correct: boolean,
  explain: string,
): Exercise {
  return {
    id: `l${String(n).padStart(2, "0")}`,
    type: "multiple-choice",
    title: `Lesen, Aufgabe ${n}`,
    instruction: "Richtig oder falsch? Lesen Sie den Text und kreuzen Sie an.",
    prompt: statement,
    options: ["Richtig", "Falsch"],
    correctIndex: correct ? 0 : 1,
    explain,
  };
}

export function readAB(
  n: number,
  question: string,
  optionA: string,
  optionB: string,
  correct: 0 | 1,
  explain: string,
): Exercise {
  return {
    id: `l${String(n).padStart(2, "0")}`,
    type: "multiple-choice",
    title: `Lesen, Aufgabe ${n}`,
    instruction: question,
    prompt: "Welche Anzeige passt? Kreuzen Sie a oder b an.",
    options: [optionA, optionB],
    correctIndex: correct,
    explain,
  };
}

export function schreibForm(
  n: number,
  sentence: string,
  blanks: { answers: string[]; hint?: string }[],
  hint = "Schreiben Sie die fehlenden Informationen.",
): Exercise {
  return {
    id: `s${String(n).padStart(2, "0")}`,
    type: "fill-blank",
    title: `Schreiben, Aufgabe ${n}`,
    instruction: hint,
    sentence,
    blanks,
  };
}

export function schreibSatz(
  n: number,
  instruction: string,
  chunks: string[],
  explain: string,
): Exercise {
  return {
    id: `s${String(n).padStart(2, "0")}`,
    type: "word-order",
    title: `Schreiben, Aufgabe ${n}`,
    instruction,
    chunks,
    explain,
  };
}

export function sprechenSatz(
  n: number,
  teil: number,
  instruction: string,
  chunks: string[],
  explain: string,
): Exercise {
  return {
    id: `sp${String(n).padStart(2, "0")}`,
    type: "word-order",
    title: `Sprechen, Teil ${teil}`,
    instruction,
    chunks,
    explain,
  };
}

export function sprechenMatch(
  n: number,
  teil: number,
  instruction: string,
  pairs: [string, string][],
): Exercise {
  return {
    id: `sp${String(n).padStart(2, "0")}`,
    type: "matching",
    title: `Sprechen, Teil ${teil}`,
    instruction,
    pairs,
  };
}

export function sprechenChoose(
  n: number,
  teil: number,
  instruction: string,
  prompt: string,
  options: [string, string, string],
  correct: number,
  explain: string,
): Exercise {
  return {
    id: `sp${String(n).padStart(2, "0")}`,
    type: "multiple-choice",
    title: `Sprechen, Teil ${teil}`,
    instruction,
    prompt,
    options: [...options],
    correctIndex: correct,
    explain,
  };
}