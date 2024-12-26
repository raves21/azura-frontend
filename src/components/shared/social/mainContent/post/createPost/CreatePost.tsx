import { useGlobalStore } from "@/utils/stores/globalStore";
import CreatePostDialog from "./createPostDialog/CreatePostDialog";
import { useAuthStore } from "@/utils/stores/authStore";
import { Navigate } from "@tanstack/react-router";

export default function CreatePost() {
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg mobile-m:py-4 sm:p-5 bg-socialPrimary">
      <img
        src={currentUser.avatar ?? "/no-image-2.jpg"}
        className="object-cover rounded-full size-[38px] md:size-11"
      />
      <button
        onClick={() => toggleOpenDialog(<CreatePostDialog />)}
        className="flex-grow py-2 mobile-m:text-base px-3 md:p-3 rounded-lg bg-gray-800 hover:bg-[#323b4a] text-start"
      >
        <p>
          What's the vibe today,&nbsp;
          <span>{currentUser.username.split(" ").splice(0, 2)}?</span>
        </p>
      </button>
    </div>
  );
}
