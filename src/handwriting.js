// Whole-letter shape recognition for recall rounds. Guidance still uses Hanzi
// Writer; this checker tolerates pen lifts, direction and stroke-order choices.
import {hebrewWriterData} from './hebrew-writer-data.js';
const length=paths=>paths.reduce((n,path)=>n+path.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p[0]-path[i][0],p[1]-path[i][1]),0),0);
function sample(paths,step=1){const out=[];for(const path of paths){if(path.length)out.push(path[0]);for(let i=1;i<path.length;i++){const a=path[i-1],b=path[i],count=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/step));for(let k=1;k<=count;k++)out.push([a[0]+(b[0]-a[0])*k/count,a[1]+(b[1]-a[1])*k/count]);}}return out.filter((_,i)=>i%Math.max(1,Math.ceil(out.length/900))===0);}
const box=points=>{const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);return {cx:(Math.min(...xs)+Math.max(...xs))/2,cy:(Math.min(...ys)+Math.max(...ys))/2,w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)};};
const near=(p,points,r)=>points.some(q=>(p[0]-q[0])**2+(p[1]-q[1])**2<=r*r);
function fit(char,drawn){
 const routes=hebrewWriterData[char].guides,ink=sample(drawn),target=sample(routes);
 if(ink.length<8||length(drawn)<8)return {coverage:0,precision:0,quality:0,pass:false};
 const a=box(ink),b=box(target),scale=Math.max(.85,Math.min(1.18,Math.hypot(b.w,b.h)/Math.max(1,Math.hypot(a.w,a.h))));
 const dx=Math.max(-8,Math.min(8,b.cx-a.cx)),dy=Math.max(-8,Math.min(8,b.cy-a.cy));
 const aligned=ink.map(([x,y])=>[(x-a.cx)*scale+a.cx+dx,(y-a.cy)*scale+a.cy+dy]);
 const coverage=target.filter(p=>near(p,aligned,4.8)).length/target.length,precision=aligned.filter(p=>near(p,target,5.6)).length/aligned.length;
 const everyRoute=routes.every(route=>{const points=sample([route]);return points.filter(p=>near(p,aligned,5.3)).length/points.length>=.72;});
 const ratio=length(drawn)*scale/length(routes),quality=.6*coverage+.4*precision;
 return {coverage:Math.round(coverage*100),precision:Math.round(precision*100),quality,pass:coverage>=.85&&precision>=.82&&everyRoute&&ratio>=.58&&ratio<=1.9};
}
export function recognizeHandwriting(char,drawn){
 const expected=fit(char,drawn);
 if(expected.pass)return {...expected,match:char};
 let best={char,quality:expected.quality};
 for(const candidate of Object.keys(hebrewWriterData)){if(candidate===char)continue;const score=fit(candidate,drawn);if(score.pass&&score.quality>best.quality+.07)best={char:candidate,quality:score.quality};}
 return {...expected,match:best.char!==char?best.char:null};
}
const svgNS='http://www.w3.org/2000/svg';
const element=(name,attrs={})=>{const el=document.createElementNS(svgNS,name);for(const [key,value]of Object.entries(attrs))el.setAttribute(key,value);return el;};
function smooth(points){if(!points.length)return '';if(points.length===1)return `M${points[0]}l.01,.01`;let d=`M${points[0]}`;for(let i=1;i<points.length-1;i++){const p=points[i],q=points[i+1];d+=`Q${p} ${(p[0]+q[0])/2},${(p[1]+q[1])/2}`;}return d+`L${points.at(-1)}`;}
export function mountHandwriting(host,letter,{onChange=()=>{},onHint=()=>{}}={}){
 const svg=element('svg',{viewBox:'0 0 100 100','aria-hidden':'true',class:'handwriting-svg'}),guide=element('g'),ink=element('g');
 guide.append(element('path',{d:'M8,21H92 M8,78H92',class:'writing-rules'}));
 const ghost=element('path',{d:letter.path,transform:'translate(-6 -6) scale(1.12)',class:'writing-ghost',visibility:'hidden'});guide.append(ghost);svg.append(guide,ink);host.append(svg);
 const abort=new AbortController();let paths=[],active=null,hinted=false,locked=false;
 const point=e=>{const r=svg.getBoundingClientRect();return [(e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100];};
 const notify=()=>onChange({strokes:paths.length,hasInk:length(paths)>8,hinted});
 function draw(){ink.replaceChildren(...paths.map(path=>element('path',{d:smooth(path),class:'writing-ink'})));notify();}
 function release(){const id=active;active=null;if(id!==null&&svg.hasPointerCapture(id))svg.releasePointerCapture(id);}
 svg.addEventListener('pointerdown',e=>{if(locked||active!==null||!e.isPrimary||e.button!==0||paths.length>=30)return;e.preventDefault();active=e.pointerId;svg.setPointerCapture(active);paths.push([point(e)]);draw();},{signal:abort.signal});
 svg.addEventListener('pointermove',e=>{if(e.pointerId!==active)return;e.preventDefault();const events=e.getCoalescedEvents?.();for(const p of events?.length?events:[e]){const next=point(p),last=paths.at(-1).at(-1);if(Math.hypot(next[0]-last[0],next[1]-last[1])>.15&&paths.at(-1).length<2500)paths.at(-1).push(next);}draw();},{signal:abort.signal});
 svg.addEventListener('pointerup',e=>{if(e.pointerId!==active)return;paths.at(-1).push(point(e));release();draw();},{signal:abort.signal});
 const cancel=e=>{if(e.pointerId===active){active=null;paths.pop();draw();}};
 svg.addEventListener('pointercancel',cancel,{signal:abort.signal});svg.addEventListener('lostpointercapture',cancel,{signal:abort.signal});
 notify();
 return {clear(){release();paths=[];locked=false;draw();},undo(){release();paths.pop();draw();},hint(){hinted=true;ghost.setAttribute('visibility','visible');onHint();notify();},check(){release();return {...recognizeHandwriting(letter.char,paths),hinted};},lock(){release();locked=true;},destroy(){abort.abort();release();svg.remove();},get paths(){return paths;}};
}
