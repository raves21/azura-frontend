import { Media } from "@/utils/types/social/social";

type MediaAttachmentProps = {
  media: Media;
};

export default function MediaAttachment({ media }: MediaAttachmentProps) {
  let coverImage: string;
  if (media.coverImage) coverImage = media.coverImage;
  else coverImage = media.posterImage;

  return (
    <div className="w-full overflow-hidden rounded-lg h-52">
      <div className="relative bg-blue-400 size-full">
        {
          <img
            src={coverImage}
            className="absolute inset-0 object-cover size-full"
          />
        }
      </div>
    </div>
  );
}
