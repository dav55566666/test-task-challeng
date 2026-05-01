#!/usr/bin/env bash
# Remuxes logo-bg-video.mp4 with moov at file start so playback can begin
# while the rest downloads (HTTP progressive / range requests).
# Requires: ffmpeg (brew install ffmpeg)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/src/assets/logo-bg-video.mp4"
TMP="$ROOT/src/assets/logo-bg-video.faststart.tmp.mp4"
if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install: brew install ffmpeg" >&2
  exit 1
fi
if [[ ! -f "$SRC" ]]; then
  echo "Missing: $SRC" >&2
  exit 1
fi
ffmpeg -y -i "$SRC" -c copy -movflags +faststart "$TMP"
mv "$TMP" "$SRC"
echo "Done: faststart applied to logo-bg-video.mp4"
