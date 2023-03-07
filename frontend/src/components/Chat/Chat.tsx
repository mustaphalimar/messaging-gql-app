import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

interface Props {}
export default function Chat({}: Props) {
  return (
    <div>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
