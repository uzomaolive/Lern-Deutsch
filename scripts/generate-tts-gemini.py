#!/usr/bin/env python3
"""Concurrent natural German audio generation using Google Gemini TTS.

Reads scripts/tts-strings.json and synthesises every string with the Gemini
TTS model. Generated audio is stored as WAV files under public/tts/<voice>/.
The file name is the same FNV-1a hash used by the Edge script so the browser
runtime finds the right file without any schema changes.

After generation the script merges its new voice entry into audio-manifest.ts,
preserving any existing Edge (or other) voice entries already in that file.

Usage:
  python3 scripts/generate-tts-gemini.py            # all strings, primary model
  python3 scripts/generate-tts-gemini.py 100        # first 100 strings

Environment variables (all optional except GOOGLE_API_KEY):
  GOOGLE_API_KEY       Required. Gemini API key.
  TTS_MODEL            Gemini TTS model name.
                       Default: gemini-3.1-flash-tts-preview
                       Fallback: gemini-2.5-flash-preview-tts
  TTS_VOICE            Prebuilt voice name.  Default: Kore
                       Other options: Aoede, Charon, Fenrir, Leda, Orus, Puck,
                       Zephyr (and any new voices added by Google).
  TTS_LANGUAGE         BCP-47 language code.  Default: de-DE
  GEMINI_CONCURRENCY   Max concurrent API requests.  Default: 3
                       Free tier is ~10 RPM; paid tiers support much higher.

Requirements:
  pip install google-genai
"""

import asyncio
import base64
import io
import json
import os
import sys
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STRINGS_FILE = ROOT / "scripts" / "tts-strings.json"
OUT_DIR = ROOT / "public" / "tts"
MANIFEST = ROOT / "lib" / "tts" / "audio-manifest.ts"

# ---------------------------------------------------------------------------
# Configuration (from environment with documented defaults)
# ---------------------------------------------------------------------------

API_KEY = os.environ.get("GOOGLE_API_KEY") or os.environ.get("GEMINI_API_KEY")

PRIMARY_MODEL = os.environ.get("TTS_MODEL", "gemini-3.1-flash-tts-preview")
FALLBACK_MODEL = "gemini-2.5-flash-preview-tts"

# Voice name used in the API call (lowercase) and as the public directory / ID.
_TTS_VOICE_RAW = os.environ.get("TTS_VOICE", "Kore")
VOICE_KEY = _TTS_VOICE_RAW[0].upper() + _TTS_VOICE_RAW[1:].lower()  # PascalCase, e.g. "Kore"
VOICE_API_NAME = _TTS_VOICE_RAW.lower()                               # lowercase for SDK

LANGUAGE = os.environ.get("TTS_LANGUAGE", "de-DE")
CONCURRENCY = int(os.environ.get("GEMINI_CONCURRENCY", "3"))

# ---------------------------------------------------------------------------
# Speaking style instruction sent as system_instruction.
# This guides the model to produce natural conversational German rather than
# the robotic, exaggerated, or overly formal speech typical of traditional TTS.
# ---------------------------------------------------------------------------

SYSTEM_INSTRUCTION = (
    "Speak in natural Standard German (Hochdeutsch) as a friendly native German "
    "speaker teaching a language learner. Speak conversationally and naturally, "
    "with realistic German rhythm, intonation, stress, and pauses. Do not sound "
    "robotic, theatrical, exaggerated, or like a news presenter. Pronounce every "
    "German word naturally and clearly. Use normal conversational pacing. For "
    "questions, use natural German question intonation. Do not over-emphasise "
    "individual words."
)


# ---------------------------------------------------------------------------
# Utilities
# ---------------------------------------------------------------------------


def tts_hash(text: str) -> str:
    """FNV-1a 32-bit hash — mirrors lib/tts/hash.ts exactly."""
    h = 2166136261
    for ch in text:
        h ^= ord(ch)
        h = (h * 16777619) & 0xFFFFFFFF
    return f"{h:08x}"


def pcm_to_wav(
    pcm: bytes,
    sample_rate: int = 24000,
    channels: int = 1,
    bits_per_sample: int = 16,
) -> bytes:
    """Wrap raw PCM bytes in a WAV container."""
    buf = io.BytesIO()
    with wave.open(buf, "wb") as w:
        w.setnchannels(channels)
        w.setsampwidth(bits_per_sample // 8)
        w.setframerate(sample_rate)
        w.writeframes(pcm)
    return buf.getvalue()


def ensure_wav(audio: bytes, mime_type: str) -> bytes:
    """Return audio in WAV format regardless of input mime_type."""
    mt = mime_type.lower()
    if mt.startswith(("audio/wav", "audio/wave", "audio/x-wav")):
        return audio
    if mt.startswith(("audio/pcm", "audio/l16", "audio/raw")):
        rate = 24000
        for part in mt.split(";"):
            part = part.strip()
            if part.startswith("rate="):
                try:
                    rate = int(part[5:])
                except ValueError:
                    pass
        return pcm_to_wav(audio, sample_rate=rate)
    # Unknown format — return as-is and let the WAV extension be a hint.
    print(f"  Warning: unrecognised audio mime_type '{mime_type}', writing as-is.")
    return audio


# ---------------------------------------------------------------------------
# Manifest helpers  (shared format with generate-tts-edge.py)
# ---------------------------------------------------------------------------


def parse_existing_voices(manifest_path: Path) -> list[dict]:
    """Parse voice entries from audio-manifest.ts.

    Returns an empty list if the file is absent or cannot be parsed.
    """
    if not manifest_path.exists():
        return []
    content = manifest_path.read_text(encoding="utf-8")
    marker = "ttsAudioVoices: TtsVoiceManifest[] = "
    if marker not in content:
        return []
    try:
        start = content.index(marker) + len(marker)
        array_text = content[start:].rstrip()
        if array_text.endswith(";"):
            array_text = array_text[:-1].rstrip()
        return json.loads(array_text)
    except (ValueError, json.JSONDecodeError):
        return []


def write_manifest(voices: list[dict], manifest_path: Path) -> None:
    """Write (or overwrite) audio-manifest.ts from the supplied voice list."""
    ts = (
        "/** @generated by scripts/generate-tts-edge.py and "
        "scripts/generate-tts-gemini.py \u2014 do not edit. */\n"
        "export interface TtsVoiceManifest {\n"
        '  id: string;\n  label: string;\n  ext: "wav" | "mp3";\n  hashes: string[];\n'
        "}\n\n"
        "export const ttsAudioVoices: TtsVoiceManifest[] = "
        + json.dumps(voices, indent=2)
        + ";\n"
    )
    manifest_path.write_text(ts, encoding="utf-8")


# ---------------------------------------------------------------------------
# Synthesis
# ---------------------------------------------------------------------------


async def synthesize_one(
    text: str,
    model: str,
    client,
) -> bytes:
    """Call the Gemini TTS API and return WAV bytes for the given text."""
    from google.genai import types

    response = await client.aio.models.generate_content(
        model=model,
        contents=text,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION,
            response_modalities=["AUDIO"],
            speech_config=types.SpeechConfig(
                voice_config=types.VoiceConfig(
                    prebuilt_voice_config=types.PrebuiltVoiceConfig(
                        voice_name=VOICE_API_NAME
                    )
                ),
                language_code=LANGUAGE,
            ),
        ),
    )

    for part in response.parts:
        if part.inline_data:
            raw = part.inline_data.data
            # The SDK typically decodes base64 automatically; guard for both.
            if isinstance(raw, str):
                raw = base64.b64decode(raw)
            mime = part.inline_data.mime_type or "audio/wav"
            return ensure_wav(raw, mime)

    raise RuntimeError(f"Gemini returned no audio part for text: {text!r}")


async def detect_model(client) -> str:
    """Return the first model in [PRIMARY_MODEL, FALLBACK_MODEL] that works.

    Tests each candidate with a one-word probe so we fail fast at startup
    rather than after hundreds of API calls.
    """
    probe = "Hallo"
    candidates = [PRIMARY_MODEL]
    if FALLBACK_MODEL != PRIMARY_MODEL:
        candidates.append(FALLBACK_MODEL)

    for model in candidates:
        try:
            await synthesize_one(probe, model, client)
            print(f"TTS model: {model}")
            return model
        except Exception as exc:  # noqa: BLE001
            print(f"Model '{model}' unavailable ({exc}), trying next...")

    raise RuntimeError(
        f"Neither '{PRIMARY_MODEL}' nor '{FALLBACK_MODEL}' is available. "
        "Check your GOOGLE_API_KEY and try again."
    )


async def worker(
    semaphore: asyncio.Semaphore,
    text: str,
    target: Path,
    model: str,
    client,
) -> bool:
    """Generate a single audio clip, skipping if the file already exists."""
    async with semaphore:
        if target.exists():
            return True
        try:
            audio = await synthesize_one(text, model, client)
            target.write_bytes(audio)
            return True
        except Exception as exc:  # noqa: BLE001
            print(f"  Error synthesising {text!r:.40}: {exc}")
            return False


async def generate_voice(strings: list[str], model: str, client) -> list[str]:
    """Generate WAV clips for every string and return the list of hashes."""
    voice_dir = OUT_DIR / VOICE_KEY
    voice_dir.mkdir(parents=True, exist_ok=True)

    semaphore = asyncio.Semaphore(CONCURRENCY)
    hashes: list[str] = []
    tasks = []

    for text in strings:
        h = tts_hash(text)
        hashes.append(h)
        target = voice_dir / f"{h}.wav"
        if not target.exists():
            tasks.append(worker(semaphore, text, target, model, client))

    skipped = len(strings) - len(tasks)
    print(
        f"  [{VOICE_KEY}] {len(strings)} strings: "
        f"{len(tasks)} to generate, {skipped} already cached"
    )

    results = await asyncio.gather(*tasks)
    done = sum(1 for ok in results if ok)
    failed = len(tasks) - done
    if failed:
        print(f"  [{VOICE_KEY}] {done} generated, {failed} FAILED")
    else:
        print(f"  [{VOICE_KEY}] {done} generated, 0 failed")

    return hashes


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------


async def main() -> None:
    if not API_KEY:
        print(
            "Error: GOOGLE_API_KEY (or GEMINI_API_KEY) environment variable is not set.\n"
            "Get a key at https://aistudio.google.com/apikey and export it before running."
        )
        sys.exit(1)

    try:
        from google import genai  # noqa: PLC0415
    except ImportError:
        print(
            "Error: google-genai is not installed.\n"
            "Install it with:  pip install google-genai"
        )
        sys.exit(1)

    limit: int | None = None
    if len(sys.argv) > 1:
        limit = int(sys.argv[1])

    strings = json.loads(STRINGS_FILE.read_text(encoding="utf-8"))
    if limit:
        strings = strings[:limit]

    print(
        f"Gemini TTS — voice: {VOICE_KEY!r}, language: {LANGUAGE!r}, "
        f"concurrency: {CONCURRENCY}"
    )
    print(f"Generating {len(strings)} strings ...")

    client = genai.Client(api_key=API_KEY)
    model = await detect_model(client)

    hashes = await generate_voice(strings, model, client)

    # Build the new voice entry.
    gemini_entry: dict = {
        "id": VOICE_KEY,
        "label": f"{VOICE_KEY} (Gemini AI)",
        "ext": "wav",
        "hashes": sorted(hashes),
    }

    # Merge into the existing manifest: preserve all voices except the one
    # we just regenerated (handles voice changes cleanly).
    existing = [v for v in parse_existing_voices(MANIFEST) if v["id"] != VOICE_KEY]
    # Gemini voice goes after Edge voices to match the auto-play fallback order
    # in tts.ts (Edge voices are preferred when the user is in Auto mode).
    voices = existing + [gemini_entry]
    write_manifest(voices, MANIFEST)

    total = sum(len(v["hashes"]) for v in voices)
    print(
        f"Manifest written: {total} clips across {len(voices)} voices "
        f"({VOICE_KEY} has {len(gemini_entry['hashes'])} clips)"
    )


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Interrupted.")
        sys.exit(1)
