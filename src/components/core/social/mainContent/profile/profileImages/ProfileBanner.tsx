import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ViewProfileImageDialog from "../../../ViewProfileImageDialog";

type Props = {
  banner: string | null;
};

export default function ProfileBanner({ banner }: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  return (
    <img
      onClick={() =>
        toggleOpenDialog(
          <ViewProfileImageDialog
            type="banner"
            src={banner ?? "/no-image-2.jpg"}
          />
        )
      }
      src={banner ?? "/no-image-2.jpg"}
      className="absolute inset-0 object-cover rounded-lg hover:cursor-pointer size-full"
    />
  );
}
