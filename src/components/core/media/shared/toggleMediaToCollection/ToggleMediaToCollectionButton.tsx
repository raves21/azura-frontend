import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Bookmark } from "lucide-react";
import ToggleMediaToCollectionDialog from "./ToggleMediaToCollectionDialog";
import { Media } from "@/utils/types/social/social";

type ToggleMediaToCollectionButtonProps = {
  media: Media;
  className?: string;
};

export default function ToggleMediaToCollectionButton({
  className,
  media,
}: ToggleMediaToCollectionButtonProps) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  return (
    <button
      onClick={() =>
        toggleOpenDialog(<ToggleMediaToCollectionDialog media={media} />)
      }
      className={cn(
        "hover:scale-[1.02] transition-transform duration-200 flex items-center gap-2 px-4 py-4 bg-black rounded-full mobile-m:px-4 mobile-m:py-3 lg:px-5 lg:py-2",
        className
      )}
    >
      <Bookmark size={20} />
      <p className="hidden font-medium mobile-m:block">Collections</p>
    </button>
  );
}
