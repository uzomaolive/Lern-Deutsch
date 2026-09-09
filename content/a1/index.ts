import type { Level } from "../schema";
import { kennenlernen } from "./units/kennenlernen";
import { familieUndFreunde } from "./units/familie-und-freunde";
import { essenUndTrinken } from "./units/essen-und-trinken";
import { tagesablaufUndZeit } from "./units/tagesablauf-und-zeit";
import { wohnen } from "./units/wohnen";
import { arbeitUndBeruf } from "./units/arbeit-und-beruf";
import { stadtUndOrientierung } from "./units/stadt-und-orientierung";
import { einkaufen } from "./units/einkaufen";
import { gesundheitUndKoerper } from "./units/gesundheit-und-koerper";
import { freizeitUndReisen } from "./units/freizeit-und-reisen";
import { grammatikKompakt1 } from "./units/grammatik-kompakt-1";
import { grammatikKompakt2 } from "./units/grammatik-kompakt-2";
import { wortschatz } from "./units/wortschatz";

export const a1: Level = {
  id: "a1",
  title: "A1",
  subtitle: "Beginner",
  description:
    "Greetings, introductions, daily life, and the foundations of German grammar: present tense, cases, and word order.",
  units: [
    kennenlernen,
    familieUndFreunde,
    essenUndTrinken,
    tagesablaufUndZeit,
    wohnen,
    arbeitUndBeruf,
    stadtUndOrientierung,
    einkaufen,
    gesundheitUndKoerper,
    freizeitUndReisen,
    grammatikKompakt1,
    grammatikKompakt2,
    wortschatz,
  ],
};