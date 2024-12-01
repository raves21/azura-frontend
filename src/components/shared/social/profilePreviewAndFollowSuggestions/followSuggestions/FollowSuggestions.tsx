import UserListItem from "../../UserListItem";

export default function FollowSuggestions() {
  return (
    <div className="flex flex-col w-full gap-3 rounded-lg bg-socialPrimary">
      <p className="px-5 pt-5 pb-3 text-lg font-semibold">Follow suggestions</p>
      <div className="px-5 space-y-2">
        {Array.from({ length: 3 }).map((_) => (
          <UserListItem />
        ))}
      </div>
      <button className="w-full py-4 text-blue-500 rounded-bl-lg rounded-br-lg hover:bg-socialPrimaryHover">
        Show More
      </button>
    </div>
  );
}
