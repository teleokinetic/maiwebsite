"""Take the link marks out of the print's land layers, at every resolution.
desktop (d1 1x, d2 2x): the carved rule printed under each link (sheet rows ~149-153)
phone (p1 1x, p15 1.5x): the two dry-brush washes carved out of the sky (sheet rows ~175-267, ~287-373)
Each band is refilled from the sky just above it (keeping the grain), with its colour shifted to the row's own sky,
and only where the mark actually is (a feathered mask), so the rest of the print stays the exact pixels.
usage: python3 clean_bases.py PRINTDIR   (writes <set>/base2.webp beside base.webp, and prints new lqips)"""
import sys, io, base64
import numpy as np
from PIL import Image, ImageFilter

PRINT = sys.argv[1]
SETS = {"d1": ("desktop", 1), "d2": ("desktop", 2), "p1": ("phone", 1), "p15": ("phone", 1.5)}
BANDS = {"desktop": [(146, 156)], "phone": [(172, 268), (284, 376)]}


def blur_mask(m, grow, soft):
    im = Image.fromarray((m * 255).astype(np.uint8))
    if grow > 1:
        im = im.filter(ImageFilter.MaxFilter(grow | 1))
    im = im.filter(ImageFilter.GaussianBlur(soft))
    return np.asarray(im).astype(float)[..., None] / 255


def clean(name):
    kind, ss = SETS[name]
    im = Image.open(f"{PRINT}/{name}/base.webp").convert("RGB")
    orig = np.asarray(im).astype(float)
    H, W, _ = orig.shape
    L = orig.mean(2)
    work = orig.copy()
    mark = np.zeros((H, W), bool)
    for a, b in BANDS[kind]:
        ya, yb = int(a * ss), int(np.ceil(b * ss))
        h = yb - ya
        # the sky's own brightness, row by row, from just above and below the band
        ref_rows = np.r_[max(ya - 6, 0):ya, yb:min(yb + 6, H)]
        # what the mark is: darker than the sky (rule) or lighter (wash), per row against the sky expected there,
        # read from just above and just below the band (the sun, just under the phone's second wash, left out)
        k = max(9, int(31 * ss)) | 1
        sm = lambda v: np.convolve(np.pad(v, k // 2, mode="edge"), np.ones(k) / k, mode="valid")
        g = max(2, int(2 * ss))
        A = orig[ya - g - int(4 * ss):ya - g].mean(0); B = orig[yb + g:yb + g + int(4 * ss)].mean(0)
        sun = (B[:, 0] - B[:, 2]) > 25
        B[sun] = A[sun] + (B[~sun].mean(0) - A[~sun].mean(0))
        LA, LB = sm(A.mean(1)), sm(B.mean(1))
        for y in range(ya, yb):
            t = (y - ya + 0.5) / h
            d = L[y] - ((1 - t) * LA + t * LB)
            mark[y] |= (d < -7) if kind == "desktop" else (d > 6)
        # refill from the rows above, matching each row's colour to the clean pixels of that row
        for y in range(ya, yb):
            src = y - h
            clean_px = ~mark[y]
            if clean_px.sum() > W * 0.05:
                shift = orig[y][clean_px].mean(0) - work[src][clean_px].mean(0)
            else:
                shift = orig[ref_rows].mean((0, 1)) - work[src].mean(0)
            work[y] = work[src] + shift
    m = blur_mask(mark.astype(float), int(9 * ss), 2.5 * ss)
    out = orig * (1 - m) + work * m
    out = np.clip(out, 0, 255).astype(np.uint8)
    Image.fromarray(out).save(f"{PRINT}/{name}/base2.webp", quality=90, method=6)
    changed = (np.abs(out.astype(int) - orig.astype(int)).max(2) > 3)
    ys = np.where(changed.any(1))[0]
    print(name, out.shape[1], "x", out.shape[0], "changed rows", (ys.min(), ys.max()) if len(ys) else None,
          "px", int(changed.sum()))
    return Image.fromarray(out)


outs = {n: clean(n) for n in SETS}
for kind, n, size in [("desktop", "d1", (72, 45)), ("phone", "p1", (36, 78))]:
    b = io.BytesIO()
    outs[n].resize(size, Image.LANCZOS).save(b, "WEBP", quality=60)
    print("LQIP", kind, "data:image/webp;base64," + base64.b64encode(b.getvalue()).decode())
