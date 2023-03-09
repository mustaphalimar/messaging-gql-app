import { Context, CreateUsernameResponse } from "../../utils/types";

const resolvers = {
  Query: {
    searchUsers: () => {},
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

      return {};
    },
  },
  //   Subscription: {},
};

export default resolvers;
