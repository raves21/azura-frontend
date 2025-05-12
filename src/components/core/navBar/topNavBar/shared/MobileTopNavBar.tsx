import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/services/auth/authQueries";
import { useScrolledState } from "@/utils/hooks/useScrolledState";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Navigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  searchDialogComponent: ReactNode;
};

export default function MobileTopNavBar({ searchDialogComponent }: Props) {
  const { isScrolledDown } = useScrolledState();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  const { data: currentUser } = useCurrentUser();

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div
      className={cn(
        "fixed flex z-[45] px-2 sm:px-3 py-4 transition-all duration-300 items-center justify-between w-dvw left-1/2 ml-[-50vw]",
        { "bg-darkBg": isScrolledDown }
      )}
    >
      <div className="flex items-center gap-4 mobile-m:gap-6">
        <img
          src="/azura-logo-with-label.svg"
          className="w-24 mobile-m:w-28 m-1"
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          className="p-[6px]"
          onClick={() => toggleOpenDialog(searchDialogComponent)}
        >
          <Search className="size-6" />
        </button>
        <button className="p-[2px]">
          <div className="p-[2px] rounded-full bg-mainAccent box-content">
            <div className="box-content overflow-hidden border-2 rounded-full size-6 border-darkBg">
              <img
                src={currentUser.avatar ?? "/no-image-2.jpg"}
                onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
                className="object-cover size-full"
              />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
