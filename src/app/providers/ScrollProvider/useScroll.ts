import { useContext, useEffect, useRef } from "react";

import type { WindowScrollListener } from "./interfaces";
import { ScrollContext } from "./scroll-context";

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error("useScroll must be used within ScrollProvider");
  }
  return ctx;
}

/**
 * Подписка на скролл окна без своего `addEventListener`.
 * Колбэк всегда актуальный за счёт ref внутри.
 */
export function useScrollSubscribe(listener: WindowScrollListener) {
  const { subscribe } = useScroll();
  const listenerRef = useRef(listener);

  useEffect(() => {
    listenerRef.current = listener;
  });

  useEffect(() => {
    return subscribe((event) => listenerRef.current(event));
  }, [subscribe]);
}
