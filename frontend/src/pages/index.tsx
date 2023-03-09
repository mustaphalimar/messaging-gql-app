import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Box } from "@chakra-ui/react";

import Auth from "@/components/Auth/Auth";
import Chat from "@/components/Chat/Chat";

interface Props {
  session: Session;
}

export default function Home({}: Props) {
  const { data: session } = useSession();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  console.log(session);

  return (
    <Box>
      {session?.user.username ? (
        <Chat />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  // using getSession instead of useSession since this will run on the server, therefore we can't use hooks.
  const session = (await getSession(context)) as Session;

  return {
    props: {
      session,
    },
  };
}
