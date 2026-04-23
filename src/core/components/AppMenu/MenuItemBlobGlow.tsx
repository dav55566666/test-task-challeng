import "./menu-highlight-layer.scss";

type MenuItemBlobGlowProps = {
  visible: boolean;
};

export function MenuItemBlobGlow({ visible }: MenuItemBlobGlowProps) {
  return (
    <div
      className={
        "menu-item-blob-glow-fade pointer-events-none absolute inset-0 z-0 overflow-visible " +
        (visible ? "menu-item-blob-glow-fade--on" : "")
      }
      aria-hidden
    >
      <div className="relative h-full min-h-full w-full min-w-0 overflow-visible">
        <div className="menu-highlight__blobs-outer">
          <div className="menu-highlight__blobs-wave">
            <div className="menu-highlight__blob-unified" />
          </div>
        </div>
      </div>
    </div>
  );
}
