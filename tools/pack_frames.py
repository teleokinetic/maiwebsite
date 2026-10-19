"""Pack each set's body frames into one atlas and update the page's manifest (window.PRINT) for:
- base2.webp (the land without the link marks) and new low-res previews
- the frames atlas (d1 and p1 own one; d2 and p15 use those, as they already used their frames)
- the phone figure scale (comps.phone.fig) and where the figure ends (comps.phone.figBottom)
usage: python3 apply_manifest.py REPO LQIP_DESKTOP LQIP_PHONE"""
import sys, os, re, json
from PIL import Image

REPO, LQD, LQP = sys.argv[1:4]
PR = os.path.join(REPO, "print")
PAD = 4

atlases = {}
for d in ["d1", "p1"]:
    fs = sorted(f for f in os.listdir(os.path.join(PR, d)) if re.fullmatch(r"q\d\d\.webp", f))
    ims = [(f, Image.open(os.path.join(PR, d, f)).convert("RGBA")) for f in fs]
    AWmax = 2048
    x = y = rowh = 0
    pos = {}
    for f, im in ims:
        if x + im.width + PAD > AWmax:
            x, y, rowh = 0, y + rowh + PAD, 0
        pos[f] = (x, y, im.width, im.height)
        x += im.width + PAD
        rowh = max(rowh, im.height)
    AW = max(p[0] + p[2] for p in pos.values())
    AH = y + rowh
    atlas = Image.new("RGBA", (AW, AH), (0, 0, 0, 0))
    for f, im in ims:
        atlas.paste(im, pos[f][:2])
    out = os.path.join(PR, d, "frames.webp")
    atlas.save(out, quality=88, alpha_quality=100, method=6)
    atlases[d] = {"W": AW, "H": AH, "pos": pos}
    print(d, "atlas", AW, "x", AH, os.path.getsize(out) // 1024, "KB from", len(fs), "frames")

html_p = os.path.join(REPO, "index.html")
html = open(html_p).read()
m = re.search(r"window\.PRINT = (\{.*?\});\n", html)
P = json.loads(m.group(1))

P["comps"]["desktop"]["lqip"] = LQD
P["comps"]["phone"]["lqip"] = LQP
# the phone's figure, a little smaller, about a point on the ground under the cartwheel (sheet px); and its lowest
# point (the hands and the contact shadow), for placing the links under it
P["comps"]["phone"]["fig"] = {"s": 0.9, "o": [452, 1150]}
P["comps"]["phone"]["figBottom"] = 1165
P["links"] = {"desktop": "swipes", "phone": "swipes"}

for name, S in P["sets"].items():
    S["base"]["src"] = "base2.webp"
    mv = S["plate"]["movers"]
    own = name if name in atlases else ("d1" if name.startswith("d") else "p1")
    A = atlases[own]
    S["plate"]["atlas"] = {"src": "frames.webp" if own == name else f"../{own}/frames.webp", "W": A["W"], "H": A["H"]}
    for L in mv:
        f = os.path.basename(L["src"])
        L["a"] = list(A["pos"][f])
        del L["src"]

new = "window.PRINT = " + json.dumps(P, separators=(",", ":")) + ";\n"
html = html[:m.start()] + new + html[m.end():]
open(html_p, "w").write(html)
print("manifest updated")
