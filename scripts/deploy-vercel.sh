#!/usr/bin/env bash
# Deploy to Vercel: temporarily stub files >= 100MB (Vercel Hobby limit), then restore.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

BACKUP_DIR=".local-media-backup"
LIMIT=$((100 * 1024 * 1024))

cleanup_restore() {
  if [[ -d "$BACKUP_DIR" ]]; then
    python3 - <<'PY'
from pathlib import Path
import shutil
backup = Path(".local-media-backup")
root = Path("src/assets/projects")
if not backup.exists():
    raise SystemExit(0)
for bak in backup.rglob("*"):
    if not bak.is_file():
        continue
    dest = root / bak.relative_to(backup)
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        dest.unlink()
    shutil.move(str(bak), str(dest))
    print(f"restored {dest}")
shutil.rmtree(backup, ignore_errors=True)
PY
  fi
}

trap cleanup_restore EXIT

python3 - <<PY
from pathlib import Path
import shutil
root = Path("src/assets/projects")
backup = Path("$BACKUP_DIR")
limit = $LIMIT
videos = [p for p in root.rglob("*") if p.is_file() and p.suffix.lower() in {".mp4", ".mov"}]
if not videos:
    raise SystemExit(0)
videos.sort(key=lambda p: p.stat().st_size)
small = videos[0]
over = [p for p in videos if p.stat().st_size >= limit]
for p in over:
    rel = p.relative_to(root)
    bak = backup / rel
    bak.parent.mkdir(parents=True, exist_ok=True)
    if bak.exists():
        bak.unlink()
    shutil.move(str(p), str(bak))
    shutil.copy2(str(small), str(p))
    print(f"stubbed {p} ({bak.stat().st_size // (1024*1024)}MB)")
PY

ARGS=("$@")
if [[ ${#ARGS[@]} -eq 0 ]]; then
  ARGS=(--prod --yes)
fi

./node_modules/.bin/vercel "${ARGS[@]}"
