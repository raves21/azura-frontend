import PostCommentHeader from "./PostCommentHeader";
import { TPostComment } from "@/utils/types/social/social";

type PostCommentProps = {
  comment: TPostComment;
};

export default function PostComment({ comment }: PostCommentProps) {
  return (
    <div className="flex w-full gap-4 px-5 py-4 rounded-none hover:cursor-pointer bg-socialPrimary hover:bg-socialPrimaryHover">
      <img
        src="/sample-user-pfp.png"
        className="block object-cover rounded-full size-11"
      />
      <div className="flex flex-col flex-grow gap-3">
        <PostCommentHeader
          author={comment.author}
          createdAt={comment.createdAt}
        />
        <p className="w-full mt-1">{comment.content}</p>
      </div>
    </div>
  );
}
