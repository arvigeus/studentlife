import { resolver, defaultArgs } from 'graphql-sequelize';
import QuoteType from '../types/Quote';
import QuoteModel from '../../models/Quote';

const quote = {
  type: QuoteType,
  args: defaultArgs(QuoteModel),
  resolve: resolver(QuoteModel)
};

export default quote;
