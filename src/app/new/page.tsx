import Link from "next/link";
import Image from "next/image";
import { Button } from "../_components/core/Button";
import PostEditor from "../_components/post/PostEditor";
import { XIcon } from "lucide-react";
import { auth } from "@/utils/auth";

export default async function CreatePost() {
  const session = await auth();
  const user = session?.user!;
  const { email } = user;
  return (
    <div className="bg-bgPrimary h-screen relative">
      <div className="ml-20 max-w-[1000px]">
        <div className="w-full flex px-4 py-2 items-center ">
          <Link href="/">
            <Image src="/logos/logo.png" alt="logo" width="50" height="40" />
          </Link>
          <p className="font-semibold ml-4 flex-1">Create Post</p>
          <div className="flex">
            <Button isFullWidth noUnderline>
              Edit
            </Button>
            <Button isFullWidth noUnderline>
              Preview
            </Button>
          </div>
        </div>
        <PostEditor email={email!} />
      </div>
      <div className="absolute top-2 right-5">
        <Button route="/" withPadding={false}>
          <XIcon />
        </Button>
      </div>
    </div>
  );
}
