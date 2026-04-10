import { IconsName } from "./enums"
import { AboutUsIcon, CasesIcon, ContactUsIcon, HomeIcon, ServicesIcon } from "./Icons"
import type { IconProps } from "./interfaces/icon-props.interface"

export const Icon = ({
    name,
    style,
}: IconProps) => {
  switch (name) {
    case IconsName.HOME_ICON:
      return <HomeIcon style={style} />
    case IconsName.ABOUT_US_ICON:
      return <AboutUsIcon style={style} />
    case IconsName.CASES_ICON:
      return <CasesIcon style={style} />
    case IconsName.CONTACTS_ICON:
      return <ContactUsIcon style={style} />
    case IconsName.SERVICES_ICON:
      return <ServicesIcon style={style} />
  }
}
