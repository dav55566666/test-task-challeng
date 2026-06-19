import { createElement } from "react";
import { GRADIENT_SHINE_ENABLED } from "./constants/gradient-shine.constants";
import { TextTag } from "./enums";
import { getClassNames } from "./helpers";
import { useGradientShineRegistration } from "./hooks";
import type { IGradientTitleProps } from "./interfaces";
import type { CSSProperties } from "react";
import "./styles/gradient-text.scss";

export const GradientTitle = ({
  value,
  currentSize,
  mobileSize,
  tag,
  id,
  animated = true,
}: IGradientTitleProps) => {
  const classNames = getClassNames();
  const shineEnabled = animated && GRADIENT_SHINE_ENABLED;
  const { rootRef, isShineActive, hasProvider } =
    useGradientShineRegistration(shineEnabled);
  const useStaticGradient = !shineEnabled || !hasProvider;

  const styles = {
    "--gradient-title-mobile-size": `${mobileSize}px`,
    "--gradient-title-desktop-size": `${currentSize}px`,
  } as CSSProperties;

  const className = [
    classNames,
    useStaticGradient ? "gradient-text--static" : "",
    isShineActive ? "gradient-text--shine-active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(
    tag ?? TextTag.H1,
    {
      ref: rootRef,
      className,
      style: styles,
      ...(id !== undefined ? { id } : {}),
    },
    createElement("span", { className: "gradient-text__knockout" }, value),
  );
};
