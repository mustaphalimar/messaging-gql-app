import { SearchedUser } from "@/utils/types";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ParticipantsProps {
  participants: SearchedUser[];
  removePariticipant: (id: string) => void;
}

const Participants: React.FC<ParticipantsProps> = ({
  participants,
  removePariticipant,
}) => {
  return (
    <Flex mt={8} gap="10px" flexWrap="wrap" borderTop="1px solid gray" pt={2}>
      {participants.map((p) => {
        return (
          <Stack
            key={p.id}
            direction="row"
            align="center"
            bg="whiteAlpha.200"
            borderRadius={4}
            p={2}
          >
            <Text>{p.username}</Text>
            <IoIosCloseCircleOutline
              size={20}
              cursor="pointer"
              onClick={() => removePariticipant(p.id)}
            />
          </Stack>
        );
      })}
    </Flex>
  );
};
export default Participants;
