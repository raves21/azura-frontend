import { tempPosts } from "@/utils/variables/temp";
import CreateComment from "./CreateComment";

export default function FloatingCreateCommentBar() {
  return (
    <div className="fixed bottom-0 w-full py-4 border-t-[0.5px] lg:hidden bg-socialPrimary border-socialTextSecondary/50">
      <CreateComment author={tempPosts[1].owner} />
    </div>
  );
}
