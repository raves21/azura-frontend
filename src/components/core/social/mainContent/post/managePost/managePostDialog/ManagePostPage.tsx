import UserAvatar from "@/components/core/social/UserAvatar";
import {
  useCreatePost,
  useEditPost,
} from "@/services/social/queries/socialQueries";
import { UseTipTapEditorReturnType } from "@/utils/hooks/useTipTapEditor";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Navigate } from "@tanstack/react-router";
import { EditorContent } from "@tiptap/react";
import {
  Globe,
  ChevronDown,
  Paperclip,
  Smile,
  Users,
  Lock,
  Film,
  LibraryBig,
  ChevronUp,
} from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { TPost } from "@/utils/types/social/social";
import { isEqual } from "radash";
import ErrorDialog from "@/components/core/ErrorDialog";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import CollectionAttachment from "./postAttachment/collectionAttachment/CollectionAttachment";
import MediaAttachment from "./postAttachment/mediaAttachment/MediaAttachment";

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
  const {
    editor: editor,
    editorContentRef,
    editorContentInitialHeight,
    inputText,
  } = tipTapEditor;
  const currentUser = useAuthStore((state) => state.currentUser);

  const [
    setManagePostPage,
    selectedPrivacy,
    mediaAttachment,
    collectionAttachment,
  ] = useManagePostStore(
    useShallow((state) => [
      state.setManagePostPage,
      state.selectedPrivacy,
      state.mediaAttachment,
      state.collectionAttachment,
    ])
  );
  const [toggleOpenDialog, toggleOpenDialogSecondary] = useGlobalStore(
    useShallow((state) => [
      state.toggleOpenDialog,
      state.toggleOpenDialogSecondary,
    ])
  );

  const {
    mutateAsync: createPost,
    status: createPostStatus,
    error: createPostError,
  } = useCreatePost();
  const {
    mutateAsync: editPost,
    status: editPostStatus,
    error: editPostError,
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
      content: inputText?.trim() ?? null,
      collection: collectionAttachment,
      media: mediaAttachment,
      privacy: selectedPrivacy,
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
          maxHeight: editorContentInitialHeight || "auto",
        }}
        className="relative flex-grow w-full h-full overflow-y-auto text-lg"
      />
      <div className="flex items-center justify-between w-full">
        {mediaAttachment ? (
          <MediaAttachment media={mediaAttachment} />
        ) : collectionAttachment ? (
          <CollectionAttachment collection={collectionAttachment} />
        ) : (
          <Menu>
            <MenuButton className="flex gap-2 px-3 py-2 transition-colors  rounded-full bg-mainAccent hover:bg-fuchsia-800">
              <Paperclip className="transition-colors stroke-mainWhite size-4" />
              <p className="text-xs font-medium">Attach</p>
              <ChevronUp className="stroke-mainWhite size-4" />
            </MenuButton>
            <MenuItems
              transition
              anchor="top start"
              className="min-w-52 font-montserrat border border-gray-700 bg-socialPrimary origin-top-right rounded-md text-sm/6 text-mainWhite transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <button
                  onClick={() => setManagePostPage("selectMediaAttachment")}
                  className="group bg-socialPrimary flex w-full items-center gap-2 rounded-lg py-2 px-3 data-[focus]:bg-white/10"
                >
                  <Film className="size-4 fill-white/30" />
                  Media
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() =>
                    setManagePostPage("selectCollectionAttachment")
                  }
                  className="group flex bg-socialPrimary w-full items-center gap-2 rounded-lg py-2 px-3 data-[focus]:bg-white/10"
                >
                  <LibraryBig className="size-4 fill-white/30" />
                  Collection
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        )}
        <Smile className="box-content self-start p-2 transition-colors stroke-socialTextSecondary size-7 hover:cursor-pointer hover:stroke-mainAccent" />
      </div>
      {props.type === "create" ? (
        <button
          onClick={async () => {
            await createPost({
              owner: currentUser,
              collectionId: collectionAttachment?.id ?? null,
              content: inputText,
              media: mediaAttachment,
              privacy: selectedPrivacy,
              currentUserHandle: currentUser.handle,
            });
            toggleOpenDialog(null);
          }}
          disabled={
            (!inputText && !collectionAttachment && !mediaAttachment) ||
            createPostStatus === "pending"
          }
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
          disabled={
            (!inputText && !collectionAttachment && !mediaAttachment) ||
            editPostStatus === "pending"
          }
          className="grid py-2 font-semibold transition-colors disabled:bg-gray-700 disabled:text-socialTextSecondary bg-mainAccent rounded-xl place-items-center text-mainWhite"
        >
          {editPostStatus === "pending" ? "Saving..." : "Save"}
        </button>
      )}
    </div>
  );
}
