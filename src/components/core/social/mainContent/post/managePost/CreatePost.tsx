import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ManagePostDialog from "./managePostDialog/ManagePostDialog";
import { useCurrentUser } from "@/services/auth/api/queries";
import { Navigate } from "@tanstack/react-router";
import UserAvatar from "../../../shared/UserAvatar";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { getUsernamePreview } from "@/utils/functions/sharedFunctions";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";

export default function CreatePost() {
  const { data: currentUser } = useCurrentUser();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  if (!currentUser) return <Navigate to="/login" replace />;

  const { isTabletExtraSmallUp, isMobileMediumUp } = useWindowBreakpoints();

  const resetPostStoreState = useManagePostStore((state) => state.resetState);

  let username: string;

  if (isTabletExtraSmallUp) {
    username = getUsernamePreview({
      maxLength: 20,
      currentUserUsername: currentUser.username,
    });
  } else if (isMobileMediumUp) {
    username = getUsernamePreview({
      maxLength: 8,
      currentUserUsername: currentUser.username,
    });
  } else {
    username = getUsernamePreview({
      maxLength: 5,
      currentUserUsername: currentUser.username,
    });
  }

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
        onClick={() => {
          resetPostStoreState();
          toggleOpenDialog(<ManagePostDialog type="create" />);
        }}
        className="flex-grow py-2 mobile-m:text-base px-3 md:p-3 rounded-lg bg-gray-800 hover:bg-[#323b4a] text-start"
      >
        <p className="line-clamp-2">
          What's the vibe today,&nbsp;
          <span>{username}?</span>
        </p>
      </button>
    </div>
  );
}
