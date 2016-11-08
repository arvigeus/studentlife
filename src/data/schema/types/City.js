import {
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import City from '../../models/City';
import { nodeInterface } from '../../models';

const CityType = new ObjectType({
  name: City.name,
  fields: () => ({
    id: globalIdField(City.name),
    name: { type: new NonNull(StringType) }
  }),
  interfaces: [nodeInterface]
});

export default CityType;
