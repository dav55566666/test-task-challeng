import { useEffect, useRef, useState } from "react";
import { Icon } from "../../design/Icon";
import {
  MENU_LINKS,
  MOBILE_DOCK_ARROW_ROTATION_DEG_BY_ID,
} from "./constants";
import { MenuMobileDockLineArrowOrbit } from "./MenuMobileDockLineArrowOrbit";
import {
  mobileDockItemTransformAtIndex,
  mobileDockLineArcPath,
  mobileDockLineOrbitLayoutAtIndex,
  unwrapOrbitRotationDeg,
} from "./menuArcArrow";

const ARC_ICON_PX = 22;

type MenuLink = (typeof MENU_LINKS)[number];

type AppMenuMobileDockProps = {
  visible: boolean;
  targetId: string;
  onItemActivate: (item: MenuLink) => void;
  /**
   * Меню открыто из FAB с оверлеем: контраст неактивных пунктов.
   * Без `app-menu__mobile-dock--over-backdrop` (правая панель) — на телефоне всегда нижняя дуга.
   */
  onDimmedBackdrop?: boolean;
};

export const AppMenuMobileDock = ({
  visible,
  targetId,
  onItemActivate,
  onDimmedBackdrop = false,
}: AppMenuMobileDockProps) => {
  const shellRef = useRef<HTMLDivElement>(null);
  const prevOrbitRotationRef = useRef<number | null>(null);
  const [shellWidth, setShellWidth] = useState(390);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const syncWidth = () => {
      setShellWidth(shell.getBoundingClientRect().width);
    };
    syncWidth();

    const ro = new ResizeObserver(syncWidth);
    ro.observe(shell);
    window.addEventListener("resize", syncWidth);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncWidth);
    };
  }, [visible]);

  const activeIndex = Math.max(
    0,
    MENU_LINKS.findIndex((item) => item.id === targetId),
  );

  const orbitLayout = visible
    ? mobileDockLineOrbitLayoutAtIndex(
        activeIndex,
        MENU_LINKS.length,
        shellWidth,
      )
    : null;

  let orbitRotationDeg = 0;
  if (!visible) {
    prevOrbitRotationRef.current = null;
  } else if (orbitLayout) {
    const canonical =
      MOBILE_DOCK_ARROW_ROTATION_DEG_BY_ID[
        targetId as keyof typeof MOBILE_DOCK_ARROW_ROTATION_DEG_BY_ID
      ] ?? orbitLayout.rotationDeg;
    const prev = prevOrbitRotationRef.current;
    orbitRotationDeg =
      prev === null
        ? canonical
        : unwrapOrbitRotationDeg(prev, canonical);
    prevOrbitRotationRef.current = orbitRotationDeg;
  }

  const lineArc = mobileDockLineArcPath(shellWidth);

  return (
    <nav
      className={
        "app-menu__mobile-dock " +
        (visible ? "app-menu__mobile-dock--visible" : "app-menu__mobile-dock--hidden")
      }
      aria-hidden={!visible}
      aria-label="Основная навигация"
    >
      <div ref={shellRef} className="app-menu__mobile-dock__inner">
        <div className="app-menu__mobile-dock__glow" aria-hidden />
        <div className="app-menu__mobile-dock__glass-arc" aria-hidden />
        <svg
          className="app-menu__mobile-dock__line-arc"
          viewBox={lineArc.viewBox}
          aria-hidden
        >
          <path
            d={lineArc.d}
            fill="none"
            stroke="rgba(98, 56, 209, 0.24)"
            strokeWidth="1"
          />
        </svg>
        <ul className="app-menu__mobile-dock__list">
          {MENU_LINKS.map((item, index) => {
            const isActive = targetId === item.id;
            const t = mobileDockItemTransformAtIndex(
              index,
              MENU_LINKS.length,
              shellWidth,
            );
            return (
              <li
                key={item.id}
                className="app-menu__mobile-dock__item"
                style={{
                  transform: `translate(${t.x}px, ${t.y}px) rotate(${t.rotate}deg)`,
                  transformOrigin: "center bottom",
                }}
              >
                <button
                  type="button"
                  className={
                    "app-menu__mobile-dock__btn " +
                    (isActive ? "app-menu__mobile-dock__btn--active" : "") +
                    (onDimmedBackdrop && !isActive
                      ? " app-menu__mobile-dock__btn--on-dark"
                      : "")
                  }
                  onClick={() => onItemActivate(item)}
                >
                  <span
                    className={`app-menu__mobile-dock__icon app-menu__mobile-dock__icon--${item.id}`}
                  >
                    <Icon
                      name={item.icon}
                      style={{
                        width: ARC_ICON_PX,
                        height: ARC_ICON_PX,
                        ...(isActive
                          ? { color: "#ffffff", solid: true }
                          : onDimmedBackdrop
                            ? { color: "rgba(51, 51, 51, 0.32)", solid: true }
                            : { color: "rgba(51, 51, 51, 0.32)", solid: true }),
                      }}
                    />
                  </span>
                  <span className="app-menu__mobile-dock__label">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {orbitLayout ? (
          <MenuMobileDockLineArrowOrbit
            leftPx={orbitLayout.leftPx}
            topPx={orbitLayout.topPx}
            diameterPx={orbitLayout.diameterPx}
            rotationDeg={orbitRotationDeg}
          />
        ) : null}
        {onDimmedBackdrop ? (
          <div className="app-menu__mobile-dock__handle" aria-hidden />
        ) : null}
      </div>
    </nav>
  );
};
