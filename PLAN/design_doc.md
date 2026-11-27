# Design Document: Before He Was Fred
## From Tehran to Times Square: The 1939–1940 Journey of Fritz Riesenfeld

**Project Goal:** An editorial documentary web experience on GitHub Pages that lets family members follow Fritz Riesenfeld's overland and sea journey from Tehran to New York City (Dec 19, 1939 – ~Jan 31, 1940), told through his own letter.

**Design Philosophy:** Desktop-first editorial documentary with a usable single-column layout on phones. Six chapters, each a scrolling sequence of **stops and the travel legs between them**, with clean typography, a vector globe that advances step by step, and curated free-to-use archival media.

---

## Content Model: Chapters → Steps (Stops & Legs)

The journey has six chapters. Each chapter is an ordered list of **steps**, and each step is either:

* **Stop**: a place where they stayed or paused (Tabriz, Türkali, Istanbul…).
* **Leg**: the travel between two stops (the bus that stopped every 2 km to refill the radiator, the night stuck in the snow, the Orient Express under police escort, the bus to Foggia…).

Legs are first-class content, not filler. Much of the letter's drama happens between towns, and legs get the same narrative + media treatment as stops. Every leg records the **mode of transport** (hired car, bus, Chevrolet/Ford truck, horse sled, on foot, train, ferry, steamer, liner), which drives a small transport icon on the route line.

| # | Chapter | Route | Dates | File |
|---|---------|-------|-------|------|
| 1 | Departure from Tehran | Tehran → Qazvin → Zanjan → Taserkand → Mianeh → Tabriz | Dec 19–20, 1939 | [`chapters/01-departure-from-tehran.md`](chapters/01-departure-from-tehran.md) |
| 2 | The Persian Frontier | Tabriz → Khoy → Maku → Bazargan → Gürbulak → Doğubayazıt → Kızıldize | Dec 21–23, 1939 | [`chapters/02-the-persian-frontier.md`](chapters/02-the-persian-frontier.md) |
| 3 | The Tahir Pass Blizzard | Kızıldize → Taşlıçay → Karaköse → Eleşkirt → Türkali → Tahir Pass → Delal | Dec 23, 1939 – Jan 6, 1940 | [`chapters/03-the-tahir-pass-blizzard.md`](chapters/03-the-tahir-pass-blizzard.md) |
| 4 | Through Earthquake Ruins | Delal → Hasankale → Erzurum → Erzincan → Çetinkaya → Sivas → Ankara → Istanbul | Jan 7–16, 1940 | [`chapters/04-through-earthquake-ruins.md`](chapters/04-through-earthquake-ruins.md) |
| 5 | Across the Aegean | Istanbul → Pythion → Salonika → Piraeus → Corinth Canal → Brindisi → Foggia → Naples | Jan 16–24, 1940 | [`chapters/05-across-the-aegean.md`](chapters/05-across-the-aegean.md) |
| 6 | The Atlantic Crossing | Naples → Gibraltar → Atlantic → New York City | Jan 24 – ~Jan 31, 1940 | [`chapters/06-the-atlantic-crossing.md`](chapters/06-the-atlantic-crossing.md) |

The chapter files hold the narrative, citations and feature ideas for every step. `route.md` holds the coordinates and timeline. `additional_info.md` holds background research. `media/chapter-NN.md` lists candidate free-to-use images per step.

---

## Technical Stack & Architecture

* **App:** React + TypeScript + Vite (already scaffolded), built to static files and deployed to GitHub Pages via a GitHub Actions workflow. `vite.config.ts` needs `base: '/before-he-was-fred/'`.
* **Styling:** Tailwind CSS v4 with the parchment theme tokens already defined (`parchment-base`, `ink-primary`, `route-red`, `source-highlight`, …).
* **Mapping:** D3 (`d3-geo`) + `topojson-client` + `world-atlas` (110m or 50m), orthographic projection. Route geometry comes from `route.md` coordinates (converted to `src/data/route.json`).
* **Routing:** Hash routing so deep links work on Pages without a 404 fallback: `#/chapter/3` and `#/chapter/3/turkali` (step-level deep links).
* **Layout:** Desktop split view (narrative left, media/source panel right). Below `md`, stack to a single column with the globe as a compact strip and the source viewer as a full-screen sheet.
* **Data (static, bundled at build time):**
  * `src/data/chapters.json`: chapters → steps (id, type `stop|leg`, title, coordinates or from/to, dates, transport mode, narrative blocks with citation IDs, media IDs).
  * `src/data/letter/page-NN.json`: generated from `PLAN/letter/pages/page-NN.json` (see below).
  * `src/data/media.json`: generated from `PLAN/media/*.md` (URL, source page, creator, date, license, caption, attribution string).
* **Scans:** `public/letter/page_N.jpeg` (copied from `PLAN/images/pages/`). If higher-resolution originals become available, swap them in and scale the highlight coordinates.

---

## Global UX & Site Framework

### 1. Header & Globe Progress
* A fixed header with the site title, a zoomed vector globe slice, a chapter index dropdown, and Previous/Next.
* **Step-driven map:** As the reader scrolls a chapter (IntersectionObserver), each step that enters view pans the globe. For a **leg**, the red dashed route line draws from the previous stop to the next, with the transport icon moving along it. Steps without precise coordinates (hamlets marked "approximate") get an "approximate location" note.
* Previous/Next move between chapters. The chapter index also lists steps for direct jumps.

### 2. Editorial Page Structure
* **Left column (story):** Serif narrative per step, with a small step header (place or "A → B", date, transport icon) and inline citation badges.
* **Right column (panel):** Two tabs, **[ Archival & Context ]** | **[ Original Letter ]**. The Archival tab shows the media and context cards for the step currently in view.
* **Footer:** Each chapter ends with **"Continue Journey to [Next Chapter] →"**.

### 3. Primary Source & Citation Viewer

**Citation badges.** Narrative text cites the letter at the sentence level. In the plan docs a citation is written `[Letter p. N — "anchor phrase"]`, where the anchor is a phrase from the English of that sentence. At build time each citation resolves to a sentence ID (`p08-s14`) in the letter data. On screen it renders as a small badge, `[p. 8]`.

**Clicking a badge** opens the **Original Letter** tab (or a sheet on mobile) and shows:
1. The **scan of the letter page**, zoomed and scrolled to the cited sentence, with the sentence's lines highlighted (`source-highlight` #fef3c7, multiply blend).
2. Beside it, the **German transcription** of that sentence and the **English translation**, both highlighted. Neighboring sentences are shown dimmed for context.
3. Prev/Next sentence controls and "View full page" (scan + full German + full English, with any sentence clickable to highlight it on the scan).

**Highlight geometry.** The letter is typewritten (monospaced), so each sentence is stored as a start/end position (line, column) in the page's transcribed lines. Highlight rectangles are computed per line from a per-page **calibration**: the text block's left/top margin, line pitch and character pitch, in image pixels. These are measured once per scan and stored in the page JSON. Where a typed line is skewed on the photo, an optional per-line `bbox` overrides the computed rectangle.

**Letter data schema** (`PLAN/letter/pages/page-NN.json`):
```json
{
  "page": 8,
  "image": "PLAN/images/pages/page_8.jpeg",
  "calibration": { "left": 62, "top": 71, "linePitch": 21.4, "charPitch": 9.1 },
  "lines": ["8) Inzwischen hatten wir unseren Chauffeur ...", "..."],
  "lineBoxes": { "12": [60, 327, 688, 346] },
  "sentences": [
    { "id": "p08-s01", "de": "…", "en": "…",
      "start": { "line": 0, "col": 3 }, "end": { "line": 2, "col": 41 },
      "continued_from_previous_page": false, "continues_on_next_page": false }
  ],
  "notes": ["Translation fix: …", "Uncertain reading: …"]
}
```
`PLAN/letter/de/page-NN.txt` holds the same German as plain text with the scan's line breaks, for reading and proofreading.

**Missing pages.** Letter pages 18–19 are lost. The reader shows a "pages 18–19 missing" placeholder between pages 17 and 20, and the narrative never cites them.

### 4. Media Credits
Every image shows a short credit line (creator, source, license) and links to its source page. The site footer has an "Image credits" page generated from `media.json`. Only public-domain or openly licensed (CC0, CC BY, CC BY-SA) media are used. CC BY-SA images keep their license and attribution.

---

## Scope

**v1**
* Six chapters with all steps, the globe with step-driven route drawing, citation viewer with scan highlights, full-letter reader, media credits, mobile single-column layout.
* Light CSS frost vignette for Chapter 3 and a CSS haze reveal for the Manhattan skyline.
* "66" (Sechsundsechzig) as a rules/explainer card.

**Deferred to v2**
* A playable 66 card game with an AI opponent.
* A WebGL frost shader.
* Optional ambient audio.
