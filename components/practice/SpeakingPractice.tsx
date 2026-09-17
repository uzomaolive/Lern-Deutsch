"use client";

import { useCallback, useEffect, useState } from "react";
import { randomTopic, topicsForLevel } from "@/content/practice";
import type { SpeakingTopic } from "@/content/practice/schema";
import { buildCoverage } from "@/lib/practice/coverage";
import { formatCountdown } from "@/lib/practice/timing";
import { TopicCard } from "./TopicCard";
import { PrepTimer } from "./PrepTimer";
import { FeedbackReport } from "./FeedbackReport";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { useMediaRecorder } from "./useMediaRecorder";

type Phase = "setup" | "prep" | "speak" | "feedback";

const PREP_OPTIONS = [60, 120, 300, 900];
const SPEAK_SECONDS = 60;

/**
 * Speaking practice page. Flow: pick a level and prep time, draw a random
 * topic, prepare on a timer, speak for one minute while the browser
 * transcribes, then review coverage and a local recording.
 */
export function SpeakingPractice() {
  const [level, setLevel] = useState("a1");
  const [prepSeconds, setPrepSeconds] = useState(120);
  const [phase, setPhase] = useState<Phase>("setup");
  const [topic, setTopic] = useState<SpeakingTopic | null>(null);
  const [topicIndex, setTopicIndex] = useState(0);

  const [speakRemaining, setSpeakRemaining] = useState(SPEAK_SECONDS);
  const [speakingSeconds, setSpeakingSeconds] = useState(0);
  const [reportTranscript, setReportTranscript] = useState("");

  const recognition = useSpeechRecognition();
  const recorder = useMediaRecorder();

  const bank = topicsForLevel(level);

  const drawTopic = useCallback(() => {
    const drawn = randomTopic(level);
    if (drawn) {
      setTopic(drawn);
      setTopicIndex((index) => index + 1);
      setPhase("prep");
    }
  }, [level]);

  const finishSpeaking = useCallback(() => {
    const final = recognition.stop();
    recorder.stop();
    setReportTranscript(final);
    setSpeakingSeconds(SPEAK_SECONDS - speakRemaining);
    setPhase("feedback");
  }, [recognition, recorder, speakRemaining]);

  // Speaking countdown while the recognition/recorder session runs.
  useEffect(() => {
    if (phase !== "speak") return;
    if (speakRemaining <= 0) {
      // Defer the phase transition out of the effect's synchronous run to
      // avoid cascading renders from setState inside the effect.
      const id = setTimeout(finishSpeaking, 0);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setSpeakRemaining((value) => value - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, speakRemaining, finishSpeaking]);

  const startSpeaking = useCallback(() => {
    setSpeakRemaining(SPEAK_SECONDS);
    setSpeakingSeconds(0);
    setPhase("speak");
    recognition.start();
    void recorder.start();
  }, [recognition, recorder]);

  const newTopic = useCallback(() => {
    setReportTranscript("");
    recorder.clear();
    drawTopic();
  }, [drawTopic, recorder]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-stone-900">
        Sprechen üben
      </h1>
      <p className="mt-1 text-stone-600">
        Ziehen Sie ein Thema, bereiten Sie sich vor und sprechen Sie eine
        Minute. Die Auswertung zeigt Ihnen, welche Vorgaben Sie verwendet
        haben. Alles bleibt auf Ihrem Gerät.
      </p>

      {!recognition.supported ? (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          Hinweis: Ihr Browser unterstützt keine Spracherkennung. Sie können
          üben und Ihre Aufnahme anhören, die automatische Auswertung ist
          jedoch nur in Chrome oder Edge verfügbar.
        </p>
      ) : null}

      {phase === "setup" ? (
        <div className="mt-6 rounded-lg border border-stone-200 bg-white p-6">
          <div className="flex flex-wrap items-start gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                Ihr Niveau
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  aria-pressed={level === "a1"}
                  onClick={() => setLevel("a1")}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                    level === "a1"
                      ? "bg-amber-600 text-stone-950"
                      : "border border-stone-300 bg-white text-stone-700 hover:border-amber-500"
                  }`}
                >
                  A1
                </button>
                <button
                  type="button"
                  aria-pressed={level === "a2"}
                  onClick={() => setLevel("a2")}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                    level === "a2"
                      ? "bg-amber-600 text-stone-950"
                      : "border border-stone-300 bg-white text-stone-700 hover:border-amber-500"
                  }`}
                >
                  A2
                </button>
              </div>
              <p className="mt-2 text-sm text-stone-500">
                {bank?.topics.length ?? 0} Themen auf diesem Niveau.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                Vorbereitungszeit
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {PREP_OPTIONS.map((seconds) => (
                  <button
                    key={seconds}
                    type="button"
                    aria-pressed={prepSeconds === seconds}
                    onClick={() => setPrepSeconds(seconds)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                      prepSeconds === seconds
                        ? "bg-amber-600 text-stone-950"
                        : "border border-stone-300 bg-white text-stone-700 hover:border-amber-500"
                    }`}
                  >
                    {formatCountdown(seconds)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={drawTopic}
            className="mt-6 w-full rounded-lg bg-amber-600 px-4 py-3 text-base font-semibold text-stone-950 transition-colors hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Thema ziehen
          </button>
        </div>
      ) : null}

      {phase === "prep" && topic ? (
        <div className="mt-6 space-y-4">
          <TopicCard topic={topic} />
          <PrepTimer
            key={`${topic.id}-${topicIndex}`}
            seconds={prepSeconds}
            onComplete={startSpeaking}
          />
          <p className="text-sm text-stone-500">
            Lernen Sie die Wörter und Satzanfänge. Wenn die Zeit um ist,
            beginnt die Sprechphase.
          </p>
        </div>
      ) : null}

      {phase === "speak" && topic ? (
        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-stone-200 bg-white p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              Sprechen
            </p>
            <p
              aria-live="polite"
              className="mt-1 text-4xl font-semibold tabular-nums text-stone-900"
            >
              {formatCountdown(speakRemaining)}
            </p>
            <p className="mt-1 text-sm text-stone-500">
              {recognition.listening || recorder.recording
                ? "Mikrofon läuft, sprechen Sie!"
                : "Mikrofon nicht verfügbar, sprechen Sie laut."}
            </p>
            {recognition.supported ? (
              <div className="mt-3 rounded-lg bg-stone-50 p-3 text-left text-sm text-stone-700">
                <span className="font-medium">Live-Transkript:</span>{" "}
                {recognition.transcript || "…"}
              </div>
            ) : null}
            <button
              type="button"
              onClick={finishSpeaking}
              className="mt-4 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Fertig
            </button>
          </div>
        </div>
      ) : null}

      {phase === "feedback" && topic ? (
        <div className="mt-6 space-y-4">
          <FeedbackReport
            topic={topic}
            coverage={buildCoverage(topic.cheat, reportTranscript)}
            transcript={reportTranscript}
            speakingSeconds={speakingSeconds}
            playbackUrl={recorder.playbackUrl}
          />
          <button
            type="button"
            onClick={newTopic}
            className="w-full rounded-lg bg-amber-600 px-4 py-3 text-base font-semibold text-stone-950 transition-colors hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Neues Thema
          </button>
        </div>
      ) : null}
    </div>
  );
}