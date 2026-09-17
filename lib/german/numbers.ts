/**
 * German number words for the number games. The algorithm is validated
 * against the A1 curriculum spellings (einhunderteins, vierunddreißig,
 * sechzehn, siebzig, fünfundvierzigtausend...).
 */

const UNITS = ["", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
const TEENS = ["zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"];
const TENS = ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];

export function under100(x: number): string {
  if (x < 10) return x === 1 ? "eins" : UNITS[x];
  if (x < 20) return TEENS[x - 10];
  const u = x % 10;
  const t = Math.floor(x / 10);
  if (u === 0) return TENS[t];
  return (u === 1 ? "ein" : UNITS[u]) + "und" + TENS[t];
}

export function under1000(x: number): string {
  const h = Math.floor(x / 100);
  const r = x % 100;
  const hw = h === 0 ? "" : h === 1 ? "einhundert" : UNITS[h] + "hundert";
  return hw + (r === 0 ? "" : under100(r));
}

/** German word for a number up to 999.999. */
export function germanNumberWord(n: number): string {
  const t = Math.floor(n / 1000);
  const r = n % 1000;
  const tw = t === 0 ? "" : t === 1 ? "eintausend" : under1000(t) + "tausend";
  return tw + (r === 0 ? "" : under1000(r));
}