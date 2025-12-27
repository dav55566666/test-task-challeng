import { EHeadingType } from "./enums"
import { ITitleProps } from "./interfaces"

const Title = ({
  headingType,
  titleColor,
  textSize,
  textWeight,
  value
}: ITitleProps) => {
  switch (headingType) {
    case EHeadingType.H1:
      return <h1 className={`title ${headingType} color-${titleColor} size-${textSize} weight-${textWeight}`}>{value}</h1>
    case EHeadingType.H2:
      return <h2 className={`title ${headingType} color-${titleColor} size-${textSize} weight-${textWeight}`}>{value}</h2>
    case EHeadingType.H3:
      return <h3 className={`title ${headingType} color-${titleColor} size-${textSize} weight-${textWeight}`}>{value}</h3>
  }
}

export default Title