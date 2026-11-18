import urllib.request, concurrent.futures, xml.etree.ElementTree as ET, json, re
from html.parser import HTMLParser
from urllib.parse import urljoin,urlsplit
class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.skip=0;self.main=False;self.t=[];self.links=[];self.title='';self.istitle=False
 def handle_starttag(self,tag,a):
  attrs=dict(a)
  if tag in ['script','style','noscript','nav','header','footer']:self.skip+=1
  if tag=='title':self.istitle=True
  if tag=='main':self.main=True
  if tag=='a' and attrs.get('href'):self.links.append(attrs['href'])
  if self.main and tag in ['h1','h2','h3','h4','p','li','tr','dt','dd']:self.t.append('\n')
 def handle_endtag(self,tag):
  if tag in ['script','style','noscript','nav','header','footer']:self.skip=max(0,self.skip-1)
  if tag=='main':self.main=False
  if tag=='title':self.istitle=False
 def handle_data(self,d):
  if self.istitle:self.title+=d
  if self.main and not self.skip:self.t.append(d.strip()+' ')
def fetch(url):
 try:
  h=urllib.request.urlopen(url,timeout=30).read().decode();p=Page();p.feed(h)
  return {'url':url,'title':p.title,'text':re.sub(r'[^\S\n]+',' ',''.join(p.t)),'links':sorted(set(urljoin(url,x) for x in p.links))}
 except Exception as e:return {'url':url,'error':str(e)}
urls=[e.text for e in ET.parse('/tmp/grok-sitemap.xml').iter() if e.tag.endswith('loc')]
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:pages=list(ex.map(fetch,urls))
extra=sorted(set(u.split('#')[0].split('?')[0] for p in pages for u in p.get('links',[]) if urlsplit(u).netloc=='grokbotjp.com' and not re.search(r'\.(png|jpg|webp|svg|js|css|pdf)$',u) and u.split('#')[0].split('?')[0] not in urls))
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:pages+=list(ex.map(fetch,extra))
open('design/source-pages.json','w').write(json.dumps(pages,ensure_ascii=False,indent=2))
for p in pages:print(p['url'],p.get('title',p.get('error')),len(p.get('text','')))
