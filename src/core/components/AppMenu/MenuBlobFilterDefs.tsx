/** Один общий id — все пункты ссылаются на этот фильтр (без дублирования defs). */
export const MENU_BLOB_FILTER_ID = "fabula-menu-blob-wave";

export function MenuBlobFilterDefs() {
  return (
    <svg className="menu-highlight__filter-svg" aria-hidden focusable="false">
      <defs>
        <filter
          id={MENU_BLOB_FILTER_ID}
          x="-65%"
          y="-65%"
          width="230%"
          height="230%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.014 0.02"
            numOctaves="1"
            seed="11"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="18s"
              values="0.014 0.02;0.022 0.012;0.01 0.024;0.018 0.016;0.014 0.02"
              keyTimes="0;0.25;0.5;0.75;1"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feGaussianBlur in="noise" stdDeviation="2.8" result="noiseSmooth" />
          <feOffset in="noiseSmooth" dx="0" dy="0" result="noiseShift">
            <animate
              attributeName="dx"
              dur="12s"
              values="0;32;0;-32;0"
              keyTimes="0;0.25;0.5;0.75;1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="dy"
              dur="12s"
              values="-26;0;26;0;-26"
              keyTimes="0;0.25;0.5;0.75;1"
              repeatCount="indefinite"
            />
          </feOffset>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noiseShift"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
            result="dist"
          >
            <animate
              attributeName="scale"
              dur="10.5s"
              values="12;26;16;30;18;24;12"
              keyTimes="0;0.17;0.33;0.5;0.67;0.83;1"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
  );
}
