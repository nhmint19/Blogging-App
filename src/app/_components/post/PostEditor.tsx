"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "../core/Button";
import Tiptap from "./Tiptap";
import { createPostSchema, ICreatePost } from "@/server/schemas/createPostSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";

export default function PostEditor({ email }: { email: string }) {
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
    setValue,
  } = useForm<ICreatePost>({
    resolver: zodResolver(createPostSchema),
  });

  const createPost = trpc.createPost.useMutation();

  const onSubmit = useCallback(
    (data: ICreatePost) => {
      createPost.mutate(data);
    },
    [createPost]
  );

  useEffect(() => {
    setValue("content", content, { shouldValidate: true });
    setValue("email", email, { shouldValidate: true });
  }, [setValue, content, email]);

  useEffect(() => {
    if (createPost.status === "success") {
      const { user, id } = createPost.data;
      router.push(`/${user.username}/${id}`);
    } else if (createPost.status === "error") {
      setError("root.serverError", { message: createPost.error.message });
    }
  }, [createPost.data, createPost.status, createPost.error, setError, router]);

  return (
    <div className="flex flex-col items-end">
      <div className="w-11/12 min-h-[600px] card p-0">
        <form
          className="px-8"
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => clearErrors("root.serverError")}
        >
          {/* <input type="file"></input> */}
          <input
            type="text"
            placeholder="New post title here..."
            className="border-none placeholder-gray-600 text-5xl font-extrabold ring-0 focus:ring-0"
            {...register("title")}
          />
          {errors.title && <p className="input-error ml-3">{errors.title.message}</p>}
          <Tiptap onChange={(newContent: string) => setContent(newContent)} />
          {errors.content && <p className="input-error ml-3">{errors.content.message}</p>}
          <div className="absolute bottom-6 -ml-12">
            <Button
              isPrimary
              customClass="bg-primary text-white hover:brightness-95"
              noUnderline
              type="submit"
            >
              Publish
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
