import { tempPostComments } from "@/utils/variables/temp";
import PostComment from "./PostComment";
import { useAuthStore } from "@/utils/stores/authStore";
import { Navigate } from "@tanstack/react-router";

export default function PostComments() {
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col w-full gap-2 text-sm">
      <div className="flex flex-col gap-2 pt-2">
        {tempPostComments.map((comment) => (
          <PostComment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}
