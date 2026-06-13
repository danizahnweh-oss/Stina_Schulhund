/*
 * Erzeugt Audiodateien (MP3) für jedes Lernmodul über die OpenAI-Sprachausgabe.
 *
 * Aufruf:
 *   OPENAI_API_KEY=sk-... node tools/generate-audio.js
 *
 * Erzeugt bereits vorhandene Dateien NICHT neu (spart Geld). Mit --force neu.
 * Ausgabe landet in assets/audio/<modul-id>.mp3
 */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'audio');
const TMP_DIR = path.join(OUT_DIR, '_teile');

const MODEL = 'gpt-4o-mini-tts';     // neueste, natürlichste OpenAI-Stimme
const VOICE = 'nova';                // warme, ruhige Stimme
const INSTRUCTIONS =
  'Sprich auf Deutsch, ruhig, deutlich und freundlich in einem angenehmen Lerntempo. ' +
  'Lies sachlich wie ein Lern-Hörbuch, mit natürlichen Pausen an Satzenden.';
const MAX_CHARS = 3500;              // Sicherheits-Limit pro Anfrage (OpenAI erlaubt ~4096)
const FORCE = process.argv.includes('--force');
// optional: nur ein bestimmtes Modul erzeugen, z.B.  node tools/generate-audio.js --nur grundlagen
const NUR_IDX = process.argv.indexOf('--nur');
const NUR = NUR_IDX !== -1 ? process.argv[NUR_IDX + 1] : null;

// ---------- Module laden (gleiche globale Variable wie im Browser) ----------
global.window = {};
window.LERN_MODULE = [];
for (const f of ['a', 'b', 'c', 'd', 'e']) {
  require(path.join(ROOT, 'js', 'inhalte-' + f + '.js'));
}
const MODULE = window.LERN_MODULE;

// ---------- HTML -> vorlesbarer Text ----------
const ENTITIES = { '&nbsp;': ' ', '&amp;': ' und ', '&shy;': '', '&ndash;': ' – ', '&mdash;': ' – ', '&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>' };

function htmlZuText(html) {
  if (!html) return '';
  let t = html;
  // Tabellenzellen / Listen / Absätze zu Satzpausen machen
  t = t.replace(/<\/(td|th)>/gi, ', ');
  t = t.replace(/<\/(tr|li|p|h[1-6]|div|figcaption)>/gi, '. ');
  t = t.replace(/<br\s*\/?>/gi, '. ');
  // restliche Tags entfernen
  t = t.replace(/<[^>]+>/g, ' ');
  // Entities ersetzen
  t = t.replace(/&[a-z#0-9]+;/gi, (m) => (ENTITIES[m] !== undefined ? ENTITIES[m] : ' '));
  // Pfeile / Aufzählungszeichen
  t = t.replace(/[→➜►]/g, ', ');
  t = t.replace(/[•·]/g, ' ');
  // Whitespace & doppelte Satzzeichen aufräumen
  t = t.replace(/\s+/g, ' ');
  t = t.replace(/\s*\.\s*(\.\s*)+/g, '. ');
  t = t.replace(/\s+([.,;:!?])/g, '$1');
  t = t.replace(/,\s*\./g, '.');
  return t.trim();
}

function modulText(m) {
  const teile = [];
  teile.push(m.titel + '.');
  if (m.tag) teile.push(m.tag + '.');
  teile.push('Das Wichtigste in Kürze.');
  teile.push(htmlZuText(m.zusammenfassung));
  if (m.details && m.details.length) {
    teile.push('Im Detail.');
    for (const d of m.details) {
      if (d.t) teile.push(d.t + '.');
      teile.push(htmlZuText(d.h));
    }
  }
  return teile.filter(Boolean).join(' ');
}

// Text an Satzgrenzen in Stücke <= MAX_CHARS schneiden
function inStuecke(text) {
  const saetze = text.match(/[^.!?]+[.!?]+|\S+$/g) || [text];
  const stuecke = [];
  let akt = '';
  for (const s of saetze) {
    if ((akt + s).length > MAX_CHARS && akt) { stuecke.push(akt.trim()); akt = ''; }
    akt += s + ' ';
  }
  if (akt.trim()) stuecke.push(akt.trim());
  return stuecke;
}

// ---------- OpenAI-Aufruf ----------
async function sprich(text, ziel) {
  const r = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL, voice: VOICE, input: text,
      instructions: INSTRUCTIONS, response_format: 'mp3',
    }),
  });
  if (!r.ok) {
    const txt = await r.text();
    throw new Error('OpenAI ' + r.status + ': ' + txt.slice(0, 300));
  }
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(ziel, buf);
  return buf.length;
}

async function mitWiederholung(fn, versuche = 3) {
  let letzter;
  for (let i = 0; i < versuche; i++) {
    try { return await fn(); }
    catch (e) {
      letzter = e;
      const warte = 2000 * (i + 1);
      console.log('   ⚠️  Fehler (' + (i + 1) + '/' + versuche + '), neuer Versuch in ' + warte / 1000 + 's …');
      await new Promise((res) => setTimeout(res, warte));
    }
  }
  throw letzter;
}

// ---------- Hauptlauf ----------
async function main() {
  // Key aus Umgebungsvariable ODER aus lokaler Datei openai-key.txt
  if (!process.env.OPENAI_API_KEY) {
    const keyDatei = path.join(ROOT, 'openai-key.txt');
    if (fs.existsSync(keyDatei)) {
      const zeilen = fs.readFileSync(keyDatei, 'utf8').split(/\r?\n/);
      const k = zeilen.map((z) => z.trim()).find((z) => z.startsWith('sk-'));
      if (k) process.env.OPENAI_API_KEY = k;
    }
  }
  if (!process.env.OPENAI_API_KEY) {
    console.error('Fehler: Kein OpenAI-Key gefunden.\nFüge ihn in die Datei openai-key.txt ein oder rufe auf mit:\n  OPENAI_API_KEY=sk-... node tools/generate-audio.js');
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });

  let zeichenGesamt = 0;
  let neuErzeugt = 0;

  for (const m of MODULE) {
    if (NUR && m.id !== NUR) continue;
    const ziel = path.join(OUT_DIR, m.id + '.mp3');
    if (fs.existsSync(ziel) && !FORCE) {
      console.log('⏭️  ' + m.id + '.mp3 existiert bereits – übersprungen.');
      continue;
    }
    const text = modulText(m);
    const stuecke = inStuecke(text);
    zeichenGesamt += text.length;
    console.log('🔊 ' + m.titel + '  (' + text.length + ' Zeichen, ' + stuecke.length + ' Teil(e)) …');

    const teilDateien = [];
    for (let i = 0; i < stuecke.length; i++) {
      const tdatei = path.join(TMP_DIR, m.id + '_' + String(i).padStart(2, '0') + '.mp3');
      await mitWiederholung(() => sprich(stuecke[i], tdatei));
      teilDateien.push(tdatei);
      console.log('   ✓ Teil ' + (i + 1) + '/' + stuecke.length);
    }

    // MP3-Teile aneinanderhängen (binär; Browser spielt das problemlos ab)
    const out = fs.createWriteStream(ziel);
    for (const td of teilDateien) { out.write(fs.readFileSync(td)); }
    await new Promise((res) => out.end(res));
    teilDateien.forEach((td) => fs.unlinkSync(td));
    neuErzeugt++;
    console.log('   💾 ' + path.relative(ROOT, ziel));
  }

  // grobe Kostenschätzung (gpt-4o-mini-tts ~ 0,015 $ / 1000 Zeichen)
  const kosten = (zeichenGesamt / 1000) * 0.015;
  console.log('\nFertig. ' + neuErzeugt + ' Datei(en) neu erzeugt, ' + zeichenGesamt + ' Zeichen gesprochen.');
  console.log('Geschätzte Kosten dieses Laufs: ca. ' + kosten.toFixed(2) + ' $');
  try { fs.rmdirSync(TMP_DIR); } catch (e) { /* nicht leer -> egal */ }
}

main().catch((e) => { console.error(e); process.exit(1); });
