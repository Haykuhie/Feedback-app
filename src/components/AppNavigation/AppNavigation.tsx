import styles from './AppNavigation.module.css';
import {NAV_PAGES} from '../../utils/constants'
import { NavLink } from 'react-router-dom';

const AppNavigation: React.FC = () => {
  return (
    <div className={styles.navBar}>
      {NAV_PAGES.map((navPage) => {
        return (
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.activeNavLink : styles.notActiveNavLink
            }
            to={navPage.to}
            key={navPage.to}
          >
            {navPage.content}
          </NavLink>
        );
      })}
    </div>
  );
};
export default AppNavigation;
