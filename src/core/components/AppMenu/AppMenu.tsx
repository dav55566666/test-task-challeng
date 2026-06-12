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
import { BurgerIcon, LinkedinIcon, TgIcon } from "../../design/Icon/Icons";
import { AppMenuMobileDock } from "./AppMenuMobileDock";
import {
  DESKTOP_ORBIT_Y_BIAS_PX_BY_ID,
  MENU_LINKS,
  ROW_LAYOUT,
  SOCIAL_LINKS,
} from "./constants";
import { MenuArcArrowOrbit } from "./MenuArcArrowOrbit";
import {
  getArcCircle,
  orbitRotationDegFromArcParam,
  thetaFromViewportY,
  unwrapOrbitRotationDeg,
} from "./menuArcArrow";
import { MenuItem } from "./MenuItem";
import { MENU_ACTIVE_RETURN_MS } from "./menu-timings";
import "./styles/app-menu.scss";

type MenuLink = (typeof MENU_LINKS)[number];

type OrbitLayout = {
  leftPx: number;
  topPx: number;
  diameterPx: number;
  rotationDeg: number;
};

/** Вертикальный скролл ≥ этой доли высоты окна (px) → FAB; fixed-меню не участвует. */
const SCROLL_THRESHOLD_VIEWPORT_RATIO = 0.1;

/** Сброс подсветки на маршрут: только после ухода с `<nav>`, курсор ≥ этого времени вне зоны меню. Внутри nav (в т.ч. пусто между кнопками) сброса нет. */
const HOVER_RESET_MS_AFTER_LEAVING_MENU = 1000;

function menuPathMatches(menuPath: string, pathname: string): boolean {
  if (menuPath === "/") {
    return pathname === "/";
  }
  return pathname === menuPath || pathname.startsWith(`${menuPath}/`);
}

function shouldUseCompactFab(): boolean {
  const vh = window.innerHeight;
  const thresholdPx = vh * SCROLL_THRESHOLD_VIEWPORT_RATIO;
  return window.scrollY >= thresholdPx;
}

/** Tailwind `md` (768px): ниже — нижняя дуга + FAB; от 768 — готовое боковое меню как на десктопе. */
const COMPACT_NAV_MAX_WIDTH_MEDIA = "(max-width: 767px)";

function isCompactNavViewport(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia(COMPACT_NAV_MAX_WIDTH_MEDIA).matches;
}

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeId, setActiveId] = useState<string>("home");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [orbitLayout, setOrbitLayout] = useState<OrbitLayout | null>(null);
  const [layoutTick, setLayoutTick] = useState(0);
  const [compactFab, setCompactFab] = useState(false);
  const [compactNavViewport, setCompactNavViewport] = useState(isCompactNavViewport);
  const [menuExpandedFromFab, setMenuExpandedFromFab] = useState(false);
  /** Ступенчатое «последний градиент» / отмена задержек после первого кадра открытия меню. */
  const [staggerEntrance, setStaggerEntrance] = useState(false);
  const [staggerRunId, setStaggerRunId] = useState(0);
  /** На один кадр+ перед закрытием: снять активный класс/блоб с кнопки до старта анимации. */
  const [stripTargetBeforeClose, setStripTargetBeforeClose] = useState(false);
  /** После открытия из «закрытого» сначала true — не вешаем --active, через DEFER ms последним. */
  const [deferMenuActive, setDeferMenuActive] = useState(false);
  const menuWasHiddenForTransitionRef = useRef(false);
  const [pathnameSnapshot, setPathnameSnapshot] = useState(location.pathname);

  if (location.pathname !== pathnameSnapshot) {
    setPathnameSnapshot(location.pathname);
    setMenuExpandedFromFab(false);
    setCompactFab(shouldUseCompactFab());
  }

  const navRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  /** Последний выставленный rotate (развёрнутый), чтобы transition шёл кратчайшей дугой ±180°. */
  const prevOrbitRotationDisplayRef = useRef<number | null>(null);
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

  useLayoutEffect(() => {
    const mq = window.matchMedia(COMPACT_NAV_MAX_WIDTH_MEDIA);
    const sync = () => setCompactNavViewport(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /**
   * <768 — FAB, меню только по кнопке.
   * ≥768 — боковое меню авто только на главной до порога скролла (первый блок);
   * на остальных страницах и после скролла на главной — FAB, открытие по кнопке.
   */
  const isHomeRoute = location.pathname === "/";
  const menuInCompactStyle = compactNavViewport
    ? true
    : !isHomeRoute || compactFab;

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
  const stripTarget = stripTargetBeforeClose || !showMainNav;
  const deferActive = deferMenuActive && showMainNav;

  const scheduleOrbitLayout = useCallback((next: OrbitLayout | null) => {
    queueMicrotask(() => setOrbitLayout(next));
  }, []);

  useLayoutEffect(() => {
    void layoutTick;
    if (!showMainNav) {
      prevOrbitRotationDisplayRef.current = null;
      return;
    }
    const shell = shellRef.current;
    const arc = arcRef.current;
    const row = rowRefs.current[targetId];
    if (!shell || !arc || !row) {
      scheduleOrbitLayout(null);
      return;
    }
    const ac = getArcCircle(arc.getBoundingClientRect());
    if (!ac) {
      scheduleOrbitLayout(null);
      return;
    }
    const sr = shell.getBoundingClientRect();
    const anchor = row.querySelector<HTMLElement>("[data-app-menu-arrow-anchor]");
    const btn = row.querySelector("button");
    const anchorRect = anchor?.getBoundingClientRect();
    const biasPx =
      DESKTOP_ORBIT_Y_BIAS_PX_BY_ID[
        targetId as keyof typeof DESKTOP_ORBIT_Y_BIAS_PX_BY_ID
      ] ?? 0;
    let t: number;
    if (anchorRect) {
      const ay = anchorRect.top + anchorRect.height / 2 + biasPx;
      t = thetaFromViewportY(ay, ac);
    } else {
      const rr = (btn ?? row).getBoundingClientRect();
      const yMid = rr.top + rr.height / 2 + biasPx;
      t = thetaFromViewportY(yMid, ac);
    }
    const canonical = orbitRotationDegFromArcParam(t);
    const prev = prevOrbitRotationDisplayRef.current;
    const rotationDeg =
      prev === null
        ? canonical
        : unwrapOrbitRotationDeg(prev, canonical);
    prevOrbitRotationDisplayRef.current = rotationDeg;
    scheduleOrbitLayout({
      leftPx: ac.cx - ac.R - sr.left,
      topPx: ac.cy - ac.R - sr.top,
      diameterPx: 2 * ac.R,
      rotationDeg,
    });
  }, [targetId, layoutTick, showMainNav, scheduleOrbitLayout]);

  /** Синхронно снимаем active/glow (flushSync), затем 2×rAF — и только потом анимация закрытия. */
  const queueMenuCloseChoreography = useCallback((close: () => void) => {
    flushSync(() => {
      setStripTargetBeforeClose(true);
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        close();
      });
    });
  }, []);

  useEffect(() => {
    if (!showMainNav) {
      queueMicrotask(() => {
        menuWasHiddenForTransitionRef.current = true;
      });
      return;
    }
    queueMicrotask(() => {
      if (menuWasHiddenForTransitionRef.current) {
        menuWasHiddenForTransitionRef.current = false;
        setDeferMenuActive(true);
        setStaggerEntrance(true);
        setStaggerRunId((id) => id + 1);
      } else {
        setStripTargetBeforeClose(false);
        setStaggerEntrance(true);
        setStaggerRunId((id) => id + 1);
      }
    });
  }, [showMainNav]);

  useEffect(() => {
    if (!deferMenuActive) return;
    const t = window.setTimeout(() => {
      setDeferMenuActive(false);
      setStripTargetBeforeClose(false);
    }, MENU_ACTIVE_RETURN_MS);
    return () => window.clearTimeout(t);
  }, [deferMenuActive]);

  useEffect(() => {
    if (!showMainNav || !staggerEntrance) return;
    const t = window.setTimeout(() => {
      setStaggerEntrance(false);
    }, 2200);
    return () => window.clearTimeout(t);
  }, [showMainNav, staggerEntrance, staggerRunId]);

  const showFabStack = menuInCompactStyle && !menuExpandedFromFab;
  /**
   * Тёмный режим нижней дуги (мобильный FAB-шит): только узкий экран + после скролла на главной
   * или не-главная (см. AppMenuMobileDock --over-backdrop).
   */
  const menuOverDarkBackdrop =
    compactNavViewport &&
    menuInCompactStyle &&
    menuExpandedFromFab &&
    (compactFab || !isHomeRoute);
  /** Нижняя дуга — только при ширине <768; с планшета/десктопа всегда боковое меню. */
  const showMobileDockSlot = compactNavViewport;
  /** Стеклянная дуга справа: везде, кроме первого экрана главной (герой до скролла). */
  const showDesktopArcGlassBg =
    showMainNav && (!isHomeRoute || compactFab);
  /** Закрытие по клику вне: мобильный шит или FAB-меню ≥768. */
  const showFabDismissBackdrop =
    menuOverDarkBackdrop ||
    (menuInCompactStyle &&
      menuExpandedFromFab &&
      !compactNavViewport);

  const navigateToMenuItem = useCallback(
    (item: MenuLink) => {
      if ("path" in item && item.path) {
        navigate(item.path);
      }
      setActiveId(item.id);
      if (menuInCompactStyle) {
        queueMenuCloseChoreography(() => {
          setMenuExpandedFromFab(false);
        });
      }
    },
    [
      menuInCompactStyle,
      navigate,
      queueMenuCloseChoreography,
    ]
  );

  return (
    <>
      {showFabDismissBackdrop ? (
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

      <div
        className={
          "app-menu__mobile-dock-slot pointer-events-none fixed inset-x-0 bottom-0 z-10 " +
          (showMobileDockSlot ? "" : "hidden")
        }
      >
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
          className="app-menu__fab-btn app-menu__fab-btn--social"
          href={SOCIAL_LINKS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
        >
          <TgIcon style={{ width: 24, height: 24 }} />
        </a>
        <a
          className="app-menu__fab-btn app-menu__fab-btn--social"
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedinIcon style={{ width: 24, height: 24 }} />
        </a>
        <button
          type="button"
          className="app-menu__fab-btn app-menu__fab-btn--menu"
          aria-label="Открыть меню"
          aria-expanded={showMainNav && menuInCompactStyle}
          onClick={() => setMenuExpandedFromFab(true)}
        >
          <BurgerIcon />
        </button>
      </div>

      <aside className="app-menu__desktop-aside-slot pointer-events-none fixed inset-y-0 right-0 z-10 hidden items-center pr-6 md:flex">
      <div
        ref={shellRef}
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
            (showDesktopArcGlassBg ? "app-menu__desktop-arc-bg--visible" : "")
          }
          aria-hidden
        />
        <div
          ref={arcRef}
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
          {MENU_LINKS.map((item, index) => {
            const rowLayout = ROW_LAYOUT[index] ?? ROW_LAYOUT[2];
            return (
              <MenuItem
                key={item.id}
                itemId={item.id}
                ref={(el) => {
                  rowRefs.current[item.id] = el;
                }}
                orderIndex={index}
                label={item.label}
                icon={item.icon}
                glowTarget={targetId === item.id && !stripTarget}
                isTarget={
                  targetId === item.id && !stripTarget && !deferActive
                }
                translateXRem={rowLayout.translateXRem}
                translateXPx={rowLayout.translateXPx}
                translateYPx={rowLayout.translateYPx}
                rotateDeg={rowLayout.rotateDeg}
                overDarkBackdrop={menuOverDarkBackdrop}
                onClick={() => navigateToMenuItem(item)}
                onMouseEnter={() => setHoveredIdImmediate(item.id)}
              />
            );
          })}
        </nav>
        {showMainNav && orbitLayout ? (
          <MenuArcArrowOrbit
            leftPx={orbitLayout.leftPx}
            topPx={orbitLayout.topPx}
            diameterPx={orbitLayout.diameterPx}
            rotationDeg={orbitLayout.rotationDeg}
          />
        ) : null}
      </div>
    </aside>
    </>
  );
};

export const AppMenu = Sidebar;
