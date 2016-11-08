import DataType from 'sequelize';
import slugify from 'slug';
import Model from './index.js';
import { createdBy, updatedBy, slug } from './helpers';
import User from './User';

const Publication = Model.define('Publication', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  },
  slug,
  title: {
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    trim: true,
    clean: true,
    validate: {
      notEmpty: {
        msg: 'Моля въведете заглавие на публикацията'
      }
    }
  },
  picture: {
    type: DataType.JSON,
    allowNull: false
  },
  excerpt: {
    type: DataType.TEXT,
    allowNull: false,
    trim: true,
    clean: true
  },
  content: {
    type: DataType.TEXT,
    allowNull: false,
    trim: true,
    clean: true,
    validate: {
      notEmpty: {
        msg: 'Въведете текст на публикацията'
      }
    }
  },
  script: {
    type: DataType.TEXT
  },
  tags: DataType.ARRAY(DataType.STRING),
  restricted: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  meta: {
    type: DataType.ARRAY(DataType.JSON)
  },
  published: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  commentsEnabled: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});

Publication.belongsTo(User, createdBy);

Publication.belongsTo(User, updatedBy);

export default Publication;
