import React from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import logo from './logo.png';
import styles from './Header.module.sass';

function Header () {
  const navLinkClassNames = ({ isActive }) =>
    classNames(styles.navLink, { [styles.activeLink]: isActive });

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to='/'>
          <img className={styles.logoImg} src={logo} alt='logo' />
        </Link>
        <nav className={styles.navigation}>
          <NavLink to='/' className={navLinkClassNames}>
            Home
          </NavLink>
          <NavLink to='/create-phone' className={navLinkClassNames}>
            Form
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
