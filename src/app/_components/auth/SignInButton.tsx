import Image from "next/image";

export function SignInButton({
  logo,
  name,
  isNewUser,
}: {
  logo: string;
  name: string;
  isNewUser: boolean;
}) {
  const isNewUserText = isNewUser ? "Sign up with" : "Continue with";

  return (
    <button className="border flex rounded-md w-full border-gray-300 px-3 py-[10px] hover:bg-gray-100">
      <Image src={logo} alt="name" width="24" height="24" />
      <span className="flex-1 text-center font-semibold text-sm">
        {isNewUserText} {name}
      </span>
    </button>
  );
}
