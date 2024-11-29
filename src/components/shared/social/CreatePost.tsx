export default function CreatePost() {
  return (
    <div className="flex items-center gap-3 p-5 rounded-lg bg-socialPrimary">
      <img
        src="/sample-user-pfp.png"
        className="object-cover rounded-full size-11"
      />
      <button className="flex-grow p-3 rounded-lg bg-gray-800 hover:bg-[#323b4a] text-start">
        What's happening?
      </button>
    </div>
  );
}
