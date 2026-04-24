import { forwardRef } from "react";

import { Icon, type IconsName } from "../../design/Icon";
import { MenuItemBlobGlow } from "./MenuItemBlobGlow";

type MenuItemProps = {
  itemId: string;
  label: string;
  icon: IconsName;
  /** Класс active, pill, белая иконка/текст — появляется после анимации градиента. */
  isTarget: boolean;
  /** Маршрут+блоб (градиент): виден сразу при открытии, снимается вместе со strip перед закрытием. */
  glowTarget: boolean;
  /** 0 = верх (Услуги) … 4 = низ (Контакты), для ступенчатых анимаций десктоп-меню. */
  orderIndex: number;
  translateXRem: number;
  rotateDeg: number;
  /** Открыто из FAB поверх тёмного backdrop — неактивные пункты светлые. */
  overDarkBackdrop?: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
};

const MENU_ICON_PX = 16;

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      itemId,
      label,
      icon,
      isTarget,
      glowTarget,
      orderIndex,
      translateXRem,
      rotateDeg,
      onClick,
      onMouseEnter,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={
          "app-menu__desktop-item app-menu__desktop-item--i" +
          String(orderIndex) +
          (glowTarget ? " app-menu__desktop-item--glow" : "") +
          (isTarget ? " app-menu__desktop-item--active" : "") +
          " relative z-10 overflow-visible transition-transform duration-[600ms] ease-out"
        }
        style={{
          transform: `translateX(${translateXRem}rem) rotate(${rotateDeg}deg)`,
          transformOrigin: "right center",
        }}
      >
        <MenuItemBlobGlow visible={glowTarget} />
        <div
          className="app-menu__desktop-item-hit"
          onMouseEnter={onMouseEnter}
          onClick={(e) => {
            if (e.currentTarget === e.target) onClick();
          }}
        >
          <button
            type="button"
            onClick={onClick}
            className={
              "app-menu__desktop-item-btn relative z-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
              (isTarget
                ? "overflow-hidden border border-transparent bg-transparent text-white"
                : "border border-transparent text-[#333333]/30")
            }
          >
            {isTarget ? (
              <span
                className="app-menu__item-target-surface pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full border border-white/45 bg-[linear-gradient(90deg,rgba(224,195,252,0.38)_0%,rgba(186,230,253,0.48)_100%)] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                aria-hidden
              />
            ) : null}
            <span
              className={
                "app-menu__desktop-item-icon relative z-10 flex h-4 w-4 shrink-0 items-center justify-center [&_svg]:block" +
                (itemId === "services" ? " app-menu__desktop-item-icon--services" : "") +
                (itemId === "contacts" ? " app-menu__desktop-item-icon--contacts" : "")
              }
            >
              <Icon
                name={icon}
                style={{
                  width: MENU_ICON_PX,
                  height: MENU_ICON_PX,
                  ...(isTarget
                    ? { color: "#ffffff", solid: true }
                    : {}),
                }}
              />
            </span>
            <span className="relative z-10">{label}</span>
          </button>
        </div>
      </div>
    );
  }
);

MenuItem.displayName = "MenuItem";
