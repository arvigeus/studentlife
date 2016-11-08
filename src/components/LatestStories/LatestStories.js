// @flow

import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import cx from 'classnames';
import s from './LatestStories.css';

type StoryNode = {
  node: {
    id: string,
    slug: string,
    title: string
  }
}

type StoriesType = {
  stories: {
    publications: {
      edges: Array<StoryNode>
    }
  }
}

function LatestStories({ stories: { publications: { edges } } }: StoriesType) {
  return (
    <div className={s.root}>
      <div className={s.clip} />
      <nav className={cx([s.paper, s.front])}>
        <h3>Последни истории</h3>
        <ul>
          {edges.map(({ node: { id, slug, title } }) => (
            <li key={id}>
              <Link to={`/publications/${slug}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={cx([s.paper, s.back])}>
        <quote>
          Елате при Мен всички, които сте отрудени и обременени, и Аз ще ви дам почивка. Вземете
          Моето иго върху себе си и се научете от Мен, защото съм кротък и смирен по сърце; и ще
          намерите почивка за душите си.
          <cite>Матей 11:28-29</cite>
        </quote>
      </div>
    </div>
  );
}

export default Relay.createContainer(LatestStories, {
  fragments: {
    stories: () => Relay.QL`
      fragment on PublicationsView {
        publications(first: 5) {
          edges {
            node {
              id,
              slug,
              title
            }
          }
        }
      }`
  }
});
