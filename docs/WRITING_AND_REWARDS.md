# Writing and rewards expansion

## Reference and original implementation

Reviewed the developer's public [Write It! Hebrew listing](https://apps.apple.com/us/app/write-it-hebrew/id1400944424): short lessons, guided writing, timed tests, recognition and customizable review. Its code, assets, audio, screenshots and lesson text are not included. Binah combines an original grouped practice flow with the already vendored MIT-licensed Hanzi Writer engine.

- Eight letter groups cover all 27 print forms.
- Learn: guided tracing, whole-letter recall and name recognition for each letter.
- Test: mixed recall/recognition, optional active-time personal best, accuracy-based stars. At least 80% first-try accuracy passes; a perfect test without hints earns three stars. Hints and retries remain available.
- Recall grades geometric coverage/precision of locally authored Hebrew medians. It accepts different stroke order/direction and pen lifts; it is template-based shape checking, not general-purpose Hebrew OCR or cursive recognition. Guided mode retains Hanzi Writer's directional stroke instruction.
- A skipped or unfinished learn group earns no group completion. Repeated successful rounds of the same group/type earn group XP only once per local day. First successful writing of an individual letter still earns its one-time 5 XP.
- Personal best time excludes background-tab time, never changes stars and is recorded only for a passing timed test. All time records are local to the user's progress data, not public leaderboards.

## Rewards

Level thresholds grow with total XP. Sparks have no monetary value and cannot be bought: 15 per new conversation lesson, 3 per new letter, 5 per writing-test star, and 10 per claimed daily quest.

Daily quests track the selected daily XP goal, one completed conversation lesson, and three distinct written letters. Claims are explicit and merge as sets, so a second device cannot duplicate them. Repeating a letter or lesson does not inflate a unique-letter/unique-lesson quest.

One freeze starts equipped; capacity is two, and refills cost 60 sparks. The app processes closed local calendar days in order. A freeze bridges a missed day only while there is a live streak and stock was available at the end of that day. It adds no XP and cannot be purchased retroactively to repair an older gap. Protection starts after the new rewards system is first initialized; the migration does not rewrite old activity.

Rewards extend the existing version-1 progress schema with an optional `game` map. Merge rules preserve the union of claims/letter records, maximum stars and minimum positive best times. Concurrent purchases from the same previous purchase count use the same next purchase ID and merge once. The closed-day checkpoint advances monotonically. Progress history follows the existing 730-day retention boundary.

## Branding

The compact Bet-and-spark is a companion to the unchanged Hebrew wordmark. It is used for the favicon, opaque Home Screen PNGs, the phone header, writing-round header and rewards. The former full-word icon is retained as `public/wordmark-icon.svg`. See [BRAND.md](BRAND.md).

## Account setup boundary

See [SETUP.md](SETUP.md#new-rewards-update-firestore-rules-once). New reward fields require the updated Firestore allowlist for cross-device sync. A guarded legacy write keeps lesson sync operational with the earlier rules; rewards stay local until rules are deployed. No Firebase rule deployment or live authenticated-cloud test was performed.
