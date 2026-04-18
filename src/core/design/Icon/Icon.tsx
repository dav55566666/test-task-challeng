import { IconsName } from "./enums";
import {
  AboutUsIcon,
  ArrowIcon,
  BurgerIcon,
  CasesIcon,
  ContactUsIcon,
  HomeIcon,
  LinkedinIcon,
  Logo,
  ServicesIcon,
  TgIcon,
} from "./Icons";
import type { IconProps } from "./interfaces/icon-props.interface";

export const Icon = ({ name, style }: IconProps) => {
  switch (name) {
    case IconsName.HOME_ICON:
      return <HomeIcon style={style} />;
    case IconsName.ABOUT_US_ICON:
      return <AboutUsIcon style={style} />;
    case IconsName.CASES_ICON:
      return <CasesIcon style={style} />;
    case IconsName.CONTACTS_ICON:
      return <ContactUsIcon style={style} />;
    case IconsName.SERVICES_ICON:
      return <ServicesIcon style={style} />;
    case IconsName.LOGO_ICON:
      return <Logo style={style} />;
    case IconsName.TG_ICON:
      return <TgIcon style={style} />;
    case IconsName.LINKEDIN_ICON:
      return <LinkedinIcon style={style} />;
    case IconsName.BURGER_ICON:
      return <BurgerIcon style={style} />;
    case IconsName.ARROW_ICON:
      return <ArrowIcon style={style} />;
    default:
      return null;
  }
};
