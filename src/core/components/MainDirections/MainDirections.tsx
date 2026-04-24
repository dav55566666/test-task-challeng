import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "animate.css";

import { useMainDirectionsStore } from "../../../store";
import "./styles/main-directions.scss";
import { Icon, IconsName } from "../../design/Icon";
import { GradientTitle, TextTag } from "../../uikit";

const HEADLINE =
  "Стратегический ум, творческий подход и ловкие руки нашей команды приводят клиентов к результатам, который долгие годы служит бенчмарком качества и креативности";

export const MainDirections = () => {
  const items = useMainDirectionsStore((s) => s.items);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const initWowForList = () => {
      if (!listRef.current) {
        return;
      }

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
        <div className="main-directions__headline">
          <GradientTitle
            id="main-directions-heading"
            value={HEADLINE}
            currentSize={36}
            mobileSize={30}
            tag={TextTag.H2}
          />
        </div>
        <div className="main-direction__text">
          <ul ref={listRef} className="main-directions__list">
            {items.map((item, index) => (
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
                <p
                  className="main-directions__desc wow"
                  data-wow-duration="0.65s"
                  data-wow-delay={`${(index * 0.12).toFixed(2)}s`}
                >
                  {item.listDescription}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
