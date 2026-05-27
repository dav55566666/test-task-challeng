import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IMAGES } from "../../design";
import { Icon } from "../../design/Icon";
import { MENU_LINKS, MOBILE_DOCK_ARC, MOBILE_DOCK_ITEM_TRANSFORMS } from "./constants";
import {
  mobileDockArcPointAndTangentAtViewBoxX,
  unwrapOrbitRotationDeg,
} from "./menuArcArrow";

const ARC_ICON_PX = 18;

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
  const itemBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const prevArcArrowRotationRef = useRef<number | null>(null);
  const [resizeTick, setResizeTick] = useState(0);
  const [arcArrow, setArcArrow] = useState<{
    leftPx: number;
    rotationDeg: number;
    opacity: number;
  }>({ leftPx: 0, rotationDeg: 0, opacity: 0 });

  useEffect(() => {
    const onResize = () => setResizeTick((n) => n + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLayoutEffect(() => {
    if (!visible || onDimmedBackdrop) {
      prevArcArrowRotationRef.current = null;
      setArcArrow({ leftPx: 0, rotationDeg: 0, opacity: 0 });
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const shell = shellRef.current;
      const btn = itemBtnRefs.current[targetId];
      if (!shell || !btn) {
        setArcArrow({ leftPx: 0, rotationDeg: 0, opacity: 0 });
        return;
      }

      const sr = shell.getBoundingClientRect();
      const br = btn.getBoundingClientRect();

      const btnCxVp = br.left + br.width / 2;
      const leftPx = btnCxVp - sr.left;
      const sw = Math.max(1, sr.width);
      const xvb = (leftPx / sw) * MOBILE_DOCK_ARC.viewBoxW;
      const { tangentDeg } = mobileDockArcPointAndTangentAtViewBoxX(xvb);

      const canonical = tangentDeg;
      const prev = prevArcArrowRotationRef.current;
      const rotationDeg =
        prev === null ? canonical : unwrapOrbitRotationDeg(prev, canonical);
      prevArcArrowRotationRef.current = rotationDeg;

      setArcArrow({
        leftPx,
        rotationDeg,
        opacity: 1,
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [visible, onDimmedBackdrop, targetId, resizeTick]);

  const showArcDecor = visible && !onDimmedBackdrop;

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
        <ul className="app-menu__mobile-dock__list">
          {MENU_LINKS.map((item, index) => {
            const isActive = targetId === item.id;
            const t = MOBILE_DOCK_ITEM_TRANSFORMS[index];
            const translateX = t?.x ?? 0;
            const translateY = t?.y ?? 0;
            const rotate = t?.rotate ?? 0;
            return (
              <li
                key={item.id}
                className="app-menu__mobile-dock__item"
                style={{
                  transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
                  transformOrigin: "center bottom",
                }}
              >
                <button
                  type="button"
                  ref={(el) => {
                    itemBtnRefs.current[item.id] = el;
                  }}
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
        {showArcDecor ? (
          <div
            className="app-menu__mobile-dock__arc-arrow"
            style={{
              opacity: arcArrow.opacity,
              transform: `translate3d(${arcArrow.leftPx}px, 0, 0) translateX(-50%) rotate(${arcArrow.rotationDeg}deg)`,
            }}
            aria-hidden
          >
            <img src={IMAGES.arrow} alt="" className="app-menu__mobile-dock__arc-arrow__img" />
          </div>
        ) : null}
        {onDimmedBackdrop ? (
          <div className="app-menu__mobile-dock__handle" aria-hidden />
        ) : null}
      </div>
    </nav>
  );
};
