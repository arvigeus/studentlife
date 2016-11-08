import React from 'react';
import Layout from '../../components/Layout/DefaultLayout';

const page = {
  title: 'За нас',
  cover: {
    original: '/images/covers/events.jpg'
  }
};

export default () =>
  <Layout {...page}>
    <article>
      <h1>Страницата е в процес на разработка</h1>
    </article>
  </Layout>;
