import {
  ABOUT_MANIFESTO_BULLETS,
  ABOUT_MANIFESTO_PARAGRAPHS,
  ABOUT_STATS,
} from "../../data";
import { IMAGES } from "../../design";

export const AboutManifestoSection = () => {
  return (
    <section
      className="about-manifesto-section w-full min-w-0 max-w-none self-start"
      aria-labelledby="about-manifesto-heading"
    >
      <div className="flex w-full min-w-0 flex-col gap-[1.35em]">
        {ABOUT_MANIFESTO_PARAGRAPHS.map((lines, i) => (
          <p
            key={i}
            className="m-0 flex flex-col gap-0 text-start leading-[1.35] tracking-[-0.02em] text-[#1a1a1a] text-2xl md:text-3xl"
          >
            {lines.map((line, j) => (
              <span
                key={j}
                className="block min-w-0"
                style={{
                  maxWidth: `min(100%, ${line.maxRem}rem)`,
                }}
              >
                {line.text}
              </span>
            ))}
          </p>
        ))}
      </div>

      <ul className="m-0 mt-10 flex w-full min-w-0 max-w-150 list-none flex-col gap-4 p-0 md:mt-12">
        {ABOUT_MANIFESTO_BULLETS.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-base font-light leading-normal text-[#666666] md:text-[15px] md:leading-relaxed"
          >
            <span className="mt-0.5 shrink-0" aria-hidden>
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
            <dt className="text-3xl font-medium leading-none tracking-tight md:text-4xl">
              {stat.value}
            </dt>
            <dd className="m-0 mt-3.5 font-light leading-tight text-[#33333366] text-sm">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
