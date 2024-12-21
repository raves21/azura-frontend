import { tempPostComments } from "@/utils/variables/temp";
import PostComment from "./PostComment";
import { useAuthStore } from "@/utils/stores/authStore";
import { Navigate } from "@tanstack/react-router";
import CreateComment from "./CreateComment";
import { cn } from "@/lib/utils";
import { useMatchRoute } from "@tanstack/react-router";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";

export default function PostComments() {
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;
  const matchRoute = useMatchRoute();
  const isPostInfoPage = matchRoute({ to: "/social/$userName/post/$postId" });
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 1024;

  return (
    <div
      className={cn(
        "flex flex-col w-full gap-2 text-sm border-t-[0.5px] border-socialTextSecondary/40",
        { "pt-4": isPostInfoPage && isDesktop }
      )}
    >
      {isDesktop && <CreateComment author={currentUser} />}
      <div className="flex flex-col gap-2 pt-2">
        {tempPostComments.map((comment) => (
          <PostComment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}
