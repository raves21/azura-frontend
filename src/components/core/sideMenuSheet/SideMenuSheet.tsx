import { Cat, Clapperboard, Tv } from "lucide-react";
import LogoutButton from "./LogoutButton";
import SideMenuSheetButton from "./SideMenuSheetButton";
import { useNavigateToMedia } from "@/utils/hooks/useNavigateToMedia";
import { useCurrentUser } from "@/services/auth/authQueries";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";

export default function MenuSheet() {
  const { handleNavigateToMedia } = useNavigateToMedia();
  const toggleOpenSheet = useGlobalStore((state) => state.toggleOpenSheet);
  const { data: currentUser } = useCurrentUser();

  if (!currentUser) return <Navigate to="/login" replace />;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-3 py-5 size-full bg-socialPrimary">
      <div className="w-full">
        <SideMenuSheetButton
          onClick={() => {
            toggleOpenSheet(null);
            navigate({
              to: "/social/$userHandle",
              params: { userHandle: currentUser.handle },
            });
          }}
        >
          <div className="p-[2px] rounded-full bg-mainAccent box-content">
            <div className="box-content overflow-hidden border-2 rounded-full size-7 border-socialPrimary">
              <img
                src={currentUser.avatar ?? "/no-image-2.jpg"}
                onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
                className="object-cover size-full"
              />
            </div>
          </div>
          <p>{currentUser.username}</p>
        </SideMenuSheetButton>
        <div className="h-px w-full bg-socialTextSecondary my-4" />
        <SideMenuSheetButton
          onClick={() =>
            handleNavigateToMedia({
              from: "sheet",
              navigationLinkProps: { to: "/tv" },
              type: "TV",
            })
          }
          className="group"
        >
          <Tv className="size-6 stroke-lime-500 group-hover:stroke-mainWhite" />
          <p>TV Series</p>
        </SideMenuSheetButton>
        <SideMenuSheetButton
          onClick={() =>
            handleNavigateToMedia({
              from: "sheet",
              navigationLinkProps: { to: "/anime" },
              type: "ANIME",
            })
          }
          className="group"
        >
          <Cat className="size-6 stroke-mainAccent group-hover:stroke-mainWhite" />
          <p>Anime</p>
        </SideMenuSheetButton>
        <SideMenuSheetButton
          onClick={() =>
            handleNavigateToMedia({
              from: "sheet",
              navigationLinkProps: { to: "/movie" },
              type: "MOVIE",
            })
          }
          className="group"
        >
          <Clapperboard className="size-6 stroke-cyan-500 group-hover:stroke-mainWhite" />
          <p>Movies</p>
        </SideMenuSheetButton>
      </div>
      <div className="w-full mt-auto">
        <LogoutButton />
      </div>
    </div>
  );
}
