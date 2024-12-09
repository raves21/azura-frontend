import Post from "@/components/shared/social/mainContent/post/Post";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { tempPosts } from "@/utils/variables/temp";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/$userName/")({
  component: () => <UserProfilePage />,
});

function UserProfilePage() {
  useCustomScrollRestoration("userProfilePage");
  return (
    <div className="flex flex-col w-full gap-4 pb-24">
      {tempPosts.map((post) => (
        <Post key={post.id} post={post} fromState="user-page" />
      ))}
    </div>
  );
}
