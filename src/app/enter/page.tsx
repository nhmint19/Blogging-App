import { AuthList } from "@/app/_components/auth/AuthList";
import { auth } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Auth({
  searchParams,
}: {
  searchParams: { state: string | undefined };
}) {
  const { state } = searchParams;
  const isNewUser = state === "new-user";

  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect("/");
  }

  return <AuthList isNewUser={isNewUser} />;
}
