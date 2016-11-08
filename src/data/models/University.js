import DataType from 'sequelize';
import Model from './index.js';
import City from './City';

const University = Model.define('University', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true
  },
  picture: {
    type: DataType.STRING,
    trim: true,
    validate: {
      isUrl: true
    }
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
    trim: true,
    clean: true
  },
  address: {
    type: DataType.STRING,
    allowNull: false,
    trim: true,
    clean: true
  },
  phone: {
    type: DataType.STRING(50),
    trim: true,
    clean: true
  },
  email: {
    type: DataType.STRING,
    trim: true,
    lowercase: true,
    validate: {
      isEmail: {
        msg: 'Невалиден пощенски адрес'
      }
    }
  },
  url: {
    type: DataType.STRING,
    trim: true,
    lowercase: true,
    validate: {
      isUrl: {
        msg: 'Невалиден линк'
      }
    }
  },
  latitude: {
    type: DataType.DECIMAL,
    allowNull: false,
    validate: { min: -90, max: 90 }
  },
  longitude: {
    type: DataType.DECIMAL,
    allowNull: false,
    validate: { min: -180, max: 180 }
  },
  googleCID: {
    type: DataType.STRING,
    validate: {
      isNumeric: {
        msg: 'GoogleCID трябва да бъде номер'
      }
    }
  },
  parentId: {
    type: DataType.UUID
  }
}, {
  timestamps: false
});

University.belongsTo(City, {
  foreignKey: 'cityId',
  as: 'city',
  allowNull: true,
  onUpdate: 'cascade',
  onDelete: 'restrict'
});

University.belongsTo(University, {
  foreignKey: 'parentId',
  as: 'parent',
  onUpdate: 'cascade',
  onDelete: 'restrict'
});

export default University;
