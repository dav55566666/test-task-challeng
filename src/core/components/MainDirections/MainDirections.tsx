import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "animate.css";

import { useMainDirectionsStore } from "../../../store";
import "./styles/main-directions.scss";
import { Icon, IconsName } from "../../design/Icon";

const HEADLINE =
  "Мы помогаем брендам проявлять себя наиболее вдохновляюще. Обладать их причудами, их культурой. Помогаем им быть уверенными в себе и привлекательными";

export const MainDirections = () => {
  const items = useMainDirectionsStore((s) => s.items);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const initWowForList = () => {
      const listElement = listRef.current;
      if (!listElement) {
        return;
      }

      const listItems = Array.from(
        listElement.querySelectorAll<HTMLLIElement>(".main-directions__item"),
      );
      const indexes = listItems.map((_, index) => index);

      for (let i = indexes.length - 1; i > 0; i -= 1) {
        const randomValue = crypto.getRandomValues(new Uint32Array(1))[0];
        const randomIndex = randomValue % (i + 1);
        [indexes[i], indexes[randomIndex]] = [indexes[randomIndex], indexes[i]];
      }

      const randomOrder = indexes.reduce<number[]>((acc, itemIndex, order) => {
        acc[itemIndex] = order;
        return acc;
      }, []);

      listItems.forEach((listItem, index) => {
        listItem.setAttribute(
          "data-wow-delay",
          `${(randomOrder[index] * 0.14).toFixed(2)}s`,
        );
      });

      const wow = new window.WOW({
        boxClass: "wow",
        animateClass: "main-directions-wow-animated",
        offset: 60,
        mobile: true,
        live: false,
      });

      wow.init();
      wow.sync();
    };

    if (window.WOW) {
      initWowForList();
      return;
    }

    const wowScriptId = "wowjs-cdn-script";
    const existingScript = document.getElementById(wowScriptId);

    if (existingScript) {
      existingScript.addEventListener("load", initWowForList);
      return () => {
        existingScript.removeEventListener("load", initWowForList);
      };
    }

    const script = document.createElement("script");
    script.id = wowScriptId;
    script.src =
      "https://cdn.jsdelivr.net/npm/wowjs@1.1.3/dist/wow.min.js";
    script.async = true;
    script.addEventListener("load", initWowForList);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", initWowForList);
    };
  }, [items.length]);

  return (
    <section className="main-directions" aria-labelledby="main-directions-heading">
      <div className="main-directions__container">
        <p className="main-directions__eyebrow">Главные направления</p>
        <h2 id="main-directions-heading" className="main-directions__headline">
          {HEADLINE}
        </h2>
        <div className="main-direction__text">
          <ul ref={listRef} className="main-directions__list">
            {items.map((item) => (
              <li
                key={item.id}
                className="main-directions__item wow"
                data-wow-duration="0.7s"
              >
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
