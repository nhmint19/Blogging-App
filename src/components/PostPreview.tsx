import Image from "next/image";
import Link from "next/link";
import { Button } from "./base/Button";

export default function PostPreview({
  data,
  showImage,
}: {
  data: {
    author: string;
    avatarUrl?: string;
    date: string;
    title: string;
    tags: string[];
    imageUrl?: string;
    postUrl: string;
  };
  showImage?: boolean;
}) {
  const { author, avatarUrl, date, title, tags, imageUrl, postUrl } = data;

  return (
    <div className="card !p-0">
      <div className="w-full">
        {imageUrl && <Image src={imageUrl} width="500" height="650" alt="preview" className="w-full rounded-t-md" />}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="border border-gray-300 w-8 h-8 rounded-full">
            {avatarUrl && <Image src={avatarUrl} alt="U" width="32" height="32" />}
          </div>
          <div>
            <p className="text-sm font-semibold">{author}</p>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
        <div className="mx-10">
          <div className="text-3xl font-bold hover:text-primary">
            <Link href={postUrl}>{title}</Link>
          </div>
          <div className="flex gap-2 text-sm py-2">
            {tags.map((tag, id) => (
              <Button withPadding={false} customClass="hover:bg-white" key={id}>
                <span>#{tag}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
