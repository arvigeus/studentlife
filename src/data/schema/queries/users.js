import { GraphQLList as ListType } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import UserType from '../types/User';
import UserModel from '../../models/User';

const users = {
  type: new ListType(UserType),
  args: defaultListArgs(UserModel),
  resolve: resolver(UserModel)
};

export default users;
