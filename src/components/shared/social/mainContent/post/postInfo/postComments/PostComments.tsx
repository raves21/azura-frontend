import { tempPostComments } from "@/utils/variables/temp";
import CreateComment from "./CreateComment";
import PostComment from "./PostComment";

export default function PostComments() {
  return (
    <div className="flex flex-col w-full gap-8 text-sm">
      <CreateComment />
      <div className="flex flex-col gap-2">
        {tempPostComments.map((comment) => (
          <PostComment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}
