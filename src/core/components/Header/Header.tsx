import { Icon, IconsName } from '../../design/Icon';
import './styles/header.scss';

export const Header = () => {
  return (
    <header className="header">
        <div className="header__container container">
            <Icon name={IconsName.LOGO_ICON} />
        </div>
    </header>
  )
}
