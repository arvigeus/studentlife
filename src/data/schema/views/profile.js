import {
  GraphQLObjectType as ObjectType
} from 'graphql';

import cities from '../queries/cities';
import universities from '../queries/universities';

const profileView = new ObjectType({
  name: 'ProfileView',
  fields: () => ({
    cities,
    universities
  })
});

export default {
  type: profileView,
  resolve: () => { // eslint-disable-line
    return { id: 'profileView' };
  }
};
