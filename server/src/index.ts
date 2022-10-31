import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import path from "path";
import {fileURLToPath} from "url";

import {getDBPool} from "./db";
import {ContactStore} from "./store";
import {resolvers} from "./resolvers";

const db = await getDBPool();

// load graphql schema file
const typeDefs = readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "../", "schema.gql")).toString('utf-8')

const store = new ContactStore(db);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => ({ store }),
});

console.log(`🚀  Server ready at: ${url}`);
