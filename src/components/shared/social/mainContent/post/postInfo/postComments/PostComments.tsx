import { tempPostComments } from "@/utils/variables/temp";
import PostComment from "./PostComment";

export default function PostComments() {
  return (
    <div className="flex flex-col w-full gap-4 text-sm border-t-[0.5px] sm:gap-8 border-socialTextSecondary/40">
      <div className="flex flex-col gap-2 pt-2">
        {tempPostComments.map((comment) => (
          <PostComment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}
