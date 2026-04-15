/**
 * Один слушатель на `window` с `{ passive: true }`.
 * Возвращает функцию отписки.
 */
export function attachWindowScrollListener(
  onScroll: (event: Event) => void
): () => void {
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}
