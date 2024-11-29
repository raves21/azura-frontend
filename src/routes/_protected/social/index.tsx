import CreatePost from "@/components/shared/social/CreatePost";
import Post from "@/components/shared/social/Post";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/")({
  component: () => <SocialPage />,
});

function SocialPage() {
  return (
    <div className="flex flex-col w-1/2 gap-3">
      <CreatePost />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 10 }).map((_) => (
          <Post />
        ))}
      </div>
    </div>
  );
}
