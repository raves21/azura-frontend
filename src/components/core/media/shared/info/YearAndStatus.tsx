import { cn } from "@/lib/utils";
import { AnimeStatus } from "@/utils/types/media/anime/animeAnilist";

type Props = {
  year: number | undefined;
  status: string | undefined;
};

export default function YearAndStatus({ year, status }: Props) {
  return (
    <div className="flex items-center gap-2 lg:hidden">
      <p>{year}</p>
      <div className="bg-gray-400 rounded-full size-1"></div>
      {status && (
        <p
          className={cn("font-semibold text-orange-500", {
            "text-green-500": [
              AnimeStatus.Ongoing,
              AnimeStatus.RELEASING,
            ].includes(status as AnimeStatus),
            "text-blue-500": [
              AnimeStatus.FINISHED,
              AnimeStatus.Completed,
            ].includes(status as AnimeStatus),
            "text-red-500": [
              AnimeStatus.CANCELLED,
              AnimeStatus.Cancelled,
            ].includes(status as AnimeStatus),
          })}
        >
          {status}
        </p>
      )}
    </div>
  );
}
