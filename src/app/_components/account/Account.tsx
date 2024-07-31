"use client";

import { trpc } from "@/app/_trpc/client";
import { convertISOStringToDate } from "@/utils/convertISOStringToDate";
import Image from "next/image";
import { Cake, Ellipsis, HashIcon, MapPin, MessageCircle, ScrollText } from "lucide-react";
import { Button } from "../core/Button";
import TempDiscussion from "../temp/TempDiscussion";
import { PostPreview } from "../home/PostPreview";

export function Account({ id }: { id: string }) {
  const user = trpc.getUser.useQuery({ id });
  const { image: avatarUrl, name, createdAt: joinDate, posts, username } = user.data || {};

  return (
    <div className=" bg-bgPrimary gap-4 min-h-screen">
      <div className="bg-black h-fit w-full flex justify-center p-2">
        <div className=" w-[120px] h-[120px] rounded-full">
          {avatarUrl && (
            <Image
              src={avatarUrl}
              alt="U"
              width="120"
              height="120"
              className="rounded-full z-10 relative border-[8px] border-black"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col items-center z-0">
        <div className="w-[65%] -mt-16 grid grid-cols-12 gap-3">
          <div className="card col-span-12">
            <div className="flex items-center gap-4 justify-end px-2 mb-6">
              <Button
                isPrimary
                customClass=" bg-primary text-white hover:brightness-90"
                noUnderline
              >
                Follow
              </Button>
              <Ellipsis />
            </div>
            <p className="font-bold text-3xl text-center">{name}</p>
            <p className="text-lg text-center">Fullstack developer</p>
            <div className="flex justify-center gap-5 mb-4">
              <div className="flex gap-2 items-center text-gray-500">
                <MapPin /> <span>Australia</span>
              </div>
              <div className="flex gap-2 items-center text-gray-500">
                <Cake />{" "}
                <span>
                  Joined on {joinDate ? convertISOStringToDate(joinDate, true) : "unknown"}
                </span>
              </div>
            </div>
          </div>
          <div className="card col-span-4 h-fit text-gray-500">
            <div className="flex items-center gap-2">
              <ScrollText /> 70 posts published
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle /> 77 comments written
            </div>
            <div className="flex items-center gap-2">
              <HashIcon /> 10 tags followed
            </div>
          </div>
          <div className="col-span-8 grid grid-rows-12 gap-4">
            {posts?.map((post) => (
              <PostPreview
                data={{
                  author: name || "",
                  avatarUrl: avatarUrl || "",
                  date: post?.createdAt,
                  title: post?.title,
                  tags: ["web", "next.js", "keepmoving"],
                  imageUrl: post?.imageUrl || "",
                  postUrl: `/${username}/${post?.id}`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
