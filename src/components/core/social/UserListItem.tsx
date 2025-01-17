export default function UserListItem() {
  return (
    <div className="flex w-full py-3">
      <div className="flex items-center gap-3">
        <img
          src="/sample-user-pfp.png"
          className="object-cover rounded-full size-11"
        />
        <div className="space-y-1 text-sm max-w-28">
          <p className="font-semibold line-clamp-1">Sample User</p>
          <p className="text-socialTextSecondary line-clamp-1">@sampleuser</p>
        </div>
      </div>
      <button className="ml-auto h-[40px] text-xs font-semibold bg-gray-300 rounded-full px-6 text-darkBg hover:bg-gray-400">
        Follow
      </button>
    </div>
  );
}
