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
}

const CORRECT_MESSAGES = ["Stark!", "Sehr gut!", "Richtig!", "Prima!"];

function pickMessage(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)];
}

export function FeedbackBanner({
  kind,
  correctText,
  explainCorrect,
  explainWrong,
  explain,
}: FeedbackBannerProps) {
  if (kind === "correct") {
    const reason = explainCorrect ?? explain;
    return (
      <p
        role="status"
        className="mt-3 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
      >
        {pickMessage(CORRECT_MESSAGES)}
        {reason ? (
          <span className="mt-1 block font-normal text-emerald-700">
            Why it is correct: {reason}
          </span>
        ) : null}
      </p>
    );
  }

  const reason = explainWrong ?? explain;
  return (
    <div role="status" className="mt-3 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-900">
      <p className="font-medium">Fast! Schau noch einmal hin.</p>
      {correctText ? (
        <p className="mt-1">
          Die richtige Antwort: <span className="font-semibold">{correctText}</span>
        </p>
      ) : null}
      {reason ? <p className="mt-1 text-rose-800/80">Why it is wrong: {reason}</p> : null}
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