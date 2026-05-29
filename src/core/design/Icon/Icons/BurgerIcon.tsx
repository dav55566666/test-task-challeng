import type { IconSvgProps } from "../interfaces/icon-props.interface";

const BURGER_STROKE = "rgba(51, 51, 51, 0.32)";

export const BurgerIcon = ({ style }: IconSvgProps) => {
  const w = style?.width ?? 20;
  const h = style?.height ?? 12;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 20 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 1H20"
        stroke={BURGER_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M0 11H20"
        stroke={BURGER_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
