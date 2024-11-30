export default function ProfilePreview() {
  return (
    <div className="flex flex-col w-full gap-5 overflow-hidden rounded-lg bg-socialPrimary">
      <div className="relative top-0 w-full h-20">
        <img
          src="/sample-user-banner.jpg"
          className="absolute inset-0 object-cover size-full"
        />
        <img
          src="/sample-user-pfp.png"
          className="absolute object-cover -translate-x-1/2 rounded-full -bottom-[30%] size-16 left-1/2"
        />
      </div>
      <div className="flex flex-col gap-3 px-3 mt-4">
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">Elon Musk</p>
          <p className="text-lg text-gray-500">@elonmusk</p>
        </div>
        <p className="px-5 text-center text-gray-300 line-clamp-3">
          Let's make humanity interplanetary! 🚀
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-around w-full py-3 border-socialTextSecondary">
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">24</p>
            <p className="text-socialTextSecondary">Following</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">71,563</p>
            <p className="text-socialTextSecondary">Followers</p>
          </div>
        </div>
        <button className="grid w-full py-4 text-blue-500 rounded-bl-lg rounded-br-lg place-items-center hover:bg-socialPrimaryHover">
          My Profile
        </button>
      </div>
    </div>
  );
}
