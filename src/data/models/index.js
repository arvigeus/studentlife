import Sequelize from 'sequelize';
import sequelizeTransforms from 'sequelize-transforms';
import { relay } from 'graphql-sequelize';
import { SqlConfig } from '../../server/config';

const sequelize = new Sequelize(SqlConfig.ConnectionString, {
  dialect: 'postgres',
  define: {
    freezeTableName: true,
    quoteIdentifiers: false,
    logging: process.env.NODE_ENV !== 'production'
  }
}
);

sequelizeTransforms(sequelize, {
  clean: val => ((val !== null) ? `${val}`.replace(/\s{2,}/, ' ').trim() : null)
});

const { sequelizeNodeInterface } = relay;
const {
  nodeField,
  nodeTypeMapper,
  nodeInterface
} = sequelizeNodeInterface(sequelize);

export default sequelize;
export {
  nodeField,
  nodeTypeMapper,
  nodeInterface
};
