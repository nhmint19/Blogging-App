import { NavBar } from "@/app/_components/home/NavBar";
import { Account } from "../_components/account/Account";

export default async function AccountPage({ params }: { params: { user: string } }) {
  const { user: id } = params;

  return (
    <div>
      <NavBar />
      <Account id={id}/>
    </div>
  );
}
