import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { GRADIENT_SHINE_DURATION_MS } from "../constants/gradient-shine.constants";
import {
  GradientShineContext,
  type GradientShineContextValue,
} from "./gradient-shine-context";

const SHINE_POSITION_VAR = "--gradient-text-shine-position";
const OBSERVER_ROOT_MARGIN = "80px";

type EntryState = {
  inView: boolean;
  onVisibilityChange: (inView: boolean) => void;
};

export const GradientShineProvider = ({ children }: { children: ReactNode }) => {
  const entriesRef = useRef(new Map<HTMLElement, EntryState>());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const setShinePosition = useCallback((progress: number) => {
    document.documentElement.style.setProperty(
      SHINE_POSITION_VAR,
      `${progress * 100}%`,
    );
  }, []);

  const stopLoop = useCallback(() => {
    runningRef.current = false;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const tick = useCallback(
    (now: number) => {
      if (!runningRef.current) return;
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = (now - startTimeRef.current) % GRADIENT_SHINE_DURATION_MS;
      setShinePosition(elapsed / GRADIENT_SHINE_DURATION_MS);
      rafRef.current = requestAnimationFrame(tick);
    },
    [setShinePosition],
  );

  const startLoop = useCallback(() => {
    if (reducedMotionRef.current || runningRef.current) return;
    const hasVisible = [...entriesRef.current.values()].some((e) => e.inView);
    if (!hasVisible) return;
    runningRef.current = true;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const syncLoop = useCallback(() => {
    const hasVisible = [...entriesRef.current.values()].some((e) => e.inView);
    if (!hasVisible || reducedMotionRef.current) {
      stopLoop();
      return;
    }
    startLoop();
  }, [startLoop, stopLoop]);

  const ensureObserver = useCallback(() => {
    if (observerRef.current) return observerRef.current;

    observerRef.current = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          const state = entriesRef.current.get(entry.target as HTMLElement);
          if (!state) continue;
          state.inView = entry.isIntersecting;
          state.onVisibilityChange(entry.isIntersecting);
        }
        syncLoop();
      },
      { root: null, rootMargin: OBSERVER_ROOT_MARGIN, threshold: 0 },
    );

    for (const element of entriesRef.current.keys()) {
      observerRef.current.observe(element);
    }

    return observerRef.current;
  }, [syncLoop]);

  useEffect(() => {
    reducedMotionRef.current =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotionRef.current) {
      setShinePosition(0);
    }

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      stopLoop();
      document.documentElement.style.removeProperty(SHINE_POSITION_VAR);
    };
  }, [setShinePosition, stopLoop]);

  const register = useCallback<GradientShineContextValue["register"]>(
    (element, onVisibilityChange) => {
      if (reducedMotionRef.current) {
        onVisibilityChange(false);
        return () => undefined;
      }

      entriesRef.current.set(element, {
        inView: false,
        onVisibilityChange,
      });

      ensureObserver().observe(element);
      syncLoop();

      return () => {
        observerRef.current?.unobserve(element);
        entriesRef.current.delete(element);
        onVisibilityChange(false);
        syncLoop();
      };
    },
    [ensureObserver, syncLoop],
  );

  const value = useMemo(() => ({ register }), [register]);

  return (
    <GradientShineContext.Provider value={value}>
      {children}
    </GradientShineContext.Provider>
  );
};
