import { string, object } from "zod";

export const idSchema = object({
  id: string(),
});
