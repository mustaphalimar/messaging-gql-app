import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface Props {
  session: Session | null;
  reloadSession: () => void;
}

export default function Auth({ session, reloadSession }: Props) {
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    try {
      // createUsername mutation
    } catch (error) {
      console.log("handleSubmit Error : ", error);
    }
  };

  return (
    <Center height="100vh">
      <Stack align="center" spacing={8}>
        {session ? (
          <>
            <Text fontSize="3xl">Create Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button width="100%" onClick={handleSubmit}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">MessangerQL</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                  width={"20px"}
                  height={"20px"}
                />
              }
            >
              Continue With Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
}
