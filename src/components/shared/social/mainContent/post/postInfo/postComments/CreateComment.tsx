import { useTipTapEditor } from "@/utils/hooks/useTipTapEditor";
import { SendHorizonal, Smile } from "lucide-react";
import { EditorContent } from "@tiptap/react";

export default function CreateComment() {
  const { editor, editorContentInitialWidth, editorContentRef, inputLength } =
    useTipTapEditor({
      placeholder: "Write a comment...",
      maxLength: 200,
    });

  return (
    <div className="flex items-center gap-4 px-5">
      <img
        src="/sample-user-pfp.png"
        className="self-start object-cover rounded-full size-12"
      />
      <div className="relative flex items-end w-full">
        <div className="w-full">
          <EditorContent
            style={{
              maxWidth: editorContentInitialWidth,
            }}
            ref={editorContentRef}
            editor={editor}
            className="min-w-full py-2 pl-4 pr-12 overflow-y-auto border rounded-2xl max-h-52 border-socialTextSecondary/80"
          />
          <button className="absolute top-2 right-3 group">
            <Smile className="size-6 stroke-socialTextSecondary group-hover:stroke-gray-400" />
          </button>
          <p className="absolute text-xs right-1 -bottom-6 text-socialTextSecondary">
            {inputLength}
            <span>/200</span>
          </p>
        </div>
      </div>
      <button className="self-start mt-[7px] group">
        <SendHorizonal className="stroke-1 size-8 stroke-mainAccent group-hover:fill-mainAccent" />
      </button>
    </div>
  );
}
