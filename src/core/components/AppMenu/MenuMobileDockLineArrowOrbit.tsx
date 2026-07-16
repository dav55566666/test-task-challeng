import { MOBILE_DOCK_LINE_ARROW_TOP_BIAS_PX } from "./menuArcArrow";

export type MenuMobileDockLineArrowOrbitProps = {
  leftPx: number;
  topPx: number;
  diameterPx: number;
  /** Поворот орбиты: стрелка едет по окружности дуги линии. */
  rotationDeg: number;
};

/**
 * Круг той же геометрии, что дуга линии в мобильном доке:
 * стрелка закреплена на верхней точке окружности, движение — только `rotate` на этом div.
 */
export function MenuMobileDockLineArrowOrbit({
  leftPx,
  topPx,
  diameterPx,
  rotationDeg,
}: MenuMobileDockLineArrowOrbitProps) {
  const R = diameterPx / 2;

  return (
    <div
      className="app-menu__mobile-dock__line-arc-orbit pointer-events-none absolute z-10"
      style={{
        left: leftPx,
        top: topPx,
        width: diameterPx,
        height: diameterPx,
        transform: `rotate(${rotationDeg}deg)`,
        transformOrigin: "center center",
        borderRadius: "50%",
      }}
      aria-hidden
    >
      <div
        className="app-menu__mobile-dock__line-arc-marker pointer-events-none absolute"
        style={{
          left: R,
          top: MOBILE_DOCK_LINE_ARROW_TOP_BIAS_PX,
        }}
      >
        <svg
          width="14"
          height="28"
          viewBox="0 0 14 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 23.3311C13 24.9879 11.6569 26.3311 10 26.3311L4 26.3311C2.34315 26.3311 0.999999 24.9879 0.999999 23.3311L1 6.57715C1.00005 5.77051 1.32496 4.99788 1.90137 4.43359L4.53418 1.85644C5.6182 0.795221 7.32369 0.710058 8.50781 1.6582L11.875 4.35547C12.5858 4.92482 13 5.78654 13 6.69727L13 23.3311Z"
            fill="#333333"
            fillOpacity="0.96"
            stroke="#F1D3D4"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}
