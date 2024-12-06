import ContentOptions from "@/components/shared/social/mainContent/contentOptions/ContentOptions";
import CreatePost from "@/components/shared/social/mainContent/post/CreatePost";
import Post from "@/components/shared/social/mainContent/post/Post";
import { TContentOption } from "@/utils/types/social/shared";
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
  return (
    <div className="flex flex-col w-full gap-4">
      <CreatePost />
      <ContentOptions
        contentOptions={feedOptions}
        defaultOption={feedOptions[0]}
      />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_) => (
          <Post fromState="home-page" />
        ))}
      </div>
    </div>
  );
}
