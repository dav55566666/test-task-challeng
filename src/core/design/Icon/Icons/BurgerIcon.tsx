import { useId } from "react";

import type { IconSvgProps } from "../interfaces/icon-props.interface";

export const BurgerIcon = ({ style }: IconSvgProps) => {
  const uid = useId().replace(/:/g, "");
  const gradId = `burger-grad-${uid}`;
  const w = style?.width ?? 20;
  const h = style?.height ?? 14;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 1H20" stroke={`url(#${gradId})`} strokeWidth="2" />
      <path d="M0 13H20" stroke={`url(#${gradId})`} strokeWidth="2" />
      <defs>
        <linearGradient
          id={gradId}
          x1="0"
          y1="7"
          x2="20"
          y2="7"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C7C4F0" />
          <stop offset="0.48" stopColor="#718DF1" />
          <stop offset="1" stopColor="#86D9FA" />
        </linearGradient>
      </defs>
    </svg>
  );
};
