const VIDEO_EXT_RE = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;

export function isVideoMedia(src: string): boolean {
  return VIDEO_EXT_RE.test(src);
}
