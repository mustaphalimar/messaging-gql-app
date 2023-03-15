import React, { FormEvent, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Input,
  Button,
} from "@chakra-ui/react";

import UserOperations from "@/graphql/operations/user";
import ConversationOperations from "@/graphql/operations/conversation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session;
}

import {
  SearchedUser,
  SearchUsersData,
  SearchUsersInput,
  CreateConversationData,
  CreateConversationInput,
} from "@/utils/types";
import UserSearchList from "./UserSearchList";
import Participants from "./Participants";
import { toast } from "react-hot-toast";
import { Session } from "next-auth";

const ConversationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  session,
}) => {
  const [searchUsername, setSearchUsername] = useState("");
  const [participants, setParticipants] = useState<SearchedUser[]>([]);

  // using useLazyQuery instead of simple useQuery, because otherwise this will fire off as soon as the component renders not after searchUsername was provided
  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);

  // Create conversation mutation
  const [createConversation, { loading: ccLoading }] = useMutation<
    CreateConversationData,
    CreateConversationInput
  >(ConversationOperations.Mutations.createConversation);

  const onCreateComversation = async () => {
    try {
      const participantsIds = [
        session.user.id,
        ...participants.map((p) => p.id),
      ];

      const { data, errors } = await createConversation({
        variables: { participantsIds },
      });
      console.log("here is the data : ", data);
    } catch (error: any) {
      console.log("onCreateConversation error");
      toast.error(error?.message);
    }
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    searchUsers({ variables: { username: searchUsername } });
  };

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev) => [...prev, user]);
  };

  const removeParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Create a conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeContent="Enter a username"
                  value={searchUsername}
                  onChange={(e) => setSearchUsername(e.target.value)}
                />
                <Button type="submit" isLoading={loading}>
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UserSearchList
                users={data.searchUsers}
                addParticipant={addParticipant}
              />
            )}

            {participants.length > 0 && (
              <>
                <Participants
                  participants={participants}
                  removePariticipant={removeParticipant}
                />
                <Button
                  bg="brand.100"
                  _hover={{ bg: "brand.100" }}
                  width="100%"
                  mt={6}
                  onClick={onCreateComversation}
                  isLoading={ccLoading}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConversationModal;
