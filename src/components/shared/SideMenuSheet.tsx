import { useLogout } from "@/services/auth/authQueries";
import { useGlobalStore } from "@/utils/stores/globalStore";
import { LogOut } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

export default function MenuSheet() {
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
    <div className="flex flex-col size-full bg-darkBg">
      <button
        onClick={async () => {
          toggleOpenSheet(null);
          await logout();
        }}
        className="flex items-center w-full gap-4 py-4 pl-5 mt-auto transition-colors hover:bg-mainAccent text-mainWhite"
      >
        <LogOut className="size-6 stroke-mainWhite" />
        <p>Logout</p>
      </button>
    </div>
  );
}
