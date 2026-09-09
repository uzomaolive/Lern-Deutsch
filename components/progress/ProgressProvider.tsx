"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  emptyState,
  LocalStorageProgress,
  type ProgressState,
} from "@/lib/progress/store";
import {
  recordExercise as applyExerciseResult,
  recordFlashcard as applyFlashcardResult,
} from "@/lib/progress/reducer";

interface ProgressContextValue {
  state: ProgressState;
  recordExercise: (exerciseKey: string, percent: number) => void;
  recordFlashcard: (itemKey: string, correct: boolean) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => new LocalStorageProgress());
  const [state, setState] = useState<ProgressState>(() => store.load());

  const recordExercise = useCallback(
    (exerciseKey: string, percent: number) => {
      setState((previous) => {
        const next = applyExerciseResult(previous, exerciseKey, percent);
        store.save(next);
        return next;
      });
    },
    [store],
  );

  const recordFlashcard = useCallback(
    (itemKey: string, correct: boolean) => {
      setState((previous) => {
        const next = applyFlashcardResult(previous, itemKey, correct);
        store.save(next);
        return next;
      });
    },
    [store],
  );

  const value = useMemo(
    () => ({ state, recordExercise, recordFlashcard }),
    [state, recordExercise, recordFlashcard],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return context;
}