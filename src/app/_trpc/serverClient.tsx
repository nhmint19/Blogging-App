import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@/server";
import { createCallerFactory } from "@/server/trpc";

// Support server side tRPC calls
const createCaller = createCallerFactory(appRouter);

export const serverClient = createCaller({
  links: [
    httpBatchLink({
      url: `http://localhost:3000/api/trpc`,
    }),
  ],
});
