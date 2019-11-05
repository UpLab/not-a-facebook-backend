/* eslint-disable no-underscore-dangle */
import { gql } from 'apollo-server';
import PostsService from '../services/posts';
import { authCheck } from './utils';

export const typeDefs = gql`
  extend type Query {
    posts(limit: Int): [Post]!
    myPosts: [Post]!
  }

  extend type Mutation {
    addPost(body: String!): Post!
    deletePost(postId: ID!): Boolean
    updatePost(postId: ID!, body: String!): Post!
  }

  type Post {
    _id: ID!
    body: String!
    createdAt: String!
    comments: [Comment]!
    commentsCount: Int!
  }

  type Comment {
    _id: ID!
    body: String!
    createdAt: String!
    creatorId: ID!
    post: Post!
    postId: ID!
  }
`;

export const resolvers = {
  Query: {
    posts: (root, args, ctx) => {
      authCheck(ctx);
      return PostsService.get();
    },
    myPosts: (root, args, ctx) => {
      authCheck(ctx);
      return PostsService.getPostsByUserId(ctx.user._id);
    },
  },
  Mutation: {
    addPost: (root, args, ctx) => {
      authCheck(ctx);
      return PostsService.add({ createdBy: ctx.user._id, body: args.body });
    },
    deletePost: (root, args, ctx) => {
      authCheck(ctx);
      return PostsService.remove(args.postId);
    },
    updatePost: (root, args, ctx) => {
      authCheck(ctx);
      return PostsService.update(args.postId, args.body);
    },
  },
  // TODO: implement
};
