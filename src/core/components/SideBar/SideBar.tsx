import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, ButtonBgs, ButtonTypesEnum, FontFamilyEnum, FontSizesEnum, FontStyleEnum, FontWeightEnum, Text } from "../../uikit"
import { BurgerIcon, CloseIcon, ContactsMenuIcon, IMAGES, ReviewMenuIcon } from "../../assets"
import './styles/style.scss';
import { servicesData } from "./datas";

export const SideBar = () => {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  console.log(pathname)
  return (
    <>
      <div className="sidebar">
        <Link to={'/'} className="logo" >
          <img src={IMAGES.logo} alt="logo" />
        </Link>
        <div className="sidebar-menu flex gap-12">
          <div className={`sidebar__item ${pathname.includes('/services') && 'active'}`}>
            <Button
              label="Наши услуги"
              click={() => { }}
              type={ButtonTypesEnum.ICON_TEXT}
              Icon={<span className="icon-menu"><BurgerIcon /><CloseIcon /></span>}
              bg={ButtonBgs.DARK_BROWN}
              gap={10}
              textStyles={{
                fontFamily: FontFamilyEnum.MONTSERRAT,
                fontSize: FontSizesEnum.M,
                fontStyle: FontStyleEnum.NORMAL,
                fontWeight: FontWeightEnum.BOLD,
                color: '#CDBDAE'
              }}
            />
            <div className="hiden-menu">
              <div className="hiden-menu__title">
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
              <div className="hiden-menu__list">
                <ul>
                  {
                    servicesData.map(el => (
                      <li key={el.id} onClick={() => navigate(`/services/${el.slug}`)}>
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
            </div>
          </div>
          <div className={`sidebar__item ${pathname === '/contacts' && 'active'}`}>
            <Button
              label="Контакты"
              click={() => {navigate('/contacts')}}
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
          <div className={`sidebar__item ${pathname === '/reviews' && 'active'}`}>
            <Button
              label="Отзывы"
              click={() => {navigate('/reviews')}}
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
      </div>
    </>
  )
}
