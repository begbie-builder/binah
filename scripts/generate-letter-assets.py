"""Regenerate exact Noto Sans Hebrew outlines and derived tracing checkpoints.
Dev-only: Python + fonttools + Pillow + numpy. Not needed for npm build.
Source: Debian fonts-noto-core, SIL OFL 1.1. See public/fonts/OFL.txt.
Pass --font-directory to use a different local copy of the same font release.
"""
from pathlib import Path
import argparse,json,math
import numpy as np
from PIL import Image,ImageDraw,ImageFont
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools import subset
ROOT=Path(__file__).resolve().parent.parent
parser=argparse.ArgumentParser();parser.add_argument('--font-directory',default='/usr/share/fonts/truetype/noto');args=parser.parse_args()
FONT=Path(args.font_directory)/'NotoSansHebrew-Regular.ttf'
BOLD=Path(args.font_directory)/'NotoSansHebrew-Bold.ttf'
CHARS='אבגדהוזחטיכלמנסעפצקרשתךםןףץ'
SCALE=.086;BASELINE=75;PX=5;SIZE=100*PX
f=TTFont(FONT);glyphs=f.getGlyphSet();cmap=f.getBestCmap()
def outline(font,char,transform):
 gs=font.getGlyphSet();pen=SVGPathPen(gs,ntos=lambda v:format(v,'.3f').rstrip('0').rstrip('.') if v else '0');gs[font.getBestCmap()[ord(char)]].draw(TransformPen(pen,transform));return pen.getCommands()
def thin(a):
 a=np.pad(a.astype(bool),1)
 while True:
  changed=False
  for phase in (0,1):
   p=[a[:-2,1:-1],a[:-2,2:],a[1:-1,2:],a[2:,2:],a[2:,1:-1],a[2:,:-2],a[1:-1,:-2],a[:-2,:-2]]
   n=sum(x.astype(np.uint8) for x in p);t=sum(((~p[i])&p[(i+1)%8]).astype(np.uint8) for i in range(8))
   erase=a[1:-1,1:-1]&(n>=2)&(n<=6)&(t==1)
   erase &= ~(p[0]&p[2]&(p[4] if phase==0 else p[6]))
   erase &= ~((p[2] if phase==0 else p[0])&p[4]&p[6])
   if erase.any():a[1:-1,1:-1][erase]=False;changed=True
  if not changed:return a[1:-1,1:-1]
def routes(mask):
 skeleton=thin(mask);nodes={tuple(p) for p in np.argwhere(skeleton)}
 graph={}
 for y,x in nodes:
  graph[y,x]=[]
  for dy,dx in [(-1,0),(1,0),(0,-1),(0,1),(-1,-1),(-1,1),(1,-1),(1,1)]:
   q=(y+dy,x+dx)
   if q in nodes and not (dy and dx and ((y+dy,x) in nodes or (y,x+dx) in nodes)):graph[y,x].append(q)
 visited=set();paths=[]
 def walk(start,next):
  path=[start];prev=start;cur=next;visited.add(frozenset((prev,cur)))
  while True:
   path.append(cur)
   candidates=[n for n in graph[cur] if frozenset((cur,n)) not in visited]
   if len(graph[cur])!=2 or not candidates:break
   nxt=candidates[0];visited.add(frozenset((cur,nxt)));prev,cur=cur,nxt
  return path
 for node in sorted(nodes):
  if len(graph[node])!=2:
   for neighbor in graph[node]:
    if frozenset((node,neighbor)) not in visited:paths.append(walk(node,neighbor))
 for node in sorted(nodes):
  for neighbor in graph[node]:
   if frozenset((node,neighbor)) not in visited:paths.append(walk(node,neighbor))
 # Join branches at the closest tangent angle, keeping recognisable continuous sweeps.
 while True:
  best=None
  for i,a in enumerate(paths):
   for j in range(i+1,len(paths)):
    b=paths[j]
    for ai in (0,-1):
     for bi in (0,-1):
      if a[ai]!=b[bi]:continue
      if len(a)<3 or len(b)<3:continue
      av=np.array(a[min(8,len(a)-1) if ai==0 else max(0,len(a)-9)])-a[ai]
      bv=np.array(b[min(8,len(b)-1) if bi==0 else max(0,len(b)-9)])-b[bi]
      cosine=float(av@bv)/(np.linalg.norm(av)*np.linalg.norm(bv)+1e-9)
      if cosine<-.15 and (best is None or cosine<best[0]):best=(cosine,i,j,ai,bi)
  if best is None:break
  _,i,j,ai,bi=best;a=paths[i];b=paths[j];a=a[::-1] if ai==0 else a;b=b[::-1] if bi==-1 else b;paths[i]=a+b[1:];paths.pop(j)
 result=[]
 for path in paths:
  length=sum(math.dist(a,b) for a,b in zip(path,path[1:]))/PX
  if length<2.0:continue
  if (path[-1][0],-path[-1][1])<(path[0][0],-path[0][1]):path=path[::-1]
  # Resample without tiny raster stair-steps; checkpoint spacing is 2.4 units.
  out=[path[0]];distance=0
  for prev,point in zip(path,path[1:]):
   distance+=math.dist(prev,point)
   if distance>=PX*.8:out.append(point);distance=0
  if out[-1]!=path[-1]:out.append(path[-1])
  result.append([[round(x/PX,2),round(y/PX,2)] for y,x in out])
 return sorted(result,key=lambda p:(min(x[1] for x in p),-max(x[0] for x in p)))
assets={};sheet=Image.new('RGB',(900,1100),'#f7f8f4');draw=ImageDraw.Draw(sheet)
for i,c in enumerate(CHARS):
 name=cmap[ord(c)];bp=BoundsPen(glyphs);glyphs[name].draw(bp);x0,y0,x1,y1=bp.bounds
 tx=50-(x0+x1)*SCALE/2
 d=outline(f,c,(SCALE,0,0,-SCALE,tx,BASELINE))
 mask=Image.new('L',(SIZE,SIZE));md=ImageDraw.Draw(mask);md.text((tx*PX,BASELINE*PX),c,font=ImageFont.truetype(str(FONT),round(SCALE*1000*PX)),fill=255,anchor='ls',direction='rtl')
 strokes=routes(np.array(mask)>127)
 assets[c]={'path':d,'strokes':strokes,'bounds':[round(tx+x0*SCALE,3),round(BASELINE-y1*SCALE,3),round((x1-x0)*SCALE,3),round((y1-y0)*SCALE,3)]}
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#254d43" d="{d}"/></svg>\n'
 (ROOT/'public/letters'/f'{ord(c):04x}.svg').write_text(svg)
 # Development contact sheet: exact font fill, sampled guide, direction labels.
 tile=Image.new('RGB',(180,180),'#f7f8f4');td=ImageDraw.Draw(tile);small=mask.resize((180,180));tile.paste('#dce4d8',(0,0),small)
 for n,p in enumerate(strokes):
  pts=[(x*1.8,y*1.8) for x,y in p];td.line(pts,fill='#567b5d',width=2);xx,yy=pts[0];td.ellipse((xx-3,yy-3,xx+3,yy+3),fill='#b77c4d');td.text((xx+4,yy),str(n+1),fill='#9b5c37')
 sheet.paste(tile,((i%5)*180,(i//5)*180));print(c,len(strokes),'paths',sum(len(s) for s in strokes),'samples')
(ROOT/'src/letter-geometry.js').write_text('// Generated from Noto Sans Hebrew Regular. Exact SVG outlines + derived centerline routes.\n// Font license: public/fonts/OFL.txt. Rebuild: scripts/generate-letter-assets.py.\nexport const letterGeometry='+json.dumps(assets,ensure_ascii=False,separators=(',',':'))+';\n')
# Contact sheet is a reproducible development artifact, not a runtime asset.
sheet.save(ROOT.parent/'tracing-contact-sheet.png')
# Small self-hosted fonts: same outlines in reading, tracing, and letter tiles.
for filename,source in [('binah-hebrew-regular.woff',FONT),('binah-hebrew-bold.woff',BOLD)]:
 ft=TTFont(source);options=subset.Options();options.flavor='woff';options.name_IDs=['*'];sub=subset.Subsetter(options=options);sub.populate(unicodes=list(range(0x590,0x600))+[32,0x25cc]);sub.subset(ft);ft.flavor='woff';ft.save(ROOT/'public/fonts'/filename)
# Font-derived logo: one shared baseline, no platform font or combining-mark differences.
font=TTFont(BOLD);gs=font.getGlyphSet();cm=font.getBestCmap();paths=[];x=0
for c in 'הניב':
 paths.append(outline(font,c,(1,0,0,-1,x,593)));x+=gs[cm[ord(c)]].width+35
# Marks use deliberate optical placement, independent of browser shaping.
# Four consonants share the roof/baseline. Bet's dagesh + hiriq, nun's qamats.
positions=[];x=0
for c in 'הניב':positions.append((c,x,gs[cm[ord(c)]].width));x+=gs[cm[ord(c)]].width+35
marks=[]
for c,x,w in positions:
 if c=='ב':marks.append(f'<circle cx="{x+w*.48:.1f}" cy="315" r="36"/><circle cx="{x+w*.50:.1f}" cy="745" r="30"/>')
 if c=='נ':marks.append(f'<path d="M{x+w*.2:.1f} 700h{w*.5:.1f}v39h{-w*.2:.1f}v58h-39v-58h{-w*.3+39:.1f}z"/>')
logo_width=int(positions[-1][1]+positions[-1][2]+10)
body=''.join(f'<path d="{p}"/>' for p in paths)+''.join(marks)
(ROOT/'public/logo-hebrew.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -20 {logo_width} 845" role="img" aria-label="בִּינָה"><g fill="#254d43">{body}</g></svg>\n')
# Preserve the wordmark aspect ratio; leave space for the system icon mask.
# Full-bleed square background: iOS supplies its own rounded corners.
icon_scale=168/logo_width
icon_top=(192-845*icon_scale)/2
(ROOT/'public/icon.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" fill="#254d43"/><g transform="translate(12 {icon_top:.5f}) scale({icon_scale:.7f}) translate(0 20)" fill="#f6f4ed">{body}</g></svg>\n')
