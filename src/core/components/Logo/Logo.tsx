import { useEffect, useRef, useState } from "react";
import { VideoPlayerModal } from "../VideoPlayerModal";
import { IMAGES } from '../../design';
import './styles/logo.scss';

export const Logo = () => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPreviewMediaReady, setIsPreviewMediaReady] = useState(false);
  const [previewMediaSession, setPreviewMediaSession] = useState(0);
  const maskVideoRef = useRef<HTMLVideoElement>(null);

  const openPlayer = () => {
    maskVideoRef.current?.pause();
    setIsPlayerOpen(true);
  };

  const closePlayer = () => {
    setIsPlayerOpen(false);
  };

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

  /** Пока модалка открыта — анимация в логотипе на паузе; после закрытия снова играет. */
  useEffect(() => {
    const maskVideo = maskVideoRef.current;
    if (!maskVideo) return;

    if (isPlayerOpen) {
      maskVideo.pause();
      return;
    }

    void maskVideo.play().catch(() => { });
  }, [isPlayerOpen]);

  return (
    <>
      <div
        className={
          "logo-animation" +
          (isPreviewMediaReady ? " logo-animation--media-ready" : "") +
          (isPlayerOpen ? " logo-animation--modal-open" : "")
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
            onClick={openPlayer}
            aria-label="Открыть видео логотипа"
          >
            <span className="logo-animation__cta" aria-hidden>
              ↗
            </span>
          </button>
        </div>
      </div>

      <VideoPlayerModal
        isOpen={isPlayerOpen}
        onClose={closePlayer}
        src={IMAGES.logoVideo}
        ariaLabel="Видео логотипа"
      />
    </>
  );
};
