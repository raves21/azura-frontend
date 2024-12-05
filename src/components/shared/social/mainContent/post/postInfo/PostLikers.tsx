export default function PostLikers() {
  return (
    <button className="flex items-center w-full gap-3 group">
      <img
        src="/sample-user-pfp.png"
        className="object-cover rounded-full size-5"
      />
      <p className="text-sm font-light text-gray-400 group-hover:underline group-hover:underline-offset-2">
        Liked by <span className="font-medium text-mainWhite">knouki</span> and{" "}
        <span className="font-medium text-mainWhite">14,122</span> others
      </p>
    </button>
  );
}
