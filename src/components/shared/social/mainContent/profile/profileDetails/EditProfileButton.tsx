import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import EditProfileDialog from "../editProfileDialog/EditProfileDialog";

type EditProfileButtonProps = {
  avatar: string | null;
  bio: string | null;
  userName: string;
  banner: string | null;
};

export default function EditProfileButton({
  avatar,
  bio,
  userName,
  banner
}: EditProfileButtonProps) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  return (
    <button
      onClick={() =>
        toggleOpenDialog(
          <EditProfileDialog
            avatar={avatar}
            banner={banner}
            bio={bio}
            userName={userName}
          />
        )
      }
      className="self-end px-4 py-2 font-semibold transition-colors border border-gray-600 rounded-full sm:px-5 lg:text-md lg:mt-2 sm:text-sm text-2xs mobile-m:text-xs hover:border-mainAccent hover:text-mainAccent hover:bg-socialPrimaryHover"
    >
      Edit Profile
    </button>
  );
}
