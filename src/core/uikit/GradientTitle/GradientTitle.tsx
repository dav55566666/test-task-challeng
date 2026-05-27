import { createElement } from "react";
import { TextTag } from "./enums";
import { getClassNames } from "./helpers";
import { useGradientTextDrift } from "./hooks";
import type { IGradientTitleProps } from "./interfaces";
import type { CSSProperties } from "react";
import "./styles/gradient-text.scss";

export const GradientTitle = ({
  value,
  currentSize,
  mobileSize,
  tag,
  id,
}: IGradientTitleProps) => {
  const classNames = getClassNames();
  const driftRef = useGradientTextDrift();
  const styles = {
    "--gradient-title-mobile-size": `${mobileSize}px`,
    "--gradient-title-desktop-size": `${currentSize}px`,
  } as CSSProperties;

  return createElement(
    tag ?? TextTag.H1,
    {
      ref: driftRef,
      className: classNames,
      style: styles,
      ...(id !== undefined ? { id } : {}),
    },
    value,
  );
};
