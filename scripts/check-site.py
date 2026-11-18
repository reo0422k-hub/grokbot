import json,concurrent.futures,urllib.request,urllib.error
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
base='http://127.0.0.1:3008'
pages=json.load(open('src/content/pages.json'));paths=['/']+['/'+p['slug']+'/' for p in pages]
class Doc(HTMLParser):
 def __init__(self):super().__init__();self.h1=0;self.links=[];self.ids=set();self.meta=False;self.title=False;self.images=[]
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='h1':self.h1+=1
  if t=='title':self.title=True
  if t=='meta' and d.get('name')=='description' and d.get('content'):self.meta=True
  if d.get('id'):self.ids.add(d['id'])
  if t=='a':self.links.append(d.get('href',''))
  if t=='img':self.images.append(d)
def get(path):
 try:
  r=urllib.request.urlopen(base+path,timeout=30);doc=Doc();doc.feed(r.read().decode());return path,r.status,doc
 except Exception as e:return path,str(e),None
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:results=list(ex.map(get,paths))
docs={path:d for path,status,d in results if d};issues=[]
for path,status,d in results:
 if status!=200:issues.append([path,status]);continue
 if d.h1!=1:issues.append([path,'h1 count',d.h1])
 if not d.meta or not d.title:issues.append([path,'metadata missing'])
 for img in d.images:
  if 'alt' not in img:issues.append([path,'image alt missing'])
 for href in d.links:
  u=urlsplit(href)
  if u.scheme or u.netloc:continue
  dest=u.path or path
  if dest not in docs:issues.append([path,'broken local link',href]);continue
  if u.fragment and unquote(u.fragment) not in docs[dest].ids:issues.append([path,'missing fragment',href])
source_paths={urlsplit(p['url']).path for p in json.load(open('design/source-pages.json'))}
coverage=sorted(source_paths-set(paths))
if coverage:issues.append(['source routes missing',coverage])
assets = ['/images/work-guide-transparent.webp','/images/security-guide-transparent.webp','/images/support-team-transparent.webp','/images/hero-desktop-square.webp','/images/hero-mobile-square.webp','/images/bot-family-atlas.png','/images/crew-work.png','/images/crew-security.png','/images/crew-support.png','/icon.png','/sitemap.xml','/robots.txt']
assets.extend('/' + asset.relative_to('public').as_posix() for asset in sorted(Path('public/images/brand').glob('*.webp')))
assets.append('/images/bot-color-background.webp')
assets.append('/images/bot-color-background-lilac.webp')
assets.extend(f'/images/guide-card-{guide}.webp' for guide in ('security', 'pricing', 'getting-started'))
for path in assets:
 try:
  if urllib.request.urlopen(base+path,timeout=30).status!=200:issues.append([path,'not 200'])
 except Exception as e:issues.append([path,str(e)])
try:urllib.request.urlopen(base+'/page-that-does-not-exist/',timeout=10);issues.append(['404 did not return 404'])
except urllib.error.HTTPError as e:
 if e.code!=404:issues.append(['wrong 404 status',e.code])
report={'base':base,'pages_checked':len(paths),'source_pages':len(source_paths),'source_routes_missing':coverage,'issues':issues,'routes':paths}
json.dump(report,open('design/validation.json','w'),ensure_ascii=False,indent=2)
print(json.dumps({k:v for k,v in report.items() if k!='routes'},ensure_ascii=False,indent=2))
raise SystemExit(bool(issues))
