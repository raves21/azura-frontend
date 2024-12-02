import Post from "@/components/shared/social/mainContent/post/Post";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/profile/$userName/")({
  component: () => <UserProfilePage />,
});

function UserProfilePage() {
  return (
    <div className="flex flex-col w-full gap-4">
      {Array.from({ length: 5 }).map((_) => (
        <Post />
      ))}
    </div>
  );
}
