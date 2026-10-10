from pathlib import Path
from PIL import Image, ImageOps
import shutil

ROOT = Path(".")
DIRS = [ROOT / "assets/images/project-images", ROOT / "assets/images/profile"]
FILES_TO_UPDATE = [ROOT / "js/projects.js", ROOT / "index.html"]
BACKUP = ROOT.parent / "portfolio-original-images"   # di luar folder website
EXT = {".png", ".jpg", ".jpeg"}
MAX_SIDE = 1600   # sisi terpanjang maksimal (rasio tetap, tidak di-stretch)

changed = {}
for d in DIRS:
    for f in list(d.rglob("*")):
        if f.suffix.lower() not in EXT:
            continue
        backup = BACKUP / f.relative_to(ROOT)
        backup.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(f, backup)

        im = ImageOps.exif_transpose(Image.open(f))
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA")
        im.thumbnail((MAX_SIDE, MAX_SIDE))
        out = f.with_suffix(".webp")
        im.save(out, "WEBP", quality=80, method=6)
        f.unlink()
        changed[f.as_posix()] = out.as_posix()
        print(f"{f.name} -> {out.name}")

# Perbarui path di kode
for target in FILES_TO_UPDATE:
    text = target.read_text(encoding="utf-8")
    for old, new in changed.items():
        text = text.replace(old, new)
    target.write_text(text, encoding="utf-8")

print(f"\nSelesai: {len(changed)} gambar. Asli disimpan di {BACKUP.resolve()}")