import CollectionDetails from "./CollectionDetails";
import CollectionPhoto from "./CollectionPhoto";

const tempPreviewPosters = [
  "https://artworks.thetvdb.com/banners/v4/series/79481/posters/6149bfa178b20.jpg",
  "https://image.tmdb.org/t/p/original/cioNnsPSHJH9gsUSETPFHh0m6MT.jpg",
  "https://image.tmdb.org/t/p/original/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
  "https://image.tmdb.org/t/p/original/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg",
];

export default function CollectionInfoHeader() {
  return (
    <div className="flex gap-6">
      <CollectionPhoto
        type="previewPosters"
        previewPosters={tempPreviewPosters}
      />
      <CollectionDetails
        name="Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      />
    </div>
  );
}
