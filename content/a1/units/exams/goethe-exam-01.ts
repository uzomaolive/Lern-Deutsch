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
 * Goethe-Zertifikat A1 / Start Deutsch 1 — Prüfung 1: Alltag und Termine.
 * Complete paper: Hören (15), Lesen (15), Schreiben (2), Sprechen (3).
 */

export const goetheExam01: Lesson = {
  id: "goethe-a1-pruefung-01-alltag",
  title: "Goethe A1 Prüfung 1: Alltag und Termine",
  summary:
    "A complete Goethe-Zertifikat A1 paper in authentic format: Hören, Lesen, Schreiben und Sprechen zu Alltagsterminen, Anrufen und kurzen Mitteilungen.",
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
            ["Hören", "20 Min.", "kurze Gespräche, Durchsagen, Telefonansagen"],
            ["Lesen", "25 Min.", "Briefe, Anzeigen, Hinweisschilder"],
            ["Schreiben", "20 Min.", "Formular ausfüllen, kurze Mitteilung schreiben"],
            ["Sprechen", "15 Min.", "sich vorstellen, fragen, bitten"],
          ],
        },
        {
          type: "tip",
          text: "Schreiben Sie am Ende des Hörteils Ihre Lösungen auf den Antwortbogen. Lesen Sie immer zuerst die Aufgabe, dann hören oder lesen Sie den Text.",
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
          text: "Sie lesen kurze Briefe, Anzeigen und Hinweisschilder. Zu jedem Text gibt es Aufgaben. Kreuzen Sie die richtige Lösung an.",
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
    { id: "der-termin", de: "der Termin", en: "the appointment", part: "noun m.", plural: "die Termine", audio: true },
    { id: "die-anmeldung", de: "die Anmeldung", en: "the registration", part: "noun f.", plural: "die Anmeldungen", audio: true },
    { id: "das-formular", de: "das Formular", en: "the form", part: "noun n.", plural: "die Formulare", audio: true },
    { id: "der-antwortbogen", de: "der Antwortbogen", en: "the answer sheet", part: "noun m.", plural: "die Antwortbögen", audio: true },
    { id: "die-durchsage", de: "die Durchsage", en: "the announcement", part: "noun f.", plural: "die Durchsagen", audio: true },
    { id: "der-anrufbeantworter", de: "der Anrufbeantworter", en: "the answering machine", part: "noun m.", plural: "die Anrufbeantworter", audio: true },
    { id: "ankreuzen", de: "ankreuzen", en: "to tick", part: "verb", audio: true },
    { id: "der-pruefungsteil", de: "der Prüfungsteil", en: "the exam part", part: "noun m.", plural: "die Prüfungsteile", audio: true },
    { id: "das-woerterbuch", de: "das Wörterbuch", en: "the dictionary", part: "noun n.", plural: "die Wörterbücher", audio: true },
    { id: "die-mitteilung", de: "die Mitteilung", en: "the message", part: "noun f.", plural: "die Mitteilungen", audio: true },
    { id: "die-loesung", de: "die Lösung", en: "the solution", part: "noun f.", plural: "die Lösungen", audio: true },
    { id: "der-pruefer", de: "der Prüfer", en: "the examiner", part: "noun m.", plural: "die Prüfer", audio: true },
  ],
  exercises: [
    // ---------- Hören, Teil 1: Aufgaben 1-6 (a/b/c, zweimal) ----------
    listen(1, "Was ist richtig?", "Hallo Frau Klein, hier ist die Praxis Dr. Berger. Ihr Termin am Mittwoch um 14 Uhr ist leider verschoben worden. Bitte kommen Sie jetzt am Donnerstag um 10 Uhr.",
      ["Die Patientin kommt am Donnerstag um 10 Uhr.", "Die Patientin kommt am Mittwoch um 14 Uhr.", "Die Praxis ist heute geschlossen."], 0,
      "Der Termin ist auf Donnerstag 10 Uhr verschoben worden."),
    listen(2, "Was ist richtig?", "Entschuldigung, wann öffnet die Bank morgen? Die Bank öffnet morgen um 9 Uhr, aber nur bis 12 Uhr. Am Nachmittag bleibt sie geschlossen.",
      ["Die Bank öffnet um 9 Uhr und schließt um 12 Uhr.", "Die Bank öffnet um 8 Uhr.", "Die Bank ist morgen ganz geschlossen."], 0,
      "Morgen ist die Bank von 9 bis 12 Uhr geöffnet."),
    listen(3, "Was ist richtig?", "Guten Tag, ich möchte einen Termin für eine Sprachprüfung machen. Ja, gerne. Wir haben am Samstag um 10 Uhr noch einen Platz frei. Soll ich den reservieren?",
      ["Der Kunde möchte einen Prüfungstermin.", "Der Kunde möchte ein Wörterbuch kaufen.", "Der Kunde möchte die Öffnungszeiten wissen."], 0,
      "Der Kunde möchte einen Termin für die Sprachprüfung."),
    listen(4, "Was ist richtig?", "Peter, hast du morgen Zeit? Wir wollen um 16 Uhr eine Pizza essen gehen. Am 16 Uhr passt es mir gut. Dann hole ich dich um Viertel ab.",
      ["Peter und sein Freund treffen sich um 16 Uhr.", "Peter muss morgen arbeiten.", "Der Freund kann morgen nicht kommen."], 0,
      "Peter hat um 16 Uhr Zeit, sie treffen sich."),
    listen(5, "Was ist richtig?", "Sie möchten ein Paket abholen. Das Paketbüro hat heute bis 18 Uhr geöffnet. Bringen Sie bitte Ihren Ausweis mit.",
      ["Das Paketbüro ist bis 18 Uhr geöffnet.", "Das Paketbüro öffnet um 8 Uhr.", "Das Paket kommt erst morgen."], 0,
      "Die Durchsage sagt: heute bis 18 Uhr geöffnet."),
    listen(6, "Was ist richtig?", "Frau Schmidt, Herr Weber ruft an. Er hat Ihren Bericht gelesen und möchte ihn morgen Vormittag besprechen. Bitte rufen Sie zurück.",
      ["Herr Weber möchte den Bericht besprechen.", "Herr Weber hat den Bericht verloren.", "Frau Schmidt soll heute anrufen."], 0,
      "Herr Weber möchte den Bericht morgen Vormittag besprechen."),

    // ---------- Hören, Teil 2: Aufgaben 7-10 (Richtig/Falsch, einmal) ----------
    listenRF(7, "Achtung, Durchsage: Der Zug nach München fährt heute von Gleis 7 ab. Bitte beachten Sie die Ansagen am Gleis.",
      true, "Der Zug fährt heute von Gleis 7 ab."),
    listenRF(8, "Information für alle Fahrgäste: Wegen Bauarbeiten endet die U-Bahnlinie 2 heute an der Haltestelle Nordpark. Bitte steigen Sie dort um.",
      true, "Die U-Bahn endet heute am Nordpark."),
    listenRF(9, "Willkommen in unserem Supermarkt! Heute gibt es frisches Obst und Gemüse im Angebot. Am Sonntag bleibt das Geschäft geschlossen.",
      true, "Der Supermarkt ist sonntags geschlossen."),
    listenRF(10, "Hallo, hier ist eine Nachricht vom Reisebüro. Ihre Reiseunterlagen liegen ab morgen zur Abholung bereit. Bitte bringen Sie Ihre Buchungsnummer mit.",
      false, "Die Unterlagen liegen ab heute bereit, nicht ab morgen."),

    // ---------- Hören, Teil 3: Aufgaben 11-15 (a/b/c, zweimal) ----------
    listen(11, "Was ist richtig?", "Hallo Anna, hier ist Tom. Ich bin heute später dran, der Bus hatte Verspätung. Ich bin in zwanzig Minuten da. Warte bitte vor dem Kino auf mich.",
      ["Tom kommt in zwanzig Minuten.", "Tom kommt heute nicht.", "Tom wartet am Bahnhof."], 0,
      "Tom sagt: in zwanzig Minuten bin ich da."),
    listen(12, "Was ist richtig?", "Guten Tag, Frau Hoffmann, hier ist die Bibliothek. Ihr Buch 'Die kleine Stadt' ist wieder da. Sie können es ab heute nach 13 Uhr abholen.",
      ["Frau Hoffmann kann ihr Buch abholen.", "Frau Hoffmann muss ein Buch zurückgeben.", "Die Bibliothek ist geschlossen."], 0,
      "Das Buch ist wieder da und kann abgeholt werden."),
    listen(13, "Was ist richtig?", "Hi Jonas, hier ist Lena. Ich komme morgen mit dem Auto. Soll ich dich um 8 Uhr an der Schule abholen? Sag mir kurz Bescheid.",
      ["Lena will Jonas morgen abholen.", "Lena kommt mit dem Bus.", "Lena hat ein Problem mit dem Auto."], 0,
      "Lena will Jonas um 8 Uhr an der Schule abholen."),
    listen(14, "Was ist richtig?", "Hallo Herr Krause, hier ist die Hausverwaltung. Die Heizung wird am Freitag repariert. Die Arbeiter kommen zwischen 9 und 12 Uhr. Bitte sorgen Sie dafür, dass jemand zu Hause ist.",
      ["Die Heizung wird am Freitag repariert.", "Die Reparatur ist am Montag.", "Die Arbeiter kommen am Nachmittag."], 0,
      "Die Heizungsreparatur ist am Freitag zwischen 9 und 12 Uhr."),
    listen(15, "Was ist richtig?", "Guten Abend, hier ist das Café Sonne. Ihr Tisch für vier Personen am Samstag um 19 Uhr ist reserviert. Falls Sie später kommen, rufen Sie bitte kurz an.",
      ["Der Tisch ist am Samstag um 19 Uhr reserviert.", "Der Tisch ist für zwei Personen.", "Die Reservierung ist für Sonntag."], 0,
      "Reserviert ist der Tisch am Samstag um 19 Uhr."),

    // ---------- Lesen, Teil 1: Aufgaben 1-5 (Richtig/Falsch) ----------
    readRF(1, "Der Termin beim Zahnarzt ist am Freitag um 15 Uhr.", true,
      "Die Einladung sagt: Freitag 15 Uhr beim Zahnarzt."),
    readRF(2, "Frau Berger soll ihre Versicherungskarte nicht mitbringen.", false,
      "Die Karte muss mitgebracht werden."),
    readRF(3, "Das Sprachzentrum ist in die Beethovenstraße umgezogen.", true,
      "Die Anzeige sagt: neuer Standort Beethovenstraße 23."),
    readRF(4, "Der Deutschkurs beginnt am Montag um 9 Uhr.", true,
      "Der Kurs startet Montag um 9 Uhr."),
    readRF(5, "Die Anmeldung für den Kurs ist erst in zwei Wochen möglich.", false,
      "Die Anmeldung ist jetzt sofort möglich."),

    // ---------- Lesen, Teil 2: Aufgaben 6-10 (a/b) ----------
    readAB(6, "Sie möchten einen Deutschkurs am Abend besuchen.",
      "Sprachschule am Park: Kurse vormittags und abends, Anmeldung jederzeit.",
      "Turnverein Nord: Training dienstags und donnerstags um 18 Uhr.",
      0, "Nur die Sprachschule bietet Deutschkurse am Abend."),
    readAB(7, "Sie möchten ein Zimmer mieten.",
      "Musikschule Mozart: Klavierunterricht für Anfänger.",
      "Zimmer in ruhiger Lage, 45 qm, ab 1. Oktober frei.",
      1, "Das Inserat bietet ein Zimmer zur Miete."),
    readAB(8, "Sie möchten am Samstag schwimmen gehen.",
      "Stadtbad Süd: geöffnet Mo-Fr 8-20, Sa 9-14, So geschlossen.",
      "Museum für Technik: geöffnet Di-So 10-18.",
      0, "Das Stadtbad hat am Samstag von 9 bis 14 Uhr geöffnet."),
    readAB(9, "Sie suchen einen Gebrauchtwagen.",
      "Buchhandlung am Markt: neue Bücher, Lesungen, Café.",
      "Autohaus Berger: Gebrauchtwagen mit Garantie, Finanzierung möglich.",
      1, "Das Autohaus verkauft Gebrauchtwagen."),
    readAB(10, "Sie möchten ein Paket verschicken.",
      "Postfiliale 110: Pakete, Briefe, Geld, Mo-Fr 8-18 Uhr.",
      "Bäckerei Sonne: frische Brötchen täglich ab 6 Uhr.",
      0, "Die Postfiliale nimmt Pakete an."),

    // ---------- Lesen, Teil 3: Aufgaben 11-15 (Richtig/Falsch) ----------
    readRF(11, "Im Wartezimmer darf man nicht rauchen.", true,
      "Das Schild sagt: Rauchen verboten."),
    readRF(12, "Die Bücherei hat samstags bis 13 Uhr geöffnet.", true,
      "Die Öffnungszeiten: Mo-Fr 10-18, Sa 10-13."),
    readRF(13, "An der Kasse kann man nur bar bezahlen.", false,
      "Das Schild sagt: Kartenzahlung möglich."),
    readRF(14, "Der Parkplatz ist nur für Kunden des Geschäfts.", false,
      "Das Schild sagt: öffentlicher Parkplatz."),
    readRF(15, "Der Eingang für den Kurs ist in der zweiten Etage.", true,
      "Das Schild sagt: Kursraum 2. Etage."),

    // ---------- Schreiben, Teil 1: Formular (5 Lücken) ----------
    schreibForm(
      1,
      "Anmeldung zum Deutschkurs. Familienname: ___. Vorname: ___. Straße, Hausnummer: ___. PLZ, Ort: ___. Kursbeginn: ___.",
      [
        { answers: ["Weber"], hint: "Familienname" },
        { answers: ["Anna"], hint: "Vorname" },
        { answers: ["Hauptstraße 12"], hint: "Straße und Hausnummer" },
        { answers: ["10115 Berlin"], hint: "PLZ und Ort" },
        { answers: ["Montag", "1. Oktober", "01.10."], hint: "Kursbeginn" },
      ],
    ),

    // ---------- Schreiben, Teil 2: kurze Mitteilung (~30 Wörter) ----------
    schreibSatz(
      2,
      "Schreiben Sie an Ihren Freund: Sie kommen am Samstag um 15 Uhr.",
      ["Lieber", "Paul,", "ich", "komme", "am", "Samstag", "um", "15", "Uhr.", "Viele", "Grüße,", "Anna"],
      "Eine kurze Mitteilung beginnt mit Anrede und endet mit Gruß.",
    ),

    // ---------- Sprechen, Teil 1: sich vorstellen ----------
    sprechenSatz(
      1,
      1,
      "Stellen Sie sich vor: Name, Herkunft, Wohnort.",
      ["Mein", "Name", "ist", "Anna", "Weber.", "Ich", "wohne", "in", "Berlin."],
      "Vorstellung: Name zuerst, dann Wohnort.",
    ),
    sprechenSatz(
      2,
      1,
      "Sagen Sie, was Sie sprechen und was Ihr Hobby ist.",
      ["Ich", "spreche", "Deutsch", "und", "Englisch.", "Mein", "Hobby", "ist", "Lesen."],
      "Sprachen und Hobby: Ich spreche ..., mein Hobby ist ...",
    ),

    // ---------- Sprechen, Teil 2: Fragen stellen und antworten ----------
    sprechenMatch(
      3,
      2,
      "Verbinden Sie die Frage mit der passenden Antwort.",
      [
        ["Wo wohnen Sie?", "Ich wohne in der Hauptstraße 12."],
        ["Wie ist Ihre Telefonnummer?", "Meine Nummer ist 0176 55 20 91."],
        ["Wann beginnt der Kurs?", "Der Kurs beginnt um 9 Uhr."],
        ["Was kostet der Eintritt?", "Der Eintritt kostet 5 Euro."],
      ],
    ),

    // ---------- Sprechen, Teil 3: Bitten formulieren und reagieren ----------
    sprechenChoose(
      4,
      3,
      "Sie brauchen einen Stadtplan. Was sagen Sie?",
      "Entschuldigung, ...",
      ["können Sie mir einen Stadtplan geben?", "wie heißen Sie?", "wo sind Sie geboren?"],
      0,
      "Eine Bitte: Können Sie mir ... geben?",
    ),
    sprechenChoose(
      5,
      3,
      "Sie möchten im Restaurant zahlen. Was sagen Sie?",
      "Herr Ober, ...",
      ["bitte zahlen!", "guten Appetit!", "es tut mir leid!"],
      0,
      "Beim Zahlen: Bitte zahlen!",
    ),
    sprechenChoose(
      6,
      3,
      "Reagieren Sie auf: 'Danke schön!'",
      "",
      ["Bitte schön.", "Tut mir leid.", "Gute Nacht."],
      0,
      "Auf 'Danke' antwortet man mit 'Bitte schön'.",
    ),
  ],
};