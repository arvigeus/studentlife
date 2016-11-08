import {
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLID as IDType,
  GraphQLInt as IntType,
  GraphQLString as StringType
} from 'graphql';
import { resolver } from 'graphql-sequelize';

import UserProfile from '../../models/UserProfile';
import PictureType from './Picture';
import CityType from './City';

const UserType = new ObjectType({
  name: 'UserProfile',
  fields: {
    givenName: {
      type: new NonNull(StringType)
    },
    familyName: {
      type: new NonNull(StringType)
    },
    picture: {
      type: new NonNull(PictureType)
    },
    birthdate: {
      type: new NonNull(StringType)
    },
    gender: {
      type: new NonNull(StringType)
    },
    universityEntranceYear: {
      type: new NonNull(IntType)
    },
    universityStudyingType: {
      type: new NonNull(StringType)
    },
    additionalInfo: {
      type: StringType
    },
    city: {
      type: new NonNull(CityType),
      resolve: resolver(UserProfile.associations.city)
    }
  }
});

export default UserType;
