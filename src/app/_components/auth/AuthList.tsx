"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/_components/core/Button";
import { SignInButton } from "@/app/_components/auth/SignInButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ILogin, loginSchema } from "@/server/schemas/loginSchema";
import { useCallback, useEffect } from "react";
import { trpc } from "@/app/_trpc/client";

export function AuthList({ isNewUser }: { isNewUser: boolean }) {
  const login = trpc.login.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    (data: ILogin) => {
      login.mutate(data);
    },
    [login]
  );

  useEffect(() => {
    if (login.status === "success") {
      location.reload();
    } else if (login.status === "error") {
      setError("root.serverError", { message: login.error.message });
    }
  }, [login, setError]);

  return (
    <div className="flex flex-col items-center h-full w-full p-12">
      <Link href="/">
        <Image src="/logos/logo-l.png" alt="logo" width="60" height="48" />
      </Link>
      <p className="font-bold text-3xl mt-6 mb-2">Join the DEV Community</p>
      <p>DEV Community is a community of 1,793,625 amazing developers</p>
      <div className="w-full max-w-[544px]">
        <div className="py-6 flex flex-col justify-center items-center gap-4">
          <SignInButton logo="/logos/logo-apple.svg" name="Apple" isNewUser />
          <SignInButton logo="/logos/logo-facebook.svg" name="Facebook" isNewUser />
          <SignInButton logo="/logos/logo-forem.svg" name="Forem" isNewUser />
          <SignInButton logo="/logos/logo-github.svg" name="GitHub" isNewUser />
          <SignInButton logo="/logos/logo-google.svg" name="Google" isNewUser />
          <SignInButton logo="/logos/logo-twitter.svg" name="Twitter" isNewUser />
          {isNewUser && (
            <Link href="/users/sign_up?state=email_signup" className="w-full">
              <SignInButton logo="/icons/email.svg" name="Email" isNewUser />
            </Link>
          )}
        </div>

        {!isNewUser && (
          <div className="relative flex items-center w-full mb-2">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-3 font-light text-black">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
        )}

        {!isNewUser && (
          <form
            className="grid gap-2 mb-4"
            onSubmit={handleSubmit(onSubmit)}
            onChange={() => clearErrors("root.serverError")}
          >
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
            <div className="my-2 flex">
              <div className="flex items-center flex-1">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 rounded-lg mr-2 border-gray-300 text-indigo-600 cursor-pointer"
                />
                <label htmlFor="remember-me" className="text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-primary">
                <Link href="/users/password/new">Forgot password?</Link>
              </div>
            </div>
            <Button isPrimary customClass="mt-3 bg-primary text-white" isDisabled={login.isPending}>
              Log in
            </Button>
          </form>
        )}
        <div className="flex justify-center mb-4">
          <p className="text-sm text-gray-500 w-3/4 italic text-center">
            By signing {isNewUser ? "up" : "in"}, you are agreeing to our privacy policy, terms of
            use and code of conduct.
          </p>
        </div>
        <div className="border-t border-gray-400"></div>
        <div className="mt-8 text-center">
          {isNewUser ? (
            <p>
              Already have an account?{" "}
              <Link href="/enter" className="text-primary hover:underline">
                Log in
              </Link>
              .
            </p>
          ) : (
            <p>
              New to DEV Community?{" "}
              <Link href="/enter?state=new-user" className="text-primary hover:underline">
                Create account
              </Link>
              .
            </p>
          )}
          <p>
            <Link href="/" className="text-primary hover:underline">
              Back to home
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
