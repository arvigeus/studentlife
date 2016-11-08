import {
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import { globalIdField } from 'graphql-relay';

import Joke from '../../models/Joke';
import UserType from './User';
import { nodeInterface } from '../../models';

const JokeType = new ObjectType({
  name: Joke.name,
  fields: {
    id: globalIdField(Joke.name),
    text: {
      type: new NonNull(StringType),
      description: 'A good joke is succinct, containing no more detail than is needed to set the scene for the punchline at the end' // eslint-disable-line max-len
    },
    createdAt: {
      type: new NonNull(StringType)
    },
    updatedAt: {
      type: new NonNull(StringType)
    },
    createdBy: {
      type: new NonNull(UserType),
      resolve: resolver(Joke.associations.createdBy, { separate: true })
    },
    updatedBy: {
      type: new NonNull(UserType),
      resolve: resolver(Joke.associations.updatedBy, { separate: true })
    }
  },
  interfaces: [nodeInterface]
});

export default JokeType;
