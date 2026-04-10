import { useLayoutEffect, useRef, useState } from "react";

import { MENU_LINKS, ROW_LAYOUT } from "./constants";
import { MenuBlobFilterDefs } from "./MenuBlobFilterDefs";
import { MenuHighlightLayer } from "./MenuHighlightLayer";
import { MenuItem } from "./MenuItem";

type HighlightMetrics = {
  top: number;
  height: number;
  buttonW: number;
  buttonH: number;
  translateXRem: number;
  rotateDeg: number;
};

function readHighlightMetrics(
  row: HTMLDivElement,
  layout: (typeof ROW_LAYOUT)[number]
): HighlightMetrics | null {
  const btn = row.querySelector("button");
  if (!btn) return null;
  return {
    top: row.offsetTop,
    height: row.offsetHeight,
    buttonW: btn.offsetWidth,
    buttonH: btn.offsetHeight,
    translateXRem: layout.translateXRem,
    rotateDeg: layout.rotateDeg,
  };
}

export const Sidebar = () => {
  const [activeId, setActiveId] = useState<string>("home");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [highlightMetrics, setHighlightMetrics] = useState<HighlightMetrics | null>(null);
  const [layoutTick, setLayoutTick] = useState(0);

  const navRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const targetId = hoveredId ?? activeId;

  const bumpLayout = () => setLayoutTick((n) => n + 1);

  useLayoutEffect(() => {
    void layoutTick;
    const idx = MENU_LINKS.findIndex((l) => l.id === targetId);
    const layout = ROW_LAYOUT[idx >= 0 ? idx : 2];
    const row = rowRefs.current[targetId];
    const next = row ? readHighlightMetrics(row, layout) : null;
    // DOM layout from refs after commit (refs must not be read during render)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync highlight overlay to measured row geometry
    setHighlightMetrics(next);
  }, [targetId, layoutTick]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const ro = new ResizeObserver(() => bumpLayout());
    ro.observe(nav);
    window.addEventListener("resize", bumpLayout);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", bumpLayout);
    };
  }, []);

  return (
    <aside className="pointer-events-none fixed inset-y-0 right-0 z-50 flex items-center pr-6">
      <div className="relative">
        <div
          className="pointer-events-none absolute top-1/2 left-17 size-209.5 -translate-y-1/2 rounded-l-full border border-[#6238D1]/24"
          aria-hidden
        />
        <nav
          ref={navRef}
          className="pointer-events-auto relative z-10 flex -translate-x-26 flex-col items-end gap-10 overflow-visible pr-8"
          aria-label="Sidebar navigation"
        >
          <MenuBlobFilterDefs />
          {highlightMetrics ? (
            <MenuHighlightLayer
              translateXRem={highlightMetrics.translateXRem}
              rotateDeg={highlightMetrics.rotateDeg}
              topPx={highlightMetrics.top}
              heightPx={highlightMetrics.height}
              buttonWidthPx={highlightMetrics.buttonW}
              buttonHeightPx={highlightMetrics.buttonH}
            />
          ) : null}
          {MENU_LINKS.map((item, index) => {
            const rowLayout = ROW_LAYOUT[index] ?? ROW_LAYOUT[2];
            return (
              <MenuItem
                key={item.id}
                ref={(el) => {
                  rowRefs.current[item.id] = el;
                }}
                label={item.label}
                icon={item.icon}
                isTarget={targetId === item.id}
                translateXRem={rowLayout.translateXRem}
                rotateDeg={rowLayout.rotateDeg}
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export const AppMenu = Sidebar;
