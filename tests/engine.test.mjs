import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyProgress,sanitize,mergeProgress,normalize,award,scheduleCard,streak,dayKey,totalXP,variant,makeSession,nextLesson} from '../src/engine.js';
import {lessons,allPhrases,units} from '../src/curriculum.js';
import {alphabet} from '../src/alphabet.js';
import {scoreTrace} from '../src/trace.js';
test('Hebrew input ignores niqqud, punctuation, and extra spaces but preserves word order',()=>{
 assert.equal(normalize('  בּוֹקֶר   טוֹב! '),normalize('בוקר טוב'));assert.notEqual(normalize('טוב בוקר'),normalize('בוקר טוב'));assert.notEqual(normalize('שלום'),normalize('שלם'));
});
test('streak crosses month boundary and allows an unfinished today',()=>{
 let p=emptyProgress();p=award(p,30,new Date(2026,0,31,15));p=award(p,10,new Date(2026,1,1,15));assert.equal(streak(p,new Date(2026,1,2,10)),2);assert.equal(streak(p,new Date(2026,1,3,10)),0);assert.equal(totalXP(p),40);
});
test('review mistakes come back sooner and correct recalls increase interval',()=>{
 let p=emptyProgress();p=scheduleCard(p,'shalom',true,1000);assert.equal(p.cards.shalom.due,86401000);p=scheduleCard(p,'shalom',true,2000);assert.equal(p.cards.shalom.due,3*86400000+2000);p=scheduleCard(p,'shalom',false,3000);assert.equal(p.cards.shalom.box,0);assert.equal(p.cards.shalom.due,603000);
});
test('merge preserves progress from both devices, is idempotent, does not duplicate XP',()=>{
 const a={...emptyProgress(),name:'A',updatedAt:20,completed:{hello:10},traced:['א'],activity:{'2026-01-01':30},cards:{shalom:{box:2,due:200,updatedAt:20}}};
 const b={...emptyProgress(),name:'B',updatedAt:10,completed:{name:15},traced:['ב'],activity:{'2026-01-01':50,'2026-01-02':30},cards:{shalom:{box:1,due:100,updatedAt:10},ani:{box:1,due:200,updatedAt:10}}};
 const merged=mergeProgress(a,b);assert.deepEqual(merged.completed,{hello:10,name:15});assert.equal(totalXP(merged),80);assert.equal(merged.name,'A');assert.equal(merged.cards.shalom.box,2);assert.equal(merged.cards.ani.box,1);assert.deepEqual(new Set(merged.traced),new Set(['א','ב']));assert.deepEqual(mergeProgress(merged,merged),merged);
});
test('import sanitization rejects unknown schema, clamps values, and blocks special keys',()=>{
 assert.deepEqual(sanitize({version:99}),emptyProgress());const raw=JSON.parse('{"version":1,"name":"<script>","cards":{"__proto__":{"box":1,"due":1,"updatedAt":1}},"activity":{"bad":8,"2026-01-01":-3},"traced":["א","א","bad"],"form":"unexpected"}');const p=sanitize(raw);assert.equal(p.form,'m');assert.deepEqual(p.traced,['א']);assert.deepEqual(p.activity,{});assert.equal(Object.getPrototypeOf(p.cards),Object.prototype);assert.equal(p.name,'<script>');
});
test('all 32 lessons are connected, fully playable, and have unambiguous answer sets',()=>{
 assert.equal(lessons.length,32);assert.equal(units.length,8);assert.equal(allPhrases.length,128);assert.equal(new Set(allPhrases.map(x=>x.id)).size,128);assert.equal(new Set(lessons.map(x=>x.id)).size,32);
 for(const l of lessons){assert.ok(units.some(u=>u.id===l.unit));assert.equal(l.phrases.length,4);for(const form of ['m','f']){const steps=makeSession(l,form);assert.equal(steps.length,11);for(const s of steps){if(s.options){assert.equal(new Set(s.options).size,s.options.length);assert.ok(s.options.includes(s.answer));}if(s.type==='build')assert.equal(normalize(s.tokens.join(' ').split(' ').sort().join(' ')),normalize(s.answer.split(' ').sort().join(' ')));}}}
 assert.equal(nextLesson(lessons,emptyProgress()).id,'hello');assert.equal(nextLesson(lessons,{completed:{hello:1}}).id,'name');
});
test('speaker and addressee variants are distinct and preserve phrase identity',()=>{
 const name=allPhrases.find(x=>x.id==='nameq');assert.notEqual(variant(name,'m').he,variant(name,'f').he);assert.equal(variant(name,'f').id,name.id);assert.equal(variant(allPhrases.find(x=>x.id==='korim'),'f').he,'קוֹרְאִים לִי');
});
test('all 27 tracing guides pass with their correct path; blank/short/off-target fail',()=>{
 assert.equal(alphabet.length,27);assert.equal(new Set(alphabet.map(x=>x.char)).size,27);
 for(const l of alphabet){assert.equal(scoreTrace(l.strokes,l.strokes).pass,true,l.name);assert.equal(scoreTrace(l.strokes,[]).pass,false);assert.equal(scoreTrace(l.strokes,[[[0,0],[5,0]]]).pass,false);}
 assert.equal(scoreTrace(alphabet[0].strokes,[[[0,0],[100,0],[100,100],[0,100],[0,0]]]).pass,false);
 assert.equal(scoreTrace(alphabet[0].strokes,[alphabet[0].strokes[0]]).pass,false);
});
