import BackButton from "@/components/shared/BackButton";
import CollectionActions from "@/components/shared/social/mainContent/collection/collectionInfoHeader/CollectionActions";
import CollectionInfoHeader from "@/components/shared/social/mainContent/collection/collectionInfoHeader/CollectionInfoHeader";
import CollectionItems from "@/components/shared/social/mainContent/collection/collectionItem/CollectionItems";
import { TCollectionItem } from "@/utils/types/social/social";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/social/profile/$userName/collections/$collectionId/"
)({
  component: () => <CollectionInfoPage />,
});

const tempCollectionItems: TCollectionItem[] = [
  {
    id: "1",
    collectionId: "1",
    media: {
      id: "1",
      coverImage:
        "https://artworks.thetvdb.com/banners/fanart/original/79481-17.jpg",
      createdAt: new Date(),
      posterImage:
        "https://artworks.thetvdb.com/banners/v4/series/79481/posters/6149bfa178b20.jpg",
      rating: "8.8",
      status: null,
      title: "Death Note",
      type: "ANIME",
      year: "2006",
    },
  },
  {
    id: "2",
    collectionId: "1",
    media: {
      id: "2",
      coverImage:
        "https://image.tmdb.org/t/p/original/f6G8QPeod5ngQMs5Fe1O4LdphB7.jpg",
      createdAt: new Date(),
      posterImage:
        "https://image.tmdb.org/t/p/original/cioNnsPSHJH9gsUSETPFHh0m6MT.jpg",
      rating: "8.5",
      status: null,
      title: "The Wild Robot",
      type: "MOVIE",
      year: "2024",
    },
  },
  {
    id: "3",
    collectionId: "1",
    media: {
      id: "3",
      coverImage:
        "https://image.tmdb.org/t/p/original/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg",
      createdAt: new Date(),
      posterImage:
        "https://image.tmdb.org/t/p/original/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
      rating: "8.8",
      status: null,
      title: "Alien: Romulus",
      type: "MOVIE",
      year: "2024",
    },
  },
  {
    id: "4",
    collectionId: "1",
    media: {
      id: "4",
      coverImage:
        "https://image.tmdb.org/t/p/original/7cqKGQMnNabzOpi7qaIgZvQ7NGV.jpg",
      createdAt: new Date(),
      posterImage:
        "https://image.tmdb.org/t/p/original/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg",
      rating: "8.8",
      status: null,
      title: "The Boys",
      type: "TV",
      year: "2006",
    },
  },
  {
    id: "5",
    collectionId: "1",
    media: {
      id: "1",
      coverImage:
        "https://image.tmdb.org/t/p/original/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg",
      createdAt: new Date(),
      posterImage:
        "https://image.tmdb.org/t/p/original/vfJFJPepRKapMd5G2ro7klIRysq.jpg",
      rating: "8.8",
      status: null,
      title: "Your Name.",
      type: "ANIME",
      year: "2016",
    },
  },
];

function CollectionInfoPage() {
  return (
    <section className="flex flex-col w-full gap-8 p-5 mb-20 rounded-lg bg-socialPrimary">
      <BackButton
        linkProps={{
          to: "/social/profile/$userName/collections",
          params: {
            userName: "elonmusk",
          },
          replace: true,
        }}
      />
      <CollectionInfoHeader />
      <CollectionActions />
      <CollectionItems collectionItems={tempCollectionItems} />
    </section>
  );
}
