// @flow

import React from 'react';
import Picture from '../../components/Picture';
import original from './covers/register.jpg';
import lg from './covers/register-lg.jpg';
import md from './covers/register-md.jpg';
import sm from './covers/register-sm.jpg';
import xs from './covers/register-xs.jpg';

export default () =>
  <Picture
    title="Присъединете се към нас!"
    rotate="-2deg"
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
  />;
