import { cn } from "@/lib/utils";
import SearchDialogResultCardSkeleton from "./SearchDialogResultCardSkeleton";

type Props = {
  className?: string;
};

export default function SearchDialogResultsLoading({ className }: Props) {
  return (
    <div
      className={cn(
        "grid w-full py-4 bg-gray-800 rounded-b-lg place-items-center",
        className
      )}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <SearchDialogResultCardSkeleton key={i} className={className} />
      ))}
    </div>
  );
}
