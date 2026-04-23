import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

import { useScrollSubscribe } from "../../../app/providers";
import { useProjectsUiStore } from "../../../store";
import { BurgerIcon, LinkedinIcon, TgIcon } from "../../design/Icon/Icons";
import { AppMenuMobileDock } from "./AppMenuMobileDock";
import { MENU_LINKS, ROW_LAYOUT, SOCIAL_LINKS } from "./constants";
import { MenuHighlightLayer } from "./MenuHighlightLayer";
import { MenuItem } from "./MenuItem";
import { MENU_ACTIVE_RETURN_MS } from "./menu-timings";
import "./styles/app-menu.scss";

type MenuLink = (typeof MENU_LINKS)[number];

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

/** Сброс подсветки на маршрут: только после ухода с `<nav>`, курсор ≥ этого времени вне зоны меню. Внутри nav (в т.ч. пусто между кнопками) сброса нет. */
const HOVER_RESET_MS_AFTER_LEAVING_MENU = 1000;

const DESKTOP_HIGHLIGHT_TOP_BY_ID: Record<string, number> = {
  services: 10,
  cases: 94,
  home: 172,
  about: 250,
  contacts: 332,
};

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
  const casesListActiveSlug = useProjectsUiStore((s) => s.casesListActiveSlug);

  const [activeId, setActiveId] = useState<string>("home");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [highlightMetrics, setHighlightMetrics] = useState<HighlightMetrics | null>(
    null
  );
  const [layoutTick, setLayoutTick] = useState(0);
  const [compactFab, setCompactFab] = useState(false);
  const [menuExpandedFromFab, setMenuExpandedFromFab] = useState(false);
  /** Ступенчатое «последний градиент» / отмена задержек после первого кадра открытия меню. */
  const [staggerEntrance, setStaggerEntrance] = useState(false);
  /** На один кадр+ перед закрытием: снять активный класс/блоб с кнопки до старта анимации. */
  const [stripTargetBeforeClose, setStripTargetBeforeClose] = useState(false);
  /** После открытия из «закрытого» сначала true — не вешаем --active, через DEFER ms последним. */
  const [deferMenuActive, setDeferMenuActive] = useState(false);
  const menuWasHiddenForTransitionRef = useRef(false);
  const [pathnameSnapshot, setPathnameSnapshot] = useState(location.pathname);

  if (location.pathname !== pathnameSnapshot) {
    setPathnameSnapshot(location.pathname);
    setMenuExpandedFromFab(false);
  }

  const navRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollRaf = useRef<number | null>(null);
  const compactFabRef = useRef(false);
  const hoverAfterLeaveNavTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const clearHoverAfterLeaveMenuTimer = useCallback(() => {
    if (hoverAfterLeaveNavTimerRef.current !== null) {
      clearTimeout(hoverAfterLeaveNavTimerRef.current);
      hoverAfterLeaveNavTimerRef.current = null;
    }
  }, []);

  const setHoveredIdImmediate = useCallback(
    (id: string) => {
      clearHoverAfterLeaveMenuTimer();
      setHoveredId(id);
    },
    [clearHoverAfterLeaveMenuTimer]
  );

  const scheduleResetHoverToRouteAfterLeavingNav = useCallback(() => {
    clearHoverAfterLeaveMenuTimer();
    hoverAfterLeaveNavTimerRef.current = setTimeout(() => {
      hoverAfterLeaveNavTimerRef.current = null;
      setHoveredId(null);
    }, HOVER_RESET_MS_AFTER_LEAVING_MENU);
  }, [clearHoverAfterLeaveMenuTimer]);

  useEffect(() => {
    return () => clearHoverAfterLeaveMenuTimer();
  }, [clearHoverAfterLeaveMenuTimer]);

  /** На главной полное меню до скролла; на всех остальных страницах по умолчанию «закрыто» (FAB). */
  const isHomeRoute = location.pathname === "/";
  const menuInCompactStyle = !isHomeRoute || compactFab;

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
        if (!prev && next) {
          flushSync(() => {
            setStripTargetBeforeClose(true);
          });
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setCompactFab(true);
              compactFabRef.current = true;
              setStripTargetBeforeClose(false);
            });
          });
        } else {
          setCompactFab(next);
          compactFabRef.current = next;
        }
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
    if (next) {
      const fixedTop = DESKTOP_HIGHLIGHT_TOP_BY_ID[targetId];
      if (typeof fixedTop === "number") {
        next.top = fixedTop;
        next.height = 46;
      }
    }
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

  const showMainNav = !menuInCompactStyle || menuExpandedFromFab;

  /** Синхронно снимаем active/glow (flushSync), затем 2×rAF — и только потом анимация закрытия. */
  const queueMenuCloseChoreography = useCallback((close: () => void) => {
    flushSync(() => {
      setStripTargetBeforeClose(true);
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        close();
        setStripTargetBeforeClose(false);
      });
    });
  }, []);

  useEffect(() => {
    if (!showMainNav) {
      setStaggerEntrance(false);
      setDeferMenuActive(false);
      menuWasHiddenForTransitionRef.current = true;
      return;
    }
    if (menuWasHiddenForTransitionRef.current) {
      menuWasHiddenForTransitionRef.current = false;
      setDeferMenuActive(true);
      const t = window.setTimeout(() => {
        setDeferMenuActive(false);
      }, MENU_ACTIVE_RETURN_MS);
      return () => window.clearTimeout(t);
    }
  }, [showMainNav]);

  useEffect(() => {
    if (!showMainNav) {
      setStaggerEntrance(false);
      return;
    }
    setStaggerEntrance(true);
    const t = window.setTimeout(() => {
      setStaggerEntrance(false);
    }, 2200);
    return () => window.clearTimeout(t);
  }, [showMainNav]);

  const showFabStack = menuInCompactStyle && !menuExpandedFromFab;
  /** Меню открыто из FAB поверх затемнённого backdrop. */
  const menuOverDarkBackdrop = menuInCompactStyle && menuExpandedFromFab;

  const navigateToMenuItem = useCallback(
    (item: MenuLink) => {
      if ("path" in item && item.path) {
        if (item.path === "/" && location.pathname.startsWith("/projects")) {
          const detailMatch = /^\/projects\/([^/]+)$/.exec(location.pathname);
          const slug = detailMatch?.[1] ?? casesListActiveSlug;
          if (slug) {
            navigate({
              pathname: "/",
              hash: `#project-${slug}`,
            });
          } else {
            navigate("/");
          }
        } else {
          navigate(item.path);
        }
      }
      setActiveId(item.id);
      if (menuInCompactStyle) {
        queueMenuCloseChoreography(() => {
          setMenuExpandedFromFab(false);
        });
      }
    },
    [
      casesListActiveSlug,
      location.pathname,
      menuInCompactStyle,
      navigate,
      queueMenuCloseChoreography,
    ]
  );

  return (
    <>
      {menuInCompactStyle && menuExpandedFromFab ? (
        <button
          type="button"
          className="app-menu__backdrop app-menu__backdrop--fab-open pointer-events-auto"
          aria-label="Закрыть меню"
          onClick={() => {
            queueMenuCloseChoreography(() => {
              setMenuExpandedFromFab(false);
            });
          }}
        />
      ) : null}

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 xl:hidden">
        <AppMenuMobileDock
          visible={showMainNav}
          targetId={targetId}
          onItemActivate={navigateToMenuItem}
          onDimmedBackdrop={menuOverDarkBackdrop}
        />
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
          aria-expanded={showMainNav && menuInCompactStyle}
          onClick={() => setMenuExpandedFromFab(true)}
        >
          <BurgerIcon style={{ width: 20, height: 14 }} />
        </button>
      </div>

      <aside className="pointer-events-none fixed inset-y-0 right-0 z-50 hidden items-center pr-6 xl:flex">
      <div
        className={
          "app-menu__nav-shell relative " +
          (showMainNav ? "" : "app-menu__nav-shell--hidden") +
          (staggerEntrance && showMainNav
            ? " app-menu__nav-shell--stagger-open"
            : "")
        }
      >
        <div
          className={
            "app-menu__desktop-arc-bg pointer-events-none absolute top-1/2 -translate-y-1/2 " +
            (menuOverDarkBackdrop ? "app-menu__desktop-arc-bg--visible" : "")
          }
          aria-hidden
        />
        <div
          className="app-menu__desktop-arc pointer-events-none absolute top-1/2 -translate-y-1/2"
          aria-hidden
        />
        <nav
          ref={navRef}
          className="app-menu__desktop-nav pointer-events-auto relative z-10 flex -translate-x-26 flex-col items-end gap-10 overflow-visible pr-8"
          aria-label="Sidebar navigation"
          onMouseEnter={clearHoverAfterLeaveMenuTimer}
          onMouseLeave={scheduleResetHoverToRouteAfterLeavingNav}
        >
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
                orderIndex={index}
                label={item.label}
                icon={item.icon}
                glowTarget={targetId === item.id && !stripTargetBeforeClose}
                isTarget={
                  targetId === item.id &&
                  !stripTargetBeforeClose &&
                  !deferMenuActive
                }
                translateXRem={rowLayout.translateXRem}
                rotateDeg={rowLayout.rotateDeg}
                overDarkBackdrop={menuOverDarkBackdrop}
                onClick={() => navigateToMenuItem(item)}
                onMouseEnter={() => setHoveredIdImmediate(item.id)}
              />
            );
          })}
        </nav>
      </div>
    </aside>
    </>
  );
};

export const AppMenu = Sidebar;
