"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Local audio recording via MediaRecorder. The recording stays on the
 * device: it becomes an object URL that the page plays back and nothing is
 * uploaded anywhere.
 */

export interface MediaRecorderHandle {
  /** True when the browser can record audio. */
  supported: boolean;
  /** True while recording. */
  recording: boolean;
  /** Object URL of the finished recording; empty until a session ends. */
  playbackUrl: string;
  /** Recording duration in seconds. */
  durationSeconds: number;
  start: () => Promise<void>;
  stop: () => void;
  clear: () => void;
}

export function useMediaRecorder(): MediaRecorderHandle {
  const [supported] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.MediaRecorder !== "undefined",
  );
  const [recording, setRecording] = useState(false);
  const [playbackUrl, setPlaybackUrl] = useState("");
  const [durationSeconds, setDurationSeconds] = useState(0);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      recorderRef.current = null;
      if (playbackUrl) URL.revokeObjectURL(playbackUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback(async () => {
    if (!supported || recording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        if (playbackUrl) URL.revokeObjectURL(playbackUrl);
        setPlaybackUrl(URL.createObjectURL(blob));
        if (startedAtRef.current !== null) {
          setDurationSeconds(
            Math.round((Date.now() - startedAtRef.current) / 1000),
          );
        }
        startedAtRef.current = null;
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };
      recorderRef.current = recorder;
      startedAtRef.current = Date.now();
      setDurationSeconds(0);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (startedAtRef.current !== null) {
          setDurationSeconds(
            Math.round((Date.now() - startedAtRef.current) / 1000),
          );
        }
      }, 1000);
      recorder.start();
      setRecording(true);
    } catch {
      // Microphone permission denied or unavailable: keep timer-only mode.
    }
  }, [playbackUrl, recording, supported]);

  const stop = useCallback(() => {
    if (!recording || !recorderRef.current) return;
    if (timerRef.current) clearInterval(timerRef.current);
    recorderRef.current.stop();
    setRecording(false);
  }, [recording]);

  const clear = useCallback(() => {
    if (playbackUrl) URL.revokeObjectURL(playbackUrl);
    setPlaybackUrl("");
    setDurationSeconds(0);
  }, [playbackUrl]);

  return { supported, recording, playbackUrl, durationSeconds, start, stop, clear };
}