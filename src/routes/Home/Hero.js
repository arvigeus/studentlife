// @flow

import React from 'react';
import Helmet from 'react-helmet';

import Picture from '../../components/Picture';
import original from './covers/home.jpg';
import sm from './covers/home-sm.jpg';
import xs from './covers/home-xs.jpg';

export default () =>
  <div>
    <Helmet title="Добре дошли! - Студентски Живот" />
    <Picture
      title="Добре дошли!"
      rotate="-2deg"
      type="hero"
      src={{
        original,
        width: 960,
        sources: [{
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
