// @flow

import React from 'react';
import Relay from 'react-relay';
import Helmet from 'react-helmet';

import Picture from '../../components/Picture';
import type { PictureType } from '../../components/Picture';

type HeroType = {
  hero: {
    title: string,
    meta: any,
    picture: PictureType
  }
};

function Hero({ hero: { title, meta, picture } }: HeroType) {
  return (
    <div>
      <Helmet title={`${title} - Студентски Живот`} meta={meta} />
      <Picture
        title={title}
        rotate={`${picture.rng * 4 - 2}deg`}
        type="hero"
        src={picture}
        maxWidth={1000}
      />
    </div>
  );
}

export default Relay.createContainer(Hero, {
  fragments: {
    hero: () => Relay.QL`
      fragment on Publication {
        title,
        meta,
        picture {
          original,
          rng,
          width,
          sources {
            srcSet,
            media,
            width
          }
        }
      }`
  }
});
