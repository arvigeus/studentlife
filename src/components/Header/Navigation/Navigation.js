// @flow

import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import s from './Navigation.css';

export default function Navigation() {
  return (
    <nav className={s.root} role="navigation">
      <Link to="/" className={cx({ active: false })}>
        <span>За нас</span>
      </Link>
      {/* <Link to="/events" className={cx({ active: false })}>
        <span>Събития</span>
      </Link>
      <Link to="/organizer" className={cx({ active: false })}>
        <span>Органайзер</span>
      </Link> */}
      <Link to="/publications" className={cx({ active: false })}>
        <span>Публикации</span>
      </Link>
      {/* <Link to="/spiritual" className={cx({ active: false })}>
        <span>Духовно</span>
      </Link> */}
      <a className={s.dummy}><span>&nbsp;</span></a>
    </nav>
  );
}
