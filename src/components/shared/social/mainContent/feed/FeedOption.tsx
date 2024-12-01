import { cn } from "@/lib/utils";
import { FeedType } from "./FeedOptions";

type FeedOptionProps = {
  feedType: FeedType;
  selectedFeed: FeedType;
  onSelectFeed: () => void;
};

export default function FeedOption({
  feedType,
  selectedFeed,
  onSelectFeed,
}: FeedOptionProps) {
  return (
    <button
      onClick={onSelectFeed}
      className={cn(
        "grid flex-grow py-3 place-items-center",
        selectedFeed === feedType
          ? "decoration-mainAccent underline underline-offset-4"
          : "hover:bg-socialPrimaryHover"
      )}
    >
      {feedType === "following" ? "Following" : "For you"}
    </button>
  );
}
