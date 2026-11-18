# בִּינָה · Binah

**Hebrew for real life.** A fast, independent learning app that starts with hello and your name, then helps you navigate real conversations.

## What works now

- 32 original, structured beginner lessons in 8 units; 128 phrase entries, including repeated phrases in new contexts.
- Context notes, phrase cards, meaning checks, word building, Hebrew typing with an on-screen keyboard, and real-life response choices.
- A separate alphabet tab: 22 letters, 5 final forms, names, sounds, vowel marks, exact font-outline tracing, precise checkpoints, animated demonstrations, live progress, undo, and shape feedback.
- Sequential lesson unlocks, a 70% completion threshold, XP, daily intentions, calendar-day streaks, and mistake-aware spaced review.
- Guest progress in localStorage, export/import backups, isolated account storage, and optional Google sign-in plus transactional Firestore sync.
- Pronunciation and niqqud toggles, masculine/feminine examples, right-to-left Hebrew, and 13 grammar/culture reference notes.
- Optional device Hebrew speech synthesis, an offline app shell, an installable web manifest, and a custom text-based Hebrew SVG icon.
- Compact phone learning paths, a tracing-first letter studio, tablet navigation rail, short-window layouts, and iOS Home Screen support with the favicon artwork as the app icon.
- Responsive layout, keyboard controls for lessons and letter quizzes, focus indicators, and reduced-motion support. No gradients, card borders, shadows, trackers, external fonts, or runtime framework dependencies.

This is a complete **beginner application**, not a finished equivalent of Duolingo's multi-year curriculum. Advanced course expansion, native recordings, and professional Hebrew editorial review remain on the [roadmap](docs/ROADMAP.md). Tracing uses exact Noto Sans Hebrew print outlines, not authoritative cursive ductus. Speech depends on a Hebrew voice installed on the device.

## Run it

Node 22 or newer. No package installation required.

```sh
npm run build
npm run dev
```

Open the address printed by the server (normally `http://localhost:5173`). Do not open `index.html` as a file; JavaScript modules need HTTP.

```sh
npm test
npm run check
npm run build
```

## Put it online, for free

Follow [the complete Cloudflare Pages + Firebase setup guide](docs/SETUP.md). Short version:

| Cloudflare setting | Value |
| --- | --- |
| Git repository | `begbie-builder/binah` |
| Production branch | `main` |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Leave empty (repository root) |
| Environment variable | `NODE_VERSION=22` |

Guest mode works immediately. The owner's Firebase web configuration for `binah-a5d15` is connected in `public/config.js`. For another deployment, create a Firebase Spark project, enable the Google provider, create a Firestore Standard database, publish **the provided rules**, authorize your exact site hostname, and put your **public web config** in `public/config.js`. No server key, paid server, Cloud Functions, or billing upgrade is required for this architecture within the relevant free quotas.

## Project guide

| File | Purpose |
| --- | --- |
| `src/curriculum.js` | Lessons, phrase variants, field notes, references |
| `src/alphabet.js` | Letter information, print guides, vowel marks |
| `src/engine.js` | Safe progress handling, merges, review intervals, sessions |
| `src/app.js` | Interface and interactions |
| `src/trace.js` | Exact-glyph pointer drawing, checkpoint scoring, and replay |
| `src/letter-geometry.js` | Generated vector outlines and centerline routes |
| `src/motion.js` | Lightweight view transitions, feedback, celebrations |
| `public/fonts/` | Self-hosted Noto Sans Hebrew subsets and SIL OFL license |
| `scripts/generate-letter-assets.py` | Reproducible, development-only font asset generator |
| `src/cloud.js` | Optional, dynamically loaded Firebase integration |
| `src/styles.css` | Flat, rounded visual system |
| `src/responsive.css` | Phone/tablet/desktop density, safe areas, and lesson viewports |
| `src/install.js` | Home Screen help, browser install prompt, visual viewport handling |
| `public/config.js` | Owner's public Firebase web configuration |
| `firestore.rules` | Private, per-user records and schema validation |
| `docs/HEBREW_RESEARCH.md` | Research basis, language map, editorial conventions |
| `docs/SETUP.md` | Deployment, Google sign-in, quotas, troubleshooting |
| `docs/VALIDATION.md` | Automated and manual verification, remaining limits |

## Data & privacy

Guests have no remote account and make no Firebase requests. Progress lives under `binah:guest`; signed-in users have separate local keys and a private `users/{uid}` Firestore record. A deliberate Google sign-in merges the active guest progress into the chosen account. Importing or syncing combines lesson completions and letter practice, keeps the most recently updated review card, and uses the larger daily XP total rather than adding totals. Simultaneous independent activity on two devices can therefore undercount XP; learning progress is preserved. Sync happens after changes, on reconnect, and with **Sync now**, not by a live subscription.

The reset control clears a progress record, not the Google identity itself. On shared devices, signing out returns to the existing local guest profile. The guest copy remains available after account migration. Use a separate browser profile if several learners share one computer.

All teaching content is original; linked sources are references, not copied curricula. The Binah name and icon have not had a trademark clearance search.

## Hebrew Writer

The letter studio now uses the real **Hanzi Writer 3.7.3** SVG/quiz engine, adapted under its MIT license. All 27 Hebrew print forms use local Hebrew-only stroke silhouettes, authored medians, and per-stroke instructions. Guided mode shows the next route and start marker; From memory hides the outline. Strokes check immediately on release, incorrect strokes fade, and accepted strokes resolve to the font silhouette. Watch and Hint never earn progress.

Engine provenance and modifications: [`src/vendor/hanzi-writer/README.md`](src/vendor/hanzi-writer/README.md). Original copyright and the complete MIT license are retained. Hebrew outlines derive from Noto Sans Hebrew (OFL), not Hanzi Writer's separately licensed Chinese character data.

To edit a Hebrew practice route, update `scripts/data/hebrew-print-strokes.json`, then run `python scripts/generate-hebrew-writer.py` (development only: fonttools and shapely >= 2.1). This partitions the detailed font contour by the nearest median and verifies that the stroke union reproduces the glyph. The generated `src/hebrew-writer-data.js` is committed; deployment needs only the usual static build.

These are consistent **print-letter** practice paths. Hebrew teachers and handwriting habits vary; the app does not claim a mandatory universal stroke order or teach everyday cursive in this mode.
