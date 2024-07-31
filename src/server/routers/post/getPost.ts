import { prisma } from "@/server/prisma";
import { getPostSchema } from "@/server/schemas/getPostSchema";
import { publicProcedure } from "@/server/trpc";

export const getPost = publicProcedure.input(getPostSchema).query(async (opts) => {
  const { id, username } = opts.input;

  return await prisma.post.findFirst({
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
        },
      },
      title: true,
      content: true,
      imageUrl: true,
      createdAt: true,
    },
    where: {
      id,
      user: {
        username,
      },
    },
  });
});
