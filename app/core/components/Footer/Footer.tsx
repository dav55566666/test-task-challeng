import { ETheme } from "../../common"
import { FacebookIcon, InstaIcon, LinkedinIcon, TwitterIcon } from "../../svgs"
import { CustomLink, ELogoDirection, Logo } from "../../uikit"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__top">
          <div className="footer__logo">
            <Logo direction={ELogoDirection.IN_FOOTER} />
          </div>
          <ul>
            <li><CustomLink href={'/'} theme={ETheme.LIGHT} value="Privacy Policy" /></li>
            <li><CustomLink href={'/'} theme={ETheme.LIGHT} value="Term & Conditions" /></li>
            <li><CustomLink href={'/'} theme={ETheme.LIGHT} value="About Us" /></li>
            <li><CustomLink href={'/'} theme={ETheme.LIGHT} value="Contact" /></li>
          </ul>
        </div>
        <div className="footer__bottom">
          <span>© 2023</span>
          <ul>
            <li><a href="#"><InstaIcon /></a></li>
            <li><a href="#"><LinkedinIcon /></a></li>
            <li><a href="#"><FacebookIcon /></a></li>
            <li><a href="#"><TwitterIcon /></a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer