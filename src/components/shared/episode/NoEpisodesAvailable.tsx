export default function NoEpisodesAvailable() {
  return (
    <div className="flex flex-col px-2 pt-8 pb-16 space-y-6 text-gray-400 sm:px-3">
      <p className="text-lg font-semibold lg:text-xl text-mainWhite">
        Episodes
      </p>
      <div className="self-center py-12 text-xl">No Episodes available</div>
    </div>
  );
}
