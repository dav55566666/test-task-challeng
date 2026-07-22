import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./tabs.scss";

const MD_MIN_PX = 768;
const MOBILE_ROW_JUMP_MIN_PX = 6;

export type TabItem = {
  label: string;
  value: string;
};

export type TabsProps = {
  items: TabItem[];
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
  "aria-label"?: string;
};

function useIsMobileViewport() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${MD_MIN_PX - 1}px)`).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MD_MIN_PX - 1}px)`);
    const sync = () => setIsMobile(mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isMobile;
}

export function Tabs({
  items,
  activeValue,
  onChange,
  className,
  "aria-label": ariaLabel,
}: TabsProps) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabsRootRef = useRef<HTMLDivElement>(null);
  const prevIndicatorYRef = useRef<number | null>(null);
  const hasInitialRevealRef = useRef(false);
  const revealClearTimerRef = useRef<number | null>(null);
  const [resizeTick, setResizeTick] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({
    x: 0,
    y: 0,
    width: 0,
    visible: false,
  });
  const [reveal, setReveal] = useState<
    null | "from-bottom" | "from-top" | "from-left"
  >(null);
  const isMobile = useIsMobileViewport();

  useEffect(() => {
    const onResize = () => setResizeTick((n) => n + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    return () => {
      if (revealClearTimerRef.current != null) {
        window.clearTimeout(revealClearTimerRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    const INDICATOR_HEIGHT_PX = 2;
    const targetEl = tabRefs.current[activeValue];
    const root = tabsRootRef.current;

    if (!targetEl || !root) {
      setIndicatorStyle((prev) =>
        prev.visible ? { ...prev, visible: false } : prev
      );
      setReveal(null);
      return;
    }

    const tabRect = targetEl.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    const x = tabRect.left - rootRect.left + root.scrollLeft;
    const y =
      tabRect.bottom - rootRect.top + root.scrollTop - INDICATOR_HEIGHT_PX;
    const next = {
      x,
      y,
      width: tabRect.width,
      visible: true as const,
    };

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const prevY = prevIndicatorYRef.current;
    const rowJump =
      isMobile &&
      !prefersReduced &&
      prevY != null &&
      Math.abs(y - prevY) >= MOBILE_ROW_JUMP_MIN_PX;
    /** Первый показ (в т.ч. переход с главной на /projects): слева → направо, без «полёта» из (0,0). */
    const initialReveal =
      !prefersReduced && !hasInitialRevealRef.current;

    prevIndicatorYRef.current = y;

    if (revealClearTimerRef.current != null) {
      window.clearTimeout(revealClearTimerRef.current);
      revealClearTimerRef.current = null;
    }

    if (initialReveal) {
      hasInitialRevealRef.current = true;
      setIndicatorStyle(next);
      setReveal("from-left");
      revealClearTimerRef.current = window.setTimeout(() => {
        setReveal(null);
        revealClearTimerRef.current = null;
      }, 420);
    } else if (rowJump) {
      const down = y > prevY;
      setIndicatorStyle(next);
      setReveal(down ? "from-bottom" : "from-top");
      revealClearTimerRef.current = window.setTimeout(() => {
        setReveal(null);
        revealClearTimerRef.current = null;
      }, 420);
    } else {
      setReveal(null);
      setIndicatorStyle(next);
    }
  }, [activeValue, isMobile, items, resizeTick]);

  return (
    <div
      ref={tabsRootRef}
      className={
        "tabs relative flex flex-wrap items-end gap-x-5 gap-y-3 bg-white md:gap-x-8 md:gap-y-2.5 mt-4 md:mt-0 " +
        (className ?? "")
      }
      role="tablist"
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const isActive = item.value === activeValue;
        return (
          <button
            key={item.value}
            ref={(el) => {
              tabRefs.current[item.value] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            id={`tab-${item.value}`}
            className={
              "tabs__tab relative shrink-0 cursor-pointer border-0 bg-transparent px-1 pb-0.5 pt-1 " +
              "text-base font-normal transition-colors " +
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 " +
              "focus-visible:ring-offset-2"
            }
            onClick={() => onChange(item.value)}
          >
            <span
              className='text-sm text-[#a0a0a0]'
            >
              {item.label}
            </span>
          </button>
        );
      })}
      <span
        className={
          "tabs__indicator pointer-events-none absolute left-0 top-0 h-0.5 rounded-full " +
          (reveal
            ? "tabs__indicator--row-reveal "
            : "transition-[transform,width,opacity] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ") +
          (reveal === "from-bottom"
            ? "tabs__indicator--reveal-from-bottom "
            : "") +
          (reveal === "from-top"
            ? "tabs__indicator--reveal-from-top "
            : "") +
          (reveal === "from-left"
            ? "tabs__indicator--reveal-from-left "
            : "")
        }
        style={{
          transform: `translate(${indicatorStyle.x}px, ${indicatorStyle.y}px)`,
          width: `${indicatorStyle.width}px`,
          opacity: indicatorStyle.visible ? 1 : 0,
        }}
        aria-hidden
      />
    </div>
  );
}
