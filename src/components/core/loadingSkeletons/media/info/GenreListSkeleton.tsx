import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type InfoPageProps = {
  variant: "infoPage";
  className?: string;
};

type WatchPageProps = {
  variant: "watchPage";
  className?: string;
  isMobile: boolean;
};

type GenreListSkeletonProps = InfoPageProps | WatchPageProps;

export default function GenreListSkeleton({
  ...props
}: GenreListSkeletonProps) {
  if (props.variant === "infoPage") {
    return (
      <div className={cn("flex gap-2 items-center", props.className)}>
        <Skeleton className="text-transparent bg-gray-800">Genres:</Skeleton>
        <ul className={cn("flex flex-wrap gap-1")}>
          <Skeleton className="px-3 py-2 h-[20px] w-[120px] text-transparent transition-colors bg-gray-800" />
        </ul>
      </div>
    );
  } else {
    return (
      <ul
        className={cn(
          "flex-wrap gap-2 text-xs mobile-m:gap-3 sm:text-sm items-center",
          { "flex lg:hidden": props.isMobile },
          { "lg:flex hidden": !props.isMobile },
          props.className
        )}
      >
        <Skeleton className="px-3 py-2 h-[20px] w-[120px] text-transparent transition-colors bg-gray-800" />
      </ul>
    );
  }
}
