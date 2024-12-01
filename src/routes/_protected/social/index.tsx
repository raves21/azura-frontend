import FeedOptions from "@/components/shared/social/mainContent/feed/FeedOptions";
import CreatePost from "@/components/shared/social/mainContent/post/CreatePost";
import Post from "@/components/shared/social/mainContent/post/Post";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/")({
  component: () => <SocialPage />,
});

function SocialPage() {
  return (
    <div className="flex flex-col w-full gap-4">
      <CreatePost />
      <FeedOptions />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_) => (
          <Post />
        ))}
      </div>
    </div>
  );
}
