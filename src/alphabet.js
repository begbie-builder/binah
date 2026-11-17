import {letterGeometry} from './letter-geometry.js';
// Exact font geometry supplies both the display outline and its practice routes.
// These print-font routes teach shape; they do not claim traditional handwriting order.
const a=(char,name,he,sound,note)=>({char,name,he,sound,note,...letterGeometry[char]});
export const alphabet=[
a('א','Alef','אָלֶף','Silent carrier / glottal stop','Often carries a vowel; it is not itself the sound “a.”'),
a('ב','Bet / Vet','בֵּית','b / v','בּ with a dagesh is b; ב without one is v.'),
a('ג','Gimel','גִּימֶל','g','Hard g as in go.'),
a('ד','Dalet','דָּלֶת','d','Notice the roof extends beyond the vertical stroke.'),
a('ה','He','הֵא','h','The left leg is separated from the roof. At the end it can mark a vowel.'),
a('ו','Vav','וָו','v / o / u','As a consonant v; וֹ can mark o and וּ can mark u.'),
a('ז','Zayin','זַיִן','z','The top extends to both sides of the stem.'),
a('ח','Het','חֵית','kh','A friction sound, like Scottish loch. The legs connect to the roof.'),
a('ט','Tet','טֵית','t','The same mainstream Modern Hebrew sound as tav.'),
a('י','Yod','יוֹד','y / i','A short letter. As a consonant it sounds like yes; it can also help mark a vowel.'),
a('כ','Kaf / Khaf','כַּף','k / kh','כּ is k; כ is kh. The final form is ך.'),
a('ל','Lamed','לָמֶד','l','The tallest letter; its stem reaches above the usual roof.'),
a('מ','Mem','מֵם','m','The final form is closed: ם.'),
a('נ','Nun','נוּן','n','The final form is ן.'),
a('ס','Samekh','סָמֶךְ','s','A closed shape; compare final mem, which has a squarer base.'),
a('ע','Ayin','עַיִן','Often silent / glottal; traditionally pharyngeal','Many mainstream speakers merge it with alef; some traditions preserve a throat sound.'),
a('פ','Pe / Fe','פֵּא','p / f','פּ is p; פ is f. The final form is ף.'),
a('צ','Tsadi','צָדִי','ts','Like the end of cats. The final form is ץ.'),
a('ק','Qof','קוֹף','k','In mainstream Modern Hebrew it sounds like kaf with dagesh.'),
a('ר','Resh','רֵישׁ','r','Often a back-of-the-mouth r; pronunciation varies. Compare dalet’s projecting roof.'),
a('ש','Shin / Sin','שִׁין','sh / s','שׁ has the dot on the right (sh); שׂ on the left (s).'),
a('ת','Tav','תָּו','t','A little foot distinguishes the left leg.'),
a('ך','Final Kaf','כַּף סוֹפִית','Usually kh','Used at the end of a word instead of כ; same letter, different shape.'),
a('ם','Final Mem','מֵם סוֹפִית','m','Used at the end of a word instead of מ.'),
a('ן','Final Nun','נוּן סוֹפִית','n','Used at the end of a word instead of נ. Extends below the baseline.'),
a('ף','Final Fe','פֵּא סוֹפִית','Usually f','Used at the end of a word instead of פ.'),
a('ץ','Final Tsadi','צָדִי סוֹפִית','ts','Used at the end of a word instead of צ.')
];
export const vowels=[['אַ','Pataḥ','a'],['אָ','Qamats','usually a; qamats qatan is o'],['אֶ','Segol','e'],['אֵ','Tsere','e'],['אִ','Ḥiriq','i'],['אֹ','Ḥolam','o'],['אֻ','Qubuts','u'],['וּ','Shuruq','u'],['אְ','Sheva','e or silent'],['אֲ','Ḥataf pataḥ','a'],['אֱ','Ḥataf segol','e'],['אֳ','Ḥataf qamats','o']];
