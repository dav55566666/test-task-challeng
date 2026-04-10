import type { CSSProperties } from "react";

import { MENU_BLOB_FILTER_ID } from "./MenuBlobFilterDefs";
import "./menu-highlight-layer.scss";

type MenuItemBlobGlowProps = {
  visible: boolean;
};

export function MenuItemBlobGlow({ visible }: MenuItemBlobGlowProps) {
  return (
    <div
      className="menu-item-blob-glow-fade pointer-events-none absolute inset-0 z-0 overflow-visible transition-opacity duration-[800ms] ease-in-out"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      <div className="relative h-full min-h-full w-full min-w-0 overflow-visible">
        <div className="menu-highlight__blobs-outer">
          <div
            className="menu-highlight__blobs-wave"
            style={
              {
                filter: `url(#${MENU_BLOB_FILTER_ID})`,
              } as CSSProperties
            }
          >
            <div className="menu-highlight__blob-unified" />
          </div>
        </div>
      </div>
    </div>
  );
}
