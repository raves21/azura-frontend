type WithPhotoProps = {
  type: "photo";
  photo: string;
};

type WithPreviewPostersProps = {
  type: "previewPosters";
  previewPosters: string[];
};

type CollectionPhotoProps = WithPhotoProps | WithPreviewPostersProps;

export default function CollectionPhoto(props: CollectionPhotoProps) {
  if (props.type === "photo") {
    return (
      <img
        src={props.photo}
        className="aspect-[1/1] object-cover size-52 shrink-0 rounded-md"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 shrink-0 aspect-[1/1] size-52 rounded-md overflow-hidden">
      {props.previewPosters.map((poster) => {
        return (
          <div className="overflow-hidden size-full" key={poster}>
            <img className="inset-0 object-cover size-full" src={poster} />
          </div>
        );
      })}
    </div>
  );
}
