import { AuthList } from "@/app/_components/auth/AuthList";
import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import SignUpForm from "@/app/_components/auth/SignUpForm";

export default async function SignUp({
  searchParams,
}: {
  searchParams: { state: string | undefined };
}) {
  const { state } = searchParams;
  const isSignUp = state === "email_signup";

  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect("/");
  }

  if (!isSignUp) {
    return <AuthList isNewUser={isSignUp} />;
  }

  return <SignUpForm />;
}
