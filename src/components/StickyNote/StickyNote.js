// @flow

import React from 'react';
import Relay from 'react-relay';

import s from './StickyNote.css';

type JokeType = {
  joke: {
    text: ?string
  }
}

function StickyNote({ joke: { text } }: JokeType) {
  return (
    <div className={s.root} dangerouslySetInnerHTML={{ __html: text || 'Няма налични шеги' }} />
  );
}

export default Relay.createContainer(StickyNote, {
  fragments: {
    joke: () => Relay.QL`
      fragment on Joke {
        text
      }`
  }
});
