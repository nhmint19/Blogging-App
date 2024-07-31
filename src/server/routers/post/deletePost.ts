import { prisma } from "@/server/prisma";
import { idSchema } from "@/server/schemas/idSchema";
import { publicProcedure } from "@/server/trpc";

export const deletePost = publicProcedure.input(idSchema).mutation(async (opts) => {
  const { id } = opts.input;

  await prisma.post.delete({
    where: {
      id,
    },
  });

  return true;
});
