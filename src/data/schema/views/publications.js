import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType
} from 'graphql';
import { relay } from 'graphql-sequelize';

import PublicationType from '../types/Publication';
import Publication from '../../models/Publication';

const { sequelizeConnection } = relay;

const publicationsConnection = sequelizeConnection({
  name: 'viewerPublications',
  target: Publication,
  nodeType: PublicationType,
  connectionFields: {
    total: {
      type: IntType,
      resolve: () => Publication.count()
    }
  }
});

const publicationsView = new ObjectType({
  name: 'PublicationsView',
  fields: () => ({
    publications: {
      type: publicationsConnection.connectionType,
      args: publicationsConnection.connectionArgs,
      resolve: publicationsConnection.resolve
    }
  })
});

export default {
  type: publicationsView,
  resolve: () => { // eslint-disable-line
    return { id: 'publicationsView' };
  }
};
