import React, { Component } from 'react';
import Relay from 'react-relay';

import s from '../../styles/Article.css';

class Publication extends Component {
  componentDidMount() {
    const { script } = this.props.publication;
    if (script) eval(script); // eslint-disable-line no-eval
  }

  render() {
    const { content } = this.props.publication;
    return (
      <article className={s.neat}>
        <section dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    );
  }
}

export default Relay.createContainer(Publication, {
  fragments: {
    publication: () => Relay.QL`
      fragment on Publication {
        content,
        script
      }`
  }
});
