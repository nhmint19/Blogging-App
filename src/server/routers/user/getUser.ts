import { prisma } from "@/server/prisma";
import { idSchema } from "@/server/schemas/idSchema";
import { publicProcedure } from "@/server/trpc";

export const getUser = publicProcedure.input(idSchema).query(async (opts) => {
  const username = opts.input.id;

  return await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      image: true,
      createdAt: true,
      posts: {
        select: {
          id: true,
          createdAt: true,
          title: true,
          imageUrl: true,
        },
      },
    },
    where: { username },
  });
});
