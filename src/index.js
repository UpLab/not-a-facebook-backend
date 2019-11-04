const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
type Query {
  posts(
    limit: Int
  ): [Post]!
  myPosts: [Post]!
  me: User
}

type Mutation {
  createAccount(input: CreateAccountInput!): TokenAndUser!
  login(input: LoginInput!): TokenAndUser!
  logout: Boolean
  changePassword(input: ChangePasswordInput!): Boolean
  forgotPassword(username: String!): Boolean
  addPost(body: String!): Post!
  deletePost(postId: ID!): Boolean
  updatePost(body: String!): Post!
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

type Post {
  id: ID!
  body: String!
  createdAt: Int!
  creator: User!
  comments: [Comment]!
  commentsCount: Int!
}

type Comment {
  id: ID!
  body: String!
  createdAt: Int!
  creator: User!
  creatorId: ID!
  post: Post!
  postId: ID!
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

`
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  mocks: true,
  mockEntireSchema: true,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
