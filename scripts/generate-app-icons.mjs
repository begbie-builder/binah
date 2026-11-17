// Development-only export from the exact favicon SVG. Production builds copy these PNGs.
// Requires Sharp locally, or the preinstalled Codex primary runtime bundle.
import {createRequire} from 'node:module';
import {join} from 'node:path';
import {mkdir} from 'node:fs/promises';
const require=createRequire(import.meta.url);
let sharp;
try{sharp=require('sharp');}catch(error){
 if(!process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES)throw new Error('Install sharp to re-export icons. The committed PNGs need no build dependency.',{cause:error});
 sharp=require(join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES,'sharp'));
}
await mkdir('public/icons',{recursive:true});
for(const [size,path] of [[180,'public/apple-touch-icon.png'],[192,'public/icons/icon-192.png'],[512,'public/icons/icon-512.png']]){
 await sharp('public/icon.svg',{density:384}).resize(size,size).flatten({background:'#254d43'}).removeAlpha().png().toFile(path);
}
console.log('Exported opaque Home Screen icons from public/icon.svg.');
