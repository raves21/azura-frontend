import TrendingListItem from "./TrendingListItem";

type TrendingPost = {
  trend: string;
  postCount: number;
};

const tempTrendingPosts: TrendingPost[] = [
  {
    trend: "#awesome",
    postCount: 27,
  },
  {
    trend: "#movies",
    postCount: 22,
  },
  {
    trend: "Breaking Bad",
    postCount: 20,
  },
  {
    trend: "Lord of the Rings: Rings of Power",
    postCount: 19,
  },
  {
    trend: "#damn",
    postCount: 17,
  },
  {
    trend: "The Prestige",
    postCount: 17,
  },
  {
    trend: "Dandadan",
    postCount: 16,
  },
  {
    trend: "#anime",
    postCount: 13,
  },
  {
    trend: "Shutter Island",
    postCount: 5,
  },
];

export default function Trending() {
  return (
    <div className="flex flex-col w-full gap-4 overflow-hidden rounded-lg bg-socialPrimary">
      <p className="px-5 pt-5 text-lg font-semibold">Trending this week</p>
      <div>
        {tempTrendingPosts.map((post) => (
          <TrendingListItem
            key={post.trend}
            trend={post.trend}
            postCount={post.postCount}
          />
        ))}
      </div>
    </div>
  );
}
