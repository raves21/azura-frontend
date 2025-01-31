import { Skeleton } from "@/components/ui/skeleton";

type InfoSectionPosterProps = {
  variant: "infoPage" | "watchPage";
};

export default function InfoSectionPosterSkeleton({
  variant
}: InfoSectionPosterProps) {
  if (variant === "infoPage") {
    return (
      <Skeleton className="aspect-[3/4] h-[230px] sm:h-[280px] lg:h-[300px] xl:h-[320px] rounded-xl overflow-hidden z-10 bg-gray-800" />
    );
  } else {
    return (
      <Skeleton className="aspect-[3/4] bg-gray-800 h-[180px] mobile-m:h-[190px] mobile-l:h-[200px] sm:h-[240px] md:h-[260px] lg:h-[300px] rounded-xl overflow-hidden z-10" />
    );
  }
}
