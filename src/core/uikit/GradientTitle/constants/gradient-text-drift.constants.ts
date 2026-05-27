/** Синхронно с `gradient-text.scss` (`animation-duration: 2.64s`, linear). */
export const GRADIENT_TEXT_DRIFT_DURATION_MS = 2640;

export const isGradientTextWebKitTouch = (): boolean =>
  typeof CSS !== "undefined" && CSS.supports("-webkit-touch-callout", "none");
