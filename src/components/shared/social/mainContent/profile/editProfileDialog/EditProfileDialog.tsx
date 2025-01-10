import { useEditProfileStore } from "@/utils/stores/useEditProfileStore";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { ReactNode } from "@tanstack/react-router";
import { ArrowLeft, X } from "lucide-react";
import EditProfilePage from "./EditProfilePage";
import ManageProfileBannerPage from "./ManageProfileBannerPage";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import ManageProfileAvatar from "./ManageProfileAvatar";

type EditProfileDialogProps = {
  avatar: string | null;
  banner: string | null;
  userName: string;
  bio: string | null;
};

export default function EditProfileDialog({
  avatar,
  banner,
  userName,
  bio
}: EditProfileDialogProps) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const [
    editProfilePage,
    setEditProfilePage,
    setEditProfileAvatar,
    setEditProfileBanner
  ] = useEditProfileStore(
    useShallow((state) => [
      state.editProfilePage,
      state.setEditProfilePage,
      state.setEditProfileAvatar,
      state.setEditProfileBanner
    ])
  );

  useEffect(() => {
    setEditProfileAvatar(null);
    setEditProfileBanner(null);
    setEditProfilePage("editProfilePage");
  }, []);

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
    currentPage = <ManageProfileBannerPage />;
  } else {
    headerTitle = "Manage Profile Avatar";
    currentPage = <ManageProfileAvatar />;
  }

  return (
    <main className="aspect-[1/1] bg-socialPrimary overflow-y-auto rounded-lg flex flex-col w-[620px] text-mainWhite">
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
            onClick={() => toggleOpenDialog(null)}
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
