import type { CSSProperties } from 'react';
import { useId } from 'react';
import { IMAGES } from '../../design';
import { LOGO_INNER_HOLE } from './logoShape';
import './styles/logo.scss';

export const Logo = () => {
  const uid = useId().replace(/:/g, '');
  const filterId = `logo-mask-wave-${uid}`;
  const innerMaskId = `logo-mask-inner-${uid}`;
  const innerHoleSoftFilterId = `logo-inner-hole-soft-${uid}`;

  const { cx, cy, r } = LOGO_INNER_HOLE;

  return (
    <div className="logo-animation">
      <div className="logo-animation__mask">
        <svg className="logo-animation__svg-filters" aria-hidden focusable="false">
          <defs>
            {/* Мягкий край «дырки» в маске — без резкого излома у внутреннего контура */}
            <filter
              id={innerHoleSoftFilterId}
              filterUnits="objectBoundingBox"
              primitiveUnits="objectBoundingBox"
              x="-0.2"
              y="-0.2"
              width="1.4"
              height="1.4"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.007" />
            </filter>
            <mask
              id={innerMaskId}
              maskUnits="objectBoundingBox"
              maskContentUnits="objectBoundingBox"
            >
              <rect width="1" height="1" fill="white" />
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="black"
                filter={`url(#${innerHoleSoftFilterId})`}
              />
            </mask>
            <filter
              id={filterId}
              x="-120%"
              y="-120%"
              width="340%"
              height="340%"
              colorInterpolationFilters="sRGB"
            >
              {/* Ниже частота + сильнее blur шума = плавнее поле, меньше «острых углов» на изгибах */}
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.0045 0.007"
                numOctaves="1"
                seed="7"
                result="noise"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="22s"
                  values="0.0045 0.007;0.009 0.0045;0.0035 0.009;0.007 0.006;0.0045 0.007"
                  keyTimes="0;0.25;0.5;0.75;1"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feGaussianBlur in="noise" stdDeviation="5.2" result="noiseSmooth" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noiseSmooth"
                scale="18"
                xChannelSelector="R"
                yChannelSelector="G"
                result="dist"
              >
                {/* Чуть крупнее волна по периметру */}
                <animate
                  attributeName="scale"
                  dur="11s"
                  values="18;46;22;40;18"
                  keyTimes="0;0.26;0.5;0.76;1"
                  repeatCount="indefinite"
                />
              </feDisplacementMap>
            </filter>
          </defs>
        </svg>
        <img
          className="logo-animation__mask-img logo-animation__mask-img--stable"
          src={IMAGES.logoMaskGradient}
          alt=""
        />
        <img
          className="logo-animation__mask-img logo-animation__mask-img--wave"
          src={IMAGES.logoMaskGradient}
          alt=""
          style={
            {
              filter: `url(#${filterId})`,
              mask: `url(#${innerMaskId})`,
              WebkitMask: `url(#${innerMaskId})`,
            } as CSSProperties
          }
        />
      </div>
      <div className="logo-animation__video">
        <video src={IMAGES.logoVideo} autoPlay muted loop playsInline />
      </div>
    </div>
  );
};
