import { useCallback, useEffect, useRef, useState } from "react";

/** Index of the tracked element with the largest viewport overlap (`intersectionRatio`). */
export function useMaxIntersectionIndex(itemCount: number) {
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const ratiosRef = useRef<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const registerItemRef = useCallback((index: number, el: HTMLElement | null) => {
    itemsRef.current[index] = el;
    if (el) el.dataset.intersectIndex = String(index);
  }, []);

  useEffect(() => {
    itemsRef.current.length = itemCount;
    ratiosRef.current = Array.from({ length: itemCount }, () => 0);

    const ratios = ratiosRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = Number((entry.target as HTMLElement).dataset.intersectIndex);
          if (idx >= 0 && idx < itemCount) ratios[idx] = entry.intersectionRatio;
        }

        let best = 0;
        let bestRatio = -1;
        for (let i = 0; i < itemCount; i++) {
          const r = ratios[i] ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = i;
          }
        }
        setActiveIndex(bestRatio > 0 ? best : null);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [itemCount]);

  return { activeIndex, registerItemRef };
}
