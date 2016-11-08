import {
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLList as ListType,
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLFloat as FloatType
} from 'graphql';

const PictureSource = new ObjectType({
  name: 'PictureSource',
  fields: {
    srcSet: { type: new NonNull(StringType) },
    media: { type: StringType },
    sizes: { type: StringType },
    type: { type: StringType },
    width: { type: new NonNull(IntType) }
  }
});

const Picture = new ObjectType({
  name: 'Picture',
  fields: {
    original: { type: new NonNull(StringType) },
    width: { type: new NonNull(IntType) },
    rng: { type: FloatType, resolve: () => Math.random() },
    sources: { type: new ListType(PictureSource) }
  }
});

export default Picture;
