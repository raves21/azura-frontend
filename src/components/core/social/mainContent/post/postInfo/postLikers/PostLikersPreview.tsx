import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { EntityOwner } from "@/utils/types/social/shared";
import PostLikersDialog from "./PostLikersDialog";
import { useParams } from "@tanstack/react-router";

type Props = {
  postFirstLikers: Omit<EntityOwner, "handle">[];
  totalLikes: number;
};

export default function PostLikersPreview({
  postFirstLikers,
  totalLikes,
}: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  const { postId } = useParams({
    from: "/_protected/social/$userHandle/posts/$postId/",
  });

  return (
    <button
      onClick={() => toggleOpenDialog(<PostLikersDialog postId={postId} />)}
      className="flex items-center w-full gap-2 mobile-m:gap-3 group"
    >
      <img
        src={postFirstLikers[0].avatar || "/no-image-2.jpg"}
        className="object-cover rounded-full size-[18px] mobile-m:size-5"
      />
      <p className="text-xs font-light text-gray-400 mobile-m:text-sm group-hover:underline group-hover:underline-offset-2">
        Liked by
        <span className="font-medium text-mainWhite">
          &nbsp;
          {postFirstLikers[0].username}
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
