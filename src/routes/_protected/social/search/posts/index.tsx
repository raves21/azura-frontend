import Post from "@/components/core/social/mainContent/post/Post";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { tempPosts } from "@/utils/variables/temp";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/search/posts/")({
  component: () => <PostsSearchResultsPage />
});

function PostsSearchResultsPage() {
  useCustomScrollRestoration();
  return (
    <div className="flex flex-col w-full gap-3 pb-24">
      {tempPosts.map((post) => (
        <Post key={post.id} post={post} fromState="search-page" />
      ))}
    </div>
  );
}
