/* eslint-disable import/prefer-default-export */
const { gql } = require('apollo-server');

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
    id: ID!
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
  // TODO: implement
};
