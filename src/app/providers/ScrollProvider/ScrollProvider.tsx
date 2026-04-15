import { useCallback, useEffect, useMemo } from "react";

import { attachWindowScrollListener, createScrollListenersRegistry } from "./helpers";
import type { IScrollProviderProps, WindowScrollListener } from "./interfaces";
import { ScrollContext } from "./scroll-context";

export function ScrollProvider({ children }: IScrollProviderProps) {
  const registry = useMemo(() => createScrollListenersRegistry(), []);

  useEffect(() => {
    return attachWindowScrollListener((event) => {
      registry.notify(event);
    });
  }, [registry]);

  const subscribe = useCallback(
    (listener: WindowScrollListener) => registry.subscribe(listener),
    [registry]
  );

  const value = useMemo(() => ({ subscribe }), [subscribe]);

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}
