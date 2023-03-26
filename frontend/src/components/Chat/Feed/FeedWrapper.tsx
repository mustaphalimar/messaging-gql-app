import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import MessagesHeader from "./Messages/Header";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
  const router = useRouter();

  const { conversationId } = router.query;

  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      width="100%"
      direction="column"
    >
      {conversationId && typeof conversationId === "string" ? (
        <Flex
          direction="column"
          justifyContent="space-between"
          overflow="hidden"
          flexGrow={1}
        >
          <MessagesHeader
            conversationId={conversationId}
            userId={session.user.id}
          />
          {/* <Messages /> */}
        </Flex>
      ) : (
        <>No conversation selected</>
      )}
    </Flex>
  );
};

export default FeedWrapper;
