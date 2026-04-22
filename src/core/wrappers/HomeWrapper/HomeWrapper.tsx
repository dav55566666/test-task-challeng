import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppMenu, Header } from "../../components";
import "./styles/style.scss";

export const HomeWrapper = () => {
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
      setCursorPosition(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <div className="app-shell flex min-h-svh w-full flex-1 flex-col">
      <div
        aria-hidden
        className={`app-shell__cursor-glow ${cursorPosition ? "app-shell__cursor-glow--visible" : ""}`}
        style={
          cursorPosition
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
