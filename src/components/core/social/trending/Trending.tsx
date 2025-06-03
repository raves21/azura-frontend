import { useTrends } from "@/services/social/api/queries";
import TrendingListItem from "./TrendingListItem";
import TrendingListItemSkeleton from "../../loadingSkeletons/social/TrendingListItemSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Trending() {
  const {
    data: trends,
    isLoading: isTrendsLoading,
    error: trendsError,
  } = useTrends();

  if (isTrendsLoading) {
    return (
      <div className="flex flex-col w-full gap-4 overflow-hidden rounded-lg bg-socialPrimary">
        <Skeleton className="px-5 pt-5 w-[50%] h-[33px] mt-5 ml-5 text-lg font-semibold bg-gray-700" />
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <TrendingListItemSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (trendsError) {
    return (
      <div className="flex flex-col w-full gap-4 overflow-hidden rounded-lg bg-socialPrimary">
        <p className="px-5 pt-5 text-lg font-semibold ">Trending this week</p>
        <div className="w-full h-[300px] grid place-items-center text-socialTextSecondary font-medium text-md">
          An error occured.
        </div>
      </div>
    );
  }

  if (trends) {
    return (
      <div className="flex flex-col w-full gap-4 overflow-hidden rounded-lg bg-socialPrimary">
        <p className="px-5 pt-5 text-lg font-semibold ">Trending this week</p>
        <div>
          {trends.length !== 0 ? (
            trends.map((trend) => (
              <TrendingListItem
                key={trend.content}
                trend={trend.content}
                postCount={trend.count}
              />
            ))
          ) : (
            <div className="w-full h-[300px] grid place-items-center text-socialTextSecondary font-medium text-md">
              Wow, such empty.
            </div>
          )}
        </div>
      </div>
    );
  }
}
