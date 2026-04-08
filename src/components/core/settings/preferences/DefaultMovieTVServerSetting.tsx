import { cn } from "@/lib/utils";
import { TVMovieServerName } from "@/utils/types/media/shared";
import { tvMovieserverNames } from "@/utils/variables/media/shared";
import { Circle } from "lucide-react";
import { useState } from "react";

export default function DefaultMovieTVServerSetting() {
  const defaultTVMovieServer =
    (localStorage.getItem("defaultTVMovieServer") as TVMovieServerName) || null;

  const [selectedServer, setSelectedServer] = useState<TVMovieServerName>(
    defaultTVMovieServer || TVMovieServerName.serverZenith,
  );

  function handleSelect(serverName: TVMovieServerName) {
    localStorage.setItem("defaultTVMovieServer", serverName);
    setSelectedServer(serverName);
  }

  return (
    <div className="w-full flex items-center flex-wrap gap-10 sm:gap-24 lg:gap-16 xl:gap-24 mt-6">
      {tvMovieserverNames.map((tvMovieserverName) => (
        <button
          key={tvMovieserverName}
          onClick={() => handleSelect(tvMovieserverName)}
          className="flex items-center gap-4 group"
        >
          <Circle
            className={cn(
              "rounded-full size-6 stroke-1 stroke-socialTextSecondary",
              {
                "bg-mainAccent stroke-2 stroke-socialPrimary":
                  selectedServer === tvMovieserverName,
              },
            )}
          />
          <p className="group-hover:underline underline-offset-[6px] decoration-mainAccent">
            {tvMovieserverName}
          </p>
        </button>
      ))}
    </div>
  );
}
