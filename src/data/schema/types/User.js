import {
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { resolver } from 'graphql-sequelize';

import { nodeInterface } from '../../models';
import User from '../../models/User';
import UserProfileType from './UserProfile';

const UserType = new ObjectType({
  name: User.name,
  fields: {
    id: globalIdField(User.name),
    email: {
      type: new NonNull(StringType)
    },
    emailConfirmed: {
      type: new NonNull(BooleanType)
    },
    password: {
      type: new NonNull(StringType)
    },
    phoneNumber: {
      type: new NonNull(StringType)
    },
    phoneConfirmed: {
      type: new NonNull(BooleanType)
    },
    twoFactorEnabled: {
      type: new NonNull(BooleanType)
    },
    lockoutEnd: {
      type: StringType
    },
    accessFailedCount: {
      type: new NonNull(IntType)
    },
    profile: {
      type: new NonNull(UserProfileType),
      resolve: resolver(User.associations.profile)
    }
  },
  interfaces: [nodeInterface]
});

export default UserType;
