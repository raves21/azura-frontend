import Activity from "../../../activity/Activity";
import { TPostComment } from "@/utils/types/social/social";

type PostCommentProps = {
  comment: TPostComment;
};

export default function PostComment({ comment }: PostCommentProps) {
  return (
    <Activity
      type="comment"
      comment={comment}
      showPrivacy={false}
      ownerProfileLinkProps={{
        to: "/social/$userName",
        params: {
          userName: comment.author.handle,
        },
      }}
    />
  );
}
