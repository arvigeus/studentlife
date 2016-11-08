import { GraphQLList as ListType } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import UniversityType from '../types/University';
import UniversityModel from '../../models/University';

const university = {
  type: new ListType(UniversityType),
  args: defaultListArgs(UniversityModel),
  resolve: resolver(UniversityModel)
};

export default university;
