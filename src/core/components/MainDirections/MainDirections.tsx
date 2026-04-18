import { Link } from "react-router-dom";

import { useMainDirectionsStore } from "../../../store";
import "./styles/main-directions.scss";
import { Icon, IconsName } from "../../design/Icon";

const HEADLINE =
  "Мы помогаем брендам проявлять себя наиболее вдохновляюще. Обладать их причудами, их культурой. Помогаем им быть уверенными в себе и привлекательными";

export const MainDirections = () => {
  const items = useMainDirectionsStore((s) => s.items);

  return (
    <section className="main-directions" aria-labelledby="main-directions-heading">
      <div className="main-directions__container">
        <p className="main-directions__eyebrow">Главные направления</p>
        <h2 id="main-directions-heading" className="main-directions__headline">
          {HEADLINE}
        </h2>
        <div className="main-direction__text">
          <ul className="main-directions__list">
            {items.map((item) => (
              <li key={item.id} className="main-directions__item">
                <Link
                  to={`/directions/${item.slug}`}
                  className="main-directions__link"
                >
                  <span className="main-directions__icon-wrap" aria-hidden>
                    <Icon name={IconsName.ARROW_ICON} />
                  </span>
                  <span className="main-directions__title">{item.title}</span>
                </Link>
                <p className="main-directions__desc">{item.listDescription}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
