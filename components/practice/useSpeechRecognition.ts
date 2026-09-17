"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Web Speech API speech recognition for German. Works in Chrome and Edge;
 * returns supported=false elsewhere so the UI can degrade to timer-only
 * practice. Nothing is transmitted anywhere: recognition runs in the
 * browser and the transcript never leaves the page.
 */

export interface SpeechRecognitionHandle {
  /** True when the browser provides German speech recognition. */
  supported: boolean;
  /** True while the recognizer is listening. */
  listening: boolean;
  /** Live transcript of the current session, partial + final. */
  transcript: string;
  /** Final transcripts only, appended once per recognition result. */
  finalTranscript: string;
  /** Starts a listening session. Resolves false when unsupported. */
  start: () => void;
  /** Stops listening and returns the accumulated final transcript. */
  stop: () => string;
}

interface RecognitionAlternative {
  transcript: string;
}

interface RecognitionResult {
  isFinal: boolean;
  [index: number]: RecognitionAlternative;
}

interface RecognitionEvent {
  results: RecognitionResult[];
}

interface RecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type RecognitionCtor = new () => RecognitionLike;

function getRecognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function useSpeechRecognition(): SpeechRecognitionHandle {
  const recognitionRef = useRef<RecognitionLike | null>(null);
  const [supported] = useState(() => getRecognitionCtor() !== null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
    };
  }, []);

  const start = useCallback(() => {
    const ctor = getRecognitionCtor();
    if (!ctor) return;
    const recognition = new ctor();
    recognition.lang = "de-DE";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (const result of event.results) {
        const text = result[0].transcript;
        if (result.isFinal) final += text;
        else interim += text;
      }
      setTranscript((prev) => (interim ? final.trim() : prev + final.trim()));
      setFinalTranscript((prev) => prev + final.trim());
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech" || event.error === "aborted") {
        recognitionRef.current?.abort();
        setListening(false);
      }
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    setTranscript("");
    setFinalTranscript("");
    setListening(true);
    try {
      recognition.start();
    } catch {
      setListening(false);
    }
  }, []);

  const stop = useCallback((): string => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.stop();
      recognitionRef.current = null;
    }
    setListening(false);
    return finalTranscript;
  }, [finalTranscript]);

  return { supported, listening, transcript, finalTranscript, start, stop };
}