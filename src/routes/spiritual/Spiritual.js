import React from 'react';
import Layout from '../../components/Layout/DefaultLayout';

const page = {
  title: 'Духовно',
  cover: {
    original: '/images/covers/spiritual.jpg'
  }
};

export default () =>
  <Layout {...page}>
    <article>
      <h1>Страницата е в процес на разработка</h1>
    </article>
  </Layout>;
