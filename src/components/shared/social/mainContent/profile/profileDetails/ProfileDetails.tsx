export default function ProfileDetails() {
  return (
    <div className="flex flex-col gap-4 px-5">
      <button className="self-end px-4 py-3 text-sm transition-colors border border-gray-600 rounded-full hover:border-mainAccent hover:text-mainAccent hover:bg-socialPrimaryHover">
        Edit Profile
      </button>
      <div className="flex flex-col">
        <p className="text-lg font-semibold">Elon Musk</p>
        <p className="text-socialTextSecondary">@elonmusk</p>
      </div>
      <div>Let's make humanity interplanetary! 🚀</div>
      <div className="flex gap-6">
        <p>
          <span className="font-semibold">24&nbsp;</span>
          <span className="text-socialTextSecondary">following</span>
        </p>
        <p>
          <span className="font-semibold">17,456&nbsp;</span>
          <span className="text-socialTextSecondary">following</span>
        </p>
      </div>
    </div>
  );
}
