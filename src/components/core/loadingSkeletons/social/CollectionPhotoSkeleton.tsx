import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function CollectionPhotoSkeleton({ className }: Props) {
  return (
    <Skeleton
      className={cn(
        "aspect-square size-52 shrink-0 rounded-md bg-gray-700",
        className
      )}
    />
  );
}
