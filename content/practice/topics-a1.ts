import type { SpeakingTopic } from "./schema";

/**
 * A1 speaking topics. Everyday survival German: introductions, shopping,
 * food, family, daily routine, directions, health, and small talk.
 */

export const a1Topics: SpeakingTopic[] = [
  {
    id: "sich-vorstellen",
    title: "Sich vorstellen",
    prompt: "Erzählen Sie über sich selbst: Name, Herkunft, Wohnort, Beruf, Hobbys.",
    example: "Mein Name ist Anna Weber. Ich komme aus Polen und wohne in Berlin.",
    exampleEn: "My name is Anna Weber. I come from Poland and live in Berlin.",
    cheat: {
      words: ["der Name", "die Herkunft", "der Wohnort", "der Beruf", "das Hobby"],
      sentenceStarters: ["Mein Name ist …", "Ich komme aus …", "Ich wohne in …", "Ich arbeite als …"],
      connectors: ["und", "auch", "aber"],
    },
  },
  {
    id: "einkaufen",
    title: "Einkaufen",
    prompt: "Sie sind im Supermarkt. Fragen Sie nach einem Produkt, dem Preis und dem Weg.",
    example: "Entschuldigung, was kostet das Kilo Äpfel? Wo finde ich die Milch?",
    exampleEn: "Excuse me, what does a kilo of apples cost? Where do I find the milk?",
    cheat: {
      words: ["der Preis", "das Kilo", "das Angebot", "die Kasse", "das Brot"],
      sentenceStarters: ["Was kostet …?", "Wo finde ich …?", "Ich hätte gern …", "Haben Sie …?"],
      connectors: ["und", "bitte", "dann"],
    },
  },
  {
    id: "im-restaurant",
    title: "Im Restaurant",
    prompt: "Sie sind im Restaurant. Bestellen Sie etwas und fragen Sie nach der Rechnung.",
    example: "Ich hätte gern die Salatplatte und ein Wasser, bitte. Kann ich zahlen?",
    exampleEn: "I would like the salad plate and a water, please. Can I pay?",
    cheat: {
      words: ["die Speisekarte", "die Salatplatte", "das Wasser", "die Rechnung", "das Trinkgeld"],
      sentenceStarters: ["Ich hätte gern …", "Ich nehme …", "Kann ich bitte …?", "Zahlen, bitte."],
      connectors: ["und", "oder", "bitte"],
    },
  },
  {
    id: "meine-familie",
    title: "Meine Familie",
    prompt: "Erzählen Sie von Ihrer Familie: Wer gehört dazu? Was machen die Personen?",
    example: "Ich habe einen Bruder und eine Schwester. Meine Eltern leben in Polen.",
    exampleEn: "I have a brother and a sister. My parents live in Poland.",
    cheat: {
      words: ["die Familie", "der Bruder", "die Schwester", "die Eltern", "das Kind"],
      sentenceStarters: ["Ich habe …", "Meine Eltern …", "Mein Bruder ist …", "Wir besuchen …"],
      connectors: ["und", "auch", "manchmal"],
    },
  },
  {
    id: "mein-tagesablauf",
    title: "Mein Tagesablauf",
    prompt: "Erzählen Sie, wie ein normaler Tag bei Ihnen aussieht.",
    example: "Ich stehe um sechs Uhr auf. Am Vormittag arbeite ich, am Abend koche ich.",
    exampleEn: "I get up at six. In the morning I work, in the evening I cook.",
    cheat: {
      words: ["aufstehen", "das Frühstück", "die Arbeit", "der Abend", "schlafen"],
      sentenceStarters: ["Ich stehe um … auf.", "Am Morgen …", "Dann …", "Am Abend …"],
      connectors: ["dann", "danach", "um"],
    },
  },
  {
    id: "nach-dem-weg-fragen",
    title: "Nach dem Weg fragen",
    prompt: "Sie sind fremd in der Stadt. Fragen Sie nach dem Weg zum Bahnhof und zum Museum.",
    example: "Entschuldigung, wie komme ich zum Bahnhof? Ist es weit von hier?",
    exampleEn: "Excuse me, how do I get to the station? Is it far from here?",
    cheat: {
      words: ["geradeaus", "links", "rechts", "die Ampel", "der Bahnhof"],
      sentenceStarters: ["Wie komme ich zu …?", "Wo ist …?", "Ist es weit bis …?", "Gehen Sie …"],
      connectors: ["dann", "und", "bis"],
    },
  },
  {
    id: "beim-arzt",
    title: "Beim Arzt",
    prompt: "Sie sind beim Arzt. Beschreiben Sie Ihre Beschwerden und fragen Sie nach dem Termin.",
    example: "Guten Tag, ich habe Kopfschmerzen und Fieber. Wann kann ich einen Termin bekommen?",
    exampleEn: "Hello, I have a headache and a fever. When can I get an appointment?",
    cheat: {
      words: ["der Kopf", "das Fieber", "die Schmerzen", "der Termin", "das Medikament"],
      sentenceStarters: ["Ich habe …", "Mir tut … weh.", "Ich brauche einen Termin.", "Was muss ich tun?"],
      connectors: ["und", "seit", "auch"],
    },
  },
  {
    id: "die-wohnung",
    title: "Die Wohnung",
    prompt: "Beschreiben Sie Ihre Wohnung oder Ihr Haus: Zimmer, Lage, was Ihnen gefällt.",
    example: "Meine Wohnung hat zwei Zimmer und einen Balkon. Sie liegt im dritten Stock.",
    exampleEn: "My apartment has two rooms and a balcony. It is on the third floor.",
    cheat: {
      words: ["die Wohnung", "das Zimmer", "die Küche", "der Balkon", "die Miete"],
      sentenceStarters: ["Meine Wohnung hat …", "Sie liegt …", "Ich mag …", "Das Beste ist …"],
      connectors: ["und", "aber", "auch"],
    },
  },
  {
    id: "wetter-und-jahreszeiten",
    title: "Das Wetter",
    prompt: "Erzählen Sie vom Wetter heute und von Ihrer Lieblingsjahreszeit.",
    example: "Heute regnet es, aber am Wochenende scheint die Sonne. Ich mag den Sommer.",
    exampleEn: "Today it is raining, but the sun shines on the weekend. I like the summer.",
    cheat: {
      words: ["die Sonne", "der Regen", "der Schnee", "der Sommer", "der Winter"],
      sentenceStarters: ["Heute …", "Am Wochenende …", "Ich mag …", "Im Sommer …"],
      connectors: ["aber", "und", "wenn"],
    },
  },
  {
    id: "freizeit-und-hobbys",
    title: "Freizeit und Hobbys",
    prompt: "Erzählen Sie, was Sie in Ihrer Freizeit machen und was Ihnen Spaß macht.",
    example: "In meiner Freizeit schwimme ich gern. Am Wochenende treffe ich Freunde.",
    exampleEn: "In my free time I like swimming. On weekends I meet friends.",
    cheat: {
      words: ["die Freizeit", "das Hobby", "schwimmen", "lesen", "die Freunde"],
      sentenceStarters: ["In meiner Freizeit …", "Ich … gern.", "Am Wochenende …", "Mein Hobby ist …"],
      connectors: ["gern", "auch", "manchmal"],
    },
  },
  {
    id: "zahlen-und-preise",
    title: "Zahlen und Preise",
    prompt: "Erzählen Sie von Preisen in Deutschland und fragen Sie, wie viel etwas kostet.",
    example: "Ein Brot kostet zwei Euro achtzig. Ein Kaffee kostet drei Euro fünfzig.",
    exampleEn: "A loaf of bread costs two euros eighty. A coffee costs three fifty.",
    cheat: {
      words: ["der Euro", "der Cent", "kosten", "der Preis", "günstig"],
      sentenceStarters: ["Das kostet …", "Wie viel kostet …?", "Das ist teuer/günstig.", "Ich zahle …"],
      connectors: ["und", "aber", "zusammen"],
    },
  },
  {
    id: "mein-beruf",
    title: "Mein Beruf",
    prompt: "Erzählen Sie von Ihrem Beruf oder Ihrer Arbeit: Was machen Sie, wo und wann?",
    example: "Ich arbeite als Kellnerin in einem Café. Ich beginne um neun Uhr.",
    exampleEn: "I work as a waitress in a café. I start at nine o'clock.",
    cheat: {
      words: ["der Beruf", "arbeiten", "die Arbeit", "der Kollege", "die Uhrzeit"],
      sentenceStarters: ["Ich arbeite als …", "Ich beginne um …", "Meine Arbeit ist …", "Ich mag …"],
      connectors: ["und", "von … bis", "auch"],
    },
  },
  {
    id: "urlaub-und-reisen",
    title: "Urlaub und Reisen",
    prompt: "Erzählen Sie von Ihrem letzten oder nächsten Urlaub: wohin, womit, mit wem?",
    example: "Ich fahre im August nach Italien. Ich reise mit dem Zug und mit Freunden.",
    exampleEn: "I am going to Italy in August. I travel by train and with friends.",
    cheat: {
      words: ["der Urlaub", "die Reise", "der Zug", "das Hotel", "der Strand"],
      sentenceStarters: ["Ich fahre nach …", "Ich reise mit …", "Im Urlaub …", "Das Hotel ist …"],
      connectors: ["und", "dann", "auch"],
    },
  },
  {
    id: "sich-verabreden",
    title: "Sich verabreden",
    prompt: "Verabreden Sie sich mit einem Freund: Wann, wo und was machen Sie zusammen?",
    example: "Hallo, hast du am Samstag Zeit? Wir können um 15 Uhr ins Kino gehen.",
    exampleEn: "Hi, do you have time on Saturday? We can go to the cinema at 3 pm.",
    cheat: {
      words: ["die Zeit", "das Kino", "treffen", "der Termin", "das Café"],
      sentenceStarters: ["Hast du … Zeit?", "Wir können …", "Treffen wir uns …?", "Ich bin um … da."],
      connectors: ["und", "um", "dann"],
    },
  },
];