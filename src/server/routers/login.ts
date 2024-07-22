import { publicProcedure } from "../trpc";
import { loginSchema } from "../schemas/loginSchema";
import { signIn } from "@/app/api/auth/[...nextauth]/route";
import { AuthError } from "next-auth";

export const login = publicProcedure
  .input(loginSchema)
  .mutation(async (opts) => {
    const { input } = opts;
    try {
      await signIn("credentials", { ...input, redirect: false });
      return true;
    } catch (error) {
      if (error instanceof AuthError) {
        const msg = error.cause?.err?.message;
        if (msg) throw new Error(msg);
        throw new Error(error.message);
      }
      throw error;
    }
  });
