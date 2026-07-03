import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Plyr } from "plyr-react";
import type { APITypes } from "plyr-react";

import { getVideoMimeType } from "../../utils/getVideoMimeType";

import "./styles/video-player-modal.scss";
import "plyr-react/plyr.css";

export type VideoPlayerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  ariaLabel: string;
};

const PLAYER_OPTIONS = {
  autoplay: true,
  muted: false,
  hideControls: false,
  fullscreen: {
    enabled: true,
    fallback: true,
    iosNative: true,
  },
  controls: [
    "play-large",
    "play",
    "progress",
    "current-time",
    "mute",
    "volume",
    "fullscreen",
  ],
};

export function VideoPlayerModal({
  isOpen,
  onClose,
  src,
  ariaLabel,
}: VideoPlayerModalProps) {
  const [isPlayerFullscreen, setIsPlayerFullscreen] = useState(false);
  const modalPlyrRef = useRef<APITypes | null>(null);

  const playerSource = useMemo(
    () => ({
      type: "video" as const,
      sources: [{ src, type: getVideoMimeType(src) }],
    }),
    [src]
  );

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousHtmlOverscrollBehavior = html.style.overscrollBehavior;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyLeft = body.style.left;
    const previousBodyRight = body.style.right;
    const previousBodyWidth = body.style.width;

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const player = modalPlyrRef.current?.plyr;
      if (player?.fullscreen.active) {
        player.fullscreen.exit();
        return;
      }
      onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      html.style.overflow = previousHtmlOverflow;
      html.style.overscrollBehavior = previousHtmlOverscrollBehavior;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.left = previousBodyLeft;
      body.style.right = previousBodyRight;
      body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => {
      const player = modalPlyrRef.current?.plyr;
      if (!player) return;
      player.muted = false;
      player.volume = 1;
      void Promise.resolve(player.play()).catch(() => {});
    }, 0);
    return () => window.clearTimeout(timer);
  }, [isOpen, src]);

  useEffect(() => {
    if (!isOpen) {
      setIsPlayerFullscreen(false);
      return;
    }

    let detach: (() => void) | undefined;
    const timer = window.setTimeout(() => {
      const player = modalPlyrRef.current?.plyr;
      if (!player) return;

      const onEnter = () => setIsPlayerFullscreen(true);
      const onExit = () => setIsPlayerFullscreen(false);

      player.on("enterfullscreen", onEnter);
      player.on("exitfullscreen", onExit);
      detach = () => {
        player.off("enterfullscreen", onEnter);
        player.off("exitfullscreen", onExit);
      };
    }, 0);

    return () => {
      window.clearTimeout(timer);
      detach?.();
      setIsPlayerFullscreen(false);
    };
  }, [isOpen, src]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={
        "video-player-modal fixed inset-0 z-20 flex items-center justify-center px-5" +
        (isPlayerFullscreen ? " video-player-modal--player-fullscreen" : "")
      }
      onClick={onClose}
      role="presentation"
    >
      <div
        className="video-player-modal__content relative w-full max-w-5xl overflow-hidden rounded-[10px] p-4 md:p-6"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        <div className="video-player-modal__player-wrap w-full max-h-[80vh]">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-20 rounded-full bg-white/90 px-3 py-1 text-sm text-[#111111] md:right-4 md:top-4"
            aria-label="Закрыть плеер"
          >
            Закрыть
          </button>
          <Plyr
            key={src}
            ref={modalPlyrRef}
            source={playerSource}
            options={PLAYER_OPTIONS}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
