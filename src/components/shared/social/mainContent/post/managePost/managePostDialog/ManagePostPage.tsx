import UserAvatar from "@/components/shared/social/UserAvatar";
import {
  useCreatePost,
  useEditPost
} from "@/services/social/queries/socialQueries";
import { UseTipTapEditorReturnType } from "@/utils/hooks/useTipTapEditor";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
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
  Lock
} from "lucide-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { TPost } from "@/utils/types/social/social";
import { isEqual } from "radash";
import ErrorDialog from "@/components/shared/ErrorDialog";

type EditPostProps = {
  type: "edit";
  postToEdit: TPost;
};

type CreatePostProps = {
  type: "create";
};

type ManagePostPageProps = {
  tipTapEditor: UseTipTapEditorReturnType;
} & (EditPostProps | CreatePostProps);

export default function ManagePostPage({
  tipTapEditor,
  ...props
}: ManagePostPageProps) {
  const { editor, editorContentRef, editorContentInitialHeight, inputText } =
    tipTapEditor;
  const currentUser = useAuthStore((state) => state.currentUser);

  const tempMediaAttachment = tempCollectionItems[1].media;
  const [setManagePostPage, selectedPrivacy] = useManagePostStore(
    useShallow((state) => [state.setManagePostPage, state.selectedPrivacy])
  );
  const [toggleOpenDialog, toggleOpenDialogSecondary] = useGlobalStore(
    useShallow((state) => [
      state.toggleOpenDialog,
      state.toggleOpenDialogSecondary
    ])
  );
  const [isTempMediaAttached, setIsTempMediaAttached] = useState(false);

  const {
    mutateAsync: createPost,
    status: createPostStatus,
    error: createPostError
  } = useCreatePost();
  const {
    mutateAsync: editPost,
    status: editPostStatus,
    error: editPostError
  } = useEditPost();

  useEffect(() => {
    if (createPostError) {
      toggleOpenDialogSecondary(
        <ErrorDialog
          error={createPostError}
          okButtonAction={() => toggleOpenDialogSecondary(null)}
        />
      );
    }

    if (editPostError) {
      toggleOpenDialogSecondary(
        <ErrorDialog
          error={editPostError}
          okButtonAction={() => toggleOpenDialogSecondary(null)}
        />
      );
    }
  }, [createPostError, editPostError]);

  if (!currentUser) return <Navigate to="/login" replace />;

  let editedPost: TPost;
  let originalPost: TPost;
  let editPostNoChanges: boolean = false;

  if (props.type === "edit") {
    editedPost = {
      ...props.postToEdit,
      content: inputText,
      collection: null, //todo: should be selectedCollection
      media: null, //todo: should be selectedMedia
      privacy: selectedPrivacy
    };
    originalPost = props.postToEdit;
    editPostNoChanges = isEqual(editedPost, originalPost);
  }

  return (
    <div className="flex flex-col flex-grow w-full justify-between gap-3 p-4">
      <div className="flex items-center w-full gap-3">
        <UserAvatar src={currentUser.avatar} imageClassName="size-12" />
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <p>{currentUser.username}</p>
            <p className="text-socialTextSecondary">@{currentUser.handle}</p>
          </div>
          <button
            onClick={() => setManagePostPage("selectPrivacy")}
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
          maxHeight: editorContentInitialHeight || "auto"
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
      {props.type === "create" ? (
        <button
          onClick={async () => {
            await createPost({
              owner: currentUser,
              collectionId: null,
              content: inputText,
              media: null,
              privacy: selectedPrivacy
            });
            toggleOpenDialog(null);
          }}
          disabled={!inputText || createPostStatus === "pending"}
          className="grid py-2 font-semibold transition-colors disabled:bg-gray-700 disabled:text-socialTextSecondary bg-mainAccent rounded-xl place-items-center text-mainWhite"
        >
          {createPostStatus === "pending" ? "Posting..." : "Post"}
        </button>
      ) : (
        <button
          onClick={async () => {
            if (!editPostNoChanges) {
              await editPost(editedPost);
            }
            toggleOpenDialog(null);
          }}
          //todo: disabled should have (!selectedCollection && !selectedMedia && !inputText)
          disabled={
            !inputText || editPostStatus === "pending" || editPostNoChanges
          }
          className="grid py-2 font-semibold transition-colors disabled:bg-gray-700 disabled:text-socialTextSecondary bg-mainAccent rounded-xl place-items-center text-mainWhite"
        >
          {editPostStatus === "pending" ? "Saving..." : "Save"}
        </button>
      )}
    </div>
  );
}
