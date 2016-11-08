import React from 'react';
import { Link } from 'react-router';
import s from './Branding.css';
import logo from './logo.svg';
import logoAlt from './logo.png';

export default () => (
  <Link to="/" className={s.root} title="Студентски Живот">
    <picture className={s.logo}>
      <source srcSet={logo} type="image/svg+xml" />
      <img src={logoAlt} alt="&#x1f4a1;" />
    </picture>
    <div className={s.title}>Студентски<br />Живот</div>
    <div className={s.slogan}>Да надскочим себе си заедно!</div>
  </Link>
);
