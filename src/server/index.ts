import { router } from "./trpc";
import { signup } from "./routers/signup";
import { login } from "./routers/login";

export const appRouter = router({
  signup,
  login,
});

export type AppRouter = typeof appRouter;
