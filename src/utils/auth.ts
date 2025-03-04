import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub, { type GitHubProfile } from "next-auth/providers/github";
import Google, { type GoogleProfile } from "next-auth/providers/google";
import { prisma } from "@/server/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { loginSchema } from "@/server/schemas/loginSchema";
import { verify } from "argon2";
import { convertNameToUsername } from "./convertNameToUsername";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const creds = await loginSchema.parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: { email: creds.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        if (!user.password) {
          throw new Error("User has not set password. Try other authentication methods instead");
        }

        const isValidPassword = await verify(user.password, creds.password);

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.username,
        };
      },
    }),
    GitHub({
      profile(profile: GitHubProfile) {
        return {
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          username: convertNameToUsername(profile.name),
        };
      },
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      profile(profile: GoogleProfile) {
        return {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: convertNameToUsername(profile.name),
        };
      },
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.userId = token.id as string;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
});
