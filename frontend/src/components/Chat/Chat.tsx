import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

interface Props {}
export default function Chat({}: Props) {
  return (
    <div>
      <h1>Chat </h1>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
