import Collection from "@/components/shared/social/mainContent/collection/Collection";
import { TCollection } from "@/utils/types/social/shared";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/social/profile/$userName/collections/"
)({
  component: () => <ProfileCollectionsPage />,
});

const tempCollections: TCollection[] = [
  {
    id: "1",
    name: "my top 10 movies",
    description: "This is my most favorite movies",
    previewPosters: [
      "https://raves-movies.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FwTnV3PCVW5O92JMrFvvrRcV39RU.jpg&w=1920&q=10",
      "https://raves-movies.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Faosm8NMQ3UyoBVpSxyimorCQykC.jpg&w=1920&q=10",
      "https://raves-movies.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FpB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg&w=1920&q=10",
      "https://raves-movies.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F4dRtXjk1rcsZlaMJpBn6Nh9cTfO.jpg&w=1920&q=10",
    ],
    privacy: "FRIENDS_ONLY",
  },
  {
    id: "2",
    name: "goated films",
    description: "ts goated",
    previewPosters: [
      "https://raves-movies.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FlqoMzCcZYEFK729d6qzt349fB4o.jpg&w=1920&q=10",
      "https://raves-movies.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fb33nnKl1GSFbao4l3fZDDqsMx0F.jpg&w=1920&q=10",
      "https://raves-movies.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F4YZpsylmjHbqeWzjKpUEF8gcLNW.jpg&w=1920&q=10",
      "https://raves-movies.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FwWba3TaojhK7NdycRhoQpsG0FaH.jpg&w=1920&q=10",
    ],
    privacy: "PUBLIC",
  },
  {
    id: "3",
    name: "bruh",
    description: "idk",
    previewPosters: [],
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRere1avdwT5CfQCpT0bRsT24SnWZFRMMOZXw&s",
    privacy: "FRIENDS_ONLY",
  },
  {
    id: "4",
    name: "best anime",
    description: "best animes OAT",
    previewPosters: [
      "https://raves-movies.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FvfJFJPepRKapMd5G2ro7klIRysq.jpg&w=1920&q=10",
      "https://raves-movies.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FtuFaWiqX0TXoWu7DGNcmX3UW7sT.jpg&w=1920&q=10",
      "https://raves-movies.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fpd7V5iCB19VBPJkihxFXFwSRW2M.jpg&w=1920&q=10",
    ],
    privacy: "FRIENDS_ONLY",
  },
  {
    id: "5",
    name: "just shrek lorem ipsum dolor sit amet lorem ipsum dolor",
    description: "just shrek lorem ipsum dolor sit amet",
    previewPosters: [
      "https://raves-movies.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FiB64vpL3dIObOtMZgX3RqdVdQDc.jpg&w=1920&q=10",
      "https://raves-movies.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F2yYP0PQjG8zVqturh1BAqu2Tixl.jpg&w=1920&q=10",
      "https://raves-movies.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F6HrfPZtKcGmX2tUWW3cnciZTaSD.jpg&w=1920&q=10",
    ],
    privacy: "FRIENDS_ONLY",
  },
];

function ProfileCollectionsPage() {
  return (
    <div className="grid w-full grid-cols-3 gap-3 p-5 pb-8 rounded-lg bg-socialPrimary">
      {tempCollections.map((collection) => (
        <Collection
          key={collection.id}
          name={collection.name}
          previewPosters={collection.previewPosters}
          photo={collection.photo}
        />
      ))}
    </div>
  );
}
