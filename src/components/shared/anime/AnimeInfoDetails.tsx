import { cn } from "@/lib/utils";
import { Status } from "@/utils/types/thirdParty/animeAnilist";
import InfoItem from "../info/InfoItem";

type InfoDetailsProps = {
  className?: string;
  year: number | undefined;
  totalEpisodes: number | undefined;
  type: string | undefined;
  status: string | undefined;
};

//!THIS COMPONENT IS UNUSED, MIGHT CHANGE MY MIND AND USE IT IN THE FUTURE, idk
export default function AnimeInfoDetails({
  className,
  year,
  totalEpisodes,
  type,
  status,
}: InfoDetailsProps) {
  return (
    <div className={cn("flex", className)}>
      <InfoItem label="Year:" info={year?.toString()} />
      <InfoItem label="Total Episodes:" info={totalEpisodes?.toString()} />
      <InfoItem
        label="Status:"
        info={status}
        infoClassName={
          status &&
          cn("font-semibold text-orange-500", {
            "text-green-500": [Status.Ongoing, Status.RELEASING].includes(
              status as Status
            ),
            "text-blue-500": [Status.FINISHED, Status.Completed].includes(
              status as Status
            ),
            "text-red-500": [Status.CANCELLED, Status.Cancelled].includes(
              status as Status
            ),
          })
        }
      />
      <InfoItem label="Type:" info={type} />
    </div>
  );
}
