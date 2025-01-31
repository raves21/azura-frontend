import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type InfoDetailsSkeletonProps = PropsWithChildren & {
  className?: string;
  isMobile?: boolean;
};

export default function InfoDetailsSkeleton({
  className,
  children,
  isMobile
}: InfoDetailsSkeletonProps) {
  return (
    <div
      className={cn(
        "w-full space-y-2",
        { "hidden lg:block": !isMobile, "lg:hidden": isMobile },
        className
      )}
    >
      {isMobile && (
        <Skeleton className="mb-1 text-lg font-semibold text-transparent bg-gray-800 w-min lg:hidden">
          Details
        </Skeleton>
      )}
      {children}
    </div>
  );
}
