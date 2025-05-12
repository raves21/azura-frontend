import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ManagePostDialog from "./managePostDialog/ManagePostDialog";
import { useCurrentUser } from "@/services/auth/authQueries";
import { Navigate } from "@tanstack/react-router";
import UserAvatar from "../../../shared/UserAvatar";

export default function CreatePost() {
  const { data: currentUser } = useCurrentUser();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg mobile-m:py-4 sm:p-5 bg-socialPrimary">
      <UserAvatar
        linkProps={{
          to: "/social/$userHandle",
          params: {
            userHandle: currentUser.handle,
          },
        }}
        src={currentUser.avatar}
        imageClassName="md:size-11"
      />
      <button
        onClick={() => toggleOpenDialog(<ManagePostDialog type="create" />)}
        className="flex-grow py-2 mobile-m:text-base px-3 md:p-3 rounded-lg bg-gray-800 hover:bg-[#323b4a] text-start"
      >
        <p>
          What's the vibe today,&nbsp;
          <span>{currentUser.username.split(" ").splice(0, 2).join(" ")}?</span>
        </p>
      </button>
    </div>
  );
}
