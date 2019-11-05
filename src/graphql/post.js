const { gql } = require('apollo-server');

export const typeDefs = gql`
  extend type Query {
    posts(limit: Int): [Post]!
    myPosts: [Post]!
  }

  extend type Mutation {
    addPost(body: String!): Post!
    deletePost(postId: ID!): Boolean
    updatePost(body: String!): Post!
  }

  type Post {
    id: ID!
    body: String!
    createdAt: Int!
    comments: [Comment]!
    commentsCount: Int!
  }

  type Comment {
    id: ID!
    body: String!
    createdAt: Int!
    creatorId: ID!
    post: Post!
    postId: ID!
  }
`;

export const resolvers = {
  // TODO: implement
};
