import { useState } from "react";
import { CloseIcon, HeaderBurgerIcon, IMAGES, InstaIcon, TgIcon, UserIcon, XIcon } from "../../assets"
import { Button, ButtonTypesEnum, DropDown, FontFamilyEnum, FontSizesEnum, FontStyleEnum, FontWeightEnum } from "../../uikit"
import { langOptionsData } from "./datas";
import './styles/style.scss';
import { HeaderMobileMenu } from "../HeaderMobileMenu";

export const Header = () => {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState<boolean>(false);
  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__content flex between gap-16">
          <div className="header__mobile">
            <img src={IMAGES.logo} alt="" />
            <Button
              click={() => {setIsActiveMobileMenu(!isActiveMobileMenu)}}
              type={ButtonTypesEnum.ICON}
              Icon={isActiveMobileMenu ? <CloseIcon /> : <HeaderBurgerIcon />}
            />
          </div>
          <div className="header__soc flex gap-20 align-center">
            <Button
              click={() => { }}
              type={ButtonTypesEnum.SOC}
              Icon={<TgIcon />}
            />
            <Button
              click={() => { }}
              type={ButtonTypesEnum.SOC}
              Icon={<XIcon />}
            />
            <Button
              click={() => { }}
              type={ButtonTypesEnum.SOC}
              Icon={<InstaIcon />}
            />
          </div>
          <div className="header__links flex align-center between">
            <DropDown 
              title="Язык:"
              options={langOptionsData}
            />
            <div className="login-btn">
              <Button
                label="Личный кабинет"
                click={() => { }}
                type={ButtonTypesEnum.ICON_TEXT}
                Icon={<span className="icon"><UserIcon /></span>}
                gap={20}
                textStyles={{
                  fontFamily: FontFamilyEnum.MONTSERRAT,
                  fontSize: FontSizesEnum.M,
                  fontStyle: FontStyleEnum.NORMAL,
                  fontWeight: FontWeightEnum.BOLD,
                  color: '#CDBDAE'
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {isActiveMobileMenu && <HeaderMobileMenu setIsShow={setIsActiveMobileMenu} />}
    </header>
  )
}
