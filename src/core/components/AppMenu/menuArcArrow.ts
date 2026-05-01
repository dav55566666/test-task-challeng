export type ArcCircle = {
  cx: number;
  cy: number;
  R: number;
};

/** Левый «колпачок» `.app-menu__desktop-arc`: центр окружности и радиус дуги. */
export function getArcCircle(arcRect: DOMRectReadOnly): ArcCircle | null {
  const H = arcRect.height;
  if (H <= 1 || !Number.isFinite(H)) return null;
  const R = H / 2;
  return {
    cx: arcRect.left + R,
    cy: arcRect.top + H / 2,
    R,
  };
}

/** Параметр дуги t ∈ [-π/2, π/2]: точка (cx - R cos t, cy + R sin t). */
export function thetaFromViewportY(
  yViewport: number,
  arc: ArcCircle
): number {
  return Math.asin(Math.min(1, Math.max(-1, (yViewport - arc.cy) / arc.R)));
}

/**
 * Угол поворота орбиты (deg): якорь стрелки изначально в точке t=0 (слева от центра),
 * после rotate центр стрелка совпадает с точкой дуги при параметре t.
 */
export function orbitRotationDegFromArcParam(t: number): number {
  const v = Math.atan2(Math.sin(t), -Math.cos(t));
  return ((v - Math.PI) * 180) / Math.PI;
}

/**
 * Эквивалент `canonicalDeg` по модулю 360°, но от `prevDisplay` — кратчайшая дуга (|Δ| ≤ 180°),
 * чтобы `transition: transform` не крутила стрелку на целый оборот.
 */
export function unwrapOrbitRotationDeg(
  prevDisplay: number,
  canonicalDeg: number
): number {
  let delta = canonicalDeg - prevDisplay;
  delta -= 360 * Math.round(delta / 360);
  return prevDisplay + delta;
}
