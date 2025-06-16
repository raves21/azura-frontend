import {
  PostWithCollectionAttachment,
  PostWithMediaAttachment,
} from "@/utils/types/social/social";
import MediaAttachment from "./MediaAttachment";
import CollectionAttachment from "./CollectionAttachment";
import { cn } from "@/lib/utils";
import { useMatchRoute } from "@tanstack/react-router";
import ActivityContentRenderer from "../../activity/ActivityContentRenderer";

type Props = {
  contentClassName?: string;
} & (PostWithCollectionAttachment | PostWithMediaAttachment);

export default function PostWithAttachment({
  contentClassName,
  ...props
}: Props) {
  const matchRoute = useMatchRoute();

  const isPostInfoRoute = matchRoute({
    to: "/social/$userHandle/posts/$postId",
  });

  return (
    <div
      className={cn("flex flex-col w-full gap-3", {
        "sm:pl-14": !isPostInfoRoute,
      })}
    >
      {props.content && (
        <p
          className={cn(
            "text-gray-300 text-sm line-clamp-2 mobile-m:text-md sm:text-base",
            { "line-clamp-none": isPostInfoRoute },
            contentClassName
          )}
        >
          <ActivityContentRenderer content={props.content} />
        </p>
      )}
      {props.attachmentType === "media" ? (
        <MediaAttachment media={props.media} />
      ) : (
        <CollectionAttachment
          collection={props.collection}
          isCollectionAttachmentViewable={
            !!props.isCollectionAttachmentViewable
          }
        />
      )}
    </div>
  );
}
