import { GraphQLList as ListType } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import PublicationType from '../types/Publication';
import PublicationModel from '../../models/Publication';

const publications = {
  type: new ListType(PublicationType),
  args: defaultListArgs(PublicationModel),
  resolve: resolver(PublicationModel)
};

export default publications;
