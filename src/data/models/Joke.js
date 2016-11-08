import DataType from 'sequelize';
import Model from './index.js';
import { createdBy, updatedBy } from './helpers';
import User from './User';

const Joke = Model.define('Joke', {
  text: {
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
    trim: true,
    clean: true,
    validate: {
      notEmpty: {
        msg: 'Моля въведедете текст'
      }
    },
    comment: 'A good joke is succinct, containing no more detail than is needed to set the scene for the punchline at the end' // eslint-disable-line max-len
  }
});

Joke.belongsTo(User, createdBy);

Joke.belongsTo(User, updatedBy);

export default Joke;
