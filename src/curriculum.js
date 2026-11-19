// Original teaching material. Research and editorial boundaries: docs/HEBREW_RESEARCH.md.
const p=(id,he,roman,en,note='',f=null)=>({id,he,roman,en,note,...(f?{f}: {})});
const f=(he,roman,en,note)=>({he,roman,en,note});
// Expanded lessons carry an explicitly authored ordinary full spelling.
const q=(id,he,unpointed,roman,en,note='',f=null)=>({...p(id,he,roman,en,note,f),unpointed});
const fq=(he,unpointed,roman,en,note='')=>({...f(he,roman,en,note),unpointed});
export const units=[
{id:'first',title:'First words, real connections',he:'שָׁלוֹם',description:'Say hello. Share your name. Start a conversation.',icon:'sun',color:'green'},
{id:'help',title:'A little help goes a long way',he:'סְלִיחָה',description:'Be polite, ask for help, and keep a conversation going.',icon:'spark',color:'purple'},
{id:'places',title:'Find your way',he:'אֵיפֹה',description:'Read signs, find a bathroom, and ask for directions.',icon:'compass',color:'blue'},
{id:'cafe',title:'A seat at the café',he:'בְּבַקָּשָׁה',description:'Order something you want and ask for the bill.',icon:'cup',color:'orange'},
{id:'shop',title:'Out in the city',he:'כַּמָּה',description:'Numbers, prices, shopping, and getting around.',icon:'bag',color:'purple'},
{id:'time',title:'Make a little time',he:'הַיּוֹם',description:'Plan your day and meet someone again.',icon:'clock',color:'blue'},
{id:'you',title:'More about you',he:'אֲנִי',description:'Talk about home, people, and everyday life.',icon:'person',color:'orange'},
{id:'together',title:'Put it all together',he:'בְּיַחַד',description:'Use whole conversations with a little more confidence.',icon:'flag',color:'green'},
{id:'daily',title:'An everyday kind of Hebrew',he:'כָּל יוֹם',description:'Talk about routines, things you like, and the weather.',icon:'sun',color:'orange'},
{id:'peopleplus',title:'People, groups, and belongings',he:'אֲנַחְנוּ',description:'Introduce family, speak to groups, and say whose things they are.',icon:'person',color:'purple'},
{id:'calendar',title:'Make a proper plan',he:'בְּאֵיזוֹ שָׁעָה',description:'Use all seven weekdays, specific times, and numbers that agree.',icon:'clock',color:'blue'},
{id:'stay',title:'A place for the night',he:'חֶדֶר',description:'Handle a reservation, reception, room problems, and checkout.',icon:'bag',color:'green'},
{id:'market',title:'Get what you came for',he:'לִקְנוֹת',description:'Buy groceries, ask for an amount, and find the right size.',icon:'bag',color:'orange'},
{id:'past',title:'Tell yesterday’s story',he:'אֶתְמוֹל',description:'Use first past-tense forms and ask someone what happened.',icon:'clock',color:'purple'},
{id:'future',title:'A little further ahead',he:'מָחָר',description:'Talk about tomorrow, intentions, and plans you make together.',icon:'compass',color:'blue'},
{id:'longer',title:'Keep the conversation going',he:'נְדַבֵּר',description:'Connect ideas, invite someone, send updates, and use longer phrases.',icon:'flag',color:'green'}
];
const raw=[
['hello','first','Hello, Hebrew','A first greeting is already a conversation. Shalom means hello, goodbye, or peace. You can also say hi informally.','Someone greets you as you arrive. Say hello.',0,[
p('shalom','שָׁלוֹם','sha-LOM','Hello','Also used for goodbye; literally peace.'),p('boker','בּוֹקֶר טוֹב','BO-ker tov','Good morning'),p('erev','עֶרֶב טוֹב','E-rev tov','Good evening'),p('bye','לְהִתְרָאוֹת','le-hit-ra-OT','See you','A natural way to say goodbye.')]],
['name','first','My name is…','Korim li literally means “they call me.” The phrase stays the same for every speaker. Add your name; you do not need to translate your name into Hebrew.','Introduce yourself by saying “My name is…”',0,[
p('korim','קוֹרְאִים לִי','ko-RIM li','My name is…','Add your own name after li.'),p('naim','נָעִים מְאוֹד','na-IM me-OD','Nice to meet you'),p('ani','אֲנִי','a-NI','I / I am','Hebrew usually leaves out “am/is/are” in simple present-tense statements.'),p('nameq','אֵיךְ קוֹרְאִים לְךָ','ekh ko-RIM le-KHA','What is your name?','Speaking to one man.',f('אֵיךְ קוֹרְאִים לָךְ','ekh ko-RIM lakh','What is your name?','Speaking to one woman.'))]],
['how','first','How are you?','The form of “you” changes with the person you address. Ma shlomkha addresses a man; ma shlomekh addresses a woman. Choose either form in Settings.','A friend asks how you are. Reply “Good, thanks.”',1,[
p('howq','מָה שְׁלוֹמְךָ','ma shlom-KHA','How are you?','Speaking to one man.',f('מָה שְׁלוֹמֵךְ','ma shlo-MEKH','How are you?','Speaking to one woman.')),p('good','טוֹב, תּוֹדָה','tov, to-DA','Good, thanks'),p('fine','בְּסֵדֶר','be-SE-der','Okay'),p('great','מְצוּיָּן','me-tsu-YAN','Excellent')]],
['from','first','Where are you from?','Ani mi… means “I am from…” Mi- attaches to the place name. Canada is written קנדה. Me- appears before certain sounds, as in me-Yisrael.','Tell someone “I am from Canada.”',0,[
p('canada','אֲנִי מִקָּנָדָה','a-NI mi-ka-NA-da','I am from Canada'),p('fromq','מֵאֵיפֹה אַתָּה','me-EI-fo a-TA','Where are you from?','Speaking to one man.',f('מֵאֵיפֹה אַתְּ','me-EI-fo at','Where are you from?','Speaking to one woman.')),p('israel','אֲנִי מִיִּשְׂרָאֵל','a-NI mi-yis-ra-EL','I am from Israel'),p('ivrit','עִבְרִית','iv-RIT','Hebrew')]],
['polite','help','Please & thank you','Bevakasha works as please, you’re welcome, or here you go. Context does a lot of work. Slikha can mean excuse me or sorry.','Someone helps you find your hotel. Thank them.',0,[
p('thanks','תּוֹדָה','to-DA','Thank you'),p('please','בְּבַקָּשָׁה','be-va-ka-SHA','Please / you’re welcome'),p('sorry','סְלִיחָה','sli-KHA','Excuse me / sorry'),p('thanksmuch','תּוֹדָה רַבָּה','to-DA ra-BA','Thank you very much')]],
['yesno','help','Small words, big difference','Lo negates a simple statement. Ken means yes. Efshar is a useful impersonal way to ask whether something is possible.','Politely turn down an offer.',2,[
p('yes','כֵּן','ken','Yes'),p('no','לֹא','lo','No'),p('nothanks','לֹא, תּוֹדָה','lo, to-DA','No, thank you'),p('possible','אֶפְשָׁר','ef-SHAR','Is it possible?','Also means “possible”; use rising question intonation.')]],
['understand','help','When you don’t understand','Mevin is used by a masculine speaker; mevina by a feminine speaker. Hebrew present-tense verbs agree with the subject in gender and number.','You missed what someone said. Say you do not understand.',0,[
p('dontunderstand','אֲנִי לֹא מֵבִין','a-NI lo me-VIN','I don’t understand','Masculine speaker.',f('אֲנִי לֹא מְבִינָה','a-NI lo me-vi-NA','I don’t understand','Feminine speaker.')),p('slow','לְאַט, בְּבַקָּשָׁה','le-AT, be-va-ka-SHA','Slowly, please'),p('again','עוֹד פַּעַם, בְּבַקָּשָׁה','od PA-am, be-va-ka-SHA','One more time, please'),p('littlehebrew','אֲנִי מְדַבֵּר קְצָת עִבְרִית','a-NI me-da-BER ktsat iv-RIT','I speak a little Hebrew','Masculine speaker.',f('אֲנִי מְדַבֶּרֶת קְצָת עִבְרִית','a-NI me-da-BE-ret ktsat iv-RIT','I speak a little Hebrew','Feminine speaker.'))]],
['english','help','Ask for a little help','Ata medaber asks one man; at medaberet asks one woman. Efshar ezra avoids choosing a gender and politely asks for help.','Ask for help without choosing a gendered form.',1,[
p('englishq','אַתָּה מְדַבֵּר אַנְגְּלִית','a-TA me-da-BER ang-LIT','Do you speak English?','To one man.',f('אַתְּ מְדַבֶּרֶת אַנְגְּלִית','at me-da-BE-ret ang-LIT','Do you speak English?','To one woman.')),p('helpq','אֶפְשָׁר עֶזְרָה','ef-SHAR ez-RA','Can I get some help?'),p('question','יֵשׁ לִי שְׁאֵלָה','yesh li she-e-LA','I have a question'),p('understood','הֵבַנְתִּי','he-VAN-ti','I understood','A useful fixed response; the same for masculine and feminine speakers.')]],
['where','places','The most useful question','Eifo means where. Put it before a place. Hebrew does not need an equivalent of “is” in these questions. Ha- is the definite article: “the.”','Ask where the bathroom is.',0,[
p('bathroom','אֵיפֹה הַשֵּׁרוּתִים','EI-fo ha-she-ru-TIM','Where is the bathroom?'),p('hotel','אֵיפֹה הַמָּלוֹן','EI-fo ha-ma-LON','Where is the hotel?'),p('station','אֵיפֹה הַתַּחֲנָה','EI-fo ha-ta-kha-NA','Where is the station?'),p('here','כָּאן','kan','Here')]],
['directions','places','Left, right, straight','Directions are often short. Yamina and smola mean to the right and to the left. Yashar means straight ahead.','Someone asks which way to turn. Say “To the right.”',0,[
p('right','יָמִינָה','ya-MI-na','To the right'),p('left','שְׂמֹאלָה','SMO-la','To the left'),p('straight','יָשָׁר','ya-SHAR','Straight ahead'),p('there','שָׁם','sham','There')]],
['signs','places','Read the signs','Everyday signs usually omit vowel marks. Switch off vowel marks in Settings when you want to practice recognizing unpointed Hebrew.','Which sign points to the way out?',1,[
p('entrance','כְּנִיסָה','kni-SA','Entrance'),p('exit','יְצִיאָה','ye-tsi-A','Exit'),p('open','פָּתוּחַ','pa-TU-akh','Open','Masculine adjective, as in a shop being open.'),p('closed','סָגוּר','sa-GUR','Closed','Masculine adjective.')]],
['near','places','Is it far?','Ze means “this/it” for a masculine noun or a general situation. Zot refers to a feminine noun. These questions use a natural general ze.','Ask whether the place is nearby.',0,[
p('nearq','זֶה קָרוֹב','ze ka-ROV','Is it near?'),p('farq','זֶה רָחוֹק','ze ra-KHOK','Is it far?'),p('onfoot','בְּרֶגֶל','be-RE-gel','On foot'),p('map','יֵשׁ לִי מַפָּה','yesh li ma-PA','I have a map')]],
['water','cafe','Water, please','A noun followed by bevakasha is a polite, useful first order. Mayim has a plural-looking form. There is no need for a long sentence to get started.','Order water politely.',0,[
p('waterplease','מַיִם, בְּבַקָּשָׁה','MA-yim, be-va-ka-SHA','Water, please'),p('coffeeplease','קָפֶה, בְּבַקָּשָׁה','ka-FE, be-va-ka-SHA','Coffee, please'),p('teaplease','תֵּה, בְּבַקָּשָׁה','te, be-va-ka-SHA','Tea, please'),p('menu','תַּפְרִיט, בְּבַקָּשָׁה','taf-RIT, be-va-ka-SHA','A menu, please')]],
['want','cafe','Say what you’d like','Rotse is masculine; rotsa is feminine. The Hebrew spelling of both is רוצה without vowel marks. Here the difference is in pronunciation.','Say you would like coffee.',0,[
p('wantcoffee','אֲנִי רוֹצֶה קָפֶה','a-NI ro-TSE ka-FE','I want coffee','Masculine speaker.',f('אֲנִי רוֹצָה קָפֶה','a-NI ro-TSA ka-FE','I want coffee','Feminine speaker.')),p('wantwater','אֲנִי רוֹצֶה מַיִם','a-NI ro-TSE MA-yim','I want water','Masculine speaker.',f('אֲנִי רוֹצָה מַיִם','a-NI ro-TSA MA-yim','I want water','Feminine speaker.')),p('thisplease','זֶה, בְּבַקָּשָׁה','ze, be-va-ka-SHA','This, please','Use with a general gesture or a masculine noun.'),p('morewater','עוֹד מַיִם, בְּבַקָּשָׁה','od MA-yim, be-va-ka-SHA','More water, please')]],
['without','cafe','Make it yours','Im means with; bli means without. They stay separate from the following noun. Ask about ingredients directly; this app does not certify that food is safe for an allergy.','Ask for your drink without sugar.',0,[
p('nosugar','בְּלִי סֻכָּר','bli su-KAR','Without sugar'),p('withmilk','עִם חָלָב','im kha-LAV','With milk'),p('nomilk','בְּלִי חָלָב','bli kha-LAV','Without milk'),p('containsmilk','יֵשׁ בָּזֶה חָלָב','yesh ba-ZE kha-LAV','Does this contain milk?')]],
['bill','cafe','At the end of the meal','Kheshbon means bill or account. Efshar leshalem be-kartis asks whether card payment is possible. You can use efshar + infinitive for many practical requests.','Ask for the bill.',0,[
p('bill','חֶשְׁבּוֹן, בְּבַקָּשָׁה','khesh-BON, be-va-ka-SHA','The bill, please'),p('cardpay','אֶפְשָׁר לְשַׁלֵּם בְּכַרְטִיס','ef-SHAR le-sha-LEM be-kar-TIS','Can I pay by card?'),p('cash','בְּמְזֻמָּן','be-me-zu-MAN','In cash'),p('tasty','טָעִים מְאוֹד','ta-IM me-OD','Very tasty','Masculine/general description.')]],
['numbers','shop','Count to four','Hebrew numbers have masculine and feminine forms. Here you learn feminine counting forms, commonly used when counting without a named noun. Numbers need a fuller agreement lesson later.','Count “three.”',2,[
p('one','אַחַת','a-KHAT','One','Feminine counting form.'),p('two','שְׁתַּיִם','SHTA-yim','Two','Feminine counting form.'),p('three','שָׁלוֹשׁ','sha-LOSH','Three','Feminine counting form.'),p('four','אַרְבַּע','AR-ba','Four','Feminine counting form.')]],
['numbersmore','shop','Five to eight','Say these out loud, then try reading without transliteration. These continue the feminine counting forms from the previous lesson.','Count “six.”',1,[
p('five','חָמֵשׁ','kha-MESH','Five'),p('six','שֵׁשׁ','shesh','Six'),p('seven','שֶׁבַע','SHE-va','Seven'),p('eight','שְׁמוֹנֶה','shmo-NE','Eight')]],
['prices','shop','How much is it?','Kama ze ole is a useful fixed price question. Shekel is singular; shkalim is plural. Eser is the feminine counting form of ten; eser shkalim is not the agreement pattern to copy.','Ask how much something costs.',0,[
p('cost','כַּמָּה זֶה עוֹלֶה','KA-ma ze o-LE','How much does it cost?'),p('nine','תֵּשַׁע','TE-sha','Nine','Feminine counting form.'),p('ten','עֶשֶׂר','E-ser','Ten','Feminine counting form; ten shekels is asara shkalim.'),p('expensive','זֶה יָקָר','ze ya-KAR','It is expensive')]],
['transport','shop','Catch your ride','Le- means to; sometimes it becomes la- when combined with “the.” Kartis is a ticket or card. Use the same useful nouns in new situations.','Ask for a ticket.',0,[
p('ticket','כַּרְטִיס, בְּבַקָּשָׁה','kar-TIS, be-va-ka-SHA','A ticket, please'),p('train','אֵיפֹה הָרַכֶּבֶת','EI-fo ha-ra-KE-vet','Where is the train?'),p('bus','אֵיפֹה הָאוֹטוֹבּוּס','EI-fo ha-o-to-BUS','Where is the bus?'),p('airport','לִנְמַל הַתְּעוּפָה, בְּבַקָּשָׁה','lin-MAL ha-te-u-FA, be-va-ka-SHA','To the airport, please')]],
['today','time','Today & tomorrow','These time words let you plan without learning all verb tenses at once. Makhar is tomorrow. Etmol is yesterday.','Suggest tomorrow.',1,[
p('today','הַיּוֹם','ha-YOM','Today'),p('tomorrow','מָחָר','ma-KHAR','Tomorrow'),p('yesterday','אֶתְמוֹל','et-MOL','Yesterday'),p('now','עַכְשָׁיו','akh-SHAV','Now')]],
['when','time','When shall we meet?','Matai asks when. Be- attaches to a time or place; ba- can include “the.” Learn these as chunks before unpacking all the prefix rules.','Ask when.',0,[
p('when','מָתַי','ma-TAI','When?'),p('morning','בַּבּוֹקֶר','ba-BO-ker','In the morning'),p('evening','בָּעֶרֶב','ba-E-rev','In the evening'),p('later','אַחַר כָּךְ','a-KHAR kakh','Later')]],
['days','time','Make a plan','Yom means day. The weekday names are combinations you will recognize on signs and opening hours. Shabbat is also the word for Saturday.','Say “Friday.”',2,[
p('sunday','יוֹם רִאשׁוֹן','yom ri-SHON','Sunday'),p('monday','יוֹם שֵׁנִי','yom she-NI','Monday'),p('friday','יוֹם שִׁשִּׁי','yom shi-SHI','Friday'),p('saturday','שַׁבָּת','sha-BAT','Saturday / Shabbat')]],
['meet','time','See you again','Many everyday expressions are best learned as useful complete phrases. Nitrae means “we will see one another.” It does not change with the gender of one speaker.','Arrange to see someone tomorrow.',0,[
p('seetomorrow','נִתְרָאֶה מָחָר','nit-ra-E ma-KHAR','See you tomorrow'),p('seesoon','נִתְרָאֶה בְּקָרוֹב','nit-ra-E be-ka-ROV','See you soon'),p('goodnight','לַיְלָה טוֹב','LAI-la tov','Good night'),p('shabbat','שַׁבָּת שָׁלוֹם','sha-BAT sha-LOM','Shabbat shalom','A greeting for the Jewish Sabbath, commonly used from Friday.')]],
['home','you','Where you live','Gar (masculine) and gara (feminine) mean live/reside in the present. The prefix be- attaches to a place name.','Say you live in Canada.',0,[
p('livecanada','אֲנִי גָּר בְּקָנָדָה','a-NI gar be-ka-NA-da','I live in Canada','Masculine speaker.',f('אֲנִי גָּרָה בְּקָנָדָה','a-NI GA-ra be-ka-NA-da','I live in Canada','Feminine speaker.')),p('home','בַּבַּיִת','ba-BA-yit','At home'),p('telaviv','בְּתֵל אָבִיב','be-tel a-VIV','In Tel Aviv'),p('jerusalem','בִּירוּשָׁלַיִם','bi-ru-sha-LA-yim','In Jerusalem')]],
['people','you','People around you','Hu means he; hi means she. Anakhnu means we. Hebrew uses gendered pronouns and agreement; learn the forms people use for themselves.','Say “we.”',2,[
p('he','הוּא','hu','He'),p('she','הִיא','hi','She'),p('we','אֲנַחְנוּ','a-NAKH-nu','We'),p('they','הֵם','hem','They (masculine / mixed group)','The feminine plural is hen: הֵן.')]],
['have','you','I have a question','Yesh li literally means “there is to me”: I have. Ein li means I do not have. Li is “to me”; shel means of.','Say you have time.',0,[
p('havetime','יֵשׁ לִי זְמַן','yesh li zman','I have time'),p('notime','אֵין לִי זְמַן','ein li zman','I don’t have time'),p('havequestion','יֵשׁ לִי שְׁאֵלָה','yesh li she-e-LA','I have a question'),p('mine','זֶה שֶׁלִּי','ze she-LI','This is mine','Use for a masculine noun or a general “this.”')]],
['learning','you','You’re learning Hebrew','Lomed/lomedet means learning. Oved/ovedet means working. Present-tense verbs agree with the subject, but not with person: ani lomed and hu lomed share a form.','Tell someone you are learning Hebrew.',0,[
p('learning','אֲנִי לוֹמֵד עִבְרִית','a-NI lo-MED iv-RIT','I am learning Hebrew','Masculine speaker.',f('אֲנִי לוֹמֶדֶת עִבְרִית','a-NI lo-ME-det iv-RIT','I am learning Hebrew','Feminine speaker.')),p('working','אֲנִי עוֹבֵד','a-NI o-VED','I am working','Masculine speaker.',f('אֲנִי עוֹבֶדֶת','a-NI o-VE-det','I am working','Feminine speaker.')),p('reading','אֲנִי קוֹרֵא','a-NI ko-RE','I am reading','Masculine speaker.',f('אֲנִי קוֹרֵאת','a-NI ko-RET','I am reading','Feminine speaker.')),p('writing','אֲנִי כּוֹתֵב','a-NI ko-TEV','I am writing','Masculine speaker.',f('אֲנִי כּוֹתֶבֶת','a-NI ko-TE-vet','I am writing','Feminine speaker.'))]],
['needs','together','Say what you need','Tsarikh/tsrikha means need. Efshar + infinitive is often an easy alternative when you do not want to choose a speaker form.','Ask to sit.',2,[
p('needhelp','אֲנִי צָרִיךְ עֶזְרָה','a-NI tsa-RIKH ez-RA','I need help','Masculine speaker.',f('אֲנִי צְרִיכָה עֶזְרָה','a-NI tsri-KHA ez-RA','I need help','Feminine speaker.')),p('needwater','אֲנִי צָרִיךְ מַיִם','a-NI tsa-RIKH MA-yim','I need water','Masculine speaker.',f('אֲנִי צְרִיכָה מַיִם','a-NI tsri-KHA MA-yim','I need water','Feminine speaker.')),p('sit','אֶפְשָׁר לָשֶׁבֶת','ef-SHAR la-SHE-vet','May I sit?'),p('enter','אֶפְשָׁר לְהִיכָּנֵס','ef-SHAR le-hi-ka-NES','May I come in?')]],
['describe','together','Describe what you see','Adjectives normally follow nouns and agree in gender and number. Kafe tov is good coffee. A definite phrase repeats ha- on the adjective too: ha-kafe ha-tov.','Describe the coffee positively.',0,[
p('goodcoffee','קָפֶה טוֹב','ka-FE tov','Good coffee'),p('coldwater','מַיִם קָרִים','MA-yim ka-RIM','Cold water','Mayim takes plural agreement.'),p('big','גָּדוֹל','ga-DOL','Big','Masculine singular; feminine is gdola.'),p('small','קָטָן','ka-TAN','Small','Masculine singular; feminine is ktana.')]],
['connect','together','Connect your thoughts','Ve- attaches to the next word and means and. Aval means but; ki means because. These connectors let you expand beyond memorized fragments.','You need to explain a reason. Choose “because.”',2,[
p('and','וְ','ve-','And','A prefix; it attaches to the next word and has pronunciation variants.'),p('but','אֲבָל','a-VAL','But'),p('because','כִּי','ki','Because'),p('why','לָמָּה','LA-ma','Why?')]],
['conversation','together','Your first real conversation','Bring it together: greet someone, introduce yourself, explain that you are learning, and ask a practical question. Try saying each response before you reveal it.','You are lost. Politely ask where the station is.',3,[
p('wholeintro','שָׁלוֹם, נָעִים מְאוֹד','sha-LOM, na-IM me-OD','Hello, nice to meet you'),p('wholelearn','אֲנִי לוֹמֵד עִבְרִית','a-NI lo-MED iv-RIT','I am learning Hebrew','Masculine speaker.',f('אֲנִי לוֹמֶדֶת עִבְרִית','a-NI lo-ME-det iv-RIT','I am learning Hebrew','Feminine speaker.')),p('wholewater','אֶפְשָׁר מַיִם, בְּבַקָּשָׁה','ef-SHAR MA-yim, be-va-ka-SHA','May I have water, please?'),p('wholestation','סְלִיחָה, אֵיפֹה הַתַּחֲנָה','sli-KHA, EI-fo ha-ta-kha-NA','Excuse me, where is the station?')]]
];
const expanded=[
['daily-routine','daily','A day in your life','Present-tense verbs describe habits as well as actions happening now. The verb agrees with the speaker: kam/kama, shote/shota, okhel/okhelet, holekh/holekhet.','Tell someone that you drink tea.',1,[
q('daily-rise','אֲנִי קָם מוּקְדָּם','אני קם מוקדם','a-NI kam muk-DAM','I get up early','Masculine speaker.',fq('אֲנִי קָמָה מוּקְדָּם','אני קמה מוקדם','a-NI KA-ma muk-DAM','I get up early','Feminine speaker; KA-ma is a common spoken stress.')),
q('daily-drink','אֲנִי שׁוֹתֶה תֵּה','אני שותה תה','a-NI sho-TE te','I drink tea','Masculine speaker.',fq('אֲנִי שׁוֹתָה תֵּה','אני שותה תה','a-NI sho-TA te','I drink tea','Feminine speaker.')),
q('daily-eat','אֲנִי אוֹכֵל בַּבַּיִת','אני אוכל בבית','a-NI o-KHEL ba-BA-yit','I eat at home','Masculine speaker.',fq('אֲנִי אוֹכֶלֶת בַּבַּיִת','אני אוכלת בבית','a-NI o-KHE-let ba-BA-yit','I eat at home','Feminine speaker.')),
q('daily-go','אֲנִי הוֹלֵךְ לָעֲבוֹדָה','אני הולך לעבודה','a-NI ho-LEKH la-a-vo-DA','I go to work','Masculine speaker.',fq('אֲנִי הוֹלֶכֶת לָעֲבוֹדָה','אני הולכת לעבודה','a-NI ho-LE-khet la-a-vo-DA','I go to work','Feminine speaker.'))]],
['daily-habits','daily','Often, sometimes, every day','Time expressions add detail without changing the present-tense verb. Kol yom means every day; lifamim means sometimes.','Explain that you study every day.',0,[
q('habit-study','אֲנִי לוֹמֵד כָּל יוֹם','אני לומד כל יום','a-NI lo-MED kol yom','I study every day','Masculine speaker.',fq('אֲנִי לוֹמֶדֶת כָּל יוֹם','אני לומדת כל יום','a-NI lo-ME-det kol yom','I study every day','Feminine speaker.')),
q('habit-sometimes','לִפְעָמִים','לפעמים','lif-a-MIM','Sometimes'),
q('habit-usually','בְּדֶרֶךְ כְּלָל','בדרך כלל','be-DE-rekh klal','Usually'),
q('habit-not-today','לֹא הַיּוֹם','לא היום','lo ha-YOM','Not today')]],
['daily-likes','daily','Things you like doing','Ohev/ohevet means like or love. Follow it with an infinitive to name an activity: likro, to read; likhtov, to write.','Say that you like reading.',0,[
q('like-read','אֲנִי אוֹהֵב לִקְרוֹא','אני אוהב לקרוא','a-NI o-HEV lik-RO','I like reading','Masculine speaker.',fq('אֲנִי אוֹהֶבֶת לִקְרוֹא','אני אוהבת לקרוא','a-NI o-HE-vet lik-RO','I like reading','Feminine speaker.')),
q('like-write','אֲנִי אוֹהֵב לִכְתּוֹב','אני אוהב לכתוב','a-NI o-HEV likh-TOV','I like writing','Masculine speaker.',fq('אֲנִי אוֹהֶבֶת לִכְתּוֹב','אני אוהבת לכתוב','a-NI o-HE-vet likh-TOV','I like writing','Feminine speaker.')),
q('like-learn','אֲנִי רוֹצֶה לִלְמוֹד','אני רוצה ללמוד','a-NI ro-TSE lil-MOD','I want to learn','Masculine speaker.',fq('אֲנִי רוֹצָה לִלְמוֹד','אני רוצה ללמוד','a-NI ro-TSA lil-MOD','I want to learn','Feminine speaker.')),
q('like-rest','אֶפְשָׁר לָנוּחַ','אפשר לנוח','ef-SHAR la-NU-akh','May I rest?','An impersonal request; lanuakh means to rest.')]],
['daily-weather','daily','Talk about the weather','Kham and kar can describe the weather without an overt “it is.” Geshem means rain; shemesh means sun. These are everyday conversation starters.','Mention that it is hot today.',0,[
q('weather-hot','חַם הַיּוֹם','חם היום','kham ha-YOM','It is hot today'),
q('weather-cold','קַר הַיּוֹם','קר היום','kar ha-YOM','It is cold today'),
q('weather-rain','יוֹרֵד גֶּשֶׁם','יורד גשם','yo-RED GE-shem','It is raining','Literally, rain is falling.'),
q('weather-sun','יֵשׁ שֶׁמֶשׁ','יש שמש','yesh SHE-mesh','It is sunny','Literally, there is sun.')]],
['people-family','peopleplus','Meet the family','Ze introduces a masculine noun; zot introduces a feminine noun. Sheli follows the noun and means my/mine.','Introduce your mother.',1,[
q('family-father','זֶה אַבָּא שֶׁלִּי','זה אבא שלי','ze A-ba she-LI','This is my father'),
q('family-mother','זֹאת אִמָּא שֶׁלִּי','זאת אימא שלי','zot I-ma she-LI','This is my mother'),
q('family-brother','זֶה אָחִי','זה אחי','ze a-KHI','This is my brother','Akhi is akh, brother, with the suffix meaning my.'),
q('family-sister','זֹאת אֲחוֹתִי','זאת אחותי','zot a-kho-TI','This is my sister')]],
['people-belongings','peopleplus','My bag, your book','Possession with shel lets you name whose thing you mean. Shelkha addresses one man; shelakh addresses one woman. Ha- marks a specific noun.','Ask where your phone is.',2,[
q('belong-book','זֶה הַסֵּפֶר שֶׁלִּי','זה הספר שלי','ze ha-SE-fer she-LI','This is my book'),
q('belong-bag','זֶה הַתִּיק שֶׁלְּךָ','זה התיק שלך','ze ha-tik shel-KHA','This is your bag','Speaking to one man.',fq('זֶה הַתִּיק שֶׁלָּךְ','זה התיק שלך','ze ha-tik she-LAKH','This is your bag','Speaking to one woman.')),
q('belong-phone','אֵיפֹה הַטֵּלֵפוֹן שֶׁלִּי','איפה הטלפון שלי','EI-fo ha-te-le-FON she-LI','Where is my phone?'),
q('belong-here','הַתִּיק כָּאן','התיק כאן','ha-tik kan','The bag is here')]],
['people-plurals','peopleplus','More than one person','Present-tense plural verbs also agree in gender. -im is used with masculine or mixed groups; -ot is used with all-feminine groups. The examples label the group explicitly.','Say that a group of women is studying Hebrew.',2,[
q('plural-study','אֲנַחְנוּ לוֹמְדִים בְּיַחַד','אנחנו לומדים ביחד','a-NAKH-nu lom-DIM be-YA-khad','We study together','Masculine or mixed group. An all-feminine group uses lomdot.'),
q('plural-live','הֵם גָּרִים כָּאן','הם גרים כאן','hem ga-RIM kan','They live here (masculine / mixed)','Hem and garim refer to a masculine or mixed group.'),
q('plural-f-study','הֵן לוֹמְדוֹת עִבְרִית','הן לומדות עברית','hen lom-DOT iv-RIT','They study Hebrew (feminine)','Hen and lomdot refer to an all-feminine group.'),
q('plural-home','אֲנַחְנוּ בַּבַּיִת','אנחנו בבית','a-NAKH-nu ba-BA-yit','We are at home','The prepositional phrase does not change with the group’s gender.')]],
['people-group','peopleplus','Speak to a group','Atem addresses a masculine or mixed group; aten addresses an all-feminine group. A group question needs plural agreement rather than ata/at.','Ask a group of women whether they are learning Hebrew.',1,[
q('group-m-live','אַתֶּם גָּרִים כָּאן','אתם גרים כאן','a-TEM ga-RIM kan','Do you live here? (masculine / mixed plural)','Addresses more than one person.'),
q('group-f-learn','אַתֶּן לוֹמְדוֹת עִבְרִית','אתן לומדות עברית','a-TEN lom-DOT iv-RIT','Are you learning Hebrew? (feminine plural)','Addresses a group of women.'),
q('group-m-ready','אַתֶּם מוּכָנִים','אתם מוכנים','a-TEM mu-kha-NIM','Are you ready? (masculine / mixed plural)'),
q('group-f-ready','אַתֶּן מוּכָנוֹת','אתן מוכנות','a-TEN mu-kha-NOT','Are you ready? (feminine plural)')]],
['calendar-week','calendar','The rest of the week','You already met Sunday, Monday, Friday, and Shabbat. Add the remaining weekdays. Ha-shavua means this week or the week in context.','Suggest Wednesday.',1,[
q('week-tuesday','יוֹם שְׁלִישִׁי','יום שלישי','yom shli-SHI','Tuesday'),
q('week-wednesday','יוֹם רְבִיעִי','יום רביעי','yom re-vi-I','Wednesday'),
q('week-thursday','יוֹם חֲמִישִׁי','יום חמישי','yom kha-mi-SHI','Thursday'),
q('week-this','הַשָּׁבוּעַ','השבוע','ha-sha-VU-a','This week')]],
['calendar-hours','calendar','At one, at two','Hours use feminine number forms. The prefix b- means at, with the pronunciation varying in these common time chunks. “At one” is ba-akhat, not be-ekhad.','Arrange something for two o’clock.',1,[
q('hour-one','בְּשָׁעָה אַחַת','בשעה אחת','be-sha-A a-KHAT','At one o’clock'),
q('hour-two','בְּשָׁעָה שְׁתַּיִם','בשעה שתיים','be-sha-A SHTA-yim','At two o’clock'),
q('hour-three','בְּשָׁעָה שָׁלוֹשׁ','בשעה שלוש','be-sha-A sha-LOSH','At three o’clock'),
q('hour-question','בְּאֵיזוֹ שָׁעָה','באיזו שעה','be-EI-zo sha-A','At what time?')]],
['calendar-quantities','calendar','Numbers that match','Kartis is masculine, so one ticket is kartis ekhad and two tickets is shnei kartisim. Kos is feminine: shtei kosot. Ten shekels uses asara, not the counting form eser.','Ask for two tickets.',1,[
q('count-one-ticket','כַּרְטִיס אֶחָד','כרטיס אחד','kar-TIS e-KHAD','One ticket'),
q('count-two-tickets','שְׁנֵי כַרְטִיסִים','שני כרטיסים','shnei kar-ti-SIM','Two tickets'),
q('count-two-glasses','שְׁתֵּי כּוֹסוֹת מַיִם','שתי כוסות מים','shtei ko-SOT MA-yim','Two glasses of water'),
q('count-ten-shekels','עֲשָׂרָה שְׁקָלִים','עשרה שקלים','a-sa-RA shka-LIM','Ten shekels')]],
['calendar-duration','calendar','How long does it take?','Kama zman asks how much time. Daka is a minute; dakot is the plural. Use a short time answer before building longer schedule questions.','Ask how long something takes.',0,[
q('duration-question','כַּמָּה זְמַן זֶה לוֹקֵחַ','כמה זמן זה לוקח','KA-ma zman ze lo-KE-akh','How long does it take?'),
q('duration-five','חָמֵשׁ דַּקּוֹת','חמש דקות','kha-MESH da-KOT','Five minutes'),
q('duration-ten-more','עוֹד עֶשֶׂר דַּקּוֹת','עוד עשר דקות','od E-ser da-KOT','Ten more minutes'),
q('duration-meeting','יֵשׁ לִי פְּגִישָׁה','יש לי פגישה','yesh li pgi-SHA','I have a meeting')]],
['stay-reserve','stay','Book a place to stay','Hazmana can mean reservation or order. Khadar means room. Le-laila ekhad means for one night; shnei leilot means two nights.','Say that you have a reservation.',0,[
q('stay-reservation','יֵשׁ לִי הַזְמָנָה','יש לי הזמנה','yesh li haz-ma-NA','I have a reservation'),
q('stay-room','אֶפְשָׁר חֶדֶר','אפשר חדר','ef-SHAR KHE-der','May I have a room?'),
q('stay-one-night','לְלַיְלָה אֶחָד','ללילה אחד','le-LAI-la e-KHAD','For one night'),
q('stay-two-nights','לִשְׁנֵי לֵילוֹת','לשני לילות','lish-NEI lei-LOT','For two nights')]],
['stay-arrive','stay','At reception','Kabbala is reception. The definite form ha-kabbala refers to the reception desk in context. Mafteakh, key, has the stress in the middle.','Ask for the room key.',1,[
q('stay-reception','אֵיפֹה הַקַּבָּלָה','איפה הקבלה','EI-fo ha-ka-ba-LA','Where is reception?'),
q('stay-key','מַפְתֵּחַ, בְּבַקָּשָׁה','מפתח, בבקשה','maf-TE-akh, be-va-ka-SHA','The key, please'),
q('stay-room-number','מָה מִסְפַּר הַחֶדֶר','מה מספר החדר','ma mis-PAR ha-KHE-der','What is the room number?'),
q('stay-lift','אֵיפֹה הַמַּעֲלִית','איפה המעלית','EI-fo ha-ma-a-LIT','Where is the elevator?')]],
['stay-problems','stay','Something in the room is wrong','Lo negates a statement. Oved/ovedet can mean working or functioning. Ein means there is no / there are no. Use the item’s gender, not the speaker’s.','Tell reception that the key does not work.',0,[
q('stay-key-broken','הַמַּפְתֵּחַ לֹא עוֹבֵד','המפתח לא עובד','ha-maf-TE-akh lo o-VED','The key does not work','Mafteakh is masculine.'),
q('stay-tv-broken','הַטֵּלֵוִיזְיָה לֹא עוֹבֶדֶת','הטלוויזיה לא עובדת','ha-te-le-VIZ-ya lo o-VE-det','The television does not work','Televizya is feminine.'),
q('stay-no-hot-water','אֵין מַיִם חַמִּים','אין מים חמים','ein MA-yim kha-MIM','There is no hot water'),
q('stay-other-room','אֶפְשָׁר חֶדֶר אַחֵר','אפשר חדר אחר','ef-SHAR KHE-der a-KHER','May I have another room?')]],
['stay-leave','stay','Before you leave','Pinuï ha-kheder refers to vacating the room. Learn practical questions as chunks; hotel policies and schedules vary, so ask rather than assume.','Ask what time you must leave the room.',0,[
q('stay-checkout','בְּאֵיזוֹ שָׁעָה פִּנּוּי הַחֶדֶר','באיזו שעה פינוי החדר','be-EI-zo sha-A pi-NU-i ha-KHE-der','What time is checkout?'),
q('stay-breakfast','אֲרוּחַת בּוֹקֶר כְּלוּלָה','ארוחת בוקר כלולה','a-ru-KHAT BO-ker klu-LA','Is breakfast included?','Arukha is feminine, so klula agrees with breakfast.'),
q('stay-leave-bag','אֶפְשָׁר לְהַשְׁאִיר כָּאן תִּיק','אפשר להשאיר כאן תיק','ef-SHAR le-hash-IR kan tik','May I leave a bag here?'),
q('stay-receipt','אֶפְשָׁר קַבָּלָה','אפשר קבלה','ef-SHAR ka-ba-LA','May I have a receipt?','Kabbala also means reception; context distinguishes the meanings.')]],
['market-groceries','market','A few things for home','Use a whole question or a noun request at a shop. Yesh lakhem asks whether the shop staff have something; the plural form is a common way to address the business.','Ask whether the shop has bread.',0,[
q('market-bread','יֵשׁ לָכֶם לֶחֶם','יש לכם לחם','yesh la-KHEM LE-khem','Do you have bread?','Lakhém addresses a masculine or mixed group, including shop staff as a group.'),
q('market-fruit','אֵיפֹה הַפֵּרוֹת','איפה הפירות','EI-fo ha-pe-ROT','Where is the fruit?'),
q('market-vegetables','אֵיפֹה הַיְרָקוֹת','איפה הירקות','EI-fo ha-ye-ra-KOT','Where are the vegetables?'),
q('market-bag','שַׂקִּית, בְּבַקָּשָׁה','שקית, בבקשה','sa-KIT, be-va-ka-SHA','A bag, please')]],
['market-amounts','market','How much would you like?','Kilo is masculine: kilo ekhad. Khatsi kilo means half a kilo. Ktsat and maspik are useful quantity words without a number.','Ask for half a kilo.',1,[
q('market-kilo','קִילוֹ אֶחָד','קילו אחד','KI-lo e-KHAD','One kilo'),
q('market-half','חֲצִי קִילוֹ','חצי קילו','kha-TSI KI-lo','Half a kilo'),
q('market-little','קְצָת, בְּבַקָּשָׁה','קצת, בבקשה','ktsat, be-va-ka-SHA','A little, please'),
q('market-enough','זֶה מַסְפִּיק','זה מספיק','ze mas-PIK','That is enough')]],
['market-table','market','Choose something to eat','Im means with; bli means without. These phrases express preferences, not a verified ingredient or allergy guarantee. Basar means meat; yarakot means vegetables.','Ask for something without meat.',0,[
q('market-no-meat','בְּלִי בָּשָׂר','בלי בשר','bli ba-SAR','Without meat'),
q('market-vegetables-side','עִם יְרָקוֹת','עם ירקות','im ye-ra-KOT','With vegetables'),
q('market-rice','אוֹרֶז, בְּבַקָּשָׁה','אורז, בבקשה','O-rez, be-va-ka-SHA','Rice, please'),
q('market-takeaway','לָקַחַת, בְּבַקָּשָׁה','לקחת, בבקשה','la-KA-khat, be-va-ka-SHA','To take away, please','Common when ordering food or a drink to go.')]],
['market-check','market','Check before you buy','Midá is size; tseva is color. Efshar + infinitive keeps a request impersonal. A question asks about the shop’s policy; it does not promise a right to return an item.','Ask whether you may try the item on.',1,[
q('market-other-size','יֵשׁ מִדָּה אַחֶרֶת','יש מידה אחרת','yesh mi-DA a-KHE-ret','Is there another size?'),
q('market-try-on','אֶפְשָׁר לִמְדּוֹד','אפשר למדוד','ef-SHAR lim-DOD','May I try it on?'),
q('market-other-color','יֵשׁ צֶבַע אַחֵר','יש צבע אחר','yesh TSE-va a-KHER','Is there another color?'),
q('market-exchange','אֶפְשָׁר לְהַחֲלִיף','אפשר להחליף','ef-SHAR le-ha-KHLIF','May I exchange it?')]],
['past-being','past','Where you were yesterday','Hayiti means I was and does not change with the speaker’s gender. Haya li means I had; lo haya li means I did not have. These past constructions do use a form of “to be.”','Say that you were here yesterday.',0,[
q('past-here','הָיִיתִי כָּאן אֶתְמוֹל','הייתי כאן אתמול','ha-YI-ti kan et-MOL','I was here yesterday'),
q('past-home','הָיִיתִי בַּבַּיִת','הייתי בבית','ha-YI-ti ba-BA-yit','I was at home'),
q('past-have-time','הָיָה לִי זְמַן','היה לי זמן','ha-YA li zman','I had time'),
q('past-no-time','לֹא הָיָה לִי זְמַן','לא היה לי זמן','lo ha-YA li zman','I did not have time')]],
['past-actions','past','Tell someone what you did','Many first-person past forms end in -ti. The first-person singular form is shared by masculine and feminine speakers. Learn the whole form; weak roots do not all follow one simple spelling rule.','Say that you studied Hebrew yesterday.',0,[
q('past-learn','לָמַדְתִּי עִבְרִית אֶתְמוֹל','למדתי עברית אתמול','la-MAD-ti iv-RIT et-MOL','I studied Hebrew yesterday','The same form is used by masculine and feminine speakers.'),
q('past-work','עָבַדְתִּי אֶתְמוֹל','עבדתי אתמול','a-VAD-ti et-MOL','I worked yesterday'),
q('past-go','הָלַכְתִּי לַתַּחֲנָה','הלכתי לתחנה','ha-LAKH-ti la-ta-kha-NA','I went to the station'),
q('past-speak','דִּבַּרְתִּי עִם חָבֵר','דיברתי עם חבר','di-BAR-ti im kha-VER','I spoke with a friend','The friend in this example is male; khavera means a female friend.')]],
['past-day','past','A meal and a purchase','Past-tense forms vary by verb pattern and root. Shatiti, akhalti, kaniti, and shilamti are all first-person forms; they do not change with the speaker’s gender.','Say that you paid by card.',3,[
q('past-drink','שָׁתִיתִי קָפֶה','שתיתי קפה','sha-TI-ti ka-FE','I drank coffee'),
q('past-eat','אָכַלְתִּי בַּבַּיִת','אכלתי בבית','a-KHAL-ti ba-BA-yit','I ate at home'),
q('past-buy','קָנִיתִי לֶחֶם','קניתי לחם','ka-NI-ti LE-khem','I bought bread'),
q('past-pay','שִׁלַּמְתִּי בְּכַרְטִיס','שילמתי בכרטיס','shi-LAM-ti be-kar-TIS','I paid by card')]],
['past-questions','past','Ask about yesterday','Second-person past forms distinguish the person addressed. Hayita/hayit means you were; kanita/kanit means you bought. First-person hevanti means I understood.','Explain that you did not understand the question.',3,[
q('past-where-you','אֵיפֹה הָיִיתָ','איפה היית','EI-fo ha-YI-ta','Where were you?','Speaking to one man.',fq('אֵיפֹה הָיִית','איפה היית','EI-fo ha-YIT','Where were you?','Speaking to one woman.')),
q('past-what-buy','מָה קָנִיתָ','מה קנית','ma ka-NI-ta','What did you buy?','Speaking to one man.',fq('מָה קָנִית','מה קנית','ma ka-NIT','What did you buy?','Speaking to one woman.')),
q('past-arrive','מָתַי הִגַּעְתָּ','מתי הגעת','ma-TAI hi-GA-ta','When did you arrive?','Speaking to one man.',fq('מָתַי הִגַּעְתְּ','מתי הגעת','ma-TAI hi-GAT','When did you arrive?','Speaking to one woman.')),
q('past-not-understand','לֹא הֵבַנְתִּי אֶת הַשְּׁאֵלָה','לא הבנתי את השאלה','lo he-VAN-ti et ha-she-e-LA','I did not understand the question','Et introduces the definite direct object here.')]],
['future-plans','future','What you will do tomorrow','First-person future forms often begin with alef. The same “I” form is used by masculine and feminine speakers. E-lekh, elmad, adaber, and ekne belong to different verb patterns.','Say that you will study Hebrew tomorrow.',0,[
q('future-learn','אֶלְמַד עִבְרִית מָחָר','אלמד עברית מחר','el-MAD iv-RIT ma-KHAR','I will study Hebrew tomorrow'),
q('future-go','אֵלֵךְ לָעֲבוֹדָה','אלך לעבודה','e-LEKH la-a-vo-DA','I will go to work'),
q('future-speak','אֲדַבֵּר אִתְּךָ מָחָר','אדבר איתך מחר','a-da-BER it-KHA ma-KHAR','I will talk with you tomorrow','Speaking to one man; the verb itself is the same for any speaker.',fq('אֲדַבֵּר אִתָּךְ מָחָר','אדבר איתך מחר','a-da-BER i-TAKH ma-KHAR','I will talk with you tomorrow','Speaking to one woman; the verb itself is unchanged.')),
q('future-buy','אֶקְנֶה כַּרְטִיס','אקנה כרטיס','ek-NE kar-TIS','I will buy a ticket')]],
['future-together','future','We can make a plan','The first-person plural future often begins with nun. Nipagesh means we will meet; nelekh means we will go. These forms are shared by masculine, feminine, and mixed groups.','Arrange to meet tomorrow.',0,[
q('future-meet','נִפָּגֵשׁ מָחָר','ניפגש מחר','ni-pa-GESH ma-KHAR','We will meet tomorrow'),
q('future-walk','נֵלֵךְ בְּרֶגֶל','נלך ברגל','ne-LEKH be-RE-gel','We will go on foot'),
q('future-we-learn','נִלְמַד בְּיַחַד','נלמד ביחד','nil-MAD be-YA-khad','We will study together'),
q('future-we-speak','נְדַבֵּר בְּעִבְרִית','נדבר בעברית','ne-da-BER be-iv-RIT','We will speak in Hebrew')]],
['future-intentions','future','Turn needs into plans','Want and need can be followed by an infinitive. The infinitive does not change with the speaker; rotse/rotsa and tsarikh/tsrikha do. These sentences express intentions rather than a conjugated future verb.','Say that you need to write a message.',1,[
q('intent-read','אֲנִי רוֹצֶה לִקְרוֹא סֵפֶר','אני רוצה לקרוא ספר','a-NI ro-TSE lik-RO SE-fer','I want to read a book','Masculine speaker.',fq('אֲנִי רוֹצָה לִקְרוֹא סֵפֶר','אני רוצה לקרוא ספר','a-NI ro-TSA lik-RO SE-fer','I want to read a book','Feminine speaker.')),
q('intent-message','אֲנִי צָרִיךְ לִכְתּוֹב הוֹדָעָה','אני צריך לכתוב הודעה','a-NI tsa-RIKH likh-TOV ho-da-A','I need to write a message','Masculine speaker.',fq('אֲנִי צְרִיכָה לִכְתּוֹב הוֹדָעָה','אני צריכה לכתוב הודעה','a-NI tsri-KHA likh-TOV ho-da-A','I need to write a message','Feminine speaker.')),
q('intent-ticket','אֲנִי צָרִיךְ לִקְנוֹת כַּרְטִיס','אני צריך לקנות כרטיס','a-NI tsa-RIKH lik-NOT kar-TIS','I need to buy a ticket','Masculine speaker.',fq('אֲנִי צְרִיכָה לִקְנוֹת כַּרְטִיס','אני צריכה לקנות כרטיס','a-NI tsri-KHA lik-NOT kar-TIS','I need to buy a ticket','Feminine speaker.')),
q('intent-return','אֲנִי רוֹצֶה לַחֲזוֹר הַבַּיְתָה','אני רוצה לחזור הביתה','a-NI ro-TSE la-kha-ZOR ha-BAI-ta','I want to go back home','Masculine speaker.',fq('אֲנִי רוֹצָה לַחֲזוֹר הַבַּיְתָה','אני רוצה לחזור הביתה','a-NI ro-TSA la-kha-ZOR ha-BAI-ta','I want to go back home','Feminine speaker.'))]],
['future-arrange','future','Work out the details','Tavo/tavoi asks one man/one woman about coming. Where and when can appear before a future verb. An impersonal efshar request avoids choosing an addressee form.','Ask where you will meet.',1,[
q('arrange-come','מָתַי תָּבוֹא','מתי תבוא','ma-TAI ta-VO','When will you come?','Speaking to one man.',fq('מָתַי תָּבוֹאִי','מתי תבואי','ma-TAI ta-VO-i','When will you come?','Speaking to one woman.')),
q('arrange-where','אֵיפֹה נִפָּגֵשׁ','איפה ניפגש','EI-fo ni-pa-GESH','Where will we meet?'),
q('arrange-call','אֶפְשָׁר לְהִתְקַשֵּׁר מָחָר','אפשר להתקשר מחר','ef-SHAR le-hit-ka-SHER ma-KHAR','May I call tomorrow?'),
q('arrange-evening','נִפָּגֵשׁ בָּעֶרֶב','ניפגש בערב','ni-pa-GESH ba-E-rev','We will meet in the evening')]],
['longer-connections','longer','Because, but, when, if','Use ki for because, aval for but, im for if, and the attached prefix kshe- for when. A longer sentence still consists of familiar short parts.','Suggest going to a café if there is time.',0,[
q('connect-if-time','אִם יֵשׁ זְמַן, נֵלֵךְ לְבֵית קָפֶה','אם יש זמן, נלך לבית קפה','im yesh zman, ne-LEKH le-veit ka-FE','If there is time, we will go to a café'),
q('connect-because-train','אֲנִי כָּאן כִּי הָרַכֶּבֶת מְאַחֶרֶת','אני כאן כי הרכבת מאחרת','a-NI kan ki ha-ra-KE-vet me-a-KHE-ret','I am here because the train is late','Rakevet is feminine, so meakheret agrees with the train.'),
q('connect-but-time','אֲנִי רוֹצֶה קָפֶה, אֲבָל אֵין לִי זְמַן','אני רוצה קפה, אבל אין לי זמן','a-NI ro-TSE ka-FE, a-VAL ein li zman','I want coffee, but I do not have time','Masculine speaker.',fq('אֲנִי רוֹצָה קָפֶה, אֲבָל אֵין לִי זְמַן','אני רוצה קפה, אבל אין לי זמן','a-NI ro-TSA ka-FE, a-VAL ein li zman','I want coffee, but I do not have time','Feminine speaker.')),
q('connect-when-home','כְּשֶׁאֲנִי בַּבַּיִת, אֲנִי קוֹרֵא','כשאני בבית, אני קורא','kshe-a-NI ba-BA-yit, a-NI ko-RE','When I am at home, I read','Masculine speaker.',fq('כְּשֶׁאֲנִי בַּבַּיִת, אֲנִי קוֹרֵאת','כשאני בבית, אני קוראת','kshe-a-NI ba-BA-yit, a-NI ko-RET','When I am at home, I read','Feminine speaker.'))]],
['longer-invitations','longer','An invitation and a kind refusal','A short rotse/rotsa + infinitive can be an informal invitation. Be-simkha accepts warmly; a reason or another-time phrase softens a refusal.','Accept an invitation warmly.',1,[
q('invite-coffee','רוֹצֶה לִשְׁתּוֹת קָפֶה','רוצה לשתות קפה','ro-TSE lish-TOT ka-FE','Would you like to have coffee?','Informal question to one man.',fq('רוֹצָה לִשְׁתּוֹת קָפֶה','רוצה לשתות קפה','ro-TSA lish-TOT ka-FE','Would you like to have coffee?','Informal question to one woman.')),
q('invite-gladly','בְּשִׂמְחָה','בשמחה','be-sim-KHA','Gladly'),
q('invite-cannot','מָחָר אֲנִי לֹא יָכוֹל','מחר אני לא יכול','ma-KHAR a-NI lo ya-KHOL','I cannot tomorrow','Masculine speaker.',fq('מָחָר אֲנִי לֹא יְכוֹלָה','מחר אני לא יכולה','ma-KHAR a-NI lo ye-kho-LA','I cannot tomorrow','Feminine speaker.')),
q('invite-another','אוּלַי בְּפַעַם אַחֶרֶת','אולי בפעם אחרת','u-LAI be-FA-am a-KHE-ret','Maybe another time')]],
['longer-messages','longer','A message you can actually send','Ba-derekh means on the way. Meakher/meakheret describes the person running late. These short updates make arrangements more realistic.','Tell someone you are on the way.',0,[
q('message-way','אֲנִי בַּדֶּרֶךְ','אני בדרך','a-NI ba-DE-rekh','I am on the way'),
q('message-late','אֲנִי מְאַחֵר בְּעֶשֶׂר דַּקּוֹת','אני מאחר בעשר דקות','a-NI me-a-KHER be-E-ser da-KOT','I am running ten minutes late','Masculine speaker.',fq('אֲנִי מְאַחֶרֶת בְּעֶשֶׂר דַּקּוֹת','אני מאחרת בעשר דקות','a-NI me-a-KHE-ret be-E-ser da-KOT','I am running ten minutes late','Feminine speaker.')),
q('message-address','אֶפְשָׁר לִשְׁלוֹחַ אֶת הַכְּתוֹבֶת','אפשר לשלוח את הכתובת','ef-SHAR lish-LO-akh et ha-kto-VET','Could you send the address?','An impersonal conversational request; et marks the definite object.'),
q('message-entrance','נִתְרָאֶה לְיַד הַכְּנִיסָה','נתראה ליד הכניסה','nit-ra-E le-YAD ha-kni-SA','See you by the entrance')]],
['longer-real-day','longer','Put your day into words','Use what you know in a hotel, at the station, and in a new conversation. Read each longer phrase in meaningful chunks before trying it without hints.','Politely ask what time the train leaves.',1,[
q('capstone-reservation','שָׁלוֹם, יֵשׁ לִי הַזְמָנָה לִשְׁנֵי לֵילוֹת','שלום, יש לי הזמנה לשני לילות','sha-LOM, yesh li haz-ma-NA lish-NEI lei-LOT','Hello, I have a reservation for two nights'),
q('capstone-train','סְלִיחָה, בְּאֵיזוֹ שָׁעָה יוֹצֵאת הָרַכֶּבֶת','סליחה, באיזו שעה יוצאת הרכבת','sli-KHA, be-EI-zo sha-A yo-TSET ha-ra-KE-vet','Excuse me, what time does the train leave?','Yotset is feminine to agree with rakevet.'),
q('capstone-learn','אֲנִי לוֹמֵד עִבְרִית כִּי אֲנִי גָּר כָּאן','אני לומד עברית כי אני גר כאן','a-NI lo-MED iv-RIT ki a-NI gar kan','I am learning Hebrew because I live here','Masculine speaker.',fq('אֲנִי לוֹמֶדֶת עִבְרִית כִּי אֲנִי גָּרָה כָּאן','אני לומדת עברית כי אני גרה כאן','a-NI lo-ME-det iv-RIT ki a-NI GA-ra kan','I am learning Hebrew because I live here','Feminine speaker.')),
q('capstone-thanks','תּוֹדָה עַל הָעֶזְרָה, נִתְרָאֶה מָחָר','תודה על העזרה, נתראה מחר','to-DA al ha-ez-RA, nit-ra-E ma-KHAR','Thank you for the help, see you tomorrow')]]
];
raw.push(...expanded);

export const lessons=raw.map(([id,unit,title,tip,scenario,response,phrases],index)=>({id,unit,title,tip,scenario,response,phrases,index,duration:4}));
export const allPhrases=lessons.flatMap(l=>l.phrases.map(p=>({...p,lesson:l.id})));
export const reference=[
{title:'A language with a long life',he:'עִבְרִית',body:'Hebrew belongs to the Northwest Semitic branch of the Afroasiatic language family. Biblical, Mishnaic, Medieval, and Modern Hebrew represent different periods and registers. Modern Hebrew became a community vernacular again in the late nineteenth and early twentieth centuries. Binah teaches contemporary everyday Israeli Hebrew; it is not a Biblical Hebrew course.'},
{title:'Reading from right to left',he:'מימין לשמאל',body:'Hebrew words run right to left. Numbers keep their left-to-right order, and English names do too. There are 22 letters and five additional word-final shapes: ך ם ן ף ץ. Print and handwriting look different; the tracing tab practices simplified print shapes, not a universal cursive stroke order.'},
{title:'Vowels you can see — and eventually infer',he:'נִקּוּד',body:'Niqqud are points and small marks that indicate vowels and other pronunciation details. Most everyday adult Hebrew is unpointed. Vav and yod can help represent vowels, but an unpointed word can have several readings. Learn both sound and spelling in context. Removing niqqud does not automatically create every standard full-spelling form.'},
{title:'Five core vowel sounds',he:'אַ אֶ אִ אֹ אֻ',body:'Modern Hebrew commonly has five vowel qualities: a (father), e (approximately bet), i (machine), o (approximately more, without a glide), u (rule). Pataḥ and most qamats are a; segol and tsere are e; ḥiriq is i; ḥolam is o; qubuts and shuruq are u. Qamats qatan is o. Sheva can be e or silent; context matters.'},
{title:'Consonants & pronunciation',he:'בּ ב · כּ כ · פּ פ · שׁ שׂ',body:'Bet/vet = b/v, kaf/khaf = k/kh, pe/fe = p/f. Shin/sin = sh/s, marked by a dot on the right/left. Kh is a friction sound like Scottish loch, not an English k. Ts sounds like cats. Alef and ayin are often silent or a glottal onset in mainstream speech, while other traditions preserve distinctions. Resh varies by speaker. Stress is often final, but not always.'},
{title:'Gender, number & respectful choices',he:'אֲנִי · אַתָּה · אַתְּ',body:'Nouns have grammatical gender. Adjectives, pronouns, numerals, and verbs can agree in gender and number. Masculine and feminine forms in this app describe grammar, not a rule about identity. Follow the forms a person uses. Settings changes both your speaker examples and the singular person addressed; notes say which one is involved. Hebrew has no single universally accepted gender-neutral singular pattern.'},
{title:'A sentence without “is”',he:'אֲנִי דָּן',body:'A simple present nominal sentence usually has no spoken equivalent of am/is/are: ani Dan = I am Dan. Negate with lo: ani lo Dan = I am not Dan. This does not mean Hebrew has no verb “to be”: haya exists and is used in other tenses and constructions. Present verbal clauses use a verb: ani kotev = I write / I am writing.'},
{title:'Prefixes & definiteness',he:'הַ־ · בְּ־ · לְ־ · מִ־ · וְ־',body:'Ha- usually marks “the.” Be- means in/at, le- to/for, mi- from, and ve- and. They attach to the next word, with pronunciation changes. Be + ha often becomes ba; le + ha often becomes la. Hebrew has no indefinite article equivalent to English a/an. Definite adjectives also take the article: ha-sefer ha-tov, the good book.'},
{title:'Roots, patterns & verbs',he:'שֹׁרֶשׁ · בִּנְיָן',body:'Many words share consonantal roots, often three consonants, combined with patterns. The seven conventional verb binyanim are Paal, Nifal, Piel, Pual, Hifil, Hufal, and Hitpael. A root and pattern can help you recognize relatives, but do not let you reliably guess every word. Present forms distinguish gender and number; past and future also mark person. Weak roots introduce changes.'},
{title:'Nouns, plurals & construct phrases',he:'סְמִיכוּת',body:'-im is a common masculine plural ending and -ot a common feminine one; exceptions are frequent. Learn a noun with its gender and plural. In a construct phrase (smikhut), two nouns form a relationship: beit sefer, school, literally house of a book. The first noun can change shape. Definiteness normally belongs on the final noun: beit ha-sefer.'},
{title:'Having, existence & prepositions',he:'יֵשׁ לִי · אֵין לִי · שֶׁלִּי',body:'Yesh and ein express existence and its absence. Yesh li means I have; ein li means I do not have. Shel expresses possession: sheli, mine/my; shelkha/shelakh, yours. Prepositions often take suffixes: li, to me; lekha/lakh, to you. Et marks many definite direct objects; it is not an English word-for-word translation.'},
{title:'Numbers & time',he:'אַחַת · אֶחָד',body:'Numbers have masculine and feminine forms. One and two agree in their own patterns; three through ten have forms that can look opposite to familiar noun endings. Counting forms are not enough to construct every price or age. Say asara shkalim for ten shekels, but eser for ten in the feminine counting series. Hours conventionally use feminine numerals; ages use ben/bat constructions.'},
{title:'From scaffolding to independence',he:'לְאַט לְאַט',body:'Start with sound, meaning, and a short useful phrase. Trace a few letters at a time. Then turn off transliteration, followed by vowel marks. Read signs and short native texts, listen to natural conversations, and speak with feedback. The app’s review intervals are a simple learning aid, not a promise of fluency or a formally calibrated CEFR rating.'}
];
export const sources=[
['Ben-Gurion University · beginner ulpan syllabus','https://in.bgu.ac.il/en/Global/Documents/OSP%20Docs/OSP_Courses_Syllabi/syllabus%20ulpan%20level%20aleph.pdf'],
['Ulpan La-Inyan · conversational course scope','https://ulpan.com/course-descriptions/'],
['Pealim · grammar, vocabulary & inflection','https://www.pealim.com/'],
['HebrewPod101 · introductions','https://www.hebrewpod101.com/lesson/can-do-hebrew-for-absolute-beginners-3-how-to-introduce-yourself-examples-and-variations?lp=150'],
['W3C · Hebrew script & text layout','https://www.w3.org/International/hlreq/hebr/'],
['Unicode · Hebrew script specification','https://www.unicode.org/versions/Unicode16.0.0/core-spec/chapter-9/']
];
