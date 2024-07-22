import Link from "next/link";
import { Button } from "../core/Button";
import { SearchBar } from "./SearchBar";
import Image from "next/image";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { AvatarDropdown } from "./AvatarDropdown";

export async function NavBar() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="h-[56px] flex justify-center border-b shadow-sm">
      <div className="w-full max-w-[1380px] flex px-4 py-2 items-center ">
        <Link href="/">
          <Image src="/logos/logo.png" alt="logo" width="50" height="40" />
        </Link>
        <SearchBar />
        {user ? (
          <div className="flex justify-end flex-1 gap-4">
            <Button isPrimary route="/new">
              Create post
            </Button>
            <AvatarDropdown user={user} />
          </div>
        ) : (
          <div className="flex justify-end flex-1 gap-2">
            <Button route="/enter">Log in</Button>
            <Button isPrimary route="/enter?state=new-user">
              Create account
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
