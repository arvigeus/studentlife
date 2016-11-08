// @flow

import React from 'react';
import Relay from 'react-relay';

import s from './Mug.css';

type QuoteType = {
  quote: {
    text: string,
    author: ?string,
    sourceUrl: ?string
  }
}

function Mug({ quote: { text, author, sourceUrl } }: QuoteType) {
  const aProps = {};
  if (sourceUrl) {
    aProps.href = sourceUrl;
    aProps.target = '_blank';
  }

  const quoteProps = {};
  if (text.length > 100) {
    quoteProps.style = { fontSize: `${100 - (Math.ceil((text.length - 100) / 50) * 5)}%` };
  }
  return (
    <a className={s.root} {...aProps} >
      <blockquote {...quoteProps}>
        {text}
        <cite>{author || 'неизвестен'}</cite>
      </blockquote>
    </a>
  );
}

export default Relay.createContainer(Mug, {
  fragments: {
    quote: () => Relay.QL`
      fragment on Quote {
        text,
        author,
        sourceUrl
      }`
  }
});
