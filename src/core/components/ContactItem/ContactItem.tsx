import { Link } from "react-router-dom";
import { FontFamilyEnum, FontSizesEnum, FontStyleEnum, FontWeightEnum, Text } from "../../uikit"
import type { IContactsItemProps } from "./interfaces";
import './styles/style.scss';

export const ContactItem = ({
    Icon,
    title,
    value,
    isActive
}: IContactsItemProps) => {
    return (
        <Link to={''} className={`contact-item ${isActive && 'active'}`}>
            <div className="icon">
                {Icon}
            </div>
            <div className="text">
                <Text
                    label={title}
                    textStyles={{
                        fontFamily: FontFamilyEnum.INTER,
                        fontSize: FontSizesEnum.L,
                        fontStyle: FontStyleEnum.NORMAL,
                        fontWeight: FontWeightEnum.REGULAR,
                        color: '#CDBDAE'
                    }}
                />
                <Text
                    label={value}
                    textStyles={{
                        fontFamily: FontFamilyEnum.INTER,
                        fontSize: FontSizesEnum.XS,
                        fontStyle: FontStyleEnum.NORMAL,
                        fontWeight: FontWeightEnum.SEMI_BOLD,
                        color: '#CDBDAE'
                    }}
                />
            </div>
        </Link>
    )
}
