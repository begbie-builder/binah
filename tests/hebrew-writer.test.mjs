import test from 'node:test';
import assert from 'node:assert/strict';
import {alphabet} from '../src/alphabet.js';
import {scoreTrace,HEBREW_TOLERANCES} from '../src/trace.js';
import {hebrewWriterData} from '../src/hebrew-writer-data.js';
import {parseCharData,strokeMatches} from '../src/vendor/hanzi-writer/hanzi-writer.js';

test('Hebrew engine accepts hand jitter but rejects reverse, partial and reordered strokes across all forms',()=>{
 for(const l of alphabet){
  const jitter=l.strokes.map(s=>s.map(([x,y],i)=>[x+Math.sin(i)*1.3,y+Math.cos(i)*1.3]));
  assert.equal(scoreTrace(l.strokes,jitter).pass,true,l.name+' allows small natural hand movement');
  assert.equal(scoreTrace(l.strokes,l.strokes.map(s=>s.toReversed())).pass,false,l.name+' checks direction');
  const truncated=l.strokes.map(s=>[s[0],[s[0][0]+(s.at(-1)[0]-s[0][0])*.15,s[0][1]+(s.at(-1)[1]-s[0][1])*.15]]);
  assert.equal(scoreTrace(l.strokes,truncated).pass,false,l.name+' needs the whole stroke');
  if(l.strokes.length>1)assert.equal(scoreTrace(l.strokes,l.strokes.toReversed()).pass,false,l.name+' checks order');
 }
});
test('live quiz data uses the same grading as authored guides, with one silhouette and instruction per stroke',()=>{
 assert.equal(Object.keys(hebrewWriterData).length,27);
 for(const l of alphabet){
  const d=hebrewWriterData[l.char],character=parseCharData(l.char,d);
  assert.equal(d.strokes.length,d.medians.length);assert.equal(d.instructions.length,d.medians.length);
  for(let i=0;i<d.medians.length;i++){
   assert.ok(d.strokes[i].startsWith('M')&&d.strokes[i].endsWith('Z'));
   assert.ok(d.instructions[i].length>12);
   const points=d.medians[i].map(([x,y])=>({x,y}));
   assert.equal(strokeMatches({points},character,i,{...HEBREW_TOLERANCES,isOutlineVisible:true}).isMatch,true,l.name);
   assert.equal(strokeMatches({points:points.toReversed()},character,i,{...HEBREW_TOLERANCES,isOutlineVisible:true}).meta.isStrokeBackwards,true,l.name+' reverse hint');
  }
 }
});
