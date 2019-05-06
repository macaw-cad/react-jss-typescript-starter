import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './TypeDefs';
import resolvers from './Resolvers';

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});