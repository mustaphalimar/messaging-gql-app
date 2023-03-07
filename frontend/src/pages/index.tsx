import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  return (
    <div>
      <h1>Hello world </h1>
      <button onClick={() => signIn("google")}>Sign IN</button>
    </div>
  );
}
