import Activity from "../../../activity/Activity";
import { TPostComment } from "@/utils/types/social/social";

type Props = {
  comment: TPostComment;
};

export default function PostComment({ comment }: Props) {
  return (
    <Activity
      type="comment"
      comment={comment}
      ownerProfileLinkProps={{
        to: "/social/$userHandle",
        params: {
          userHandle: comment.author.handle,
        },
      }}
    />
  );
}
