# Hebrew research & curriculum design

Research date: **16 November 2026**. This is a product-oriented language dossier and expansion map, not a claim to exhaust the scholarship on Hebrew. The shipped lessons teach **contemporary spoken Modern Hebrew**, with introductory literacy. Historical and religious registers are background context, not interchangeable substitutes for everyday usage.

## 1. What language are we teaching?

Hebrew is a Northwest Semitic language in the Afroasiatic family. Its history includes Biblical, Mishnaic/Rabbinic, Medieval, and Modern stages. Hebrew continued in religious, literary, scholarly, and other written uses before its modern revival as a community vernacular. It is misleading to present it as simply unused for two thousand years. Modern speech developed through a large social process, not one individual's invention. The Academy's historical account and the Hebrew University's modern-history overview provide starting points. [1,2]

**Product decision:** a learner should leave the first session able to greet someone, not recite historical categories. Use modern conversational vocabulary and clearly flag a literary, formal, religious, or colloquial expression when it enters the course. Modern Israeli pronunciation is the initial target, while avoiding claims that other Jewish pronunciation traditions are incorrect.

## 2. The writing system is a parallel learning track

Hebrew runs right to left, with 22 letters and five final shapes. Latin names and digits keep their own direction inside a Hebrew context. Niqqud and other marks combine with letters; the visible shape can consist of multiple Unicode characters. These are layout and input concerns as well as language facts. [3,4]

| Base letter | Final shape | Recognition target |
| --- | --- | --- |
| כ | ך | Kaf/khaf; the ending shape normally has kh in everyday examples |
| מ | ם | Mem; closed final shape |
| נ | ן | Nun; descending final shape |
| פ | ף | Pe/fe; final usually f in everyday examples |
| צ | ץ | Tsadi; descending final shape |

**Product decisions:** apply `lang="he"` and explicit direction or `bdi` to Hebrew runs; do not reverse strings in JavaScript. Let learners keep their own Latin-script name. Keep the English interface left to right. Store logical text order. Provide an on-screen Hebrew keyboard so an operating-system keyboard installation is not a prerequisite.

Do not force learners to finish the alphabet before saying hello. A separate letter tab lets them practice names, sounds, recognition, and shapes while completing meaningful lessons. University beginner materials combine literacy and communication; their scope informs this parallel design. [5,6]

### Print is not handwriting

Square/print Hebrew, everyday handwriting, Rashi type, and historical scripts are distinct visual systems. The tracing board uses exact Noto Sans Hebrew font outlines, with checkpoints derived from the center of the same glyph. The self-hosted reading font, displayed silhouette, and generated SVG files share that geometry. Numbers and the replay animation suggest routes through a print shape, not one universal Hebrew handwriting stroke order. Correct handwriting requires a dedicated curriculum and educator-reviewed models.

The feedback algorithm samples the guide and drawn strokes. At least 86% checkpoint coverage and 80% on-guide precision are required. Short marks and large off-guide scribbles fail. It does not evaluate pen pressure, elegance, conventional ductus, or general handwriting competence. A keyboard-accessible letter-name quiz supplies another way to practice; it does not make the drawing canvas itself keyboard-operable.

## 3. Sound before transliteration dependence

A phrase has four teaching layers: Hebrew spelling, a pronunciation aid, English meaning, and a short usage note. Uppercase syllables indicate primary stress in our learner-oriented romanization, not IPA. One-syllable words usually remain lowercase. Hyphenation helps chunk the phrase, but it is not a scholarly morphological segmentation.

| Feature to teach | Learner risk | Product treatment |
| --- | --- | --- |
| Five main vowel qualities | Reading Hebrew as English vowel spelling | Vowel panel; repeat short, stable sound–meaning pairs |
| בּ/ב, כּ/כ, פּ/פ | Assuming a letter always has one sound | Both values in alphabet notes |
| שׁ/שׂ | Ignoring the position of the dot | Explain right-dot sh and left-dot s |
| ח and כ | Treating kh as an English k or two separate sounds | Describe a friction sound; native audio is needed next |
| צ | Pronouncing it like English z | Use ts as in cats |
| א/ע | Assuming alef is a vowel or all traditions merge ayin | Explain carriers and pronunciation variation |
| Stress | Memorizing the right consonants with an unrecognizable rhythm | Mark stress consistently in hints |
| ר | Treating one accent as the only acceptable r | Accept variation; avoid accent policing |

Device speech synthesis is only a convenience. The app chooses an available Hebrew voice and refuses an English-voice fallback. It does not grade pronunciation and does not call a recording “native” when no recording exists. A real competitor needs licensed native recordings, phrase-level prosody, slower versions, and listening exercises with distractors chosen for actual perceptual difficulty.

## 4. Niqqud and full spelling

Pointed learner spelling and normal unpointed full spelling do not always differ only by removing marks. Vav and yod may be added or doubled. Pealim explicitly documents this distinction. [7]

**Implemented:** marks and transliteration can be turned off separately. Answer comparison normalizes combining marks, common punctuation, and whitespace. It preserves letters and word order. A small explicit display mapping covers the current corpus's ordinary unpointed spellings such as שירותים, סוכר, and במזומן. This is not a general Hebrew spelling converter. As content grows, every phrase should receive a separately reviewed `unpointed` field and allowed-answer list. Avoid “correcting” a learner by deleting arbitrary yod/vav letters.

Teach sheva as context-sensitive rather than always “eh.” Explain qamats qatan as o, while ordinary qamats is usually a in the target pronunciation. The vowel panel includes reduced-vowel signs; it does not imply each historic vowel category is a separate modern phoneme.

## 5. The grammatical map

The course initially uses grammar to explain useful chunks, then grows toward productive patterns. The following is the proposed complete curriculum map, not a statement that all of these are already full interactive lesson modules. University ulpan scope includes sentence structure, present verbs, pronouns, questions, prepositions, agreement, numbers, possession, and construct phrases. [5]

| Domain | Foundation target | Later expansion |
| --- | --- | --- |
| Identity & pronouns | ani; singular ata/at; hu/hi; anakhnu | All plural forms; pronoun reference; register and inclusive usage |
| Nominal sentences | “I am…” without an overt present copula | Predicate types; demonstratives; hu/hi copular constructions |
| Negation & existence | lo; yesh/ein; yesh li/ein li | Past/future possession, scope, negative requests |
| Nouns | Gender; singular/plural recognition | Irregular plurals, dual remnants, noun patterns |
| Adjectives | Post-noun placement; gender/number matching | Definiteness agreement, comparison, adjective predicates |
| Articles & prefixes | ha-, be-, le-, mi-, ve- in common chunks | Phonological alternations; assimilation; attached relative she- |
| Questions | eifo, ma, mi, matai, lama, kama | lean, meayin, eikh; embedded questions; intonation |
| Verbs | High-frequency present and infinitive chunks | Seven binyanim; strong/weak roots; past, future, imperatives |
| Roots & patterns | Recognize relationships without guessing every meaning | Derived nouns, quadriliteral roots, lexicalized forms |
| Objects | Recognize definite-object et | Object pronouns and suffixes; argument structure |
| Possession & prepositions | li; sheli; be-, le-, im, bli | Full suffix paradigms, irregular forms, idiomatic selection |
| Construct state | Recognize common smikhut phrases | Construct plural, definiteness, multi-noun chains |
| Numbers | One to ten as counting forms | Both gender sets; construct two; teens, tens, prices, dates |
| Time | Today/tomorrow; common day/meeting phrases | All weekdays, hours, dates, durations, schedules, calendar usage |
| Complex sentences | and, but, because, why | Relative clauses, conditionals, reported speech, discourse markers |
| Pragmatics | Greetings, politeness, clarification | Invitations, refusals, apologies, tone, colloquial vs formal |
| Literacy | Recognize letters and familiar phrases | Unpointed decoding, authentic short texts, messages, forms |

Do not teach gender as merely swapping an English pronoun. A form may reflect the **speaker** or the **person addressed**, and notes must say which. Do not infer a learner's identity from their name or Google account. The app's form setting is a grammatical example preference.

Similarly, do not teach that Hebrew “has no verb to be.” It commonly omits an overt present copula in basic nominal sentences; other tenses and constructions behave differently. Do not teach the number series as enough for all prices: counting eser does not license eser shkalim. The lesson explicitly contrasts asara shkalim.

## 6. Why the first conversation comes first

The first unit establishes four abilities: greet someone, say your name, answer a basic social question, and explain where you are from. The phrase קוראים לי is useful for any speaker; add the person's own name without inventing a Hebrew equivalent. HebrewPod101's introduction examples confirm the fixed expression and its gender-independent use. [8]

The subsequent course sequence is our design judgment, informed by conversational ulpan's emphasis on useful tasks rather than copied from another app. [6]

| Unit | Practical outcome | Grammar/reading thread |
| --- | --- | --- |
| 1. First connections | Hello, name, wellbeing, origin | Pronouns; omitted present copula; addressee forms |
| 2. Help | Politeness, yes/no, clarification, English/help | Negation; present gender; fixed impersonal requests |
| 3. Directions | Bathroom, station, signs, distance | Where; article; everyday unpointed recognition |
| 4. Café | Water, wants, ingredients, bill/payment | Noun requests; want; with/without; infinitive requests |
| 5. City | Count, ask price, buy ticket, locate transit | Counting forms; number-agreement caution; destinations |
| 6. Time | Today/tomorrow, simple meeting plans | Time expressions; common days; future chunks |
| 7. About you | Home, people, possession, learning/working | Present verbs; yesh/ein; possession |
| 8. Integration | Needs, descriptions, connectors, scenarios | Agreement, infinitives, and combining known chunks |

The present eight-unit course is introductory. It deliberately does not claim CEFR certification, complete A1 coverage, conversational fluency, or expertise in every Hebrew register. The real-life final activities are constrained response choices, not open-ended AI conversation.

## 7. Learning mechanics & measurement

Every lesson contains a context explanation, four phrase introductions, four meaning checks, a word-building task, a Hebrew typing task, and a scenario. The seven graded tasks require at least 70% success to complete. First completion earns 30 XP; repeating a completed lesson earns 10. Failed attempts still award 5 practice XP. Letter practice gives 5 XP for a newly practiced shape; letter quizzes and phrase reviews have smaller rewards.

These reward values and the completion threshold are product choices, not validated proficiency measurements. Mistakes do not consume lives. Streaks are calendar-day activity in the device's local timezone, with yesterday allowed while today is unfinished.

Review uses a simple box schedule: correct recalls advance through 1, 3, 7, 14, and 30 days; a mistake resets the card and makes it due after ten minutes. It is a transparent heuristic, not a named research algorithm or a calibrated memory model. A future evaluation should compare retention after one week and one month, not use streak length as a proxy for language skill.

## 8. Editorial and research gates before a broad launch

- Have a qualified Modern Hebrew educator review **every** phrase in both forms, pointed spelling, ordinary unpointed spelling, stress, meaning, register, and scenario ambiguity. No native-speaker review has been performed in this build.
- Add reviewed, separately authored distractors. The current lesson choices reuse the lesson's phrase meanings; review distractors draw from the wider corpus. They are functional but not pedagogically optimized minimal pairs.
- Add authentic native recordings with documented licensing and separate speaker/addressee metadata. Do not scrape dictionaries or course audio without rights.
- Test with actual beginners: can they use a phrase without seeing English? Can they distinguish a letter on a sign? Can they ask for clarification under mild conversational pressure?
- Review the derived print-shape routes and develop a separate handwriting course. Give disabled learners equivalent non-drawing literacy practice.
- Add all weekdays and practical numbers before claiming independent scheduling or money competence; teach grammatical agreement rather than giving a bare list.
- Expand into healthcare vocabulary and emergencies only with expert-reviewed wording and locally verified service information; do not market an introductory phrasebook as a safety tool.

## Sources and how they were used

1. [Academy of the Hebrew Language — Hebrew through the Ages](https://eng.hebrew-academy.org.il/overview-of-hebrew/hebrew-through-the-ages/) — historical periods and register distinction.
2. [Hebrew University — Historical overview of Modern Hebrew](https://cris.huji.ac.il/en/publications/historical-overview-of-modern-hebrew/) — modern revival chronology (public research summary).
3. [W3C — Hebrew Script Resources](https://www.w3.org/International/hlreq/hebr/) — script inventory and web-layout concerns.
4. [Unicode 16, chapter 9](https://www.unicode.org/versions/Unicode16.0.0/core-spec/chapter-9/) — Hebrew script encoding, marks, and directionality.
5. [Ben-Gurion University — beginner ulpan syllabus](https://in.bgu.ac.il/en/Global/Documents/OSP%20Docs/OSP_Courses_Syllabi/syllabus%20ulpan%20level%20aleph.pdf) — literacy, conversation, and grammar scope.
6. [Ulpan La-Inyan — course descriptions](https://ulpan.com/course-descriptions/) — practical conversational objectives and staged progression.
7. [Pealim — Writing With and Without Vowels](https://www.pealim.com/articles/writing-with-and-without-vowels/) — pointed vs ordinary full spelling.
8. [HebrewPod101 — introduction examples](https://www.hebrewpod101.com/lesson/can-do-hebrew-for-absolute-beginners-3-how-to-introduce-yourself-examples-and-variations?lp=150) — natural introduction chunks, especially korim li.
9. [University of Texas at Austin — Hebrew tutorials](https://hebrew.laits.utexas.edu/tutorials.html) — broader curriculum coverage index. Some older interactive resources are not accessible as text; no claim is made to have reviewed their hidden exercise contents.
10. [Pealim — inflection dictionary](https://www.pealim.com/) — ongoing reference for future word-by-word editorial checks; no automated scraping or copied corpus is included.

No source claims to endorse Binah. The course structure, activities, review schedule, code, and derived trace routes are implementation decisions. Research is a basis for design, not a replacement for linguistic editorial review.
