import { TPost } from "@/utils/types/social/social";
import Activity from "../activity/Activity";

type Props = {
  fromState?: "home-page" | "user-page" | "search-page";
  post: TPost;
};

export default function Post({ fromState, post }: Props) {
  return (
    <Activity
      type="post"
      post={post}
      ownerProfileLinkProps={{
        to: "/social/$userHandle",
        params: {
          userHandle: post.owner.handle,
        },
      }}
      linkProps={{
        to: "/social/$userHandle/posts/$postId",
        params: {
          userHandle: post.owner.handle,
          postId: post.id,
        },
        state: {
          postInfoState: fromState ? { from: fromState } : undefined,
        },
      }}
    />
  );
}
