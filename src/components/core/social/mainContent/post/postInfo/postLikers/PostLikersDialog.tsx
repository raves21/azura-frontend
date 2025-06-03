import UserListItemSkeleton from "@/components/core/loadingSkeletons/social/UserListItemSkeleton";
import UserListItem from "@/components/core/social/shared/UserListItem";
import GlobalDialogHeader from "@/components/global/shared/GlobalDialogHeader";
import GlobalDialogHeaderCloseButton from "@/components/global/shared/GlobalDialogHeaderCloseButton";
import GlobalDialogHeaderTitle from "@/components/global/shared/GlobalDialogHeaderTitle";
import { usePostLikes } from "@/services/social/api/queries";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Fragment } from "react/jsx-runtime";

type Props = {
  postId: string;
};

export default function PostLikersDialog({ postId }: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  const {
    data: postLikes,
    isPending: isPostLikesPending,
    error: postLikesError,
    fetchNextPage,
    isFetchingNextPage,
  } = usePostLikes(postId);

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);

  if (postLikesError) {
    return (
      <div className="md:aspect-square relative w-dvw h-dvh md:h-[500px] bg-socialPrimary md:w-[500px] overflow-hidden text-mainWhite rounded-lg flex flex-col">
        <GlobalDialogHeader>
          <GlobalDialogHeaderTitle>Liked by</GlobalDialogHeaderTitle>
          <GlobalDialogHeaderCloseButton
            onClick={() => toggleOpenDialog(null)}
          />
        </GlobalDialogHeader>
        <div className="size-full grid place-items-center text-center">
          <p className="text-base sm:text-lg font-medium text-socialTextSecondary">
            An error occured.
          </p>
        </div>
      </div>
    );
  }

  if (isPostLikesPending) {
    return (
      <div className="md:aspect-square relative w-dvw h-dvh md:h-[500px] bg-socialPrimary md:w-[500px] overflow-hidden text-mainWhite rounded-lg flex flex-col">
        <GlobalDialogHeader>
          <GlobalDialogHeaderTitle>Liked by</GlobalDialogHeaderTitle>
          <GlobalDialogHeaderCloseButton
            onClick={() => toggleOpenDialog(null)}
          />
        </GlobalDialogHeader>
        <div className="flex flex-col flex-grow overflow-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <UserListItemSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (postLikes) {
    return (
      <div className="md:aspect-square relative w-dvw h-dvh md:h-[500px] bg-socialPrimary md:w-[500px] overflow-hidden text-mainWhite rounded-lg flex flex-col">
        <GlobalDialogHeader>
          <GlobalDialogHeaderTitle>Liked by</GlobalDialogHeaderTitle>
          <GlobalDialogHeaderCloseButton
            onClick={() => toggleOpenDialog(null)}
          />
        </GlobalDialogHeader>
        <div className="flex flex-col flex-grow overflow-auto">
          {postLikes.pages.map((page) => (
            <Fragment key={page.page}>
              {page.data.map((postLiker, index) => (
                <UserListItem key={index} {...postLiker.user} />
              ))}
              <div ref={bottomPageRef} key={"bottom of page"}>
                {isFetchingNextPage && (
                  <>
                    <UserListItemSkeleton />
                    <UserListItemSkeleton />
                  </>
                )}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    );
  }
}
