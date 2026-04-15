import type { WindowScrollListener } from "./window-scroll-listener.type";

export interface IScrollContextValue {
  subscribe: (listener: WindowScrollListener) => () => void;
}
