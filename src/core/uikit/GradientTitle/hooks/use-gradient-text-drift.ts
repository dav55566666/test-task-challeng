import { useEffect, useRef } from "react";
import {
  GRADIENT_TEXT_DRIFT_DURATION_MS,
  isGradientTextWebKitTouch,
} from "../constants/gradient-text-drift.constants";

/**
 * iOS/WebKit не интерполирует keyframes для background-position + background-clip:text.
 * rAF задаёт позицию каждый кадр — то же движение 0→100%, linear, 2.64s.
 */
export const useGradientTextDrift = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isGradientTextWebKitTouch()) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    el.classList.add("gradient-text--js-drift");

    let rafId = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = (now - start) % GRADIENT_TEXT_DRIFT_DURATION_MS;
      const progress = elapsed / GRADIENT_TEXT_DRIFT_DURATION_MS;
      el.style.backgroundPosition = `${progress * 100}% 50%`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onMotionChange = () => {
      if (!reducedMotion.matches) return;
      cancelAnimationFrame(rafId);
      el.style.backgroundPosition = "";
      el.classList.remove("gradient-text--js-drift");
    };

    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(rafId);
      reducedMotion.removeEventListener("change", onMotionChange);
      el.style.backgroundPosition = "";
      el.classList.remove("gradient-text--js-drift");
    };
  }, []);

  return ref;
};
