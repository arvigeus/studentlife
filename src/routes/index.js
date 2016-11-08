import Relay from 'react-relay';

import App from '../components/App';

// Unfortunately, HMR breaks when we dynamically resolve
// routes so we need to require them here as a workaround.
// https://github.com/gaearon/react-hot-loader/issues/288
if (module.hot) {
  // eslint-disable global-require
  require('./Home');
  require('./Home/Hero');
  require('../components/LatestStories');
  require('../components/StickyNote');
  require('../components/Mug');
  require('./Register');
  require('./Register/Hero');
  require('./Publications');
  require('./Publications/Hero');
  require('./Publication');
  require('./Publication/Hero');
  // eslint-enable global-require
}

function Layout(modules) {
  return {
    hero: modules[0].default,
    content: modules[1].default,
    stories: modules[2].default,
    joke: modules[3].default,
    quote: modules[4].default
  };
}

const queries = {
  stories: { stories: () => Relay.QL`query { publicationsView }` },
  joke: { joke: () => Relay.QL`query { randomJoke }` },
  quote: { quote: () => Relay.QL`query { randomQuote }` }
};

export default [{
  path: '/',
  component: App,
  indexRoute: {
    getComponents: (nextState, cb) => {
      Promise.all([
        System.import('./Home/Hero'),
        System.import('./Home'),
        System.import('../components/LatestStories'),
        System.import('../components/StickyNote'),
        System.import('../components/Mug')
      ])
        .then(modules => cb(null, Layout(modules)))
        .catch((e) => { throw e; });
    },
    queries
  },
  childRoutes: [{
    path: '/register',
    getComponents: (nextState, cb) => {
      Promise.all([
        System.import('./Register/Hero'),
        System.import('./Register'),
        System.import('../components/LatestStories'),
        System.import('../components/StickyNote'),
        System.import('../components/Mug')
      ])
        .then(modules => cb(null, Layout(modules)))
        .catch((e) => { throw e; });
    },
    queries: {
      ...queries,
      content: { profile: () => Relay.QL`query { profileView }` }
    }
  }, {
    path: '/publications',
    getComponents: (nextState, cb) => {
      Promise.all([
        System.import('./Publications/Hero'),
        System.import('./Publications'),
        System.import('../components/LatestStories'),
        System.import('../components/StickyNote'),
        System.import('../components/Mug')
      ])
        .then(modules => cb(null, Layout(modules)))
        .catch((e) => { throw e; });
    },
    queries: {
      ...queries,
      content: {
        view: () => Relay.QL`query { publicationsView }`
      }
    }
  }, {
    path: '/publications/:slug',
    getComponents: (nextState, cb) => {
      Promise.all([
        System.import('./Publication/Hero'),
        System.import('./Publication'),
        System.import('../components/LatestStories'),
        System.import('../components/StickyNote'),
        System.import('../components/Mug')
      ])
        .then(modules => cb(null, Layout(modules)))
        .catch((e) => { throw e; });
    },
    queries: {
      ...queries,
      hero: {
        hero: () => Relay.QL`query { publication(slug: $slug) }`
      },
      content: {
        publication: () => Relay.QL`query { publication(slug: $slug) }`
      }
    }
  }]
}];
