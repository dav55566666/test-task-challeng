import { isVideoMedia } from "../../utils/isVideoMedia";

export type ProjectVideoClickPayload = {
  src: string;
  alt: string;
};

export type ProjectMediaProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  onVideoClick?: (payload: ProjectVideoClickPayload) => void;
};

export function ProjectMedia({
  src,
  alt,
  className,
  width,
  height,
  loading = "lazy",
  onVideoClick,
}: ProjectMediaProps) {
  if (isVideoMedia(src)) {
    const video = (
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
        aria-hidden={onVideoClick ? true : undefined}
        aria-label={onVideoClick ? undefined : alt}
      />
    );

    if (!onVideoClick) {
      return video;
    }

    return (
      <button
        type="button"
        className="group relative block h-full w-full cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
        onClick={() => onVideoClick({ src, alt })}
        aria-label={`Воспроизвести видео: ${alt}`}
      >
        {video}
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-2xl text-[#111111] shadow-lg">
            ▶
          </span>
        </span>
      </button>
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
