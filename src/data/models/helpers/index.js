import Sequelize from 'sequelize';

const createdBy = {
  foreignKey: 'createdByUserId',
  as: 'createdBy',
  onUpdate: 'cascade',
  onDelete: 'set null'
};

const updatedBy = {
  foreignKey: 'updatedByUserId',
  as: 'updatedBy',
  onUpdate: 'cascade',
  onDelete: 'set null'
};

const slug = {
  type: Sequelize.STRING,
  allowNull: false,
  validate: {
    is: ['^[a-z0-9]+(?:-[a-z0-9]+)*$']
  }
};

export {
  createdBy,
  updatedBy,
  slug
};
