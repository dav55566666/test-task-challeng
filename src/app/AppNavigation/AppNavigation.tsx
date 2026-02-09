import { NavLink } from 'react-router-dom';
import styles from './styles/style.module.scss';

const links = [
  { to: '/', label: 'Список заявок' },
  { to: '/create', label: 'Создать заявку' },
  { to: '/status', label: 'Статус заявки' },
];

export function AppNavigation() {
  return (
    <nav className={styles.nav}>
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => (isActive ? `${styles.link} ${styles.link_active}` : styles.link)}
          end={to === '/'}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
