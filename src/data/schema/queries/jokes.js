import { GraphQLList as ListType } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import JokeType from '../types/Joke';
import JokeModel from '../../models/Joke';

const jokes = {
  type: new ListType(JokeType),
  args: defaultListArgs(JokeModel),
  resolve: resolver(JokeModel)
};

export default jokes;
