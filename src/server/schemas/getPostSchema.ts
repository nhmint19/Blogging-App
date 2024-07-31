import { string, object } from "zod";

export const getPostSchema = object({
  id: string(),
  username: string(),
});
