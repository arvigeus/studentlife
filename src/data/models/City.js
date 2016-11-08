import DataType from 'sequelize';
import Model from './index.js';

const City = Model.define('City', {
  name: {
    type: DataType.STRING(511),
    unique: true,
    allowNull: false,
    trim: true,
    clean: true
  }
}, {
  timestamps: false
});

export default City;
