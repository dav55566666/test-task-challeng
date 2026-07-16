import { useEffect, useRef, useState } from "react";
import { VideoPlayerModal } from "../VideoPlayerModal";
import { IMAGES } from "../../design";
import "./styles/logo.scss";

export const Logo = () => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  /** Блок показываем сразу через poster, чтобы не было пустоты. */
  const [isPreviewMediaReady] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const maskVideoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const openPlayer = () => {
    maskVideoRef.current?.pause();
    setIsPlayerOpen(true);
  };

  const closePlayer = () => {
    setIsPlayerOpen(false);
  };

  /** Пауза hero-видео, когда ушли с первого экрана — не крутим S3 впустую. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /** Возврат из bfcache: Safari иногда сбрасывает размеры видео до «квадрата». */
  useEffect(() => {
    const maskV = maskVideoRef.current;
    if (!maskV) return;

    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      maskV.load();
      if (!isPlayerOpen && isInView) void maskV.play().catch(() => {});
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [isInView, isPlayerOpen]);

  /** Модалка / вне viewport — пауза; иначе play. */
  useEffect(() => {
    const maskVideo = maskVideoRef.current;
    if (!maskVideo) return;

    if (isPlayerOpen || !isInView) {
      maskVideo.pause();
      return;
    }
    void maskVideo.play().catch(() => {});
  }, [isPlayerOpen, isInView]);

  return (
    <>
      <div
        ref={rootRef}
        className={
          "logo-animation" +
          (isPreviewMediaReady ? " logo-animation--media-ready" : "") +
          (isPlayerOpen ? " logo-animation--modal-open" : "")
        }
      >
        <div className="logo-animation__scale">
          <div className="logo-animation__mask">
            <video
              poster={IMAGES.logoMask}
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
            onClick={openPlayer}
            aria-label="Открыть видео логотипа"
          >
            <span className="logo-animation__cta" aria-hidden>
              ↗
            </span>
          </button>
        </div>
      </div>

      {isPlayerOpen ? (
        <VideoPlayerModal
          isOpen
          onClose={closePlayer}
          src={IMAGES.logoVideo}
          ariaLabel="Видео логотипа"
        />
      ) : null}
    </>
  );
};
