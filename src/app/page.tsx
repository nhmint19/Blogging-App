import { Button } from "@/app/_components/core/Button";
import { NavBar } from "@/app/_components/home/NavBar";
import { PostPreview } from "@/app/_components/home/PostPreview";
import Link from "next/link";
import { auth } from "@/utils/auth";
import NavigationDrawer from "./_components/home/NavigationDrawer";
import TempDiscussion from "./_components/temp/TempDiscussion";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  console.log(user);

  return (
    <div>
      <NavBar />
      <div className="flex justify-center py-4 px-2 h-full bg-bgPrimary">
        <div className="flex w-full max-w-[1350px] gap-2">
          {/* Navigation drawer */}
          <aside className="w-[240px]">
            <div className="card">
              <p className="title">DEV Community is a community of 1,793,625 amazing developers</p>
              <p className="text-secondary">
                We&apos;re a place where coders share, stay up-to-date and grow their careers.
              </p>
              {!user && (
                <div className="grid gap-1">
                  <Button isPrimary isFullWidth route="/enter?state=new-user">
                    Create account
                  </Button>
                  <Button isFullWidth route="/enter">
                    Log in
                  </Button>
                </div>
              )}
            </div>
            <div className="py-2">
              <NavigationDrawer />
            </div>
          </aside>
          <div className="flex flex-1">
            <div className="flex-1">
              {/* Posts */}
              <div className="grid px-2 gap-2">
                {/* Tabs */}
                <div className="flex text-lg">
                  <Button noUnderline customClass="font-bold text-black">
                    Relevant
                  </Button>
                  <Button noUnderline>Latest</Button>
                  <Button noUnderline>Top</Button>
                </div>
                {/* Dummy data */}
                <PostPreview
                  data={{
                    author: "Minh Nguyen",
                    date: "Jul 22",
                    title: "How coding makes you sleep well",
                    tags: ["devto", "sample", "dummy"],
                    postUrl: "/",
                    imageUrl: "/thumbnail.png",
                  }}
                />
                <PostPreview
                  data={{
                    author: "Minh Nguyen",
                    date: "Jul 22",
                    title: "How coding makes you sleep unwell (Bad coding only)",
                    tags: ["devto", "sample", "dummy"],
                    postUrl: "/",
                  }}
                />
              </div>
            </div>
            <div className="w-1/3">
              {/* Discussion and billboard */}
              <TempDiscussion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
