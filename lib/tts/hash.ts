/**
 * Stable hash for TTS audio filenames. Shared between the build-time
 * generator (Node) and the runtime (browser) so both derive the same
 * filename for the same text. FNV-1a, 32-bit, hex, deterministic.
 */

export function ttsHash(text: string): string {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}