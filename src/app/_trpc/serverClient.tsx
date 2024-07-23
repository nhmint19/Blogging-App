import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@/server";
import { createCallerFactory } from "@/server/trpc";

// Support server side tRPC calls
const createCaller = createCallerFactory(appRouter);

export const serverClient = createCaller({
  links: [
    httpBatchLink({
      url: process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/trpc`
        : "http://localhost:3000/api/trpc",
    }),
  ],
});
