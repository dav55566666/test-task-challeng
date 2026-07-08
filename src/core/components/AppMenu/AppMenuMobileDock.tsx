import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Icon } from "../../design/Icon";
import { MENU_LINKS } from "./constants";
import {
  mobileDockItemTransformAtIndex,
  mobileDockLineArcPath,
  mobileDockLineArrowAtIndex,
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

const MOBILE_ARROW_STYLE_BY_ID = {
  services: { leftPx: 61, topPx: 147.084, rotationDeg: -33.749 },
  cases: { leftPx: 124.563, topPx: 124.563, rotationDeg: -16.8745 },
  about: { leftPx: 266.437, topPx: 123.563, rotationDeg: 16.8745 },
  contacts: { leftPx: 338, topPx: 153.084, rotationDeg: 33.749 },
} as const;

export const AppMenuMobileDock = ({
  visible,
  targetId,
  onItemActivate,
  onDimmedBackdrop = false,
}: AppMenuMobileDockProps) => {
  const shellRef = useRef<HTMLDivElement>(null);
  const [resizeTick, setResizeTick] = useState(0);
  const [shellWidth, setShellWidth] = useState(390);

  useEffect(() => {
    const onResize = () => setResizeTick((n) => n + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    setShellWidth(shell.getBoundingClientRect().width);
  }, [visible, resizeTick]);

  const activeIndex = Math.max(
    0,
    MENU_LINKS.findIndex((item) => item.id === targetId),
  );
  const arcArrow = mobileDockLineArrowAtIndex(
    activeIndex,
    MENU_LINKS.length,
    shellWidth,
  );
  const fixedArrow = MOBILE_ARROW_STYLE_BY_ID[
    targetId as keyof typeof MOBILE_ARROW_STYLE_BY_ID
  ];
  const arrowLeftPx = fixedArrow?.leftPx ?? arcArrow.leftPx;
  const arrowTopPx = fixedArrow?.topPx ?? arcArrow.topPx;
  const arrowRotationDeg = fixedArrow?.rotationDeg ?? arcArrow.rotationDeg;

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
        {visible ? (
          <div
            className="app-menu__mobile-dock__line-arc-marker"
            style={{
              left: `${arrowLeftPx}px`,
              top: `${arrowTopPx}px`,
              transform: `translate(-50%, 0) rotate(${arrowRotationDeg}deg)`,
            }}
            aria-hidden
          >
            <svg
              width="14"
              height="28"
              viewBox="0 0 14 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 23.3311C13 24.9879 11.6569 26.3311 10 26.3311L4 26.3311C2.34315 26.3311 0.999999 24.9879 0.999999 23.3311L1 6.57715C1.00005 5.77051 1.32496 4.99788 1.90137 4.43359L4.53418 1.85644C5.6182 0.795221 7.32369 0.710058 8.50781 1.6582L11.875 4.35547C12.5858 4.92482 13 5.78654 13 6.69727L13 23.3311Z"
                fill="#333333"
                fillOpacity="0.96"
                stroke="#F1D3D4"
                strokeWidth="2"
              />
            </svg>
          </div>
        ) : null}
        {onDimmedBackdrop ? (
          <div className="app-menu__mobile-dock__handle" aria-hidden />
        ) : null}
      </div>
    </nav>
  );
};
