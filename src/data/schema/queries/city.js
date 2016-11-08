import {
  GraphQLNonNull as NonNull,
  GraphQLString as StringType
} from 'graphql';
import { resolver, defaultArgs } from 'graphql-sequelize';
import CityType from '../types/City';
import CityModel from '../../models/City';

const city = {
  type: CityType,
  args: {
    ...defaultArgs(CityModel),
    name: {
      type: new NonNull(StringType)
    }
  },
  resolve: resolver(CityModel)
};

export default city;
