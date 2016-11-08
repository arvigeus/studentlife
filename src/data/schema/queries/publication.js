import {
  GraphQLNonNull as NonNull,
  GraphQLString as StringType
} from 'graphql';
import { resolver, defaultArgs } from 'graphql-sequelize';
import PublicationType from '../types/Publication';
import PublicationModel from '../../models/Publication';

const publication = {
  type: PublicationType,
  args: {
    ...defaultArgs(PublicationModel),
    slug: { type: new NonNull(StringType) }
  },
  resolve: resolver(PublicationModel)
};

export default publication;
