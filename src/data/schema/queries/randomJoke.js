import Sequelize from 'sequelize';

import Joke from '../../models/Joke';
import JokeType from '../types/Joke';

const randomJoke = {
  type: JokeType,
  resolve: () =>
    Joke.findAll({
      order: [Sequelize.fn('RANDOM')],
      limit: 1
    }).then(result => result[0])
};

export default randomJoke;
