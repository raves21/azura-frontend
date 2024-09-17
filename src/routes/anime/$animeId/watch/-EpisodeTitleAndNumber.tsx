type EpisodeInfoProps = {
  episodeNumber: string | undefined;
  episodeTitle: string | undefined;
};

export default function EpisodeTitleAndNumber({
  episodeNumber,
  episodeTitle,
}: EpisodeInfoProps) {
  return (
    <div className="flex flex-col w-full gap-1 mt-2 lg:px-0">
      <p className="text-lg font-semibold sm:text-xl">
        {episodeNumber}
      </p>
      <p className="font-medium text-gray-400 sm:text-lg line-clamp-1">{episodeTitle}</p>
    </div>
  );
}
