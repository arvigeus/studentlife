import express from 'express';
import compression from 'compression';
import path from 'path';

import graphql from './middlewares/graphql';
import router from './middlewares/router';
import sitemap from './middlewares/sitemap';
import atom from './middlewares/atom';

import Models from '../data/models';

const app = express();

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(compression());

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR))); // eslint-disable-line no-undef

app.use('/graphql', graphql);

app.use('/atom.feed', atom);

app.use('/sitemap.xml', sitemap);

app.get('/*', router);

Models.sync()
.catch(err => console.error(err.stack)) // eslint-disable-line no-console
.then(() => {
  app.listen(parseInt(KYT.SERVER_PORT, 10)); // eslint-disable-line no-undef
});
