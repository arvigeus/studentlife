import {
  GraphQLID as IdType,
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntegerType,
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';
import { resolver } from 'graphql-sequelize';
import CityType from './City';

const EventType = new ObjectType({
  name: 'Event',
  fields: {
    id: { type: IdType },
    attending_count: { type: new NonNull(IntegerType) },
    cover: { type: StringType },
    description: { type: new NonNull(StringType) },
    end_time: { type: StringType },
    is_canceled: { type: new NonNull(BooleanType) },
    name: { type: new NonNull(StringType) },
    place_name: { type: StringType },
    place_location_city: { type: StringType },
    place_location_latitude: { type: new NonNull(FloatType) },
    place_location_longitude: { type: new NonNull(FloatType) },
    googleCID: { type: StringType },
    parent: {
      type: UniversityType,
      resolve: resolver(University.Parent, { separate: true })
    },
    city: {
      type: CityType,
      resolve: resolver(University.City, { separate: true })
    }
  }
});

export default EventType;
