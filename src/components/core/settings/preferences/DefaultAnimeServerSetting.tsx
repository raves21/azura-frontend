import { cn } from "@/lib/utils";
import { AnimeServerName } from "@/utils/types/media/shared";
import { Circle } from "lucide-react";
import { useState } from "react";

export default function DefaultAnimeServerSetting() {
  const defaultAnimeServer =
    (localStorage.getItem("defaultAnimeServer") as AnimeServerName) || null;

  const [selectedServer, setSelectedServer] = useState<AnimeServerName>(
    defaultAnimeServer || AnimeServerName.server2
  );

  function handleSelect(serverName: AnimeServerName) {
    localStorage.setItem("defaultAnimeServer", serverName);
    setSelectedServer(serverName);
  }

  return (
    <div className="w-full flex items-center flex-wrap gap-10 sm:gap-24 lg:gap-16 xl:gap-24 mt-6">
      <button
        onClick={() => handleSelect(AnimeServerName.server1)}
        className="flex items-center gap-4 group"
      >
        <Circle
          className={cn(
            "rounded-full size-6 stroke-1 stroke-socialTextSecondary",
            {
              "bg-mainAccent stroke-2 stroke-socialPrimary":
                selectedServer === AnimeServerName.server1,
            }
          )}
        />
        <p className="group-hover:underline underline-offset-[6px] decoration-mainAccent">
          Server 1
        </p>
      </button>
      <button
        onClick={() => handleSelect(AnimeServerName.server2)}
        className="flex items-center gap-4 group"
      >
        <Circle
          className={cn(
            "rounded-full size-6 stroke-1 stroke-socialTextSecondary",
            {
              "bg-mainAccent stroke-2 stroke-socialPrimary":
                selectedServer === AnimeServerName.server2,
            }
          )}
        />
        <p className="group-hover:underline underline-offset-[6px] decoration-mainAccent">
          Server 2
        </p>
      </button>
    </div>
  );
}
