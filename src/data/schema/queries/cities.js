import { GraphQLList as ListType } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import CityType from '../types/City';
import CityModel from '../../models/City';

const cities = {
  type: new ListType(CityType),
  args: defaultListArgs(CityModel),
  resolve: resolver(CityModel)
};

export default cities;
