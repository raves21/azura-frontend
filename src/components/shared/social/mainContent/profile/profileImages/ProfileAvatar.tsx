import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ViewProfileImageDialog from "../../../ViewProfileImageDialog";

type ProfileAvatarProps = {
  avatar: string | null;
};

export default function ProfileAvatar({ avatar }: ProfileAvatarProps) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  return (
    <img
      onClick={() =>
        toggleOpenDialog(
          <ViewProfileImageDialog
            type="avatar"
            src={avatar ?? "/no-image-2.jpg"}
          />
        )
      }
      src={avatar ?? "/no-image-2.jpg"}
      className="absolute hover:cursor-pointer z-10 sm:size-24 rounded-full size-20 lg:size-28 border-4 border-socialPrimary -bottom-[40%] md:-bottom-[35%] left-3"
    />
  );
}
