import test from 'node:test';
import assert from 'node:assert/strict';
import {mountTrace} from '../src/trace.js';
import {alphabet} from '../src/alphabet.js';

test('pointer moves with empty coalesced events still draw; replay never contributes learner ink',()=>{
 const originals={};for(const name of ['document','matchMedia','Path2D','requestAnimationFrame','cancelAnimationFrame'])originals[name]=globalThis[name];
 let scheduled=0;
 try{
  globalThis.document={hidden:false,addEventListener(){},removeEventListener(){}};
  globalThis.matchMedia=()=>({matches:true,addEventListener(){},removeEventListener(){}});
  globalThis.Path2D=class{};
  globalThis.requestAnimationFrame=()=>{scheduled++;return scheduled;};globalThis.cancelAnimationFrame=()=>{};
  const context=new Proxy({},{get(target,key){return target[key]||(()=>{});},set(target,key,value){target[key]=value;return true;}});
  const canvas={width:800,isConnected:true,getContext:()=>context,getBoundingClientRect:()=>({left:0,top:0,width:100,height:100}),setPointerCapture(){}};
  const controller=mountTrace(canvas,alphabet[0],()=>{});
  const event=(x,y)=>({isPrimary:true,button:0,pointerId:1,clientX:x,clientY:y,getCoalescedEvents:()=>[]});
  canvas.onpointerdown(event(30,25));canvas.onpointermove(event(50,50));canvas.onpointerup(event(70,75));
  assert.equal(controller.paths[0].length,3);assert.deepEqual(controller.paths[0][1],[50,50]);
  const drawn=structuredClone(controller.paths);controller.play();assert.deepEqual(controller.paths,drawn,'Replay must not write user strokes');
  assert.equal(scheduled,0,'Reduced motion must not run an idle animation loop');
  controller.undo();assert.equal(controller.paths.length,0);controller.destroy();assert.equal(canvas.onpointermove,null);
 }finally{for(const [name,value]of Object.entries(originals)){if(value===undefined)delete globalThis[name];else globalThis[name]=value;}}
});
