export default function ProfileDetails() {
  return (
    <div className="flex flex-col gap-4 px-3 sm:px-5">
      <button className="self-end px-4 py-2 transition-colors border border-gray-600 rounded-full lg:mt-2 sm:text-sm text-2xs mobile-m:text-xs hover:border-mainAccent hover:text-mainAccent hover:bg-socialPrimaryHover">
        Edit Profile
      </button>
      <div className="flex flex-col sm:mt-4">
        <p className="font-semibold text-md mobile-m:text-base sm:text-lg">
          Elon Musk
        </p>
        <p className="text-sm text-socialTextSecondary mobile-m:text-md sm:text-base">
          @elonmusk
        </p>
      </div>
      <p className="text-sm mobile-m:text-md sm:text-base">
        Let's make humanity interplanetary! 🚀
      </p>
      <div className="flex gap-6 text-sm mobile-m:text-md sm:text-base">
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
