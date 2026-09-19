/**
 * Collects every German string that the app speaks and writes it to
 * scripts/tts-strings.json for the Python generator (edge-tts) to synthesize.
 *
 * Usage: npx tsx scripts/collect-tts-strings.ts
 */

import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { levels } from "../content";
import { games } from "../content/games";
import { practiceTopics } from "../content/practice";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(ROOT, "scripts", "tts-strings.json");

function spokenStrings(): string[] {
  const seen = new Set<string>();

  function add(text: string | undefined) {
    const trimmed = text?.trim();
    if (trimmed && trimmed.length > 0) seen.add(trimmed);
  }

  for (const level of levels) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        for (const item of lesson.vocab) {
          if (item.audio) add(item.de);
        }
        for (const section of lesson.sections) {
          for (const block of section.blocks) {
            if (block.type === "example") add(block.de);
            else if (block.type === "gloss") add(block.de);
          }
        }
        for (const exercise of lesson.exercises) {
          if (exercise.type === "listening") add(exercise.prompt);
          else if (exercise.type === "flashcard") {
            for (const item of exercise.items) {
              // frontAudioText overrides front for TTS when front is a
              // display-only label that would be mispronounced in isolation.
              if (item.frontAudio) add(item.frontAudioText ?? item.front);
            }
          }
        }
      }
    }
  }

  for (const game of games) {
    for (const level of game.levels) {
      for (const round of level.rounds) {
        if (round.kind === "exercise") {
          const exercise = round.exercise;
          if (exercise.type === "listening") add(exercise.prompt);
          else if (exercise.type === "flashcard") {
            for (const item of exercise.items) {
              if (item.frontAudio) add(item.frontAudioText ?? item.front);
            }
          }
        } else if (round.kind === "memory") {
          for (const card of round.cards) {
            if (card.audio) add(card.de);
          }
        } else if (round.kind === "sort") {
          for (const category of round.categories) {
            for (const item of category.items) add(item);
          }
        } else if (round.kind === "repeat") {
          for (const phrase of round.phrases) add(phrase);
        }
      }
    }
  }

  for (const bank of practiceTopics) {
    for (const topic of bank.topics) {
      add(topic.example);
      for (const word of topic.cheat.words) add(word);
    }
  }

  return [...seen].sort();
}

async function main() {
  const strings = spokenStrings();
  await writeFile(OUT, JSON.stringify(strings, null, 2) + "\n");
  console.log(`Wrote ${strings.length} strings to ${OUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});