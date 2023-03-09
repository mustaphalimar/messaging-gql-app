import { Session } from "./utils/types";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

import { ApolloServer, ContextFunction } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import * as dotenv from "dotenv";
import { json } from "body-parser";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { Context } from "./utils/types";

dotenv.config();

async function main() {
  const app = express();

  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const prisma = new PrismaClient();

  const server = new ApolloServer<Context>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  const context = async ({ req }: any): Promise<Context> => {
    const session = (await getSession({ req })) as Session;

    return { session, prisma };
  };

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    }),
    json(),
    expressMiddleware(server, { context: context })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
}

main().then(() => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
