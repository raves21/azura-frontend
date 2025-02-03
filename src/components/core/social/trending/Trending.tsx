import { useTrends } from "@/services/social/queries/socialQueries";
import TrendingListItem from "./TrendingListItem";

export default function Trending() {
  const {
    data: trends,
    isLoading: isTrendsLoading,
    error: trendsError
  } = useTrends();

  if (isTrendsLoading) {
    return <div>trends loading</div>;
  }

  if (trendsError) {
    return <div>trends error</div>;
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
            <div className="w-full h-[400px] grid place-items-center text-socialTextSecondary font-medium text-md">
              Wow, such empty.
            </div>
          )}
        </div>
      </div>
    );
  }
}
