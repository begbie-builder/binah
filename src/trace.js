export function sampleStrokes(strokes,step=1) {
 const points=[]; for(const stroke of strokes) for(let i=1;i<stroke.length;i++) {const [a,b]=[stroke[i-1],stroke[i]]; const n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/step));for(let j=0;j<n;j++)points.push([a[0]+(b[0]-a[0])*j/n,a[1]+(b[1]-a[1])*j/n]);points.push(b);}return points;
}
const close=(p,points,r)=>points.some(q=>(p[0]-q[0])**2+(p[1]-q[1])**2<=r*r);
export function scoreTrace(guide,drawn) {
 const target=sampleStrokes(guide,1.2), ink=sampleStrokes(drawn,1.2);
 if(ink.length<10)return {coverage:0,precision:0,pass:false};
 const coverage=target.filter(p=>close(p,ink,6)).length/target.length;
 const precision=ink.filter(p=>close(p,target,7)).length/ink.length;
 return {coverage:Math.round(coverage*100),precision:Math.round(precision*100),pass:coverage>=.78 && precision>=.72};
}
export function mountTrace(canvas,letter,onResult) {
 const ctx=canvas.getContext('2d'); let paths=[],active=false; const scale=canvas.width/100;
 const point=e=>{const r=canvas.getBoundingClientRect();return [(e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100];};
 function line(strokes,color,width){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';for(const path of strokes){ctx.beginPath();path.forEach(([x,y],i)=>i?ctx.lineTo(x*scale,y*scale):ctx.moveTo(x*scale,y*scale));ctx.stroke();}}
 function paint(){ctx.clearRect(0,0,canvas.width,canvas.height);line(letter.strokes,'#dce4dc',11*scale);line(paths,'#254d43',4*scale);ctx.font=`bold ${4*scale}px sans-serif`;ctx.fillStyle='#66736b';letter.strokes.forEach((s,i)=>{ctx.fillText(String(i+1),s[0][0]*scale+7*scale,s[0][1]*scale);});}
 canvas.onpointerdown=e=>{active=true;canvas.setPointerCapture(e.pointerId);paths.push([point(e)]);paint();};
 canvas.onpointermove=e=>{if(active){paths[paths.length-1].push(point(e));paint();}};
 canvas.onpointerup=()=>{active=false;};canvas.onpointercancel=()=>{active=false;};
 paint();return {clear(){paths=[];paint();},undo(){paths.pop();paint();},check(){onResult(scoreTrace(letter.strokes,paths));},get paths(){return paths;}};
}
