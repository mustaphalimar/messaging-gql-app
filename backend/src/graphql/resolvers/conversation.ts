import { ConversationPopulated } from "../../utils/types";
import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";

const resolvers = {
  Query: {
    conversations: async (
      _: any,
      _a: any,
      context: Context
    ): Promise<ConversationPopulated[]> => {
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const conversations = await prisma.conversation.findMany({
          where: {
            participants: { some: { userId: { equals: session.user.id } } },
          },
          include: conversationPopulated,
        });

        return conversations;
      } catch (error: any) {
        console.log("Error creating conversation : ", error.message);
        throw new GraphQLError("Error querying conversations", {
          extensions: { code: 500 },
        });
      }
    },

    // End of Query Object
  },
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantsIds: string[] },
      context: Context
    ): Promise<{ conversationId: string }> => {
      const { prisma, session, pubsub } = context;
      const { participantsIds } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participantsIds.map((id) => ({
                  userId: id,
                  hasSeenLatestMessage: id === session.user.id,
                })),
              },
            },
          },
          include: conversationPopulated,
        });

        // emit a CONVERSATION_CREATED event using pubsub
        pubsub.publish("CONVERSATION_CREATED", {
          conversationCreated: conversation,
        });

        return {
          conversationId: conversation.id,
        };
      } catch (error: any) {
        console.log("Error creating conversation : ", error.message);
        throw new GraphQLError("Error creating conversation", {
          extensions: { code: 500 },
        });
      }
    },

    // End of Mutation Object
  },
  Subscription: {
    conversationCreated: {
      subscribe: (_p: any, _args: any, context: Context) => {
        const { pubsub } = context;
        return pubsub.asyncIterator(["CONVERSATION_CREATED"]);
      },
    },
  },
};

export const participantPopulated =
  Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
      select: {
        id: true,
        username: true,
      },
    },
  });

export const conversationPopulated =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: participantPopulated,
    },
    latestMessage: {
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    },
  });

export default resolvers;
