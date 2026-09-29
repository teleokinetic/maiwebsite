# tannerholman.space

Personal site for Tanner Holman: a single landing page built around a woodblock print of his first cartwheel in a high desert at first light, with his handwritten name and two links.

Static files, no build step. Deployed via GitHub Pages from `main`, served at [tannerholman.space](https://tannerholman.space) (custom domain set via `CNAME`).

## Structure

```
index.html                  # the landing page: the print's layer manifest, the player, the name, the links (all inline)
print/d1, print/d2          # the desktop print (1440 × 900) in layers, at 1x and 2x
print/p1, print/p15         # the phone print (900 × 1950) in layers, at 1x and 1.5x
og-4.jpg                    # the link preview picture: the phone print's sky and cartwheel with the name, 1200 × 1200
og-4-wide.jpg               # the wide one X uses, 1200 × 630 (rename both on change so link caches refresh)
favicon.svg, favicon.ico    # an open ensō ring in slate on paper
CNAME                       # tannerholman.space
60days-ofstanding/          # standalone: 60 days of standing
mothers-day-2026/           # standalone: Mother's Day 2026
```

## The landing

- **First frame:** the finished print without the cartwheel: sky, sun, clouds, land, the name and the links. A tiny inline preview of the land shows while the real one loads, so the page never opens on bare paper.
- **The cartwheel:** his body moves exactly as in the clip, from the reach to the straddle (38 frames, 1.7 times slower than life, with a short trail); each of the three key poses is printed where it happened and then drifts back along the ground into its place in the arc, as if the paper moved under it (a moving-plate chronophotograph). The body slows into the straddle, its last frames fading into each other, and lands.
- **The straddle** is printed onto the landing silhouette block by block, the way the woodblock is: sweatshirt, shorts and hair, skin, shoes, the shading, then the carved lines and key block. The fades overlap and ease in and out, and the dark silhouette thins as the colour arrives. The contact shadow comes up with it. About 4.3 s in all.
- **Then it holds:** each cloud drifts 12, 10 and 8 px and back over 47, 61 and 39 seconds (CSS animations). On the phone the long cloud crosses the sun, which shows faintly through it, so that one is redrawn on a small canvas a dozen times a second to keep the sun where it is.
- **Clicking the drawing does nothing.** The links are the only things that respond: following one dissolves the sheet to paper over 0.7 s, then navigates (which also gives GoatCounter time to count the click).
- **Reduced motion** shows the finished print, still. If the cartwheel's layers take more than five seconds longer than the land to arrive, the page opens on the finished print rather than starting late. Rotating or resizing into the other composition opens on the finished print too; it never replays.

Nothing is drawn live: each layer is a real print from the drawing's own code, and the last frame is the still pixel for pixel. The page only stacks the layers, moves the ghosts' ink over the land while they drift, and moves the one cloud over the sun.

### Screens

Portrait screens (width / height < 0.8) get the phone composition, 900 × 1950: it fills the width and sits at the top, so a shorter screen (Safari with its toolbars) loses only ground at the bottom. Everything else gets the desktop composition, 1440 × 900, filling the screen while keeping the name, links, sun and cartwheel in view (`comps.desktop.safe` in the manifest); a screen too wide or too narrow for that shows paper beside or above the print. The name is vector (the signature paths), the links are text, both set where the print has them. On desktop a carved rule is printed under each link (the key block's underline; pointing at a link lightens it); on the phone each link sits on a swipe carved out of the sky. Both are part of the land's layer.

The layer set is picked by how many screen pixels one sheet pixel gets: `d2` on a Retina desktop, `p15` on most phones. A visit loads about 930 KB on a Retina desktop, 590 KB on an ordinary one, and 730 KB to 1.1 MB on a phone, page included (plus the font).

## Changing the print

The page is generated from the drawing's source (the `cartwheel-mockups` folder: `mock/` for the drawing, `site/` for this page). After a change to the drawing (the sweatshirt colour is one line, `SHIRT` in `mock/desertpolish.js`):

```
python3 mock/anim.py /tmp/a1 desktop:rule sky2:wash --movers --plate --blocks
python3 mock/anim.py /tmp/a2 desktop:rule sky2:wash --movers --plate --blocks --ss 2
python3 site/build.py <this repo> /tmp/a1 /tmp/a2 --mode plate
```

`site/build.py`'s defaults are the choices above; each is a flag: `--straddle` (how the blocks arrive: `now`, `eased`, `lift`, `slow`), `--drift` (how far the clouds go: `now` 6 px, `x15`, `x2` 12 px, `x25`), `--links desktop=rule,phone=wash` (desktop `plain` or `rule`; phone `wash`, `rule` or `plain`) and `--og` (the preview picture: `phone`, `square`, `closer` or `whole`).

`site/index.template.html` is this page with the manifest, player and name left as placeholders; edit it there, not here.

## Local development

Serve the folder over HTTP (for example `python3 -m http.server`) and open `index.html`; the layers load from `/print/` at the site root.

## Deployment

Push to `main`. GitHub Pages rebuilds in about a minute.
