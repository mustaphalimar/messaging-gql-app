import { User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { Context, CreateUsernameResponse } from "../../utils/types";

const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: Context
    ): Promise<Array<User>> => {
      const { username: searchedUsername } = args;
      const { prisma, session } = context;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      const {
        user: { username: myUsername },
      } = session;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: myUsername,
              mode: "insensitive",
            },
          },
        });

        return users;
      } catch (error: any) {
        console.log("Search Users Error : ", error.message);
        throw new GraphQLError(error.message);
      }
    },

    // ----- End of Query Object
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: Context
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }

      try {
        // Check if username has not already been taken
        const exisitingUser = await prisma.user.findUnique({
          where: { username },
        });

        if (exisitingUser) {
          return {
            error: "Username is already taken. Try another !",
          };
        }

        await prisma.user.update({
          where: { id: session.user.id },
          data: { username },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Create username error  : ", error);

        return {
          error: error?.message,
        };
      }
    },

    // ---- End of Mutation Object
  },
  //   Subscription: {},
};

export default resolvers;
