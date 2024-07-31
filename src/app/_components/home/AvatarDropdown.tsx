"use client";

import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import { Button } from "../core/Button";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { convertNameToUsername } from "@/utils/convertNameToUsername";

export function AvatarDropdown({ user }: { user: User }) {
  const router = useRouter();
  const usernameUri = convertNameToUsername(user.name);

  return (
    <Dropdown
      label={<Avatar alt="User settings" img="/temp-avatar.jpg" rounded size="sm" />}
      arrowIcon={false}
      inline
    >
      <div className="w-[250px] p-2 bg-white">
        <Button isFullWidth onClick={() => router.push(`/${usernameUri}`)}>
          <DropdownHeader className="text-start p-0">
            <span className="block font-bold text-base">{user.name}</span>
            <span className="block text-secondary truncate">{user.email}</span>
          </DropdownHeader>
        </Button>
        <DropdownDivider className="bg-gray-200 h-[1px] my-1" />
        <div className="text-secondary grid gap-2">
          <Button isFullWidth withPadding={false}>
            <DropdownItem className="text-base hover:bg-transparent">Dashboard</DropdownItem>
          </Button>
          <Button isFullWidth withPadding={false} route="/new">
            <DropdownItem className="text-base hover:bg-transparent">Create Post</DropdownItem>
          </Button>
          <Button isFullWidth withPadding={false}>
            <DropdownItem className="text-base hover:bg-transparent">Reading List</DropdownItem>
          </Button>
          <Button isFullWidth withPadding={false}>
            <DropdownItem className="text-base hover:bg-transparent">Settings</DropdownItem>
          </Button>
        </div>
        <DropdownDivider className="bg-gray-200 h-[1px] my-1" />
        <Button isFullWidth withPadding={false} onClick={() => signOut({ callbackUrl: "/" })}>
          <DropdownItem className="text-base hover:bg-transparent">Sign out</DropdownItem>
        </Button>
      </div>
    </Dropdown>
  );
}
