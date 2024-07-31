"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { TiptapToolbar } from "./TiptapToolbar";

const Tiptap = ({ onChange }: { onChange: (content: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your post content here …",
      }),
    ],
    editorProps: {
      attributes: {
        class: "w-full focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getText());
    },
  });

  return (
    <div className="w-full px-4">
      <TiptapToolbar editor={editor} />
      <EditorContent
        className="whitespace-pre-line pt-2"
        style={{ whiteSpace: "pre-line" }}
        editor={editor}
      />
    </div>
  );
};

export default Tiptap;
