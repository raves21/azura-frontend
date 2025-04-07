type Props = {
  type: "profilePage" | "userPreview";
};

export default function Follow({ type }: Props) {
  if (type === "profilePage") {
    return (
      <div className="self-end px-4 py-2 font-semibold transition-colors border rounded-full sm:px-5 lg:text-md lg:mt-2 sm:text-sm text-2xs mobile-m:text-xs text-mainWhite hover:text-gray-300 bg-mainAccent hover:bg-fuchsia-700 border-mainAccent hover:border-mainAccent">
        Follow
      </div>
    );
  }
  return (
    <div className="w-[90px] py-3 h-min ml-auto text-xs font-semibold text-gray-800 hover:text-gray-900 bg-mainWhite hover:bg-gray-400 border-gray-800 hover:border-gray-900 rounded-full">
      Follow
    </div>
  );
}
