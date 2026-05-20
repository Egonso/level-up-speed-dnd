import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dataPath = path.join(root, "data", "maps.json");
const printDir = path.join(root, "print");
const qaDir = path.join(root, "qa");

fs.mkdirSync(printDir, { recursive: true });
fs.mkdirSync(qaDir, { recursive: true });

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const printLogo = "../assets/print/dragon-dynamics-logo-print.png";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const slug = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const flowPositions = [
  [255, 90],
  [255, 230],
  [255, 370],
  [485, 90],
  [485, 230],
  [485, 370],
  [710, 150],
  [710, 310]
];

const flowEdges = [
  "M 130 260 L 315 120 L 545 120 L 770 180 L 900 260",
  "M 130 260 L 315 260 L 545 260 L 900 260",
  "M 130 260 L 315 400 L 545 400 L 770 340 L 900 260",
  "M 315 120 L 545 260",
  "M 315 260 L 545 120",
  "M 315 260 L 545 400",
  "M 545 120 L 900 260",
  "M 545 400 L 900 260"
];

const terrainClass = {
  "#": "wall",
  ".": "floor",
  "S": "start",
  "B": "boss",
  "A": "objective",
  "C": "cover",
  "H": "hazard",
  "T": "trap",
  "E": "exit",
  "D": "door",
  "R": "rune",
  "L": "loot",
  "G": "monster"
};

function renderFlowMap(map) {
  const flowBoard = map.printFlowArt || map.flowArt
    ? renderFlowImageBoard(map)
    : renderFlowSvg(map);

  return `
    <section class="page flow-page" id="${escapeHtml(map.id)}">
      <header class="page-header">
        <img class="logo" src="${printLogo}" alt="" />
        <div>
          <p class="eyebrow">Szenario-Flow</p>
          <h1>${escapeHtml(map.title)}</h1>
          <p>${escapeHtml(map.subtitle)}</p>
        </div>
        <img class="scenario-thumb" src="${escapeHtml(map.printArt ?? map.art)}" alt="" />
      </header>
      ${flowBoard}
      <section class="rule-strip">
        <strong>Szenarioregel:</strong> ${escapeHtml(map.scenarioRule)}
      </section>
      <section class="flow-use-strip">
        <div><strong>1</strong><span>Raumkarten verdeckt auf die Slots legen.</span></div>
        <div><strong>2</strong><span>Spieler wählen den nächsten verbundenen Raum.</span></div>
        <div><strong>3</strong><span>Aufdecken, Szene erzählen, Mechanik spielen.</span></div>
      </section>
    </section>
  `;
}

function renderFlowImageBoard(map) {
  const art = map.printFlowArt ?? map.flowArt;
  const slots = [
    { label: map.start, cls: "start", x: 9, y: 50 },
    ...map.rooms.slice(0, 4).map((room, index) => ({ label: room, cls: "room", x: 27 + index * 14.4, y: 28 })),
    ...map.rooms.slice(4, 8).map((room, index) => ({ label: room, cls: "room", x: 27 + index * 14.4, y: 62 })),
    { label: map.boss, cls: "boss", x: 91, y: 50 }
  ];

  return `
    <section class="flow-image-board">
      <img src="${escapeHtml(art)}" alt="" />
      <div class="flow-label-layer" aria-hidden="true">
        ${slots.map((slot) => `
          <span class="flow-label flow-label-${slot.cls}" style="left:${slot.x}%;top:${slot.y}%">${escapeHtml(slot.label)}</span>
        `).join("")}
      </div>
    </section>
  `;
}

function renderFlowSvg(map) {
  const rooms = map.rooms.map((room, index) => {
    const [x, y] = flowPositions[index];
    const cls = index >= 6 ? "map-node optional-node" : "map-node";
    return `
      <g class="${cls}" transform="translate(${x} ${y})">
        <rect width="150" height="60" />
        <text x="75" y="31">${escapeHtml(room)}</text>
      </g>
    `;
  });

  return `
    <svg viewBox="0 0 1000 520" role="img" aria-label="${escapeHtml(map.title)}">
      <g class="paths">
        ${flowEdges.map((edge) => `<path d="${edge}" />`).join("")}
      </g>
      <g class="map-node start-node" transform="translate(55 230)">
        <rect width="150" height="60" />
        <text x="75" y="38">${escapeHtml(map.start)}</text>
      </g>
      ${rooms.join("")}
      <g class="map-node boss-node" transform="translate(850 230)">
        <rect width="150" height="60" />
        <text x="75" y="38">${escapeHtml(map.boss)}</text>
      </g>
    </svg>
  `;
}

function renderTacticalMap(map) {
  const mapBody = map.printArt
    ? `<section class="battlemap-art"><img src="${escapeHtml(map.printArt)}" alt="" /></section>`
    : renderGrid(map);

  return `
    <section class="page tactical-page" id="${escapeHtml(map.id)}">
      <header class="page-header compact">
        <img class="logo" src="${printLogo}" alt="" />
        <div>
          <p class="eyebrow">Taktische Map</p>
          <h1>${escapeHtml(map.title)}</h1>
          <p>${escapeHtml(map.subtitle)}</p>
        </div>
      </header>
      ${mapBody}
      <section class="legend">
        ${map.legend.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
      </section>
    </section>
  `;
}

function renderGrid(map) {
  const rows = map.grid.map((row) => {
    const cells = [...row]
      .map((code) => `<span class="cell ${terrainClass[code] ?? "floor"}">${labelForCell(code)}</span>`)
      .join("");
    return `<div class="grid-row">${cells}</div>`;
  });

  return `
    <section class="battle-grid" aria-label="${escapeHtml(map.title)}">
      ${rows.join("")}
    </section>
  `;
}

function labelForCell(code) {
  if ([".", "#"].includes(code)) return "";
  return escapeHtml(code);
}

function renderBlankGrid(blank) {
  const rows = Array.from({ length: blank.size }, () => {
    const cells = Array.from({ length: blank.size }, () => `<span class="cell floor"></span>`).join("");
    return `<div class="grid-row">${cells}</div>`;
  });
  const notes = blank.notes
    ? `<section class="blank-notes"><h2>Notizen</h2><div></div><div></div><div></div><div></div></section>`
    : "";

  return `
    <section class="page tactical-page blank-page" id="${escapeHtml(blank.id)}">
      <header class="page-header compact">
        <img class="logo" src="${printLogo}" alt="" />
        <div>
          <p class="eyebrow">Blanko-Map</p>
          <h1>${escapeHtml(blank.title)}</h1>
          <p>Für spontane Räume, improvisierte Bossräume oder Testläufe.</p>
        </div>
      </header>
      <section class="battle-grid blank-grid size-${blank.size}">
        ${rows.join("")}
      </section>
      ${notes}
    </section>
  `;
}

function renderMarkers() {
  const expanded = data.markers.flatMap((marker) =>
    Array.from({ length: marker.count }, (_, index) => ({ ...marker, index: index + 1 }))
  );

  return `
    <section class="page marker-page">
      <header class="page-header compact">
        <img class="logo" src="${printLogo}" alt="" />
        <div>
          <p class="eyebrow">Marker</p>
          <h1>AP, Zustände, Ressourcen, Gegner</h1>
          <p>Ausschneiden, laminieren oder als kleine Tischmarker nutzen.</p>
        </div>
      </header>
      <section class="markers">
        ${expanded.map((marker) => `<span class="marker marker-${slug(marker.kind)}">${escapeHtml(marker.label)}</span>`).join("")}
      </section>
    </section>
  `;
}

function renderSetupSheet() {
  const rows = [
    ["1 Szenariokarte", "Mission erklären, Sonderregel nennen."],
    ["6 Heldenkarten", "Spieler wählen, Klassenkarten dazu legen."],
    ["8 Raumkarten", "Spieler verteilen verdeckt auf Flow-Map."],
    ["Chaosdeck", "Neben die Map, erst bei Trigger ziehen."],
    ["Lootdeck", "Neben DM, nur bei Raum/Loot/Chaos."],
    ["Marker", "AP, Druck, Instabilität, Glocke, Zustände."],
    ["Bosskarte", "Verdeckt beim Bossraum, erst bei Eintritt zeigen."],
    ["Blanko-Map", "Für Improvisation oder finale Kampfszene."],
    ["Timer", "Bei Promo: 30 bis 45 Minuten hart halten."]
  ];

  return `
    <section class="page setup-page">
      <header class="page-header">
        <img class="logo" src="${printLogo}" alt="" />
        <div>
          <p class="eyebrow">Tisch-Setup</p>
          <h1>Was pro Tisch bereitliegen muss</h1>
          <p>Für Schulen, Elternvereine, Promotion und interne DM-Einschulung.</p>
        </div>
      </header>
      <table class="setup-table">
        <thead><tr><th>Material</th><th>Verwendung</th></tr></thead>
        <tbody>
          ${rows.map(([material, use]) => `<tr><td>${escapeHtml(material)}</td><td>${escapeHtml(use)}</td></tr>`).join("")}
        </tbody>
      </table>
      <section class="ap-reference">
        <div><strong>6 AP pro Zug</strong><span>Aktion 2 · Bonus 1 · 3 Felder 1</span></div>
        <div><strong>Nur 1 Bonus Action</strong><span>auch wenn genug AP übrig sind</span></div>
        <div><strong>Raum aufdecken</strong><span>Storysatz, Mechanik, Entscheidung</span></div>
      </section>
    </section>
  `;
}

const html = `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(data.project)} - Maps und Marker</title>
  <link rel="stylesheet" href="./map-styles.css" />
</head>
<body>
  <main>
    <section class="page cover-page">
      <img class="cover-logo" src="${printLogo}" alt="" />
      <h1>Maps & Tischmaterial</h1>
      <p>${escapeHtml(data.project)} · ${escapeHtml(data.version)}</p>
    </section>
    ${data.baseFlowMap ? renderFlowMap(data.baseFlowMap) : ""}
    ${data.flowMaps.map(renderFlowMap).join("")}
    ${data.tacticalMaps.map(renderTacticalMap).join("")}
    ${data.blankGrids.map(renderBlankGrid).join("")}
    ${renderMarkers()}
    ${renderSetupSheet()}
  </main>
</body>
</html>`;

fs.writeFileSync(path.join(printDir, "maps-and-components.html"), html);

const qa = [
  `Project: ${data.project}`,
  `Version: ${data.version}`,
  `Scenario flow maps: ${data.flowMaps.length}`,
  `Base flow maps: ${data.baseFlowMap ? 1 : 0}`,
  `Tactical maps: ${data.tacticalMaps.length}`,
  `Blank grids: ${data.blankGrids.length}`,
  `Marker types: ${data.markers.length}`,
  `Marker count: ${data.markers.reduce((sum, marker) => sum + marker.count, 0)}`
].join("\n");

fs.writeFileSync(path.join(qaDir, "map-counts.txt"), `${qa}\n`);
console.log(qa);
