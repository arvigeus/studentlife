import DataType from 'sequelize';
import Model from './index.js';
import University from './University';
import City from './City';

const UserProfile = Model.define('UserProfile', {
  userId: {
    type: DataType.UUID,
    primaryKey: true
  },
  givenName: {
    type: DataType.STRING(50),
    allowNull: false,
    trim: true
  },
  familyName: {
    type: DataType.STRING(50),
    allowNull: false,
    trim: true
  },
  picture: {
    type: DataType.JSON,
    allowNull: false
  },
  birthdate: {
    type: DataType.DATE,
    allowNull: false
  },
  gender: {
    type: DataType.ENUM('male', 'female'),
    allowNull: false
  },
  universityEntranceYear: {
    type: DataType.INTEGER,
    allowNull: false
  },
  universityStudyingType: {
    type: DataType.ENUM('regular', 'part-time', 'remote', 'graduated'),
    allowNull: false
  },
  additionalInfo: {
    type: DataType.STRING(511),
    trim: true,
    clean: true
  }
}, {
  timestamps: false,
  instanceMethods: {
    getFullname: () => `${this.givenName} ${this.familyName}`
  }
});

UserProfile.belongsTo(City, {
  foreignKey: 'cityId',
  as: 'city',
  onUpdate: 'cascade',
  onDelete: 'restrict'
});

UserProfile.belongsTo(University, {
  foreignKey: 'universityId',
  as: 'university',
  onUpdate: 'cascade',
  onDelete: 'set null'
});

export default UserProfile;
