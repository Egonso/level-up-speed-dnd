import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dataPath = path.join(root, "data", "cards.json");
const printDir = path.join(root, "print");
const qaDir = path.join(root, "qa");

fs.mkdirSync(printDir, { recursive: true });
fs.mkdirSync(qaDir, { recursive: true });

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const imagegenCardsDir = path.join(root, "assets", "imagegen-cards");
const printCardsDir = path.join(root, "assets", "print", "cards");

const expanded = data.cards.flatMap((card) => {
  const count = card.count ?? 1;
  return Array.from({ length: count }, (_, index) => ({ ...card, copyIndex: index + 1 }));
});
const cardsPerSheet = 8;

const deckOrder = [
  "Helden",
  "Basisaktionen",
  "Klassenkarten",
  "Szenarien",
  "Ziele",
  "Boss",
  "Raumkarten",
  "Loot",
  "Chaos"
];

expanded.sort((a, b) => {
  const deckDiff = deckOrder.indexOf(a.deck) - deckOrder.indexOf(b.deck);
  if (deckDiff !== 0) return deckDiff;
  return a.id.localeCompare(b.id, "de");
});

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const stripTrailingWhitespace = (value) => value.replace(/[ \t]+$/gm, "");

const cardClass = (card) =>
  [
    "card",
    `deck-${slug(card.deck)}`,
    `type-${slug(card.type)}`,
    card.art ? "has-art" : "no-art"
  ].join(" ");

function slug(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function renderStats(card) {
  if (!card.stats?.length) return "";
  return `<div class="stats">${card.stats.map((stat) => `<span>${escapeHtml(stat)}</span>`).join("")}</div>`;
}

function renderRules(card) {
  return `<ul>${(card.rules ?? []).map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}</ul>`;
}

function renderCard(card) {
  const imagegenCard = path.join(imagegenCardsDir, `${card.id}.png`);
  if (fs.existsSync(imagegenCard)) {
    const printCard = path.join(printCardsDir, `${card.id}.jpg`);
    const src = fs.existsSync(printCard)
      ? `../assets/print/cards/${card.id}.jpg`
      : `../assets/imagegen-cards/${card.id}.png`;

    return `
      <article class="card imagegen-card">
        <img src="${escapeHtml(src)}" alt="${escapeHtml(card.title)}" />
      </article>
    `;
  }

  const art = card.art
    ? `<div class="art"><img src="${escapeHtml(card.art)}" alt="" /></div>`
    : "";
  const resource = card.resource ? `<p class="resource">${escapeHtml(card.resource)}</p>` : "";
  const tags = card.tags?.length
    ? `<div class="tags">${card.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>`
    : "";

  return `
    <article class="${cardClass(card)}">
      <div class="card-inner">
        <header>
          <p class="deck">${escapeHtml(card.deck)} · ${escapeHtml(card.type)}</p>
          <h2>${escapeHtml(card.title)}</h2>
          <p class="subtitle">${escapeHtml(card.subtitle ?? "")}</p>
        </header>
        ${art}
        ${renderStats(card)}
        <section class="rules">${renderRules(card)}</section>
        ${resource}
        ${tags}
      </div>
    </article>
  `;
}

function renderBack() {
  return `
    <article class="card card-back">
      <div class="back-art">
        <img src="../assets/generated/card-back.png" alt="" />
      </div>
    </article>
  `;
}

function renderSheets(items, renderItem, className = "") {
  const sheets = [];
  for (let index = 0; index < items.length; index += cardsPerSheet) {
    const sheetItems = items.slice(index, index + cardsPerSheet);
    sheets.push(`
    <section class="cards${className ? ` ${className}` : ""}">
      ${sheetItems.map(renderItem).join("")}
    </section>
    `);
  }
  return sheets.join("");
}

const cardBacks = Array.from({ length: expanded.length }, (_, index) => ({ id: `back-${index + 1}` }));

const html = `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(data.project)} - Karten</title>
  <link rel="stylesheet" href="./card-styles.css" />
</head>
<body>
  <main>
    <section class="sheet intro">
      <div>
        <img class="logo" src="../assets/brand/dragon-dynamics-logo-transparent.png" alt="" />
        <h1>${escapeHtml(data.project)}</h1>
        <p>Event-Prototyp · Level 4 · 6 AP pro Zug · Aktion 2 AP · Bonus Action 1 AP · 3 Felder Bewegung 1 AP.</p>
      </div>
    </section>
    ${renderSheets(expanded, renderCard)}
    ${renderSheets(cardBacks, renderBack, "backs")}
  </main>
</body>
</html>`;

const mapHtml = `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(data.project)} - Encounter Map</title>
  <link rel="stylesheet" href="./card-styles.css" />
</head>
<body class="map-page">
  <main class="map-sheet">
    <header class="map-header">
      <img class="logo" src="../assets/brand/dragon-dynamics-logo-transparent.png" alt="" />
      <div>
        <h1>Encounter Map</h1>
        <p>Start, verdeckte Räume, Bossraum. Spieler verteilen die Raumkarten vor Spielbeginn.</p>
      </div>
    </header>
    <section class="map-board">
      <svg viewBox="0 0 1000 520" role="img" aria-label="Encounter Map mit verbundenen Räumen">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        <g class="paths">
          <path d="M 130 260 L 315 120 L 545 120 L 770 180 L 900 260" />
          <path d="M 130 260 L 315 260 L 545 260 L 900 260" />
          <path d="M 130 260 L 315 400 L 545 400 L 770 340 L 900 260" />
          <path d="M 315 120 L 545 260" />
          <path d="M 315 260 L 545 120" />
          <path d="M 315 260 L 545 400" />
          <path d="M 545 120 L 900 260" />
          <path d="M 545 400 L 900 260" />
        </g>
        <g class="map-node start-node" transform="translate(55 230)">
          <rect width="150" height="60" />
          <text x="75" y="38">Start</text>
        </g>
        <g class="map-node" transform="translate(255 90)">
          <rect width="150" height="60" />
          <text x="75" y="38">Raum A</text>
        </g>
        <g class="map-node" transform="translate(255 230)">
          <rect width="150" height="60" />
          <text x="75" y="38">Raum B</text>
        </g>
        <g class="map-node" transform="translate(255 370)">
          <rect width="150" height="60" />
          <text x="75" y="38">Raum C</text>
        </g>
        <g class="map-node" transform="translate(485 90)">
          <rect width="150" height="60" />
          <text x="75" y="38">Raum D</text>
        </g>
        <g class="map-node" transform="translate(485 230)">
          <rect width="150" height="60" />
          <text x="75" y="38">Raum E</text>
        </g>
        <g class="map-node" transform="translate(485 370)">
          <rect width="150" height="60" />
          <text x="75" y="38">Raum F</text>
        </g>
        <g class="map-node optional-node" transform="translate(710 150)">
          <rect width="150" height="60" />
          <text x="75" y="38">Raum G</text>
        </g>
        <g class="map-node optional-node" transform="translate(710 310)">
          <rect width="150" height="60" />
          <text x="75" y="38">Raum H</text>
        </g>
        <g class="map-node boss-node" transform="translate(850 230)">
          <rect width="150" height="60" />
          <text x="75" y="38">Boss</text>
        </g>
      </svg>
    </section>
    <section class="map-notes">
      <div><strong>Raum betreten:</strong> Karte aufdecken, in Szenario übersetzen, Mechanik spielen.</div>
      <div><strong>Chaos:</strong> nach Szenarioregel, bei Zeitdruck oder bei natürlicher 1 ziehen.</div>
      <div><strong>Boss:</strong> Ziel des Szenarios entscheidet, ob Kampf, Skill-Challenge oder Flucht reicht.</div>
    </section>
  </main>
</body>
</html>`;

fs.writeFileSync(path.join(printDir, "speed-dnd-cards.html"), stripTrailingWhitespace(html));
fs.writeFileSync(path.join(printDir, "encounter-map.html"), stripTrailingWhitespace(mapHtml));

const counts = expanded.reduce((acc, card) => {
  acc[card.deck] = (acc[card.deck] ?? 0) + 1;
  return acc;
}, {});

const imagegenUnique = data.cards.filter((card) =>
  fs.existsSync(path.join(imagegenCardsDir, `${card.id}.png`))
).length;
const imagegenPrintedFaces = expanded.filter((card) =>
  fs.existsSync(path.join(imagegenCardsDir, `${card.id}.png`))
).length;
const imagegenMissing = data.cards
  .filter((card) => !fs.existsSync(path.join(imagegenCardsDir, `${card.id}.png`)))
  .map((card) => `${card.id}: ${card.title}`);

const qa = [
  `Project: ${data.project}`,
  `Version: ${data.version}`,
  `Total printed card faces: ${expanded.length}`,
  `Imagegen unique cards used: ${imagegenUnique}/${data.cards.length}`,
  `Imagegen printed faces used: ${imagegenPrintedFaces}/${expanded.length}`,
  `Text fallback unique cards: ${imagegenMissing.length}`,
  ...imagegenMissing.map((entry) => `Fallback: ${entry}`),
  ...Object.entries(counts).map(([deck, count]) => `${deck}: ${count}`)
].join("\n");

fs.writeFileSync(path.join(qaDir, "card-counts.txt"), `${qa}\n`);
console.log(qa);
