import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const printDir = path.join(root, "print");
const qaDir = path.join(root, "qa");

fs.mkdirSync(printDir, { recursive: true });
fs.mkdirSync(qaDir, { recursive: true });

const guidePages = [
  {
    title: "So spielt ihr",
    kind: "Spieler",
    image: "../assets/imagegen-guides/quickstart-so-spielst-du.png"
  },
  {
    title: "Dein Zug",
    kind: "Spieler",
    image: "../assets/imagegen-guides/turn-flow-dein-zug.png"
  },
  {
    title: "Würfelhilfe",
    kind: "Spieler",
    image: "../assets/imagegen-guides/dice-guide-wuerfelhilfe.png"
  },
  {
    title: "Was kann ich tun?",
    kind: "Spieler",
    image: "../assets/imagegen-guides/decision-helper-was-kann-ich-tun.png"
  },
  {
    title: "So nutzt ihr die Map",
    kind: "Spieler",
    image: "../assets/imagegen-conference/encounter-map-player-guide.png"
  },
  {
    title: "DM-Karte",
    kind: "DM",
    image: "../assets/imagegen-guides/dm-card-60-sekunden.png"
  },
  {
    title: "DM Map-Guide",
    kind: "DM",
    image: "../assets/imagegen-conference/encounter-map-dm-guide.png"
  },
  {
    title: "Tischaufbau",
    kind: "DM",
    image: "../assets/imagegen-guides/table-setup-tischaufbau.png"
  },
  {
    title: "Messe-Vorbereitung",
    kind: "Orga",
    image: "../assets/imagegen-conference/conference-prep-checklist.png"
  },
  {
    title: "30-Minuten Demo-Flow",
    kind: "Orga",
    image: "../assets/imagegen-conference/conference-demo-flow.png"
  },
  {
    title: "AP-Tracker",
    kind: "Tischmaterial",
    image: "../assets/imagegen-guides/ap-tracker-6-ap.png"
  },
  {
    title: "Token-Sheet",
    kind: "Tischmaterial",
    image: "../assets/imagegen-guides/token-sheet-status-resources.png"
  }
];

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const missing = guidePages
  .map((page) => path.join(printDir, page.image))
  .filter((file) => !fs.existsSync(file));

if (missing.length) {
  throw new Error(`Missing guide images:\n${missing.join("\n")}`);
}

const html = `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Level-Up Speed DND - Konferenz-Guides</title>
  <link rel="stylesheet" href="./conference-guides.css" />
</head>
<body>
  <main>
    <section class="cover page">
      <img class="logo" src="../assets/print/dragon-dynamics-logo-print.png" alt="" />
      <p class="eyebrow">Konferenzbetrieb</p>
      <h1>Level-Up Speed DND</h1>
      <p>Spieler-Guides, DM-Guides, Encounter-Map-Hilfen und Tischmaterial für 30-Minuten-Demos.</p>
    </section>
    ${guidePages.map(renderGuidePage).join("")}
  </main>
</body>
</html>`;

function renderGuidePage(page) {
  return `
    <section class="guide-page page">
      <header>
        <p>${escapeHtml(page.kind)}</p>
        <h2>${escapeHtml(page.title)}</h2>
      </header>
      <img src="${escapeHtml(page.image)}" alt="" />
    </section>
  `;
}

fs.writeFileSync(path.join(printDir, "conference-guides.html"), html);

const qa = [
  "Konferenz-Guides",
  `Total guide pages: ${guidePages.length}`,
  ...guidePages.map((page) => `${page.kind}: ${page.title} -> ${page.image}`)
].join("\n");

fs.writeFileSync(path.join(qaDir, "conference-guides-counts.txt"), `${qa}\n`);
console.log(qa);

