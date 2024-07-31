import * as z from "zod";
import { string, object } from "zod";

export const signupSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
  username: string({ required_error: "Username is required" })
    .min(1, "Username is required")
    .regex(new RegExp(/^[a-zA-Z0-9_.-]*$/), "Username must only contain letters, numbers, - and _"),
  name: string({ required_error: "Name is required" }).min(1, "Name is required"),
});

export type ISignUp = z.infer<typeof signupSchema>;
