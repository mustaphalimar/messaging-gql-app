import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { ConversationPopulated } from "../../../../../backend/src/utils/types";
import ConversationItem from "./ConversationItem";

import ConversationModal from "./Modal/Modal";

interface ConversationListProps {
  session: Session;
  conversations: ConversationPopulated[];
  onViewConversation: (conversationId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  session,
  conversations,
  onViewConversation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { id: userId } = session.user;

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Box width="100%">
      <Box
        py={2}
        px={4}
        m={2}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Find or start a conversation
        </Text>
      </Box>
      <ConversationModal isOpen={isOpen} onClose={onClose} session={session} />
      {conversations.map((conversation) => {
        return (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            userId={userId}
            onClick={() => onViewConversation(conversation.id)}
            isSelected={conversation.id === router.query.conversationId}
          />
        );
      })}
    </Box>
  );
};
export default ConversationList;
