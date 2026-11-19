import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyProgress,award,mergeProgress,sanitize,streak,totalXP} from '../src/engine.js';
import {reconcileFreezes,freezeStock,buyFreeze,sparkBalance,claimQuest,recordLesson,recordLetter,dailyQuests,finishWritingGroup,levelState} from '../src/game.js';
const date=(d,h=12)=>new Date(d+'T'+String(h).padStart(2,'0')+':00:00');
const rich=()=>({...emptyProgress(),completed:{a:1,b:1,c:1,d:1,e:1,f:1,g:1,h:1}});
test('starter freeze protects a closed missed day across a month boundary without inventing XP',()=>{
 let p=award(emptyProgress(),30,date('2026-01-31'));p=reconcileFreezes(p,date('2026-02-02'));
 assert.ok(p.game.freezes['2026-02-01']);assert.equal(freezeStock(p),0);assert.equal(streak(p,date('2026-02-02')),2);assert.equal(totalXP(p),30);assert.equal(p.activity['2026-02-01'],undefined);
 const again=reconcileFreezes(p,date('2026-02-02'));assert.deepEqual(again,p);
 p=reconcileFreezes(p,date('2026-02-03'));assert.equal(streak(p,date('2026-02-03')),0,'An empty stock cannot bridge another missed day');
});
test('equipping is affordable, capped, and a later purchase cannot repair a past gap',()=>{
 assert.equal(buyFreeze(emptyProgress(),date('2026-01-31')).ok,false);
 let p=award(rich(),30,date('2026-01-31'));const purchase=buyFreeze(p,date('2026-01-31'));assert.equal(purchase.ok,true);p=purchase.progress;assert.equal(sparkBalance(p),60);assert.equal(freezeStock(p),2);assert.equal(buyFreeze(p,date('2026-01-31')).ok,false);
 p=reconcileFreezes(p,date('2026-02-04'));assert.equal(freezeStock(p),0);assert.equal(streak(p,date('2026-02-04')),0);
 p=buyFreeze(p,date('2026-02-04')).progress;assert.equal(freezeStock(p),1);assert.equal(streak(p,date('2026-02-04')),0);assert.equal(p.game.freezes['2026-02-03'],undefined);
});
test('merging concurrent freeze purchases spends once and preserves both devices’ progress',()=>{
 const base=award(rich(),30,date('2026-01-31'));const a=buyFreeze(base,date('2026-01-31',13)).progress,b=buyFreeze(base,date('2026-01-31',14)).progress;
 const merged=mergeProgress(a,b);assert.equal(Object.keys(merged.game.purchases).length,1);assert.equal(freezeStock(merged),2);assert.equal(sparkBalance(merged),60);assert.deepEqual(mergeProgress(merged,merged),merged);
});
test('quests require actual activity, unique letters and explicit one-time claims',()=>{
 const now=date('2026-11-18');let p=award(emptyProgress(),30,now);assert.equal(claimQuest(p,'lesson',now),p);
 p=recordLesson(p,'hello',now);p=recordLesson(p,'hello',now);p=recordLetter(p,'א',now);p=recordLetter(p,'א',now);p=recordLetter(p,'ב',now);
 assert.equal(dailyQuests(p,now).find(q=>q.id==='letters').complete,false);
 p=recordLetter(p,'ג',now);assert.ok(dailyQuests(p,now).every(q=>q.complete));
 for(const q of dailyQuests(p,now))p=claimQuest(p,q.id,now);
 assert.equal(sparkBalance(p),30);assert.equal(claimQuest(p,'intention',now),p);assert.equal(totalXP(p),30);
 const remote=recordLetter(award(emptyProgress(),20,now),'ד',now),merged=mergeProgress(p,remote);assert.equal(sparkBalance(merged),30);assert.equal(merged.game.days['2026-11-18'].letters.length,4);
});
test('writing stars preserve best performance; repeats, hints and skipped practice cannot farm rewards',()=>{
 const now=date('2026-11-18');let p=emptyProgress();
 let result=finishWritingGroup(p,'first-letters',{kind:'learn',completed:false},now);assert.equal(result.xp,0);assert.equal(result.passed,false);assert.equal(result.progress.game.writing['first-letters'].learnedAt,0);
 result=finishWritingGroup(p,'first-letters',{kind:'test',accuracy:1,timed:true,elapsedMs:45000},now);assert.equal(result.stars,3);assert.equal(result.xp,20);p=sanitize(result.progress);
 result=finishWritingGroup(p,'first-letters',{kind:'test',accuracy:1,hints:1,timed:true,elapsedMs:60000},now);assert.equal(result.stars,2);assert.equal(result.xp,0);assert.equal(result.progress.game.writing['first-letters'].stars,3);assert.equal(result.progress.game.writing['first-letters'].bestMs,45000);assert.equal(sparkBalance(result.progress),15);
 result=finishWritingGroup(result.progress,'first-letters',{kind:'test',accuracy:5/6,mistakes:1,timed:false,elapsedMs:5000},now);assert.equal(result.stars,1);assert.equal(result.progress.game.writing['first-letters'].bestMs,45000);
});
test('old backups gain safe defaults; rewards reject malformed or prototype-bearing data',()=>{
 const old={...emptyProgress()};delete old.game;assert.equal(freezeStock(sanitize(old)),1);
 const bad=JSON.parse('{"version":1,"writing":{"__proto__":{"stars":99}},"days":{"2026-02-31":{"claims":["lesson"]},"2026-11-18":{"claims":["lesson","lesson","bad"],"lessons":["__proto__","hello"],"letters":["א","א","bad"]}},"purchases":{"p1":-1},"freezes":{"no":1}}');
 const p=sanitize({...old,game:bad});assert.equal(Object.getPrototypeOf(p.game.writing),Object.prototype);assert.deepEqual(p.game.writing,{});assert.equal(p.game.days['2026-02-31'],undefined);assert.deepEqual(p.game.days['2026-11-18'].claims,['lesson']);assert.deepEqual(p.game.days['2026-11-18'].letters,['א']);assert.equal(levelState(award(old,60,date('2026-11-18'))).level,2);
});
