# Stina – Schulhund-Lernwelt

Interaktive Lernwebsite zur Prüfungsvorbereitung rund um das Thema Schulhund:
Lernmodule, Quizfragen, Karteikarten und Grafiken.

## Live

Die Seite läuft über GitHub Pages:
**https://danizahnweh-oss.github.io/Stina_Schulhund/**

## Lokal öffnen

Einfach `index.html` im Browser öffnen. Es wird kein Build-Schritt benötigt –
reines HTML, CSS und JavaScript.

## Aufbau

- `index.html` – Einstieg, enthält Layout und das gesamte CSS
- `js/` – Inhalte, Quiz, Karteikarten und Grafik-Logik
  - `inhalte-a.js … inhalte-e.js` – Lernmodul-Inhalte
  - `quizfragen.js`, `karteikarten.js` – Übungsformate
  - `grafiken.js`, `image-slot.js` – Diagramme und Bildbausteine
  - `app.js` – Navigation, Fortschritt, Zusammenbau der Seite
- `assets/fotos/` – Fotos für die Module
- `pages/`, `uploads/` – Bild- und PDF-Material
- `quellen/` – aus PDFs extrahierte Textnotizen (Recherchematerial)
