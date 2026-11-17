// Simplified monoline PRINT guides, intentionally not authoritative handwriting ductus.
// Coordinates in a 100 × 100 practice area. Each nested array is one suggested stroke.
const a=(char,name,he,sound,note,strokes)=>({char,name,he,sound,note,strokes});
export const alphabet=[
a('א','Alef','אָלֶף','Silent carrier / glottal stop','Often carries a vowel; it is not itself the sound “a.”',[[[75,20],[25,80]],[[30,22],[48,43]],[[53,57],[74,78]]]),
a('ב','Bet / Vet','בֵּית','b / v','בּ with a dagesh is b; ב without one is v.',[[[28,25],[70,25],[70,75]],[[24,75],[78,75]]]),
a('ג','Gimel','גִּימֶל','g','Hard g as in go.',[[[45,23],[62,23],[65,70],[79,78]],[[65,64],[30,80]]]),
a('ד','Dalet','דָּלֶת','d','Notice the roof extends beyond the vertical stroke.',[[[22,25],[78,25]],[[66,25],[66,80]]]),
a('ה','He','הֵא','h','The left leg is separated from the roof. At the end it can mark a vowel.',[[[25,25],[75,25],[75,80]],[[28,48],[28,80]]]),
a('ו','Vav','וָו','v / o / u','As a consonant v; וֹ can mark o and וּ can mark u.',[[[44,24],[61,24],[61,80]]]),
a('ז','Zayin','זַיִן','z','The top extends to both sides of the stem.',[[[37,25],[72,25]],[[55,25],[55,80]]]),
a('ח','Het','חֵית','kh','A friction sound, like Scottish loch. The legs connect to the roof.',[[[26,80],[26,25],[74,25],[74,80]]]),
a('ט','Tet','טֵית','t','The same mainstream Modern Hebrew sound as tav.',[[[25,27],[25,66],[36,78],[66,78],[77,67],[77,28],[58,28],[50,48]]]),
a('י','Yod','יוֹד','y / i','A short letter. As a consonant it sounds like yes; it can also help mark a vowel.',[[[44,25],[60,25],[60,46]]]),
a('כ','Kaf / Khaf','כַּף','k / kh','כּ is k; כ is kh. The final form is ך.',[[[25,25],[65,25],[77,39],[77,63],[65,77],[25,77]]]),
a('ל','Lamed','לָמֶד','l','The tallest letter; its stem reaches above the usual roof.',[[[30,12],[30,32],[74,32],[74,53],[62,73],[43,82]]]),
a('מ','Mem','מֵם','m','The final form is closed: ם.',[[[22,79],[34,28],[49,42],[62,26],[77,38],[77,79],[48,79]]]),
a('נ','Nun','נוּן','n','The final form is ן.',[[[42,25],[65,25],[65,77],[27,77]]]),
a('ס','Samekh','סָמֶךְ','s','A closed shape; compare final mem, which has a squarer base.',[[[28,26],[66,26],[78,40],[76,66],[64,79],[39,79],[25,66],[23,39],[28,26]]]),
a('ע','Ayin','עַיִן','Often silent / glottal; traditionally pharyngeal','Many mainstream speakers merge it with alef; some traditions preserve a throat sound.',[[[26,26],[41,70]],[[75,26],[68,64],[57,77],[26,81]]]),
a('פ','Pe / Fe','פֵּא','p / f','פּ is p; פ is f. The final form is ף.',[[[27,26],[65,26],[78,40],[78,66],[65,79],[26,79]],[[29,27],[29,49],[48,49]]]),
a('צ','Tsadi','צָדִי','ts','Like the end of cats. The final form is ץ.',[[[26,26],[73,77],[27,77]],[[76,26],[72,46],[52,53]]]),
a('ק','Qof','קוֹף','k','In mainstream Modern Hebrew it sounds like kaf with dagesh.',[[[25,25],[77,25],[77,52],[61,76]],[[29,47],[29,91]]]),
a('ר','Resh','רֵישׁ','r','Often a back-of-the-mouth r; pronunciation varies. Compare dalet’s projecting roof.',[[[25,25],[61,25],[74,38],[74,80]]]),
a('ש','Shin / Sin','שִׁין','sh / s','שׁ has the dot on the right (sh); שׂ on the left (s).',[[[23,25],[29,68],[40,79],[64,79],[76,67],[81,25]],[[51,25],[51,64],[41,77]]]),
a('ת','Tav','תָּו','t','A little foot distinguishes the left leg.',[[[25,26],[73,26],[73,80]],[[29,27],[29,70],[19,80]]]),
a('ך','Final Kaf','כַּף סוֹפִית','Usually kh','Used at the end of a word instead of כ; same letter, different shape.',[[[29,22],[71,22],[71,91]]]),
a('ם','Final Mem','מֵם סוֹפִית','m','Used at the end of a word instead of מ.',[[[26,26],[74,26],[74,79],[26,79],[26,26]]]),
a('ן','Final Nun','נוּן סוֹפִית','n','Used at the end of a word instead of נ. Extends below the baseline.',[[[43,22],[61,22],[61,92]]]),
a('ף','Final Fe','פֵּא סוֹפִית','Usually f','Used at the end of a word instead of פ.',[[[28,24],[65,24],[76,37],[76,92]],[[29,25],[29,49],[48,49]]]),
a('ץ','Final Tsadi','צָדִי סוֹפִית','ts','Used at the end of a word instead of צ.',[[[28,24],[63,56],[63,92]],[[78,23],[73,43],[54,49]]])
];
export const vowels=[['אַ','Pataḥ','a'],['אָ','Qamats','usually a; qamats qatan is o'],['אֶ','Segol','e'],['אֵ','Tsere','e'],['אִ','Ḥiriq','i'],['אֹ','Ḥolam','o'],['אֻ','Qubuts','u'],['וּ','Shuruq','u'],['אְ','Sheva','e or silent'],['אֲ','Ḥataf pataḥ','a'],['אֱ','Ḥataf segol','e'],['אֳ','Ḥataf qamats','o']];
