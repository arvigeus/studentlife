
import React from 'react';
import ReactDOM from 'react-dom';
import browserHistory from 'react-router/lib/browserHistory';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import { Router, match } from 'react-router';
import Relay, { DefaultNetworkLayer } from 'react-relay';
import onRouteChange from './onRouteChange';
import config from './config';

const root = document.querySelector('#root');

const environment = new Relay.Environment();

const { serverUrl, graphqlUrl } = config.Settings;

environment.injectNetworkLayer(new DefaultNetworkLayer(serverUrl + graphqlUrl));

const data = JSON.parse(document.getElementById('preloadedData').textContent);

IsomorphicRelay.injectPreparedData(environment, data);

const mount = () => {
  const routes = require('../routes').default;
  match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
    if (error) throw error;
    IsomorphicRouter.prepareInitialRender(environment, renderProps).then((props) => {
      ReactDOM.render(<Router onUpdate={onRouteChange} {...props} />, root);
    });
  });
};

if (module.hot) {
  // Rerender after any changes to the following.
  module.hot.accept('../routes', () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(root);
      mount();
    });
  });
}

mount();
