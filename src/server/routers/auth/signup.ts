import { TRPCError } from "@trpc/server";
import { signupSchema } from "../../schemas/signupSchema";
import { publicProcedure } from "../../trpc";
import { hash } from "argon2";
import { prisma } from "../../prisma";

export const signup = publicProcedure.input(signupSchema).mutation(async (opts) => {
  const { input } = opts;
  const { username, name, email, password } = input;

  const emailExists = await prisma.user.findFirst({
    where: { email },
  });

  if (emailExists) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Email already exists.",
    });
  }

  const usernameExists = await prisma.user.findFirst({
    where: { username },
  });

  if (usernameExists) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Username already exists.",
    });
  }

  const hashedPassword = await hash(password);

  await prisma.user.create({
    data: { username, name, email, password: hashedPassword },
  });

  return true;
});
