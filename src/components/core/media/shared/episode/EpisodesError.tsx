type EpisodesErrorProps = {
  isMovie?: boolean;
};

export default function EpisodesError({ isMovie }: EpisodesErrorProps) {
  return (
    <div className="flex flex-col pt-8 pb-16 space-y-6 text-gray-400">
      <p className="text-lg font-semibold lg:text-xl text-mainWhite">
        Episodes
      </p>
      <div className="self-center py-12 text-xl text-center">
        {isMovie
          ? "There was an error fetching this movie, please try again later."
          : "There was an error fetching the episodes, please try again later."}
      </div>
    </div>
  );
}
