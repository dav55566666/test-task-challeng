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
  home: 10,
  about: -14,
  contacts: -32,
} as const satisfies Record<(typeof MENU_LINKS)[number]["id"], number>;

/** Замени на реальные ссылки проекта. */
export const SOCIAL_LINKS = {
  telegram: "https://t.me/fabulacommunity",
  linkedin: "https://www.linkedin.com/",
} as const;

export type DesktopRowLayout = {
  rotateDeg: number;
  translateXRem?: number;
  translateXPx?: number;
  translateYPx?: number;
};

export const ROW_LAYOUT: readonly DesktopRowLayout[] = [
  { rotateDeg: 22, translateXPx: 41, translateYPx: 0 },
  { rotateDeg: 10, translateXRem: SHIFT_MID_REM },
  { rotateDeg: 0, translateXRem: 0 },
  { rotateDeg: -10, translateXRem: SHIFT_MID_REM },
  { rotateDeg: -20, translateXRem: SHIFT_OUT_REM },
];

/**
 * Мобильный док: дуга (Услуги → Контакты).
 * Крайние пункты ниже по `y`, центральные три без изменений; rotate симметрично.
 */
export const MOBILE_DOCK_ITEM_TRANSFORMS = [
  { x: 0, y: 28, rotate: -24 },
  { x: 0, y: 7, rotate: -12 },
  { x: 0, y: 0, rotate: 0 },
  { x: 0, y: 7, rotate: 12 },
  { x: 0, y: 28, rotate: 24 },
] as const;

/** Виртуальная кубическая дуга (стрелка поворачивается по её касательной; без SVG на экране). */
export const MOBILE_DOCK_ARC = {
  viewBoxW: 400,
  p0: { x: 0, y: 58 },
  p1: { x: 100, y: 10 },
  p2: { x: 300, y: 10 },
  p3: { x: 400, y: 58 },
} as const;
