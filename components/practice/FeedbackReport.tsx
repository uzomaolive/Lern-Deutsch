"use client";

import { SpeakButton } from "@/components/ui/SpeakButton";
import type { SpeakingTopic } from "@/content/practice/schema";
import type { CoverageReport } from "@/lib/practice/coverage";
import { countWords } from "@/lib/practice/timing";

interface FeedbackReportProps {
  topic: SpeakingTopic;
  coverage: CoverageReport;
  transcript: string;
  speakingSeconds: number;
  playbackUrl: string;
}

function CoverageRow({
  label,
  used,
  checklist,
}: {
  label: string;
  used: string[];
  checklist: string[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
        {label}: {used.length}/{checklist.length}
      </p>
      <ul className="mt-1 flex flex-wrap gap-1.5">
        {checklist.map((item) => {
          const hit = used.includes(item);
          return (
            <li
              key={item}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                hit
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-stone-100 text-stone-500"
              }`}
            >
              {hit ? "✓" : "–"} {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * The post-speaking report: what was transcribed, which cheat-sheet items
 * the learner used, stats, and a local replay of their recording.
 */
export function FeedbackReport({
  topic,
  coverage,
  transcript,
  speakingSeconds,
  playbackUrl,
}: FeedbackReportProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-lg font-semibold text-emerald-900">
          Abdeckung: {coverage.coveragePercent}% der Vorgaben
        </p>
        <p className="mt-1 text-sm text-emerald-800">
          {countWords(transcript)} Wörter in {speakingSeconds} Sekunden
          gesprochen.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <CoverageRow
          label="Wörter"
          used={coverage.usedWords}
          checklist={topic.cheat.words}
        />
        <CoverageRow
          label="Satzanfänge"
          used={coverage.usedStarters}
          checklist={topic.cheat.sentenceStarters}
        />
        <CoverageRow
          label="Verbindungswörter"
          used={coverage.usedConnectors}
          checklist={topic.cheat.connectors}
        />
      </div>

      {transcript.trim().length > 0 ? (
        <div className="rounded-lg border border-stone-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Was Sie gesagt haben
          </p>
          <p className="mt-1 text-stone-800">{transcript}</p>
        </div>
      ) : null}

      {playbackUrl ? (
        <div className="rounded-lg border border-stone-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Ihre Aufnahme (nur auf diesem Gerät)
          </p>
          <audio controls src={playbackUrl} className="mt-2 w-full" />
        </div>
      ) : null}

      {coverage.missed.length > 0 ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">Nicht verwendet — probieren Sie es noch einmal:</p>
          <ul className="mt-1 list-inside list-disc">
            {coverage.missed.map((item) => (
              <li key={item}>
                {item} <SpeakButton text={item} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-900">
          Alle Vorgaben verwendet. Stark!
        </p>
      )}
    </div>
  );
}