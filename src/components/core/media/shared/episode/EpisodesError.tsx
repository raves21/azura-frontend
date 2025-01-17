export default function EpisodesError() {
  return (
    <div className="flex flex-col pt-8 pb-16 space-y-6 text-gray-400">
      <p className="text-lg font-semibold lg:text-xl text-mainWhite">
        Episodes
      </p>
      <div className="self-center py-12 text-xl">
        There was an error fetching episodes for this anime, please try again
        later.
      </div>
    </div>
  );
}
