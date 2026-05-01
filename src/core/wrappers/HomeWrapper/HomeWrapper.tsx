import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppMenu, Header } from "../../components";
import "./styles/style.scss";

/** Matches Tailwind `md:` — narrow viewports use autonomous glow instead of cursor tracking. */
const MOBILE_MAX_WIDTH_MEDIA = "(max-width: 767px)";
/** Touch-primary devices (phones, tablets): glow wanders the viewport instead of following input. */
const COARSE_POINTER_MEDIA = "(pointer: coarse)";

function shouldSuppressCursorGlow(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      ".app-menu__desktop-item-hit, .app-menu__desktop-item-btn, .app-menu__mobile-dock__btn"
    )
  );
}

export const HomeWrapper = () => {
  const [isMobileViewport, setIsMobileViewport] = useState(true);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useLayoutEffect(() => {
    const mqNarrow = window.matchMedia(MOBILE_MAX_WIDTH_MEDIA);
    const mqCoarse = window.matchMedia(COARSE_POINTER_MEDIA);
    const sync = () => {
      setIsMobileViewport(mqNarrow.matches);
      setIsCoarsePointer(mqCoarse.matches);
    };
    sync();
    mqNarrow.addEventListener("change", sync);
    mqCoarse.addEventListener("change", sync);
    return () => {
      mqNarrow.removeEventListener("change", sync);
      mqCoarse.removeEventListener("change", sync);
    };
  }, []);

  const useWanderingGlow = isMobileViewport || isCoarsePointer;

  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [suppressCursorGlow, setSuppressCursorGlow] = useState(false);

  useEffect(() => {
    if (useWanderingGlow) return;

    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
      setSuppressCursorGlow(shouldSuppressCursorGlow(event.target));
    };

    const handleMouseLeave = () => {
      setCursorPosition(null);
      setSuppressCursorGlow(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [useWanderingGlow]);

  return (
    <div className="app-shell flex min-h-svh w-full flex-1 flex-col">
      <div
        aria-hidden
        className={`app-shell__cursor-glow ${useWanderingGlow ? "app-shell__cursor-glow--wander" : ""} ${
          useWanderingGlow || cursorPosition ? "app-shell__cursor-glow--visible" : ""
        } ${suppressCursorGlow ? "app-shell__cursor-glow--hidden-on-menu" : ""}`}
        style={
          !useWanderingGlow && cursorPosition
            ? {
                transform: `translate3d(${cursorPosition.x - 12}px, ${cursorPosition.y - 12}px, 0)`,
              }
            : undefined
        }
      />
      <Header />
      <AppMenu />
      <Outlet />
    </div>
  );
};
