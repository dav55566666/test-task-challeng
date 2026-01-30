import type { ITextProps } from "./interfaces"
import "./styles/style.scss";

export const Text = ({
    label,
    textStyles
}: ITextProps) => {
  return (
    <span className={`text ${textStyles.fontFamily} ${textStyles.fontSize} ${textStyles.fontStyle} ${textStyles.fontWeight}`} style={{color: textStyles.color}}>{label}</span>
  )
}
