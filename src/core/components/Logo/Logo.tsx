import type { CSSProperties } from "react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Plyr } from "plyr-react";
import { IMAGES } from '../../design';
import { LOGO_INNER_HOLE } from './logoShape';
import './styles/logo.scss';
import "plyr-react/plyr.css";

export const Logo = () => {
  const uid = useId().replace(/:/g, "");
  const filterId = `logo-mask-wave-${uid}`;
  const innerMaskId = `logo-mask-inner-${uid}`;
  const innerHoleMaskFeatherId = `logo-inner-mask-feather-${uid}`;
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const previewWrapRef = useRef<HTMLButtonElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  const syncPreviewAspectFromVideo = useCallback(() => {
    const v = previewVideoRef.current;
    const btn = previewWrapRef.current;
    if (!v || !btn || !v.videoWidth || !v.videoHeight) return;
    btn.style.aspectRatio = `${v.videoWidth} / ${v.videoHeight}`;
  }, []);

  const { cx, cy, r } = LOGO_INNER_HOLE;
  const playerSource = useMemo(
    () => ({
      type: "video" as const,
      sources: [{ src: IMAGES.logoVideo, type: "video/mp4" }],
    }),
    []
  );

  useEffect(() => {
    if (!isPlayerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPlayerOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isPlayerOpen]);

  /** Возврат из bfcache (назад в браузере): Safari иногда сбрасывает размеры видео до «квадрата». */
  useEffect(() => {
    const v = previewVideoRef.current;
    if (!v) return;

    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      v.load();
      void v.play().catch(() => {});
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  /** После закрытия модалки снова запускаем превью (некоторые браузеры ставят фон на паузу). */
  useEffect(() => {
    if (isPlayerOpen) return;
    const v = previewVideoRef.current;
    if (!v) return;
    void v.play().catch(() => {});
  }, [isPlayerOpen]);

  return (
    <>
      <div className="logo-animation">
        <div className="logo-animation__scale">
          <div className="logo-animation__mask">
            <svg className="logo-animation__svg-filters" aria-hidden focusable="false">
              <defs>
              {/* Размытие только по альфа-маске: мягкий переход стабильного центра ↔ волна (без среза) */}
              <filter
                id={innerHoleMaskFeatherId}
                filterUnits="objectBoundingBox"
                primitiveUnits="objectBoundingBox"
                x="-0.25"
                y="-0.25"
                width="1.5"
                height="1.5"
                colorInterpolationFilters="sRGB"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.014" />
              </filter>
              <mask
                id={innerMaskId}
                maskUnits="objectBoundingBox"
                maskContentUnits="objectBoundingBox"
              >
                <rect width="1" height="1" fill="white" />
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="black"
                  filter={`url(#${innerHoleMaskFeatherId})`}
                />
              </mask>
              <filter
                id={filterId}
                x="-120%"
                y="-120%"
                width="340%"
                height="340%"
                colorInterpolationFilters="sRGB"
              >
                {/* Статичный шум: анимация baseFrequency даёт скачки текстуры между ключами (как дроп кадров). Движение только через feOffset + scale. */}
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.0095 0.0026"
                  numOctaves="1"
                  seed="7"
                  stitchTiles="stitch"
                  result="noise"
                />
                <feOffset in="noise" result="noiseScrollX" dx="0" dy="0">
                  <animate
                    attributeName="dx"
                    dur="5s"
                    values="0;280;0"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                  />
                </feOffset>
                <feOffset in="noiseScrollX" result="noiseSmooth" dx="0" dy="0">
                  {/* Сдвиг по фазе через ключи — без отрицательного begin (нет рывка на первом кадре) */}
                  <animate
                    attributeName="dy"
                    dur="5s"
                    values="21;0;-21;0;21"
                    keyTimes="0;0.25;0.5;0.75;1"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"
                  />
                </feOffset>
                {/* R=G=B=alpha: волнуем только там, где есть непрозрачный градиент; в прозрачности — нейтраль 0.5 → сдвиг 0 (дырка/фон не «ползут») */}
                <feColorMatrix
                  in="SourceGraphic"
                  type="matrix"
                  values="0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 0"
                  result="alphaRGB"
                />
                <feFlood floodColor="#808080" floodOpacity="1" result="half" />
                <feComposite
                  in="noiseSmooth"
                  in2="alphaRGB"
                  operator="arithmetic"
                  k1="1"
                  k2="0"
                  k3="0"
                  k4="0"
                  result="noiseScaled"
                />
                <feComposite
                  in="half"
                  in2="alphaRGB"
                  operator="arithmetic"
                  k1="-1"
                  k2="1"
                  k3="0"
                  k4="0"
                  result="biasScaled"
                />
                <feComposite
                  in="noiseScaled"
                  in2="biasScaled"
                  operator="arithmetic"
                  k1="0"
                  k2="1"
                  k3="1"
                  k4="0"
                  result="noiseForDisplacement"
                />
                {/* Сглаживание карты смещения: меньше «ступенек» на стыке зон с разной волной */}
                <feGaussianBlur
                  in="noiseForDisplacement"
                  stdDeviation="0.85"
                  result="noiseDispMapSoft"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noiseDispMapSoft"
                  scale="9.2"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  edgeMode="duplicate"
                  result="dist"
                >
                  <animate
                    attributeName="scale"
                    dur="5s"
                    values="8.4;9.1;8.4"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                  />
                </feDisplacementMap>
              </filter>
              </defs>
            </svg>
            <img
              className="logo-animation__mask-img logo-animation__mask-img--stable"
              src={IMAGES.logoMaskGradient}
              alt=""
            />
            <img
              className="logo-animation__mask-img logo-animation__mask-img--wave"
              src={IMAGES.logoMaskGradient}
              alt=""
              style={
                {
                  filter: `url(#${filterId})`,
                  mask: `url(#${innerMaskId})`,
                  WebkitMask: `url(#${innerMaskId})`,
                } as CSSProperties
              }
            />
          </div>
          <button
            ref={previewWrapRef}
            type="button"
            className="logo-animation__video"
            onClick={() => setIsPlayerOpen(true)}
            aria-label="Открыть видео логотипа"
          >
            <video
              ref={previewVideoRef}
              src={IMAGES.logoVideo}
              poster={IMAGES.logoMaskGradient}
              preload="auto"
              autoPlay
              muted
              loop
              playsInline
              onLoadedMetadata={syncPreviewAspectFromVideo}
            />
          </button>
        </div>
      </div>

      {isPlayerOpen
        ? createPortal(
            <div
              className="logo-video-modal fixed inset-0 flex items-center justify-center px-5"
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
                <button
                  type="button"
                  onClick={() => setIsPlayerOpen(false)}
                  className="absolute right-3 top-3 z-20 rounded-full bg-white/90 px-3 py-1 text-sm text-[#111111] md:right-4 md:top-4"
                  aria-label="Закрыть плеер"
                >
                  Close
                </button>
                <div className="logo-video-modal__player-wrap w-full max-h-[80vh]">
                  <Plyr
                    source={playerSource}
                    options={{
                      autoplay: true,
                      controls: [
                        "play-large",
                        "play",
                        "progress",
                        "current-time",
                        "mute",
                        "volume",
                        "fullscreen",
                      ],
                    }}
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
