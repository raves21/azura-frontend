import ErrorDialog from "@/components/core/shared/ErrorDialog";
import {
  useCreateCollection,
  useEditCollection,
} from "@/services/social/api/mutations";
import { useCurrentUser } from "@/services/auth/api/queries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { TCollection } from "@/utils/types/social/social";
import { Navigate } from "@tanstack/react-router";
import { useManageCollectionStore } from "@/utils/stores/useManageCollectionStore";
import { useShallow } from "zustand/react/shallow";
import { isEqual } from "radash";
import CollectionPhoto from "../../CollectionPhoto";
import { Globe, Users, ChevronDown, Lock, ImageUp, X } from "lucide-react";
import { getPreviewPosters } from "@/services/social/functions/sharedFunctions";
import { Textarea } from "@headlessui/react";
import { useToast } from "@/components/ui/use-toast";

type EditPostProps = {
  type: "edit";
  collectionToEdit: TCollection;
};

type CreatePostProps = {
  type: "create";
};

type Props = {
  closeDialog: () => void;
  isSecondaryDialog: boolean;
} & (EditPostProps | CreatePostProps);

export default function ManageCollectionDetailsPage({
  closeDialog,
  isSecondaryDialog,
  ...props
}: Props) {
  const { data: currentUser } = useCurrentUser();
  const toggleOpenDialogSecondary = useGlobalStore(
    (state) => state.toggleOpenDialogSecondary
  );
  const [
    collectionName,
    collectionPhoto,
    collectionDescription,
    setCollectionName,
    setCollectionPhoto,
    selectedPrivacy,
    setManageCollectionPage,
    setCollectionDescription,
  ] = useManageCollectionStore(
    useShallow((state) => [
      state.collectionName,
      state.collectionPhoto,
      state.collectionDescription,
      state.setCollectionName,
      state.setCollectionPhoto,
      state.selectedPrivacy,
      state.setManageCollectionPage,
      state.setCollectionDescription,
    ])
  );

  const { toast } = useToast();

  const { mutateAsync: createCollection, status: createCollectionStatus } =
    useCreateCollection();
  const { mutateAsync: editCollection, status: editCollectionStatus } =
    useEditCollection();

  async function create() {
    try {
      await createCollection({
        description: collectionDescription,
        name: collectionName || "",
        privacy: selectedPrivacy,
        photo: collectionPhoto,
      });
      toast({ description: "Successfully created collection." });
      closeDialog();
    } catch (error) {
      <ErrorDialog
        error={new Error("An error occured.")}
        okButtonAction={() => toggleOpenDialogSecondary(null)}
      />;
    }
  }

  async function saveChanges() {
    try {
      if (!editCollectionNoChanges) {
        await editCollection(editedCollection);
        toast({ description: "Successfully edited collection." });
      }
      closeDialog();
    } catch (error) {
      toggleOpenDialogSecondary(
        <ErrorDialog
          error={error}
          okButtonAction={() => toggleOpenDialogSecondary(null)}
        />
      );
    }
  }

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
      <div className="overflow-y-auto flex flex-col items-center md:items-stretch md:flex-row w-full gap-8 md:gap-3 h-[70%] my-auto">
        <div className="relative grid md:w-1/2 rounded-md size-52 md:size-auto aspect-square place-items-center">
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
              className="transition-colors rounded-full border-[0.5px] border-mainAccent hover:bg-gray-700/80 size-16 bg-socialPrimary/60 grid place-items-center"
            >
              <ImageUp className="size-[55%] stroke-[1.5px]" />
            </button>
            {collectionPhoto && (
              <button
                onClick={() => setCollectionPhoto(null)}
                className="transition-colors rounded-full hover:bg-gray-700/80 size-16 border-[0.5px] border-mainAccent bg-socialPrimary/60 grid place-items-center"
              >
                <X className="size-[55%] stroke-[1.5px]" />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:w-1/2 w-[70dvw] sm:w-[50dvw] gap-3">
          <input
            maxLength={30}
            placeholder="Add a name"
            value={collectionName ?? ""}
            onChange={(e) => setCollectionName(e.currentTarget.value)}
            type="text"
            className="rounded-md border-[0.5px] text-md w-full border-socialTextSecondary p-3 focus:outline-none bg-socialPrimary"
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
          <Textarea
            maxLength={200}
            value={collectionDescription || ""}
            onChange={(e) => setCollectionDescription(e.currentTarget.value)}
            placeholder="Add an optional description"
            className="h-[160px] resize-none md:h-auto md:flex-grow w-full bg-transparent border-[0.5px] border-socialTextSecondary p-3 focus:outline-none rounded-md"
          />
        </div>
      </div>
      {props.type === "create" ? (
        <button
          onClick={create}
          disabled={!collectionName || createCollectionStatus === "pending"}
          className="grid py-2 mb-4 font-semibold transition-colors disabled:bg-gray-700 disabled:text-socialTextSecondary bg-mainAccent rounded-xl place-items-center text-mainWhite"
        >
          {createCollectionStatus === "pending" ? "Creating..." : "Create"}
        </button>
      ) : (
        <button
          onClick={saveChanges}
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
