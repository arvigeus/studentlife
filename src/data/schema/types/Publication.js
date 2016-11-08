import {
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLList as ListType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType
} from 'graphql';
import JsonType from 'graphql-sequelize/lib/types/jsonType';
import { resolver } from 'graphql-sequelize';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../../models';

import PictureType from './Picture';
import UserType from './User';
import Publication from '../../models/Publication';

const PublicationType = new ObjectType({
  name: Publication.name,
  fields: {
    id: globalIdField(Publication.name),
    slug: {
      type: new NonNull(StringType)
    },
    title: {
      type: new NonNull(StringType)
    },
    picture: {
      type: new NonNull(PictureType)
    },
    excerpt: {
      type: StringType
    },
    content: {
      type: new NonNull(StringType)
    },
    script: {
      type: StringType
    },
    tags: {
      type: new ListType(StringType)
    },
    meta: {
      type: new ListType(JsonType)
    },
    restricted: {
      type: new NonNull(BooleanType)
    },
    published: {
      type: new NonNull(BooleanType)
    },
    commentsEnabled: {
      type: new NonNull(BooleanType)
    },
    createdAt: {
      type: new NonNull(StringType)
    },
    updatedAt: {
      type: new NonNull(StringType)
    },
    createdBy: {
      type: new NonNull(UserType),
      resolve: resolver(Publication.associations.createdBy, { separate: true })
    },
    updatedBy: {
      type: new NonNull(UserType),
      resolve: resolver(Publication.associations.updatedBy, { separate: true })
    }
  },
  interfaces: [nodeInterface]
});

export default PublicationType;
