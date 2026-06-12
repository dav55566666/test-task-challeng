import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Plyr } from "plyr-react";
import type { APITypes } from "plyr-react";
import { IMAGES } from '../../design';
import './styles/logo.scss';
import "plyr-react/plyr.css";

export const Logo = () => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlayerFullscreen, setIsPlayerFullscreen] = useState(false);
  const [isPreviewMediaReady, setIsPreviewMediaReady] = useState(false);
  const [previewMediaSession, setPreviewMediaSession] = useState(0);
  const maskVideoRef = useRef<HTMLVideoElement>(null);
  const modalPlyrRef = useRef<APITypes | null>(null);

  const playerSource = useMemo(
    () => ({
      type: "video" as const,
      sources: [{ src: IMAGES.logoVideo, type: "video/mp4" }],
    }),
    []
  );

  const modalPlayerOptions = useMemo(
    () => ({
      autoplay: true,
      muted: false,
      hideControls: false,
      fullscreen: {
        enabled: true,
        fallback: true,
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
    }),
    []
  );

  useEffect(() => {
    if (!isPlayerOpen) return;

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
      setIsPlayerOpen(false);
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
  }, [isPlayerOpen]);

  /** Hero: не показываем блок пока анимация логотипа не готова к проигрыванию. */
  useEffect(() => {
    const v = maskVideoRef.current;
    if (!v) return;

    let settled = false;
    const onReady = () => {
      if (settled) return;
      settled = true;
      setIsPreviewMediaReady(true);
    };

    if (v.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      onReady();
      return;
    }

    v.addEventListener("canplaythrough", onReady, { once: true });
    v.addEventListener("loadeddata", onReady, { once: true });
    v.addEventListener("error", onReady, { once: true });

    return () => {
      v.removeEventListener("canplaythrough", onReady);
      v.removeEventListener("loadeddata", onReady);
      v.removeEventListener("error", onReady);
    };
  }, [previewMediaSession]);

  /** Возврат из bfcache: Safari иногда сбрасывает размеры видео до «квадрата». */
  useEffect(() => {
    const maskV = maskVideoRef.current;
    if (!maskV) return;

    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      setIsPreviewMediaReady(false);
      setPreviewMediaSession((n) => n + 1);
      maskV.load();
      void maskV.play().catch(() => { });
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  /** После закрытия модалки снова запускаем анимацию (некоторые браузеры ставят видео на паузу). */
  useEffect(() => {
    if (isPlayerOpen) return;
    void maskVideoRef.current?.play().catch(() => { });
  }, [isPlayerOpen]);

  /** Открытие модалки по клику — пытаемся сразу запустить ролик со звуком из user-gesture. */
  useEffect(() => {
    if (!isPlayerOpen) return;
    const timer = window.setTimeout(() => {
      const player = modalPlyrRef.current?.plyr;
      if (!player) return;
      player.muted = false;
      player.volume = 1;
      void Promise.resolve(player.play()).catch(() => { });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [isPlayerOpen]);

  /** Снимаем overflow у модалки, иначе Plyr fallback fullscreen обрезается контейнером. */
  useEffect(() => {
    if (!isPlayerOpen) {
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
  }, [isPlayerOpen]);

  return (
    <>
      <div
        className={
          "logo-animation" +
          (isPreviewMediaReady ? " logo-animation--media-ready" : "")
        }
      >
        <div className="logo-animation__scale">
          <div className="logo-animation__mask">
            <video
              ref={maskVideoRef}
              className="logo-animation__mask-video"
              src={IMAGES.logoAnimation}
              preload="auto"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <button
            type="button"
            className="logo-animation__video"
            onClick={() => setIsPlayerOpen(true)}
            aria-label="Открыть видео логотипа"
          >
            <span className="logo-animation__cta" aria-hidden>
              ↗
            </span>
          </button>
        </div>
      </div>

      {isPlayerOpen
        ? createPortal(
          <div
            className={
              "logo-video-modal fixed inset-0 flex items-center justify-center px-5" +
              (isPlayerFullscreen ? " logo-video-modal--player-fullscreen" : "")
            }
            onClick={() => setIsPlayerOpen(false)}
            role="presentation"
          >
            <div
              className="logo-video-modal__content relative w-full max-w-5xl overflow-hidden rounded-[10px] p-4 md:p-6"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Видео логотипа"
            >
              <div className="logo-video-modal__player-wrap w-full max-h-[80vh]">
                <button
                  type="button"
                  onClick={() => setIsPlayerOpen(false)}
                  className="absolute right-3 top-3 z-20 rounded-full bg-white/90 px-3 py-1 text-sm text-[#111111] md:right-4 md:top-4"
                  aria-label="Закрыть плеер"
                >
                  Close
                </button>
                <Plyr
                  ref={modalPlyrRef}
                  source={playerSource}
                  options={modalPlayerOptions}
                />
              </div>
            </div>
          </div>,
          document.body
        )
        : null}
    </>
  );
};
