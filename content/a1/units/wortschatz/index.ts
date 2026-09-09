import type { Unit } from "../../../schema";
import { wortschatzAD } from "./wortschatz-a-d";
import { wortschatzEI } from "./wortschatz-e-i";
import { wortschatzJM } from "./wortschatz-j-m";
import { wortschatzNR } from "./wortschatz-n-r";
import { wortschatzSZ } from "./wortschatz-s-z";
import { wortschatzWortgruppen } from "./wortschatz-wortgruppen";
import { wortschatzWiederholung1 } from "./wortschatz-wiederholung-1";
import { wortschatzWiederholung2 } from "./wortschatz-wiederholung-2";

export const wortschatz: Unit = {
  id: "wortschatz",
  title: "Wortschatz (Goethe A1 Wortliste)",
  theme: "The official Goethe A1 vocabulary",
  lessons: [
    wortschatzAD,
    wortschatzEI,
    wortschatzJM,
    wortschatzNR,
    wortschatzSZ,
    wortschatzWortgruppen,
    wortschatzWiederholung1,
    wortschatzWiederholung2,
  ],
};