// @flow

import React from 'react';

import Header from '../Header';
import AccessBadge from '../AccessBadge';
import Calendar from '../Calendar';
import Flashlight from '../Flashlight';
import PostIt from '../PostIt';
import Footer from '../Footer';

import s from './App.css';

type AppType = {
  hero: any,
  content: any,
  stories: any,
  joke: any,
  quote: any
}

// https://codepen.io/mi-lee/post/an-overview-of-html5-semantics

export default function App({ hero, content, stories, joke, quote }: AppType) {
  return (
    <div className={s.root}>
      {hero}
      <main>
        <Header />
        {content}
        <div className={s.sidebar}>
          {/* <AccessBadge /> */}
          <Calendar />
          <PostIt />
          {stories}
          {/* <Flashlight /> */}
          {joke}
          {quote}
        </div>
      </main>
      <div style={{ height: '50px' }} />
      {/* <Footer /> */}
    </div>
  );
}
