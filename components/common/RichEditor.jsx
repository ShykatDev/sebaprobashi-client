"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

const RichTextEditor = ({ content, onChange }, props) => {
  const handleChange = (newContent) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing here...", // Your placeholder text
        placeholderClass: "tiptap-placeholder", // Apply the global class
      }),
    ],
    immediatelyRender:false,
    content: content,
    editorProps: {
      attributes: {
        class:
          "flex flex-col text-sm font-normal p-3 justify-start border-b border-r border-l border-input items-start w-full gap-3 pt-4 rounded-bl-md rounded-br-md outline-none prose placeholder-text-red-400",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full min-h-32">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} content={content} {...props} />
    </div>
  );
};

export default RichTextEditor;
