import { TextTag } from "./enums";
import { getClassNames } from "./helpers";
import type { IGradientTitleProps } from "./interfaces";
import type { CSSProperties } from "react";
import './styles/gradient-text.scss';

const titleProps = (id: string | undefined, className: string, styles: CSSProperties) =>
  ({ className, style: styles, ...(id !== undefined ? { id } : {}) } as const);

export const GradientTitle = ({
  value,
  currentSize,
  mobileSize,
  tag,
  id,
}: IGradientTitleProps) => {
  const classNames = getClassNames();
  const styles = {
    "--gradient-title-mobile-size": `${mobileSize}px`,
    "--gradient-title-desktop-size": `${currentSize}px`,
  } as CSSProperties;
  const common = titleProps(id, classNames, styles);
  switch (tag) {
    case TextTag.H1:
      return <h1 {...common}>{value}</h1>;
    case TextTag.H2:
      return <h2 {...common}>{value}</h2>;
    case TextTag.H3:
      return <h3 {...common}>{value}</h3>;
    case TextTag.H4:
      return <h4 {...common}>{value}</h4>;
    case TextTag.H5:
      return <h5 {...common}>{value}</h5>;
    case TextTag.H6:
      return <h6 {...common}>{value}</h6>;
    case TextTag.p:
      return <p {...common}>{value}</p>;
    default:
      return <h1 {...common}>{value}</h1>;
  }
};
