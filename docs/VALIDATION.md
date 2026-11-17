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
