import { TPost } from "@/utils/types/social/social";
import Activity from "../activity/Activity";

type PostProps = {
  fromState?: "home-page" | "user-page" | "search-page";
  post: TPost;
};

export default function Post({ fromState, post }: PostProps) {
  return (
    <Activity
      type="post"
      post={post}
      showPrivacy={false}
      linkProps={{
        to: "/social/$userName/post/$postId",
        params: {
          userName: "riacordero",
          postId: "1231231",
        },
        state: {
          postInfoState: fromState ? { from: fromState } : undefined,
        },
      }}
    />
  );
}
