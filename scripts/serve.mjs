import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const root = resolve('dist');
const args=process.argv.slice(2);
const port=Number(args.includes('--port')?args[args.indexOf('--port')+1]:(process.env.PORT||5173));
const host=args.includes('--host')?args[args.indexOf('--host')+1]:'0.0.0.0';
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json','.webmanifest':'application/manifest+json'};
http.createServer(async (req,res) => {
  try {
    const path = resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname));
    if (path !== root && !path.startsWith(root + '/')) { res.writeHead(403).end(); return; }
    const file = path === root ? root + '/index.html' : path;
    res.writeHead(200, {'Content-Type':types[extname(file)] || 'text/plain'});
    res.end(await readFile(file));
  } catch { res.writeHead(404).end('Not found'); }
}).listen(port, host, () => console.log('Binah ready on port ' + port));
