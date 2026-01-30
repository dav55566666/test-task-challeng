import { Text } from "../Text";
import { ButtonTypesEnum } from "./enums"
import type { IButtonProps } from "./interfaces"
import './styles/style.scss';

export const Button = ({
    value,
    label,
    click,
    type,
    Icon,
    gap,
    bg,
    textStyles
}: IButtonProps) => {
  switch (type) {
    case ButtonTypesEnum.DEFAULT:
        return <button className={`button default ${bg}`} onClick={click} value={value}>
            {Icon && Icon}
            {label && textStyles && <Text  
                label={label}
                textStyles={textStyles}
            />}
        </button>;
    case ButtonTypesEnum.ICON:
        return <button className="button only-icon" onClick={click}>
            {Icon && Icon}
        </button>;
    case ButtonTypesEnum.ICON_TEXT:
        return <button className={`button icon-text gap-${gap}`} onClick={click}>
            {Icon && Icon}
            {label && textStyles && <Text  
                label={label}
                textStyles={textStyles}
            />}
        </button>;
    case ButtonTypesEnum.SOC:
        return <button className={`button soc`} onClick={click}>
            {Icon && Icon}
        </button>;
  }
}
