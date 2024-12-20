import { useCurrentUser } from "@/utils/hooks/useCurrentUser";
import CreateComment from "./CreateComment";

export default function FloatingCreateCommentBar() {
  const currentUser = useCurrentUser();

  return (
    <div className="fixed bottom-0 w-full py-4 border-t-[0.5px] lg:hidden bg-socialPrimary border-socialTextSecondary/50">
      <CreateComment author={currentUser} />
    </div>
  );
}
