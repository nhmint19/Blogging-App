import * as z from "zod";
import { string, object } from "zod";

export const createPostSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  title: string({ required_error: "Title is required" }).min(1, "Title is required"),
  content: string(),
});

export type ICreatePost = z.infer<typeof createPostSchema>;
