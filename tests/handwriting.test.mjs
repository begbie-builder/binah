import test from 'node:test';
import assert from 'node:assert/strict';
import {recognizeHandwriting} from '../src/handwriting.js';
import {hebrewWriterData} from '../src/hebrew-writer-data.js';
test('whole-letter recall accepts every form with reordered strokes, reversed direction and natural pen lifts',()=>{
 for(const [char,data]of Object.entries(hebrewWriterData)){
  const split=data.guides.flatMap(s=>{const mid=Math.floor(s.length/2);return mid?[s.slice(0,mid+1),s.slice(mid)]:[s];}).toReversed().map(s=>s.toReversed());
  assert.equal(recognizeHandwriting(char,split).pass,true,char);
  const jitter=data.guides.map(s=>s.map(([x,y],i)=>[x+Math.sin(i)*1.4,y+Math.cos(i)*1.4]));assert.equal(recognizeHandwriting(char,jitter).pass,true,char+' natural hand movement');
 }
});
test('recall rejects blank, partial and wrong shapes and distinguishes short and tall letters',()=>{
 assert.equal(recognizeHandwriting('א',[]).pass,false);assert.equal(recognizeHandwriting('א',[hebrewWriterData['א'].guides[0]]).pass,false);
 const wrong=recognizeHandwriting('א',hebrewWriterData['י'].guides);assert.equal(wrong.pass,false);assert.equal(wrong.match,'י');
 assert.equal(recognizeHandwriting('י',hebrewWriterData['ן'].guides).pass,false);assert.equal(recognizeHandwriting('ן',hebrewWriterData['י'].guides).pass,false);
 assert.equal(recognizeHandwriting('א',[[[0,0],[100,0],[100,100],[0,100],[0,0]]]).pass,false);
});
