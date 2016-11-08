// @flow

import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

import type { PictureType } from './';
import s from './Picture.css';

type PicturePropsType = {
  className?: string,
  title?: string,
  link?: string,
  type: 'hero' | 'wide' | 'portrait' | 'square',
  rotate?: string,
  src: PictureType,
  maxWidth?: number
}

function Picture({
  className,
  title,
  link,
  type,
  rotate,
  src,
  maxWidth,
  ...props
}: PicturePropsType) {
  let index = 0;
  const images = [];

  let { original, width } = src;
  const { sources } = src;
  for (const source of sources) {
    if (!maxWidth || source.width < maxWidth) {
      images.push(<source key={++index} srcSet={source.srcSet} media={source.media} />);
    } else if (source.width < width) {
      original = source.srcSet;
      width = source.width;
    }
  }
  images.push(<img key={++index} src={original} alt={title} />);

  const rotattionStyle = rotate
    ? { style: { transform: `rotate(${rotate})` } }
    : null;

  return (
    <Link to={link} className={cx(className, s.root, s[type])} {...props}>
      <div className={cx(s.polarized)} title={title} {...rotattionStyle}>
        <div className={s.photo}>
          <picture>
            {images}
          </picture>
        </div>
      </div>
    </Link>
  );
}

export default Picture;
