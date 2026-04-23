/**
 * Синхронно с `styles/app-menu.scss` (app-menu-nav-shell--stagger-open, app-menu-gradient-reveal).
 * Меняй селекторы и @keyframes в паре с этими числами.
 */
export const MENU_GRADIENT_REVEAL_DELAY_MS = 1200;
export const MENU_GRADIENT_REVEAL_DURATION_MS = 450;

/** isTarget возвращается после того, как градиент уже появился (delay + длительность reveal). */
export const MENU_ACTIVE_RETURN_MS =
  MENU_GRADIENT_REVEAL_DELAY_MS + MENU_GRADIENT_REVEAL_DURATION_MS;

/** Закрытие: strip active — первый шаг (см. `queueMenuCloseChoreography`); до close — только 2×rAF на отрисовку. */
