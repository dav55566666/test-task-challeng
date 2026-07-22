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
  services: 32,
  cases: 18,
  home: 0,
  about: -14,
  contacts: -32,
} as const satisfies Record<(typeof MENU_LINKS)[number]["id"], number>;

/**
 * Ручной rotate стрелки мобильного дока (deg) для каждой кнопки.
 * Орбита та же; крутим только этот угол. Отрицательное — влево по дуге.
 */
export const MOBILE_DOCK_ARROW_ROTATION_DEG_BY_ID = {
  services: -27,
  cases: -14,
  home: 0,
  about: 14,
  contacts: 28,
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
  { rotateDeg: 22, translateXPx: 41, translateYPx: -10 },
  { rotateDeg: 10, translateXRem: SHIFT_MID_REM },
  { rotateDeg: 0, translateXRem: 0 },
  { rotateDeg: -10, translateXRem: SHIFT_MID_REM },
  { rotateDeg: -20, translateXRem: SHIFT_OUT_REM },
];

/**
 * Единая дуга мобильного дока (линия, стекло, кнопки, стрелка).
 * Кубическая аппроксимация круговой дуги R≈314 в viewBox 400×80.
 */
export const MOBILE_DOCK_ARC = {
  viewBoxW: 400,
  p0: { x: 0, y: 72 },
  p1: { x: 108, y: 0 },
  p2: { x: 292, y: 0 },
  p3: { x: 400, y: 72 },
} as const;

/** Диаметр дуги кнопок (меньше = круче дуга). */
export const MOBILE_DOCK_BTN_ARC_DIAMETER_PX = 630;

/** Диаметр дуги линии/стрелки (параллельна дуге кнопок). */
export const MOBILE_DOCK_LINE_ARC_DIAMETER_PX = MOBILE_DOCK_BTN_ARC_DIAMETER_PX;

/** Диаметр круговой дуги кнопок в px (совпадает с `--mobile-dock-arc-d` в SCSS). */
export const MOBILE_DOCK_ARC_DIAMETER_PX = MOBILE_DOCK_BTN_ARC_DIAMETER_PX;

/** Подъём кнопок и линии дуги вверх от базовой позиции (px). */
export const MOBILE_DOCK_LIFT_PX = 80;

/** Доп. сдвиг списка кнопок вверх, чтобы низ кнопок лёг на дугу (px). */
export const MOBILE_DOCK_LIST_ALIGN_PX = 27;

/** Опускание кнопок вниз — зазор между верхом кнопок и стеклом (px). */
export const MOBILE_DOCK_BTN_DROP_PX = 32;

/** Зазор между верхом кнопок и верхом стеклянной подложки (px). */
export const MOBILE_DOCK_GLASS_GAP_PX = 20;

/** Высота кнопки дока для расчёта стекла (px, ≈ `.app-menu__mobile-dock__btn`). */
export const MOBILE_DOCK_BTN_HEIGHT_PX = 54;

/** Зазор между низом кнопок и дугой линии/стрелки (px). */
export const MOBILE_DOCK_LINE_GAP_PX = 16;

/** Горизонтальный отступ дуги кнопок от краёв shell (px, ≈ половина кнопки). */
export const MOBILE_DOCK_ARC_CHORD_INSET_PX = 20;

/** Насколько дуга линии выходит за края экрана (px с каждой стороны). */
export const MOBILE_DOCK_LINE_EDGE_OVERSHOOT_PX = 56;

/** Верх круга дуги кнопок от верха `.app-menu__mobile-dock__inner`. */
export const MOBILE_DOCK_ARC_TOP_PX = 10;

/**
 * Верх круга дуги линии: параллельная дуга ниже низа кнопок на `LINE_GAP`.
 */
export const MOBILE_DOCK_LINE_ARC_TOP_PX =
  MOBILE_DOCK_ARC_TOP_PX +
  MOBILE_DOCK_BTN_HEIGHT_PX +
  MOBILE_DOCK_LINE_GAP_PX;

/** Смещение верха стекла вверх от дуги кнопок: высота кнопки + зазор. */
export const MOBILE_DOCK_GLASS_CLEARANCE_PX =
  MOBILE_DOCK_BTN_HEIGHT_PX + MOBILE_DOCK_GLASS_GAP_PX;
