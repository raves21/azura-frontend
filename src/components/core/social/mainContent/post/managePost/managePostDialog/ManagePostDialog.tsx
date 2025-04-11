import { ReactNode, useEffect } from "react";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import ManagePostPage from "./pages/ManagePostPage";
import SelectPrivacyPage from "./pages/SelectPrivacyPage";
import { ArrowLeft, X } from "lucide-react";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useShallow } from "zustand/react/shallow";
import { EntityPrivacy } from "@/utils/types/social/shared";
import { TPost } from "@/utils/types/social/social";
import { useTipTapEditor } from "@/utils/hooks/useTipTapEditor";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { Navigate } from "@tanstack/react-router";
import SelectMediaAttachmentPage from "./pages/SelectMediaAttachmentPage";
import SelectCollectionAttachmentPage from "./pages/SelectCollectionAttachmentPage";

type EditPostProps = {
  type: "edit";
  postToEdit: TPost;
};

type CreatePostProps = {
  type: "create";
};

type Props = {
  resetStateOnMount?: boolean;
} & (EditPostProps | CreatePostProps);

export default function ManagePostDialog({
  resetStateOnMount = true,
  ...props
}: Props) {
  const currentUser = useAuthStore((state) => state.currentUser);

  const [
    resetState,
    managePostPage,
    setManagePostPage,
    setSelectedPrivacy,
    setCollectionAttachment,
    setMediaAttachment,
  ] = useManagePostStore(
    useShallow((state) => [
      state.resetState,
      state.managePostPage,
      state.setManagePostPage,
      state.setSelectedPrivacy,
      state.setCollectionAttachment,
      state.setMediaAttachment,
    ])
  );
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  const tipTapEditor = useTipTapEditor({
    focusOnMount: true,
    maxLength: 500,
    placeholder: `What's the vibe today, ${currentUser?.username.split(" ").slice(0, 2).join(" ")}?`,
    editorProps: {
      attributes: {
        class: "flex-grow h-full",
      },
    },
  });

  useEffect(() => {
    //always set to initial page on mount
    setManagePostPage("managePost");

    if (resetStateOnMount) {
      //reset all state
      resetState();
    }

    const defaultCreatePostPrivacyPreference = localStorage.getItem(
      "defaultCreatePostPrivacyPreference"
    );

    //initialize default values
    if (props.type === "create") {
      if (defaultCreatePostPrivacyPreference) {
        setSelectedPrivacy(defaultCreatePostPrivacyPreference as EntityPrivacy);
      } else {
        localStorage.setItem("defaultCreatePostPrivacyPreference", "PUBLIC");
        setSelectedPrivacy("PUBLIC");
      }
    } else {
      const { content, privacy, collection, media } = props.postToEdit;
      if (tipTapEditor && tipTapEditor.editor) {
        tipTapEditor.setEditorContent(content);
      }
      setCollectionAttachment(collection);
      setMediaAttachment(media);
      setSelectedPrivacy(privacy);
    }
  }, []);

  if (!currentUser) return <Navigate to="/login" replace />;

  let currentPage: ReactNode;
  if (managePostPage === "managePost") {
    if (props.type === "edit") {
      currentPage = (
        <ManagePostPage
          tipTapEditor={tipTapEditor}
          type="edit"
          postToEdit={props.postToEdit}
        />
      );
    } else {
      currentPage = (
        <ManagePostPage tipTapEditor={tipTapEditor} type="create" />
      );
    }
  } else if (managePostPage === "selectPrivacy") {
    currentPage = <SelectPrivacyPage />;
  } else if (managePostPage === "selectMediaAttachment") {
    currentPage = <SelectMediaAttachmentPage />;
  } else {
    currentPage = <SelectCollectionAttachmentPage />;
  }

  return (
    <div className="h-[500px] overflow-hidden bg-socialPrimary rounded-lg flex flex-col w-[550px] text-mainWhite">
      <div className="relative w-full py-4 border-b-[0.5px] grid place-items-center border-socialTextSecondary/40">
        {managePostPage !== "managePost" && (
          <button
            onClick={() => setManagePostPage("managePost")}
            className="group absolute top-1/2 -translate-y-1/2 left-4 rounded-full p-2 border-[0.5px] border-socialTextSecondary"
          >
            <ArrowLeft className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
          </button>
        )}
        <p className="text-lg font-semibold">
          {props.type === "edit" ? "Edit post" : "New post"}
        </p>
        {managePostPage === "managePost" && (
          <button
            onClick={() => toggleOpenDialog(null)}
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
