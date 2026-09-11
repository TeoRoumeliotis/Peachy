#!/usr/bin/env python3
"""Rasterize Peachy PWA icons and iOS splash screens from generated art."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path("/workspace")
PUBLIC = ROOT / "public"
SPLASH_DIR = PUBLIC / "splash"

ICON_SRC = ROOT / "artifacts/imagine_images/734e0833-5a6b-438e-a1ba-bb0d5806df43.jpg"
MASCOT_SRC = ROOT / "artifacts/imagine_images/f796fd4a-41f9-4309-945e-ab0d3cc30035.jpg"

PEACH = (244, 162, 127, 255)

# (file stem, css width, css height, pixel ratio) — portrait iPhone splash
SPLASHES = [
    ("splash-440x956@3", 440, 956, 3),
    ("splash-430x932@3", 430, 932, 3),
    ("splash-428x926@3", 428, 926, 3),
    ("splash-414x896@3", 414, 896, 3),
    ("splash-414x896@2", 414, 896, 2),
    ("splash-402x874@3", 402, 874, 3),
    ("splash-393x852@3", 393, 852, 3),
    ("splash-390x844@3", 390, 844, 3),
    ("splash-375x812@3", 375, 812, 3),
    ("splash-375x667@2", 375, 667, 2),
]


def save_png(im: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.convert("RGB").save(path, "PNG", optimize=True)


def main() -> None:
    icon = Image.open(ICON_SRC).convert("RGBA")
    mascot = Image.open(MASCOT_SRC).convert("RGBA")
    cream = mascot.getpixel((8, 8))
    if len(cream) == 4:
        cream = cream[:3]

    for size, name in (
        (180, "apple-touch-icon.png"),
        (192, "icon-192.png"),
        (512, "icon-512.png"),
    ):
        save_png(icon.resize((size, size), Image.Resampling.LANCZOS), PUBLIC / name)

    # Maskable: glyph inside the center ~80% safe zone on peach fill.
    maskable = Image.new("RGBA", (512, 512), PEACH)
    inner = icon.resize((410, 410), Image.Resampling.LANCZOS)
    maskable.paste(inner, ((512 - 410) // 2, (512 - 410) // 2), inner)
    save_png(maskable, PUBLIC / "icon-512-maskable.png")

    SPLASH_DIR.mkdir(parents=True, exist_ok=True)
    for stem, css_w, css_h, dpr in SPLASHES:
        w, h = css_w * dpr, css_h * dpr
        canvas = Image.new("RGB", (w, h), cream)
        # Mascot plate ~52% of width, optically a little above center.
        plate = int(w * 0.52)
        fruit = mascot.resize((plate, plate), Image.Resampling.LANCZOS)
        x = (w - plate) // 2
        y = int(h * 0.38) - plate // 2
        canvas.paste(fruit.convert("RGB"), (x, y))
        save_png(canvas, SPLASH_DIR / f"{stem}.png")

    print("wrote icons + splash")


if __name__ == "__main__":
    main()
