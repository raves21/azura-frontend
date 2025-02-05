import { Link } from "@tanstack/react-router";

type TrendingListItemProps = {
  trend: string;
  postCount: number;
};

export default function TrendingListItem({
  trend,
  postCount
}: TrendingListItemProps) {
  return (
    <Link
      to="/social/search/posts"
      search={{
        query: trend
      }}
      className="block w-full px-5 py-4 hover:bg-socialPrimaryHover"
    >
      <p className="font-medium line-clamp-1">{trend}</p>
      <p className="text-sm text-gray-500">{postCount} posts</p>
    </Link>
  );
}
