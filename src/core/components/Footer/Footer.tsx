import { FontFamilyEnum, FontSizesEnum, FontStyleEnum, FontWeightEnum, Text } from '../../uikit';
import './styles/style.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__conteinter container">
        <Text
          label='© Da Vinci Project - 2019'
          textStyles={{
            fontFamily: FontFamilyEnum.MONTSERRAT,
            fontSize: FontSizesEnum.M,
            fontStyle: FontStyleEnum.NORMAL,
            fontWeight: FontWeightEnum.REGULAR,
            color: '#CDBDAE'

          }}
        />
      </div>
    </footer>
  )
}
