import { Box, Button } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useQuery } from "@apollo/client";
import ConversationList from "./ConversationList";

import ConversationOperations from "@/graphql/operations/conversation";

interface ConversationsWrapperProps {
  session: Session;
}

import { ConversationsData } from "@/utils/types";
import { signOut } from "next-auth/react";

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  const {
    data: conversationsData,
    loading: conversationsLoading,
    error: conversationsError,
  } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations);

  console.log("Here is data : ", conversationsData);

  return (
    <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6}>
      {/* Skeleton Loader */}
      <Button onClick={() => signOut()}>Sign out</Button>
      <ConversationList
        session={session}
        conversations={conversationsData?.conversations || []}
      />
    </Box>
  );
};

export default ConversationsWrapper;
