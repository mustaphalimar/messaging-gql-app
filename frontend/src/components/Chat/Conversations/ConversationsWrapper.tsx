import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useQuery } from "@apollo/client";
import ConversationList from "./ConversationList";

import ConversationOperations from "@/graphql/operations/conversation";

interface ConversationsWrapperProps {
  session: Session;
}

import { ConversationsData } from "@/utils/types";
import { signOut } from "next-auth/react";
import { ConversationPopulated } from "../../../../../backend/src/utils/types";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  const {
    data: conversationsData,
    loading: conversationsLoading,
    error: conversationsError,
    subscribeToMore,
  } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations);
  const router = useRouter();

  // console.log("Query Data : ", conversationsData);

  const onViewConversation = async (conversationId: string) => {
    /**
     * 1. Push the conversationId to the router query params
     */
    router.push({ query: { conversationId } });

    /**
     * 2. Mark the conversation as read
     */
  };

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationPopulated };
          };
        }
      ) => {
        if (!subscriptionData.data) return prev;

        console.log("Subscription Data : ", subscriptionData);

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  useEffect(() => {
    subscribeToNewConversations();
  }, []);

  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
      // display={{
      //   base: router.query.conversationId ? "flex" : "none",
      //   md: "flex",
      // }}
    >
      {/* Skeleton Loader */}
      <Flex alignItems="center" justifyContent="center">
        <Text>{session.user.username}</Text>
        <Button onClick={() => signOut()}>Sign out</Button>
      </Flex>
      <ConversationList
        session={session}
        conversations={conversationsData?.conversations || []}
        onViewConversation={onViewConversation}
      />
    </Box>
  );
};

export default ConversationsWrapper;
