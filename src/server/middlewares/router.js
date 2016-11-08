import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import IsomorphicRouter from 'isomorphic-relay-router';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import match from 'react-router/lib/match';
import { DefaultNetworkLayer } from 'react-relay';
import Helmet from 'react-helmet';
import { Settings, Analytics } from '../config';

import Html from '../../components/Html';
import routes from '../../routes';

const { serverUrl, graphqlUrl } = Settings;

// eslint-disable-next-line import/no-dynamic-require
const clientAssets = require(KYT.ASSETS_MANIFEST);

// TODO: https://www.npmjs.com/package/spider-detector

// Setup server side routing.
export default (req, res, next) => {
  const history = createMemoryHistory(req.originalUrl);
  match({ routes, history, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`);
    } else if (renderProps) {
      IsomorphicRouter
        .prepareData(renderProps, new DefaultNetworkLayer(serverUrl + graphqlUrl))
        .then(({ data, props }) => {
          // When a React Router route is matched then we render
          // the components and assets into the template.
          const markup = renderToString(IsomorphicRouter.render(props));
          const { title, meta } = Helmet.rewind();
          res.status(200).send(`<!DOCTYPE html>\n${renderToStaticMarkup(
            <Html
              title={title}
              meta={meta}
              cssUri={clientAssets.main.css}
              data={data}
              jsUri={clientAssets.main.js}
              markup={markup}
              settings={{ Settings }}
              analytics={Analytics}
            />
          )}`);
        }).catch(next);
    } else {
      res.status(404).send('Not Found');
    }
  });
};
