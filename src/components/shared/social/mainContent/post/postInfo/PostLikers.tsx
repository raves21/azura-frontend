export default function PostLikers() {
  return (
    <button className="flex items-center w-full gap-2 mobile-m:gap-3 group">
      <img
        src="/sample-user-pfp.png"
        className="object-cover rounded-full size-[18px] mobile-m:size-5"
      />
      <p className="text-xs font-light text-gray-400 mobile-m:text-sm group-hover:underline group-hover:underline-offset-2">
        Liked by <span className="font-medium text-mainWhite">knouki</span> and{" "}
        <span className="font-medium text-mainWhite">14,122</span> others
      </p>
    </button>
  );
}
