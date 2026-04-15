import { Link } from "react-router-dom";

import "./styles/site-footer.scss";

const YEAR = new Date().getFullYear();

export const SiteFooter = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link className="site-footer__link" to="/#cookie-policy">
          Политика использования «cookie»
        </Link>
        <Link className="site-footer__link" to="/#privacy-policy">
          Политика обработки персональных данных
        </Link>
        <p className="site-footer__copy">Fabula © {YEAR}</p>
      </div>
    </footer>
  );
};
