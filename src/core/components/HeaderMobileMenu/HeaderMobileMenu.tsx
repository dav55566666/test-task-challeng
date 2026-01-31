import { useLocation, useNavigate } from "react-router-dom"
import { Button, ButtonBgs, ButtonTypesEnum, FontFamilyEnum, FontSizesEnum, FontStyleEnum, FontWeightEnum, Text } from "../../uikit"
import { servicesData } from "../SideBar"
import { ContactsMenuIcon, IMAGES, ReviewMenuIcon } from "../../assets";
import './styles/style.scss';
import type { IHeaderMobileMenuProps } from "./interfaces";

export const HeaderMobileMenu = ({
    setIsShow
}: IHeaderMobileMenuProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation()
    return (
        <div className="header-mobile-menu">
            <div className="header-mobile-menu__title">
                <Text
                    label="Наши услуги"
                    textStyles={{
                        fontFamily: FontFamilyEnum.MONTSERRAT,
                        fontSize: FontSizesEnum.M,
                        fontStyle: FontStyleEnum.NORMAL,
                        fontWeight: FontWeightEnum.BOLD,
                        color: '#A97522'
                    }}
                />
            </div>
            <div className="header-mobile-menu__services">
                <ul>
                    {
                        servicesData.map(el => (
                            <li key={el.id} onClick={() => {
                                setIsShow(false)
                                navigate(`/services/${el.slug}`)
                            }}>
                                <span className="icons">
                                    <img src={IMAGES.miniLogo} alt="" />
                                    <img src={IMAGES.logo} alt="" />
                                </span>
                                <Text
                                    label={el.title}
                                    textStyles={{
                                        fontFamily: FontFamilyEnum.MONTSERRAT,
                                        fontSize: FontSizesEnum.XS,
                                        fontStyle: FontStyleEnum.NORMAL,
                                        fontWeight: FontWeightEnum.BOLD,
                                        color: '#CDBDAE'
                                    }}
                                />
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={`header-mobile-menu__item ${pathname === '/contacts' && 'active'}`}>
                <Button
                    label="Контакты"
                    click={() => {
                        setIsShow(false)
                        navigate('/contacts')
                    }}
                    type={ButtonTypesEnum.ICON_TEXT}
                    Icon={<ContactsMenuIcon />}
                    bg={ButtonBgs.DARK_BROWN}
                    textStyles={{
                        fontFamily: FontFamilyEnum.MONTSERRAT,
                        fontSize: FontSizesEnum.M,
                        fontStyle: FontStyleEnum.NORMAL,
                        fontWeight: FontWeightEnum.BOLD,
                        color: '#CDBDAE'
                    }}
                />
            </div>
            <div className={`header-mobile-menu__item ${pathname === '/reviews' && 'active'}`}>
                <Button
                    label="Отзывы"
                    click={() => { 
                        setIsShow(false)
                        navigate('/reviews') 
                    }}
                    type={ButtonTypesEnum.ICON_TEXT}
                    Icon={<ReviewMenuIcon />}
                    bg={ButtonBgs.DARK_BROWN}
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
    )
}
