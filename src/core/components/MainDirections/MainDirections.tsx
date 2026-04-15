import { Link } from "react-router-dom";

import { IMAGES } from "../../design";
import { useMainDirectionsStore } from "../../../store";
import "./styles/main-directions.scss";

const HEADLINE =
  "Мы помогаем брендам проявлять себя наиболее вдохновляюще. Обладать их причудами, их культурой. Помогаем им быть уверенными в себе и привлекательными";

export const MainDirections = () => {
  const items = useMainDirectionsStore((s) => s.items);

  return (
    <section className="main-directions" aria-labelledby="main-directions-heading">
      <p className="main-directions__eyebrow">Главные направления</p>
      <h2 id="main-directions-heading" className="main-directions__headline">
        {HEADLINE}
      </h2>
      <ul className="main-directions__list">
        {items.map((item) => (
          <li key={item.id} className="main-directions__item">
            <Link
              to={`/directions/${item.slug}`}
              className="main-directions__link"
            >
              <span className="main-directions__icon-wrap" aria-hidden>
                <img
                  className="main-directions__arrow"
                  src={IMAGES.arrow}
                  alt=""
                />
              </span>
              <span className="main-directions__title">{item.title}</span>
              <p className="main-directions__desc">{item.listDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
