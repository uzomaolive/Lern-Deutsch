/**
 * Build-time TTS generator using Google Gemini TTS (AI Studio / Gemini API).
 *
 * Walks every lesson (vocab items with audio, example blocks, gloss blocks,
 * listening prompts, flashcards with frontAudio) and every game (memory cards,
 * sort items, repeat phrases) and generates an .mp3 for each unique German
 * string, saved to public/tts/<hash>.mp3. Writes lib/tts/audio-manifest.ts
 * so the runtime knows which files exist.
 *
 * Usage:
 *   GEMINI_API_KEY=... npx tsx scripts/generate-tts.ts
 *
 * Requires a free API key from https://aistudio.google.com/apikey
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { levels } from "../content";
import { games } from "../content/games";
import { ttsHash } from "../lib/tts/hash";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT_DIR = join(ROOT, "public", "tts");
const MANIFEST_PATH = join(ROOT, "lib", "tts", "audio-manifest.ts");

const API_KEY = process.env.GEMINI_API_KEY;
const VOICE = process.env.GEMINI_TTS_VOICE ?? "Fenrir";
const MODEL = process.env.GEMINI_TTS_MODEL ?? "gemini-3.1-flash-tts";

function spokenStrings(): Set<string> {
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
              if (item.frontAudio) add(item.front);
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
              if (item.frontAudio) add(item.front);
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

  return seen;
}

async function synthesize(text: string): Promise<Buffer> {
  if (!API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not set. Get a free key at https://aistudio.google.com/apikey",
    );
  }
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: VOICE },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Gemini TTS error ${response.status}: ${body.slice(0, 300)}`);
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { inlineData?: { data?: string } }[] } }[];
  };
  const audio = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!audio) {
    throw new Error(`No audio returned for: ${text}`);
  }
  return Buffer.from(audio, "base64");
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const strings = [...spokenStrings()].sort();
  const generated: string[] = [];

  if (existsSync(MANIFEST_PATH)) {
    const previous = await readFile(MANIFEST_PATH, "utf8");
    const match = previous.match(/\[([\s\S]*?)\]/);
    if (match) {
      const existing = match[1]
        .split(",")
        .map((line) => line.trim().replace(/^"|"$/g, ""))
        .filter(Boolean);
      generated.push(...existing);
    }
  }

  const existingFiles = new Set<string>();
  const files = await import("node:fs/promises").then(({ readdir }) => readdir(OUT_DIR));
  for (const file of files) existingFiles.add(file);

  console.log(`Total unique spoken strings: ${strings.length}`);
  console.log(`Voice: ${VOICE} · Model: ${MODEL}`);

  let skipped = 0;
  let done = 0;
  let failed = 0;

  for (const text of strings) {
    const hash = ttsHash(text);
    const filename = `${hash}.mp3`;
    if (generated.includes(hash) || existingFiles.has(filename)) {
      skipped++;
      continue;
    }
    try {
      const audio = await synthesize(text);
      await writeFile(join(OUT_DIR, filename), audio);
      generated.push(hash);
      done++;
      if (done % 25 === 0) {
        console.log(`  generated ${done} (${skipped} skipped, ${failed} failed)`);
      }
    } catch (error) {
      failed++;
      console.error(`  FAILED: ${text} -> ${error instanceof Error ? error.message : error}`);
    }
    // Be gentle with the API.
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  const manifest = `/** @generated by scripts/generate-tts.ts — do not edit. */
export const ttsAudioHashes: string[] = ${JSON.stringify(generated, null, 2)};
`;
  await writeFile(MANIFEST_PATH, manifest);

  console.log(
    `Done: ${done} generated, ${skipped} skipped, ${failed} failed. Total in manifest: ${generated.length}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});