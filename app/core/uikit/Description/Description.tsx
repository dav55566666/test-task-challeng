import HTMLReactParser from "html-react-parser/lib/index"
import { IDescriptionProps } from "./interfaces"

const Description = ({
    value,
    textSize,
    textWeight,
    textFont,
    color,
    isParser
}: IDescriptionProps) => {
  return (
    <p className={`description size-${textSize} color-${color} weight-${textWeight} font-${textFont}`}>
        {
            isParser ? HTMLReactParser(value) : value
        }
    </p>
  )
}

export default Description