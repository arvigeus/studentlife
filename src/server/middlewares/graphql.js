import graphQLHTTP from 'express-graphql';

import schema from '../../data/schema';

export default graphQLHTTP({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
  pretty: process.env.NODE_ENV !== 'production'
});
