import React from 'react';
import s from './Header.css';
import Branding from './Branding';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header className={s.root}>
      <Branding />
      <Navigation />
    </header>
  );
}
