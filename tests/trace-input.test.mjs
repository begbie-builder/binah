import test from 'node:test';
import assert from 'node:assert/strict';
import {PointerTarget} from '../src/vendor/hanzi-writer/hanzi-writer.js';

class Surface extends EventTarget{
 captured=null;
 setPointerCapture(id){this.captured=id;}
 hasPointerCapture(id){return this.captured===id;}
 releasePointerCapture(){this.captured=null;}
 getBoundingClientRect(){return {left:10,top:20};}
}
const event=(type,x=30,y=40,extra={})=>Object.assign(new Event(type,{cancelable:true}),{isPrimary:true,button:0,pointerId:1,clientX:x,clientY:y,getCoalescedEvents:()=>[],...extra});
test('captured pointer input handles empty/coalesced samples, final point, and disposal',()=>{
 const node=new Surface(),target=new PointerTarget(node),points=[],ends=[];
 target.addPointerStartListener(e=>points.push(e.getPoint()));target.addPointerMoveListener(e=>points.push(e.getPoint()));target.addPointerEndListener(e=>ends.push(e));
 node.dispatchEvent(event('pointerdown'));assert.equal(node.captured,1);
 node.dispatchEvent(event('pointermove',50,60));
 node.dispatchEvent(event('pointermove',60,70,{getCoalescedEvents:()=>[{clientX:55,clientY:65},{clientX:60,clientY:70}]}));
 node.dispatchEvent(event('pointerup',70,80));
 assert.deepEqual(points,[{x:20,y:20},{x:40,y:40},{x:45,y:45},{x:50,y:50},{x:60,y:60}]);assert.deepEqual(ends,[{cancelled:false}]);assert.equal(node.captured,null);
 target.disposeInput();node.dispatchEvent(event('pointerdown'));assert.equal(points.length,5,'Disposed surfaces must not retain input listeners');
});
test('secondary contacts are ignored and interrupted strokes are cancelled rather than graded',()=>{
 const node=new Surface(),target=new PointerTarget(node),points=[],ends=[];
 target.addPointerStartListener(e=>points.push(e.getPoint()));target.addPointerMoveListener(e=>points.push(e.getPoint()));target.addPointerEndListener(e=>ends.push(e));
 node.dispatchEvent(event('pointerdown',0,0,{isPrimary:false,pointerId:2}));assert.equal(points.length,0);
 node.dispatchEvent(event('pointerdown'));node.dispatchEvent(event('pointermove',80,90,{pointerId:2}));
 node.dispatchEvent(event('pointercancel'));node.dispatchEvent(event('pointerup'));
 assert.equal(points.length,1);assert.deepEqual(ends,[{cancelled:true}]);target.disposeInput();
});
