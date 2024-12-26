import UserAvatar from "@/components/shared/social/UserAvatar";
import { useCreatePost } from "@/services/auth/socialQueries";
import { useTipTapEditor } from "@/utils/hooks/useTipTapEditor";
import { useAuthStore } from "@/utils/stores/authStore";
import { useCreatePostStore } from "@/utils/stores/createPostStore";
import { useGlobalStore } from "@/utils/stores/globalStore";
import { tempCollectionItems } from "@/utils/variables/temp";
import { Navigate } from "@tanstack/react-router";
import { EditorContent } from "@tiptap/react";
import {
  Globe,
  ChevronDown,
  X,
  Paperclip,
  Smile,
  Users,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function CreatePostPage() {
  const tempMediaAttachment = tempCollectionItems[1].media;
  const [setCreatePostPage, selectedPrivacy] = useCreatePostStore(
    useShallow((state) => [state.setCreatePostPage, state.selectedPrivacy])
  );
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;

  const { editor, editorContentRef, editorContentInitialHeight, inputText } =
    useTipTapEditor({
      focusOnMount: true,
      maxLength: 500,
      placeholder: `What's the vibe today, ${currentUser.username.split(" ").slice(0, 2)}?`,
      editorProps: {
        attributes: {
          class: "flex-grow h-full",
        },
      },
    });

  const { mutateAsync: createPost, status: createPostStatus } = useCreatePost();

  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const [isTempMediaAttached, setIsTempMediaAttached] = useState(false);

  return (
    <div className="flex flex-col flex-grow w-full gap-4 p-4">
      <div className="flex items-center w-full gap-3">
        <UserAvatar
          src={currentUser.avatar ?? "/no-image.jpg"}
          imageClassName="size-12"
        />
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <p>{currentUser.username}</p>
            <p className="text-socialTextSecondary">@{currentUser.handle}</p>
          </div>
          <button
            onClick={() => setCreatePostPage("selectPrivacy")}
            className="flex items-center rounded-full gap-1 px-2 py-1 bg-gray-800 hover:bg-[#323b4a]"
          >
            {selectedPrivacy === "PUBLIC" ? (
              <Globe className="size-3 stroke-mainWhite" />
            ) : selectedPrivacy === "FRIENDS_ONLY" ? (
              <Users className="size-3 stroke-mainWhite" />
            ) : (
              <Lock className="size-3 stroke-mainWhite" />
            )}
            <p className="text-xs font-medium">
              {selectedPrivacy === "PUBLIC"
                ? "Public"
                : selectedPrivacy === "FRIENDS_ONLY"
                  ? "Friends"
                  : "Only Me"}
            </p>
            <ChevronDown className="size-4 stroke-mainWhite" />
          </button>
        </div>
      </div>
      <EditorContent
        ref={editorContentRef}
        editor={editor}
        style={{
          maxHeight: editorContentInitialHeight || "auto",
        }}
        className="relative flex-grow w-full h-full overflow-y-auto text-lg"
      />
      <div className="flex items-center justify-between w-full">
        {isTempMediaAttached ? (
          <div className="relative text-start rounded-lg w-[50%] flex items-center gap-3 p-3 border-[0.5px] border-socialTextSecondary">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsTempMediaAttached(false);
              }}
              className="box-content absolute p-1 rounded-full -top-3 -left-2 bg-socialTextSecondary"
            >
              <X className="stroke-mainWhite size-4" />
            </button>
            <img
              src={tempMediaAttachment.posterImage ?? "/no-image-2.jpg"}
              className="aspect-[3/4] h-16 object-cover rounded-md"
            />
            <div className="flex flex-col gap-1">
              <p className="font-medium line-clamp-1">
                {tempMediaAttachment.title}
              </p>
              <p className="text-2xs line-clamp-2 text-socialTextSecondary">
                {tempMediaAttachment.description}
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsTempMediaAttached(true)}
            className="flex gap-2 px-3 py-2 transition-colors rounded-full hover:bg-mainAccent bg-socialTextSecondary"
          >
            <Paperclip className="transition-colors stroke-mainWhite size-4" />
            <p className="text-xs font-medium">Attach</p>
            <ChevronDown className="stroke-mainWhite size-4" />
          </button>
        )}
        <Smile className="box-content self-start p-2 transition-colors stroke-socialTextSecondary size-7 hover:cursor-pointer hover:stroke-mainAccent" />
      </div>
      <button
        onClick={async () => {
          await createPost({
            owner: currentUser,
            collectionId: null,
            content: inputText,
            media: null,
            privacy: selectedPrivacy,
          });
          toggleOpenDialog(null);
        }}
        disabled={!inputText || createPostStatus === "pending"}
        className="grid py-2 font-semibold transition-colors disabled:bg-gray-700 disabled:text-socialTextSecondary bg-mainAccent rounded-xl place-items-center text-mainWhite"
      >
        {createPostStatus === "pending" ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
