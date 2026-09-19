import type { Metadata } from "next";
import { SpeakingPractice } from "@/components/practice/SpeakingPractice";

export const metadata: Metadata = {
  title: "Sprechen üben",
  description:
    "Draw a random German speaking topic, prepare with a cheat sheet, then speak for one minute and see which words you used.",
};

export default function PracticePage() {
  return <SpeakingPractice />;
}