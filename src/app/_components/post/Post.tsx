"use client";

import { trpc } from "@/app/_trpc/client";
import { convertISOStringToDate } from "@/utils/convertISOStringToDate";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Ellipsis, Heart, MessageCircle } from "lucide-react";
import { Button } from "../core/Button";
import TempDiscussion from "../temp/TempDiscussion";
import { useRouter } from "next/navigation";

export function Post({
  id,
  currentUserEmail,
  username,
}: {
  id: string;
  currentUserEmail: string;
  username: string;
}) {
  const post = trpc.getPost.useQuery({ id, username: username });
  const { user, title, content, imageUrl, createdAt } = post.data || {};
  const { image: avatarUrl, name: author, createdAt: joinDate, email } = user || {};

  const deletePost = trpc.deletePost.useMutation();
  const router = useRouter();

  return (
    <div className="flex p-4 bg-bgPrimary min-h-screen gap-4 justify-center">
      <div className="flex flex-col min-w-10 gap-5 px-4 pt-10">
        <div className="flex flex-col items-center">
          <Heart />
          <span>100</span>
        </div>
        <div className="flex flex-col items-center">
          <MessageCircle />
          <span>15</span>
        </div>
        <div className="flex flex-col items-center">
          <Bookmark />
          <span>20</span>
        </div>
        <div>
          <Ellipsis />
        </div>
      </div>
      <div className="w-[60%] h-full">
        <div className="card !p-0 min-h-[600px] relative">
          {email === currentUserEmail && (
            <div className="absolute top-6 right-6">
              <Button
                customClass="bg-tertiary text-black"
                noUnderline
                onClick={async () => {
                  await deletePost.mutate({ id });
                  router.push("/");
                }}
              >
                Delete
              </Button>
            </div>
          )}
          {imageUrl && (
            <div className="w-full">
              <Image
                src={imageUrl}
                width="500"
                height="650"
                alt="preview"
                className="w-full rounded-t-md"
              />
            </div>
          )}
          <div className="py-4 px-16">
            <div className="flex items-center gap-2">
              <div className="border border-gray-300 w-8 h-8 rounded-full">
                {avatarUrl && (
                  <Image src={avatarUrl} alt="U" width="32" height="32" className="rounded-full" />
                )}
              </div>
              <div>
                <Link href={`/${username}`}>
                  <p className="text-sm font-semibold cursor-pointer hover:text-primary">
                    {author}
                  </p>
                </Link>
                <p className="text-xs text-gray-500">
                  Posted on {createdAt ? convertISOStringToDate(createdAt) : "unknown"}
                </p>
              </div>
            </div>
            <div className="py-4">
              <div className="text-4xl font-extrabold">{title}</div>
            </div>
            <div>{content}</div>
          </div>
        </div>
      </div>
      <div className="w-[25%] flex flex-col gap-4">
        <div className="card !pt-0 !px-0">
          <div className="flex items-end gap-2 half-bg rounded-t-md p-2">
            <div className="border border-black w-14 h-14 rounded-full ">
              {avatarUrl && (
                <Image src={avatarUrl} alt="U" width="56" height="56" className="rounded-full" />
              )}
            </div>
            <Link href={`/${username}`}>
              <div className="title cursor-pointer hover:text-primary">{author}</div>
            </Link>
          </div>
          <div className="px-4 grid grid-flow-row gap-3">
            <Button
              isFullWidth
              isPrimary
              customClass="bg-primary text-white hover:brightness-90"
              noUnderline
            >
              Follow
            </Button>
            <div>Full-stack developer</div>
            <div>
              <p className="font-bold text-xs">LOCATION</p>
              <p>Australia</p>
            </div>
            <div>
              <p className="font-bold text-xs">JOINED</p>
              <p>{joinDate ? convertISOStringToDate(joinDate) : "unknown"}</p>
            </div>
          </div>
        </div>
        <TempDiscussion />
      </div>
    </div>
  );
}
