import Sequelize from 'sequelize';

import Quote from '../../models/Quote';
import QuoteType from '../types/Quote';

const randomQuote = {
  type: QuoteType,
  resolve: () =>
    Quote.findAll({
      order: [Sequelize.fn('RANDOM')],
      limit: 1
    }).then(result => result[0])
};

export default randomQuote;
