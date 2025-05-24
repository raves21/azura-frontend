import { TPostComment } from "@/utils/types/social/social";
import PostCommentHeader from "./PostCommentHeader";

type Props = {
  comment: TPostComment;
};

export default function PostComment({ comment }: Props) {
  return (
    <div className="flex w-full gap-2 text-sm mobile-m:text-base md:gap-4 px-3 mobile-l:p-5 rounded-none py-5">
      <div className="flex flex-col flex-grow gap-3">
        <PostCommentHeader
          comment={comment}
          linkProps={{
            to: "/social/$userHandle",
            params: {
              userHandle: comment.author.handle,
            },
          }}
        />
        <p className="w-full mt-1 text-sm text-gray-300 mobile-m:text-md sm:pl-14">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
