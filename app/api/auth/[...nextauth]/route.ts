import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github" 
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@/lib/generated/prisma";
import bcrypt from "bcryptjs";

const pc = new PrismaClient();

const handler = NextAuth({
  providers: [
    // Example: Credentials (email/password) provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {label: "Username", type:"text"},
        password: { label: "Password", type: "password" }
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined,
        req
      ) {
        if (!credentials) {
          return null;
        }
        const { username, password } = credentials;
        try {
          const user = await pc.user.findUnique({ where: { username } });
          if (!user) {
        return null;
          }
          const isValid = bcrypt.compareSync(password, user.password);
          if (isValid) {
        // NextAuth expects the user object to have an "id" of type string
        return {
          id: user.id.toString(),
          name: user.username,
          email: user.email,
        };
          }
        } catch (error) {
          console.error("Error authorizing user:", error);
        }
        return null;
      }
    }),

    // Example: GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  session: {
    strategy: "jwt", // or "database" if using a DB
  },
  secret: process.env.NEXTAUTH_SECRET, // required in prod
})

export { handler as GET, handler as POST }
