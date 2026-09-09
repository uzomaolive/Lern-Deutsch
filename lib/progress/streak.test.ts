import { describe, expect, it } from "vitest";
import { nextStreak, todayKey, yesterdayKey } from "./streak";

describe("todayKey", () => {
  it("formats a local date as YYYY-MM-DD", () => {
    expect(todayKey(new Date(2026, 8, 9))).toBe("2026-09-09");
    expect(todayKey(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

describe("yesterdayKey", () => {
  it("handles month boundaries", () => {
    expect(yesterdayKey(new Date(2026, 8, 1))).toBe("2026-08-31");
  });

  it("handles year boundaries", () => {
    expect(yesterdayKey(new Date(2026, 0, 1))).toBe("2025-12-31");
  });
});

describe("nextStreak", () => {
  it("keeps the streak when active today", () => {
    expect(nextStreak("2026-09-08", "2026-09-09", 2)).toBe(3);
  });

  it("does not double-count within the same day", () => {
    expect(nextStreak("2026-09-09", "2026-09-09", 2)).toBe(2);
  });

  it("restarts after a missed day", () => {
    expect(nextStreak("2026-09-07", "2026-09-09", 5)).toBe(1);
  });

  it("starts at one on the very first day", () => {
    expect(nextStreak(null, "2026-09-09", 0)).toBe(1);
  });
});