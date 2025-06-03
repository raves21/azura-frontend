import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User2 } from "lucide-react";
import { useNavigate, Navigate } from "@tanstack/react-router";
import { useUniqueMutationKeyStore } from "@/utils/stores/useUniqueMutationKeyStore";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import AsyncConfirmationDialog from "@/components/core/shared/confirmationDialog/AsyncConfirmationDialog";
import { useLogout } from "@/services/auth/api/mutations";
import { useCurrentUser } from "@/services/auth/api/queries";

export default function CurrentUserAvatar() {
  const { data: currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const uniqueMutationKey = useUniqueMutationKeyStore(
    (state) => state.uniqueMutationKey
  );
  const { mutateAsync: logout } = useLogout({
    key: `logout-${uniqueMutationKey}`,
  });
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-[2px]">
        <div className="p-[2px] rounded-full bg-mainAccent box-content">
          <div className="box-content overflow-hidden border-2 rounded-full size-6 border-darkBg">
            <img
              src={currentUser.avatar ?? "/no-image-2.jpg"}
              onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
              className="object-cover size-full"
            />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-[0.5px] p-[3px] w-[150px] text-sm border-socialTextSecondary/30 font-montserrat text-mainWhite bg-socialPrimary"
      >
        <DropdownMenuItem
          onClick={() =>
            navigate({
              to: "/social/$userHandle",
              params: { userHandle: currentUser.handle },
            })
          }
          className="flex items-center w-full gap-3 py-2 font-medium group focus:bg-white/10"
        >
          <User2 className="size-5 group-focus:stroke-mainWhite" />
          <p className="group-focus:text-mainWhite">Profile</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate({ to: "/settings" })}
          className="flex items-center w-full gap-3 py-2 font-medium group focus:bg-white/10"
        >
          <Settings className="size-5 group-focus:stroke-mainWhite" />
          <p className="group-focus:text-mainWhite">Settings</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            toggleOpenDialog(
              <AsyncConfirmationDialog
                mutationKey={[`logout-${uniqueMutationKey}`]}
                confirmAction={async () => {
                  await logout();
                }}
                header="Confirm Logout"
                message="Are you sure you want to logout?"
                confirmButtonColorMainAccent={true}
              />
            );
          }}
          className="flex items-center w-full gap-3 py-2 font-medium group focus:bg-white/10"
        >
          <LogOut className="size-5 group-focus:stroke-mainWhite" />
          <p className="group-focus:text-mainWhite">Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
