import {
  ABOUT_MANIFESTO_BULLETS,
  ABOUT_MANIFESTO_PARAGRAPHS,
  ABOUT_STATS,
} from "../../data";
import { IMAGES } from "../../design";
import { GradientTitle, TextTag } from "../../uikit";

export const AboutManifestoSection = () => {
  return (
    <section
      className="about-manifesto-section w-full min-w-0 max-w-none self-start"
      aria-labelledby="about-manifesto-heading"
    >
      <div className="flex w-full min-w-0 flex-col gap-4">
        {ABOUT_MANIFESTO_PARAGRAPHS.map((lines, i) => (
          <p
            key={i}
            className="m-0 flex flex-col gap-0 text-start"
          >
            {lines.map((line, j) => (
              <span
                key={j}
                className="block min-w-0"
                style={{
                  maxWidth: `min(100%, ${line.maxRem}rem)`,
                }}
              >
                <GradientTitle
                  value={line.text}
                  currentSize={30}
                  mobileSize={24}
                  tag={TextTag.H3}
                />
              </span>
            ))}
          </p>
        ))}
      </div>

      <ul className="m-0 mt-8 flex w-full min-w-0 max-w-150 list-none flex-col gap-4 p-0 md:mt-10">
        {ABOUT_MANIFESTO_BULLETS.map((item) => (
          <li
            key={item}
            className="flex gap-3 font-light leading-normal text-[#666666] text-lg md:leading-relaxed"
          >
            <span className="mt-2.5 shrink-0" aria-hidden>
              <img
                src={IMAGES.arrowRight}
                alt=""
                width={14}
                height={14}
                className="block opacity-60"
              />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <dl className="m-0 mt-14 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-18 md:gap-x-10 md:gap-y-10">
        {ABOUT_STATS.map((stat) => (
          <div key={`${stat.value}-${stat.label}`} className="min-w-0">
              <GradientTitle
                value={stat.value}
                currentSize={36}
                mobileSize={30}
                tag={TextTag.H3}
              />
            <dd className="m-0 mt-3 font-light leading-tight text-[#33333366] text-sm md:text-[15px]">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
