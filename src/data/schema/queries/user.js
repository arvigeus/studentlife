import { resolver, defaultArgs } from 'graphql-sequelize';
import UserType from '../types/User';
import UserModel from '../../models/User';

const user = {
  type: UserType,
  args: defaultArgs(UserModel),
  resolve: resolver(UserModel)
};

export default user;
