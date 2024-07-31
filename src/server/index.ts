import { router } from "./trpc";
import { signup } from "./routers/auth/signup";
import { login } from "./routers/auth/login";
import { createPost } from "./routers/post/createPost";
import { getPost } from "./routers/post/getPost";
import { getUser } from "./routers/user/getUser";
import { deletePost } from "./routers/post/deletePost";

export const appRouter = router({
  signup,
  login,
  createPost,
  getPost,
  deletePost,
  getUser,
});

export type AppRouter = typeof appRouter;
