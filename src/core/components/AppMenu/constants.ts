import { IconsName } from "../../design/Icon";

export const MENU_LINKS = [
  { id: "services", label: "Услуги", icon: IconsName.SERVICES_ICON },
  { id: "cases", label: "Кейсы", icon: IconsName.CASES_ICON, path: "/projects" },
  { id: "home", label: "Главная", icon: IconsName.HOME_ICON, path: "/" },
  { id: "about", label: "О нас", icon: IconsName.ABOUT_US_ICON, path: "/about" },
  {
    id: "contacts",
    label: "Контакты",
    icon: IconsName.CONTACTS_ICON,
    path: "/contacts",
  },
] as const;

export const SHIFT_OUT_REM = 2.25;
export const SHIFT_MID_REM = 0.625;

/** Замени на реальные ссылки проекта. */
export const SOCIAL_LINKS = {
  telegram: "https://t.me/",
  linkedin: "https://www.linkedin.com/",
} as const;

export const ROW_LAYOUT = [
  { rotateDeg: 20, translateXRem: SHIFT_OUT_REM },
  { rotateDeg: 15, translateXRem: SHIFT_MID_REM },
  { rotateDeg: 0, translateXRem: 0 },
  { rotateDeg: -15, translateXRem: SHIFT_MID_REM },
  { rotateDeg: -20, translateXRem: SHIFT_OUT_REM },
] as const;
