import { IconsName } from "../../design/Icon";

export const MENU_LINKS = [
  { id: "services", label: "Услуги", icon: IconsName.SERVICES_ICON, path: "/directions" },
  { id: "cases", label: "Кейсы", icon: IconsName.CASES_ICON, path: "/projects" },
  { id: "home", label: "Главная", icon: IconsName.HOME_ICON, path: "/" },
  { id: "about", label: "Мы", icon: IconsName.ABOUT_US_ICON, path: "/about" },
  {
    id: "contacts",
    label: "Контакты",
    icon: IconsName.CONTACTS_ICON,
    path: "/contacts",
  },
] as const;

export const SHIFT_OUT_REM = 2.25;
export const SHIFT_MID_REM = 0.625;

/**
 * Подстройка Y для угла стрелки на дуге (px), отдельно по пункту меню.
 * Положительное — точка для расчёта угла ниже на экране (стрелка опускается по дуге).
 */
export const DESKTOP_ORBIT_Y_BIAS_PX_BY_ID = {
  services: 28,
  cases: 18,
  home: 5,
  about: -14,
  contacts: -32,
} as const satisfies Record<(typeof MENU_LINKS)[number]["id"], number>;

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

/**
 * Мобильный док: позиции пунктов (Услуги → Контакты).
 * Эталон под вьюпорт ~424–464px в DevTools; порядок: translate(x, y) затем rotate, origin center bottom.
 * Меньший y — выше по дуге (ближе к линии скругления верха dock).
 */
export const MOBILE_DOCK_ITEM_TRANSFORMS = [
  { x: 13, y: 52, rotate: -54 },
  { x: -7, y: 8, rotate: -32 },
  { x: 0, y: -5, rotate: 0 },
  { x: 7, y: 8, rotate: 32 },
  { x: -13, y: 52, rotate: 54 },
] as const;
