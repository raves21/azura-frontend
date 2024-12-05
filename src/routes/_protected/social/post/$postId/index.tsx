import BackButton from "@/components/shared/BackButton";
import PostComments from "@/components/shared/social/mainContent/post/postInfo/postComments/PostComments";
import PostInfo from "@/components/shared/social/mainContent/post/postInfo/PostInfo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/post/$postId/")({
  component: () => <PostInfoPage />,
});

function PostInfoPage() {
  return (
    <div className="flex flex-col w-full gap-4 mb-24 overflow-hidden text-base rounded-lg bg-socialPrimary">
      <div className="flex flex-col w-full gap-8 p-5">
        <div className="flex items-center gap-6">
          <BackButton
            linkProps={{
              to: "/social",
              replace: true,
            }}
          />
          <p className="text-lg font-semibold">Post</p>
        </div>
        <PostInfo />
      </div>
      <PostComments />
    </div>
  );
}
