import { Icon } from "../../design/Icon";
import { MENU_LINKS, MOBILE_DOCK_ITEM_TRANSFORMS } from "./constants";

const ARC_ICON_PX = 20;

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
  return (
    <nav
      className={
        "app-menu__mobile-dock " +
        (visible ? "app-menu__mobile-dock--visible" : "app-menu__mobile-dock--hidden")
      }
      aria-hidden={!visible}
      aria-label="Основная навигация"
    >
      <div className="app-menu__mobile-dock__inner">
        <div className="app-menu__mobile-dock__glow" aria-hidden />
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
                  className={
                    "app-menu__mobile-dock__btn " +
                    (isActive ? "app-menu__mobile-dock__btn--active" : "") +
                    (onDimmedBackdrop && !isActive
                      ? " app-menu__mobile-dock__btn--on-dark"
                      : "")
                  }
                  onClick={() => onItemActivate(item)}
                >
                  <span className={`app-menu__mobile-dock__icon app-menu__mobile-dock__icon--${item.id}`}>
                    <Icon
                      name={item.icon}
                      style={{
                        width: ARC_ICON_PX,
                        height: ARC_ICON_PX,
                        ...(isActive
                          ? { color: "#ffffff", solid: true }
                          : onDimmedBackdrop
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
