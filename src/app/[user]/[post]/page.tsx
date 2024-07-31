import { NavBar } from "@/app/_components/home/NavBar";
import { Post } from "@/app/_components/post/Post";
import { auth } from "@/utils/auth";

export default async function PostPage({ params }: { params: { user: string; post: string } }) {
  const { post: id, user: username } = params;

  const session = await auth();
  const currentUser = session?.user!;
  const { email } = currentUser;

  return (
    <div>
      <NavBar />
      <Post id={id} currentUserEmail={email || ""} username={username} />
    </div>
  );
}
