import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Icon } from "../../design/Icon";
import {
  MENU_LINKS,
  MOBILE_DOCK_ITEM_TRANSFORMS,
  MOBILE_ORBIT_Y_BIAS_PX_BY_ID,
} from "./constants";
import { MenuArcArrowOrbit } from "./MenuArcArrowOrbit";
import {
  getArcCircle,
  orbitRotationDegFromArcParam,
  thetaFromViewportY,
  unwrapOrbitRotationDeg,
} from "./menuArcArrow";

const ARC_ICON_PX = 18;

type MenuLink = (typeof MENU_LINKS)[number];

type OrbitLayout = {
  leftPx: number;
  topPx: number;
  diameterPx: number;
  rotationDeg: number;
};

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
  const arcGeomRef = useRef<HTMLDivElement>(null);
  const itemBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const prevOrbitRotationDisplayRef = useRef<number | null>(null);
  const [resizeTick, setResizeTick] = useState(0);
  const [orbitLayout, setOrbitLayout] = useState<OrbitLayout | null>(null);
  const [pillStyle, setPillStyle] = useState<{
    left: string;
    opacity: number;
  }>({ left: "50%", opacity: 0 });

  useEffect(() => {
    const onResize = () => setResizeTick((n) => n + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLayoutEffect(() => {
    if (!visible || onDimmedBackdrop) {
      prevOrbitRotationDisplayRef.current = null;
      setOrbitLayout(null);
      setPillStyle({ left: "50%", opacity: 0 });
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const shell = shellRef.current;
      const arc = arcGeomRef.current;
      const btn = itemBtnRefs.current[targetId];
      if (!shell || !arc || !btn) {
        setOrbitLayout(null);
        return;
      }

      const ac = getArcCircle(arc.getBoundingClientRect());
      if (!ac) {
        setOrbitLayout(null);
        return;
      }

      const sr = shell.getBoundingClientRect();
      const anchor =
        btn.querySelector<HTMLElement>("[data-app-menu-mobile-arrow-anchor]");
      const anchorRect = anchor?.getBoundingClientRect();
      const biasPx =
        MOBILE_ORBIT_Y_BIAS_PX_BY_ID[
          targetId as keyof typeof MOBILE_ORBIT_Y_BIAS_PX_BY_ID
        ] ?? 0;
      let t: number;
      if (anchorRect) {
        const ay = anchorRect.top + anchorRect.height / 2 + biasPx;
        t = thetaFromViewportY(ay, ac);
      } else {
        const br = btn.getBoundingClientRect();
        const yMid = br.top + br.height / 2 + biasPx;
        t = thetaFromViewportY(yMid, ac);
      }
      const canonical = orbitRotationDegFromArcParam(t);
      const prev = prevOrbitRotationDisplayRef.current;
      const rotationDeg =
        prev === null
          ? canonical
          : unwrapOrbitRotationDeg(prev, canonical);
      prevOrbitRotationDisplayRef.current = rotationDeg;

      setOrbitLayout({
        leftPx: ac.cx - ac.R - sr.left,
        topPx: ac.cy - ac.R - sr.top,
        diameterPx: 2 * ac.R,
        rotationDeg,
      });

      const br = btn.getBoundingClientRect();
      const cx = br.left + br.width / 2 - sr.left;
      setPillStyle({
        left: `${cx}px`,
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
        {showArcDecor ? (
          <div
            ref={arcGeomRef}
            className="app-menu__mobile-dock__arc-geom"
            aria-hidden
          />
        ) : null}
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
                  <span
                    data-app-menu-mobile-arrow-anchor=""
                    className="pointer-events-none absolute left-1/2 bottom-0.5 h-px w-px -translate-x-1/2"
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ul>
        {showArcDecor ? (
          <svg
            className="app-menu__mobile-dock__arc-line"
            viewBox="0 0 400 72"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M 12 52 C 100 8, 300 8, 388 52"
              fill="none"
              stroke="rgba(120, 92, 196, 0.38)"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
        ) : null}
        {showArcDecor && orbitLayout ? (
          <MenuArcArrowOrbit
            leftPx={orbitLayout.leftPx}
            topPx={orbitLayout.topPx}
            diameterPx={orbitLayout.diameterPx}
            rotationDeg={orbitLayout.rotationDeg}
          />
        ) : null}
        {showArcDecor ? (
          <div
            className="app-menu__mobile-dock__arc-pill"
            style={{
              left: pillStyle.left,
              opacity: pillStyle.opacity,
            }}
            aria-hidden
          />
        ) : null}
        {onDimmedBackdrop ? (
          <div className="app-menu__mobile-dock__handle" aria-hidden />
        ) : null}
      </div>
    </nav>
  );
};
