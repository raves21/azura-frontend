import SearchDialogResultCardSkeleton from "./SearchDialogResultCardSkeleton";

export default function SearchDialogResultsLoading() {
  return (
    <div className="grid w-full py-4 bg-gray-800 rounded-b-lg place-items-center">
      {Array.from({ length: 2 }).map((_, i) => (
        <SearchDialogResultCardSkeleton key={i} />
      ))}
    </div>
  );
}
