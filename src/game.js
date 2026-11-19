// Local-first, mergeable rewards. Sparks have no monetary value.
const key=(date=new Date())=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const prior=(day,n=1)=>{const d=new Date(day+'T12:00:00');d.setDate(d.getDate()-n);return key(d);};
const validDay=d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&!Number.isNaN(Date.parse(d))&&new Date(d+'T12:00:00Z').toISOString().slice(0,10)===d;
const safeId=s=>typeof s==='string'&&/^[\w-]{1,80}$/.test(s)&&!['__proto__','constructor','prototype'].includes(s);
const finite=n=>Number.isFinite(n)&&n>=0;
const list=(v,filter,limit)=>Array.isArray(v)?[...new Set(v.filter(filter))].slice(0,limit):[];
export const FREEZE_COST=60,FREEZE_CAP=2;
export const QUESTS=[{id:'intention',title:'Meet your daily intention',reward:10},{id:'lesson',title:'Finish a conversation lesson',reward:10},{id:'letters',title:'Write three different letters',reward:10}];
export function emptyGame(){return {version:1,startedAt:0,checkedThrough:'',purchases:{},freezes:{},days:{},writing:{}};}
export function sanitizeGame(raw){
 const g=emptyGame();if(!raw||raw.version!==1)return g;
 g.startedAt=finite(raw.startedAt)?raw.startedAt:0;g.checkedThrough=validDay(raw.checkedThrough)?raw.checkedThrough:'';
 for(const [id,at] of Object.entries(raw.purchases||{}).slice(0,1000))if(/^p\d{1,6}$/.test(id)&&finite(at))g.purchases[id]=at;
 for(const [day,at] of Object.entries(raw.freezes||{}).slice(-730))if(validDay(day)&&finite(at))g.freezes[day]=at;
 for(const [day,r] of Object.entries(raw.days||{}).sort().slice(-730))if(validDay(day)&&r&&typeof r==='object')g.days[day]={lessons:list(r.lessons,safeId,200),letters:list(r.letters,c=>typeof c==='string'&&/^[א-ת]$/.test(c),27),claims:list(r.claims,id=>QUESTS.some(q=>q.id===id),3),groups:list(r.groups,safeId,40)};
 for(const [id,r] of Object.entries(raw.writing||{}).slice(0,40))if(safeId(id)&&r&&typeof r==='object')g.writing[id]={stars:Math.max(0,Math.min(3,Math.floor(r.stars)||0)),bestMs:finite(r.bestMs)?Math.min(r.bestMs,86400000):0,learnedAt:finite(r.learnedAt)?r.learnedAt:0,updatedAt:finite(r.updatedAt)?r.updatedAt:0};
 return g;
}
const union=(a=[],b=[])=>[...new Set([...a,...b])].sort();
const minPositive=(a,b)=>a&&b?Math.min(a,b):a||b||0;
export function mergeGame(a,b){
 a=sanitizeGame(a);b=sanitizeGame(b);const g=emptyGame();
 g.startedAt=minPositive(a.startedAt,b.startedAt);g.checkedThrough=[a.checkedThrough,b.checkedThrough].filter(Boolean).sort().at(-1)||'';
 for(const field of ['purchases','freezes'])for(const id of union(Object.keys(a[field]),Object.keys(b[field])))g[field][id]=Math.min(a[field][id]??Infinity,b[field][id]??Infinity);
 for(const day of union(Object.keys(a.days),Object.keys(b.days))){g.days[day]={};for(const field of ['lessons','letters','claims','groups'])g.days[day][field]=union(a.days[day]?.[field],b.days[day]?.[field]);}
 for(const id of union(Object.keys(a.writing),Object.keys(b.writing))){const x=a.writing[id]||{},y=b.writing[id]||{};g.writing[id]={stars:Math.max(x.stars||0,y.stars||0),bestMs:minPositive(x.bestMs,y.bestMs),learnedAt:minPositive(x.learnedAt,y.learnedAt),updatedAt:Math.max(x.updatedAt||0,y.updatedAt||0)};}
 return sanitizeGame(g);
}
export function sparkBalance(p){const g=p.game||emptyGame();return Math.max(0,Object.keys(p.completed||{}).length*15+(p.traced?.length||0)*3+Object.values(g.writing).reduce((n,r)=>n+r.stars*5,0)+Object.values(g.days).reduce((n,r)=>n+r.claims.length*10,0)-Object.keys(g.purchases).length*FREEZE_COST);}
export function freezeStock(p,through=Infinity){const g=p.game||emptyGame();return Math.max(0,Math.min(FREEZE_CAP,1+Object.values(g.purchases).filter(at=>at<=through).length-Object.values(g.freezes).filter(at=>at<=through).length));}
export function reconcileFreezes(p,now=new Date()){
 let g=sanitizeGame(p.game),today=key(now),yesterday=prior(today);
 if(!g.startedAt||!g.checkedThrough)return {...p,game:{...g,startedAt:now.getTime(),checkedThrough:yesterday}};
 if(g.checkedThrough>=yesterday)return p;
 const freezes={...g.freezes};let date=prior(g.checkedThrough,-1),guard=0;
 for(;date<=yesterday&&guard++<730;date=prior(date,-1)){
  const prev=prior(date),active=p.activity[prev]>0||Object.hasOwn(freezes,prev);
  if(active&&!p.activity[date]&&!Object.hasOwn(freezes,date)){
   const cutoff=new Date(date+'T23:59:59.999').getTime();
   const available=1+Object.values(g.purchases).filter(at=>at<=cutoff).length-Object.values(freezes).filter(at=>at<=cutoff).length;
   if(available>0)freezes[date]=cutoff;
  }
 }
 return {...p,game:{...g,freezes,checkedThrough:yesterday}};
}
export function streakDays(p,now=new Date()){
 const today=key(now);let day=p.activity[today]>0?today:prior(today),count=0;
 for(let i=0;i<730;i++){if(!(p.activity[day]>0||Object.hasOwn(p.game?.freezes||{},day)))break;count++;day=prior(day);}return count;
}
export function dailyQuests(p,now=new Date()){
 const day=key(now),r=p.game?.days[day]||{lessons:[],letters:[],claims:[]};
 return QUESTS.map(q=>{const value=q.id==='intention'?(p.activity[day]||0):q.id==='lesson'?r.lessons.length:r.letters.length,target=q.id==='intention'?p.goal:q.id==='lesson'?1:3;return {...q,value:Math.min(value,target),target,complete:value>=target,claimed:r.claims.includes(q.id)};});
}
function updateDay(p,now,field,value){const g=sanitizeGame(p.game),day=key(now),r=g.days[day]||{lessons:[],letters:[],claims:[],groups:[]};return {...p,game:{...g,days:{...g.days,[day]:{...r,[field]:union(r[field],[value])}}},updatedAt:now.getTime()};}
export const recordLesson=(p,id,now=new Date())=>updateDay(p,now,'lessons',id);
export const recordLetter=(p,char,now=new Date())=>updateDay(p,now,'letters',char);
export function claimQuest(p,id,now=new Date()){const q=dailyQuests(p,now).find(q=>q.id===id);return q?.complete&&!q.claimed?updateDay(p,now,'claims',id):p;}
export function buyFreeze(p,now=new Date()){
 p=reconcileFreezes(p,now);if(freezeStock(p)>=FREEZE_CAP)return {progress:p,ok:false,reason:'You already have two freezes.'};if(sparkBalance(p)<FREEZE_COST)return {progress:p,ok:false,reason:'Earn 60 sparks to equip another freeze.'};
 const g=sanitizeGame(p.game),serial=1+Math.max(0,...Object.keys(g.purchases).map(id=>Number(id.slice(1))));
 return {progress:{...p,game:{...g,purchases:{...g.purchases,['p'+serial]:now.getTime()}},updatedAt:now.getTime()},ok:true};
}
export function finishWritingGroup(p,id,{kind='learn',accuracy=1,mistakes=0,hints=0,elapsedMs=0,timed=false,completed=true}={},now=new Date()){
 const old=p.game?.writing[id]||{stars:0,bestMs:0,learnedAt:0},passed=kind==='learn'?completed:accuracy>=.8;
 const stars=kind==='test'&&passed?(accuracy===1&&!hints&&!mistakes?3:accuracy>=.9?2:1):old.stars;
 const r={stars:Math.max(old.stars,stars),bestMs:kind==='test'&&passed&&timed?minPositive(old.bestMs,Math.max(1000,Math.round(elapsedMs))):old.bestMs,learnedAt:kind==='learn'&&passed?old.learnedAt||now.getTime():old.learnedAt,updatedAt:now.getTime()};
 const g=sanitizeGame(p.game),already=g.days[key(now)]?.groups.includes(id+'-'+kind);
 let next={...p,game:{...g,writing:{...g.writing,[id]:r}},updatedAt:now.getTime()};
 if(passed)next=updateDay(next,now,'groups',id+'-'+kind);
 return {progress:next,stars:kind==='test'?(passed?stars:0):0,passed,xp:passed&&!already?(kind==='test'?20:10):0};
}
export function levelState(p){const xp=Object.values(p.activity||{}).reduce((a,b)=>a+b,0),level=1+Math.floor(Math.sqrt(xp/60)),floor=(level-1)**2*60,next=level**2*60;return {xp,level,floor,next,percent:Math.round((xp-floor)/(next-floor)*100)};}
export function achievements(p){const count=Object.keys(p.completed||{}).length,xp=levelState(p).xp,stars=Object.values(p.game?.writing||{}).reduce((n,r)=>n+r.stars,0);return [{id:'first',title:'First connection',detail:'Finish your first conversation lesson.',earned:count>=1},{id:'ten',title:'Finding your voice',detail:'Complete 10 conversation lessons.',earned:count>=10},{id:'week',title:'A week of Binah',detail:'Build a 7-day protected streak.',earned:streakDays(p)>=7},{id:'letters',title:'Every letter counts',detail:'Practice all 27 letter forms.',earned:p.traced.length>=27},{id:'writer',title:'Three-star writer',detail:'Earn your first three-star writing test.',earned:Object.values(p.game?.writing||{}).some(r=>r.stars===3)},{id:'spark',title:'A little brighter',detail:'Earn 500 XP.',earned:xp>=500}];}
