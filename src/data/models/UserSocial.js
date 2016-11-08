import DataType from 'sequelize';
import Model from './index.js';

const UserSocial = Model.define('UserSocial', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataType.STRING(50),
    allowNull: false,
    comment: 'Name of the social media service (e.g. Facebook, Skype)'
  },
  account: {
    type: DataType.STRING(50),
    comment: 'User account name',
    allowNull: false
  },
  accessToken: {
    type: DataType.STRING(511)
  }
}, {
  timestamps: false
});

export default UserSocial;
