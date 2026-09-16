import type { Exercise } from "../../../schema";

/** Comprehension question with three options. */
export function frage(
  n: number,
  question: string,
  options: [string, string, string],
  correct: number,
  explain: string,
): Exercise {
  return {
    id: `v${String(n).padStart(2, "0")}`,
    type: "multiple-choice",
    title: `Frage ${n}`,
    instruction: "Was ist richtig? Lesen Sie die Geschichte und kreuzen Sie an.",
    prompt: question,
    options: [...options],
    correctIndex: correct,
    explain,
  };
}

/** True or false comprehension statement. */
export function richtigFalsch(
  n: number,
  statement: string,
  correct: boolean,
  explain: string,
): Exercise {
  return {
    id: `v${String(n).padStart(2, "0")}`,
    type: "multiple-choice",
    title: `Frage ${n}`,
    instruction: "Richtig oder falsch? Kreuzen Sie an.",
    prompt: statement,
    options: ["Richtig", "Falsch"],
    correctIndex: correct ? 0 : 1,
    explain,
  };
}