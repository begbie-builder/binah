# Validation

## Automated checks

Run `npm test`, `npm run check`, and `npm run build` with Node 22+.

The Node test suite checks:

- Hebrew answer normalization without erasing spelling differences or word order.
- Streaks across month boundaries, calendar-day XP, and yesterday's unfinished streak.
- Review timing and mistake resets.
- Idempotent cross-device merges, separate card timestamps, and no duplicate daily XP.
- Malformed imports, schema fallback, and prototype-key rejection.
- All 32 lessons / 128 phrase entries, uniqueness, unit membership, answer availability, and both form variants.
- All 27 print guides: correct shape passes; blank, short, partial, and off-guide paths fail.

Syntax checks cover runtime JavaScript. The build copies only the public shell and source modules to `dist`. There are no npm runtime dependencies. Optional Firebase browser modules are pinned to 13.3.0, verified in the official release notes (11 November 2026); the configured cloud path still needs live owner-project testing.

## Browser checks performed

- Opened the desktop learning path and visually inspected the layout.
- Completed the first lesson through introductions, randomized meaning checks, word building, unpointed Hebrew typing, and a scenario.
- Confirmed a 100% score, +30 XP, one-day streak, and next-lesson unlock.
- Refreshed and confirmed guest lesson completion and XP persisted.
- Checked a 390 × 844 CSS viewport in a browser iframe; learning path and alphabet had no horizontal overflow (375 px client width excluding the scrollbar). This is responsive-layout QA, not physical phone testing.
- Rejected a blank trace, drew Yod using pointer drags, and confirmed the shape passed and awarded +5 XP. Fixed immediate counter/tile updates after a successful trace.
- Confirmed the learned phrase collection populated after the lesson.

Further browser checks and any discovered fixes are recorded in the release commit. Responsive CSS is included; device testing is separate from desktop verification.

## Still requires owner configuration / external review

- Google popup sign-in, Firestore sync across real devices, and deployed rules validation need the owner's Firebase project. No credentials have been invented or embedded.
- Firestore rules are supplied and reviewed against the data model, but have not been exercised in a Firebase emulator in this environment.
- Cloudflare production deployment needs the owner's Cloudflare-to-GitHub connection; the guide provides exact settings.
- Hebrew device audio depends on an installed Hebrew voice. Native recordings and educator editorial sign-off are not included.
- The course is introductory and not CEFR-certified. No fluency or mastery claim is supported by passing the lesson tests.


## Font-tracing and motion update — 17 November 2026

- Eleven automated tests pass, including rejection of the previous reversed Alef, rejection of a mirrored real Alef, bounds validation for all derived routes, and preservation of Yod/Vav/Lamed size relationships. Pointer-event tests cover empty coalesced-event lists, input isolation during replay, and no idle animation scheduling under reduced motion.
- All 27 forms use actual Noto Sans Hebrew Bézier contours. Standalone SVGs and the same self-hosted font ship with the app; font license is included.
- Browser check: blank Yod fails; pointer-traced Yod reaches 13/13 checkpoints and succeeds; undo removes coverage; Clear resets; demonstration does not count as learner input.
- Letter-name selection, navigation, and live checkpoint progress were checked on desktop.
- Motion uses transform/opacity transitions and short feedback sequences. CSS animations, WAAPI effects, demonstration replay, and canvas pulse all honor the device's reduced-motion preference. Physical reduced-motion device testing remains separate from source-level checks.
- Firebase public web configuration was supplied by the owner and connected. Live OAuth and cross-device Firestore writes still require owner sign-in; no account was created or impersonated during this update.

- Update viewport QA: letter grid and tracing controls fit a 390 × 844 iframe (375 px client width, 375 px content width). Favicon inspected at 16, 32, and 192 pixels.

- Fixed a local development-server crash on missing assets during rebuilds: files are now read before response headers are sent. Reloaded the app successfully after the fix. This helper is not part of the Cloudflare production runtime.

## Responsive and Home Screen update — 17 November 2026

- Fourteen Node tests pass. New checks validate Apple metadata, preserved pinch zoom, actual opaque PNG sizes, standalone manifest identity/scope, and offline caching of the new assets.
- CSS viewport checks used 320×568, 375×667, 390×844, 430×932, 768×1024, 1024×768, 1366×768, 1920×1080, and 844×390. No horizontal overflow was observed in the tested learning/tracing layouts.
- Learning path: 390×844, 430×932, 768×1024, 1366×768, and 1920×1080 fit without vertical page scrolling. Smaller phones retain natural vertical scrolling; the continuation action appears near the top. Short-window/tablet density was adjusted after measurement.
- Tracing Check action is above the fixed phone navigation at 320×568, 375×667, and 390×844. Tablet and desktop tracing fit at 768×1024, 1024×768, 1366×768, and 1920×1080. Landscape tracing at 844×390 has no page overflow and its Check button ends at 323 px.
- Native letter selector was exercised and changed the canvas from Alef to Bet. Optional alphabet/facts are collapsed on phones; reference notes start collapsed there.
- Phone lessons use the actual visual viewport height. At 375×667, the lesson page has no document overflow and Continue/Check ends at 646 px. The 320×568 introduction action ends at 547 px. Phrase cards and a four-choice question were exercised.
- Form input computed size was verified at 16 px on the phone viewport. No CSS scaling or `user-scalable=no` is used; user zoom remains available.
- Home Screen instruction dialog opened and closed successfully. Icon PNG dimensions/opacity are verified by tests and all derive from the same favicon SVG. Actual Safari installation, iOS safe-area values, and the iOS software keyboard require a physical device or Apple simulator; these were not available in the browser environment.
- `scripts/preview-viewports.mjs` creates a disposable local browser harness after a build. It is not copied to a production deployment.

## iOS icon proportions — 17 November 2026

- Corrected the icon export's nonuniform scaling: the old vertical scale was 2.3 times the horizontal scale. The font-derived wordmark now uses one scale factor, remains centered, and has room for the iOS mask.
- SVG and all three opaque PNG sizes share the same artwork. The source has a full-bleed square background; the operating system supplies the Home Screen corner mask.
- Updated the generator so future letter-asset exports retain these proportions. Versioned the icon/manifest URLs and refreshed the service-worker cache.
- All 14 automated tests, JavaScript syntax checks, and the static build pass. Visually inspected the 512 px output; physical iOS rendering remains untested.

## Hebrew Writer rebuild — 17 November 2026

- Integrated the published Hanzi Writer 3.7.3 SVG renderer, animation system, and stroke quiz engine, with its full MIT license and provenance note retained. Only locally generated Hebrew data is loaded. No Chinese character data is shipped.
- Authored practice medians and instructions for 27 Hebrew print forms. The generator partitions the original Noto Sans Hebrew contours into stroke silhouettes, with <= .035 practice-unit curve flattening. It asserts that the union reproduces each glyph. These are guided print paths, not a claim of mandatory universal Hebrew handwriting order.
- Stroke-by-stroke acceptance replaces the former accumulated checkpoint score. Guided mode, recall mode, direction feedback, automatic hints after two misses, individual Hint, replay, restart, completion, and the existing one-time XP award are integrated.
- Live browser drawing: Alef diagonal accepted; replay retained 1/3; reversed upper-right stroke rejected with a direction hint; forward stroke accepted; final stroke completed the letter and awarded XP. Also drew accepted first strokes in both 390×844 guided and recall surfaces. Hint in recall preserved 0/3 progress.
- All 27 forms were selected and rendered in the browser without an application error. Browser-extension metadata errors were unrelated to the app.
- Checked 320×568, 375×667, 390×844, 430×932, 768×1024, 1024×768, 1366×768, 1920×1080, and 844×390. No horizontal app overflow. Small-phone tools end at 503.5px, just above the 504px navigation edge; 375px phone tools end at 531.4px before its 603px navigation edge. Optional alphabet/details content still scrolls naturally.
- Final landscape check at 844×390: client and content widths are both 844px; client and content heights are both 390px.
- 17 tests pass. New checks cover jitter tolerance, reverse/partial/reordered strokes across every form, live-data grading, coalesced pointer input, primary-pointer capture, final input samples, cancellation, and listener cleanup. Syntax checks and the static build pass.
- Physical iOS/Apple Pencil behavior and physical Safari installation remain untested in this Chrome-based environment. Reduced-motion handling uses a static Watch preview and a Back to writing action.

## Course, writing rounds, rewards and compact mark — 18 November 2026

- Course integrity: 64 lessons / 16 units / 256 unique phrase records; all generated sessions remain playable with both grammatical settings. New ordinary-spelling answers are accepted alongside pointed forms. Existing IDs and guest progress are retained. Educator review remains an editorial boundary; see COURSE_SOURCES.md.
- 26 tests pass, along with JavaScript syntax checks and the static production build. New model coverage includes freeze stock, automatic closed-day protection, exhaustion, non-retroactive purchases, idempotent merge/purchase/claim behavior, star/time preservation, repeated-round XP limits, and legacy/sanitized progress.
- Whole-letter recognition checks: all 27 templates pass with reversed/reordered strokes, additional pen lifts and small hand jitter. Blank, partial, off-target and wrong-letter examples fail; short Yod and long final Nun remain distinct. These are geometric template checks, not general cursive OCR.
- Browser: completed the My name is lesson at 100%, earned 30 XP / 15 sparks, reached Level 2, and claimed two daily quests exactly once (+20 sparks). A timed writing test with all questions skipped displayed 0% / zero stars / zero XP.
- Browser: traced Alef with the Hanzi engine, then wrote it in whole-letter recall using reversed directions and reversed stroke order; it passed. The next recognition question accepted Alef.
- Nine iframe viewport checks: 320×568, 375×667, 390×844, 430×932, 768×1024, 1024×768, 1366×768, 1920×1080, 844×390. Writing dialogs fit their viewport without document overflow. All drawing surfaces are square (small phone 238.55px, 375px phone 280.13px, tall phone 354.47px; desktop 420px; landscape 198.89px). Fixed a minimum-content overflow in 320px rewards; final content and client widths are both 305px including the reserved page scrollbar.
- New compact Bet/spark mark uses native SVG, with opaque 180/192/512px PNG exports. The existing Hebrew wordmark is unchanged. Versioned icon/manifest references and updated the offline shell.
- Firebase account rule deployment and live authenticated-cloud writes were not performed. Updated owner-only rules and legacy fallback behavior are documented in SETUP.md. Physical iOS / Apple Pencil testing and native educator review remain outside this browser environment.
