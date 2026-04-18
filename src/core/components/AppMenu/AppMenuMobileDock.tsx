import { Icon } from "../../design/Icon";
import { MENU_LINKS, MOBILE_ARC_ROTATIONS_DEG } from "./constants";

const ARC_ICON_PX = 20;

type MenuLink = (typeof MENU_LINKS)[number];

type AppMenuMobileDockProps = {
  visible: boolean;
  targetId: string;
  onItemActivate: (item: MenuLink) => void;
  /** FAB + затемнённый фон — неактивные пункты светлые. */
  overDarkBackdrop?: boolean;
};

export const AppMenuMobileDock = ({
  visible,
  targetId,
  onItemActivate,
  overDarkBackdrop = false,
}: AppMenuMobileDockProps) => {
  return (
    <nav
      className={
        "app-menu__mobile-dock " +
        (visible ? "app-menu__mobile-dock--visible" : "app-menu__mobile-dock--hidden") +
        (overDarkBackdrop ? " app-menu__mobile-dock--over-backdrop" : "")
      }
      aria-hidden={!visible}
      aria-label="Основная навигация"
    >
      <div className="app-menu__mobile-dock__inner">
        <div className="app-menu__mobile-dock__glow" aria-hidden />
        <ul className="app-menu__mobile-dock__list">
          {MENU_LINKS.map((item, index) => {
            const isActive = targetId === item.id;
            const rotate = MOBILE_ARC_ROTATIONS_DEG[index] ?? 0;
            return (
              <li
                key={item.id}
                className="app-menu__mobile-dock__item"
                style={{
                  transform: `rotate(${rotate}deg)`,
                  transformOrigin: "bottom center",
                }}
              >
                <button
                  type="button"
                  className={
                    "app-menu__mobile-dock__btn " +
                    (isActive ? "app-menu__mobile-dock__btn--active" : "") +
                    (overDarkBackdrop && !isActive
                      ? " app-menu__mobile-dock__btn--on-dark"
                      : "")
                  }
                  onClick={() => onItemActivate(item)}
                >
                  <span className="app-menu__mobile-dock__icon">
                    <Icon
                      name={item.icon}
                      style={{
                        width: ARC_ICON_PX,
                        height: ARC_ICON_PX,
                        ...(isActive
                          ? { color: "#ffffff", solid: true }
                          : overDarkBackdrop
                            ? { color: "rgba(255, 255, 255, 0.9)", solid: true }
                            : {}),
                      }}
                    />
                  </span>
                  <span className="app-menu__mobile-dock__label">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="app-menu__mobile-dock__handle" aria-hidden />
      </div>
    </nav>
  );
};
