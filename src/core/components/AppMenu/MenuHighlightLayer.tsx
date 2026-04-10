import arrowIcon from "../../../assets/arrow.svg";

type MenuHighlightLayerProps = {
  translateXRem: number;
  rotateDeg: number;
  topPx: number;
  heightPx: number;
  buttonWidthPx: number;
  buttonHeightPx: number;
};

export const MenuHighlightLayer = ({
  translateXRem,
  rotateDeg,
  topPx,
  heightPx,
  buttonWidthPx,
  buttonHeightPx,
}: MenuHighlightLayerProps) => {
  return (
    <div
      className="pointer-events-none absolute right-0 z-[1] w-full transition-[top,height] duration-[600ms] ease-out"
      style={{ top: topPx, height: heightPx }}
      aria-hidden
    >
      <div
        className="flex h-full items-center justify-end pr-8"
        style={{
          transform: `translateX(${translateXRem}rem) rotate(${rotateDeg}deg)`,
          transformOrigin: "right center",
          transition: "transform 0.6s ease-out",
        }}
      >
        <div
          className="relative overflow-visible"
          style={{ width: buttonWidthPx, height: buttonHeightPx }}
        >
          <span className="pointer-events-none absolute -right-10 top-1/2 z-[20] flex -translate-y-1/2 items-center">
            <img
              src={arrowIcon}
              alt=""
              aria-hidden
              className="h-2.5 w-6 shrink-0 object-contain"
            />
          </span>
        </div>
      </div>
    </div>
  );
};
