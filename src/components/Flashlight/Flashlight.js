import React from 'react';
import s from './Flashlight.css';

export default function() {
  return (
    <form method="get" action="/search" className={s.root}>
      <input type="submit" value="Търси" className={s.handle} />
      <div className={s.head} />
      <input type="search" name="search" className={s.search} placeholder="Бъди любопитен" />
    </form>
  );
}
