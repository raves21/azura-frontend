import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useManageCollectionStore } from "@/utils/stores/useManageCollectionStore";
import { EntityPrivacy } from "@/utils/types/social/shared";
import { TCollection } from "@/utils/types/social/social";
import { ReactNode } from "@tanstack/react-router";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import ManageCollectionDetailsPage from "./ManageCollectionDetailsPage";
import SelectPrivacyPage from "./SelectPrivacyPage";
import { ArrowLeft, X } from "lucide-react";
import { useTipTapEditor } from "@/utils/hooks/useTipTapEditor";
import ManageCollectionPhotoPage from "./ManageCollectionPhotoPage";
import { getPreviewPosters } from "@/services/social/functions/socialFunctions";

type EditCollectionProps = {
  type: "edit";
  collectionToEdit: TCollection;
};

type CreateCollectionProps = {
  type: "create";
};

type ManageCollectionDialogProps = EditCollectionProps | CreateCollectionProps;

export default function ManageCollectionDialog(
  props: ManageCollectionDialogProps
) {
  const [
    manageCollectionPage,
    setManageCollectionPage,
    setSelectedPrivacy,
    setCollectionName,
    setCollectionPhoto,
    setCollectionPreviewPosters,
    resetManageCollectionStoreState,
  ] = useManageCollectionStore(
    useShallow((state) => [
      state.manageCollectionPage,
      state.setManageCollectionPage,
      state.setSelectedPrivacy,
      state.setCollectionName,
      state.setCollectionPhoto,
      state.setCollectionPreviewPosters,
      state.resetState,
    ])
  );

  const toggleOpenDialogSecondary = useGlobalStore(
    (state) => state.toggleOpenDialogSecondary
  );

  const tipTapEditor = useTipTapEditor({
    focusOnMount: true,
    maxLength: 100,
    placeholder: "Add an optional description",
    editorProps: {
      attributes: {
        class: "flex-grow h-full w-full",
      },
    },
  });

  //initialize default values
  useEffect(() => {
    resetManageCollectionStoreState();
    const defaultCreateCollectionPrivacyPreference = localStorage.getItem(
      "defaultCreateCollectionPrivacyPreference"
    );
    if (props.type === "create") {
      if (defaultCreateCollectionPrivacyPreference) {
        setSelectedPrivacy(
          defaultCreateCollectionPrivacyPreference as EntityPrivacy
        );
      } else {
        localStorage.setItem(
          "defaultCreateCollectionPrivacyPreference",
          "PUBLIC"
        );
        setSelectedPrivacy("PUBLIC");
      }
    } else {
      //if edit, initialize initial values
      const { description, name, photo, privacy, previewMedias } =
        props.collectionToEdit;
      if (description) {
        tipTapEditor.setEditorContent(description);
      }
      if (photo) {
        setCollectionPhoto(photo);
      } else {
        setCollectionPreviewPosters(getPreviewPosters(previewMedias));
      }
      setCollectionName(name);
      setSelectedPrivacy(privacy);
    }
  }, []);

  let currentPage: ReactNode;
  if (manageCollectionPage === "manageCollectionDetails") {
    if (props.type === "edit") {
      currentPage = (
        <ManageCollectionDetailsPage
          type="edit"
          tipTapEditor={tipTapEditor}
          collectionToEdit={props.collectionToEdit}
        />
      );
    } else {
      currentPage = (
        <ManageCollectionDetailsPage
          type="create"
          tipTapEditor={tipTapEditor}
        />
      );
    }
  } else if (manageCollectionPage === "selectPrivacy") {
    currentPage = <SelectPrivacyPage />;
  } else {
    currentPage = <ManageCollectionPhotoPage />;
  }

  return (
    <div className="h-[480px] max-w-[600px] bg-socialPrimary rounded-lg flex flex-col aspect-[5/4] text-mainWhite">
      <div className="relative w-full py-4 border-b-[0.5px] grid place-items-center border-socialTextSecondary/40">
        {manageCollectionPage !== "manageCollectionDetails" && (
          <button
            onClick={() => setManageCollectionPage("manageCollectionDetails")}
            className="group absolute top-1/2 -translate-y-1/2 left-4 rounded-full p-2 border-[0.5px] border-socialTextSecondary"
          >
            <ArrowLeft className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
          </button>
        )}
        <p className="text-lg font-semibold">
          {props.type === "edit" ? "Edit collection" : "New collection"}
        </p>
        {manageCollectionPage === "manageCollectionDetails" && (
          <button
            onClick={() => toggleOpenDialogSecondary(null)}
            className="group absolute top-1/2 -translate-y-1/2 right-4 rounded-full p-2 border-[0.5px] border-socialTextSecondary"
          >
            <X className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
          </button>
        )}
      </div>
      {currentPage}
    </div>
  );
}
