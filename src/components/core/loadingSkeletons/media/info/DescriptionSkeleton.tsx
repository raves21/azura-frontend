import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type DescriptionSkeletonProps = {
  className?: string;
  showDescriptionLabel: boolean;
};

export default function DescriptionSkeleton({
  className,
  showDescriptionLabel
}: DescriptionSkeletonProps) {
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={cn("relative gap-3 mt-2 w-[75%]", className)}>
      {showDescriptionLabel && (
        <Skeleton className="mb-3 text-lg font-semibold   bg-gray-800 w-min lg:hidden">
          Description
        </Skeleton>
      )}
      <Skeleton ref={descriptionRef} className="  bg-gray-800">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex doloremque
        dicta sapiente illo, explicabo quibusdam itaque laudantium tempore error
        voluptate?
      </Skeleton>
    </div>
  );
}
