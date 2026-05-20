import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const fail = [];

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const exists = (file) => fs.existsSync(path.join(root, file));

const cards = readJson("data/cards.json").cards;
const maps = readJson("data/maps.json");

const printedFaces = cards.reduce((sum, card) => sum + (card.count ?? 1), 0);
const imagegenCards = cards.filter((card) => exists(`assets/imagegen-cards/${card.id}.png`));
const fallbackCards = cards.filter((card) => !exists(`assets/imagegen-cards/${card.id}.png`));
const allowedFallbackDecks = new Set(["Ziele"]);

if (cards.length !== 103) fail.push(`Erwartet 103 eindeutige Karten, gefunden ${cards.length}.`);
if (printedFaces !== 158) fail.push(`Erwartet 158 gedruckte Kartenflächen, gefunden ${printedFaces}.`);
if (fallbackCards.some((card) => !allowedFallbackDecks.has(card.deck))) {
  fail.push("Nicht-Zielkarten ohne Imagegen-Kartenbild gefunden.");
}

for (const card of imagegenCards) {
  if (!exists(`assets/print/cards/${card.id}.jpg`)) {
    fail.push(`Optimiertes Print-Kartenbild fehlt: ${card.id}`);
  }
}

if (!maps.baseFlowMap?.printFlowArt) fail.push("Neutrale Imagegen-Grundmap fehlt.");
for (const map of maps.flowMaps) {
  if (!map.printFlowArt || !exists(map.printFlowArt.replace("../", ""))) {
    fail.push(`Imagegen-Flowmap fehlt: ${map.id}`);
  }
}
for (const map of maps.tacticalMaps) {
  if (!map.printArt || !exists(map.printArt.replace("../", ""))) {
    fail.push(`Taktische Print-Map fehlt: ${map.id}`);
  }
}

const pdfs = [
  "print/speed-dnd-cards.pdf",
  "print/maps-and-components.pdf",
  "print/conference-guides.pdf"
];
for (const pdf of pdfs) {
  const full = path.join(root, pdf);
  if (!fs.existsSync(full)) {
    fail.push(`PDF fehlt: ${pdf}`);
    continue;
  }
  const size = fs.statSync(full).size;
  if (size > 95_000_000) fail.push(`PDF zu groß für GitHub: ${pdf} (${size} bytes).`);
}

const requiredDocs = [
  "README.md",
  "BEDIENUNGSANLEITUNG.md",
  "docs/01-system.md",
  "docs/02-szenarien.md",
  "docs/03-dm-guide.md",
  "docs/07-konferenzbetrieb.md"
];
for (const doc of requiredDocs) {
  if (!exists(doc)) fail.push(`Dokument fehlt: ${doc}`);
}

const summary = {
  uniqueCards: cards.length,
  printedFaces,
  imagegenUniqueCards: imagegenCards.length,
  textFallbackCards: fallbackCards.length,
  flowMaps: maps.flowMaps.length,
  baseFlowMaps: maps.baseFlowMap ? 1 : 0,
  tacticalMaps: maps.tacticalMaps.length,
  blankGrids: maps.blankGrids.length,
  markerCount: maps.markers.reduce((sum, marker) => sum + marker.count, 0)
};

console.log(JSON.stringify(summary, null, 2));

if (fail.length) {
  console.error("\nAudit fehlgeschlagen:");
  for (const item of fail) console.error(`- ${item}`);
  process.exit(1);
}

console.log("\nAudit bestanden.");
