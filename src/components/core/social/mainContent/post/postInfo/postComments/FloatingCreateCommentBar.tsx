import CreateComment from "./CreateComment";
import { useCurrentUser } from "@/services/auth/authQueries";
import { Navigate } from "@tanstack/react-router";

export default function FloatingCreateCommentBar() {
  const { data: currentUser } = useCurrentUser();
  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div className="fixed bottom-[69.8px] md:bottom-[73.8px] w-full py-4 border-t-[0.5px] lg:hidden bg-socialPrimary border-socialTextSecondary/50">
      <CreateComment isFloatingCommentBar author={currentUser} />
    </div>
  );
}
