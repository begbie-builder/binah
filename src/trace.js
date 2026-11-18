import HanziWriter, {strokeMatches, parseCharData} from './vendor/hanzi-writer/hanzi-writer.js';
import {hebrewWriterData} from './hebrew-writer-data.js';

// Same matcher and tolerances as the interactive quiz, in Hanzi Writer's units.
export const HEBREW_TOLERANCES={leniency:1.1,averageDistanceThreshold:145,startAndEndDistanceThreshold:115};
const toInternal=([x,y])=>({x:(50+(x-50)*1.12)*10.24,y:900-(50+(y-50)*1.12)*10.24});
export function scoreTrace(guide,drawn){
 const character=parseCharData('',{strokes:guide.map(()=>''),medians:guide.map(s=>s.map(p=>{const q=toInternal(p);return [q.x,q.y];}))});
 let reached=0;
 for(let i=0;i<Math.min(guide.length,drawn.length);i++){
  if(!strokeMatches({points:drawn[i].map(toInternal)},character,i,{...HEBREW_TOLERANCES,isOutlineVisible:true}).isMatch)break;
  reached++;
 }
 return {pass:reached===guide.length&&drawn.length===guide.length,coverage:Math.round(reached/guide.length*100),precision:Math.round(reached/Math.max(1,drawn.length)*100),reached,total:guide.length};
}

// Hanzi Writer supplies SVG stroke reveal, smooth learner ink and per-stroke
// directional/shape grading. Only locally authored Hebrew data is loaded.
export function mountTrace(host,letter,onResult,{onChange=()=>{},onFeedback=()=>{}}={}){
 const data=hebrewWriterData[letter.char],total=data.medians.length;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let completed=0,mistakes=0,mode='guided',disposed=false,watching=false,operation=0,hinted=false;
 const svgNS='http://www.w3.org/2000/svg';
 const overlay=document.createElementNS(svgNS,'svg');
 overlay.setAttribute('viewBox','0 0 100 100');overlay.setAttribute('aria-hidden','true');overlay.classList.add('trace-guide-overlay');
 const size=()=>Math.max(1,host.getBoundingClientRect().width);
 const writer=HanziWriter.create(host,letter.char,{
  width:size(),height:size(),padding:0,showCharacter:false,showOutline:true,
  charDataLoader:()=>({strokes:data.strokes,medians:data.medians}),
  strokeColor:'#254d43',outlineColor:'#dde5d7',highlightColor:'#a6b77b',highlightCompleteColor:'#6c9058',drawingColor:'#254d43',
  drawingWidth:Math.max(3,size()*.016),drawingFadeDuration:reduced.matches?0:160,
  strokeFadeDuration:reduced.matches?0:130,strokeAnimationSpeed:1.2,delayBetweenStrokes:260,
  strokeHighlightSpeed:1.1,strokeHighlightDuration:reduced.matches?0:170,
  highlightOnComplete:!reduced.matches,acceptBackwardsStrokes:false,showHintAfterMisses:2,markStrokeCorrectAfterMisses:false,
  ...HEBREW_TOLERANCES
 });
 writer.target.node.setAttribute('aria-hidden','true');
 host.append(overlay);
 function snapshot(){return {pass:completed===total,coverage:Math.round(completed/total*100),reached:completed,total,mistakes,mode,watching,preview:watching&&reduced.matches,instruction:data.instructions[Math.min(completed,total-1)]};}
 function renderGuide(){
  overlay.replaceChildren();
  if(watching||completed===total||mode==='recall'&&!hinted)return;
  const route=data.guides[completed],start=route[0];
  const path=document.createElementNS(svgNS,'path');
  path.setAttribute('d','M'+route.map(p=>p.join(',')).join('L'));path.classList.add('trace-route');overlay.append(path);
  // Direction chevron follows the actual first segment, separate from the start.
  let dist=0,tip=route.at(-1),before=start;
  for(let i=1;i<route.length;i++){const d=Math.hypot(route[i][0]-route[i-1][0],route[i][1]-route[i-1][1]);if(dist+d>=10){const t=(10-dist)/d;before=route[i-1];tip=[before[0]+(route[i][0]-before[0])*t,before[1]+(route[i][1]-before[1])*t];break;}dist+=d;}
  const a=Math.atan2(tip[1]-before[1],tip[0]-before[0]);
  const arrow=document.createElementNS(svgNS,'path');arrow.setAttribute('d',`M${tip[0]-2*Math.cos(a-.65)},${tip[1]-2*Math.sin(a-.65)}L${tip}L${tip[0]-2*Math.cos(a+.65)},${tip[1]-2*Math.sin(a+.65)}`);arrow.classList.add('trace-direction');overlay.append(arrow);
  const dot=document.createElementNS(svgNS,'circle');dot.setAttribute('cx',start[0]);dot.setAttribute('cy',start[1]);dot.setAttribute('r','3.1');dot.classList.add('trace-start');overlay.append(dot);
  const number=document.createElementNS(svgNS,'text');number.setAttribute('x',start[0]);number.setAttribute('y',start[1]);number.setAttribute('dy','.35em');number.classList.add('trace-start-number');number.textContent=completed+1;overlay.append(number);
 }
 function emit(){if(disposed)return;renderGuide();onChange(snapshot());}
 function feedback(text,kind='neutral'){if(!disposed)onFeedback({text,kind});}
 async function begin(){
  if(disposed)return;
  const ticket=++operation;watching=false;hinted=false;
  writer.cancelQuiz();
  await (mode==='guided'?writer.showOutline({duration:0}):writer.hideOutline({duration:0}));
  if(disposed||ticket!==operation)return;
  if(completed===total){await writer.showCharacter({duration:0});emit();return;}
  await writer.quiz({
   quizStartStrokeNum:completed,
   onCorrectStroke(info){if(disposed||ticket!==operation)return;completed=info.strokeNum+1;hinted=false;emit();if(completed<total)feedback('Nice. '+data.instructions[completed],'correct');},
   onMistake(info){if(disposed||ticket!==operation)return;mistakes++;hinted=info.mistakesOnStroke>=2;emit();feedback(info.isBackwards?'Try the same stroke in the arrow’s direction.':`Start at ${info.strokeNum+1}. Trace the full stroke, then lift.`,'retry');},
   onComplete(){if(disposed||ticket!==operation)return;completed=total;emit();feedback('Beautifully written. That’s '+letter.name+'.','complete');onResult(snapshot());}
  });
  if(!disposed&&ticket===operation)emit();
 }
 const ready=begin().catch(()=>feedback('The writing surface could not load. Choose the letter again.','error'));
 const resize=new ResizeObserver(()=>{if(disposed)return;const width=size();writer.updateDimensions({width,height:width,padding:0});});resize.observe(host);
 const visibility=()=>{if(document.hidden)writer.pauseAnimation();else writer.resumeAnimation();};document.addEventListener('visibilitychange',visibility);
 const mediaChange=()=>{if(disposed)return;writer._options.strokeFadeDuration=reduced.matches?0:130;writer._options.drawingFadeDuration=reduced.matches?0:160;writer._options.highlightOnComplete=!reduced.matches;if(reduced.matches&&watching){++operation;begin();}};
 reduced.addEventListener('change',mediaChange);
 emit();
 return {
  ready,
  async clear(){await ready;if(disposed)return;completed=0;mistakes=0;feedback('A fresh start. '+data.instructions[0]);return begin();},
  async undo(){await ready;if(disposed)return;completed=Math.max(0,completed-1);feedback('Try that stroke again. '+data.instructions[completed]);return begin();},
  async setMode(next){if(!['guided','recall'].includes(next))return;await ready;if(disposed)return;mode=next;completed=0;mistakes=0;feedback(mode==='recall'?'Write from memory. Hint is here if you need it.':data.instructions[0]);return begin();},
  async hint(){await ready;if(disposed||watching||completed===total)return;hinted=true;emit();feedback(data.instructions[completed]);if(!reduced.matches)await writer.highlightStroke(completed);},
  async play(){await ready;if(disposed)return;if(watching&&reduced.matches){await begin();feedback(data.instructions[Math.min(completed,total-1)]);return;}const ticket=++operation;writer.cancelQuiz();watching=true;emit();feedback('Watch each stroke. Your accepted strokes stay saved.');if(reduced.matches){await writer.showCharacter({duration:0});if(!disposed&&ticket===operation){emit();feedback('Letter preview. Choose Back to writing when you’re ready.');}return;}else await writer.animateCharacter();if(disposed||ticket!==operation)return;await begin();feedback(completed===total?'You’ve finished this letter.':data.instructions[completed]);},
  destroy(){if(disposed)return;disposed=true;++operation;resize.disconnect();document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',mediaChange);writer.destroy();overlay.remove();},
  get state(){return snapshot();}
 };
}
