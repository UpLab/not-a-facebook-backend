import { gql, makeExecutableSchema } from 'apollo-server';
import merge from 'lodash/merge';
import { typeDefs as Post, resolvers as postResolvers } from './post';
import { typeDefs as User, resolvers as userResolvers } from './user';

const Common = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [Common, User, Post],
  resolvers: merge(userResolvers, postResolvers),
});

export default schema;
