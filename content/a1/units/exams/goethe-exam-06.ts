import type { Lesson } from "../../../schema";
import {
  listen,
  listenRF,
  readRF,
  readAB,
  schreibForm,
  schreibSatz,
  sprechenSatz,
  sprechenMatch,
  sprechenChoose,
} from "./factories";

/**
 * Goethe-Zertifikat A1 / Start Deutsch 1 — Prüfung 6: Gesundheit und Arzt.
 * Complete paper: Hören (15), Lesen (15), Schreiben (2), Sprechen (3).
 */

export const goetheExam06: Lesson = {
  id: "goethe-a1-pruefung-06-gesundheit",
  title: "Goethe A1 Prüfung 6: Gesundheit und Arzt",
  summary:
    "A complete Goethe-Zertifikat A1 paper in authentic format: Hören, Lesen, Schreiben und Sprechen rund um Arztbesuche, Termine, Medikamente und Gesundheit.",
  status: "ready",
  sections: [
    {
      heading: "So ist die Prüfung aufgebaut",
      blocks: [
        {
          type: "paragraph",
          text: "Diese Prüfung hat vier Teile: Hören (circa 20 Minuten), Lesen (circa 25 Minuten), Schreiben (circa 20 Minuten) und Sprechen (circa 15 Minuten). Beantworten Sie alle Aufgaben, auch wenn Sie unsicher sind. Wörterbücher sind nicht erlaubt.",
        },
        {
          type: "table",
          caption: "Die vier Prüfungsteile",
          head: ["Teil", "Dauer", "Was prüft er?"],
          rows: [
            ["Hören", "20 Min.", "Arzttermine, Ansagen, Telefonnachrichten"],
            ["Lesen", "25 Min.", "Aushänge, Schilder, Medikamenteninfo"],
            ["Schreiben", "20 Min.", "Formular ausfüllen, kurze Mitteilung"],
            ["Sprechen", "15 Min.", "sich vorstellen, fragen, bitten"],
          ],
        },
        {
          type: "tip",
          text: "Beim Arzt zählen Körperteile und Symptome: der Kopf, der Bauch, die Halsschmerzen, das Fieber. Lernen Sie auch: Ich habe Kopfschmerzen, es tut weh, ich brauche einen Termin.",
        },
      ],
    },
    {
      heading: "Hören: Anleitung",
      blocks: [
        {
          type: "paragraph",
          text: "Sie hören kurze Gespräche und Ansagen. Zu jedem Text gibt es eine Aufgabe. Kreuzen Sie die richtige Lösung an. Sie hören jeden Text zweimal, die Durchsagen in Teil 2 nur einmal.",
        },
      ],
    },
    {
      heading: "Lesen: Anleitung",
      blocks: [
        {
          type: "paragraph",
          text: "Sie lesen kurze Aushänge, Schilder und Informationen. Zu jedem Text gibt es Aufgaben. Kreuzen Sie die richtige Lösung an.",
        },
      ],
    },
    {
      heading: "Schreiben: Anleitung",
      blocks: [
        {
          type: "paragraph",
          text: "Sie füllen ein Formular aus und schreiben einen kurzen Text. Schreiben Sie zu jedem Punkt ein bis zwei Sätze, circa 30 Wörter, mit Anrede und Gruß.",
        },
      ],
    },
    {
      heading: "Sprechen: Anleitung",
      blocks: [
        {
          type: "paragraph",
          text: "Sie sprechen in der Gruppe. Teil 1: Sie stellen sich vor. Teil 2: Sie fragen nach Informationen und geben Informationen. Teil 3: Sie formulieren Bitten und reagieren darauf.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-arzt", de: "der Arzt", en: "the doctor", part: "noun m.", plural: "die Ärzte", audio: true },
    { id: "der-termin", de: "der Termin", en: "the appointment", part: "noun m.", plural: "die Termine", audio: true },
    { id: "das-fieber", de: "das Fieber", en: "the fever", part: "noun n.", audio: true },
    { id: "der-kopf", de: "der Kopf", en: "the head", part: "noun m.", plural: "die Köpfe", audio: true },
    { id: "der-bauch", de: "der Bauch", en: "the stomach", part: "noun m.", plural: "die Bäuche", audio: true },
    { id: "die-schmerzen", de: "die Schmerzen", en: "the pain", part: "noun pl.", audio: true },
    { id: "die-apotheke", de: "die Apotheke", en: "the pharmacy", part: "noun f.", plural: "die Apotheken", audio: true },
    { id: "das-medikament", de: "das Medikament", en: "the medication", part: "noun n.", plural: "die Medikamente", audio: true },
    { id: "die-versicherungskarte", de: "die Versicherungskarte", en: "the insurance card", part: "noun f.", plural: "die Versicherungskarten", audio: true },
    { id: "die-sprechstunde", de: "die Sprechstunde", en: "the office hours", part: "noun f.", plural: "die Sprechstunden", audio: true },
    { id: "das-rezept", de: "das Rezept", en: "the prescription", part: "noun n.", plural: "die Rezepte", audio: true },
    { id: "krank", de: "krank", en: "sick", part: "adjective", audio: true },
  ],
  exercises: [
    // ---------- Hören, Teil 1: Aufgaben 1-6 (a/b/c, zweimal) ----------
    listen(1, "Was ist richtig?", "Guten Tag, ich möchte einen Termin beim Arzt. Wann passt es Ihnen? Am Donnerstag um 10 Uhr ist noch ein Termin frei.",
      ["Der Termin ist am Donnerstag um 10 Uhr.", "Der Termin ist am Freitag.", "Der Arzt hat keine Zeit."], 0,
      "Der Termin ist am Donnerstag um 10 Uhr."),
    listen(2, "Was ist richtig?", "Was fehlt Ihnen? Ich habe starke Kopfschmerzen und Fieber. Seit wann? Seit gestern Abend.",
      ["Der Patient hat Kopfschmerzen und Fieber.", "Der Patient hat Halsschmerzen.", "Der Patient ist gesund."], 0,
      "Symptome: Kopfschmerzen und Fieber."),
    listen(3, "Was ist richtig?", "Nehmen Sie dieses Medikament zweimal am Tag, morgens und abends. Und trinken Sie viel Wasser.",
      ["Das Medikament soll zweimal täglich genommen werden.", "Das Medikament soll einmal am Tag genommen werden.", "Der Patient soll kein Wasser trinken."], 0,
      "Einnahme: zweimal täglich, morgens und abends."),
    listen(4, "Was ist richtig?", "Haben Sie Ihre Versicherungskarte mitgebracht? Oh, die habe ich vergessen. Kein Problem, bringen Sie sie bitte beim nächsten Termin mit.",
      ["Der Patient bringt die Karte beim nächsten Termin mit.", "Der Patient muss heute bezahlen.", "Der Arzt ist böse."], 0,
      "Die Karte kann beim nächsten Termin nachgereicht werden."),
    listen(5, "Was ist richtig?", "Wie lange müssen Sie das Medikament nehmen? Zehn Tage, dann kommen Sie noch einmal zur Kontrolle.",
      ["Das Medikament wird zehn Tage genommen.", "Der Patient kommt nicht wieder.", "Das Medikament wird ein Jahr genommen."], 0,
      "Zehn Tage Medikament, dann Kontrolle."),
    listen(6, "Was ist richtig?", "Ich habe Bauchschmerzen. Haben Sie heute etwas Bestimmtes gegessen? Ja, ich habe gestern viel gegessen.",
      ["Der Patient hat Bauchschmerzen.", "Der Patient hat Kopfschmerzen.", "Der Patient hat einen Unfall."], 0,
      "Der Patient klagt über Bauchschmerzen."),

    // ---------- Hören, Teil 2: Aufgaben 7-10 (Richtig/Falsch, einmal) ----------
    listenRF(7, "Achtung, Durchsage: Die Praxis ist am Mittwoch wegen Fortbildung geschlossen. In dringenden Fällen wenden Sie sich bitte an die Notaufnahme.",
      true, "Die Praxis ist am Mittwoch geschlossen."),
    listenRF(8, "Information für unsere Patienten: Bitte bringen Sie zu jedem Termin Ihre Versicherungskarte mit. Ohne Karte können wir keine Leistung abrechnen.",
      true, "Die Versicherungskarte muss mitgebracht werden."),
    listenRF(9, "Willkommen in unserer Apotheke! Unsere Öffnungszeiten: Montag bis Freitag 8 bis 18 Uhr, Samstag 9 bis 13 Uhr. Am Sonntag bleibt die Apotheke geschlossen.",
      true, "Die Apotheke ist sonntags geschlossen."),
    listenRF(10, "Hallo, hier ist die Zahnarztpraxis. Ihr Termin am Freitag um 15 Uhr ist verschoben. Bitte kommen Sie jetzt am Montag um 11 Uhr.",
      false, "Der Termin ist am Freitag, nicht am Montag."),

    // ---------- Hören, Teil 3: Aufgaben 11-15 (a/b/c, zweimal) ----------
    listen(11, "Was ist richtig?", "Hallo Frau Berger, hier ist die Apotheke am Markt. Ihr bestelltes Medikament ist eingetroffen. Sie können es ab heute Nachmittag abholen.",
      ["Das Medikament ist eingetroffen.", "Das Medikament ist nicht lieferbar.", "Die Apotheke ist geschlossen."], 0,
      "Das Medikament kann ab heute Nachmittag abgeholt werden."),
    listen(12, "Was ist richtig?", "Guten Tag, hier ist die Praxis Dr. Klein. Wir möchten Sie an Ihren Termin morgen um 9 Uhr erinnern. Bitte kommen Sie pünktlich.",
      ["Der Termin ist morgen um 9 Uhr.", "Der Termin ist heute.", "Der Termin ist abgesagt."], 0,
      "Erinnerung: Termin morgen um 9 Uhr."),
    listen(13, "Was ist richtig?", "Hi Anna, hier ist Julia. Ich bin krank und kann heute nicht zur Arbeit kommen. Kannst du dem Chef Bescheid sagen?",
      ["Julia ist krank.", "Julia ist im Urlaub.", "Julia hat gekündigt."], 0,
      "Julia ist krank und bittet um Entschuldigung."),
    listen(14, "Was ist richtig?", "Hallo Herr Koch, hier ist das Krankenhaus. Ihre Blutuntersuchung ist am Montag um 8 Uhr. Bitte kommen Sie nüchtern.",
      ["Die Untersuchung ist am Montag um 8 Uhr.", "Die Untersuchung ist am Freitag.", "Der Patient soll essen."], 0,
      "Blutuntersuchung am Montag um 8 Uhr, nüchtern."),
    listen(15, "Was ist richtig?", "Guten Tag, hier ist die Physiotherapie. Ihr Termin am Donnerstag um 14 Uhr ist bestätigt. Bitte bringen Sie ein Handtuch mit.",
      ["Der Termin ist am Donnerstag um 14 Uhr.", "Der Termin ist am Dienstag.", "Der Patient braucht nichts."], 0,
      "Physiotherapie-Termin: Donnerstag 14 Uhr, Handtuch mitbringen."),

    // ---------- Lesen, Teil 1: Aufgaben 1-5 (Richtig/Falsch) ----------
    readRF(1, "Die Praxis öffnet um 8 Uhr.", true,
      "Das Schild sagt: Mo-Fr 8-18 Uhr."),
    readRF(2, "Am Mittwochnachmittag hat die Praxis geschlossen.", true,
      "Das Schild sagt: Mi 8-12 Uhr, nachmittags geschlossen."),
    readRF(3, "Man muss vorher einen Termin machen.", true,
      "Das Schild sagt: nur nach Terminvereinbarung."),
    readRF(4, "Die Praxis ist am Wochenende geöffnet.", false,
      "Das Schild sagt: samstags und sonntags geschlossen."),
    readRF(5, "In dringenden Fällen gibt es eine Notfallnummer.", true,
      "Das Schild sagt: Notfall: 112."),

    // ---------- Lesen, Teil 2: Aufgaben 6-10 (a/b) ----------
    readAB(6, "Sie brauchen heute ein Medikament.",
      "Apotheke am Markt: geöffnet bis 18 Uhr, Notdienst nachts.",
      "Blumenhaus Rose: geöffnet Mo-Fr 9-13 Uhr.",
      0, "Die Apotheke verkauft Medikamente und hat einen Notdienst."),
    readAB(7, "Sie möchten einen Termin beim Zahnarzt.",
      "Zahnarztpraxis Dr. Klein: Termine auch samstags, Anmeldung online.",
      "Buchhandlung am Markt: Lesungen und Bücher.",
      0, "Nur die Zahnarztpraxis vergibt Termine."),
    readAB(8, "Sie möchten Sport nach einer Verletzung machen.",
      "PhysioZentrum: Krankengymnastik und Massagen, Termine nach Vereinbarung.",
      "Tennisclub Grün: Plätze täglich.",
      0, "Das PhysioZentrum hilft nach Verletzungen."),
    readAB(9, "Sie möchten einen Gesundheitskurs belegen.",
      "Gesundheitszentrum: Yoga und Rückenschule für Anfänger, ab Montag.",
      "Stadtbad Süd: Schwimmzeiten für alle.",
      0, "Das Gesundheitszentrum bietet Kurse an."),
    readAB(10, "Sie möchten schnell zum Arzt gehen, ohne Termin.",
      "Praxis Dr. Berger: Sprechstunde Mo-Fr 8-10 Uhr ohne Termin.",
      "Apotheke am Markt: Medikamente auf Rezept.",
      0, "Die Praxis hat eine offene Sprechstunde."),

    // ---------- Lesen, Teil 3: Aufgaben 11-15 (Richtig/Falsch) ----------
    readRF(11, "Im Wartezimmer muss man ruhig sein.", true,
      "Das Schild sagt: Bitte leise sein."),
    readRF(12, "Das Rezept muss in der Apotheke vorgelegt werden.", true,
      "Das Schild sagt: Rezepte bitte hier abgeben."),
    readRF(13, "Die Sprechstunde ist nur nach Termin.", false,
      "Das Schild sagt: Sprechstunde ohne Termin am Morgen."),
    readRF(14, "Das Medikament wird zweimal täglich eingenommen.", true,
      "Das Etikett sagt: 2x täglich."),
    readRF(15, "Die Praxis hat einen Aufzug.", true,
      "Das Schild sagt: Aufzug zur 2. Etage."),

    // ---------- Schreiben, Teil 1: Formular (5 Lücken) ----------
    schreibForm(
      1,
      "Patientenformular. Familienname: ___. Vorname: ___. Geburtsdatum: ___. Versicherung: ___. Anschrift: ___.",
      [
        { answers: ["Weber"], hint: "Familienname" },
        { answers: ["Anna"], hint: "Vorname" },
        { answers: ["12.03.1998"], hint: "Geburtsdatum" },
        { answers: ["Techniker Krankenkasse", "TK"], hint: "Versicherung" },
        { answers: ["Hauptstraße 12, 10115 Berlin"], hint: "Anschrift" },
      ],
    ),

    // ---------- Schreiben, Teil 2: kurze Mitteilung (~30 Wörter) ----------
    schreibSatz(
      2,
      "Schreiben Sie an Ihren Chef: Sie sind krank und können heute nicht arbeiten.",
      ["Sehr", "geehrter", "Herr", "Müller,", "ich", "bin", "krank", "und", "kann", "heute", "nicht", "zur", "Arbeit", "kommen.", "Mit", "freundlichen", "Grüßen,", "Anna", "Weber"],
      "Krankmeldung mit Anrede und Gruß.",
    ),

    // ---------- Sprechen, Teil 1: sich vorstellen ----------
    sprechenSatz(
      1,
      1,
      "Stellen Sie sich vor: Name, Beruf, Wohnort.",
      ["Mein", "Name", "ist", "Anna", "Weber.", "Ich", "arbeite", "als", "Kellnerin", "und", "wohne", "in", "Berlin."],
      "Vorstellung mit Beruf und Wohnort.",
    ),
    sprechenSatz(
      2,
      1,
      "Sagen Sie, was Sie gern in Ihrer Freizeit tun.",
      ["In", "meiner", "Freizeit", "gehe", "ich", "gern", "schwimmen", "oder", "lese", "ein", "Buch."],
      "Freizeitaktivitäten mit Verb in Position zwei.",
    ),

    // ---------- Sprechen, Teil 2: Fragen stellen und antworten ----------
    sprechenMatch(
      3,
      2,
      "Verbinden Sie die Frage mit der passenden Antwort.",
      [
        ["Was fehlt Ihnen?", "Ich habe starke Kopfschmerzen."],
        ["Haben Sie Fieber?", "Ja, seit gestern Abend."],
        ["Nehmen Sie das Medikament regelmäßig?", "Ja, zweimal am Tag."],
        ["Wann ist der nächste Termin?", "Am Donnerstag um 10 Uhr."],
      ],
    ),

    // ---------- Sprechen, Teil 3: Bitten formulieren und reagieren ----------
    sprechenChoose(
      4,
      3,
      "Sie möchten einen Termin machen. Was sagen Sie?",
      "Guten Tag, ...",
      ["ich möchte bitte einen Termin beim Arzt.", "ich möchte ein Glas Wasser.", "ich heiße Anna."],
      0,
      "Eine Bitte: Ich möchte einen Termin.",
    ),
    sprechenChoose(
      5,
      3,
      "Sie möchten ein Medikament in der Apotheke kaufen. Was sagen Sie?",
      "Entschuldigung, ...",
      ["ich brauche dieses Medikament.", "wo ist der Bahnhof?", "wie viel Uhr ist es?"],
      0,
      "In der Apotheke: Ich brauche dieses Medikament.",
    ),
    sprechenChoose(
      6,
      3,
      "Reagieren Sie auf: 'Können Sie morgen zur Kontrolle kommen?'",
      "",
      ["Ja, gern. Um wie viel Uhr?", "Nein, ich habe keinen Hunger.", "Bitte schön."],
      0,
      "Eine Frage beantworten: Ja, gern. Um wie viel Uhr?",
    ),
  ],
};