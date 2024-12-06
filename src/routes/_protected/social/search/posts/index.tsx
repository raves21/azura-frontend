import Post from "@/components/shared/social/mainContent/post/Post";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/search/posts/")({
  component: () => <PostsSearchResultsPage />,
});

function PostsSearchResultsPage() {
  return (
    <div className="flex flex-col w-full gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Post key={i} fromState="search-page" />
      ))}
    </div>
  );
}
