import { cn } from "@/lib/utils";

type WithPhotoProps = {
  type: "photo";
  photo: string;
};

type WithPreviewPostersProps = {
  type: "previewPosters";
  previewPosters: string[];
};

type CollectionPhotoProps = {
  className?: string;
} & (WithPhotoProps | WithPreviewPostersProps);

export default function CollectionPhoto({
  className,
  ...props
}: CollectionPhotoProps) {
  const { type } = props;

  if (type === "previewPosters" && props.previewPosters.length === 0) {
    return (
      <div
        className={cn(
          "aspect-[1/1] size-52 shrink-0 rounded-md overflow-hidden",
          className
        )}
      >
        <img src="/no-image.png" className="object-cover size-full" />
      </div>
    );
  }

  if (type === "photo") {
    return (
      <div
        className={cn(
          "aspect-[1/1] size-52 shrink-0 rounded-md overflow-hidden",
          className
        )}
      >
        <img src={props.photo} className="object-cover size-full" />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "grid shrink-0 aspect-[1/1] gap-[0.5px] size-52 rounded-md overflow-hidden grid-cols-2",
        className
      )}
    >
      {props.previewPosters.map((poster, index) => {
        if (props.previewPosters.length === 3 && index === 0) {
          return (
            <div className="row-span-2 overflow-hidden" key={poster}>
              <img className="object-cover size-full" src={poster} />
            </div>
          );
        }
        return (
          <div className="overflow-hidden" key={poster}>
            <img className="object-cover size-full" src={poster} />
          </div>
        );
      })}
    </div>
  );
}
