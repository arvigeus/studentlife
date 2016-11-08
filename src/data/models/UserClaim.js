import DataType from 'sequelize';
import Model from './index.js';

const UserClaim = Model.define('UserClaim', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true
  },
  type: {
    type: DataType.STRING,
    allowNull: false,
    trim: true
  },
  value: {
    type: DataType.TEXT,
    allowNull: false,
    trim: true
  }
});

export default UserClaim;
