import { ApolloServer } from 'apollo-server';
import schema from './schema';
import logger from '../utils/logger';

const server = new ApolloServer({
  introspection: true,
  playground: true,
  schema,
  mocks: true,
  mockEntireSchema: true,
});

export default async () => {
  // The `listen` method launches a web server.
  const instance = await server.listen();
  const { url } = instance;
  logger.info(`🚀 Apollo Server ready at ${url}`);
};
