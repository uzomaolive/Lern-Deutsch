import type { Unit } from "../../../schema";
import { geschichteSchluessel } from "./geschichte-01-schluessel";
import { geschichteMarkt } from "./geschichte-02-markt";
import { geschichteOma } from "./geschichte-03-oma";
import { geschichteZug } from "./geschichte-04-zug";
import { geschichteArzt } from "./geschichte-05-arzt";
import { geschichteUmzug } from "./geschichte-06-umzug";
import { geschichteArbeit } from "./geschichte-07-arbeit";
import { geschichteRegen } from "./geschichte-08-regen";
import { geschichteGeburtstag } from "./geschichte-09-ueberraschung";
import { geschichteRestaurant } from "./geschichte-10-restaurant";

export const kurzgeschichten: Unit = {
  id: "kurzgeschichten",
  title: "Kurzgeschichten",
  theme: "Leseverstehen: kurze Geschichten über den Alltag",
  lessons: [
    geschichteSchluessel,
    geschichteMarkt,
    geschichteOma,
    geschichteZug,
    geschichteArzt,
    geschichteUmzug,
    geschichteArbeit,
    geschichteRegen,
    geschichteGeburtstag,
    geschichteRestaurant,
  ],
};