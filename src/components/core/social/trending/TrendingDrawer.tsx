import { useTrends } from "@/services/social/api/queries";
import TrendingListItemSkeleton from "../../loadingSkeletons/social/TrendingListItemSkeleton";
import TrendingListItem from "./TrendingListItem";

export default function TrendingDrawer() {
  const {
    data: trends,
    isLoading: isTrendsLoading,
    error: trendsError,
  } = useTrends();

  if (isTrendsLoading) {
    return (
      <div className="flex flex-col w-full gap-4 overflow-hidden rounded-lg bg-socialPrimary">
        <p className="px-5 pt-5 text-lg font-semibold text-mainWhite">
          Trending this week
        </p>
        <div>
          {Array.from({ length: 4 }).map((_, i) => (
            <TrendingListItemSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (trendsError) {
    return (
      <div className="flex flex-col w-full gap-4 overflow-hidden rounded-lg bg-socialPrimary">
        <p className="px-5 pt-5 text-lg font-semibold text-mainWhite">
          Trending this week
        </p>
        <div className="w-full h-[300px] grid place-items-center text-socialTextSecondary font-medium text-md">
          An error occured.
        </div>
      </div>
    );
  }

  if (trends) {
    return (
      <div className="flex flex-col w-full gap-4 overflow-hidden rounded-lg bg-socialPrimary overflow-y-auto max-h-[400px] text-mainWhite">
        <p className="px-5 pt-5 text-lg font-semibold text-mainWhite">
          Trending this week
        </p>
        <div className="overflow-y-auto">
          {trends.length !== 0 ? (
            trends.map((trend) => (
              <TrendingListItem
                key={trend.content}
                trend={trend.content}
                postCount={trend.count}
                fromDrawer={true}
              />
            ))
          ) : (
            <div className="w-full h-[300px] grid place-items-center text-socialTextSecondary font-medium text-md">
              {"Empty :("}
            </div>
          )}
        </div>
      </div>
    );
  }
}
