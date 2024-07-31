import type { Editor } from "@tiptap/react";
import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { Button } from "../core/Button";
import { ReactElement } from "react";

export function TiptapToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <div className="bg-gray-50 -mx-16 my-2">
      <div className="px-12 h-[56px] flex items-center">
        <TiptapToolBarButton
          editor={editor}
          handleClick={() => editor.chain().focus().toggleBold().run()}
          type="bold"
          icon={<Bold />}
        />
        <TiptapToolBarButton
          editor={editor}
          handleClick={() => editor.chain().focus().toggleItalic().run()}
          type="italic"
          icon={<Italic />}
        />
        <TiptapToolBarButton
          editor={editor}
          handleClick={() => editor.chain().focus().toggleBulletList().run()}
          type="bulletList"
          icon={<List />}
        />
        <TiptapToolBarButton
          editor={editor}
          handleClick={() => editor.chain().focus().toggleOrderedList().run()}
          type="orderedList"
          icon={<ListOrdered />}
        />
      </div>
    </div>
  );
}

export function TiptapToolBarButton({
  editor,
  handleClick,
  type,
  icon,
}: {
  editor: Editor;
  handleClick: () => void;
  type: string;
  icon: ReactElement;
}) {
  return (
    <Button
      withPadding={false}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      customClass={`w-10 h-10 flex justify-center items-center ${
        editor.isActive(type) ? "bg-primary text-white" : ""
      }`}
    >
      {icon}
    </Button>
  );
}
