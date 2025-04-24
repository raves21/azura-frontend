import { Cat, Clapperboard, Tv } from "lucide-react";
import LogoutButton from "./LogoutButton";
import SettingsButton from "./SettingsButton";
import SideMenuSheetButton from "./SideMenuSheetButton";
import { useNavigateToMedia } from "@/utils/hooks/useNavigateToMedia";

export default function MenuSheet() {
  const { handleNavigateToMedia } = useNavigateToMedia();

  return (
    <div className="flex flex-col px-3 py-5 size-full bg-darkBg">
      <div className="w-full">
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
        <SettingsButton />
        <LogoutButton />
      </div>
    </div>
  );
}
