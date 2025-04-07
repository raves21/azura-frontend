import { LinkProps } from "@tanstack/react-router";
import BackButton from "../../BackButton";
import ActivitySkeleton from "./ActivitySkeleton";
import PostCommentsSkeleton from "./PostCommentsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  withAttachment: boolean;
  linkProps: LinkProps;
};

export default function PostInfoSkeleton({ withAttachment, linkProps }: Props) {
  return (
    <div className="flex flex-col w-full gap-2 mb-24 overflow-hidden rounded-lg bg-socialPrimary">
      <div className="flex flex-col w-full gap-8 px-3 py-4 sm:p-5">
        <div className="flex items-center gap-4 mobile-l:gap-5">
          <BackButton
            arrowIconClassName="size-6 mobile-m:size-[26px]"
            linkProps={linkProps}
          />
          <p className="text-base font-semibold mobile-m:text-lg">Post</p>
        </div>
        <ActivitySkeleton type="post" withAttachment={withAttachment} />
      </div>
      <div className="flex items-center w-full gap-3 px-5">
        <Skeleton className="bg-gray-700 rounded-full size-[38px]" />
        <Skeleton className="flex-grow h-8 mr-12 bg-gray-700 rounded-2xl" />
      </div>
      <PostCommentsSkeleton />
    </div>
  );
}
