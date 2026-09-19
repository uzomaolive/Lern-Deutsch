const fs = require('fs');
const path = require('path');
const repoRoot = process.cwd();
const wordlistsDir = path.join(repoRoot, 'content', 'wordlists');
const gamesFile = path.join(repoRoot, 'content', 'games', 'noun-games.ts');

function normalize(s) {
  if (!s) return '';
  return s.toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Build canonical plural map from wordlists
const files = fs.readdirSync(wordlistsDir).filter(f => f.endsWith('.ts') || f.endsWith('.js'));
const map = new Map();
for (const f of files) {
  const content = fs.readFileSync(path.join(wordlistsDir, f), 'utf8');
  const re = /E\(\s*"([^"]+)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"(?:\s*,\s*"([^"]*)")?\s*\)/g;
  let m;
  while ((m = re.exec(content))) {
    const singular = m[1];
    const plural = m[4];
    if (plural && plural.trim()) {
      map.set(singular.trim(), plural.trim());
    }
  }
}

let lines = fs.readFileSync(gamesFile, 'utf8').split('\n');
let changed = 0;
for (let i = 0; i < lines.length; i++) {
  const promptMatch = lines[i].match(/prompt:\s*"([^"]+)"/);
  if (!promptMatch) continue;
  const prompt = promptMatch[1];
  if (!prompt.includes(' — ')) continue;
  // find options and correctIndex within next 12 lines
  let optLine = -1;
  let corrLine = -1;
  for (let j = i+1; j <= i+12 && j < lines.length; j++) {
    if (optLine === -1 && /options:\s*\[/.test(lines[j])) optLine = j;
    if (corrLine === -1 && /correctIndex:\s*\d+/.test(lines[j])) corrLine = j;
  }
  if (optLine === -1 || corrLine === -1) continue;
  const optionsRaw = lines[optLine].match(/options:\s*\[([^\]]+)\]/)[1];
  const opts = optionsRaw.split(',').map(s => s.replace(/"/g,'').trim());
  if (!opts.includes('Richtig') && !opts.includes('Falsch')) continue;

  const parts = prompt.split(' — ');
  const singular = parts[0].trim();
  const displayedPlural = parts.slice(1).join(' — ').trim();

  let canonical = map.get(singular);
  if (!canonical) {
    // try to find explainCorrect within next 12 lines
    for (let j = i+1; j <= i+12 && j < lines.length; j++) {
      const em = lines[j].match(/explainCorrect:\s*"([^"]+)"/);
      if (em) {
        const expl = em[1];
        const m2 = /The plural of [^ ]+ is ([^,\.]+),?/.exec(expl);
        if (m2) { canonical = m2[1].trim(); break; }
      }
    }
  }
  if (!canonical) continue;
  const expectCorrect = normalize(displayedPlural) === normalize(canonical) ? 'Richtig' : 'Falsch';
  const expectedIndex = opts.indexOf(expectCorrect);
  if (expectedIndex === -1) continue;
  const currentIndex = parseInt(lines[corrLine].match(/correctIndex:\s*(\d+)/)[1],10);
  if (currentIndex !== expectedIndex) {
    lines[corrLine] = lines[corrLine].replace(/correctIndex:\s*\d+/, `correctIndex: ${expectedIndex}`);
    changed++;
  }
}

if (changed > 0) {
  fs.writeFileSync(gamesFile, lines.join('\n'), 'utf8');
  console.log(`Updated ${changed} entries`);
} else console.log('No updates');
