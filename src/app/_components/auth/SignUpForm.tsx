"use client";

import { Button } from "@/app/_components/core/Button";
import { trpc } from "@/app/_trpc/client";
import { type ISignUp, signupSchema } from "@/server/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";

export default function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<ISignUp>({
    resolver: zodResolver(signupSchema),
  });

  const signup = trpc.signup.useMutation();

  const onSubmit = useCallback(
    (data: ISignUp) => {
      signup.mutate(data);
    },
    [signup]
  );

  useEffect(() => {
    if (signup.status === "success") {
      router.push("/enter");
    } else if (signup.status === "error") {
      setError("root.serverError", { message: signup.error.message });
    }
  }, [signup.status, signup.error, setError, router]);

  return (
    <div className="flex justify-center">
      <div className="card max-w-[580px] w-full my-10 !py-6 !px-6">
        <h1 className="font-bold text-lg">Create your account</h1>
        <form
          className="grid gap-2 mb-4"
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => clearErrors("root.serverError")}
        >
          <div>
            <label htmlFor="name" className="input-label">
              Name
            </label>
            <div className="mt-2">
              <input id="name" type="text" className="input" required {...register("name")} />
              {errors.name && <p className="input-error">{errors.name.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="username" className="input-label">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="text"
                className="input"
                required
                {...register("username")}
              />
              {errors.username && <p className="input-error">{errors.username.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="input"
                required
                {...register("email")}
              />
              {errors.email && <p className="input-error">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                className="input"
                required
                {...register("password")}
              />
              {errors.password && <p className="input-error">{errors.password.message}</p>}
            </div>
          </div>
          {errors.root?.serverError && (
            <p className="input-error">Error: {errors.root.serverError.message}</p>
          )}
          <div className="w-full mt-3 flex gap-3">
            <Button
              isPrimary
              customClass=" bg-primary text-white"
              type="submit"
              isDisabled={signup.status === "pending"}
            >
              Sign up
            </Button>
            <Button route="/">Back to Home</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
