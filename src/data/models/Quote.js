import DataType from 'sequelize';
import Model from './index.js';
import { createdBy, updatedBy } from './helpers';
import User from './User';

const Quote = Model.define('Quote', {
  text: {
    type: DataType.STRING(511),
    unique: true,
    allowNull: false,
    trim: true,
    clean: true,
    validate: {
      notEmpty: {
        msg: 'Моля въведедете текст'
      }
    },
    comment: 'Inspirational words from people around the world'
  },
  author: {
    type: DataType.STRING,
    comment: 'The person whom this quote belongs to'
  },
  sourceUrl: {
    type: DataType.STRING,
    validate: {
      isUrl: {
        msg: 'Въведеният източник не е валиден линк'
      }
    },
    comment: 'Source web page address'
  }
});

Quote.belongsTo(User, createdBy);

Quote.belongsTo(User, updatedBy);

export default Quote;
