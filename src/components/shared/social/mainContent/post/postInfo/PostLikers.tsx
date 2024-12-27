import { EntityOwner } from "@/utils/types/social/shared";

type PostLikersProps = {
  postFirstLiker: Pick<EntityOwner, "avatar" | "username">;
  totalLikes: number;
};

export default function PostLikers({
  postFirstLiker,
  totalLikes,
}: PostLikersProps) {
  return (
    <button className="flex items-center w-full gap-2 mobile-m:gap-3 group">
      <img
        src={postFirstLiker.avatar || "/no-image-2.jpg"}
        className="object-cover rounded-full size-[18px] mobile-m:size-5"
      />
      <p className="text-xs font-light text-gray-400 mobile-m:text-sm group-hover:underline group-hover:underline-offset-2">
        Liked by
        <span className="font-medium text-mainWhite">
          &nbsp;
          {postFirstLiker.username}
          &nbsp;
        </span>
        {totalLikes - 1 > 0 && (
          <>
            and
            <span className="font-medium text-mainWhite">
              &nbsp;{totalLikes - 1}&nbsp;
            </span>
            {totalLikes - 1 === 1 ? "other" : "others"}
          </>
        )}
      </p>
    </button>
  );
}
