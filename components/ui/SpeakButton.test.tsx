import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SpeakButton } from "./SpeakButton";

describe("SpeakButton", () => {
  it("renders a disabled button when speech synthesis is unavailable", () => {
    render(<SpeakButton text="Hallo" />);
    expect(screen.getByRole("button", { name: "Hear Hallo" })).toBeDisabled();
  });
});