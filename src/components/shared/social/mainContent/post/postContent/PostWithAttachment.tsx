import {
  PostWithCollectionAttachment,
  PostWithMediaAttachment,
} from "@/utils/types/social/social";
import MediaAttachment from "./MediaAttachment";
import CollectionAttachment from "./CollectionAttachment";
import { cn } from "@/lib/utils";

type PostWithAttachmentProps = {
  contentClassName?: string;
} & (PostWithCollectionAttachment | PostWithMediaAttachment);

export default function PostWithAttachment({
  contentClassName,
  ...props
}: PostWithAttachmentProps) {
  return (
    <div className="flex flex-col w-full gap-3">
      {props.content && (
        <p className={cn("text-gray-300", contentClassName)}>{props.content}</p>
      )}
      {props.attachmentType === "media" ? (
        <MediaAttachment media={props.media} />
      ) : (
        <CollectionAttachment
          owner={props.owner}
          collection={props.collection}
        />
      )}
    </div>
  );
}
