import ContentOptions from "@/components/shared/social/mainContent/contentOptions/ContentOptions";
import CreatePost from "@/components/shared/social/mainContent/post/CreatePost";
import Post from "@/components/shared/social/mainContent/post/Post";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { TContentOption } from "@/utils/types/social/shared";
import { tempPosts } from "@/utils/variables/temp";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/")({
  component: () => <SocialPage />,
});

const feedOptions: TContentOption[] = [
  {
    name: "For You",
    linkProps: {
      to: "/social",
    },
  },
  {
    name: "Following",
    linkProps: {
      to: "/social",
    },
  },
];

function SocialPage() {
  useCustomScrollRestoration();

  return (
    <div className="flex flex-col w-full gap-4 pb-24">
      <CreatePost />
      <ContentOptions
        contentOptions={feedOptions}
        defaultOption={feedOptions[0]}
      />
      <div className="flex flex-col gap-4">
        {tempPosts.map((post) => (
          <Post key={post.id} post={post} fromState="home-page" />
        ))}
      </div>
    </div>
  );
}
