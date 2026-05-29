import { useContext, useLayoutEffect, useRef, useState } from "react";
import { GradientShineContext } from "../providers/gradient-shine-context";

export const useGradientShineRegistration = (animated: boolean) => {
  const context = useContext(GradientShineContext);
  const rootRef = useRef<HTMLElement | null>(null);
  const [isShineActive, setIsShineActive] = useState(false);

  useLayoutEffect(() => {
    if (!animated || !context) {
      setIsShineActive(false);
      return;
    }

    const el = rootRef.current;
    if (!el) return;

    return context.register(el, setIsShineActive);
  }, [animated, context]);

  return { rootRef, isShineActive, hasProvider: context != null };
};
