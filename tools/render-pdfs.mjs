import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const chromeCandidates = [
  process.env.CHROME_BIN,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "google-chrome",
  "chromium"
].filter(Boolean);

const chrome = chromeCandidates.find((candidate) => {
  if (candidate.includes("/")) return fs.existsSync(candidate);
  try {
    execFileSync("which", [candidate], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
});

if (!chrome) {
  throw new Error("Chrome/Chromium nicht gefunden. Setze CHROME_BIN oder installiere Chrome.");
}

const jobs = [
  ["print/speed-dnd-cards.html", "print/speed-dnd-cards.pdf"],
  ["print/maps-and-components.html", "print/maps-and-components.pdf"],
  ["print/conference-guides.html", "print/conference-guides.pdf"]
];

for (const [html, pdf] of jobs) {
  const htmlPath = path.join(root, html);
  const pdfPath = path.join(root, pdf);
  execFileSync(chrome, [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`
  ], { stdio: "inherit" });
}

console.log("PDFs gerendert.");
