import { useEffect, useRef, useState } from "react";

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
  fetchPriority?: "high" | "low" | "auto";
  onVideoClick?: (payload: ProjectVideoClickPayload) => void;
};

/**
 * S3-медиа: `src` вешаем только после появления у viewport (или сразу при eager).
 * Видео вне экрана — pause.
 */
function useLazyMediaActivation(lazy: boolean) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [activated, setActivated] = useState(!lazy);
  const [inView, setInView] = useState(!lazy);

  useEffect(() => {
    if (!lazy) {
      setActivated(true);
      setInView(true);
      return;
    }

    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setInView(visible);
        if (visible) setActivated(true);
      },
      { rootMargin: "240px 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy]);

  return { rootRef, activated, inView };
}

export function ProjectMedia({
  src,
  alt,
  className,
  width,
  height,
  loading = "lazy",
  fetchPriority,
  onVideoClick,
}: ProjectMediaProps) {
  const lazy = loading === "lazy";
  const isVideo = isVideoMedia(src);
  const { rootRef, activated, inView } = useLazyMediaActivation(lazy);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isVideo) return;
    const video = videoRef.current;
    if (!video || !activated) return;

    if (inView) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [activated, inView, isVideo, src]);

  if (isVideo) {
    const video = (
      <video
        ref={(node) => {
          videoRef.current = node;
          if (!onVideoClick) {
            rootRef.current = node;
          }
        }}
        src={activated ? src : undefined}
        className={className}
        width={width}
        height={height}
        autoPlay={activated && inView}
        loop
        muted
        playsInline
        disablePictureInPicture
        controls={false}
        preload={activated ? (lazy ? "metadata" : "auto") : "none"}
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
        ref={(node) => {
          rootRef.current = node;
        }}
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
      ref={(node) => {
        rootRef.current = node;
      }}
      src={activated ? src : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      className={className}
    />
  );
}
