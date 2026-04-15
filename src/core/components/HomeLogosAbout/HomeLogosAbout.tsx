import { Link } from "react-router-dom";

import { IMAGES } from "../../design";
import "./styles/home-logos-about.scss";

const LOGO_PLACEHOLDER_COUNT = 24;

const STATS: { value: string; label: string; underline?: boolean }[] = [
  {
    value: "230+",
    label: "международных и российских брендов",
  },
  {
    value: "7+ лет",
    label: "на рынке",
  },
  {
    value: "900+",
    label: "реализованных стратегий и активаций",
    underline: true,
  },
  {
    value: "23+",
    label: "российских и международных наград у команды",
  },
  {
    value: "16+",
    label: "членов интегрированной команды",
  },
  {
    value: "50+",
    label: "успешных запусков и кампаний",
  },
];

export const HomeLogosAbout = () => {
  return (
    <section className="home-logos-about" aria-labelledby="home-logos-about-heading">
      <div className="home-logos-about__cloud">
        <div className="home-logos-about__grid" aria-hidden>
          {Array.from({ length: LOGO_PLACEHOLDER_COUNT }).map((_, i) => (
            <div key={i} className="home-logos-about__logo-cell" />
          ))}
        </div>
        <div className="home-logos-about__plus">230+</div>
      </div>

      <div className="home-logos-about__about">
        <div>
          <h2 id="home-logos-about-heading" className="home-logos-about__title">
            О нас
          </h2>
          <Link to="/about" className="home-logos-about__more">
            О нас
            <img src={IMAGES.arrowRightTop} alt="" aria-hidden />
          </Link>
        </div>

        <div className="home-logos-about__stats">
          {STATS.map((stat) => (
            <div key={stat.value + stat.label}>
              <p
                className={
                  "home-logos-about__stat-value" +
                  (stat.underline ? " home-logos-about__stat-value--underline" : "")
                }
              >
                {stat.value}
              </p>
              <p className="home-logos-about__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
