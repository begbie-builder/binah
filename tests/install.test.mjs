import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Home Screen metadata preserves zoom, covers safe areas, and names the Apple PNG',async()=>{
 const html=await readFile(new URL('../public/index.html',import.meta.url),'utf8');
 assert.match(html,/viewport-fit=cover/);assert.doesNotMatch(html,/user-scalable\s*=\s*no|maximum-scale\s*=\s*1/);
 assert.match(html,/apple-mobile-web-app-capable" content="yes/);
 assert.match(html,/apple-touch-icon" sizes="180x180" href="\/apple-touch-icon\.png/);
});
test('manifest launches within its stable scope and supplies real opaque PNG icon dimensions',async()=>{
 const manifest=JSON.parse(await readFile(new URL('../public/manifest.webmanifest',import.meta.url),'utf8'));
 assert.equal(manifest.id,'/');assert.equal(manifest.scope,'/');assert.equal(manifest.display,'standalone');assert.equal(manifest.start_url,'/#learn');
 for(const [path,size]of [['apple-touch-icon.png',180],['icons/icon-192.png',192],['icons/icon-512.png',512]]){
  const data=await readFile(new URL('../public/'+path,import.meta.url));
  assert.equal(data.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert.equal(data.readUInt32BE(16),size);assert.equal(data.readUInt32BE(20),size);
  assert.equal(data[25],2,'RGB icons should be opaque, with no alpha channel');
  if(size!==180)assert.ok(manifest.icons.some(i=>i.src.split('?')[0]==='/'+path&&i.sizes===`${size}x${size}`&&i.type==='image/png'));
 }
});
test('offline shell includes the responsive stylesheet, install controller, and Home Screen icons',async()=>{
 const worker=await readFile(new URL('../public/sw.js',import.meta.url),'utf8');
 for(const path of ['/src/responsive.css','/src/install.js','/src/hebrew-writer-data.js','/src/vendor/hanzi-writer/hanzi-writer.js','/apple-touch-icon.png','/icons/icon-192.png','/icons/icon-512.png'])assert.ok(worker.includes("'"+path+"'"),path);
 assert.ok(worker.includes('skipWaiting'));
});
