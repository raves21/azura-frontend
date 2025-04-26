import { useEditProfileStore } from "@/utils/stores/useEditProfileStore";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { ReactNode } from "@tanstack/react-router";
import { ArrowLeft, X } from "lucide-react";
import EditProfilePage from "./pages/EditProfilePage";
import ManageBannerPage from "./pages/ManageBannerPage";
import { useShallow } from "zustand/react/shallow";
import ManageAvatarPage from "./pages/ManageAvatarPage";

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
      <header className="relative w-full py-4 border-b-[0.5px] grid place-items-center border-socialTextSecondary/40">
        {editProfilePage !== "editProfilePage" && (
          <button
            onClick={() => setEditProfilePage("editProfilePage")}
            className="group absolute top-1/2 -translate-y-1/2 left-4 rounded-full p-2 border-[0.5px] border-socialTextSecondary"
          >
            <ArrowLeft className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
          </button>
        )}
        <p className="text-lg font-semibold">{headerTitle}</p>
        {editProfilePage === "editProfilePage" && (
          <button
            onClick={handleCloseDialog}
            className="group absolute top-1/2 -translate-y-1/2 right-4 rounded-full p-2 border-[0.5px] border-socialTextSecondary"
          >
            <X className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
          </button>
        )}
      </header>
      {currentPage}
    </main>
  );
}
