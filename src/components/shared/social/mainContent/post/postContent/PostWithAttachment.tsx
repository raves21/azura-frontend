import {
  PostWithCollectionAttachment,
  PostWithMediaAttachment,
} from "@/utils/types/social/social";
import MediaAttachment from "./MediaAttachment";
import CollectionAttachment from "./CollectionAttachment";

type PostWithAttachmentProps =
  | PostWithCollectionAttachment
  | PostWithMediaAttachment;

export default function PostWithAttachment(props: PostWithAttachmentProps) {
  return (
    <div className="flex flex-col w-full gap-3">
      {props.content && <p className="text-gray-300">{props.content}</p>}
      {props.attachmentType === "media" ? (
        <MediaAttachment media={props.media} />
      ) : (
        <CollectionAttachment collection={props.collection} />
      )}
    </div>
  );
}
