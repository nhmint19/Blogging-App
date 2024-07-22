import Link from "next/link";
import { Button } from "./base/Button";
import { SearchBar } from "./SearchBar";
import Image from "next/image";

export function NavBar() {
  return (
    <div className="h-[56px] flex justify-center border-b shadow-sm">
      <div className="w-full max-w-[1380px] flex px-4 py-2 items-center ">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width="50" height="40" />
        </Link>
        <SearchBar />
        <div className="flex justify-end flex-1 gap-2">
          <Button>Log in</Button>
          <Button isPrimary>Create account</Button>
        </div>
      </div>
    </div>
  );
}
