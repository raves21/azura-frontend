import FollowingFeed from "@/components/core/social/mainContent/feed/FollowingFeed";
import ForYouFeed from "@/components/core/social/mainContent/feed/ForYouFeed";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { TContentOption } from "@/utils/types/social/shared";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_protected/social/")({
  component: () => <SocialPage />
});

const feedOptions: TContentOption[] = [
  {
    name: "For You",
    linkProps: {
      to: "/social",
      replace: true
    }
  },
  {
    name: "Following",
    linkProps: {
      to: "/social",
      replace: true
    }
  }
];

function SocialPage() {
  useCustomScrollRestoration();

  const [selectedFeedOption, setSelectedFeedOption] = useState(feedOptions[0]);

  if(selectedFeedOption === feedOptions[0]){
    return <ForYouFeed feedOptions={feedOptions} selectedFeedOption={selectedFeedOption} setSelectedFeedOption={setSelectedFeedOption}/>
  }
  return <FollowingFeed feedOptions={feedOptions} selectedFeedOption={selectedFeedOption} setSelectedFeedOption={setSelectedFeedOption}/>

}
