import { MOBILE_DOCK_ARC } from "./constants";

export type ArcCircle = {
  cx: number;
  cy: number;
  R: number;
};

type BezierPt = { x: number; y: number };

function cubicBezier(t: number, p0: BezierPt, p1: BezierPt, p2: BezierPt, p3: BezierPt): BezierPt {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

function cubicBezierDeriv(
  t: number,
  p0: BezierPt,
  p1: BezierPt,
  p2: BezierPt,
  p3: BezierPt,
): BezierPt {
  const u = 1 - t;
  return {
    x: 3 * u * u * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x),
    y: 3 * u * u * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y),
  };
}

/** t ∈ [0,1] такой, что X(t) ≈ xTarget (кривая монотонна по X у `MOBILE_DOCK_ARC`). */
function bezierTAtX(
  xTarget: number,
  p0: BezierPt,
  p1: BezierPt,
  p2: BezierPt,
  p3: BezierPt,
): number {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 28; i++) {
    const t = (lo + hi) / 2;
    const pt = cubicBezier(t, p0, p1, p2, p3);
    if (pt.x < xTarget) lo = t;
    else hi = t;
  }
  return (lo + hi) / 2;
}

/**
 * Точка на мобильной дуге и угол касательной (deg) в координатах viewBox SVG.
 * `xViewBox` — по горизонтали 0…viewBoxW (как в path).
 */
export function mobileDockArcPointAndTangentAtViewBoxX(xViewBox: number): {
  y: number;
  tangentDeg: number;
} {
  const { p0, p1, p2, p3, viewBoxW } = MOBILE_DOCK_ARC;
  const x = Math.min(viewBoxW, Math.max(0, xViewBox));
  const t = bezierTAtX(x, p0, p1, p2, p3);
  const pt = cubicBezier(t, p0, p1, p2, p3);
  const d = cubicBezierDeriv(t, p0, p1, p2, p3);
  const tangentDeg = (Math.atan2(d.y, d.x) * 180) / Math.PI;
  return { y: pt.y, tangentDeg };
}

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
