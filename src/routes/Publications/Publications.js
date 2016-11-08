// @flow

import React, { Component } from 'react';
import Relay from 'react-relay';

import PublicationExcerpt from './PublicationExcerpt';
import Button from '../../components/Input/Button';
import s from '../../styles/Article.css';

type PropsType = {
  view: any,
  relay: any
}

class Publications extends Component {
  constructor(props: PropsType) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  render() {
    const { view } = this.props;
    const { publications } = view;
    return (
      <article className={s.tall}>
        {
          publications.edges.map(
            ({ node }) => <PublicationExcerpt key={node.id} publication={node} />
          )
        }
        {
          publications.pageInfo.hasNextPage
          ? <Button value="Зареди още" onClick={this.loadMore} />
          : null
        }
      </article>
    );
  }

  loadMore() {
    this.props.relay.setVariables({
      count: this.props.relay.variables.count + 10
    });
  }
}

export default Relay.createContainer(Publications, {
  initialVariables: {
    count: 10
  },
  fragments: {
    view: () => Relay.QL`
      fragment on PublicationsView {
        publications(first: $count) {
          edges {
            node {
              id,
              ${PublicationExcerpt.getFragment('publication')}
            }
          },
          pageInfo {
            hasNextPage
          }
        }
      }`
  }
});
