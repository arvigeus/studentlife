import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType
} from 'graphql';

import { nodeTypeMapper, nodeField as node } from '../models';

import queries from './queries';
import views from './views';

import CityType from './types/City';
import JokeType from './types/Joke';
import PublicationType from './types/Publication';
import QuoteType from './types/Quote';
import UniversityType from './types/University';

import City from '../models/City';
import Joke from '../models/Joke';
import Publication from '../models/Publication';
import Quote from '../models/Quote';
import University from '../models/University';

nodeTypeMapper.mapTypes({
  [City.name]: CityType,
  [Joke.name]: JokeType,
  [Publication.name]: PublicationType,
  [Quote.name]: QuoteType,
  [University.name]: UniversityType
});

const schema = new Schema({
  query: new ObjectType({
    name: 'RootQueryType',
    fields: () => ({
      ...queries,
      ...views,
      node
    })
  })
});

export default schema;
