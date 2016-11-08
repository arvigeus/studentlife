import {
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLID as IDType,
  GraphQLString as StringType,
  GraphQLFloat as FloatType
} from 'graphql';
import { resolver } from 'graphql-sequelize';

import University from '../../models/University';
import CityType from './City';

const fields = {
  id: {
    type: IDType
  },
  picture: {
    type: StringType
  },
  name: {
    type: new NonNull(StringType)
  },
  address: {
    type: new NonNull(StringType)
  },
  phone: {
    type: StringType
  },
  email: {
    type: StringType
  },
  url: {
    type: StringType
  },
  latitude: {
    type: new NonNull(FloatType)
  },
  longitude: {
    type: new NonNull(FloatType)
  },
  googleCID: {
    type: StringType
  },
  city: {
    type: new NonNull(CityType),
    resolve: resolver(University.associations.city)
  }
};

const UniversityParentType = new ObjectType({
  name: 'UniversityParent',
  fields
});

const UniversityType = new ObjectType({
  name: 'University',
  fields: {
    ...fields,
    parent: {
      type: UniversityParentType,
      resolve: resolver(University.associations.parent)
    }
  }
});

export default UniversityType;
