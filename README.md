# tannerholman.space

Personal site for Tanner Holman: a single landing page built around "Arrival", a generative ink-and-wash drawing (p5 + p5.brush) with two links.

Static files, no build step. Deployed via GitHub Pages from `main`, served at [tannerholman.space](https://tannerholman.space) (custom domain set via `CNAME`).

## Structure

```
index.html                  # the landing page: drawing, name, links (all inline)
p5.min.js                   # p5 2.3.2, self-hosted
p5.brush.js                 # p5.brush 2.2.2, self-hosted
og.jpg                      # Open Graph image (a finished frame of the desktop composition)
favicon.svg, favicon.ico    # an open ensō ring in slate on paper
CNAME                       # tannerholman.space
60days-ofstanding/          # standalone: 60 days of standing
mothers-day-2026/           # standalone: Mother's Day 2026
```

The drawing runs two compositions of the same sketch: 1440×900 on landscape viewports, 900×1950 on portrait ones (viewport width / height < 0.8). Click or tap the drawing to skip to the finished state while it is drawing, or to replay it once finished; Space and R replay too. `prefers-reduced-motion` shows the finished drawing without animation.

## Local development

Serve the folder over HTTP (for example `python3 -m http.server`) and open `index.html`; the page loads its libraries from `/p5.min.js` and `/p5.brush.js` at the site root.

## Deployment

Push to `main`. GitHub Pages rebuilds in about a minute.
