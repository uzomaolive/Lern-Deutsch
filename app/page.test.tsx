import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Home from "@/app/page";
import { ProgressProvider } from "@/components/progress/ProgressProvider";

function renderHome() {
  render(
    <ProgressProvider>
      <Home />
    </ProgressProvider>,
  );
}

describe("Home (course map)", () => {
  beforeEach(() => localStorage.clear());

  it("renders both levels with their unit structure", () => {
    renderHome();
    expect(screen.getByRole("heading", { name: /Lern Deutsch/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /^A1/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /^A2/ })).toBeInTheDocument();
    expect(screen.getAllByText("Kennenlernen").length).toBeGreaterThan(0);
  });

  it("links ready lessons and marks planned ones as coming soon", () => {
    renderHome();
    expect(
      screen.getByRole("link", { name: /Hallo und Guten Tag/ }),
    ).toHaveAttribute("href", "/l/a1/kennenlernen/hallo-und-guten-tag");
    expect(screen.getAllByText("Coming soon").length).toBeGreaterThan(0);
  });
});