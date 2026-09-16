# Design Document: Before He Was Fred
## From Tehran to Times Square: The 1939–1940 Journey of Fritz Riesenfeld

**Project Goal:** An editorial documentary web experience hosted on GitHub Pages that allows family members to experience an overland journey from Tehran to New York City in 1939–1940.

**Design Philosophy:** Desktop-first editorial documentary. Paginated chapter-by-chapter progression, clean typography, dynamic vector map navigation, and curated archival media.

---

## Technical Stack & Architecture

* **Target Device:** Desktop-only display. (Designed specifically for widescreen layouts to support side-by-side editorial text and rich archival media widgets).


* **Hosting:** Static HTML/CSS/JS hosted on GitHub Pages (zero backend dependencies).


* **Styling & Layout:** Tailwind CSS for responsive split-screen grid layouts. Custom CSS variables for warm parchment editorial styling.


* **Mapping Engine:** D3.js with TopoJSON (Orthographic globe projection).


* **State Management:** URL hash-based routing (`/#chapter-1`, `/#chapter-2`, etc.) to support bookmarking, direct links, and browser back/forward navigation.



---

## Global UX & Site Framework

### 1. Header & Dynamic Globe Progress Bar

* **Top Bar Layout:** A fixed header bar containing the site title, a zoomed-in vector globe/map slice, and chapter navigation controls.


* **Discrete Navigation:** The map does **not** drive the scrolling; instead, advancing to a new chapter pans the globe to the active coordinates and draws the red dashed route line incrementally from the previous location to the current destination.


* **Header Controls:** Includes a discreet "Chapter Index" dropdown, along with "Previous" and "Next" arrow buttons to jump across sections.



### 2. Editorial Page Structure

* **Page Layout:** Side-by-side desktop split layout.


* **Left Column (Primary Story):** Clear, legible serif typography presenting the translated letter excerpt, contextual historical annotations, and inline blockquotes.


* **Right Column (Archival & Media Panel):** High-resolution historic photos, map overlays, cultural context cards, and interactive widgets tied specifically to that chapter's location.


* **Footer Controls:** Every chapter ends with a prominent, styled call-to-action button: **"Continue Journey to [Next Location] $\rightarrow$"**.



---

## Detailed Section Specifications

### Chapter 1: Departure from Tehran

* **Coordinates & Route:** Tehran $\rightarrow$ Qazvin $\rightarrow$ Zanjan $\rightarrow$ Taserkand $\rightarrow$ Mianeh $\rightarrow$ Tabriz (Dec 23–24, 1939)


* **Left Column (Narrative):**
* Late-night departure in a hired car with travel companions and heavy luggage.


* Snowfall beginning near Qazvin; short rest at the Grand Hotel.


* Eating *Sangak* flatbread wrapped around cheese (*"hand-towels"*); spotting the luggage bus stalled 100 km before Tabriz.




* **Right Column (Media & Features):**
* **Cultural Feature Card:** *Sangak & Lavash Flatbread ("Hand-Towels")* — Explanation of traditional Iranian stone-baked flatbreads wrapped in cloth (*sofreh*) to preserve freshness, and rolling *Luqmeh* (bites of cheese and fat) on long road journeys.


* **Archival Photography:** 1930s photographs of Tabriz streetscapes and the Grand Hotel.





---

### Chapter 2: The Anatolian Frontier

* **Coordinates & Route:** Tabriz $\rightarrow$ Khoy $\rightarrow$ Maku $\rightarrow$ Bazargan $\rightarrow$ Gürbulak (Dec 25–27, 1939)


* **Left Column (Narrative):**
* Purchasing heavy handmade mountain wool socks in the Khoy bazaar.


* Riding an overburdened bus that requires boiling water refilled every 2 km.


* Resting in a roadside opium den; clearing customs with the toothless border director via photo albums and dental advice.




* **Right Column (Media & Features):**
* **Artifact Feature:** *Mountain Village Socks (Jorab)* — Detail card highlighting the thick, hand-knitted raw wool socks bought for 3 Toman to survive high-altitude winter travel.


* **Archival Map Overlay:** Historical 1930s map scan showing the Mount Ararat / Bazargan border pass.





---

### Chapter 3: The Tahir Pass Blizzard

* **Coordinates & Route:** Doğubayazıt $\rightarrow$ Kızıldizce $\rightarrow$ Taşlıçay $\rightarrow$ Ağrı $\rightarrow$ Eleşkirt $\rightarrow$ Tahir Pass (Türkali) (Dec 27, 1939 – Jan 6, 1940)


* **Left Column (Narrative):**
* Broken Ford truck axle; switching to horse-drawn sleds in $-35^\circ\text{C}$ cold.


* Stranded in a fierce blizzard atop Tahir Pass; horses slipping down ravines; gunshots fired into the storm for help.


* Sheltering in a mud-brick gendarmerie hut in Türkali; drinking melted snow; playing "66" for days.




* **Right Column (Media & Features):**
* **Atmospheric Canvas Shader:** Subtle frost/snow canvas edge shader around the right panel during this high-altitude winter chapter.


* **Embedded Card Game (66 / Sechsundsechzig):** Playable 2-player/AI mini-game using a 24-card deck, matching the Central European trick-and-draw game played by the travelers while stranded.





---

### Chapter 4: Through Earthquake Ruins

* **Coordinates & Route:** Delal $\rightarrow$ Erzurum $\rightarrow$ Erzincan $\rightarrow$ Sivas $\rightarrow$ Ankara $\rightarrow$ Istanbul (Jan 6–16, 1940)


* **Left Column (Narrative):**
* Arrival in Erzurum via sled; selling dental impression trays (*Abdrucklöffel*) to locals for 4.50 Lira to buy food.


* Passing through Erzincan weeks after the catastrophic Dec 1939 earthquake ($13,000+$ dead).


* Train journey across Anatolia with waypoint markers for Çetinkaya and Sivas; emergency foot abscess surgery in an Istanbul university clinic.




* **Right Column (Media & Features):**
* **Historical Context Card:** *The 13th Erzincan Earthquake* — Historical briefing on the magnitude 7.8 disaster paired with archival photographs of tent field hospitals in $-28^\circ\text{C}$ weather.


* **Translation Callout:** Clarification note on *Abdrucklöffel* (nickel-plated impression trays) cheekily sold to locals as cookie molds.





---

### Chapter 5: Crossing the Balkans

* **Coordinates & Route:** Istanbul $\rightarrow$ Pythion $\rightarrow$ Thessaloniki $\rightarrow$ Athens/Piraeus $\rightarrow$ Corinth Canal $\rightarrow$ Brindisi $\rightarrow$ Naples (Jan 17–24, 1940)


* **Left Column (Narrative):**
* Police harassment and deportation order in Istanbul; boarding the Orient Express.


* Delays across Greece; missing connecting ships; frantic sprint onto the steamer *SS Egitto* in Piraeus.


* Towed through the narrow Corinth Canal; missed train in Brindisi leading to an overnight bus through Foggia to Naples.




* **Right Column (Media & Features):**
* **Corinth Canal Feature:** Wide-angle vintage photograph viewer depicting the 3 km narrow passage.


* **Route Timetable:** Minimalist visual schedule tracking planned vs. actual transport connections across Greece and Italy.





---

### Chapter 6: The Atlantic Crossing & NYC Arrival

* **Coordinates & Route:** Naples $\rightarrow$ Gibraltar $\rightarrow$ Atlantic Ocean $\rightarrow$ New York City (Jan 24 – Feb 21, 1940)


* **Left Column (Narrative):**
* Boarding the ocean liner *SS Conte di Savoia*; playing Skat with Hungarian passengers.


* 6-hour British contraband inspection off Gibraltar; severe Atlantic seasickness.


* Arrival in NYC in late February 1940; observing the Manhattan skyline rising out of the ocean haze.




* **Right Column (Media & Features):**
* **Archival Maritime Gallery:** Photographs of the 48,000-ton *SS Conte di Savoia* and passenger deck life.


* **Interactive Visual Effect:** Subtle CSS fade-in revealing the historic 1940 Manhattan skyline silhouette as the user finishes the narrative.