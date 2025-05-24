import ManagePostDialog from "@/components/core/social/mainContent/post/managePost/managePostDialog/ManagePostDialog";
import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { Media } from "@/utils/types/social/social";
import { Forward } from "lucide-react";

type Props = {
  media: Media;
  className?: string;
};

export default function ShareMediaButton({ media, className }: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const setMediaAttachment = useManagePostStore(
    (state) => state.setMediaAttachment
  );

  return (
    <button
      onClick={() => {
        setMediaAttachment(media);
        toggleOpenDialog(
          <ManagePostDialog type="create" resetStateOnMount={false} />
        );
      }}
      className={cn(
        "hover:scale-[1.02] transition-transform duration-200 flex items-center gap-2 px-4 py-4 rounded-full mobile-m:px-4 mobile-m:py-3 lg:px-5 lg:py-2 bg-black",
        className
      )}
    >
      <Forward size={20} />
      <p className="hidden font-medium mobile-m:block">Post</p>
    </button>
  );
}
