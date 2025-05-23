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

  return (
    <div
      className={cn("flex flex-col w-full gap-3", {
        "sm:pl-14": !matchRoute({ to: "/social/$userHandle/posts/$postId" }),
      })}
    >
      {props.content && (
        <p
          className={cn(
            "text-gray-300 line-clamp-2 text-sm mobile-m:text-md sm:text-base",
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
