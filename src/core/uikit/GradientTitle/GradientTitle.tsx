import { TextTag } from "./enums";
import { getClassNames } from "./helpers";
import type { IGradientTitleProps } from "./interfaces";
import type { CSSProperties } from "react";
import './styles/gradient-text.scss';

export const GradientTitle = ({ value, currentSize, mobileSize, tag }: IGradientTitleProps) => {
    const classNames = getClassNames();
    const styles = {
        "--gradient-title-mobile-size": `${mobileSize}px`,
        "--gradient-title-desktop-size": `${currentSize}px`,
    } as CSSProperties;
    switch (tag) {
        case TextTag.H1:
            return <h1 className={classNames} style={styles}>{value}</h1>;
        case TextTag.H2:
            return <h2 className={classNames} style={styles}>{value}</h2>;
        case TextTag.H3:
            return <h3 className={classNames} style={styles}>{value}</h3>;
        case TextTag.H4:
            return <h4 className={classNames} style={styles}>{value}</h4>;
        case TextTag.H5:
            return <h5 className={classNames} style={styles}>{value}</h5>;
        case TextTag.H6:
            return <h6 className={classNames} style={styles}>{value}</h6>;
        case TextTag.p:
            return <p className={classNames} style={styles}>{value}</p>;
        default:
            return <h1 className={classNames} style={styles}>{value}</h1>;
    }
}
