import { isVideoMedia } from "../../utils/isVideoMedia";

export type ProjectMediaProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
};

export function ProjectMedia({
  src,
  alt,
  className,
  width,
  height,
  loading = "lazy",
}: ProjectMediaProps) {
  if (isVideoMedia(src)) {
    return (
      <video
        src={src}
        className={className}
        width={width}
        height={height}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controls={false}
        preload={loading === "eager" ? "auto" : "metadata"}
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={className}
    />
  );
}
