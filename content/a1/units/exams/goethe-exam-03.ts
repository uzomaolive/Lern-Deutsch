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
 * Goethe-Zertifikat A1 / Start Deutsch 1 — Prüfung 3: Wohnen und Nachbarn.
 * Complete paper: Hören (15), Lesen (15), Schreiben (2), Sprechen (3).
 */

export const goetheExam03: Lesson = {
  id: "goethe-a1-pruefung-03-wohnen",
  title: "Goethe A1 Prüfung 3: Wohnen und Nachbarn",
  summary:
    "A complete Goethe-Zertifikat A1 paper in authentic format: Hören, Lesen, Schreiben und Sprechen rund um Wohnung, Umzug, Hausregeln und Nachbarn.",
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
            ["Hören", "20 Min.", "Gespräche, Durchsagen, Ansagen zum Wohnen"],
            ["Lesen", "25 Min.", "Wohnungsanzeigen, Hausregeln, Schilder"],
            ["Schreiben", "20 Min.", "Formular ausfüllen, kurze Mitteilung"],
            ["Sprechen", "15 Min.", "sich vorstellen, fragen, bitten"],
          ],
        },
        {
          type: "tip",
          text: "Wohnungsanzeigen sind voller Abkürzungen: 2 ZKB (zwei Zimmer, Küche, Bad), qm (Quadratmeter), kalt (ohne Nebenkosten), warm (mit Nebenkosten). Üben Sie diese Begriffe.",
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
          text: "Sie lesen kurze Anzeigen, Regeln und Hinweisschilder. Zu jedem Text gibt es Aufgaben. Kreuzen Sie die richtige Lösung an.",
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
    { id: "die-wohnung", de: "die Wohnung", en: "the apartment", part: "noun f.", plural: "die Wohnungen", audio: true },
    { id: "der-umzug", de: "der Umzug", en: "the move", part: "noun m.", plural: "die Umzüge", audio: true },
    { id: "die-miete", de: "die Miete", en: "the rent", part: "noun f.", plural: "die Mieten", audio: true },
    { id: "der-vermieter", de: "der Vermieter", en: "the landlord", part: "noun m.", plural: "die Vermieter", audio: true },
    { id: "die-nachbarn", de: "die Nachbarn", en: "the neighbors", part: "noun pl.", audio: true },
    { id: "der-hausflur", de: "der Hausflur", en: "the hallway", part: "noun m.", plural: "die Hausflure", audio: true },
    { id: "die-heizung", de: "die Heizung", en: "the heating", part: "noun f.", plural: "die Heizungen", audio: true },
    { id: "der-garten", de: "der Garten", en: "the garden", part: "noun m.", plural: "die Gärten", audio: true },
    { id: "der-balkon", de: "der Balkon", en: "the balcony", part: "noun m.", plural: "die Balkone", audio: true },
    { id: "der-keller", de: "der Keller", en: "the basement", part: "noun m.", plural: "die Keller", audio: true },
    { id: "die-haustuer", de: "die Haustür", en: "the front door", part: "noun f.", plural: "die Haustüren", audio: true },
    { id: "einziehen", de: "einziehen", en: "to move in", part: "verb", audio: true },
  ],
  exercises: [
    // ---------- Hören, Teil 1: Aufgaben 1-6 (a/b/c, zweimal) ----------
    listen(1, "Was ist richtig?", "Hallo, ich rufe wegen der Wohnungsanzeige an. Ist die Wohnung noch frei? Ja, die 2-Zimmer-Wohnung ist noch frei. Sie können sie am Samstag besichtigen.",
      ["Die Wohnung ist noch frei.", "Die Wohnung ist schon vermietet.", "Die Besichtigung ist erst nächsten Monat."], 0,
      "Die 2-Zimmer-Wohnung ist noch frei."),
    listen(2, "Was ist richtig?", "Wie hoch ist die Miete für die Wohnung? Die Kaltmiete ist 620 Euro. Dazu kommen circa 120 Euro Nebenkosten.",
      ["Die Kaltmiete ist 620 Euro.", "Die Miete ist 120 Euro.", "Die Wohnung ist kostenlos."], 0,
      "Kaltmiete 620 Euro plus 120 Euro Nebenkosten."),
    listen(3, "Was ist richtig?", "Guten Tag, die Heizung in meiner Wohnung funktioniert nicht. Wir schicken morgen einen Techniker. Er kommt zwischen 9 und 12 Uhr.",
      ["Der Techniker kommt morgen.", "Die Heizung wird heute repariert.", "Der Mieter soll die Heizung kaufen."], 0,
      "Der Techniker kommt morgen zwischen 9 und 12 Uhr."),
    listen(4, "Was ist richtig?", "Haben Sie einen Keller? Ja, jede Wohnung hat einen Keller. Und einen Stellplatz für das Fahrrad gibt es auch.",
      ["Jede Wohnung hat einen Keller.", "Der Keller ist zu vermieten.", "Fahrräder sind verboten."], 0,
      "Jede Wohnung hat einen Keller und einen Fahrradstellplatz."),
    listen(5, "Was ist richtig?", "Die Nachbarn im Haus sind sehr ruhig. Ab 22 Uhr ist Nachtruhe. An Wochenenden feiern wir manchmal im Garten.",
      ["Ab 22 Uhr ist Nachtruhe.", "Im Haus ist den ganzen Tag Ruhe.", "Im Garten darf niemand feiern."], 0,
      "Die Nachtruhe beginnt um 22 Uhr."),
    listen(6, "Was ist richtig?", "Wir ziehen am ersten Oktober um. Die Firma holt die Möbel am Montag ab, wir kommen am Dienstag mit dem Auto.",
      ["Der Umzug ist am ersten Oktober.", "Die Möbel kommen im Dezember.", "Die Familie bleibt in der Wohnung."], 0,
      "Der Umzugstermin ist der erste Oktober."),

    // ---------- Hören, Teil 2: Aufgaben 7-10 (Richtig/Falsch, einmal) ----------
    listenRF(7, "Achtung, Durchsage: Am Donnerstag wird der Strom im ganzen Haus von 9 bis 11 Uhr abgeschaltet. Bitte schalten Sie Ihre Geräte vorher aus.",
      true, "Der Strom ist am Donnerstag von 9 bis 11 Uhr abgeschaltet."),
    listenRF(8, "Information für alle Mieter: Der Hausflur muss ab jetzt frei bleiben. Bitte stellen Sie keine Schuhe oder Kartons vor Ihre Wohnungstür.",
      true, "Der Hausflur muss frei bleiben."),
    listenRF(9, "Willkommen im Haus! Der Müll wird immer montags und donnerstags abgeholt. Die Mülltonnen stehen hinter dem Haus.",
      true, "Der Müll wird montags und donnerstags abgeholt."),
    listenRF(10, "Hallo, hier ist die Hausverwaltung. Die Fenster im Treppenhaus werden am Freitag geputzt. Bitte schließen Sie Ihre Wohnungsfenster, damit nichts nass wird.",
      false, "Die Fenster werden am Montag geputzt, nicht am Freitag."),

    // ---------- Hören, Teil 3: Aufgaben 11-15 (a/b/c, zweimal) ----------
    listen(11, "Was ist richtig?", "Hallo Frau Berger, hier ist die Hausverwaltung. Das Wasser muss am Mittwoch kurz abgestellt werden, von 10 bis 12 Uhr. Bitte füllen Sie etwas Wasser für den Haushalt ein.",
      ["Das Wasser ist am Mittwoch kurz abgestellt.", "Das Wasser ist am Montag abgestellt.", "Der Strom wird abgeschaltet."], 0,
      "Am Mittwoch von 10 bis 12 Uhr ist das Wasser abgestellt."),
    listen(12, "Was ist richtig?", "Guten Tag, hier spricht Herr Krause aus der dritten Etage. Ihr Paket ist bei mir abgegeben worden. Sie können es ab 18 Uhr bei mir abholen.",
      ["Das Paket ist bei Herrn Krause.", "Das Paket ist verloren.", "Herr Krause wohnt im Keller."], 0,
      "Der Nachbar hat das Paket angenommen."),
    listen(13, "Was ist richtig?", "Hi Anna, hier ist Tina. Meine Party am Samstag ist leider abgesagt. Der Vermieter hat die Feier im Garten verboten.",
      ["Die Party ist abgesagt.", "Die Party findet im Garten statt.", "Tina zieht um."], 0,
      "Die Gartenparty wurde abgesagt."),
    listen(14, "Was ist richtig?", "Hallo, hier ist der Umzugsservice Berger. Ihr Umzug am Samstag ist bestätigt. Wir kommen um 8 Uhr mit drei Leuten und einem großen Auto.",
      ["Der Umzug ist am Samstag um 8 Uhr.", "Der Umzug ist am Montag.", "Es kommt nur eine Person."], 0,
      "Umzug samstags um 8 Uhr mit drei Leuten."),
    listen(15, "Was ist richtig?", "Guten Tag, hier ist die Nachbarin aus der zweiten Etage. Ihre Waschmaschine läuft heute Nacht. Können Sie bitte die Musik leiser machen?",
      ["Die Nachbarin bittet um Ruhe.", "Die Nachbarin braucht Hilfe beim Umzug.", "Die Nachbarin hat die Waschmaschine kaputt gemacht."], 0,
      "Die Nachbarin bittet, die Musik leiser zu machen."),

    // ---------- Lesen, Teil 1: Aufgaben 1-5 (Richtig/Falsch) ----------
    readRF(1, "Die Wohnung hat zwei Zimmer.", true,
      "Die Anzeige sagt: 2 Zimmer, 56 qm."),
    readRF(2, "Die Wohnung liegt im ersten Stock.", true,
      "Die Anzeige sagt: erste Etage, Aufzug vorhanden."),
    readRF(3, "Haustiere sind in der Wohnung erlaubt.", false,
      "Die Anzeige sagt: keine Haustiere."),
    readRF(4, "Die Nebenkosten sind in der Miete enthalten.", false,
      "Die Anzeige sagt: kalt, Nebenkosten extra."),
    readRF(5, "Der Einzug ist sofort möglich.", true,
      "Die Anzeige sagt: frei ab sofort."),

    // ---------- Lesen, Teil 2: Aufgaben 6-10 (a/b) ----------
    readAB(6, "Sie suchen eine Wohnung mit Garten.",
      "Wohnung in ruhiger Lage: 3 Zimmer, Balkon, ab 1. November.",
      "Haus mit Garten: 4 Zimmer, großer Garten, sofort frei.",
      1, "Nur das Haus hat einen Garten."),
    readAB(7, "Sie möchten eine kleine, günstige Wohnung.",
      "Studio-Wohnung: 1 Zimmer, 28 qm, zentrale Lage, günstige Miete.",
      "Villa am See: 6 Zimmer, Pool, sehr hohe Miete.",
      0, "Das Studio ist klein und günstig."),
    readAB(8, "Sie möchten im Erdgeschoss wohnen.",
      "Wohnung im 4. Stock: schöner Blick, Aufzug, Balkon.",
      "Erdgeschosswohnung: 2 Zimmer, Terrasse, sofort frei.",
      1, "Nur die Erdgeschosswohnung liegt im Erdgeschoss."),
    readAB(9, "Sie brauchen eine Garage für Ihr Auto.",
      "Wohnung mit Tiefgarage: Stellplatz im Preis enthalten.",
      "Altbauwohnung ohne Balkon, sehr ruhig, keine Garage.",
      0, "Die Wohnung mit Tiefgarage bietet einen Stellplatz."),
    readAB(10, "Sie möchten einen Monat in der Stadt wohnen.",
      "Monteurzimmer am Stadtrand: möbliert, ab sofort, für 1-6 Monate.",
      "Neubau-Wohnung: 5 Jahre Mindestvertrag, unmöbliert.",
      0, "Das Monteurzimmer ist für kurze Zeit vermietbar."),

    // ---------- Lesen, Teil 3: Aufgaben 11-15 (Richtig/Falsch) ----------
    readRF(11, "Das Haus ist ein Neubau mit Aufzug.", true,
      "Das Schild sagt: Neubau, Aufzug vorhanden."),
    readRF(12, "Der Einzug in das Haus ist verboten.", false,
      "Das Schild sagt: Einzug ab 1. Oktober möglich."),
    readRF(13, "Das Rauchen im Treppenhaus ist verboten.", true,
      "Das Schild sagt: Rauchen verboten."),
    readRF(14, "Der Hausflur ist jeden Freitag gesperrt.", false,
      "Das Schild sagt: Hausflur bitte freihalten."),
    readRF(15, "Die Waschmaschine kann im Keller benutzt werden.", true,
      "Das Schild sagt: Waschkeller im Untergeschoss."),

    // ---------- Schreiben, Teil 1: Formular (5 Lücken) ----------
    schreibForm(
      1,
      "Mietvertrag. Familienname: ___. Vorname: ___. Adresse: ___. Einzugsdatum: ___. Monatliche Miete: ___.",
      [
        { answers: ["Weber"], hint: "Familienname" },
        { answers: ["Anna"], hint: "Vorname" },
        { answers: ["Hauptstraße 12, 10115 Berlin"], hint: "Adresse" },
        { answers: ["1. Oktober", "01.10."], hint: "Einzugsdatum" },
        { answers: ["620 Euro", "620"], hint: "Monatliche Miete" },
      ],
    ),

    // ---------- Schreiben, Teil 2: kurze Mitteilung (~30 Wörter) ----------
    schreibSatz(
      2,
      "Schreiben Sie an den Vermieter: Sie möchten die Wohnung am Samstag besichtigen.",
      ["Sehr", "geehrter", "Herr", "Müller,", "ich", "möchte", "die", "Wohnung", "am", "Samstag", "besichtigen.", "Mit", "freundlichen", "Grüßen,", "Anna", "Weber"],
      "Formelle Mitteilung mit Anrede und Gruß.",
    ),

    // ---------- Sprechen, Teil 1: sich vorstellen ----------
    sprechenSatz(
      1,
      1,
      "Stellen Sie sich vor: Name, Herkunft, Wohnort.",
      ["Mein", "Name", "ist", "Anna", "Weber.", "Ich", "wohne", "seit", "einem", "Jahr", "in", "Berlin."],
      "Vorstellung mit Name und Wohnort.",
    ),
    sprechenSatz(
      2,
      1,
      "Sagen Sie, was Sie beruflich machen.",
      ["Ich", "bin", "Kellnerin", "und", "arbeite", "im", "Café", "am", "Markt."],
      "Beruf und Arbeitsplatz.",
    ),

    // ---------- Sprechen, Teil 2: Fragen stellen und antworten ----------
    sprechenMatch(
      3,
      2,
      "Verbinden Sie die Frage mit der passenden Antwort.",
      [
        ["Wie viele Zimmer hat die Wohnung?", "Sie hat zwei Zimmer und ein Bad."],
        ["Wie hoch ist die Miete?", "Die Miete ist 620 Euro kalt."],
        ["Ab wann ist die Wohnung frei?", "Sie ist ab dem 1. Oktober frei."],
        ["Gibt es einen Balkon?", "Ja, einen kleinen Balkon nach Süden."],
      ],
    ),

    // ---------- Sprechen, Teil 3: Bitten formulieren und reagieren ----------
    sprechenChoose(
      4,
      3,
      "Sie möchten den Vermieter anrufen. Was sagen Sie?",
      "Guten Tag, ...",
      ["hier ist Anna Weber. Ich rufe wegen der Wohnungsanzeige an.", "wie ist das Wetter bei Ihnen?", "ich habe Ihren Schlüssel verloren, aber das ist egal."],
      0,
      "Am Telefon: Hier ist ..., ich rufe wegen ... an.",
    ),
    sprechenChoose(
      5,
      3,
      "Sie möchten Ihren Nachbarn um Hilfe bitten. Was sagen Sie?",
      "Entschuldigung, ...",
      ["können Sie mir beim Umzug helfen?", "wo wohnen Sie?", "ich habe keine Zeit für Sie."],
      0,
      "Eine Bitte um Hilfe: Können Sie mir helfen?",
    ),
    sprechenChoose(
      6,
      3,
      "Reagieren Sie auf: 'Danke für Ihre Hilfe!'",
      "",
      ["Gern geschehen!", "Ich habe keine Zeit.", "Auf Wiedersehen."],
      0,
      "Auf Dank antwortet man: Gern geschehen.",
    ),
  ],
};