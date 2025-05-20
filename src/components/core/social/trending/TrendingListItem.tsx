import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Link } from "@tanstack/react-router";
import { useShallow } from "zustand/react/shallow";

type Props = {
  trend: string;
  postCount: number;
  fromDrawer?: boolean;
};

export default function TrendingListItem({
  trend,
  postCount,
  fromDrawer,
}: Props) {
  const [setSocialSearchKeyword, toggleOpenDrawer] = useGlobalStore(
    useShallow((state) => [
      state.setSocialSearchKeyword,
      state.toggleOpenDrawer,
    ])
  );

  return (
    <Link
      to="/social/search/posts"
      search={{
        query: trend,
      }}
      onClick={() => {
        setSocialSearchKeyword(trend);
        if (fromDrawer) {
          toggleOpenDrawer(null);
        }
      }}
      className="block w-full px-5 py-4 hover:bg-socialPrimaryHover"
    >
      <p className="font-medium line-clamp-1">{trend}</p>
      <p className="text-sm text-gray-500">
        {postCount} {postCount === 1 ? "post" : "posts"}
      </p>
    </Link>
  );
}
