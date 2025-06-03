import { useLogout } from "@/services/auth/api/mutations";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { LogOut } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import SideMenuSheetButton from "./SideMenuSheetButton";
import AsyncConfirmationDialog from "../shared/confirmationDialog/AsyncConfirmationDialog";
import { useUniqueMutationKeyStore } from "@/utils/stores/useUniqueMutationKeyStore";

export default function LogoutButton() {
  const uniqueMutationKey = useUniqueMutationKeyStore(
    (state) => state.uniqueMutationKey
  );
  const { mutateAsync: logout } = useLogout({
    key: `logout-${uniqueMutationKey}`,
  });
  const [toggleOpenSheet, toggleOpenDialog] = useGlobalStore(
    useShallow((state) => [state.toggleOpenSheet, state.toggleOpenDialog])
  );

  return (
    <SideMenuSheetButton
      onClick={async () => {
        toggleOpenSheet(null);
        toggleOpenDialog(
          <AsyncConfirmationDialog
            mutationKey={[`logout-${uniqueMutationKey}`]}
            confirmAction={async () => await logout()}
            header="Confirm Logout"
            message="Are you sure you want to logout?"
            confirmButtonColorMainAccent={true}
          />
        );
      }}
    >
      <LogOut className="size-6 stroke-mainWhite" />
      <p>Logout</p>
    </SideMenuSheetButton>
  );
}
