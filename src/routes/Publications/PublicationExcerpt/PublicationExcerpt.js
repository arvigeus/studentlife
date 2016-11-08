// @flow

import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import cx from 'classnames';

import Picture from '../../../components/Picture';
import type { PictureType } from '../../../components/Picture/';
import s from './PublicationExcerpt.css';

type PublicationExcerptType = {
  slug: string,
  title: string,
  picture: PictureType,
  excerpt: string,
  tags: Array<string>,
  published: bool,
  createdAt: Date
};

function PublicationExcerpt({ publication }: { publication: PublicationExcerptType }) {
  const { slug, title, picture, excerpt } = publication;
  return (
    <section className={cx(s.root, 'row')}>
      <div className="col-xs-8" style={{ paddingLeft: '20px' }}>
        <Link to={`/publications/${slug}`}><h3>{title}</h3></Link>
        <p dangerouslySetInnerHTML={{ __html: excerpt }} />
      </div>
      <Picture
        type="wide"
        link={`/publications/${slug}`}
        src={picture}
        className="col-xs-4"
        rotate={`${picture.rng * 10 - 5}deg`}
        maxWidth={250}
      />
    </section>
  );
}

export default Relay.createContainer(PublicationExcerpt, {
  fragments: {
    publication: () => Relay.QL`
      fragment on Publication {
        slug,
        title,
        picture {
          original,
          rng,
          width,
          sources {
            srcSet,
            media,
            width
          }
        },
        excerpt
      }
    `
  }
});
