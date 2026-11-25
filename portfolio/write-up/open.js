/* Opens "Anatomy of a Reel" full screen from its card on the portfolio page.
   The card grows to fill the screen, then the story loads in place; its back arrow (or the browser's) returns you
   to where you were on the page. The story also works on its own at /portfolio/write-up/. */
(() => {
  const card = document.getElementById('acard'); if(!card) return;
  const here = document.currentScript ? document.currentScript.src.replace(/open\.js.*$/, '') : 'write-up/';
  const RM = matchMedia('(prefers-reduced-motion:reduce)').matches, ease = 'cubic-bezier(.3,.9,.2,1)', D = RM ? 0 : 480;
  let flood, frame, open = false, pushed = false;
  card.setAttribute('aria-haspopup', 'dialog');
  function show(){
    if(open) return; open = true;
    const r = card.getBoundingClientRect(), radius = getComputedStyle(card).borderRadius;
    flood = document.createElement('div');
    flood.style.cssText = `position:fixed;z-index:2147483000;background:#cf6a32;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;border-radius:${radius};transition:left ${D}ms ${ease},top ${D}ms ${ease},width ${D}ms ${ease},height ${D}ms ${ease},border-radius ${D}ms`;
    frame = document.createElement('iframe'); frame.title = 'Anatomy of a Reel'; frame.setAttribute('allow', 'autoplay; fullscreen');
    frame.style.cssText = 'position:fixed;z-index:2147483001;inset:0;width:100%;height:100%;border:0;opacity:0;transition:opacity 300ms;background:#cf6a32';
    document.body.append(flood, frame); flood.getBoundingClientRect();
    Object.assign(flood.style, {left: 0, top: 0, width: '100%', height: '100%', borderRadius: 0});
    frame.src = here + 'index.html';
    setTimeout(() => { if(frame){ frame.style.opacity = 1; frame.focus(); } }, D * .85);
    document.documentElement.style.overflow = 'hidden';
    try{ history.pushState({story: 1}, ''); pushed = true; }catch(e){ pushed = false; }
  }
  function hide(fromPop){
    if(!open) return; open = false;
    const r = card.getBoundingClientRect(), f = frame, fl = flood; frame = flood = null;
    document.documentElement.style.overflow = '';
    f.style.opacity = 0;
    setTimeout(() => { f.remove(); Object.assign(fl.style, {left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: getComputedStyle(card).borderRadius, opacity: 0, transition: fl.style.transition + `,opacity ${D}ms`}); setTimeout(() => fl.remove(), D + 40); }, RM ? 0 : 220);
    if(pushed && !fromPop){ pushed = false; try{ history.back(); }catch(e){} }
    card.focus({preventScroll: true});
  }
  /* run before the page's own handler on the card (which opened the old article sheet) */
  document.addEventListener('click', e => { if(!e.target.closest || !e.target.closest('#acard')) return; if(document.body.classList.contains('cmode')) return; e.preventDefault(); e.stopPropagation(); show(); }, true);
  addEventListener('message', e => { if(e.data && e.data.story === 'close') hide(); });
  addEventListener('popstate', () => { if(open){ pushed = false; hide(true); } });
  addEventListener('keydown', e => { if(e.key === 'Escape' && open) hide(); });
})();
