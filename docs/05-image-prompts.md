# Image-2-Bildprompts

Alle sichtbaren Spielmotive wurden mit dem eingebauten Imagegen/Image-2-Pfad erzeugt und danach ins Projekt kopiert. Die finalen Karten liegen als komplette Imagegen-Karten unter `assets/imagegen-cards/`; die optimierten Druckvarianten liegen unter `assets/print/cards/`.

## Gemeinsamer Stil

- moderne Fantasy-Boardgame-Illustration
- vertikales 3:4-Kartenformat
- dunkle Charcoal-Basis
- metallische Goldakzente passend zum Dragon-Dynamics-Logo
- klare Silhouette, hoher Kontrast
- bei Vollkarten nur den vorgegebenen Kartentext verwenden, kein zusätzliches Füllmaterial und kein Wasserzeichen
- keine beige/cream Waschpalette

## Dateien

| Datei | Motiv |
| --- | --- |
| `assets/generated/card-back.png` | Premium-Kartenrückseite mit Drachenemblem-Stimmung |
| `assets/generated/hero-rogue.png` | Rogue-Portrait |
| `assets/generated/hero-bard.png` | Bard-Portrait |
| `assets/generated/hero-fighter.png` | Fighter-Portrait |
| `assets/generated/hero-wizard.png` | Wizard-Portrait |
| `assets/generated/hero-druid.png` | Druid-Portrait |
| `assets/generated/hero-barbarian.png` | Barbarian-Portrait |
| `assets/generated/scenario-midnight-bank.png` | magischer Banktresor mit Erdbeben und Artefakt |
| `assets/generated/scenario-dragon-egg.png` | Drachenei im Kristallhort |
| `assets/generated/scenario-clock-bell.png` | Uhrwerk-Glockenkammer unter einer Akademie |
| `assets/generated/scenario-shadow-pass.png` | Wagenzug im Schattenpass |

## Nachgenerieren

Für neue Vollkarten denselben Stilblock verwenden und die exakten Werte aus `data/cards.json` in den Prompt übernehmen. Danach das finale PNG nach `assets/imagegen-cards/` kopieren und eine optimierte JPG-Version nach `assets/print/cards/` erzeugen.
