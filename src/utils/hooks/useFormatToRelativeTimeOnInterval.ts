import { formatToRelativeTime } from "@/services/social/functions/socialFunctions";
import { useState, useEffect } from "react";

//5 mins
const FORMAT_TO_RELATIVE_TIME_INTERVAL = 300_000;

export function useFormatToRelativeTimeOnInterval(dateTime: string) {
  const [timeAgo, setTimeAgo] = useState<string>(
    formatToRelativeTime(dateTime)
  );

  //format to relative time every 5 mins
  useEffect(() => {
    const formattedToRelativeTime = formatToRelativeTime(dateTime);
    let interval: NodeJS.Timeout | undefined = undefined;

    //only do so if the relativeTime was seconds/minutes ago
    if (
      formattedToRelativeTime.includes("second") ||
      formattedToRelativeTime.includes("minute")
    ) {
      interval = setInterval(() => {
        setTimeAgo(formatToRelativeTime(dateTime));
      }, FORMAT_TO_RELATIVE_TIME_INTERVAL);
    }

    return () => clearInterval(interval);
  }, []);

  return { timeAgo };
}
