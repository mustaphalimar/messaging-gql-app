import { PrismaClient } from "@prisma/client";
import { ISODateString } from "next-auth";

export interface Context {
  session: Session | null;
  prisma: PrismaClient;
  // pubsub
}

export interface User {
  id: string;
  username: string;
  image: string;
  email: string;
  name: string;
  emailVerified: Date;
}

export interface Session {
  user: User;
  expires: ISODateString;
}

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}
