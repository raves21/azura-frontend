import { cn } from "@/lib/utils";
import { Status } from "@/utils/types/thirdParty/anime/animeAnilist";

type YearAndStatusProps = {
  year: number | undefined;
  status: string | undefined;
};

export default function YearAndStatus({ year, status }: YearAndStatusProps) {
  return (
    <div className="flex items-center gap-2 lg:hidden">
      <p>{year}</p>
      <div className="bg-gray-400 rounded-full size-1"></div>
      {status && (
        <p
          className={cn("font-semibold text-orange-500", {
            "text-green-500": [Status.Ongoing, Status.RELEASING].includes(
              status as Status
            ),
            "text-blue-500": [Status.FINISHED, Status.Completed].includes(
              status as Status
            ),
            "text-red-500": [Status.CANCELLED, Status.Cancelled].includes(
              status as Status
            )
          })}
        >
          {status}
        </p>
      )}
    </div>
  );
}
