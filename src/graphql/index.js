import { ApolloServer } from 'apollo-server';
import schema from './schema';
import logger from '../utils/logger';
import UserModel from '../models/user';
import config from '../config';

const getTokenFromReq = req => {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '').replace('Token ', '');
  return token;
};
const server = new ApolloServer({
  introspection: true,
  playground: true,
  schema,
  mocks: true,
  mockEntireSchema: false,
  context: async ({ req }) => {
    const token = getTokenFromReq(req);
    return {
      token,
      user: await UserModel.findByToken(token),
    };
  },
});

export default async () => {
  // The `listen` method launches a web server.
  const instance = await server.listen({ port: config.port });
  const { url } = instance;
  logger.info(`config: ${JSON.stringify(config)}`);
  logger.info(`🚀 Apollo Server ready at ${url}`);
};
