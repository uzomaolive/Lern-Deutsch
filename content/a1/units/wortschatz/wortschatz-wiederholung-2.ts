import type { Lesson } from "../../../schema";

export const wortschatzWiederholung2: Lesson = {
  id: "wortschatz-wiederholung-2",
  title: "Wortschatz-Wiederholung 2",
  summary: "Review the A1 words of health, transport, directions, and services.",
  status: "ready",
  sections: [
    { heading: "Wiederholung 2: Gesundheit, Verkehr, Stadt", blocks: [
      { type: 'paragraph', text: "This review mixes health, transport, directions, and services. These are the words of the doctor's office, the bus stop, and the bank. If a word is new, jump back to its letter lesson and read the section again." }
    ] }
  ],
  vocab: [
    { id: "w001", de: "der Arzt", en: "the doctor", part: "noun m.", audio: true },
    { id: "w002", de: "das Fieber", en: "the fever", part: "noun n.", audio: true },
    { id: "w003", de: "das Medikament", en: "the medicine", part: "noun n.", audio: true },
    { id: "w004", de: "der Kopf", en: "the head", part: "noun m.", audio: true },
    { id: "w005", de: "die Hand", en: "the hand", part: "noun f.", audio: true },
    { id: "w006", de: "der Fuß", en: "the foot", part: "noun m.", audio: true },
    { id: "w007", de: "der Bus", en: "the bus", part: "noun m.", audio: true },
    { id: "w008", de: "der Zug", en: "the train", part: "noun m.", audio: true },
    { id: "w009", de: "die Haltestelle", en: "the stop", part: "noun f.", audio: true },
    { id: "w010", de: "der Bahnsteig", en: "the platform", part: "noun m.", audio: true },
    { id: "w011", de: "links", en: "left", part: "adverb", audio: true },
    { id: "w012", de: "rechts", en: "right", part: "adverb", audio: true },
    { id: "w013", de: "geradeaus", en: "straight ahead", part: "adverb", audio: true },
    { id: "w014", de: "die Apotheke", en: "the pharmacy", part: "noun f.", audio: true },
    { id: "w015", de: "das Krankenhaus", en: "the hospital", part: "noun n.", audio: true },
    { id: "w016", de: "die Polizei", en: "the police", part: "noun f.", audio: true },
    { id: "w017", de: "das Konto", en: "the bank account", part: "noun n.", audio: true },
    { id: "w018", de: "die Post", en: "the post office", part: "noun f.", audio: true },
    { id: "w019", de: "das Paket", en: "the parcel", part: "noun n.", audio: true },
    { id: "w020", de: "der Brief", en: "the letter", part: "noun m.", audio: true },
  ],
  exercises: [
{"id": "wth2-mc-1", "type": "multiple-choice", "title": "Übung 1", "instruction": "What does this word mean?", "prompt": "der Arzt", "options": ["the doctor", "the fever", "the medicine"], "correctIndex": 0, "explain": "der Arzt means the doctor."},
{"id": "wth2-mc-2", "type": "multiple-choice", "title": "Übung 2", "instruction": "What does this word mean?", "prompt": "das Fieber", "options": ["the fever", "the doctor", "the medicine"], "correctIndex": 0, "explain": "das Fieber means the fever."},
{"id": "wth2-mc-3", "type": "multiple-choice", "title": "Übung 3", "instruction": "What does this word mean?", "prompt": "das Medikament", "options": ["the medicine", "the doctor", "the fever"], "correctIndex": 0, "explain": "das Medikament means the medicine."},
{"id": "wth2-mc-4", "type": "multiple-choice", "title": "Übung 4", "instruction": "What does this word mean?", "prompt": "der Kopf", "options": ["the head", "the doctor", "the fever"], "correctIndex": 0, "explain": "der Kopf means the head."},
{"id": "wth2-mc-5", "type": "multiple-choice", "title": "Übung 5", "instruction": "What does this word mean?", "prompt": "die Hand", "options": ["the hand", "the doctor", "the fever"], "correctIndex": 0, "explain": "die Hand means the hand."},
{"id": "wth2-mc-6", "type": "multiple-choice", "title": "Übung 6", "instruction": "What does this word mean?", "prompt": "der Fuß", "options": ["the foot", "the doctor", "the fever"], "correctIndex": 0, "explain": "der Fuß means the foot."},
{"id": "wth2-cards", "type": "flashcard", "title": "Wortschatz-Wiederholung", "instruction": "Say the German word out loud before revealing.", "items": [{"front": "der Arzt", "back": "the doctor", "frontAudio": true}, {"front": "das Fieber", "back": "the fever", "frontAudio": true}, {"front": "das Medikament", "back": "the medicine", "frontAudio": true}, {"front": "der Kopf", "back": "the head", "frontAudio": true}, {"front": "die Hand", "back": "the hand", "frontAudio": true}, {"front": "der Fuß", "back": "the foot", "frontAudio": true}, {"front": "der Bus", "back": "the bus", "frontAudio": true}, {"front": "der Zug", "back": "the train", "frontAudio": true}, {"front": "die Haltestelle", "back": "the stop", "frontAudio": true}, {"front": "der Bahnsteig", "back": "the platform", "frontAudio": true}, {"front": "links", "back": "left", "frontAudio": true}, {"front": "rechts", "back": "right", "frontAudio": true}, {"front": "geradeaus", "back": "straight ahead", "frontAudio": true}, {"front": "die Apotheke", "back": "the pharmacy", "frontAudio": true}, {"front": "das Krankenhaus", "back": "the hospital", "frontAudio": true}, {"front": "die Polizei", "back": "the police", "frontAudio": true}, {"front": "das Konto", "back": "the bank account", "frontAudio": true}, {"front": "die Post", "back": "the post office", "frontAudio": true}, {"front": "das Paket", "back": "the parcel", "frontAudio": true}, {"front": "der Brief", "back": "the letter", "frontAudio": true}]}
  ],
};
