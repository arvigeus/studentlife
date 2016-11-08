import {
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../../models';

import Quote from '../../models/Quote';
import UserType from './User';

const QuoteType = new ObjectType({
  name: Quote.name,
  fields: {
    id: globalIdField(Quote.name),
    text: {
      type: new NonNull(StringType),
      description: 'Inspirational words from people around the world'
    },
    author: {
      type: StringType
    },
    sourceUrl: {
      type: StringType
    },
    createdAt: {
      type: new NonNull(StringType)
    },
    updatedAt: {
      type: new NonNull(StringType)
    },
    createdBy: {
      type: new NonNull(UserType),
      resolve: resolver(Quote.associations.createdBy, { separate: true })
    },
    updatedBy: {
      type: new NonNull(UserType),
      resolve: resolver(Quote.associations.updatedBy, { separate: true })
    }
  },
  interfaces: [nodeInterface]
});

export default QuoteType;
