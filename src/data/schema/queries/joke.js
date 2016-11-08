import { resolver, defaultArgs } from 'graphql-sequelize';
import JokeType from '../types/Joke';
import JokeModel from '../../models/Joke';

const joke = {
  type: JokeType,
  args: defaultArgs(JokeModel),
  resolve: resolver(JokeModel)
};

export default joke;
