import { FontFamilyEnum, FontSizesEnum, FontStyleEnum, FontWeightEnum, Text } from '../../uikit';
import type { IReviewItemProps } from './interfaces';
import './styles/style.scss';

export const ReviewItem = ({
    title,
    description
}: IReviewItemProps) => {
    return (
        <div className='review-item'>
            <div className="img"></div>
            <div className="text">
                <Text
                    label={title}
                    textStyles={{
                        fontFamily: FontFamilyEnum.INTER,
                        fontSize: FontSizesEnum.M,
                        fontStyle: FontStyleEnum.NORMAL,
                        fontWeight: FontWeightEnum.SEMI_BOLD,
                        color: '#CDBDAE'
                    }}
                />
                <Text
                    label={description}
                    textStyles={{
                        fontFamily: FontFamilyEnum.INTER,
                        fontSize: FontSizesEnum.S,
                        fontStyle: FontStyleEnum.NORMAL,
                        fontWeight: FontWeightEnum.REGULAR,
                        color: '#CDBDAE'
                    }}
                />
            </div>
        </div>
    )
}
