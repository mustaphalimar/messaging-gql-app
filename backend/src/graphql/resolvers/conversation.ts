import { Context } from "../../utils/types";

const resolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantsIds: string[] },
      context: Context
    ): Promise<{ conversationId: string }> => {
      const { prisma, session } = context;
      const { participantsIds } = args;

      return {
        conversationId: "123",
      };
    },
  },
};

export default resolvers;
