import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

export function Tabs({
  items,
  activeValue,
  onChange,
  className,
  "aria-label": ariaLabel,
}: TabsProps) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabsRootRef = useRef<HTMLDivElement>(null);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const [resizeTick, setResizeTick] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({
    x: 0,
    y: 0,
    width: 0,
    visible: false,
  });

  const targetValue = hoveredValue ?? activeValue;

  useEffect(() => {
    const onResize = () => setResizeTick((n) => n + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLayoutEffect(() => {
    const INDICATOR_HEIGHT_PX = 2;

    const frame = window.requestAnimationFrame(() => {
      const targetEl = tabRefs.current[targetValue];
      const root = tabsRootRef.current;
      if (!targetEl || !root) {
        setIndicatorStyle((prev) =>
          prev.visible ? { ...prev, visible: false } : prev
        );
        return;
      }
      const tabRect = targetEl.getBoundingClientRect();
      const rootRect = root.getBoundingClientRect();
      const x = tabRect.left - rootRect.left + root.scrollLeft;
      const y =
        tabRect.bottom - rootRect.top + root.scrollTop - INDICATOR_HEIGHT_PX;
      setIndicatorStyle({
        x,
        y,
        width: tabRect.width,
        visible: true,
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [items, resizeTick, targetValue]);

  return (
    <div
      ref={tabsRootRef}
      className={
        "tabs relative flex flex-wrap items-end gap-x-5 gap-y-3 bg-white md:gap-x-8 md:gap-y-2.5 mt-4 md:mt-0 " +
        (className ?? "")
      }
      role="tablist"
      aria-label={ariaLabel}
      onMouseLeave={() => setHoveredValue(null)}
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
            onMouseEnter={() => setHoveredValue(item.value)}
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
          "pointer-events-none absolute left-0 top-0 h-0.5 rounded-full " +
          "bg-[linear-gradient(90deg,#C5B4E3_0%,#82C9E7_100%)] " +
          "transition-[transform,width,opacity] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
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
