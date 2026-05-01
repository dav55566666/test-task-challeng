import { IMAGES } from "../../design";

export type MenuArcArrowOrbitProps = {
  /** Левый верх квадрата 2R×2R в координатах `app-menu__nav-shell`. */
  leftPx: number;
  topPx: number;
  diameterPx: number;
  /** Поворот орбиты: стрелка едет по окружности, центр стрелки на дуге. */
  rotationDeg: number;
};

/**
 * Круг той же геометрии, что левая дуга меню: центр = центр окружности дуги,
 * стрелка закреплена на расстоянии R слева от центра; движение — только `rotate` на этом div.
 */
export function MenuArcArrowOrbit({
  leftPx,
  topPx,
  diameterPx,
  rotationDeg,
}: MenuArcArrowOrbitProps) {
  const R = diameterPx / 2;
  return (
    <div
      className="app-menu__arc-arrow-orbit pointer-events-none absolute z-[25]"
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
        className="pointer-events-none absolute"
        style={{
          left: 0,
          top: R,
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={IMAGES.arrow}
          alt=""
          aria-hidden
          className="h-2.5 w-6 shrink-0 object-contain"
        />
      </div>
    </div>
  );
}
