// All coordinates are in the same 100 × 100 space as the exact font outline.
export function sampleStrokes(strokes,step=1) {
 const points=[];for(const stroke of strokes)for(let i=1;i<stroke.length;i++){
  const a=stroke[i-1],b=stroke[i],n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/step));
  for(let j=0;j<n;j++)points.push([a[0]+(b[0]-a[0])*j/n,a[1]+(b[1]-a[1])*j/n]);points.push(b);
 }return points;
}
export function checkpointsFor(strokes,spacing=2.6){
 const result=[];strokes.forEach((stroke,route)=>{
  if(!stroke.length)return;result.push({point:stroke[0],route});let remaining=spacing;
  for(let i=1;i<stroke.length;i++){
   const start=stroke[i-1],end=stroke[i];let distance=Math.hypot(end[0]-start[0],end[1]-start[1]);let at=[...start];
   while(distance>=remaining&&distance>0){const t=remaining/distance;at=[at[0]+(end[0]-at[0])*t,at[1]+(end[1]-at[1])*t];result.push({point:at,route});distance-=remaining;remaining=spacing;}
   remaining-=distance;
  }
  const last=stroke.at(-1);if(Math.hypot(last[0]-result.at(-1).point[0],last[1]-result.at(-1).point[1])>1)result.push({point:last,route});
 });return result;
}
const close=(p,points,r)=>points.some(q=>(p[0]-q[0])**2+(p[1]-q[1])**2<=r*r);
export function scoreTrace(guide,drawn){
 const checkpoints=checkpointsFor(guide),ink=sampleStrokes(drawn,.65),target=sampleStrokes(guide,.65);
 const hits=checkpoints.map(c=>close(c.point,ink,3.2));
 if(ink.length<8)return {coverage:0,precision:0,pass:false,hits:checkpoints.map(()=>false),reached:0,total:checkpoints.length};
 const coverage=hits.filter(Boolean).length/Math.max(1,checkpoints.length);
 const precision=ink.filter(p=>close(p,target,4.2)).length/ink.length;
 return {coverage:Math.round(coverage*100),precision:Math.round(precision*100),pass:coverage>=.86&&precision>=.8,hits,reached:hits.filter(Boolean).length,total:checkpoints.length};
}
export function mountTrace(canvas,letter,onResult,{onChange=()=>{}}={}){
 const ctx=canvas.getContext('2d'),glyph=new Path2D(letter.path),checkpoints=checkpointsFor(letter.strokes);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let paths=[],pointer=null,frame=0,disposed=false,demoStart=null,celebrate=0,visible=true;
 let result=scoreTrace(letter.strokes,paths);
 const observer=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)paint(performance.now());else cancelAnimationFrame(frame);}):null;
 observer?.observe(canvas);
 const point=e=>{const r=canvas.getBoundingClientRect();return [(e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100];};
 function line(strokes,color,width){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';for(const path of strokes){if(!path.length)continue;ctx.beginPath();path.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));if(path.length===1)ctx.lineTo(path[0][0]+.01,path[0][1]);ctx.stroke();}}
 function dot(p,r,color){ctx.beginPath();ctx.fillStyle=color;ctx.arc(p[0],p[1],r,0,Math.PI*2);ctx.fill();}
 const demoRoutes=letter.strokes.map(s=>sampleStrokes([s],.5));
 const demoLength=demoRoutes.reduce((n,s)=>n+s.length,0);
 function paint(now=performance.now()){
  if(disposed||!canvas.isConnected)return;cancelAnimationFrame(frame);
  const scale=canvas.width/100;ctx.setTransform(scale,0,0,scale,0,0);ctx.clearRect(0,0,100,100);
  // The silhouette comes directly from the font's Bézier outline, with no mirroring.
  ctx.fillStyle='#dde5d7';ctx.fill(glyph);
  line(paths,'#c58f73',2.8);
  ctx.save();ctx.clip(glyph);line(paths,'#426953',7.2);
  if(demoStart!==null){
   const phase=(now-demoStart)/2800;const elapsed=reduced.matches?1:Math.min(phase,1);let count=Math.ceil(elapsed*demoLength),tip=null;ctx.globalAlpha=reduced.matches?1:phase>1.25?Math.max(0,1-(phase-1.25)/.2):1;
   for(const route of demoRoutes){const part=route.slice(0,Math.max(0,count));if(part.length){line([part],'#789567',11);tip=part.at(-1);}count-=route.length;}
   if(tip)dot(tip,1.8,'#f8f3df');ctx.globalAlpha=1;if(reduced.matches||phase>=1.45)demoStart=null;
  }
  ctx.restore();
  checkpoints.forEach((c,i)=>dot(c.point,result.hits[i]?.valueOf()?1:.62,result.hits[i]?'#244e3d':'#f9fbf5'));
  if(demoStart===null){
   const next=checkpoints.find((_,i)=>!result.hits[i]);
   if(next){const r=1.55+(pointer===null&&!reduced.matches?Math.sin(now/260)*.18:0);ctx.strokeStyle='#b98f56';ctx.lineWidth=.45;ctx.beginPath();ctx.arc(...next.point,r,0,Math.PI*2);ctx.stroke();}
   letter.strokes.forEach((route,i)=>{const p=route[0];ctx.font='600 2.4px system-ui';ctx.fillStyle='#647758';ctx.textAlign='center';ctx.fillText(String(i+1),p[0],Math.max(4,p[1]-3.3));});
  }
  if(celebrate&&!reduced.matches){const t=Math.min((now-celebrate)/650,1);ctx.globalAlpha=1-t;ctx.strokeStyle='#93aa71';ctx.lineWidth=.7;const [x,y,w,h]=letter.bounds;ctx.beginPath();ctx.ellipse(x+w/2,y+h/2,w/2+3+t*6,h/2+3+t*6,0,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1;if(t>=1)celebrate=0;}
  if((demoStart!==null||celebrate||(!reduced.matches&&pointer===null&&!result.pass))&&visible&&!document.hidden)frame=requestAnimationFrame(paint);
 }
 function refresh(){result=scoreTrace(letter.strokes,paths);onChange(result);paint();}
 function stopDemo(){demoStart=null;}
 canvas.onpointerdown=e=>{
  if(pointer!==null||!e.isPrimary||e.button!==0)return;pointer=e.pointerId;stopDemo();canvas.setPointerCapture(e.pointerId);paths.push([point(e)]);refresh();
 };
 canvas.onpointermove=e=>{
  if(e.pointerId!==pointer)return;const coalesced=e.getCoalescedEvents?.();const events=coalesced?.length?coalesced:[e],path=paths.at(-1);
  for(const item of events){const p=point(item),prev=path.at(-1);if(Math.hypot(p[0]-prev[0],p[1]-prev[1])>.2&&path.length<3000)path.push(p);}refresh();
 };
 canvas.onpointerup=e=>{if(e.pointerId!==pointer)return;paths.at(-1).push(point(e));pointer=null;refresh();};
 canvas.onpointercancel=e=>{if(e.pointerId===pointer){pointer=null;refresh();}};
 const visibility=()=>{if(document.hidden)cancelAnimationFrame(frame);else paint();};document.addEventListener('visibilitychange',visibility);
 const mediaChange=()=>paint();reduced.addEventListener('change',mediaChange);
 refresh();
 return {
  clear(){stopDemo();paths=[];celebrate=0;refresh();},
  undo(){stopDemo();paths.pop();celebrate=0;refresh();},
  play(){pointer=null;demoStart=performance.now();paint();},
  check(){stopDemo();refresh();if(result.pass)celebrate=performance.now();paint();onResult(result);},
  destroy(){disposed=true;cancelAnimationFrame(frame);observer?.disconnect();document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',mediaChange);canvas.onpointerdown=canvas.onpointermove=canvas.onpointerup=canvas.onpointercancel=null;},
  get paths(){return paths;}
 };
}
