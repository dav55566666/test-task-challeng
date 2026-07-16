import { Link } from "react-router-dom";

import { IMAGES } from "../../design";
import { TextTag, GradientTitle } from "../../uikit";
import { ProjectMedia } from "../ProjectMedia";
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
            <ProjectMedia
              src={IMAGES.arrowRightTop}
              alt=""
              width={16}
              height={16}
              loading="lazy"
            />
          </Link>
        </div>

        <div
          className="partners__stats"
          role="list"
          aria-label="Логотипы партнёров"
        >
          {PARTNER_LOGO_SRCS.map((src, index) => (
            <div key={`${src}-${index}`} className="partners__logo-cell" role="listitem">
              <ProjectMedia
                src={src}
                alt=""
                loading={index < 6 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            </div>
          ))}
          <div className="partners__logo-cell partners__logo-cell--count" role="listitem">
            <GradientTitle
              value="+"
              currentSize={36}
              mobileSize={30}
              tag={TextTag.H3}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
