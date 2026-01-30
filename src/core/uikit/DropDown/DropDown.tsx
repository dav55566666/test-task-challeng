import { useState } from "react"
import type { IDropDownProps, IOption } from "./interfaces"
import { FontFamilyEnum, FontSizesEnum, FontStyleEnum, FontWeightEnum, Text } from "../Text"
import type { NullableType } from "../../../common"
import { Button, ButtonTypesEnum } from "../Button"
import './styles/style.scss';

export const DropDown = ({
    title,
    options,
}: IDropDownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const selectedOption = options.find(el => el.isSelected)
    const [selected, setSelected] = useState<NullableType<IOption>>(selectedOption ? selectedOption : null)
    const [intialOptions, setInitialOptions] = useState<Array<IOption>>(options)
    console.log(options)

    return (
        <div className="dropdown" onMouseMove={() => setIsOpen(true)} onMouseLeave={() => setTimeout(() => setIsOpen(false))}>
            <div className="dropdown__title">
                <div className="left">
                    <Text
                        label={title}
                        textStyles={{
                            fontFamily: FontFamilyEnum.MONTSERRAT,
                            fontSize: FontSizesEnum.M,
                            fontStyle: FontStyleEnum.NORMAL,
                            fontWeight: FontWeightEnum.BOLD,
                            color: '#A97522'
                        }}
                    />
                    {
                        selected && <Text
                            label={selected.label}
                            textStyles={{
                                fontFamily: FontFamilyEnum.MONTSERRAT,
                                fontSize: FontSizesEnum.M,
                                fontStyle: FontStyleEnum.NORMAL,
                                fontWeight: FontWeightEnum.BOLD,
                                color: '#CDBDAE'
                            }}
                        />
                    }
                </div>
                {
                    selected && <span className="icon">{selected.Icon}</span>
                }
            </div>
            {isOpen &&
                <div className="dropdown__options">
                    {
                        intialOptions.map((el, idx) => (
                            <span className={`dropdown-option ${el.isSelected && 'active'}`} key={idx}>
                                <Button
                                    type={ButtonTypesEnum.ICON_TEXT}
                                    label={el.label}
                                    Icon={<span className="icon">{el.Icon}</span>}
                                    click={() => {
                                        setSelected(el)
                                        setInitialOptions(intialOptions.map(option => ({
                                            ...option,
                                            isSelected: option.value === el.value
                                        })))
                                        setIsOpen(false)
                                    }}
                                    textStyles={{
                                        fontFamily: FontFamilyEnum.MONTSERRAT,
                                        fontSize: FontSizesEnum.M,
                                        fontStyle: FontStyleEnum.NORMAL,
                                        fontWeight: FontWeightEnum.BOLD,
                                        color: '#CDBDAE'
                                    }}
                                />
                            </span>
                        ))
                    }
                </div>
            }
        </div>
    )
}
