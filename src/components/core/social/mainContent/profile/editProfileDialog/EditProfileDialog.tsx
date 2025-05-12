import { useEditProfileStore } from "@/utils/stores/useEditProfileStore";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { ReactNode } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import EditProfilePage from "./pages/EditProfilePage";
import ManageBannerPage from "./pages/ManageBannerPage";
import { useShallow } from "zustand/react/shallow";
import ManageAvatarPage from "./pages/ManageAvatarPage";
import GlobalDialogHeader from "@/components/global/shared/GlobalDialogHeader";
import GlobalDialogHeaderCloseButton from "@/components/global/shared/GlobalDialogHeaderCloseButton";
import GlobalDialogHeaderTitle from "@/components/global/shared/GlobalDialogHeaderTitle";

type Props = {
  avatar: string | null;
  banner: string | null;
  userName: string;
  bio: string | null;
};

export default function EditProfileDialog({
  avatar,
  banner,
  userName,
  bio,
}: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const [
    editProfilePage,
    setEditProfilePage,
    setEditProfileUsername,
    setEditProfileBio,
    setEditProfileAvatar,
    setEditProfileBanner,
  ] = useEditProfileStore(
    useShallow((state) => [
      state.editProfilePage,
      state.setEditProfilePage,
      state.setEditProfileUsername,
      state.setEditProfileBio,
      state.setEditProfileAvatar,
      state.setEditProfileBanner,
    ])
  );

  function handleCloseDialog() {
    setEditProfileUsername(userName);
    setEditProfileBio(null);
    setEditProfileAvatar(null);
    setEditProfileBanner(null);
    setEditProfilePage("editProfilePage");
    toggleOpenDialog(null);
  }

  let currentPage: ReactNode;
  let headerTitle: string;
  if (editProfilePage === "editProfilePage") {
    headerTitle = "Edit Profile";
    currentPage = (
      <EditProfilePage
        avatar={avatar}
        banner={banner}
        bio={bio}
        userName={userName}
      />
    );
  } else if (editProfilePage === "manageBannerPage") {
    headerTitle = "Manage Profile Banner";
    currentPage = <ManageBannerPage />;
  } else {
    headerTitle = "Manage Profile Avatar";
    currentPage = <ManageAvatarPage />;
  }

  return (
    <main className="md:aspect-[1/1] h-dvh md:h-auto bg-socialPrimary overflow-y-auto rounded-lg flex flex-col w-dvw md:w-[620px] text-mainWhite">
      <GlobalDialogHeader>
        {editProfilePage !== "editProfilePage" && (
          <button
            onClick={() => setEditProfilePage("editProfilePage")}
            className="group absolute top-1/2 -translate-y-1/2 left-4 rounded-full p-2 border-[0.5px] border-socialTextSecondary"
          >
            <ArrowLeft className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
          </button>
        )}
        <GlobalDialogHeaderTitle>{headerTitle}</GlobalDialogHeaderTitle>
        {editProfilePage === "editProfilePage" && (
          <GlobalDialogHeaderCloseButton onClick={handleCloseDialog} />
        )}
      </GlobalDialogHeader>
      {currentPage}
    </main>
  );
}
