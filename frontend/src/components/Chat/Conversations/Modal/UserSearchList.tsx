import { SearchedUser } from "@/utils/types";
import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";

interface UserSearchListProps {
  users: Array<SearchedUser>;
  addParticipant: (user: SearchedUser) => void;
}

const UserSearchList: React.FC<UserSearchListProps> = ({
  users,
  addParticipant,
}) => {
  return (
    <>
      {users.length > 0 ? (
        <Stack mt={6}>
          {users.map((user) => {
            return (
              <Stack
                direction="row"
                key={user.id}
                align="center"
                spacing={4}
                py={2}
                px={4}
                borderRadius={4}
                _hover={{ bg: "whiteAlpha.200" }}
              >
                <Avatar />
                <Flex align="center" justify="space-between" width="100%">
                  <Text>{user.username}</Text>
                  <Button
                    bg="brand.100"
                    _hover={{ bg: "brand.100" }}
                    onClick={() => addParticipant(user)}
                  >
                    Select
                  </Button>
                </Flex>
              </Stack>
            );
          })}
        </Stack>
      ) : (
        <Flex mt={6} justify="center">
          <Text>No users found !</Text>
        </Flex>
      )}
    </>
  );
};
export default UserSearchList;
