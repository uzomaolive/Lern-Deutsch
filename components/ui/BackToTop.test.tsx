import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BackToTop } from "./BackToTop";

describe("BackToTop", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      writable: true,
      value: 0,
    });
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function scrollTo(y: number) {
    window.scrollY = y;
    fireEvent.scroll(window);
  }

  it("is not rendered near the top of the page", () => {
    render(<BackToTop />);
    expect(screen.queryByRole("button", { name: "Back to top" })).toBeNull();
  });

  it("appears after scrolling and returns to the top on click", async () => {
    const scrollToSpy = vi.fn();
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      writable: true,
      value: scrollToSpy,
    });

    render(<BackToTop />);
    scrollTo(800);

    const button = screen.getByRole("button", { name: "Back to top" });
    await userEvent.click(button);
    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("disappears again when scrolled back to the top", async () => {
    render(<BackToTop />);
    scrollTo(800);
    expect(screen.getByRole("button", { name: "Back to top" })).toBeInTheDocument();

    scrollTo(0);
    expect(screen.queryByRole("button", { name: "Back to top" })).toBeNull();
  });

  it("respects reduced motion preferences", async () => {
    const scrollToSpy = vi.fn();
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      writable: true,
      value: scrollToSpy,
    });
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );

    render(<BackToTop />);
    scrollTo(800);
    await userEvent.click(screen.getByRole("button", { name: "Back to top" }));
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });
});