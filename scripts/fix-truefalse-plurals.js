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
  // match E("singular", "meaning", "type", "plural") or E("singular", "meaning", "type.", "plural")
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

if (!fs.existsSync(gamesFile)) {
  console.error('games file not found:', gamesFile);
  process.exit(1);
}

let gamesText = fs.readFileSync(gamesFile, 'utf8');
let changes = 0;

// Regex to find exercise blocks with prompt, options, correctIndex
const blockRe = /exercise: \{([\s\S]*?)\n\s*\},/g;
let out = gamesText;
let m;
while ((m = blockRe.exec(gamesText))) {
  const block = m[1];
  if (block.includes('prompt:') && block.includes('options:') && block.includes('correctIndex:')) {
    const promptMatch = /prompt:\s*"([^"]+)"/.exec(block);
    const optionsMatch = /options:\s*\[([^\]]+)\]/.exec(block);
    const correctIndexMatch = /correctIndex:\s*(\d+)/.exec(block);
    if (!promptMatch || !optionsMatch || !correctIndexMatch) continue;
    const prompt = promptMatch[1];
    const optionsRaw = optionsMatch[1];
    const correctIndex = parseInt(correctIndexMatch[1], 10);
    // Only interested in Richtig/Falsch items
    if (!/Richtig|Falsch/.test(optionsRaw)) continue;
    // If prompt contains ' — ' treat as singular → displayedPlural
    if (!prompt.includes(' — ')) continue;
    const parts = prompt.split(' — ');
    if (parts.length < 2) continue;
    const singular = parts[0].trim();
    const displayedPlural = parts.slice(1).join(' — ').trim();

    // Determine canonical plural from map if available, otherwise try to parse explanation
    let canonical = map.get(singular);
    if (!canonical) {
      // try to find explainCorrect nearby in block
      const explMatch = /explainCorrect:\s*"([^"]+)"/.exec(block);
      if (explMatch) {
        const expl = explMatch[1];
        const m2 = /The plural of [^ ]+ is ([^,\.]+),?/.exec(expl);
        if (m2) canonical = m2[1].trim();
      }
    }

    // If still no canonical, skip
    if (!canonical) continue;

    const expectCorrect = normalize(displayedPlural) === normalize(canonical) ? 'Richtig' : 'Falsch';

    // parse options into array
    const opts = optionsRaw.split(',').map(s => s.replace(/"/g, '').trim());
    const expectedIndex = opts.indexOf(expectCorrect);
    if (expectedIndex === -1) continue; // unexpected
    if (expectedIndex !== correctIndex) {
      // Build new block by replacing correctIndex: <old> with correctIndex: <expectedIndex>
      const oldSnippet = `correctIndex: ${correctIndex}`;
      const newSnippet = `correctIndex: ${expectedIndex}`;
      out = out.replace(oldSnippet, newSnippet);
      changes += 1;
    }
  }
}

if (changes > 0) {
  fs.writeFileSync(gamesFile, out, 'utf8');
  console.log(`Updated ${changes} correctIndex entries in ${gamesFile}`);
} else {
  console.log('No changes needed');
}
