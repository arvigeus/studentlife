import React from 'react';
import s from './Footer.css';
import PostLetter from './PostLetter';

export default function Footer() {
  return (
    <footer className={s.root}>
      <PostLetter />
    </footer>
  );
}
