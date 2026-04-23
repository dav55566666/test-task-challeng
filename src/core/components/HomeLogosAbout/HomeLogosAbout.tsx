import { Link } from "react-router-dom";

import { IMAGES } from "../../design";
import "./styles/home-logos-about.scss";
import { GradientTitle, TextTag } from "../../uikit";


const STATS: { value: string; label: string; underline?: boolean }[] = [
  {
    value: "130+",
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
      <div className="home-logos-about__about">
        <div className="home-logos-about__title">
          <h2 id="home-logos-about-heading">
            Мы
          </h2>
          <Link to="/about" className="home-logos-about__more">
            Команда
            <img src={IMAGES.arrowRightTop} alt="" aria-hidden />
          </Link>
        </div>

        <div className="home-logos-about__stats">
          {STATS.map((stat) => (
            <div key={stat.value + stat.label}>
              <GradientTitle
                value={stat.value}
                currentSize={36}
                mobileSize={30}
                tag={TextTag.H3}
              />
              <p className="home-logos-about__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
