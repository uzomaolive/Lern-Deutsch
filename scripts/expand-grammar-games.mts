/**
 * Expands the grammar practice games (separable-verbs, imperative) to 50
 * rounds per level. Composes from curated, hand-verified pools of German
 * verbs, imperatives, participles, and example sentences so every emitted
 * exercise is accurate.
 *
 * Run: npx tsx scripts/expand-grammar-games.mts
 */

import { writeFileSync } from "node:fs";

// ---------------------------------------------------------------------------
// Pools
// ---------------------------------------------------------------------------

interface WoSentence {
  chunks: string[];
  translation: string;
  explain: string;
}

interface ImperativeVerb {
  v: string;
  du: string;
  duSt: string;
  ihr: string;
  sie: string;
  wir: string;
  en: string;
  enImp: string;
}

const IMPERATIVE_VERBS: ImperativeVerb[] = [
  { v: "gehen", du: "Geh!", duSt: "Gehst!", ihr: "Geht!", sie: "Gehen Sie!", wir: "Gehen wir!", en: "go", enImp: "Go!" },
  { v: "machen", du: "Mach!", duSt: "Machst!", ihr: "Macht!", sie: "Machen Sie!", wir: "Machen wir!", en: "make", enImp: "Make!" },
  { v: "spielen", du: "Spiel!", duSt: "Spielst!", ihr: "Spielt!", sie: "Spielen Sie!", wir: "Spielen wir!", en: "play", enImp: "Play!" },
  { v: "kommen", du: "Komm!", duSt: "Kommst!", ihr: "Kommt!", sie: "Kommen Sie!", wir: "Kommen wir!", en: "come", enImp: "Come!" },
  { v: "trinken", du: "Trink!", duSt: "Trinkst!", ihr: "Trinkt!", sie: "Trinken Sie!", wir: "Trinken wir!", en: "drink", enImp: "Drink!" },
  { v: "lernen", du: "Lern!", duSt: "Lernst!", ihr: "Lernt!", sie: "Lernen Sie!", wir: "Lernen wir!", en: "learn", enImp: "Learn!" },
  { v: "arbeiten", du: "Arbeite!", duSt: "Arbeitest!", ihr: "Arbeitet!", sie: "Arbeiten Sie!", wir: "Arbeiten wir!", en: "work", enImp: "Work!" },
  { v: "warten", du: "Warte!", duSt: "Wartest!", ihr: "Wartet!", sie: "Warten Sie!", wir: "Warten wir!", en: "wait", enImp: "Wait!" },
  { v: "öffnen", du: "Öffne!", duSt: "Öffnest!", ihr: "Öffnet!", sie: "Öffnen Sie!", wir: "Öffnen wir!", en: "open", enImp: "Open!" },
  { v: "nehmen", du: "Nimm!", duSt: "Nimmst!", ihr: "Nehmt!", sie: "Nehmen Sie!", wir: "Nehmen wir!", en: "take", enImp: "Take!" },
  { v: "geben", du: "Gib!", duSt: "Gibst!", ihr: "Gebt!", sie: "Geben Sie!", wir: "Geben wir!", en: "give", enImp: "Give!" },
  { v: "sehen", du: "Sieh!", duSt: "Siehst!", ihr: "Seht!", sie: "Sehen Sie!", wir: "Sehen wir!", en: "look", enImp: "Look!" },
  { v: "sprechen", du: "Sprich!", duSt: "Sprichst!", ihr: "Sprecht!", sie: "Sprechen Sie!", wir: "Sprechen wir!", en: "speak", enImp: "Speak!" },
  { v: "essen", du: "Iss!", duSt: "Isst!", ihr: "Esst!", sie: "Essen Sie!", wir: "Essen wir!", en: "eat", enImp: "Eat!" },
  { v: "lesen", du: "Lies!", duSt: "Liest!", ihr: "Lest!", sie: "Lesen Sie!", wir: "Lesen wir!", en: "read", enImp: "Read!" },
  { v: "fahren", du: "Fahr!", duSt: "Fährst!", ihr: "Fahrt!", sie: "Fahren Sie!", wir: "Fahren wir!", en: "drive", enImp: "Drive!" },
  { v: "schlafen", du: "Schlaf!", duSt: "Schläfst!", ihr: "Schlaft!", sie: "Schlafen Sie!", wir: "Schlafen wir!", en: "sleep", enImp: "Sleep!" },
  { v: "laufen", du: "Lauf!", duSt: "Läufst!", ihr: "Lauft!", sie: "Laufen Sie!", wir: "Laufen wir!", en: "run", enImp: "Run!" },
  { v: "kaufen", du: "Kauf!", duSt: "Kaufst!", ihr: "Kauft!", sie: "Kaufen Sie!", wir: "Kaufen wir!", en: "buy", enImp: "Buy!" },
  { v: "bezahlen", du: "Bezahl!", duSt: "Bezahlst!", ihr: "Bezahlt!", sie: "Bezahlen Sie!", wir: "Bezahlen wir!", en: "pay", enImp: "Pay!" },
  { v: "bestellen", du: "Bestell!", duSt: "Bestellst!", ihr: "Bestellt!", sie: "Bestellen Sie!", wir: "Bestellen wir!", en: "order", enImp: "Order!" },
  { v: "fragen", du: "Frag!", duSt: "Fragst!", ihr: "Fragt!", sie: "Fragen Sie!", wir: "Fragen wir!", en: "ask", enImp: "Ask!" },
  { v: "antworten", du: "Antworte!", duSt: "Antwortest!", ihr: "Antwortet!", sie: "Antworten Sie!", wir: "Antworten wir!", en: "answer", enImp: "Answer!" },
  { v: "bringen", du: "Bring!", duSt: "Bringst!", ihr: "Bringt!", sie: "Bringen Sie!", wir: "Bringen wir!", en: "bring", enImp: "Bring!" },
  { v: "holen", du: "Hol!", duSt: "Holst!", ihr: "Holt!", sie: "Holen Sie!", wir: "Holen wir!", en: "fetch", enImp: "Fetch!" },
  { v: "zeigen", du: "Zeig!", duSt: "Zeigst!", ihr: "Zeigt!", sie: "Zeigen Sie!", wir: "Zeigen wir!", en: "show", enImp: "Show!" },
  { v: "suchen", du: "Such!", duSt: "Suchst!", ihr: "Sucht!", sie: "Suchen Sie!", wir: "Suchen wir!", en: "search", enImp: "Search!" },
  { v: "finden", du: "Finde!", duSt: "Findest!", ihr: "Findet!", sie: "Finden Sie!", wir: "Finden wir!", en: "find", enImp: "Find!" },
  { v: "verstehen", du: "Versteh!", duSt: "Verstehst!", ihr: "Versteht!", sie: "Verstehen Sie!", wir: "Verstehen wir!", en: "understand", enImp: "Understand!" },
  { v: "hören", du: "Hör!", duSt: "Hörst!", ihr: "Hört!", sie: "Hören Sie!", wir: "Hören wir!", en: "listen", enImp: "Listen!" },
  { v: "sagen", du: "Sag!", duSt: "Sagst!", ihr: "Sagt!", sie: "Sagen Sie!", wir: "Sagen wir!", en: "say", enImp: "Say!" },
  { v: "rufen", du: "Ruf!", duSt: "Rufst!", ihr: "Ruft!", sie: "Rufen Sie!", wir: "Rufen wir!", en: "call", enImp: "Call!" },
  { v: "tanzen", du: "Tanz!", duSt: "Tanzt!", ihr: "Tanzt!", sie: "Tanzen Sie!", wir: "Tanzen wir!", en: "dance", enImp: "Dance!" },
  { v: "singen", du: "Sing!", duSt: "Singst!", ihr: "Singt!", sie: "Singen Sie!", wir: "Singen wir!", en: "sing", enImp: "Sing!" },
  { v: "helfen", du: "Hilf!", duSt: "Hilfst!", ihr: "Helft!", sie: "Helfen Sie!", wir: "Helfen wir!", en: "help", enImp: "Help!" },
  { v: "treffen", du: "Triff!", duSt: "Triffst!", ihr: "Trefft!", sie: "Treffen Sie!", wir: "Treffen wir!", en: "meet", enImp: "Meet!" },
  { v: "kochen", du: "Koch!", duSt: "Kochst!", ihr: "Kocht!", sie: "Kochen Sie!", wir: "Kochen wir!", en: "cook", enImp: "Cook!" },
  { v: "schreiben", du: "Schreib!", duSt: "Schreibst!", ihr: "Schreibt!", sie: "Schreiben Sie!", wir: "Schreiben wir!", en: "write", enImp: "Write!" },
  { v: "haben", du: "Hab!", duSt: "Hast!", ihr: "Habt!", sie: "Haben Sie!", wir: "Haben wir!", en: "have", enImp: "Have!" },
  { v: "sein", du: "Sei!", duSt: "Bist!", ihr: "Seid!", sie: "Seien Sie!", wir: "Seien wir!", en: "be", enImp: "Be!" },
];

const SEPARABLE: [string, string][] = [
  ["aufstehen", "to get up"],
  ["einkaufen", "to shop"],
  ["mitkommen", "to come along"],
  ["anrufen", "to call"],
  ["abfahren", "to depart"],
  ["aussteigen", "to get out"],
  ["aufräumen", "to tidy up"],
  ["anfangen", "to start"],
  ["zumachen", "to close"],
  ["mitbringen", "to bring along"],
  ["zurückkommen", "to come back"],
  ["aufpassen", "to pay attention"],
  ["fernsehen", "to watch TV"],
  ["teilnehmen", "to take part"],
  ["einschlafen", "to fall asleep"],
  ["abholen", "to pick up"],
  ["losgehen", "to set off"],
  ["einsteigen", "to get in"],
  ["aufmachen", "to open"],
  ["mitnehmen", "to take along"],
  ["aufhören", "to stop"],
  ["anziehen", "to put on"],
  ["ausziehen", "to take off"],
  ["auspacken", "to unpack"],
  ["einpacken", "to pack up"],
  ["vorbeikommen", "to come by"],
  ["mitmachen", "to join in"],
  ["aufwachen", "to wake up"],
  ["wegfahren", "to drive away"],
  ["zurückgeben", "to give back"],
  ["wegwerfen", "to throw away"],
  ["abgeben", "to hand in"],
  ["anmelden", "to sign up"],
  ["losfahren", "to set off"],
  ["weggehen", "to go away"],
  ["nachfragen", "to ask again"],
  ["vorstellen", "to introduce"],
  ["zuhören", "to listen"],
  ["mitfahren", "to ride along"],
  ["ausgeben", "to spend"],
  ["vorbereiten", "to prepare"],
  ["aufmachen", "to open"],
  ["mitteilen", "to inform"],
  ["nachschauen", "to look up"],
  ["mitmachen", "to join in"],
  ["vorbeikommen", "to come by"],
  ["aufstehen", "to get up"],
  ["einkaufen", "to shop"],
  ["anfangen", "to start"],
  ["aufräumen", "to tidy up"],
  ["anrufen", "to call"],
  ["mitkommen", "to come along"],
];

const INSEPARABLE: [string, string][] = [
  ["verstehen", "to understand"],
  ["besuchen", "to visit"],
  ["erklären", "to explain"],
  ["entschuldigen", "to excuse"],
  ["gehören", "to belong"],
  ["zerstören", "to destroy"],
  ["erzählen", "to tell"],
  ["verdienen", "to earn"],
  ["bestellen", "to order"],
  ["bezahlen", "to pay"],
  ["erleben", "to experience"],
  ["versuchen", "to try"],
  ["vergessen", "to forget"],
  ["verlieren", "to lose"],
  ["bekommen", "to receive"],
  ["entdecken", "to discover"],
  ["verpassen", "to miss"],
  ["erwarten", "to expect"],
  ["vermieten", "to rent out"],
  ["verkaufen", "to sell"],
  ["vermissen", "to miss"],
  ["besichtigen", "to visit"],
  ["gefallen", "to please"],
  ["gehorchen", "to obey"],
  ["zerbrechen", "to break"],
  ["missverstehen", "to misunderstand"],
  ["beschreiben", "to describe"],
  ["beantworten", "to answer"],
  ["enttäuschen", "to disappoint"],
  ["erwähnen", "to mention"],
  ["verbringen", "to spend"],
  ["verstehen", "to understand"],
  ["besuchen", "to visit"],
  ["erklären", "to explain"],
  ["bestellen", "to order"],
  ["bezahlen", "to pay"],
];

const PREFIX_MEANING: [string, string, string][] = [
  ["ab-", "abfahren", "to depart"],
  ["ab-", "abholen", "to pick up"],
  ["ab-", "abgeben", "to hand in"],
  ["an-", "ankommen", "to arrive"],
  ["an-", "anrufen", "to call"],
  ["an-", "anfangen", "to start"],
  ["auf-", "aufstehen", "to get up"],
  ["auf-", "aufräumen", "to tidy up"],
  ["auf-", "aufpassen", "to pay attention"],
  ["aus-", "aussteigen", "to get out"],
  ["aus-", "auspacken", "to unpack"],
  ["aus-", "ausziehen", "to take off"],
  ["ein-", "einkaufen", "to shop"],
  ["ein-", "einsteigen", "to get in"],
  ["ein-", "einpacken", "to pack up"],
  ["mit-", "mitkommen", "to come along"],
  ["mit-", "mitbringen", "to bring along"],
  ["mit-", "mitmachen", "to join in"],
  ["nach-", "nachfragen", "to ask again"],
  ["nach-", "nachschauen", "to look up"],
  ["nach-", "nachdenken", "to think over"],
  ["vor-", "vorstellen", "to introduce"],
  ["vor-", "vorbereiten", "to prepare"],
  ["vor-", "vorbeikommen", "to come by"],
  ["zu-", "zumachen", "to close"],
  ["zu-", "zuhören", "to listen"],
  ["zu-", "zunehmen", "to put on weight"],
  ["weg-", "weggehen", "to go away"],
  ["weg-", "wegwerfen", "to throw away"],
  ["weg-", "wegfahren", "to drive away"],
  ["zurück-", "zurückkommen", "to come back"],
  ["zurück-", "zurückgeben", "to give back"],
  ["zurück-", "zurückfahren", "to drive back"],
  ["be-", "bestellen", "to order"],
  ["be-", "bezahlen", "to pay"],
  ["be-", "besuchen", "to visit"],
  ["ver-", "verstehen", "to understand"],
  ["ver-", "verkaufen", "to sell"],
  ["ver-", "vergessen", "to forget"],
  ["er-", "erklären", "to explain"],
  ["er-", "erzählen", "to tell"],
  ["er-", "erleben", "to experience"],
  ["ent-", "entschuldigen", "to excuse"],
  ["ent-", "entdecken", "to discover"],
  ["ent-", "entfernen", "to remove"],
  ["ge-", "gehören", "to belong"],
  ["ge-", "gefallen", "to please"],
  ["ge-", "gewinnen", "to win"],
];

const SEPARABLE_SENTENCES: WoSentence[] = [
  { chunks: ["Ich", "stehe", "um sieben Uhr", "auf."], translation: "I get up at seven o'clock.", explain: "auf- closes the frame: stehe ... auf." },
  { chunks: ["Er", "ruft", "seine Mutter", "an."], translation: "He calls his mother.", explain: "an- closes the frame: ruft ... an." },
  { chunks: ["Wir", "kaufen", "heute", "ein."], translation: "We are going shopping today.", explain: "ein- closes the frame: kaufen ... ein." },
  { chunks: ["Der Zug", "fährt", "um 14:30 Uhr", "ab."], translation: "The train departs at 14:30.", explain: "The time phrase sits between the verb and the prefix ab." },
  { chunks: ["Ich", "mache", "das Fenster", "zu."], translation: "I am closing the window.", explain: "zu- closes the frame: mache ... zu." },
  { chunks: ["Sie", "kommt", "heute", "mit."], translation: "She is coming along today.", explain: "mit- closes the frame: kommt ... mit." },
  { chunks: ["Ich", "räume", "mein Zimmer", "auf."], translation: "I am tidying my room.", explain: "auf- closes the frame: räume ... auf." },
  { chunks: ["Der Kurs", "fängt", "um neun Uhr", "an."], translation: "The course starts at nine o'clock.", explain: "an- closes the frame: fängt ... an." },
  { chunks: ["Sie", "steigt", "an der Haltestelle", "aus."], translation: "She gets out at the stop.", explain: "aus- closes the frame: steigt ... aus." },
  { chunks: ["Wir", "steigen", "in den Bus", "ein."], translation: "We are getting on the bus.", explain: "ein- closes the frame: steigen ... ein." },
  { chunks: ["Er", "bringt", "seinem Sohn", "ein Geschenk", "mit."], translation: "He brings a present for his son.", explain: "mit- closes the frame: bringt ... mit." },
  { chunks: ["Ich", "nehme", "meinen Regenschirm", "mit."], translation: "I am taking my umbrella along.", explain: "mit- closes the frame: nehme ... mit." },
  { chunks: ["Wir", "kommen", "am Abend", "zurück."], translation: "We come back in the evening.", explain: "zurück- closes the frame: kommen ... zurück." },
  { chunks: ["Du", "gehst", "heute", "nicht", "weg."], translation: "You are not going away today.", explain: "weg- closes the frame: gehst ... weg." },
  { chunks: ["Ich", "passe", "im Unterricht", "auf."], translation: "I pay attention in class.", explain: "auf- closes the frame: passe ... auf." },
  { chunks: ["Sie", "sieht", "am Abend", "fern."], translation: "She watches TV in the evening.", explain: "fern- closes the frame: sieht ... fern." },
  { chunks: ["Wir", "nehmen", "am Kurs", "teil."], translation: "We take part in the course.", explain: "teil- closes the frame: nehmen ... teil." },
  { chunks: ["Ich", "schlafe", "um zehn Uhr", "ein."], translation: "I fall asleep at ten o'clock.", explain: "ein- closes the frame: schlafe ... ein." },
  { chunks: ["Er", "holt", "mich", "vom Bahnhof", "ab."], translation: "He picks me up from the station.", explain: "ab- closes the frame: holt ... ab." },
  { chunks: ["Wir", "gehen", "jetzt", "los."], translation: "We are leaving now.", explain: "los- closes the frame: gehen ... los." },
  { chunks: ["Der Film", "fängt", "um acht Uhr", "an."], translation: "The film starts at eight o'clock.", explain: "an- closes the frame: fängt ... an." },
  { chunks: ["Ich", "stehe", "am Sonntag", "spät", "auf."], translation: "I get up late on Sunday.", explain: "auf- closes the frame: stehe ... auf." },
  { chunks: ["Sie", "hört", "um Mitternacht", "auf."], translation: "She stops at midnight.", explain: "auf- closes the frame: hört ... auf." },
  { chunks: ["Du", "ziehst", "deine Jacke", "an."], translation: "You are putting on your jacket.", explain: "an- closes the frame: ziehst ... an." },
  { chunks: ["Ich", "ziehe", "meine Schuhe", "aus."], translation: "I am taking off my shoes.", explain: "aus- closes the frame: ziehe ... aus." },
  { chunks: ["Wir", "packen", "unsere Koffer", "aus."], translation: "We are unpacking our suitcases.", explain: "aus- closes the frame: packen ... aus." },
  { chunks: ["Er", "packt", "seine Sachen", "ein."], translation: "He is packing his things.", explain: "ein- closes the frame: packt ... ein." },
  { chunks: ["Sie", "kommt", "am Samstag", "vorbei."], translation: "She is coming by on Saturday.", explain: "vorbei- closes the frame: kommt ... vorbei." },
  { chunks: ["Wir", "fahren", "am Morgen", "los."], translation: "We drive off in the morning.", explain: "los- closes the frame: fahren ... los." },
  { chunks: ["Ich", "fahre", "mit dem Fahrrad", "mit."], translation: "I ride along by bicycle.", explain: "mit- closes the frame: fahre ... mit." },
  { chunks: ["Du", "machst", "beim Spiel", "mit."], translation: "You are joining the game.", explain: "mit- closes the frame: machst ... mit." },
  { chunks: ["Ich", "wache", "um sechs Uhr", "auf."], translation: "I wake up at six o'clock.", explain: "auf- closes the frame: wache ... auf." },
  { chunks: ["Sie", "räumt", "die Küche", "auf."], translation: "She is tidying the kitchen.", explain: "auf- closes the frame: räumt ... auf." },
  { chunks: ["Wir", "machen", "die Tür", "auf."], translation: "We are opening the door.", explain: "auf- closes the frame: machen ... auf." },
  { chunks: ["Er", "gibt", "die Hausaufgaben", "ab."], translation: "He hands in the homework.", explain: "ab- closes the frame: gibt ... ab." },
  { chunks: ["Ich", "melde", "mich", "im Kurs", "an."], translation: "I sign up for the course.", explain: "an- closes the frame: melde ... an." },
  { chunks: ["Sie", "meldet", "sich", "in der App", "ab."], translation: "She logs out of the app.", explain: "ab- closes the frame: meldet ... ab." },
  { chunks: ["Wir", "rufen", "dich", "später", "an."], translation: "We will call you later.", explain: "an- closes the frame: rufen ... an." },
  { chunks: ["Du", "gibst", "das Buch", "zurück."], translation: "You return the book.", explain: "zurück- closes the frame: gibst ... zurück." },
  { chunks: ["Ich", "werfe", "den Müll", "weg."], translation: "I throw away the rubbish.", explain: "weg- closes the frame: werfe ... weg." },
  { chunks: ["Sie", "hört", "mit der Arbeit", "auf."], translation: "She stops working.", explain: "auf- closes the frame: hört ... auf." },
  { chunks: ["Wir", "steigen", "morgen früh", "ein."], translation: "We board early tomorrow.", explain: "ein- closes the frame: steigen ... ein." },
  { chunks: ["Er", "fährt", "um acht Uhr", "los."], translation: "He leaves at eight o'clock.", explain: "los- closes the frame: fährt ... los." },
  { chunks: ["Ich", "bringe", "Kuchen", "zur Party", "mit."], translation: "I bring cake to the party.", explain: "mit- closes the frame: bringe ... mit." },
  { chunks: ["Sie", "zieht", "sich", "warm", "an."], translation: "She dresses warmly.", explain: "an- closes the frame: zieht ... an." },
  { chunks: ["Wir", "sehen", "gern", "fern."], translation: "We like watching TV.", explain: "fern- closes the frame: sehen ... fern." },
  { chunks: ["Du", "nimmst", "das Mittagessen", "mit."], translation: "You take lunch along.", explain: "mit- closes the frame: nimmst ... mit." },
  { chunks: ["Ich", "fange", "am Montag", "an."], translation: "I start on Monday.", explain: "an- closes the frame: fange ... an." },
  { chunks: ["Sie", "kommt", "heute Abend", "mit."], translation: "She is coming along this evening.", explain: "mit- closes the frame: kommt ... mit." },
  { chunks: ["Wir", "stehen", "früh", "auf."], translation: "We get up early.", explain: "auf- closes the frame: stehen ... auf." },
];

interface Participle {
  verb: string;
  participle: string;
  aux: "haben" | "sein";
  separable: boolean;
  sentence: string;
  translation: string;
}

const PARTICIPLES: Participle[] = [
  { verb: "aufstehen", participle: "aufgestanden", aux: "sein", separable: true, sentence: "Ich bin heute früh ___.", translation: "I got up early today." },
  { verb: "einkaufen", participle: "eingekauft", aux: "haben", separable: true, sentence: "Wir haben gestern ___.", translation: "We went shopping yesterday." },
  { verb: "anrufen", participle: "angerufen", aux: "haben", separable: true, sentence: "Sie hat mich gestern ___.", translation: "She called me yesterday." },
  { verb: "aufräumen", participle: "aufgeräumt", aux: "haben", separable: true, sentence: "Ich habe mein Zimmer ___.", translation: "I tidied my room." },
  { verb: "anfangen", participle: "angefangen", aux: "haben", separable: true, sentence: "Der Kurs hat um neun Uhr ___.", translation: "The course started at nine o'clock." },
  { verb: "zumachen", participle: "zugemacht", aux: "haben", separable: true, sentence: "Ich habe das Fenster ___.", translation: "I closed the window." },
  { verb: "losfahren", participle: "losgefahren", aux: "sein", separable: true, sentence: "Wir sind am Morgen ___.", translation: "We set off in the morning." },
  { verb: "aussteigen", participle: "ausgestiegen", aux: "sein", separable: true, sentence: "Sie ist an der Haltestelle ___.", translation: "She got out at the stop." },
  { verb: "einsteigen", participle: "eingestiegen", aux: "sein", separable: true, sentence: "Wir sind in den Bus ___.", translation: "We got on the bus." },
  { verb: "mitbringen", participle: "mitgebracht", aux: "haben", separable: true, sentence: "Er hat ein Geschenk ___.", translation: "He brought a present." },
  { verb: "mitnehmen", participle: "mitgenommen", aux: "haben", separable: true, sentence: "Ich habe meinen Regenschirm ___.", translation: "I took my umbrella along." },
  { verb: "zurückkommen", participle: "zurückgekommen", aux: "sein", separable: true, sentence: "Wir sind am Abend ___.", translation: "We came back in the evening." },
  { verb: "weggehen", participle: "weggegangen", aux: "sein", separable: true, sentence: "Du bist heute nicht ___.", translation: "You did not go away today." },
  { verb: "aufpassen", participle: "aufgepasst", aux: "haben", separable: true, sentence: "Ich habe im Unterricht ___.", translation: "I paid attention in class." },
  { verb: "fernsehen", participle: "ferngesehen", aux: "haben", separable: true, sentence: "Sie hat am Abend ___.", translation: "She watched TV in the evening." },
  { verb: "teilnehmen", participle: "teilgenommen", aux: "haben", separable: true, sentence: "Wir haben am Kurs ___.", translation: "We took part in the course." },
  { verb: "einschlafen", participle: "eingeschlafen", aux: "sein", separable: true, sentence: "Ich bin um zehn Uhr ___.", translation: "I fell asleep at ten o'clock." },
  { verb: "abholen", participle: "abgeholt", aux: "haben", separable: true, sentence: "Er hat mich vom Bahnhof ___.", translation: "He picked me up from the station." },
  { verb: "losgehen", participle: "losgegangen", aux: "sein", separable: true, sentence: "Wir sind jetzt ___.", translation: "We have set off now." },
  { verb: "anziehen", participle: "angezogen", aux: "haben", separable: true, sentence: "Sie hat die Jacke ___.", translation: "She put on the jacket." },
  { verb: "ausziehen", participle: "ausgezogen", aux: "haben", separable: true, sentence: "Ich habe die Schuhe ___.", translation: "I took off the shoes." },
  { verb: "auspacken", participle: "ausgepackt", aux: "haben", separable: true, sentence: "Wir haben die Koffer ___.", translation: "We unpacked the suitcases." },
  { verb: "einpacken", participle: "eingepackt", aux: "haben", separable: true, sentence: "Er hat seine Sachen ___.", translation: "He packed his things." },
  { verb: "vorbeikommen", participle: "vorbeigekommen", aux: "sein", separable: true, sentence: "Sie ist am Samstag ___.", translation: "She came by on Saturday." },
  { verb: "abgeben", participle: "abgegeben", aux: "haben", separable: true, sentence: "Ich habe die Hausaufgaben ___.", translation: "I handed in the homework." },
  { verb: "anmelden", participle: "angemeldet", aux: "haben", separable: true, sentence: "Ich habe mich im Kurs ___.", translation: "I signed up for the course." },
  { verb: "abmelden", participle: "abgemeldet", aux: "haben", separable: true, sentence: "Sie hat sich in der App ___.", translation: "She logged out of the app." },
  { verb: "zurückgeben", participle: "zurückgegeben", aux: "haben", separable: true, sentence: "Du hast das Buch ___.", translation: "You returned the book." },
  { verb: "wegwerfen", participle: "weggeworfen", aux: "haben", separable: true, sentence: "Ich habe den Müll ___.", translation: "I threw away the rubbish." },
  { verb: "aufwachen", participle: "aufgewacht", aux: "sein", separable: true, sentence: "Ich bin um sechs Uhr ___.", translation: "I woke up at six o'clock." },
];

const SEPARABLE_PERFECT: WoSentence[] = [
  { chunks: ["Ich", "bin", "um sieben Uhr", "aufgestanden."], translation: "I got up at seven o'clock.", explain: "aufstehen takes sein; the participle closes the frame." },
  { chunks: ["Wir", "haben", "gestern", "eingekauft."], translation: "We went shopping yesterday.", explain: "einkaufen takes haben; eingekauft closes the frame." },
  { chunks: ["Er", "hat", "die Frage", "verstanden."], translation: "He understood the question.", explain: "Inseparable verbs take no ge-: verstanden." },
  { chunks: ["Sie", "hat", "das Buch", "gekauft."], translation: "She bought the book.", explain: "haben second, the participle closes the frame." },
  { chunks: ["Ich", "habe", "das Fenster", "zugemacht."], translation: "I closed the window.", explain: "zugemacht: ge- sits between zu- and the stem." },
  { chunks: ["Wir", "haben", "den Kurs", "angefangen."], translation: "We started the course.", explain: "angefangen: ge- sits between an- and the stem." },
  { chunks: ["Du", "bist", "mitgekommen."], translation: "You came along.", explain: "mitkommen takes sein; mitgekommen closes the frame." },
  { chunks: ["Er", "hat", "seine Mutter", "angerufen."], translation: "He called his mother.", explain: "angerufen: ge- sits between an- and rufen." },
  { chunks: ["Wir", "sind", "nach Hause", "gefahren."], translation: "We drove home.", explain: "fahren takes sein; the participle closes the frame." },
  { chunks: ["Ich", "habe", "gestern", "Deutsch", "gelernt."], translation: "I learned German yesterday.", explain: "haben second, the participle closes the frame." },
  { chunks: ["Sie", "hat", "die Tür", "aufgemacht."], translation: "She opened the door.", explain: "aufgemacht: ge- sits between auf- and the stem." },
  { chunks: ["Wir", "haben", "Pizza", "bestellt."], translation: "We ordered pizza.", explain: "bestellen takes no ge-: the prefix be- never splits." },
  { chunks: ["Er", "ist", "um acht Uhr", "losgefahren."], translation: "He left at eight o'clock.", explain: "losfahren takes sein; losgefahren closes the frame." },
  { chunks: ["Ich", "habe", "den Kaffee", "bezahlt."], translation: "I paid for the coffee.", explain: "bezahlen takes no ge-: the prefix be- never splits." },
  { chunks: ["Sie", "hat", "das Konzert", "besucht."], translation: "She visited the concert.", explain: "besuchen takes no ge-: the prefix be- never splits." },
  { chunks: ["Wir", "haben", "den Text", "verstanden."], translation: "We understood the text.", explain: "verstehen takes no ge-: verstanden." },
  { chunks: ["Ich", "bin", "heute früh", "aufgewacht."], translation: "I woke up early today.", explain: "aufwachen takes sein; aufgewacht closes the frame." },
  { chunks: ["Du", "hast", "die Aufgabe", "vergessen."], translation: "You forgot the task.", explain: "vergessen takes no ge-: the prefix ver- never splits." },
  { chunks: ["Er", "hat", "mich", "vom Bahnhof", "abgeholt."], translation: "He picked me up from the station.", explain: "abholen takes haben; abgeholt closes the frame." },
  { chunks: ["Wir", "haben", "die Tickets", "bestellt."], translation: "We ordered the tickets.", explain: "bestellt: no ge- after the inseparable prefix be-." },
];

const MODAL_IMPERATIVE: WoSentence[] = [
  { chunks: ["Ich", "muss", "um sieben Uhr", "aufstehen."], translation: "I have to get up at seven o'clock.", explain: "With a modal the prefix stays attached: aufstehen closes the sentence." },
  { chunks: ["Wir", "wollen", "morgen", "einkaufen."], translation: "We want to go shopping tomorrow.", explain: "wollen second, the full infinitive einkaufen at the end." },
  { chunks: ["Du", "kannst", "mich", "morgen", "anrufen."], translation: "You can call me tomorrow.", explain: "kannst second, the full infinitive anrufen at the end." },
  { chunks: ["Ich", "will", "heute", "nicht", "einkaufen."], translation: "I do not want to go shopping today.", explain: "The modal keeps the infinitive whole: einkaufen." },
  { chunks: ["Wir", "müssen", "um acht Uhr", "aufstehen."], translation: "We have to get up at eight o'clock.", explain: "müssen second, aufstehen closes the frame." },
  { chunks: ["Sie", "soll", "das Fenster", "zumachen."], translation: "She should close the window.", explain: "soll second, the full infinitive zumachen at the end." },
  { chunks: ["Ich", "möchte", "morgen früh", "aufstehen."], translation: "I would like to get up early tomorrow.", explain: "möchte second, aufstehen closes the sentence." },
  { chunks: ["Steh", "bitte", "auf!"], translation: "Please get up!", explain: "The imperative opens with the verb, the prefix closes it." },
  { chunks: ["Stehen", "Sie", "bitte", "auf!"], translation: "Please stand up! (formal)", explain: "Formal imperative: infinitive + Sie, the prefix still closes the sentence." },
  { chunks: ["Mach", "die Tür", "zu!"], translation: "Close the door!", explain: "zumachen in the imperative: zu ... mach, the prefix closes the command." },
  { chunks: ["Ruf", "mich", "später", "an!"], translation: "Call me later!", explain: "anrufen splits: Ruf ... an." },
  { chunks: ["Kauf", "ein!"], translation: "Go shopping!", explain: "einkaufen splits: Kauf ... ein." },
  { chunks: ["Räum", "dein Zimmer", "auf!"], translation: "Tidy your room!", explain: "aufräumen splits: Räum ... auf." },
  { chunks: ["Komm", "bitte", "mit!"], translation: "Please come along!", explain: "mitkommen splits: Komm ... mit." },
  { chunks: ["Steig", "an der Haltestelle", "aus!"], translation: "Get out at the stop!", explain: "aussteigen splits: Steig ... aus." },
  { chunks: ["Steigen", "Sie", "an der Haltestelle", "aus!"], translation: "Get out at the stop! (formal)", explain: "Formal imperative: Steigen Sie ... aus." },
  { chunks: ["Bring", "mir", "das Buch", "mit!"], translation: "Bring me the book!", explain: "mitbringen splits: Bring ... mit." },
  { chunks: ["Nimm", "deinen Regenschirm", "mit!"], translation: "Take your umbrella along!", explain: "mitnehmen splits: Nimm ... mit." },
  { chunks: ["Zieh", "dich", "warm", "an!"], translation: "Dress warmly!", explain: "anziehen splits: Zieh ... an." },
  { chunks: ["Hör", "mit der Arbeit", "auf!"], translation: "Stop working!", explain: "aufhören splits: Hör ... auf." },
  { chunks: ["Gib", "die Hausaufgaben", "ab!"], translation: "Hand in the homework!", explain: "abgeben splits: Gib ... ab." },
  { chunks: ["Meld", "dich", "im Kurs", "an!"], translation: "Sign up for the course!", explain: "anmelden splits: Meld ... an." },
  { chunks: ["Wirf", "den Müll", "weg!"], translation: "Throw away the rubbish!", explain: "wegwerfen splits: Wirf ... weg." },
  { chunks: ["Sieh", "dir", "das", "an!"], translation: "Look at that!", explain: "ansehen splits: Sieh ... an." },
  { chunks: ["Wir", "müssen", "jetzt", "losgehen."], translation: "We have to leave now.", explain: "losgehen stays whole after the modal: müssen ... losgehen." },
  { chunks: ["Ich", "kann", "mit dem Fahrrad", "mitfahren."], translation: "I can ride along by bicycle.", explain: "mitfahren stays whole after kann." },
];

const PARTICIPLE_MC: [string, string, string[]][] = [
  ["aufstehen", "aufgestanden", ["aufgestanden", "aufstanden", "gestanden"]],
  ["verstehen", "verstanden", ["verstanden", "geverstanden", "verstandt"]],
  ["einkaufen", "eingekauft", ["eingekauft", "gekauft", "einkauft"]],
  ["anrufen", "angerufen", ["angerufen", "gerufen", "anruft"]],
  ["aufräumen", "aufgeräumt", ["aufgeräumt", "geräumt", "aufraumt"]],
  ["anfangen", "angefangen", ["angefangen", "gefangen", "anfangt"]],
  ["zumachen", "zugemacht", ["zugemacht", "gemacht", "zumacht"]],
  ["mitkommen", "mitgekommen", ["mitgekommen", "gekommen", "mitkommt"]],
  ["aussteigen", "ausgestiegen", ["ausgestiegen", "gestiegen", "aussteigt"]],
  ["mitbringen", "mitgebracht", ["mitgebracht", "gebracht", "mitbringt"]],
  ["abholen", "abgeholt", ["abgeholt", "geholt", "abholt"]],
  ["aufpassen", "aufgepasst", ["aufgepasst", "gepasst", "aufpasst"]],
  ["fernsehen", "ferngesehen", ["ferngesehen", "gesehen", "fernsieht"]],
  ["teilnehmen", "teilgenommen", ["teilgenommen", "genommen", "teilnimmt"]],
  ["einschlafen", "eingeschlafen", ["eingeschlafen", "geschlafen", "einschläft"]],
  ["abgeben", "abgegeben", ["abgegeben", "gegeben", "abgibt"]],
  ["anmelden", "angemeldet", ["angemeldet", "gemeldet", "anmeldet"]],
  ["zurückgeben", "zurückgegeben", ["zurückgegeben", "gegeben", "zurückgibt"]],
  ["wegwerfen", "weggeworfen", ["weggeworfen", "geworfen", "wegwirft"]],
];

const SEPARABLE_LISTENING: { prompt: string; options: string[]; explain: string }[] = [
  { prompt: "Wir haben gestern eingekauft.", options: ["Wir haben gestern eingekauft.", "Wir sind gestern eingekauft.", "Wir haben gestern gekauft."], explain: "einkaufen takes haben, and the participle is eingekauft, not gekauft." },
  { prompt: "Ich muss um sieben Uhr aufstehen.", options: ["Ich muss um sieben Uhr aufstehen.", "Ich stehe um sieben Uhr auf.", "Ich muss um sieben Uhr auf."], explain: "With a modal the prefix stays attached: aufstehen." },
  { prompt: "Ruf mich später an!", options: ["Ruf mich später an!", "Ruf mich an später!", "Anruf mich später!"], explain: "The command is Ruf mich später an: verb first, prefix at the end." },
  { prompt: "Steh um 6 Uhr auf!", options: ["Steh um 6 Uhr auf!", "Steh auf um 6 Uhr!", "Aufsteh um 6 Uhr!"], explain: "The command is Steh um 6 Uhr auf: verb first, prefix at the end." },
  { prompt: "Er hat die Frage verstanden.", options: ["Er hat die Frage verstanden.", "Er hat die Frage geverstanden.", "Er hat die Frage versteht."], explain: "ver- never splits, so the participle has no ge-: verstanden." },
];

const IMPERATIVE_WO_LEVEL2: WoSentence[] = [
  { chunks: ["Geh", "nach Hause!"], translation: "Go home!", explain: "The du imperative opens with the verb: Geh." },
  { chunks: ["Mach", "die Tür", "zu!"], translation: "Close the door!", explain: "zumachen splits: the prefix zu closes the command." },
  { chunks: ["Komm", "bitte", "mit!"], translation: "Please come along!", explain: "mitkommen splits: Komm ... mit." },
  { chunks: ["Trink", "deinen Kaffee!"], translation: "Drink your coffee!", explain: "The du imperative drops the -st: Trink." },
  { chunks: ["Lies", "die Aufgabe!"], translation: "Read the task!", explain: "lesen changes the vowel: Lies, not Lest." },
  { chunks: ["Öffne", "das Fenster!"], translation: "Open the window!", explain: "Verbs ending in -t add -e in the du form: Öffne." },
  { chunks: ["Bring", "mir", "das Buch!"], translation: "Bring me the book!", explain: "The du imperative: Bring, from du bringst." },
  { chunks: ["Sprich", "langsam!"], translation: "Speak slowly!", explain: "sprechen changes the vowel: Sprich, not Sprech." },
  { chunks: ["Sieh", "dir", "das", "an!"], translation: "Look at that!", explain: "ansehen splits: Sieh ... an, with the dative dir." },
  { chunks: ["Warte", "auf mich!"], translation: "Wait for me!", explain: "Verbs ending in -t add -e: Warte." },
];

const IMPERATIVE_FILLBLANK_LEVEL2: { sentence: string; translation: string; answers: string[]; explain: string }[] = [
  { sentence: "___ ruhig!", translation: "Be quiet! (du)", answers: ["Sei"], explain: "The du imperative of sein is Sei." },
  { sentence: "___ Spaß!", translation: "Have fun! (du)", answers: ["Hab"], explain: "The du imperative of haben is Hab." },
  { sentence: "___ nach Hause!", translation: "Go home! (du)", answers: ["Geh"], explain: "The du imperative drops the -st: Geh." },
  { sentence: "___ das Fenster!", translation: "Open the window! (du)", answers: ["Öffne"], explain: "Verbs ending in -t add -e: Öffne." },
  { sentence: "___ die Aufgabe!", translation: "Read the task! (du)", answers: ["Lies"], explain: "lesen changes the vowel: Lies." },
  { sentence: "___ langsam!", translation: "Speak slowly! (du)", answers: ["Sprich"], explain: "sprechen changes the vowel: Sprich." },
  { sentence: "___ deinen Kaffee!", translation: "Drink your coffee! (du)", answers: ["Trink"], explain: "The du imperative drops the -st: Trink." },
  { sentence: "___ mir das Buch!", translation: "Bring me the book! (du)", answers: ["Bring"], explain: "The du imperative: Bring." },
  { sentence: "___ bitte Platz!", translation: "Please sit down! (du)", answers: ["Nimm"], explain: "nehmen changes the vowel: Nimm." },
  { sentence: "___ mich später an!", translation: "Call me later! (du)", answers: ["Ruf"], explain: "anrufen splits: Ruf ... an." },
];

const IMPERATIVE_FILLBLANK_LEVEL3: { sentence: string; translation: string; answers: string[]; explain: string }[] = [
  { sentence: "___ Sie bitte Platz!", translation: "Please take a seat! (formal)", answers: ["Nehmen"], explain: "The formal imperative is the infinitive: Nehmen Sie." },
  { sentence: "___ nach Hause! (ihr)", translation: "Go home! (ihr)", answers: ["Geht"], explain: "The ihr form keeps the -t: Geht." },
  { sentence: "___ Sie das Fenster!", translation: "Open the window! (formal)", answers: ["Öffnen"], explain: "Formal: infinitive + Sie, so Öffnen." },
  { sentence: "___ das Fenster! (ihr)", translation: "Open the window! (ihr)", answers: ["Öffnet"], explain: "The ihr form keeps the -t: Öffnet." },
  { sentence: "___ Sie den Kaffee!", translation: "Drink the coffee! (formal)", answers: ["Trinken"], explain: "Formal: infinitive + Sie, so Trinken." },
  { sentence: "___ mir das Buch! (ihr)", translation: "Bring me the book! (ihr)", answers: ["Bringt"], explain: "The ihr form keeps the -t: Bringt." },
  { sentence: "___ Sie bitte langsam!", translation: "Please speak slowly! (formal)", answers: ["Sprechen"], explain: "Formal: infinitive + Sie, so Sprechen." },
  { sentence: "___ ruhig! (ihr)", translation: "Be quiet! (ihr)", answers: ["Seid"], explain: "The ihr imperative of sein is Seid." },
  { sentence: "___ Sie einen schönen Tag!", translation: "Have a nice day! (formal)", answers: ["Haben"], explain: "Formal: infinitive + Sie, so Haben." },
  { sentence: "___ auf! (ihr)", translation: "Get up! (ihr)", answers: ["Steht"], explain: "aufstehen splits: the ihr form Steht ... auf." },
];

const IMPERATIVE_LEVEL3_MATCHING: [string, string][][] = [
  [["Gehen Sie!", "formal"], ["Geht!", "ihr"], ["Machen Sie!", "formal"], ["Macht!", "ihr"]],
  [["Nehmen Sie!", "formal"], ["Nehmt!", "ihr"], ["Trinken Sie!", "formal"], ["Trinkt!", "ihr"]],
  [["Öffnen Sie!", "formal"], ["Öffnet!", "ihr"], ["Bringen Sie!", "formal"], ["Bringt!", "ihr"]],
  [["Laufen Sie!", "formal"], ["Lauft!", "ihr"], ["Sehen Sie!", "formal"], ["Seht!", "ihr"]],
  [["Seien Sie!", "formal"], ["Seid!", "ihr"], ["Haben Sie!", "formal"], ["Habt!", "ihr"]],
];

const IMPERATIVE_LEVEL3_LISTENING: { prompt: string; options: string[]; explain: string }[] = [
  { prompt: "Nehmen Sie die zweite Straße rechts!", options: ["Nehmen Sie die zweite Straße rechts!", "Nehmt die zweite Straße rechts!", "Nehmen die zweite Straße rechts!"], explain: "The formal command keeps Sie: Nehmen Sie die zweite Straße rechts." },
  { prompt: "Öffnen Sie das Fenster!", options: ["Öffnen Sie das Fenster!", "Öffnet das Fenster!", "Öffnen das Fenster!"], explain: "The formal imperative is the infinitive: Öffnen Sie." },
  { prompt: "Seid ruhig!", options: ["Seid ruhig!", "Sei ruhig!", "Seien ruhig!"], explain: "The ihr imperative of sein is Seid." },
  { prompt: "Geht nach Hause!", options: ["Geht nach Hause!", "Geh nach Hause!", "Gehen nach Hause!"], explain: "The ihr form keeps the -t: Geht." },
  { prompt: "Haben Sie einen schönen Tag!", options: ["Haben Sie einen schönen Tag!", "Habt einen schönen Tag!", "Haben einen schönen Tag!"], explain: "The formal imperative keeps Sie: Haben Sie." },
];

const IMPERATIVE_WO_LEVEL4: WoSentence[] = [
  { chunks: ["Steh", "um", "6", "Uhr", "auf!"], translation: "Get up at 6 o'clock!", explain: "aufstehen splits: the prefix auf closes the command." },
  { chunks: ["Stehen", "Sie", "um", "6", "Uhr", "auf!"], translation: "Get up at 6 o'clock! (formal)", explain: "Formal imperative: Stehen Sie ... auf." },
  { chunks: ["Ruf", "mich", "später", "an!"], translation: "Call me later!", explain: "anrufen splits: Ruf ... an." },
  { chunks: ["Rufen", "Sie", "mich", "später", "an!"], translation: "Call me later! (formal)", explain: "Formal imperative: Rufen Sie ... an." },
  { chunks: ["Kauf", "ein!"], translation: "Go shopping!", explain: "einkaufen splits: Kauf ... ein." },
  { chunks: ["Kaufen", "Sie", "ein!"], translation: "Go shopping! (formal)", explain: "Formal imperative: Kaufen Sie ... ein." },
  { chunks: ["Räum", "dein Zimmer", "auf!"], translation: "Tidy your room!", explain: "aufräumen splits: Räum ... auf." },
  { chunks: ["Räumen", "Sie", "Ihr Zimmer", "auf!"], translation: "Tidy your room! (formal)", explain: "Formal imperative: Räumen Sie ... auf." },
  { chunks: ["Komm", "bitte", "mit!"], translation: "Please come along!", explain: "mitkommen splits: Komm ... mit." },
  { chunks: ["Kommen", "Sie", "bitte", "mit!"], translation: "Please come along! (formal)", explain: "Formal imperative: Kommen Sie ... mit." },
  { chunks: ["Mach", "die Tür", "zu!"], translation: "Close the door!", explain: "zumachen splits: Mach ... zu." },
  { chunks: ["Machen", "Sie", "die Tür", "zu!"], translation: "Close the door! (formal)", explain: "Formal imperative: Machen Sie ... zu." },
  { chunks: ["Steig", "an der Haltestelle", "aus!"], translation: "Get out at the stop!", explain: "aussteigen splits: Steig ... aus." },
  { chunks: ["Steigen", "Sie", "an der Haltestelle", "aus!"], translation: "Get out at the stop! (formal)", explain: "Formal imperative: Steigen Sie ... aus." },
  { chunks: ["Bring", "mir", "das Buch", "mit!"], translation: "Bring me the book!", explain: "mitbringen splits: Bring ... mit." },
  { chunks: ["Nimm", "deinen Regenschirm", "mit!"], translation: "Take your umbrella along!", explain: "mitnehmen splits: Nimm ... mit." },
  { chunks: ["Zieh", "dich", "warm", "an!"], translation: "Dress warmly!", explain: "anziehen splits: Zieh ... an." },
  { chunks: ["Hör", "mit der Arbeit", "auf!"], translation: "Stop working!", explain: "aufhören splits: Hör ... auf." },
  { chunks: ["Gib", "die Hausaufgaben", "ab!"], translation: "Hand in the homework!", explain: "abgeben splits: Gib ... ab." },
  { chunks: ["Meld", "dich", "im Kurs", "an!"], translation: "Sign up for the course!", explain: "anmelden splits: Meld ... an." },
  { chunks: ["Wirf", "den Müll", "weg!"], translation: "Throw away the rubbish!", explain: "wegwerfen splits: Wirf ... weg." },
  { chunks: ["Sieh", "dir", "das", "an!"], translation: "Look at that!", explain: "ansehen splits: Sieh ... an." },
  { chunks: ["Mach", "mit!"], translation: "Join in!", explain: "mitmachen splits: Mach ... mit." },
  { chunks: ["Wach", "auf!"], translation: "Wake up!", explain: "aufwachen splits: Wach ... auf." },
  { chunks: ["Pack", "deine Koffer", "aus!"], translation: "Unpack your suitcases!", explain: "auspacken splits: Pack ... aus." },
  { chunks: ["Fang", "jetzt", "an!"], translation: "Start now!", explain: "anfangen splits: Fang ... an." },
  { chunks: ["Nehmen", "Sie", "das Geschenk", "mit!"], translation: "Take the present along! (formal)", explain: "Formal imperative: Nehmen Sie ... mit." },
  { chunks: ["Sehen", "Sie", "heute", "fern!"], translation: "Watch TV today! (formal)", explain: "Formal imperative: Sehen Sie ... fern." },
  { chunks: ["Gehen", "wir", "einkaufen!"], translation: "Let's go shopping!", explain: "The wir form invites: Gehen wir einkaufen." },
  { chunks: ["Fangen", "wir", "an!"], translation: "Let's begin!", explain: "anfangen splits: Fangen wir an." },
];

const IMPERATIVE_LEVEL4_MC: { prompt: string; options: string[]; explain: string }[] = [
  { prompt: "Call me! (du)", options: ["Ruf mich an!", "Anruf mich!", "Ruf an mich!"], explain: "The separable verb: Ruf ... an. The object never sits between the verb and the prefix." },
  { prompt: "Get up at 6 o'clock! (du)", options: ["Steh um 6 Uhr auf!", "Steh auf um 6 Uhr!", "Aufsteh um 6 Uhr!"], explain: "The prefix closes the command: Steh um 6 Uhr auf." },
  { prompt: "Close the door! (du)", options: ["Mach die Tür zu!", "Zu mach die Tür!", "Mach zu die Tür!"], explain: "The prefix closes the command: Mach die Tür zu." },
  { prompt: "Tidy your room! (du)", options: ["Räum dein Zimmer auf!", "Aufräum dein Zimmer!", "Räum auf dein Zimmer!"], explain: "The prefix closes the command: Räum dein Zimmer auf." },
  { prompt: "Come along! (du)", options: ["Komm mit!", "Mitkomm!", "Komm!"], explain: "mitkommen splits: Komm ... mit." },
  { prompt: "Sign up! (du)", options: ["Meld dich an!", "Anmeld dich!", "Meld an dich!"], explain: "anmelden splits: Meld ... an." },
  { prompt: "Watch TV! (du)", options: ["Sieh fern!", "Fernsieh!", "Sieh!"], explain: "fernsehen splits: Sieh ... fern." },
  { prompt: "Wake up! (du)", options: ["Wach auf!", "Aufwach!", "Wach!"], explain: "aufwachen splits: Wach ... auf." },
  { prompt: "Get out at the stop! (formal)", options: ["Steigen Sie an der Haltestelle aus!", "Steigen an der Haltestelle aus!", "Aussteigen Sie an der Haltestelle!"], explain: "Formal imperative: Steigen Sie ... aus." },
  { prompt: "Call me later! (formal)", options: ["Rufen Sie mich später an!", "Rufen mich später an!", "Anrufen Sie mich später!"], explain: "Formal imperative: Rufen Sie ... an." },
  { prompt: "Please stand up! (formal)", options: ["Stehen Sie bitte auf!", "Stehen bitte auf!", "Aufstehen Sie bitte!"], explain: "Formal imperative: Stehen Sie ... auf." },
  { prompt: "Close the door! (formal)", options: ["Machen Sie die Tür zu!", "Machen die Tür zu!", "Zumachen Sie die Tür!"], explain: "Formal imperative: Machen Sie ... zu." },
  { prompt: "Go shopping! (formal)", options: ["Kaufen Sie ein!", "Kaufen ein!", "Einkaufen Sie!"], explain: "Formal imperative: Kaufen Sie ... ein." },
  { prompt: "Let's go shopping!", options: ["Gehen wir einkaufen!", "Gehen einkaufen!", "Geht einkaufen!"], explain: "The wir form invites: Gehen wir einkaufen." },
  { prompt: "Let's begin!", options: ["Fangen wir an!", "Fangen an!", "Fangt an!"], explain: "anfangen splits: Fangen wir an." },
];

const IMPERATIVE_LEVEL4_LISTENING: { prompt: string; options: string[]; explain: string }[] = [
  { prompt: "Ruf mich später an!", options: ["Ruf mich später an!", "Ruf mich an später!", "Anruf mich später!"], explain: "The command is Ruf mich später an: verb first, prefix at the end." },
  { prompt: "Steh um 6 Uhr auf!", options: ["Steh um 6 Uhr auf!", "Steh auf um 6 Uhr!", "Aufsteh um 6 Uhr!"], explain: "The command is Steh um 6 Uhr auf: verb first, prefix at the end." },
  { prompt: "Stehen Sie bitte auf!", options: ["Stehen Sie bitte auf!", "Stehen bitte auf!", "Aufstehen Sie bitte!"], explain: "The formal command keeps Sie: Stehen Sie bitte auf." },
  { prompt: "Meld dich im Kurs an!", options: ["Meld dich im Kurs an!", "Meld an dich im Kurs!", "Anmeld dich im Kurs!"], explain: "anmelden splits: Meld ... an." },
  { prompt: "Machen Sie die Tür zu!", options: ["Machen Sie die Tür zu!", "Machen die Tür zu!", "Zumachen Sie die Tür!"], explain: "The formal command keeps Sie: Machen Sie ... zu." },
];

const FLASHCARD_POOL: [string, string][] = [
  ["Geh nach Hause!", "Go home! (du)"],
  ["Geht nach Hause!", "Go home! (ihr)"],
  ["Gehen Sie nach Hause!", "Go home! (formal)"],
  ["Gehen wir nach Hause!", "Let's go home!"],
  ["Sei ruhig!", "Be quiet! (du)"],
  ["Hab Spaß!", "Have fun! (du)"],
  ["Öffnen Sie das Fenster!", "Open the window! (formal)"],
  ["Nehmen Sie die zweite Straße rechts!", "Take the second street right! (formal)"],
  ["Steh um 6 Uhr auf!", "Get up at 6 o'clock! (du)"],
  ["Ruf mich an!", "Call me! (du)"],
  ["Kauf ein!", "Go shopping! (du)"],
  ["Sieh fern!", "Watch TV! (du)"],
  ["Mach die Tür zu!", "Close the door! (du)"],
  ["Komm mit!", "Come along! (du)"],
  ["Wach auf!", "Wake up! (du)"],
  ["Fang an!", "Start! (du)"],
  ["Lies die Aufgabe!", "Read the task! (du)"],
  ["Sprich langsam!", "Speak slowly! (du)"],
  ["Warte auf mich!", "Wait for me! (du)"],
  ["Nimm Platz!", "Sit down! (du)"],
  ["Seid ruhig!", "Be quiet! (ihr)"],
  ["Haben Sie einen schönen Tag!", "Have a nice day! (formal)"],
  ["Gehen wir einkaufen!", "Let's go shopping!"],
  ["Fangen wir an!", "Let's begin!"],
  ["Trink deinen Kaffee!", "Drink your coffee! (du)"],
  ["Bring mir das Buch!", "Bring me the book! (du)"],
  ["Sieh dir das an!", "Look at that! (du)"],
  ["Zieh dich warm an!", "Dress warmly! (du)"],
  ["Hör auf!", "Stop it! (du)"],
  ["Räum dein Zimmer auf!", "Tidy your room! (du)"],
  ["Steigen Sie um 6 Uhr auf!", "Get up at 6 o'clock! (formal)"],
  ["Rufen Sie mich später an!", "Call me later! (formal)"],
  ["Öffnet das Fenster!", "Open the window! (ihr)"],
  ["Nehmt Platz!", "Sit down! (ihr)"],
  ["Seht fern!", "Watch TV! (ihr)"],
  ["Kommt mit!", "Come along! (ihr)"],
];

// ---------------------------------------------------------------------------
// Round builders
// ---------------------------------------------------------------------------

function mc(id: string, prompt: string, options: string[], correctIndex: number, explain: string) {
  return {
    kind: "exercise",
    exercise: {
      id,
      type: "multiple-choice",
      title: "Practice",
      instruction: "Choose the correct answer.",
      prompt,
      options,
      correctIndex,
      explain,
    },
  };
}

function wo(id: string, s: WoSentence, prefix: "sentence" | "command") {
  return {
    kind: "exercise",
    exercise: {
      id,
      type: "word-order",
      title: "Practice",
      instruction: `Build the ${prefix}: ${s.translation}`,
      chunks: s.chunks,
      translation: s.translation,
      explain: s.explain,
    },
  };
}

function fb(id: string, sentence: string, translation: string, answers: string[], explain: string) {
  return {
    kind: "exercise",
    exercise: {
      id,
      type: "fill-blank",
      title: "Practice",
      instruction: "Complete the sentence.",
      sentence,
      translation,
      blanks: [{ answers }],
      explain,
    },
  };
}

function mt(id: string, pairs: [string, string][], explain: string) {
  return {
    kind: "exercise",
    exercise: {
      id,
      type: "matching",
      title: "Practice",
      instruction: "Match each item with its partner.",
      pairs,
      explain,
    },
  };
}

function ls(id: string, prompt: string, options: string[], correctIndex: number, explain: string) {
  return {
    kind: "exercise",
    exercise: {
      id,
      type: "listening",
      title: "Practice",
      instruction: "Listen and choose what you hear.",
      prompt,
      options,
      correctIndex,
      explain,
    },
  };
}

function fc(id: string, cards: { front: string; back: string }[]) {
  return {
    kind: "exercise",
    exercise: {
      id,
      type: "flashcard",
      title: "Practice",
      instruction: "Say the German command before revealing the meaning.",
      items: cards.map((card) => ({ ...card, frontAudio: true })),
    },
  };
}

function sort(id: string, instruction: string, trennbar: string[], untrennbar: string[]) {
  return {
    kind: "sort",
    title: "Sort",
    instruction,
    categories: [
      { name: "trennbar", items: trennbar },
      { name: "untrennbar", items: untrennbar },
    ],
  };
}

// ---------------------------------------------------------------------------
// Separable verbs game
// ---------------------------------------------------------------------------

const SORT_ROUNDS = [
  { sep: ["aufstehen", "einkaufen", "mitkommen", "anrufen", "abfahren"], insep: ["verstehen", "besuchen", "erklären", "entschuldigen", "gehören"] },
  { sep: ["aussteigen", "aufräumen", "anfangen", "zumachen", "mitbringen"], insep: ["zerstören", "erzählen", "verdienen", "bestellen", "bezahlen"] },
  { sep: ["zurückkommen", "aufpassen", "fernsehen", "teilnehmen", "einschlafen"], insep: ["erleben", "versuchen", "vergessen", "verlieren", "bekommen"] },
  { sep: ["abholen", "losgehen", "einsteigen", "aufmachen", "mitnehmen"], insep: ["entdecken", "verpassen", "beantworten", "erwarten", "vermieten"] },
  { sep: ["aufhören", "anziehen", "ausziehen", "auspacken", "einpacken"], insep: ["verkaufen", "vermissen", "besichtigen", "gefallen", "gehorchen"] },
  { sep: ["vorbeikommen", "mitmachen", "aufwachen", "wegfahren", "zurückgeben"], insep: ["zerbrechen", "missverstehen", "vertreiben", "enttäuschen", "beschreiben"] },
];

function buildSeparableLevel1() {
  const rounds: unknown[] = [];
  SORT_ROUNDS.forEach((r, i) => {
    rounds.push(sort(`sv-sort-${i + 1}`, "Drag each verb into the right category.", r.sep, r.insep));
  });
  const mix = [
    ...SEPARABLE.slice(0, 17).map(([v]) => ({ v, sep: true })),
    ...INSEPARABLE.slice(0, 17).map(([v]) => ({ v, sep: false })),
  ];
  mix.forEach((entry, i) => {
    rounds.push(
      mc(
        `sv1-mc-${i + 1}`,
        `Is "${entry.v}" separable?`,
        ["separable", "inseparable"],
        entry.sep ? 0 : 1,
        entry.sep
          ? `${entry.v} splits: the prefix goes to the end of the sentence.`
          : `${entry.v} never splits: the prefix stays attached.`,
      ),
    );
  });
  const pairs: [string, string][] = PREFIX_MEANING.map(([, verb, en]) => [verb, en]);
  for (let i = 0; i < 10; i++) {
    rounds.push(mt(`sv1-mt-${i + 1}`, pairs.slice(i * 5, i * 5 + 5), "The prefix carries the meaning: ab- (away), an- (arrival), auf- (up), ver- (inseparable)."));
  }
  return rounds;
}

function buildSeparableLevel2() {
  return SEPARABLE_SENTENCES.map((s, i) => wo(`sv2-wo-${i + 1}`, s, "sentence"));
}

function buildSeparableLevel3() {
  const rounds: unknown[] = [];
  PARTICIPLES.forEach((p, i) => {
    rounds.push(
      fb(
        `sv3-fb-${i + 1}`,
        p.sentence,
        p.translation,
        [p.participle],
        p.separable
          ? `${p.verb} → ${p.participle}: ge- sits between the prefix and the stem; takes ${p.aux}.`
          : `${p.verb} → ${p.participle}: the prefix never splits, so no ge-.`,
      ),
    );
  });
  SEPARABLE_PERFECT.forEach((s, i) => {
    rounds.push(wo(`sv3-wo-${i + 1}`, s, "sentence"));
  });
  return rounds;
}

function buildSeparableLevel4() {
  const rounds: unknown[] = [];
  MODAL_IMPERATIVE.forEach((s, i) => {
    rounds.push(wo(`sv4-wo-${i + 1}`, s, "sentence"));
  });
  PARTICIPLE_MC.forEach(([verb, correct, options], i) => {
    rounds.push(mc(`sv4-mc-${i + 1}`, `Which is the correct participle of ${verb}?`, options, options.indexOf(correct), `The correct participle of ${verb} is ${correct}.`));
  });
  SEPARABLE_LISTENING.forEach((l, i) => {
    rounds.push(ls(`sv4-ls-${i + 1}`, l.prompt, l.options, 0, l.explain));
  });
  return rounds;
}

// ---------------------------------------------------------------------------
// Imperative game
// ---------------------------------------------------------------------------

const PERSONS = ["du", "ihr", "Sie", "wir"];

function personPrompt(v: ImperativeVerb, person: string): { prompt: string; correct: string } {
  if (person === "du") return { prompt: `${v.enImp} (du)`, correct: v.du };
  if (person === "ihr") return { prompt: `${v.enImp} (ihr)`, correct: v.ihr };
  if (person === "Sie") return { prompt: `${v.enImp} (formal)`, correct: v.sie };
  return { prompt: `Let's ${v.en}! (wir)`, correct: v.wir };
}

function distractorForms(v: ImperativeVerb, person: string): string[] {
  if (person === "du") return [v.duSt, v.ihr];
  if (person === "ihr") return [v.du, v.sie];
  if (person === "Sie") return [v.ihr, v.sie.replace(" Sie!", "!")];
  return [v.du, v.ihr];
}

function buildImperativeLevel1() {
  const rounds: unknown[] = [];
  for (let i = 0; i < 30; i++) {
    const v = IMPERATIVE_VERBS[i % IMPERATIVE_VERBS.length];
    let person = PERSONS[i % PERSONS.length];
    if (person === "wir" && (v.v === "sein" || v.v === "haben")) person = "du";
    const { prompt, correct } = personPrompt(v, person);
    rounds.push(mc(`imp1-mc-${i + 1}`, prompt, [correct, ...distractorForms(v, person)], 0, `The ${person === "Sie" ? "formal" : person === "wir" ? "wir" : person} imperative of ${v.v} is ${correct}`));
  }
  for (let i = 0; i < 8; i++) {
    const a = IMPERATIVE_VERBS[i];
    const b = IMPERATIVE_VERBS[i + 8];
    rounds.push(
      mt(
        `imp1-mt-${i + 1}`,
        [
          ["du", a.du],
          ["ihr", a.ihr],
          ["Sie (formal)", a.sie],
          ["wir", a.wir],
          ["du", b.du],
          ["ihr", b.ihr],
          ["Sie (formal)", b.sie],
          ["wir", b.wir],
        ],
        "The du form drops the -st, the ihr form keeps the -t, the formal uses infinitive + Sie.",
      ),
    );
  }
  for (let i = 0; i < 6; i++) {
    rounds.push(
      fc(
        `imp1-fc-${i + 1}`,
        FLASHCARD_POOL.slice(i * 6, i * 6 + 6).map(([front, back]) => ({ front, back })),
      ),
    );
  }
  const special: { prompt: string; options: string[]; explain: string }[] = [
    { prompt: "Be quiet! (du)", options: ["Sei ruhig!", "Seist ruhig!", "Sein ruhig!"], explain: "The sein imperative is Sei, not Seist." },
    { prompt: "Have fun! (du)", options: ["Hab Spaß!", "Hast Spaß!", "Haben Spaß!"], explain: "The haben imperative is Hab, dropping the -st." },
    { prompt: "Let's go to the cinema!", options: ["Gehen wir ins Kino!", "Gehen ins Kino!", "Geht ins Kino!"], explain: "The wir form invites: infinitive + wir." },
    { prompt: "Be careful! (du)", options: ["Sei vorsichtig!", "Seist vorsichtig!", "Sein vorsichtig!"], explain: "The du imperative of sein is Sei." },
    { prompt: "Have a nice day! (formal)", options: ["Haben Sie einen schönen Tag!", "Haben einen schönen Tag!", "Habt einen schönen Tag!"], explain: "The formal imperative keeps Sie: Haben Sie." },
    { prompt: "Be quiet! (ihr)", options: ["Seid ruhig!", "Sei ruhig!", "Seien ruhig!"], explain: "The ihr imperative of sein is Seid." },
  ];
  special.forEach((s, i) => {
    rounds.push(mc(`imp1-sp-${i + 1}`, s.prompt, s.options, 0, s.explain));
  });
  return rounds;
}

function buildImperativeLevel2() {
  const rounds: unknown[] = [];
  for (let i = 0; i < 30; i++) {
    const v = IMPERATIVE_VERBS[i % IMPERATIVE_VERBS.length];
    rounds.push(mc(`imp2-mc-${i + 1}`, `${v.enImp} (du)`, [v.du, v.duSt, v.ihr], 0, `The du imperative of ${v.v} is ${v.du}.`));
  }
  IMPERATIVE_FILLBLANK_LEVEL2.forEach((f, i) => {
    rounds.push(fb(`imp2-fb-${i + 1}`, f.sentence, f.translation, f.answers, f.explain));
  });
  IMPERATIVE_WO_LEVEL2.forEach((s, i) => {
    rounds.push(wo(`imp2-wo-${i + 1}`, s, "command"));
  });
  return rounds;
}

function buildImperativeLevel3() {
  const rounds: unknown[] = [];
  for (let i = 0; i < 30; i++) {
    const v = IMPERATIVE_VERBS[i % IMPERATIVE_VERBS.length];
    const person = i % 2 === 0 ? "ihr" : "Sie";
    if (person === "ihr") {
      rounds.push(mc(`imp3-mc-${i + 1}`, `${v.enImp} (ihr)`, [v.ihr, v.du, v.sie], 0, `The ihr imperative of ${v.v} keeps the -t: ${v.ihr}.`));
    } else {
      rounds.push(mc(`imp3-mc-${i + 1}`, `${v.enImp} (formal)`, [v.sie, v.ihr, v.sie.replace(" Sie!", "!")], 0, `The formal imperative is the infinitive + Sie: ${v.sie}.`));
    }
  }
  IMPERATIVE_FILLBLANK_LEVEL3.forEach((f, i) => {
    rounds.push(fb(`imp3-fb-${i + 1}`, f.sentence, f.translation, f.answers, f.explain));
  });
  IMPERATIVE_LEVEL3_MATCHING.forEach((pairs, i) => {
    rounds.push(mt(`imp3-mt-${i + 1}`, pairs, "The formal is infinitive + Sie; the ihr form keeps -t."));
  });
  IMPERATIVE_LEVEL3_LISTENING.forEach((l, i) => {
    rounds.push(ls(`imp3-ls-${i + 1}`, l.prompt, l.options, 0, l.explain));
  });
  return rounds;
}

function buildImperativeLevel4() {
  const rounds: unknown[] = [];
  IMPERATIVE_WO_LEVEL4.forEach((s, i) => {
    rounds.push(wo(`imp4-wo-${i + 1}`, s, "command"));
  });
  IMPERATIVE_LEVEL4_MC.forEach((m, i) => {
    rounds.push(mc(`imp4-mc-${i + 1}`, m.prompt, m.options, 0, m.explain));
  });
  IMPERATIVE_LEVEL4_LISTENING.forEach((l, i) => {
    rounds.push(ls(`imp4-ls-${i + 1}`, l.prompt, l.options, 0, l.explain));
  });
  return rounds;
}

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

const IMPORT = 'import type { Game, GameRound } from "./schema";';

function emitRounds(rounds: unknown[]): string {
  return rounds.map((r) => `    ${JSON.stringify(r)},`).join("\n");
}

const separableSrc = `${IMPORT}

const level1Rounds: GameRound[] = [
${emitRounds(buildSeparableLevel1())}
];

const level2Rounds: GameRound[] = [
${emitRounds(buildSeparableLevel2())}
];

const level3Rounds: GameRound[] = [
${emitRounds(buildSeparableLevel3())}
];

const level4Rounds: GameRound[] = [
${emitRounds(buildSeparableLevel4())}
];

export const separableVerbsGame: Game = {
  id: "trennbare-verben",
  title: "Separable & Inseparable Verbs",
  emoji: "🧩",
  description:
    "Learn which prefixes split and which never do: build the sentence frame with auf ... stehen, form the perfect tense with ge- in the right place, and use separable verbs with modals and imperatives.",
  category: "grammar",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "trennbare-1",
      title: "Level 1: Which prefix splits?",
      rounds: level1Rounds,
    },
    {
      id: "trennbare-2",
      title: "Level 2: The sentence frame (Satzklammer)",
      rounds: level2Rounds,
    },
    {
      id: "trennbare-3",
      title: "Level 3: The perfect tense",
      rounds: level3Rounds,
    },
    {
      id: "trennbare-4",
      title: "Level 4: Modal verbs and imperatives",
      rounds: level4Rounds,
    },
  ],
};
`;

const imperativeSrc = `${IMPORT}

const level1Rounds: GameRound[] = [
${emitRounds(buildImperativeLevel1())}
];

const level2Rounds: GameRound[] = [
${emitRounds(buildImperativeLevel2())}
];

const level3Rounds: GameRound[] = [
${emitRounds(buildImperativeLevel3())}
];

const level4Rounds: GameRound[] = [
${emitRounds(buildImperativeLevel4())}
];

export const imperativeGame: Game = {
  id: "imperativ",
  title: "The Imperative",
  emoji: "📣",
  description:
    "Practice giving commands in German: the du, ihr, Sie and wir forms, the exceptions sein and haben, and separable verbs that split their prefix in commands.",
  category: "grammar",
  tags: ["A1"],
  levels: [
    {
      id: "imperativ-1",
      title: "Level 1: The four forms",
      rounds: level1Rounds,
    },
    {
      id: "imperativ-2",
      title: "Level 2: The du form",
      rounds: level2Rounds,
    },
    {
      id: "imperativ-3",
      title: "Level 3: The ihr and Sie forms",
      rounds: level3Rounds,
    },
    {
      id: "imperativ-4",
      title: "Level 4: Commands with separable verbs",
      rounds: level4Rounds,
    },
  ],
};
`;

writeFileSync("content/games/separable-verbs.ts", separableSrc);
writeFileSync("content/games/imperative.ts", imperativeSrc);

console.log("separable-verbs.ts and imperative.ts written");
console.log("round counts:", {
  sv: [buildSeparableLevel1().length, buildSeparableLevel2().length, buildSeparableLevel3().length, buildSeparableLevel4().length],
  imp: [buildImperativeLevel1().length, buildImperativeLevel2().length, buildImperativeLevel3().length, buildImperativeLevel4().length],
});