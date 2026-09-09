/**
 * Daily streak math, in local time. Pure functions, unit tested.
 */

export function todayKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function yesterdayKey(date: Date): string {
  const previous = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  return todayKey(previous);
}

/**
 * The streak after an activity on `today`.
 * Same day keeps the streak, an unbroken chain extends it, a gap resets to 1.
 */
export function nextStreak(
  lastActiveDay: string | null,
  today: string,
  currentStreak: number,
): number {
  if (lastActiveDay === today) return currentStreak;
  const date = parseKey(today);
  if (lastActiveDay === yesterdayKey(date)) return currentStreak + 1;
  return 1;
}

function parseKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}