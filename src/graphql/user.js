/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-server';
import AuthService from '../services/auth';

export const typeDefs = gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    createAccount(input: CreateAccountInput!): TokenAndUser!
    login(input: LoginInput!): TokenAndUser!
    logout: Boolean
    changePassword(input: ChangePasswordInput!): Boolean
    forgotPassword(username: String!): Boolean
  }

  input CreateAccountInput {
    username: String!
    password: String!
    profile: UserProfileInput
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input ChangePasswordInput {
    password: String!
    newPassword: String!
  }

  input UserProfileInput {
    firstName: String!
    lastName: String!
    avatar: String
  }

  type TokenAndUser {
    user: User!
    token: String!
  }

  extend type Post {
    creator: User!
  }

  extend type Comment {
    creator: User!
  }

  type User {
    _id: ID!
    username: String!
    profile: UserProfile!
  }

  type UserProfile {
    firstName: String!
    lastName: String!
    avatar: String
  }
`;

export const resolvers = {
  Query: {
    me: (root, args, context) => context.user,
  },
  Mutation: {
    createAccount: async (root, args) => {
      const {
        input: { username, password, profile },
      } = args;
      const {
        accessToken: { token },
        user,
      } = await AuthService.createAccount(username, password, profile);
      return {
        token,
        user,
      };
    },
  },
};
