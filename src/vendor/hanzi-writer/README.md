# Hanzi Writer in Binah

Upstream: https://github.com/chanind/hanzi-writer

Vendored from the published **hanzi-writer 3.7.3** npm package, `dist/index.esm.js`.
Copyright (c) 2014 David Chanin. MIT license: [LICENSE.txt](LICENSE.txt).
No Chinese character data or Arphic font assets are included.

Binah uses the actual SVG renderer, mutation/animation system, and `strokeMatches`
quiz engine. Its `charDataLoader` returns locally generated Hebrew data; there
are no tracing CDN requests or new production build dependencies.

Local adaptations in `hanzi-writer.js`:

- Replace mouse/touch/global end listeners with primary Pointer Events,
  coalesced samples (including the empty-array fallback), pointer capture,
  last-point sampling, and abortable listener cleanup.
- Cancel interrupted/lost-capture strokes without grading them.
- Add `destroy()` and guard deferred work after destruction.
- Add optional `startAndEndDistanceThreshold` for Hebrew-sized strokes.
  Upstream's default remains intact.
- Export the matcher, parser, user-stroke model, and pointer target for tests.
- Remove the source-map link, since that upstream map no longer matches.

To update, obtain the new package from npm, compare these changes against its
ESM file, retain the complete license/copyright notice, and run Binah's drawing,
all-form grading, direction, input cancellation, and browser interaction tests.
