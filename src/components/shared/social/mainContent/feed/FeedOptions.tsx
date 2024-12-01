import { useState } from "react";
import FeedOption from "./FeedOption";

export type FeedType = "for-you" | "following";

export default function FeedOptions() {
  const [selectedFeed, setSelectedFeed] = useState<FeedType>("for-you");

  return (
    <div className="flex w-full overflow-hidden font-semibold rounded-lg bg-socialPrimary">
      <FeedOption
        feedType="for-you"
        selectedFeed={selectedFeed}
        onSelectFeed={() => setSelectedFeed("for-you")}
      />
      <FeedOption
        feedType="following"
        selectedFeed={selectedFeed}
        onSelectFeed={() => setSelectedFeed("following")}
      />
    </div>
  );
}
