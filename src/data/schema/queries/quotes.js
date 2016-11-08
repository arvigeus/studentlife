import { GraphQLList as ListType } from 'graphql';
import { resolver, defaultListArgs } from 'graphql-sequelize';
import QuoteType from '../types/Quote';
import QuoteModel from '../../models/Quote';

const quotes = {
  type: new ListType(QuoteType),
  args: defaultListArgs(QuoteModel),
  resolve: resolver(QuoteModel)
};

export default quotes;
