import { cn } from "@/lib/utils";
import { ServerName } from "@/utils/types/media/shared";
import { Circle } from "lucide-react";
import { useState } from "react";

export default function DefaultMovieTVServerSetting() {
  const defaultTVMovieServer =
    (localStorage.getItem("defaultTVMovieServer") as ServerName) || null;

  const [selectedServer, setSelectedServer] = useState<ServerName>(
    defaultTVMovieServer || ServerName.embed1
  );

  function handleSelect(serverName: ServerName) {
    localStorage.setItem("defaultTVMovieServer", serverName);
    setSelectedServer(serverName);
  }

  return (
    <div className="w-full flex items-center flex-wrap gap-10 sm:gap-24 lg:gap-16 xl:gap-24 mt-6">
      <button
        onClick={() => handleSelect(ServerName.azuraMain)}
        className="flex items-center gap-4 group"
      >
        <Circle
          className={cn(
            "rounded-full size-6 stroke-1 stroke-socialTextSecondary",
            {
              "bg-mainAccent stroke-2 stroke-socialPrimary":
                selectedServer === ServerName.azuraMain,
            }
          )}
        />
        <p className="group-hover:underline underline-offset-[6px] decoration-mainAccent">
          Azura Main
        </p>
      </button>
      <button
        onClick={() => handleSelect(ServerName.embed1)}
        className="flex items-center gap-4 group"
      >
        <Circle
          className={cn(
            "rounded-full size-6 stroke-1 stroke-socialTextSecondary",
            {
              "bg-mainAccent stroke-2 stroke-socialPrimary":
                selectedServer === ServerName.embed1,
            }
          )}
        />
        <p className="group-hover:underline underline-offset-[6px] decoration-mainAccent">
          Embed 1
        </p>
      </button>
      <button
        onClick={() => handleSelect(ServerName.embed2)}
        className="flex items-center gap-4 group"
      >
        <Circle
          className={cn(
            "rounded-full size-6 stroke-1 stroke-socialTextSecondary",
            {
              "bg-mainAccent stroke-2 stroke-socialPrimary":
                selectedServer === ServerName.embed2,
            }
          )}
        />
        <p className="group-hover:underline underline-offset-[6px] decoration-mainAccent">
          Embed 2
        </p>
      </button>
    </div>
  );
}
