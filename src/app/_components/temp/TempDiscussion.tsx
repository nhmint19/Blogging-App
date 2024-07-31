import Link from "next/link";

export default function TempDiscussion() {
  return (
    <div className="card">
      <p className="text-secondary text-sm">👋 What&apos;s happening this week</p>
      <p className="title">Challenges</p>
      <div className="border border-black p-3">
        <p>Running until August 18 </p>
        <Link href="/" className="underline text-primary">
          <p className="font-bold">Build Better on Stellar: Smart Contract Challenge</p>
        </Link>
        <p className="italic text-sm">50k in prizes!</p>
      </div>
      <p className="text-secondary">Have a great week ❤️</p>
    </div>
  );
}
