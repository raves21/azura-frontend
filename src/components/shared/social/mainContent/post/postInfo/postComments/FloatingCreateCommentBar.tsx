import CreateComment from "./CreateComment";
import { useAuthStore } from "@/utils/stores/authStore";
import { Navigate } from "@tanstack/react-router";

export default function FloatingCreateCommentBar() {
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div className="fixed bottom-0 w-full py-4 border-t-[0.5px] lg:hidden bg-socialPrimary border-socialTextSecondary/50">
      <CreateComment isFloatingCommentBar author={currentUser} />
    </div>
  );
}
