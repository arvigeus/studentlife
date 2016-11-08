// @flow

import React from 'react';
import Helmet from 'react-helmet';

import Picture from '../../components/Picture';
import original from './covers/publications.jpg';
import lg from './covers/publications-lg.jpg';
import md from './covers/publications-md.jpg';
import sm from './covers/publications-sm.jpg';
import xs from './covers/publications-xs.jpg';

export default () =>
  <div>
    <Helmet title="Публикации - Студентски Живот" />
    <Picture
      title="Публикации"
      rotate="1deg"
      type="hero"
      src={{
        original,
        width: 1920,
        sources: [{
          srcSet: lg,
          media: '(min-width: 1041px) and (max-width: 1216px)',
          width: 1261
        }, {
          srcSet: md,
          media: '(min-width: 769px) and (max-width: 1040px)',
          width: 1040
        }, {
          srcSet: sm,
          media: '(min-width: 481px) and (max-width: 768px)',
          width: 768
        }, {
          srcSet: xs,
          media: '(max-width: 480px)',
          width: 480
        }]
      }}
      maxWidth={1000}
    />
  </div>;
