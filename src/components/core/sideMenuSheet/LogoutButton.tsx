import { useLogout } from "@/services/auth/authQueries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { LoaderCircle, LogOut } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import SideMenuSheetButton from "./SideMenuSheetButton";
import { useEffect } from "react";
import ErrorDialog from "../ErrorDialog";

export default function LogoutButton() {
  const {
    mutateAsync: logout,
    status: logoutStatus,
    error: logoutError,
  } = useLogout();
  const [toggleOpenSheet, toggleOpenDialog] = useGlobalStore(
    useShallow((state) => [state.toggleOpenSheet, state.toggleOpenDialog])
  );

  useEffect(() => {
    if (logoutStatus === "pending") {
      toggleOpenDialog(
        <div className="flex flex-col items-center justify-center gap-6 space-around text-2xl font-semibold rounded-lg w-[300px] text-mainAccent aspect-square bg-darkBg">
          <LoaderCircle className="group-disabled:stroke-mainAccent/50 animate-spin size-16 stroke-mainAccent" />
          <p>Logging out</p>
        </div>
      );
    }

    if (logoutStatus === "error") {
      toggleOpenDialog(null);
      setTimeout(() => {
        toggleOpenDialog(<ErrorDialog error={logoutError} />);
      }, 180);
    }

    if (logoutStatus === "success") {
      toggleOpenDialog(null);
    }
  }, [logoutStatus, logoutError]);

  return (
    <SideMenuSheetButton
      onClick={async () => {
        toggleOpenSheet(null);
        await logout();
      }}
    >
      <LogOut className="size-6 stroke-mainWhite" />
      <p>Logout</p>
    </SideMenuSheetButton>
  );
}
