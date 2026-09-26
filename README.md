# tannerholman.space

Personal site for Tanner Holman: a single landing page built around a woodblock print of his first cartwheel in a high desert at first light, with his handwritten name and two links.

Static files, no build step. Deployed via GitHub Pages from `main`, served at [tannerholman.space](https://tannerholman.space) (custom domain set via `CNAME`).

## Structure

```
index.html                  # the landing page: the print's layer manifest, the player, the name, the links (all inline)
print/d1, print/d2          # the desktop print (1440 × 900) in layers, at 1x and 2x
print/p1, print/p15         # the phone print (900 × 1950) in layers, at 1x and 1.5x
og-3.jpg                    # Open Graph image: the finished print, 1200 × 630 (rename on change so link caches refresh)
favicon.svg, favicon.ico    # an open ensō ring in slate on paper
CNAME                       # tannerholman.space
60days-ofstanding/          # standalone: 60 days of standing
mothers-day-2026/           # standalone: Mother's Day 2026
```

## The landing

- **First frame:** the finished print without the cartwheel: sky, sun, clouds, land, the name and the links. A tiny inline preview of the land shows while the real one loads, so the page never opens on bare paper.
- **The cartwheel:** his body moves through every frame of the clip from the reach to the straddle (38 frames, 1.7 times slower than life, with a short trail), leaving the three key poses behind as pale ghosts. It lands in the straddle, where the colour print takes over the silhouette and the contact shadow comes up. About 3.7 s in all.
- **Then it holds:** each cloud drifts a few pixels and back over 40 to 60 seconds (CSS animations; nothing else runs).
- **Clicking the drawing does nothing.** The links are the only things that respond: following one dissolves the sheet to paper over 0.7 s, then navigates (which also gives GoatCounter time to count the click).
- **Reduced motion** shows the finished print, still. If the cartwheel's layers take more than five seconds longer than the land to arrive, the page opens on the finished print rather than starting late. Rotating or resizing into the other composition opens on the finished print too; it never replays.

Nothing is drawn live: each layer is a real print from the drawing's own code, and the last frame is the still pixel for pixel. The page only stacks the layers and runs the ink of the straddle as it takes.

### Screens

Portrait screens (width / height < 0.8) get the phone composition, 900 × 1950: it fills the width and sits at the top, so a shorter screen (Safari with its toolbars) loses only ground at the bottom. Everything else gets the desktop composition, 1440 × 900, filling the screen while keeping the name, links, sun and cartwheel in view (`comps.desktop.safe` in the manifest); a screen too wide or too narrow for that shows paper beside or above the print. The name is vector (the signature paths), the links are text, both set where the print has them.

The layer set is picked by how many screen pixels one sheet pixel gets: `d2` on a Retina desktop, `p15` on most phones. A visit loads about 730 KB on a Retina desktop, 500 KB on an ordinary one, and 570 to 780 KB on a phone, page included.

## Changing the print

The page is generated from the drawing's source (the `cartwheel-mockups` folder: `mock/` for the drawing, `site/` for this page). After a change to the drawing (the sweatshirt colour is one line, `SHIRT` in `mock/desertpolish.js`):

```
python3 mock/anim.py /tmp/a1 desktop sky2:wash --movers
python3 mock/anim.py /tmp/a2 desktop sky2:wash --movers --ss 2
python3 site/build.py <this repo> /tmp/a1 /tmp/a2
```

`site/index.template.html` is this page with the manifest, player and name left as placeholders; edit it there, not here.

## Local development

Serve the folder over HTTP (for example `python3 -m http.server`) and open `index.html`; the layers load from `/print/` at the site root.

## Deployment

Push to `main`. GitHub Pages rebuilds in about a minute.
