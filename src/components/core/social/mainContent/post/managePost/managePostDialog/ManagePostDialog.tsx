import { ReactNode, useEffect } from "react";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import ManagePostPage from "./pages/ManagePostPage";
import SelectPrivacyPage from "./pages/SelectPrivacyPage";
import { ArrowLeft } from "lucide-react";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useShallow } from "zustand/react/shallow";
import { EntityPrivacy } from "@/utils/types/social/shared";
import { TPost } from "@/utils/types/social/social";
import { useCurrentUser } from "@/services/auth/api/queries";
import { Navigate } from "@tanstack/react-router";
import SelectMediaAttachmentPage from "./pages/SelectMediaAttachmentPage";
import SelectCollectionAttachmentPage from "./pages/SelectCollectionAttachmentPage";
import GlobalDialogHeader from "@/components/global/shared/GlobalDialogHeader";
import GlobalDialogHeaderCloseButton from "@/components/global/shared/GlobalDialogHeaderCloseButton";
import GlobalDialogHeaderTitle from "@/components/global/shared/GlobalDialogHeaderTitle";

type EditPostProps = {
  type: "edit";
  postToEdit: TPost;
};

type CreatePostProps = {
  type: "create";
};

type Props = EditPostProps | CreatePostProps;

export default function ManagePostDialog({ ...props }: Props) {
  const { data: currentUser } = useCurrentUser();

  const [
    managePostPage,
    setContent,
    setManagePostPage,
    setSelectedPrivacy,
    setCollectionAttachment,
    setMediaAttachment,
  ] = useManagePostStore(
    useShallow((state) => [
      state.managePostPage,
      state.setContent,
      state.setManagePostPage,
      state.setSelectedPrivacy,
      state.setCollectionAttachment,
      state.setMediaAttachment,
    ])
  );
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  useEffect(() => {
    //always set to initial page on mount
    setManagePostPage("managePost");
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
      setContent(content);
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
        <ManagePostPage type="edit" postToEdit={props.postToEdit} />
      );
    } else {
      currentPage = <ManagePostPage type="create" />;
    }
  } else if (managePostPage === "selectPrivacy") {
    currentPage = <SelectPrivacyPage />;
  } else if (managePostPage === "selectMediaAttachment") {
    currentPage = <SelectMediaAttachmentPage />;
  } else {
    currentPage = <SelectCollectionAttachmentPage />;
  }

  return (
    <div className="h-dvh md:h-[500px] overflow-hidden bg-socialPrimary rounded-lg flex flex-col w-dvw md:w-[550px] text-mainWhite">
      <GlobalDialogHeader>
        {managePostPage !== "managePost" && (
          <button
            onClick={() => setManagePostPage("managePost")}
            className="group absolute top-1/2 -translate-y-1/2 left-4 rounded-full p-2 border-[0.5px] border-socialTextSecondary"
          >
            <ArrowLeft className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
          </button>
        )}
        <GlobalDialogHeaderTitle>
          {props.type === "edit" ? "Edit post" : "New post"}
        </GlobalDialogHeaderTitle>
        {managePostPage === "managePost" && (
          <GlobalDialogHeaderCloseButton
            onClick={() => toggleOpenDialog(null)}
          />
        )}
      </GlobalDialogHeader>
      {currentPage}
    </div>
  );
}
