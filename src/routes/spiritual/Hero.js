// @flow

import React from 'react';
import Picture from '../../components/Picture';
import original from './covers/spiritual.jpg';
import lg from './covers/spiritual-lg.jpg';
import md from './covers/spiritual-md.jpg';
import sm from './covers/spiritual-sm.jpg';
import xs from './covers/spiritual-xs.jpg';

export default () =>
  <Picture
    title="Духовно"
    rotation="-2deg"
    type="hero"
    src={{
      original,
      width: 960,
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
  />;
