import { useEditUserProfile } from "@/services/social/queries/socialQueries";
import { useCurrentUser } from "@/services/auth/authQueries";
import { useEditProfileStore } from "@/utils/stores/useEditProfileStore";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Navigate } from "@tanstack/react-router";
import { ImageUp, LoaderCircle, X } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { Textarea } from "@headlessui/react";
import { isEqual } from "radash";
import ErrorDialog from "@/components/core/shared/ErrorDialog";

type Props = {
  avatar: string | null;
  banner: string | null;
  userName: string;
  bio: string | null;
};

export default function EditProfilePage({
  avatar,
  banner,
  userName,
  bio,
}: Props) {
  const { data: currentUser } = useCurrentUser();
  const [toggleOpenDialog, toggleOpenDialogSecondary] = useGlobalStore(
    useShallow((state) => [
      state.toggleOpenDialog,
      state.toggleOpenDialogSecondary,
    ])
  );
  const [
    editProfileUsername,
    editProfileBio,
    editProfileAvatar,
    editProfileBanner,
    setEditProfileUsername,
    setEditProfileBio,
    setEditProfileAvatar,
    setEditProfileBanner,
    setEditProfilePage,
  ] = useEditProfileStore(
    useShallow((state) => [
      state.editProfileUsername,
      state.editProfileBio,
      state.editProfileAvatar,
      state.editProfileBanner,
      state.setEditProfileUsername,
      state.setEditProfileBio,
      state.setEditProfileAvatar,
      state.setEditProfileBanner,
      state.setEditProfilePage,
      state.setEditProfileBio,
    ])
  );

  const { mutateAsync: editProfile, status: editProfileStatus } =
    useEditUserProfile();

  // initialize values on mount:
  // only set the state to the default ones (the one the user already has)
  // if the user hasnt made any changes yet (the global/zustand states contains the changes the user made)
  useEffect(() => {
    if (bio && !editProfileBio) {
      setEditProfileBio(bio);
    }
    if (userName && !editProfileUsername) {
      setEditProfileUsername(userName);
    }
    if (avatar && !editProfileAvatar) setEditProfileAvatar(avatar);
    if (banner && !editProfileBanner) setEditProfileBanner(banner);
  }, []);

  const originalUserProfile = {
    avatar,
    banner,
    userName,
    bio,
  };
  const updatedUserProfile = {
    avatar: editProfileAvatar,
    banner: editProfileBanner,
    userName: editProfileUsername,
    bio: editProfileBio,
  };

  const isEditProfileNoChanges = isEqual(
    originalUserProfile,
    updatedUserProfile
  );

  async function saveChanges(userHandle: string) {
    if (isEditProfileNoChanges) {
      toggleOpenDialog(null);
      return;
    }

    try {
      await editProfile({
        userHandle: userHandle,
        avatar: editProfileAvatar,
        banner: editProfileBanner,
        bio: editProfileBio?.trim() || null,
        username: editProfileUsername,
      });
      toggleOpenDialog(null);
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

  return (
    <>
      <div className="flex flex-col flex-grow gap-16 sm:gap-24 overflow-y-auto">
        <div className="relative w-full h-28 sm:h-44 md:h-48 shrink-0">
          <div className="absolute size-full">
            <img
              onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
              src={editProfileBanner ?? "/no-image-2.jpg"}
              alt="banner"
              className="object-cover size-full"
            />
            <div className="absolute flex gap-6 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <button
                onClick={() => setEditProfilePage("manageBannerPage")}
                className="transition-colors rounded-full hover:bg-gray-700/80 size-12 bg-socialPrimary/60 place-items-center"
              >
                <ImageUp className="size-[55%] stroke-[1.5px]" />
              </button>
              {editProfileBanner && (
                <button
                  onClick={() => setEditProfileBanner(null)}
                  className="transition-colors rounded-full hover:bg-gray-700/80 size-12 bg-socialPrimary/60 place-items-center"
                >
                  <X className="size-[55%] stroke-[1.5px]" />
                </button>
              )}
            </div>
          </div>
          <div className="absolute -bottom-[38%] left-4 sm:size-24 size-20 lg:size-28 rounded-full  border-4 overflow-hidden box-content border-socialPrimary">
            <img
              onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
              src={editProfileAvatar ?? "/no-image-2.jpg"}
              alt="avatar"
              className="object-cover size-full"
            />
            <div className="absolute flex gap-1 sm:gap-3 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <button
                onClick={() => setEditProfilePage("manageAvatarPage")}
                className="transition-colors rounded-full hover:bg-gray-700/80 size-8 sm:size-9 bg-socialPrimary/60 place-items-center"
              >
                <ImageUp className="size-[55%] stroke-[1.5px]" />
              </button>
              {editProfileAvatar && (
                <button
                  onClick={() => setEditProfileAvatar(null)}
                  className="transition-colors rounded-full hover:bg-gray-700/80 size-8 sm:size-9 bg-socialPrimary/60 place-items-center"
                >
                  <X className="size-[55%] stroke-[1.5px]" />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 px-3 sm:px-5 mb-8">
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
              {!editProfileUsername ? (
                <p className="font-medium text-red-500">Username is required</p>
              ) : (
                <p className="font-medium">Username</p>
              )}
              <p className="text-sm font-light text-socialTextSecondary">
                {editProfileUsername.length}/{30}
              </p>
            </div>
            <input
              maxLength={30}
              placeholder="e.g: Justin Roiland"
              value={editProfileUsername}
              onChange={(e) => setEditProfileUsername(e.currentTarget.value)}
              type="text"
              className="rounded-md border-[0.5px] border-socialTextSecondary px-3 py-3 focus:outline-none bg-socialPrimary"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
              <p className="font-medium">Bio</p>
              <p className="text-sm font-light text-socialTextSecondary">
                {editProfileBio?.length || 0}/{150}
              </p>
            </div>
            <Textarea
              value={editProfileBio || undefined}
              onChange={(e) => setEditProfileBio(e.currentTarget.value)}
              placeholder="eg. Artist, dog-lover, Azura #1 fan"
              className="w-full focus:outline-none h-[165px] rounded-md bg-transparent border-[0.5px] p-3 border-socialTextSecondary"
            />
          </div>
        </div>
      </div>
      <button
        disabled={editProfileStatus === "pending" || !editProfileUsername}
        onClick={() => saveChanges(currentUser.handle)}
        className="flex items-center justify-center gap-2 py-2 m-3 md:m-4 font-semibold transition-colors disabled:bg-gray-700 disabled:text-socialTextSecondary bg-mainAccent rounded-xl text-mainWhite"
      >
        {editProfileStatus === "pending" ? (
          <>
            <p className="font-medium text-md">Loading</p>
            <LoaderCircle className="animate-spin size-5 stroke-mainWhite" />
          </>
        ) : (
          <p className="font-medium text-md">Save</p>
        )}
      </button>
    </>
  );
}
