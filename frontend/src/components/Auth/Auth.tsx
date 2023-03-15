import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

import userOperations from "@/graphql/operations/user";

import { CreateUsernameData, CreateUsernameVariables } from "@/utils/types";
import { toast } from "react-hot-toast";

interface Props {
  session: Session | null;
  reloadSession: () => void;
}

export default function Auth({ session, reloadSession }: Props) {
  const [username, setUsername] = useState("");

  const [createUsernameMutation, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(userOperations.Mutations.createUsername);

  console.log("Here is data : ", loading, error);

  const handleSubmit = async () => {
    if (username.length < 3) return alert("Username too short");
    try {
      // createUsername mutation
      const { data } = await createUsernameMutation({
        variables: { username },
      });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
        throw new Error(error);
      }

      setUsername("");
      // Reloading the session to get latest user updates after successfully updated username
      reloadSession();

      toast.success("Username successfully created !🚀 ");
    } catch (error: any) {
      toast.error(error?.message);
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
              isLoading={loading}
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
