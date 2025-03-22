import { X, Check } from "lucide-react";

type UnfollowButtonProps = {
  type: "profilePage" | "userPreview";
  isHovering: boolean;
};

export default function Unfollow({ type, isHovering }: UnfollowButtonProps) {
  if (type === "profilePage") {
    return (
      <div className="w-min flex items-center self-end gap-2 px-4 py-2 font-semibold transition-colors border border-gray-600 rounded-full sm:px-5 lg:text-md hover:text-red-500 hover:border-red-500 lg:mt-2 sm:text-sm text-2xs mobile-m:text-xs hover:bg-red-500/20">
        {isHovering ? (
          <>
            <X className="size-3 sm:size-5 stroke-red-500" />
            <p>Unfollow</p>
          </>
        ) : (
          <>
            <Check className="size-3 sm:size-5 stroke-blue-500" />
            <p>Following</p>
          </>
        )}
      </div>
    );
  }
  return (
    <div className="w-[90px] py-3 ml-auto text-xs font-semibold transition-colors border border-gray-600 rounded-full h-min text-darkBg hover:bg-gray-400 hover:text-red-500 hover:border-red-500 hover:bg-red-500/20">
      {isHovering ? (
        <p>Unfollow</p>
      ) : (
        <p className="text-mainWhite">Following</p>
      )}
    </div>
  );
}
