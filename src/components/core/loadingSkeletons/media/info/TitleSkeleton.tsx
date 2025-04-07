import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  variant: "infoPage" | "watchPage";
};

export default function TitleSkeleton({ variant }: Props) {
  return (
    <Skeleton
      className={cn(
        "font-semibold line-clamp-2   bg-gray-800 self-start",
        { "text-lg sm:text-xl md:text-2xl": variant === "watchPage" },
        {
          "px-8 text-2xl lg:text-3xl lg:px-0 lg:text-start text-center":
            variant === "infoPage",
        }
      )}
    >
      Lorem, ipsum dolor.
    </Skeleton>
  );
}
