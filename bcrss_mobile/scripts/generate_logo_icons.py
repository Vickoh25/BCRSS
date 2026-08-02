from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
ANDROID_RES = ROOT / "android" / "app" / "src" / "main" / "res"
WEB_DIR = ROOT / "web"
BRAND_DIR = ROOT / "assets" / "brand"


def scaled(points, scale):
    return [(round(x * scale), round(y * scale)) for x, y in points]


def draw_logo(size):
    scale = size / 1024
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)

    def box(x0, y0, x1, y1):
        return tuple(round(v * scale) for v in (x0, y0, x1, y1))

    def width(value):
        return max(1, round(value * scale))

    bg = "#F5FBF3"
    green_dark = "#17664B"
    green = "#1F7A5A"
    green_light = "#2EA06F"
    gold = "#F2B84B"
    clay = "#D96C4A"

    draw.rounded_rectangle(box(0, 0, 1024, 1024), radius=round(228 * scale), fill=bg)
    draw.ellipse(box(130, 130, 894, 894), fill=green)
    draw.ellipse(box(186, 186, 838, 838), fill=green_light)

    draw.rounded_rectangle(box(247, 284, 512, 713), radius=round(60 * scale), fill=bg)
    draw.rectangle(box(452, 284, 512, 713), fill=bg)
    draw.rounded_rectangle(box(512, 284, 777, 713), radius=round(60 * scale), fill=bg)
    draw.rectangle(box(512, 284, 572, 713), fill=bg)

    draw.line(scaled([(318, 386), (449, 386), (482, 419), (482, 620), (449, 653), (318, 653)], scale), fill=green_dark, width=width(32), joint="curve")
    draw.line(scaled([(706, 386), (575, 386), (542, 419), (542, 620), (575, 653), (706, 653)], scale), fill=green_dark, width=width(32), joint="curve")
    draw.line(scaled([(512, 315), (512, 751)], scale), fill=green_dark, width=width(30))

    draw.arc(box(360, 442, 476, 532), start=202, end=338, fill=gold, width=width(30))
    draw.arc(box(548, 442, 664, 532), start=202, end=338, fill=gold, width=width(30))
    draw.line(scaled([(386, 569), (462, 569)], scale), fill=clay, width=width(30))
    draw.line(scaled([(562, 569), (638, 569)], scale), fill=clay, width=width(30))

    draw.polygon(scaled([(512, 354), (473, 311), (448, 267), (438, 230), (445, 192), (475, 165), (512, 156), (549, 165), (579, 192), (586, 230), (576, 267), (551, 311)], scale), fill=gold)
    draw.ellipse(box(458, 224, 566, 332), fill=gold)
    draw.ellipse(box(485, 203, 539, 257), fill=green_dark)

    for cx, cy, radius in [(322, 724, 34), (702, 724, 34), (512, 804, 38)]:
        draw.ellipse(box(cx - radius, cy - radius, cx + radius, cy + radius), fill=gold)
    draw.line(scaled([(356, 737), (476, 788)], scale), fill=gold, width=width(22))
    draw.line(scaled([(668, 737), (548, 788)], scale), fill=gold, width=width(22))

    return canvas


def save_icon(path, size):
    path.parent.mkdir(parents=True, exist_ok=True)
    large = draw_logo(size * 4)
    image = large.resize((size, size), Image.Resampling.LANCZOS)
    image.save(path)


def main():
    BRAND_DIR.mkdir(parents=True, exist_ok=True)
    save_icon(BRAND_DIR / "bcrss-logo-1024.png", 1024)

    for density, size in {
        "mipmap-mdpi": 48,
        "mipmap-hdpi": 72,
        "mipmap-xhdpi": 96,
        "mipmap-xxhdpi": 144,
        "mipmap-xxxhdpi": 192,
    }.items():
        save_icon(ANDROID_RES / density / "ic_launcher.png", size)

    for name, size in {
        "favicon.png": 32,
        "icons/Icon-192.png": 192,
        "icons/Icon-maskable-192.png": 192,
        "icons/Icon-512.png": 512,
        "icons/Icon-maskable-512.png": 512,
    }.items():
        save_icon(WEB_DIR / name, size)


if __name__ == "__main__":
    main()
