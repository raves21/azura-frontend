export default function CreatePost() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg mobile-m:py-4 sm:p-5 bg-socialPrimary">
      <img
        src="/sample-user-pfp.png"
        className="object-cover rounded-full size-[38px] md:size-11"
      />
      <button className="flex-grow py-2 mobile-m:text-base px-3 md:p-3 rounded-lg bg-gray-800 hover:bg-[#323b4a] text-start">
        What's happening?
      </button>
    </div>
  );
}
