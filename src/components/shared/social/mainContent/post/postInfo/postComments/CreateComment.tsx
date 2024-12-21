import { useTipTapEditor } from "@/utils/hooks/useTipTapEditor";
import { SendHorizonal, Smile } from "lucide-react";
import { EditorContent } from "@tiptap/react";
import UserAvatar from "@/components/shared/social/UserAvatar";
import { EntityOwner } from "@/utils/types/social/shared";

type CreateCommentProps = {
  author: EntityOwner;
};

export default function CreateComment({ author }: CreateCommentProps) {
  const { editor, editorContentInitialWidth, editorContentRef } =
    useTipTapEditor({
      focusOnMount: false,
      placeholder: "Write a comment...",
      maxLength: 200,
    });

  return (
    <div className="flex items-center gap-2 px-3 mobile-m:px-5">
      <UserAvatar
        src={author.avatar ?? "/no-image-2.jpg"}
        className="hidden sm:block"
      />
      <div className="relative flex items-end w-full">
        <div className="w-full">
          <EditorContent
            style={{
              maxWidth: editorContentInitialWidth || "auto",
            }}
            ref={editorContentRef}
            editor={editor}
            className="min-w-full py-2 pl-4 pr-8 overflow-y-auto text-sm border hide-scrollbar md:pr-12 mobile-l:text-base rounded-2xl max-h-52 border-socialTextSecondary/50 lg:border-socialTextSecondary/80"
          />
          <button className="absolute top-2 right-3 group">
            <Smile className="size-6 stroke-socialTextSecondary group-hover:stroke-gray-400" />
          </button>
        </div>
      </div>
      <button className="self-start mt-1 sm:mt-[7px] group">
        <SendHorizonal className="stroke-1 size-8 stroke-mainAccent group-hover:fill-mainAccent" />
      </button>
    </div>
  );
}
