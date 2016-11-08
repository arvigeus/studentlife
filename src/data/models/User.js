import DataType from 'sequelize';
import Model from './index.js';
import UserLogin from './UserLogin';
import UserNote from './UserNote';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';
import UserSocial from './UserSocial';
import bcrypt from '../../utils/bcrypt';

const User = Model.define('User', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true
  },
  email: {
    type: DataType.STRING,
    unique: true,
    lowercase: true,
    validate: {
      isEmail: {
        msg: 'Невалиден пощенски адрес'
      }
    }
  },
  emailConfirmed: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  password: {
    type: DataType.STRING(127),
    allowNull: false
  },
  phoneNumber: {
    type: DataType.STRING(50),
    allowNull: false,
    trim: true,
    clean: true
  },
  phoneConfirmed: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  twoFactorEnabled: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  lockoutEnd: {
    type: DataType.DATE,
    defaultValue: null,
    comment: 'If != null then lockout is enabled'
  },
  accessFailedCount: {
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  hooks: {
    beforeCreate: instance =>
      bcrypt.genSaltAsync(8).then(salt => bcrypt.hashAsync(instance.get('password'), salt)),
    beforeUpdte: instance =>
      bcrypt.genSaltAsync(8).then(salt => bcrypt.hashAsync(instance.get('password'), salt))
  },
  classMethods: {
    generateHash: password => bcrypt.genSaltAsync(8).then(salt => bcrypt.hashAsync(password, salt)) // eslint-disable-line max-len
  },
  instanceMethods: {
    validatePassword: password =>
      bcrypt.compareAsync(password, this.password)
        .then((isValidPassword) => {
          if (!isValidPassword) {
            if (this.accessFailedCount++ >= 5) {
              const now = new Date();
              this.lockoutEnd = new Date(now);
              this.lockout.setHours(now.getHours() + 1);
            }
            return false;
          }
          if (this.lockoutEnd !== null && this.lockoutEnd < new Date()) {
            this.lockoutEnd = null;
            this.accessFailedCount = 0;
          }
          return this.lockoutEnd === null && isValidPassword;
        })
  }
});

User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

User.hasMany(UserSocial, {
  foreignKey: 'userId',
  as: 'socials',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

User.belongsToMany(User, {
  foreignKey: 'userId',
  as: 'notes',
  through: UserNote,
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

User.belongsToMany(User, {
  foreignKey: 'createdByUserId',
  as: 'createdBy',
  through: UserNote,
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

export default User;
