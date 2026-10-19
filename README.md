# tannerholman.space

Personal site for Tanner Holman: a single landing page built around a woodblock print of his first cartwheel in a high desert at first light, with his handwritten name and two links.

Static files, no build step. Deployed via GitHub Pages from `main`, served at [tannerholman.space](https://tannerholman.space) (custom domain set via `CNAME`).

## Structure

```
index.html                  # the landing page: the print's layer manifest, the player, the name, the links (all inline)
print/d1, print/d2          # the desktop print (1440 × 900) in layers, at 1x and 2x
print/p1, print/p15         # the phone print (900 × 1950) in layers, at 1x and 1.5x
print/links                 # the two swipes the links sit on (cut from the phone sky's dry-brush washes)
tools/                      # one-off scripts for the October 2026 changes (see below)
og-4.jpg                    # the link preview picture: the phone print's sky and cartwheel with the name, 1200 × 1200
og-4-wide.jpg               # the wide one X uses, 1200 × 630 (rename both on change so link caches refresh)
favicon.svg, favicon.ico    # an open ensō ring in slate on paper
CNAME                       # tannerholman.space
60days-ofstanding/          # standalone: 60 days of standing
mothers-day-2026/           # standalone: Mother's Day 2026
```

## The landing

- **First frame:** the finished print without the cartwheel: sky, sun, clouds, land, the name, the line under it ("Helping meditators feel good in their bodies.") and the links. A tiny inline preview of the land shows while the real one loads, so the page never opens on bare paper.
- **The cartwheel:** his body moves exactly as in the clip, from the reach to the straddle (38 frames, 1.7 times slower than life, with a short trail); each of the three key poses is printed where it happened and then drifts back along the ground into its place in the arc, as if the paper moved under it (a moving-plate chronophotograph). The body slows into the straddle, its last frames fading into each other, and lands.
- **The straddle** is printed onto the landing silhouette block by block, the way the woodblock is: sweatshirt, shorts and hair, skin, shoes, the shading, then the carved lines and key block. The fades overlap and ease in and out, and the dark silhouette thins as the colour arrives. The contact shadow comes up with it. About 4.3 s in all.
- **Then it holds:** each cloud drifts 12, 10 and 8 px and back over 47, 61 and 39 seconds (CSS animations). On the phone the long cloud crosses the sun, which shows faintly through it, so that one is redrawn on a small canvas a dozen times a second to keep the sun where it is.
- **Clicking the drawing does nothing.** The links are the only things that respond: following one dissolves the sheet to paper over 0.7 s, then navigates (which also gives GoatCounter time to count the click).
- **Reduced motion** shows the finished print, still. If the cartwheel's layers take more than five seconds longer than the land to arrive, the page opens on the finished print rather than starting late. Rotating or resizing into the other composition opens on the finished print too; it never replays.

Nothing is drawn live: each layer is a real print from the drawing's own code, and the last frame is the still pixel for pixel. The page only stacks the layers, moves the ghosts' ink over the land while they drift, and moves the one cloud over the sun.

### Screens

Portrait screens (width / height < 0.8) get the phone composition, 900 × 1950: it fills the width and sits at the top, so a shorter screen (Safari with its toolbars) loses only ground at the bottom. Everything else gets the desktop composition, 1440 × 900, filling the screen while keeping the name, links, sun and cartwheel in view (`comps.desktop.safe` in the manifest); a screen too wide or too narrow for that shows paper beside or above the print. The name is vector (the signature paths); the line under it and the links are text, set in EB Garamond.

**The line under the name** is a quieter italic (#45372f) than the name: one line on desktop, two on the phone.

**The links** each sit on their own swipe (`print/links/swipe-a.webp`, `swipe-b.webp`), drawn as a nine-slice so the frayed ends keep their shape and only the middle stretches to the words. Desktop: one row under the line, the second swipe tucked under the end of the first. Phone: stacked on the ground at the foot of the screen, in thumb's reach, at one size on screen (48 px tall), placed from the room left under the cartwheel (`comps.phone.figBottom`). A screen too short for that (an iPhone SE in Safari, an iPad in portrait) keeps them in the sky under the name instead, with the line moved into the open sky below them, left of the sun (`data-plinks="sky"`).

**The phone's figure** (ghosts, body, straddle, shadow) is shown at 0.9 about a point on the ground under the cartwheel (`comps.phone.fig`), so the hands and the raised foot clear the screen's right edge. The moving-plate canvas draws the land from where it lands after that scaling, so the ground under the drifting ghosts stays in register.

The layer set is picked by how many screen pixels one sheet pixel gets: `d2` on a Retina desktop, `p15` on most phones. The cartwheel's 38 body frames come in one file per composition (`print/d1/frames.webp`, `print/p1/frames.webp`; each frame's place in it is `a` in the manifest), so a visit makes about 22 requests for the print instead of about 60.

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

## October 2026 changes (made in the page, not yet in the drawing's source)

The `cartwheel-mockups` source was not to hand, so these were made directly here; port them to `site/index.template.html` and `site/build.py` before regenerating the page from the source, or they will be lost:

- the land layers no longer carry the links' marks (the desktop's carved rules, the phone sky's two washes): `print/*/base2.webp`, made from `base.webp` by `tools/clean_bases.py` (each band refilled from the sky just above it, only where the mark was). Rendering the land with `--links desktop=plain,phone=plain` should give the same thing from the source.
- the swipes, cut from the phone sky's washes, are separate files in `print/links/`.
- the body frames are packed into `frames.webp` by `tools/pack_frames.py`, which also wrote the manifest changes (`base2.webp`, the new low-res previews, `atlas` and `a`, `comps.phone.fig` and `figBottom`).
- the line under the name, the link layout and the phone figure's scale are in the page's CSS and scripts.

