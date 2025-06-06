import { cn } from "@/lib/utils";

type WithPhotoProps = {
  type: "photo";
  photo: string;
};

type WithPreviewPostersProps = {
  type: "previewPosters";
  previewPosters: string[];
};

type Props = {
  className?: string;
} & (WithPhotoProps | WithPreviewPostersProps);

export default function CollectionPhoto({ className, ...props }: Props) {
  const { type } = props;

  if (type === "previewPosters" && props.previewPosters.length === 0) {
    return (
      <div
        className={cn(
          "aspect-square size-52 shrink-0 rounded-md overflow-hidden",
          className
        )}
      >
        <img src="/no-image-2.jpg" className="object-cover size-full" />
      </div>
    );
  }

  if (type === "photo") {
    return (
      <div
        className={cn(
          "aspect-square size-52 shrink-0 rounded-md overflow-hidden",
          className
        )}
      >
        <img
          src={props.photo}
          onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
          className="object-cover size-full"
        />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "grid shrink-0 aspect-square gap-[0.5px] size-52 rounded-md overflow-hidden grid-cols-2",
        { "grid-cols-1": props.previewPosters.length === 1 },
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
