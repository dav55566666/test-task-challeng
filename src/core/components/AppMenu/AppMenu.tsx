import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useScrollSubscribe } from "../../../app/providers";
import { BurgerIcon, LinkedinIcon, TgIcon } from "../../design/Icon/Icons";
import { MENU_LINKS, ROW_LAYOUT, SOCIAL_LINKS } from "./constants";
import { MenuBlobFilterDefs } from "./MenuBlobFilterDefs";
import { MenuHighlightLayer } from "./MenuHighlightLayer";
import { MenuItem } from "./MenuItem";
import "./styles/app-menu.scss";

type HighlightMetrics = {
  top: number;
  height: number;
  buttonW: number;
  buttonH: number;
  translateXRem: number;
  rotateDeg: number;
};

/** Вертикальный скролл ≥ этой доли высоты окна (px) → FAB; fixed-меню не участвует. */
const SCROLL_THRESHOLD_VIEWPORT_RATIO = 0.1;

/** Задержка сброса hover: без неё при движении по пунктам курсор на мгновение «в пустоте» между кнопками и стрелка/дуга прыгают на активный пункт. */
const HOVER_CLEAR_DELAY_MS = 320;

function menuPathMatches(menuPath: string, pathname: string): boolean {
  if (menuPath === "/") {
    return pathname === "/";
  }
  return pathname === menuPath || pathname.startsWith(`${menuPath}/`);
}

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

function shouldUseCompactFab(): boolean {
  const vh = window.innerHeight;
  const thresholdPx = vh * SCROLL_THRESHOLD_VIEWPORT_RATIO;
  return window.scrollY >= thresholdPx;
}

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeId, setActiveId] = useState<string>("home");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [highlightMetrics, setHighlightMetrics] = useState<HighlightMetrics | null>(
    null
  );
  const [layoutTick, setLayoutTick] = useState(0);
  const [compactFab, setCompactFab] = useState(false);
  const [menuExpandedFromFab, setMenuExpandedFromFab] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollRaf = useRef<number | null>(null);
  const compactFabRef = useRef(false);
  const hoverClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverTimer = useCallback(() => {
    if (hoverClearTimerRef.current !== null) {
      clearTimeout(hoverClearTimerRef.current);
      hoverClearTimerRef.current = null;
    }
  }, []);

  const setHoveredIdImmediate = useCallback(
    (id: string) => {
      clearHoverTimer();
      setHoveredId(id);
    },
    [clearHoverTimer]
  );

  const scheduleHoveredIdClear = useCallback(() => {
    clearHoverTimer();
    hoverClearTimerRef.current = setTimeout(() => {
      hoverClearTimerRef.current = null;
      setHoveredId(null);
    }, HOVER_CLEAR_DELAY_MS);
  }, [clearHoverTimer]);

  useEffect(() => {
    return () => clearHoverTimer();
  }, [clearHoverTimer]);

  const routeActiveId =
    MENU_LINKS.find(
      (link) =>
        "path" in link &&
        Boolean(link.path) &&
        menuPathMatches(link.path, location.pathname)
    )?.id ?? null;
  const targetId = hoveredId ?? routeActiveId ?? activeId;

  const bumpLayout = () => setLayoutTick((n) => n + 1);

  const syncCompactFromScroll = useCallback(() => {
    if (scrollRaf.current != null) return;
    scrollRaf.current = requestAnimationFrame(() => {
      scrollRaf.current = null;
      const next = shouldUseCompactFab();
      const prev = compactFabRef.current;
      if (prev && !next) {
        setMenuExpandedFromFab(false);
      }
      if (prev !== next) {
        setCompactFab(next);
        compactFabRef.current = next;
      }
    });
  }, []);

  useScrollSubscribe(syncCompactFromScroll);

  useLayoutEffect(() => {
    compactFabRef.current = compactFab;
  }, [compactFab]);

  useLayoutEffect(() => {
    syncCompactFromScroll();
    window.addEventListener("resize", syncCompactFromScroll);
    return () => window.removeEventListener("resize", syncCompactFromScroll);
  }, [syncCompactFromScroll]);

  useLayoutEffect(() => {
    void layoutTick;
    const idx = MENU_LINKS.findIndex((l) => l.id === targetId);
    const layout = ROW_LAYOUT[idx >= 0 ? idx : 2];
    const row = rowRefs.current[targetId];
    const next = row ? readHighlightMetrics(row, layout) : null;
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

  const showFabStack = compactFab && !menuExpandedFromFab;
  const showMainNav = !compactFab || menuExpandedFromFab;

  return (
    <aside className="pointer-events-none fixed inset-y-0 right-0 z-50 flex items-center pr-6">
      {compactFab && menuExpandedFromFab ? (
        <button
          type="button"
          className="app-menu__backdrop pointer-events-auto"
          aria-label="Закрыть меню"
          onClick={() => setMenuExpandedFromFab(false)}
        />
      ) : null}

      <div
        className={
          "app-menu__nav-shell relative " +
          (showMainNav ? "" : "app-menu__nav-shell--hidden")
        }
      >
        <div
          className="pointer-events-none absolute top-1/2 left-17 size-209.5 -translate-y-1/2 rounded-l-full border border-[#6238D1]/24"
          aria-hidden
        />
        <nav
          ref={navRef}
          className="pointer-events-auto relative z-10 flex -translate-x-26 flex-col items-end gap-10 overflow-visible pr-8"
          aria-label="Sidebar navigation"
          onMouseEnter={clearHoverTimer}
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
                onClick={() => {
                  if ("path" in item && item.path) {
                    navigate(item.path);
                  }
                  setActiveId(item.id);
                }}
                onMouseEnter={() => setHoveredIdImmediate(item.id)}
                onMouseLeave={scheduleHoveredIdClear}
              />
            );
          })}
        </nav>
      </div>

      <div
        className={
          "app-menu__fab-stack " +
          (showFabStack ? "app-menu__fab-stack--visible" : "")
        }
        aria-hidden={!showFabStack}
      >
        <a
          className="app-menu__fab-btn"
          href={SOCIAL_LINKS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
        >
          <TgIcon style={{ width: 24, height: 24 }} />
        </a>
        <a
          className="app-menu__fab-btn"
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedinIcon style={{ width: 24, height: 24 }} />
        </a>
        <button
          type="button"
          className="app-menu__fab-btn"
          aria-label="Открыть меню"
          aria-expanded={showMainNav && compactFab}
          onClick={() => setMenuExpandedFromFab(true)}
        >
          <BurgerIcon style={{ width: 20, height: 14 }} />
        </button>
      </div>
    </aside>
  );
};

export const AppMenu = Sidebar;
