import {
  MOBILE_DOCK_ARC,
  MOBILE_DOCK_ARC_CHORD_INSET_PX,
  MOBILE_DOCK_ARC_TOP_PX,
  MOBILE_DOCK_BTN_ARC_DIAMETER_PX,
  MOBILE_DOCK_BTN_DROP_PX,
  MOBILE_DOCK_LINE_ARC_DIAMETER_PX,
  MOBILE_DOCK_LINE_ARC_TOP_PX,
  MOBILE_DOCK_LINE_EDGE_OVERSHOOT_PX,
} from "./constants";

export type ArcCircle = {
  cx: number;
  cy: number;
  R: number;
};

type ArcParams = {
  diameterPx: number;
  topPx: number;
};

function mobileDockCircleArcAtXWithParams(
  xPx: number,
  shellWidthPx: number,
  { diameterPx, topPx }: ArcParams,
): { y: number; tangentDeg: number } {
  const R = diameterPx / 2;
  const cx = shellWidthPx / 2;
  const cy = topPx + R;
  const dx = xPx - cx;
  const clampedDx = Math.max(-R, Math.min(R, dx));
  const denom = Math.sqrt(R * R - clampedDx * clampedDx);
  const y = cy - denom;
  const tangentDeg = (Math.atan2(clampedDx, denom) * 180) / Math.PI;
  return { y, tangentDeg };
}

/** Точка на дуге кнопок. */
export function mobileDockCircleArcAtX(
  xPx: number,
  shellWidthPx: number,
): { y: number; tangentDeg: number } {
  return mobileDockCircleArcAtXWithParams(xPx, shellWidthPx, {
    diameterPx: MOBILE_DOCK_BTN_ARC_DIAMETER_PX,
    topPx: MOBILE_DOCK_ARC_TOP_PX,
  });
}

function lineArcTopPx(): number {
  return MOBILE_DOCK_LINE_ARC_TOP_PX + MOBILE_DOCK_BTN_DROP_PX;
}

/** Точка на дуге линии/стрелки (ниже кнопок). */
export function mobileDockLineCircleArcAtX(
  xPx: number,
  shellWidthPx: number,
): { y: number; tangentDeg: number } {
  return mobileDockCircleArcAtXWithParams(xPx, shellWidthPx, {
    diameterPx: MOBILE_DOCK_LINE_ARC_DIAMETER_PX,
    topPx: lineArcTopPx(),
  });
}

/** SVG-path дуги линии (по центру меню, с выходом концов за края). */
export function mobileDockLineArcPath(shellWidthPx: number): {
  d: string;
  viewBox: string;
} {
  const R = MOBILE_DOCK_LINE_ARC_DIAMETER_PX / 2;
  const svgW = Math.max(1, shellWidthPx + MOBILE_DOCK_LINE_EDGE_OVERSHOOT_PX * 2);
  const cx = svgW / 2;
  const cy = lineArcTopPx() + R;
  const chordHalf = shellWidthPx / 2 + MOBILE_DOCK_LINE_EDGE_OVERSHOOT_PX;
  const thetaMax = Math.asin(Math.min(1, chordHalf / R));

  const x0 = cx + R * Math.sin(-thetaMax);
  const y0 = cy - R * Math.cos(-thetaMax);
  const x1 = cx + R * Math.sin(thetaMax);
  const y1 = cy - R * Math.cos(thetaMax);

  return {
    d: `M ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1}`,
    viewBox: `0 0 ${svgW} ${Math.ceil(y1 + 16)}`,
  };
}

/**
 * Точка на мобильной дуге и угол касательной (deg).
 * `xViewBox` — по горизонтали 0…viewBoxW (как в path).
 */
export function mobileDockArcPointAndTangentAtViewBoxX(xViewBox: number): {
  y: number;
  tangentDeg: number;
} {
  const { viewBoxW } = MOBILE_DOCK_ARC;
  const xPx = (xViewBox / viewBoxW) * MOBILE_DOCK_BTN_ARC_DIAMETER_PX;
  const shellWidthPx = MOBILE_DOCK_BTN_ARC_DIAMETER_PX;
  return mobileDockCircleArcAtX(xPx, shellWidthPx);
}

/** Горизонтальная позиция пункта на дуге кнопок (px от левого края shell). */
export function mobileDockButtonArcXAtIndex(
  index: number,
  itemCount: number,
  shellWidthPx: number,
): number {
  const R = MOBILE_DOCK_BTN_ARC_DIAMETER_PX / 2;
  const cx = shellWidthPx / 2;
  const cy = MOBILE_DOCK_ARC_TOP_PX + R;
  const last = itemCount - 1;
  const chordHalf = Math.max(40, cx - MOBILE_DOCK_ARC_CHORD_INSET_PX);
  const thetaMax = Math.asin(Math.min(1, chordHalf / R));
  const theta = -thetaMax + (2 * thetaMax * index) / last;
  return cx + R * Math.sin(theta);
}

/** Стрелка на дуге линии под активной кнопкой. */
export function mobileDockLineArrowAtIndex(
  index: number,
  itemCount: number,
  shellWidthPx: number,
): { leftPx: number; topPx: number; rotationDeg: number } {
  const leftPx = mobileDockButtonArcXAtIndex(index, itemCount, shellWidthPx);
  const { y, tangentDeg } = mobileDockLineCircleArcAtX(leftPx, shellWidthPx);
  return { leftPx, topPx: y, rotationDeg: tangentDeg };
}

/** Позиция и поворот пункта дока на дуге (равные угловые шаги, y — вниз от центра). */
export function mobileDockItemTransformAtIndex(
  index: number,
  itemCount: number,
  shellWidthPx: number,
): { x: number; y: number; rotate: number } {
  const R = MOBILE_DOCK_BTN_ARC_DIAMETER_PX / 2;
  const cx = shellWidthPx / 2;
  const cy = MOBILE_DOCK_ARC_TOP_PX + R;
  const last = itemCount - 1;

  const xArc = mobileDockButtonArcXAtIndex(index, itemCount, shellWidthPx);
  const chordHalf = Math.max(40, cx - MOBILE_DOCK_ARC_CHORD_INSET_PX);
  const thetaMax = Math.asin(Math.min(1, chordHalf / R));
  const theta = -thetaMax + (2 * thetaMax * index) / last;
  const yArc = cy - R * Math.cos(theta);
  const centerY = cy - R;
  const slotCenterX = ((index + 0.5) / itemCount) * shellWidthPx;

  return {
    x: xArc - slotCenterX,
    y: yArc - centerY,
    rotate: (theta * 180) / Math.PI,
  };
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
