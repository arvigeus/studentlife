import { DefaultNetworkLayer } from 'react-relay';

let graphqlUrl;

if (typeof window !== 'undefined' && window.document) {
  const client = require('../client/config');
  graphqlUrl = client.Settings.serverUrl + client.Settings.graphqlUrl;
} else {
  // const server = require('../server/config');
  // graphqlUrl = server.Settings.serverUrl + server.Settings.graphqlUrl;
}

const networkLayer = new DefaultNetworkLayer(graphqlUrl);

export default networkLayer;
