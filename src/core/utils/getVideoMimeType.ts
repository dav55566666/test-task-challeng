const VIDEO_MIME_BY_EXT: Record<string, string> = {
  mp4: "video/mp4",
  webm: "video/webm",
  ogg: "video/ogg",
  mov: "video/quicktime",
};

export function getVideoMimeType(src: string): string {
  const ext = src.split(".").pop()?.split("?")[0]?.toLowerCase();
  return (ext && VIDEO_MIME_BY_EXT[ext]) || "video/mp4";
}
