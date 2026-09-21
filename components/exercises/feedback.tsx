import { wordLists } from "../../content/wordlists";

interface FeedbackBannerProps {
  kind: "correct" | "wrong";
  /** The correct answer text shown after a miss. */
  correctText?: string;
  /** Why the correct answer is right (correct state). */
  explainCorrect?: string;
  /** Why the wrong answer was wrong (wrong state). */
  explainWrong?: string;
  /** Legacy fallback shown in both states when the specific reason is absent. */
  explain?: string;
  /** Full English translation of the sentence, when the exercise carries one. */
  translation?: string;
}

const CORRECT_MESSAGES = ["Stark!", "Sehr gut!", "Richtig!", "Prima!"];

function pickMessage(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)];
}

// Build a simple German -> English lookup from the curated word lists.
const TRANSLATION_MAP: Map<string, string> = new Map();
for (const wl of wordLists) {
  for (const w of wl.words) {
    // store the exact German side (with article where present) -> English
    TRANSLATION_MAP.set(w.de, w.en);
  }
}

function findTranslations(text?: string): Array<[string, string]> {
  if (!text) return [];
  const found: Array<[string, string]> = [];
  // iterate over map keys and check for substring matches (simple heuristic)
  for (const [de, en] of TRANSLATION_MAP) {
    if (text.includes(de)) {
      found.push([de, en]);
      if (found.length >= 12) break; // safety limit
    }
  }
  return found;
}

export function FeedbackBanner({
  kind,
  correctText,
  explainCorrect,
  explainWrong,
  explain,
  translation,
}: FeedbackBannerProps) {
  if (kind === "correct") {
    const reason = explainCorrect ?? explain;
    const translations = findTranslations(reason ?? correctText);
    return (
      <div role="status" className="mt-3 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
        <div>{pickMessage(CORRECT_MESSAGES)}</div>
        {reason ? (
          <div className="mt-1 font-normal text-emerald-700">
            <div>Why it is correct: {reason}</div>
          </div>
        ) : null}
        {translation ? (
          <div className="mt-1 font-normal text-emerald-700">
            Translation: <span className="italic">{translation}</span>
          </div>
        ) : null}
        {translations.length > 0 ? (
          <div className="mt-2 text-sm text-emerald-700/90">
            <div className="font-semibold">Translations:</div>
            <ul className="mt-1 list-disc list-inside">
              {translations.map(([de, en]) => (
                <li key={de} className="font-normal">
                  {de} — {en}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }

  const reason = explainWrong ?? explain;
  const translations = findTranslations(reason ?? correctText);
  return (
    <div role="status" className="mt-3 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-900">
      <p className="font-medium">Fast! Schau noch einmal hin.</p>
      {correctText ? (
        <p className="mt-1">
          Die richtige Antwort: <span className="font-semibold">{correctText}</span>
        </p>
      ) : null}
      {reason ? <p className="mt-1 text-rose-800/80">Why it is wrong: {reason}</p> : null}
      {translation ? (
        <p className="mt-1 text-rose-800/80">
          Translation: <span className="italic">{translation}</span>
        </p>
      ) : null}
      {translations.length > 0 ? (
        <div className="mt-2 text-sm text-rose-800/80">
          <div className="font-semibold">Translations:</div>
          <ul className="mt-1 list-disc list-inside">
            {translations.map(([de, en]) => (
              <li key={de} className="font-normal">
                {de} — {en}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function Stars({ count }: { count: number }) {
  return (
    <span aria-label={`${count} of 3 stars`} className="tracking-wide text-amber-500">
      {"★".repeat(count)}
      <span className="text-stone-300">{"★".repeat(Math.max(0, 3 - count))}</span>
    </span>
  );
}
