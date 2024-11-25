import { useLogout } from "@/services/auth/authQueries";
import { useGlobalStore } from "@/utils/stores/globalStore";
import { LogOut } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import SideMenuSheetButton from "./SideMenuSheetButton";

export default function LogoutButton() {
  const {
    mutateAsync: logout,
    status: logoutStatus,
    error: logoutError,
  } = useLogout();
  const [toggleOpenSheet, toggleOpenDialog] = useGlobalStore(
    useShallow((state) => [state.toggleOpenSheet, state.toggleOpenDialog])
  );

  if (logoutStatus === "pending") {
    toggleOpenDialog(
      <div className="size-[500px] grid place-items-center text-mainWhite bg-darkBg">
        logging out...
      </div>
    );
  }

  if (logoutStatus === "error") {
    toggleOpenDialog(
      <div className="size-[500px] grid place-items-center text-mainWhite bg-darkBg">
        Logout Error: {logoutError.message}
      </div>
    );
  }

  if (logoutStatus === "success") {
    toggleOpenDialog(null);
  }
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
