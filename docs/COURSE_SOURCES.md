# Expanded practical Hebrew course

Content update: 18 November 2026.

The course adds **32 original lessons in 8 units**, bringing Binah to **64 lessons, 16 units, and 256 phrase records**. The original 32 lesson IDs and 128 phrase records are preserved. Each new lesson contains four phrases, explanatory notes, a specific scenario, and the existing mixed exercise sequence. New material includes **24 explicitly authored feminine variants**.

## Sequence and outcomes

| Added unit | Outcomes |
| --- | --- |
| An everyday kind of Hebrew | Present-tense routines, frequency, likes + infinitive, weather |
| People, groups, and belongings | Family, possession, plural agreement, addressing groups |
| Make a proper plan | Remaining weekdays, clock times, masculine/feminine numerals, duration |
| A place for the night | Reservations, reception, room faults, checkout questions |
| Get what you came for | Groceries, quantities, food preferences, clothing size and exchange requests |
| Tell yesterday’s story | Past being/possession, first-person activities, past questions |
| A little further ahead | First-person future, shared plans, intentions, arrangements |
| Keep the conversation going | Because/but/when/if, invitations, refusals, messages, combined conversations |

This sequence is an editorial choice for practical use. It is not a CEFR certification or a claim that 64 short lessons constitute a complete Hebrew course. The future unit introduces useful forms; it does not cover every binyan or weak-root paradigm.

## Primary reference checks

The following dictionaries and educational providers were consulted for forms, meaning, or practical usage. The phrases, scenarios, tips, and exercise grouping were composed for Binah; no provider’s lesson text or audio was copied.

| Source | Check applied |
| --- | --- |
| [Pealim — לקום](https://www.pealim.com/dict/1876-lakum/) | kam/kama; spoken unstressed feminine ending |
| [Pealim — לשתות](https://www.pealim.com/he/dict/31-lishtot/) | present shote/shota and drink paradigm |
| [Pealim — ללמוד](https://www.pealim.com/dict/41-lilmod/) | lomed/lomedet/lomdim/lomdot; first-person past and elmad/nilmad |
| [Pealim — ללכת](https://www.pealim.com/dict/7-lalechet/) | halakhti, e-lekh, nelekh |
| [Pealim — לדבר](https://www.pealim.com/he/dict/2-ledaber/) | dibarti, adaber, nedaber |
| [Pealim — להיות](https://www.pealim.com/dict/454-lihyot/) | hayiti, hayita/hayit; first-person past shared across speaker genders |
| [Pealim — לקנות](https://www.pealim.com/dict/1913-liknot/) | kaniti, kanita/kanit, ekne; feminine present variation |
| [Pealim — לשלם](https://www.pealim.com/dict/2232-leshalem/) | shilamti and ordinary spelling שילמתי |
| [Pealim — להיפגש](https://www.pealim.com/dict/1593-lehipagesh/) | nipagesh and ordinary spelling ניפגש |
| [Pealim — להזמין](https://www.pealim.com/dict/509-lehazmin/) | invite/order lexical family underlying hazmana |
| [Pealim — למדוד](https://www.pealim.com/dict/1025-lamod/) | limdod, measuring and trying on clothes |
| [HebrewPod101 — clothing actions](https://www.hebrewpod101.com/lesson/hebrew-words-of-the-week-with-yaara-for-intermediate-learners-4-clothing-actions) | conversational use of limdod for trying clothes on |
| [Pealim — מעלית](https://www.pealim.com/he/dict/7081-maalit/) | ma’alit spelling, feminine gender, meaning |
| [Academy of the Hebrew Language — television](https://terms.hebrew-academy.org.il/munnah/14062_2/television) | pointed טֵלֵוִיזְיָה and full spelling טלוויזיה |

The existing dossier, [HEBREW_RESEARCH.md](HEBREW_RESEARCH.md), remains the source for initial-course scope, script conventions, number-agreement guidance, and pronunciation boundaries. Its old count and tracing implementation descriptions refer to earlier builds.

## Editorial details

- Every new phrase and every new feminine variant has an explicit `unpointed` string. Removing niqqud alone is insufficient: compare דִּבַּרְתִּי / דיברתי and נִפָּגֵשׁ / ניפגש. These fields should drive unpointed display and accepted ordinary-spelling answers.
- Speaker and addressee gender are distinguished in notes. Plural-group examples are explicitly labeled; choosing a feminine speaker setting does not silently change a friend’s or a whole group’s gender.
- First-person singular past and future forms are shared by masculine and feminine speakers. Separate variants are supplied where the **addressee** changes, as with it-kha / i-takh.
- Prices and counts use noun agreement rather than copying bare counting forms: kartis ekhad, shnei kartisim, shtei kosot, asara shkalim.
- Pointed spelling and learner romanization prioritize an understandable modern spoken reading. Some movable shevas are omitted in ordinary speech, as in the guide la-MAD-ti; this is a pronunciation aid, not an academic transliteration.
- Service questions express requests, not promises about policies. Food preferences are not ingredient/allergy certification. No medical or legal guidance is supplied.
- Several conversational meanings depend on context or rising question intonation. Each lesson gives that context explicitly.

## Verification and remaining limits

Imported all exports successfully. Verified 64 unique lesson IDs and 256 unique phrase IDs, four phrases per lesson, valid unit membership, and valid scenarios. The existing session builder produces its expected exercises for both grammatical settings with unique normalized option sets in every lesson. Every new ordinary-spelling field is present and contains no niqqud.

A qualified Modern Hebrew educator has **not** reviewed this expansion. Native recordings, educator review of every pointed form/stress choice, and learner testing remain appropriate before a broad educational launch. The programmatic checks verify data integrity and playability, not linguistic certification.
