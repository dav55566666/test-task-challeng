import { Link } from "react-router-dom";

import { IMAGES } from "../../design";
import { TextTag, GradientTitle } from "../../uikit";
import { PARTNER_LOGO_SRCS } from "./partnerLogos";
import "./styles/partner.scss";

export const Partners = () => {
  return (
    <section className="partners" aria-labelledby="partners-heading">
      <div className="partners__content">
        <div className="partners__title">
          <GradientTitle
            id="partners-heading"
            value="Нам доверяют"
            currentSize={36}
            mobileSize={30}
            tag={TextTag.H2}
          />
          <Link to="/about" className="partners__more">
            Все кейсы
            <img src={IMAGES.arrowRightTop} alt="" aria-hidden />
          </Link>
        </div>

        <div
          className="partners__stats"
          role="list"
          aria-label="Логотипы партнёров"
        >
          {PARTNER_LOGO_SRCS.map((src, index) => (
            <div key={`${src}-${index}`} className="partners__logo-cell" role="listitem">
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
          <div className="partners__logo-cell partners__logo-cell--count" role="listitem">
            <span className="partners__count" aria-label="более 130 брендов">
              130+
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
