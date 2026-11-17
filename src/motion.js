// Small, local animations. No library, gradient, shadow, or perpetual JS timer.
const preference=matchMedia('(prefers-reduced-motion: reduce)');
const ease='cubic-bezier(.2,.8,.2,1)';let currentView='',running=[];
export const motionAllowed=()=>!preference.matches;
export function enterView(root,key){
 if(key===currentView||!root)return;currentView=key;running.forEach(a=>a.cancel());running=[];
 if(!motionAllowed())return;
 const targets=root.querySelectorAll('.page-heading,.continue-card,.unit-banner,.lesson-row,.right-rail>article,.letter-tile,.letter-facts,.trace-panel,.vowel-card,.practice-card,.phrase-card,.reference-card,.settings-card,.exercise-main>*,.complete-screen>*');
 [...targets].forEach((el,i)=>{const a=el.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:430,delay:Math.min(i*27,240),easing:ease,fill:'backwards'});running.push(a);});
 const ring=root.querySelector('.ring-fill');if(ring){const actual=ring.getAttribute('stroke-dasharray');running.push(ring.animate([{'stroke-dasharray':'0 320.45'},{'stroke-dasharray':actual}],{duration:850,easing:ease}));}
}
export function celebrateAt(element,{big=false}={}){
 if(!motionAllowed()||!element)return;const r=element.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
 const layer=document.createElement('div');layer.className='celebration-layer';layer.setAttribute('aria-hidden','true');document.body.append(layer);
 const colors=['#7d9865','#c59d74','#b4a6c8','#d5deae','#254d43'];
 const count=big?30:15;
 for(let i=0;i<count;i++){
  const bit=document.createElement('i');bit.style.background=colors[i%colors.length];bit.style.left=x+'px';bit.style.top=y+'px';if(i%3===0)bit.style.borderRadius='50%';layer.append(bit);
  const angle=(Math.PI*2*i/count)-Math.PI/2,distance=(big?105:60)+(i%5)*13;
  bit.animate([{opacity:0,transform:'translate(-50%,-50%) scale(.35) rotate(0deg)'},{opacity:1,offset:.12},{opacity:0,transform:`translate(${Math.cos(angle)*distance}px,${Math.sin(angle)*distance+55}px) scale(.65) rotate(${i*43}deg)`}],{duration:800+(i%4)*80,easing:ease,fill:'forwards'});
 }
 setTimeout(()=>layer.remove(),1200);
}
export function feedbackMotion(element,correct){
 if(!motionAllowed()||!element)return;
 element.animate(correct?[{transform:'scale(.98)'},{transform:'scale(1.015)',offset:.65},{transform:'scale(1)'}]:[{transform:'translateX(0)'},{transform:'translateX(-4px)',offset:.25},{transform:'translateX(4px)',offset:.55},{transform:'translateX(0)'}],{duration:correct?340:270,easing:ease});
}
document.addEventListener('pointerdown',e=>{
 if(!motionAllowed()||e.button!==0)return;const button=e.target.closest('button,.button');if(!button||button.disabled)return;
 const dot=document.createElement('span');dot.className='tap-feedback';dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';dot.setAttribute('aria-hidden','true');document.body.append(dot);
 dot.animate([{opacity:.14,transform:'translate(-50%,-50%) scale(.15)'},{opacity:0,transform:'translate(-50%,-50%) scale(1)'}],{duration:450,easing:ease}).finished.catch(()=>{}).finally(()=>dot.remove());
});
preference.addEventListener('change',()=>{if(preference.matches){running.forEach(a=>a.cancel());document.querySelectorAll('.celebration-layer,.tap-feedback').forEach(el=>el.remove());}});
