import { signIn } from "next-auth/react";
import Image from "next/image";

export function SignInButton({
  logo,
  name,
  isNewUser,
  oAuthProvider,
}: {
  logo: string;
  name: string;
  isNewUser: boolean;
  oAuthProvider?: string;
}) {
  const isNewUserText = isNewUser ? "Sign up with" : "Continue with";

  const button = (
    <button className="border flex rounded-md w-full border-gray-300 px-3 py-[10px] hover:bg-gray-100">
      <Image src={logo} alt="name" width="24" height="24" />
      <span className="flex-1 text-center font-semibold text-sm">
        {isNewUserText} {name}
      </span>
    </button>
  );

  return oAuthProvider ? (
    <form
      action={async () => {
        await signIn(oAuthProvider);
      }}
      className="w-full"
    >
      {button}
    </form>
  ) : (
    button
  );
}
