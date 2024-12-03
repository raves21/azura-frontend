import CollectionNameAndDescription from "./CollectionNameAndDescription";
import CollectionOwnerInfo from "./CollectionOwner";
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
      <div className="flex flex-col justify-center">
        <CollectionNameAndDescription name="goated movies OAT" description="" />
        <CollectionOwnerInfo />
      </div>
    </div>
  );
}
