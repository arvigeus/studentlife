import { resolver, defaultArgs } from 'graphql-sequelize';
import UniversityType from '../types/University';
import UniversityModel from '../../models/University';

const university = {
  type: UniversityType,
  args: defaultArgs(UniversityModel),
  resolve: resolver(UniversityModel)
};

export default university;
