import type { Lesson } from "../../../schema";

export const wortschatzWiederholung1: Lesson = {
  id: "wortschatz-wiederholung-1",
  title: "Wortschatz-Wiederholung 1",
  summary: "Review the everyday words of A1: appointments, food, the apartment, clothes.",
  status: "ready",
  sections: [
    { heading: "Wiederholung 1: Alltag und Wohnen", blocks: [
      { type: 'paragraph', text: "This review mixes the everyday words of the first weeks in Germany: appointments and forms, food, the apartment, and clothes. Say each card aloud, then check the meaning. Repeat the deck until you know every word without thinking." }
    ] }
  ],
  vocab: [
    { id: "w001", de: "die Anmeldung", en: "the registration", part: "noun f.", audio: true },
    { id: "w002", de: "der Termin", en: "the appointment", part: "noun m.", audio: true },
    { id: "w003", de: "das Formular", en: "the form", part: "noun n.", audio: true },
    { id: "w004", de: "die Wohnung", en: "the apartment", part: "noun f.", audio: true },
    { id: "w005", de: "der Bahnhof", en: "the station", part: "noun m.", audio: true },
    { id: "w006", de: "die Fahrkarte", en: "the ticket", part: "noun f.", audio: true },
    { id: "w007", de: "einkaufen", en: "to shop", part: "verb", audio: true },
    { id: "w008", de: "bezahlen", en: "to pay", part: "verb", audio: true },
    { id: "w009", de: "das Frühstück", en: "the breakfast", part: "noun n.", audio: true },
    { id: "w010", de: "die Kartoffel", en: "the potato", part: "noun f.", audio: true },
    { id: "w011", de: "der Kühlschrank", en: "the fridge", part: "noun m.", audio: true },
    { id: "w012", de: "das Bett", en: "the bed", part: "noun n.", audio: true },
    { id: "w013", de: "das Sofa", en: "the sofa", part: "noun n.", audio: true },
    { id: "w014", de: "die Küche", en: "the kitchen", part: "noun f.", audio: true },
    { id: "w015", de: "der Schlüssel", en: "the key", part: "noun m.", audio: true },
    { id: "w016", de: "die Tasche", en: "the bag", part: "noun f.", audio: true },
    { id: "w017", de: "die Hose", en: "the pants", part: "noun f.", audio: true },
    { id: "w018", de: "die Jacke", en: "the jacket", part: "noun f.", audio: true },
    { id: "w019", de: "der Schuh", en: "the shoe", part: "noun m.", audio: true },
    { id: "w020", de: "die Mütze", en: "the cap", part: "noun f.", audio: true },
  ],
  exercises: [
{"id": "wth1-mc-1", "type": "multiple-choice", "title": "Übung 1", "instruction": "What does this word mean?", "prompt": "die Anmeldung", "options": ["the registration", "the appointment", "the form"], "correctIndex": 0, "explain": "die Anmeldung means the registration."},
{"id": "wth1-mc-2", "type": "multiple-choice", "title": "Übung 2", "instruction": "What does this word mean?", "prompt": "der Termin", "options": ["the appointment", "the registration", "the form"], "correctIndex": 0, "explain": "der Termin means the appointment."},
{"id": "wth1-mc-3", "type": "multiple-choice", "title": "Übung 3", "instruction": "What does this word mean?", "prompt": "das Formular", "options": ["the form", "the registration", "the appointment"], "correctIndex": 0, "explain": "das Formular means the form."},
{"id": "wth1-mc-4", "type": "multiple-choice", "title": "Übung 4", "instruction": "What does this word mean?", "prompt": "die Wohnung", "options": ["the apartment", "the registration", "the appointment"], "correctIndex": 0, "explain": "die Wohnung means the apartment."},
{"id": "wth1-mc-5", "type": "multiple-choice", "title": "Übung 5", "instruction": "What does this word mean?", "prompt": "der Bahnhof", "options": ["the station", "the registration", "the appointment"], "correctIndex": 0, "explain": "der Bahnhof means the station."},
{"id": "wth1-mc-6", "type": "multiple-choice", "title": "Übung 6", "instruction": "What does this word mean?", "prompt": "die Fahrkarte", "options": ["the ticket", "the registration", "the appointment"], "correctIndex": 0, "explain": "die Fahrkarte means the ticket."},
{"id": "wth1-cards", "type": "flashcard", "title": "Wortschatz-Wiederholung", "instruction": "Say the German word out loud before revealing.", "items": [{"front": "die Anmeldung", "back": "the registration", "frontAudio": true}, {"front": "der Termin", "back": "the appointment", "frontAudio": true}, {"front": "das Formular", "back": "the form", "frontAudio": true}, {"front": "die Wohnung", "back": "the apartment", "frontAudio": true}, {"front": "der Bahnhof", "back": "the station", "frontAudio": true}, {"front": "die Fahrkarte", "back": "the ticket", "frontAudio": true}, {"front": "einkaufen", "back": "to shop", "frontAudio": true}, {"front": "bezahlen", "back": "to pay", "frontAudio": true}, {"front": "das Frühstück", "back": "the breakfast", "frontAudio": true}, {"front": "die Kartoffel", "back": "the potato", "frontAudio": true}, {"front": "der Kühlschrank", "back": "the fridge", "frontAudio": true}, {"front": "das Bett", "back": "the bed", "frontAudio": true}, {"front": "das Sofa", "back": "the sofa", "frontAudio": true}, {"front": "die Küche", "back": "the kitchen", "frontAudio": true}, {"front": "der Schlüssel", "back": "the key", "frontAudio": true}, {"front": "die Tasche", "back": "the bag", "frontAudio": true}, {"front": "die Hose", "back": "the pants", "frontAudio": true}, {"front": "die Jacke", "back": "the jacket", "frontAudio": true}, {"front": "der Schuh", "back": "the shoe", "frontAudio": true}, {"front": "die Mütze", "back": "the cap", "frontAudio": true}]}
  ],
};
