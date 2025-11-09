import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the `Session` type
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // add your custom id
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
  }
}

// Extend the `JWT` type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
