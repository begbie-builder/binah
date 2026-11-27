import {emptyGame,sanitizeGame,mergeGame,reconcileFreezes,streakDays} from './game.js';
export const SCHEMA = 1;
export const dayKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
export function emptyProgress() { return {version:SCHEMA, name:'', form:'m', transliteration:true, vowels:true, goal:30, completed:{}, cards:{}, traced:[], activity:{}, game:emptyGame(), updatedAt:0}; }
export function normalize(text) { return String(text).normalize('NFD').replace(/[\u0591-\u05C7]/g,'').replace(/[.,!?…״׳'"־–—:;،]/g,'').replace(/\s+/g,' ').trim().toLowerCase(); }
export function sanitize(raw) {
  if (!raw || typeof raw !== 'object' || raw.version !== SCHEMA) return emptyProgress();
  const p = emptyProgress();
  p.name = typeof raw.name === 'string' ? raw.name.slice(0,60) : '';
  p.form = raw.form === 'f' ? 'f' : 'm';
  p.transliteration = raw.transliteration !== false; p.vowels = raw.vowels !== false;
  p.goal = [20,30,50].includes(raw.goal) ? raw.goal : 30;
  for (const [k,v] of Object.entries(raw.completed || {}).slice(0,200)) if (/^[\w-]+$/.test(k) && !['__proto__','constructor','prototype'].includes(k) && Number.isFinite(v) && v>=0) p.completed[k]=v;
  for (const [k,v] of Object.entries(raw.activity || {}).slice(-730)) if (/^\d{4}-\d{2}-\d{2}$/.test(k) && Number.isFinite(v) && v>=0) p.activity[k]=Math.min(v,10000);
  p.traced = Array.isArray(raw.traced) ? [...new Set(raw.traced.filter(x => typeof x==='string' && /^[א-ת]$/.test(x)))] : [];
  for (const [k,v] of Object.entries(raw.cards || {}).slice(0,1000)) if (/^[\w-]+$/.test(k) && !['__proto__','constructor','prototype'].includes(k) && v && Number.isFinite(v.due) && Number.isFinite(v.box) && Number.isFinite(v.updatedAt)) p.cards[k]={due:v.due,box:Math.max(0,Math.min(5,v.box)),updatedAt:v.updatedAt};
  p.game=sanitizeGame(raw.game);
  p.updatedAt = Number.isFinite(raw.updatedAt) ? raw.updatedAt : 0;
  return p;
}
export function mergeProgress(a,b) {
  a=sanitize(a); b=sanitize(b);
  const latest = a.updatedAt>=b.updatedAt ? a : b;
  const cards={...b.cards}; for (const [k,v] of Object.entries(a.cards)) if (!cards[k] || v.updatedAt>=cards[k].updatedAt) cards[k]=v;
  const activity={...a.activity}; for (const [k,v] of Object.entries(b.activity)) activity[k]=Math.max(v,activity[k]||0);
  const completed={...a.completed}; for(const [k,v] of Object.entries(b.completed)) completed[k]=Math.max(v,completed[k]||0);
  return sanitize({...latest,completed,cards,activity,game:mergeGame(a.game,b.game),traced:[...new Set([...a.traced,...b.traced])]});
}
export function award(p,xp,now=new Date()) { p=reconcileFreezes(p,now); const day=dayKey(now); return {...p,activity:{...p.activity,[day]:(p.activity[day]||0)+xp},updatedAt:now.getTime()}; }
export function scheduleCard(p,id,correct,now=Date.now()) {
  const old=p.cards[id]; const box=correct?Math.min((old?.box||0)+1,5):0;
  const days=[0,1,3,7,14,30][box];
  return {...p,cards:{...p.cards,[id]:{box,due:now+(correct?days*86400000:600000),updatedAt:now}},updatedAt:now};
}
export function streak(p,now=new Date()) {return streakDays(p,now);}
export function totalXP(p){return Object.values(p.activity).reduce((a,b)=>a+b,0);}
export function shuffled(items,rng=Math.random){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
export function variant(phrase,form){ return form==='f' && phrase.f ? {...phrase,...phrase.f} : phrase; }
export function makeSession(lesson,form='m') {
  const phrases=lesson.phrases.map(p=>variant(p,form));
  const learn=phrases.map(p=>({type:'learn',phrase:p}));
  const choices=phrases.map(p=>({type:'choice',phrase:p,options:shuffled(phrases.map(x=>x.en)),answer:p.en}));
  const p=phrases[0], q=phrases[1];
  return [...learn,...shuffled(choices),{type:'build',phrase:p,answer:p.he,tokens:shuffled(p.he.split(' '))},{type:'type',phrase:q,answer:q.he},{type:'scenario',prompt:lesson.scenario,phrase:phrases[lesson.response||0],answer:phrases[lesson.response||0].he,options:shuffled(phrases.map(x=>x.he))}];
}
export function nextLesson(lessons,p){return lessons.find(x=>!p.completed[x.id])||lessons[0];}

export function answerMatches(step,value,ordinary=step.phrase?.unpointed){
 return normalize(value)===normalize(step.answer)||(step.type==='type'&&typeof ordinary==='string'&&normalize(value)===normalize(ordinary));
}
export function typeGhostTarget(phrase){
 if(!phrase) return '';
 if(typeof phrase.unpointed==='string'&&phrase.unpointed.trim()) return phrase.unpointed.trim();
 return normalize(phrase.he||'');
}
const cleanTypeText=text=>String(text).normalize('NFD').replace(/[\u0591-\u05C7]/g,'').replace(/[.,!?…״׳'\"־–—:;،]/g,'');
export function nextTypeChar(target,typed){
 const cleanTarget=cleanTypeText(target||'').trim();
 const cleanTyped=cleanTypeText(typed||'');
 let i=0;
 while(i<cleanTarget.length&&i<cleanTyped.length&&cleanTarget[i]===cleanTyped[i]) i++;
 return i<cleanTarget.length?cleanTarget[i]:'';
}
