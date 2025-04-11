import ErrorDialog from "@/components/core/shared/ErrorDialog";
import {
  useCreateCollection,
  useEditCollection,
} from "@/services/social/queries/socialQueries";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { TCollection } from "@/utils/types/social/social";
import { useEffect } from "react";
import { Navigate } from "@tanstack/react-router";
import { useManageCollectionStore } from "@/utils/stores/useManageCollectionStore";
import { useShallow } from "zustand/react/shallow";
import { isEqual } from "radash";
import CollectionPhoto from "../../CollectionPhoto";
import { UseTipTapEditorReturnType } from "@/utils/hooks/useTipTapEditor";
import { EditorContent } from "@tiptap/react";
import { Globe, Users, ChevronDown, Lock, ImageUp, X } from "lucide-react";
import { getPreviewPosters } from "@/services/social/functions/socialFunctions";

type EditPostProps = {
  type: "edit";
  collectionToEdit: TCollection;
};

type CreatePostProps = {
  type: "create";
};

type Props = {
  tipTapEditor: UseTipTapEditorReturnType;
  closeDialog: () => void;
  isSecondaryDialog: boolean;
} & (EditPostProps | CreatePostProps);

export default function ManageCollectionDetailsPage({
  tipTapEditor,
  closeDialog,
  isSecondaryDialog,
  ...props
}: Props) {
  const {
    editor,
    editorContentRef,
    editorContentInitialHeight,
    editorContentInitialWidth,
    inputText: collectionDescription,
  } = tipTapEditor;
  const currentUser = useAuthStore((state) => state.currentUser);
  const [toggleOpenDialogSecondary, toggleOpenDialog] = useGlobalStore(
    useShallow((state) => [
      state.toggleOpenDialogSecondary,
      state.toggleOpenDialog,
    ])
  );
  const [
    collectionName,
    collectionPhoto,
    setCollectionName,
    setCollectionPhoto,
    selectedPrivacy,
    setManageCollectionPage,
  ] = useManageCollectionStore(
    useShallow((state) => [
      state.collectionName,
      state.collectionPhoto,
      state.setCollectionName,
      state.setCollectionPhoto,
      state.selectedPrivacy,
      state.setManageCollectionPage,
    ])
  );

  const {
    mutateAsync: createCollection,
    status: createCollectionStatus,
    error: createCollectionError,
  } = useCreateCollection();
  const {
    mutateAsync: editCollection,
    status: editCollectionStatus,
    error: editCollectionError,
  } = useEditCollection();

  useEffect(() => {
    if (createCollectionError || editCollectionError) {
      if (isSecondaryDialog) {
        toggleOpenDialogSecondary(null);
        setTimeout(() => {
          toggleOpenDialogSecondary(
            <ErrorDialog
              error={
                new Error("An error occured while creating this collection.")
              }
              okButtonAction={() => toggleOpenDialogSecondary(null)}
            />
          );
        }, 180);
      } else {
        toggleOpenDialog(null);
        setTimeout(() => {
          toggleOpenDialog(
            <ErrorDialog
              error={
                new Error("An error occured while creating this collection.")
              }
              okButtonAction={() => toggleOpenDialog(null)}
            />
          );
        }, 180);
      }
    }
  }, [createCollectionError, editCollectionError]);

  if (!currentUser) return <Navigate to="/login" replace />;

  let editedCollection: TCollection;
  let originalCollection: TCollection;
  let editCollectionNoChanges: boolean = false;

  if (props.type === "edit") {
    editedCollection = {
      ...props.collectionToEdit,
      privacy: selectedPrivacy,
      name: collectionName?.trim() ?? "",
      description: collectionDescription?.trim() ?? null,
      photo: collectionPhoto?.trim() ?? null,
    };
    originalCollection = props.collectionToEdit;
    editCollectionNoChanges = isEqual(editedCollection, originalCollection);
  }

  return (
    <div className="flex flex-col px-4 size-full">
      <div className="flex w-full gap-3 h-[70%] my-auto">
        <div className="relative grid w-1/2 rounded-md size-auto aspect-square place-items-center">
          {props.type === "edit" && !collectionPhoto ? (
            props.collectionToEdit.photo ? (
              <CollectionPhoto
                className="absolute size-full"
                type="photo"
                photo={collectionPhoto ?? ""}
              />
            ) : (
              <CollectionPhoto
                className="absolute size-full"
                type="previewPosters"
                previewPosters={getPreviewPosters(
                  props.collectionToEdit.previewMedias
                )}
              />
            )
          ) : (
            <CollectionPhoto
              className="absolute size-full"
              type="photo"
              photo={collectionPhoto ?? ""}
            />
          )}
          <div className="z-10 flex gap-3">
            <button
              onClick={() => setManageCollectionPage("manageCollecionPhoto")}
              className="transition-colors rounded-full border-[0.5px] border-mainAccent hover:bg-gray-700/80 size-16 bg-socialPrimary/60 place-items-center"
            >
              <ImageUp className="size-[55%] stroke-[1.5px]" />
            </button>
            {collectionPhoto && (
              <button
                onClick={() => setCollectionPhoto(null)}
                className="transition-colors rounded-full hover:bg-gray-700/80 size-16 border-[0.5px] border-mainAccent bg-socialPrimary/60 place-items-center"
              >
                <X className="size-[55%] stroke-[1.5px]" />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col w-1/2 gap-3">
          <input
            maxLength={30}
            placeholder="Add a name"
            value={collectionName ?? ""}
            onChange={(e) => setCollectionName(e.currentTarget.value)}
            type="text"
            className="rounded-md border-[0.5px] text-md w-full border-socialTextSecondary px-3 py-3 focus:outline-none bg-socialPrimary"
          />
          <button
            onClick={() => setManageCollectionPage("selectPrivacy")}
            className="flex items-center justify-center rounded-full gap-3 py-[10px] text-xs bg-gray-800 hover:bg-[#323b4a]"
          >
            {selectedPrivacy === "PUBLIC" ? (
              <Globe className="size-4 stroke-mainWhite" />
            ) : selectedPrivacy === "FRIENDS_ONLY" ? (
              <Users className="size-4 stroke-mainWhite" />
            ) : (
              <Lock className="size-4 stroke-mainWhite" />
            )}
            <p className="font-medium">
              {selectedPrivacy === "PUBLIC"
                ? "Public"
                : selectedPrivacy === "FRIENDS_ONLY"
                  ? "Friends"
                  : "Only Me"}
            </p>
            <ChevronDown className="size-4 stroke-mainWhite" />
          </button>
          <EditorContent
            ref={editorContentRef}
            editor={editor}
            style={{
              maxWidth: editorContentInitialWidth
                ? editorContentInitialWidth + 13
                : "auto",
              maxHeight: editorContentInitialHeight
                ? editorContentInitialHeight + 10
                : "auto",
            }}
            className="overflow-y-auto text-md flex-grow border-[0.5px] rounded-md border-socialTextSecondary px-3 py-3"
          />
        </div>
      </div>
      {props.type === "create" ? (
        <button
          onClick={async () => {
            await createCollection({
              description: collectionDescription,
              name: collectionName || "",
              privacy: selectedPrivacy,
              photo: collectionPhoto,
            });
            closeDialog();
          }}
          disabled={!collectionName || createCollectionStatus === "pending"}
          className="grid py-2 mb-4 font-semibold transition-colors disabled:bg-gray-700 disabled:text-socialTextSecondary bg-mainAccent rounded-xl place-items-center text-mainWhite"
        >
          {createCollectionStatus === "pending" ? "Creating..." : "Create"}
        </button>
      ) : (
        <button
          onClick={async () => {
            if (!editCollectionNoChanges) {
              await editCollection(editedCollection);
            }
            closeDialog();
          }}
          disabled={
            !collectionName ||
            editCollectionStatus === "pending" ||
            editCollectionNoChanges
          }
          className="grid py-2 mb-4 font-semibold transition-colors disabled:bg-gray-700 disabled:text-socialTextSecondary bg-mainAccent rounded-xl place-items-center text-mainWhite"
        >
          {editCollectionStatus === "pending" ? "Saving..." : "Save"}
        </button>
      )}
    </div>
  );
}
