import { ETheme } from "../../common"
import { Button, CustomLink, EBgType, ELogoDirection, Logo } from "../../uikit"

const Header = () => {
  return (
    <header className="header">
        <div className="header__container container">
            <div className="header__left">
                <Logo direction={ELogoDirection.IN_HEADER} />
                <ul>
                    <li><CustomLink href='/' theme={ETheme.DARK} value='Discover' /></li>
                    <li><CustomLink href='/' theme={ETheme.DARK} value='creators' /></li>
                    <li><CustomLink href='/' theme={ETheme.DARK} value='Sell' /></li>
                    <li><CustomLink href='/' theme={ETheme.DARK} value='stats' /></li>
                </ul>
            </div>
            <Button theme={ETheme.DARK} bgType={EBgType.FILL} value='Connect Wallet' />
        </div>
    </header>
  )
}

export default Header