import type { WindowScrollListener } from "../interfaces";

/**
 * Реестр подписчиков: один `notify` на всех, без дублирования `addEventListener`.
 */
export function createScrollListenersRegistry() {
  const listeners = new Set<WindowScrollListener>();

  const subscribe = (listener: WindowScrollListener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const notify = (event: Event) => {
    listeners.forEach((fn) => {
      fn(event);
    });
  };

  return { subscribe, notify };
}
