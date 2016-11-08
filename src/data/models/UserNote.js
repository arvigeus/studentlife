import DataType from 'sequelize';
import Model from './index.js';

const UserNote = Model.define('UserNote', {
  text: {
    type: DataType.TEXT,
    allowNull: false,
    trim: true,
    clean: true
  }
});

export default UserNote;
