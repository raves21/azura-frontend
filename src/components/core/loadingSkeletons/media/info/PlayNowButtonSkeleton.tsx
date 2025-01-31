import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

export default function PlayNowButtonSkeleton() {
  return (
    <Skeleton
      className={cn(
        "hover:scale-[1.02] bg-gray-800 text-transparent flex items-center gap-2 px-4 py-4 rounded-full mobile-m:px-4 mobile-m:py-3 lg:px-5 lg:py-2"
      )}
    >
      <Play size={20} className="bg-gray-800 border-none outline-none" />
      <p className="hidden font-medium mobile-m:block">Play Now</p>
    </Skeleton>
  );
}
