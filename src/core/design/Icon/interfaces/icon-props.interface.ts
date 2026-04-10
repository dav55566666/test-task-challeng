import type { IconsName } from "../enums";
import type { IconStyle } from "../types";

export interface IconProps {
  name: IconsName;
  style?: IconStyle;
}

/** Props for concrete SVG icon components (no `name` — used via `<Icon name={…} />`). */
export type IconSvgProps = {
  style?: IconStyle;
};