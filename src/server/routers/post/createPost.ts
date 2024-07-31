import { createPostSchema } from "@/server/schemas/createPostSchema";
import { publicProcedure } from "../../trpc";
import { prisma } from "@/server/prisma";
import { TRPCError } from "@trpc/server";

export const createPost = publicProcedure.input(createPostSchema).mutation(async (opts) => {
  const { input } = opts;
  const { email, title, content } = input;

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "No user found.",
    });
  }

  const post = await prisma.post.create({
    select: { id: true, user: { select: { id: true, username: true } } },
    data: { userId: user.id, title, content },
  });

  return post;
});
