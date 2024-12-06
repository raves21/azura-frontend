import { TPost, TPostComment } from "../types/social/social";

export const tempPosts: TPost[] = [
  {
    id: "1",
    content: "Loving this anime!",
    privacy: "PUBLIC",
    totalLikes: 120,
    totalComments: 45,
    isLikedByCurrentUser: false,
    owner: {
      id: "user1",
      username: "Riki Tiu",
      handle: "rikitiu",
    },
    media: {
      id: "media1",
      title: "Attack on Titan",
      type: "ANIME",
      posterImage:
        "https://image.tmdb.org/t/p/original/2Eq2CYTV8cAJeddla6vFgIlxIH6.jpg",
      coverImage:
        "https://image.tmdb.org/t/p/original/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg",
      year: "2013",
      rating: "9.5",
      status: "Completed",
      createdAt: new Date("2023-12-01T10:00:00Z"),
    },
    collection: null,
    createdAt: new Date("2023-12-02T08:30:00Z"),
  },
  {
    id: "2",
    content: "Here's my favorite movie collection!",
    privacy: "PUBLIC",
    totalLikes: 85,
    totalComments: 23,
    isLikedByCurrentUser: true,
    owner: {
      id: "user2",
      username: "Ria Cordero",
      handle: "riacordero",
    },
    media: null,
    collection: {
      id: "collection1",
      name: "Top Movies",
      privacy: "PUBLIC",
      photo:
        "https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg",
      description: "A collection of must-watch movies!",
      previewPosters: [
        {
          posterImage:
            "https://image.tmdb.org/t/p/original/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
          coverImage:
            "https://image.tmdb.org/t/p/original/gc8PfyTqzqltKPW3X0cIVUGmagz.jpg",
        },
        {
          coverImage:
            "https://image.tmdb.org/t/p/original/iJaSpQNZ8GsqVDWfbCXmyZQXZ5l.jpg",
          posterImage:
            "https://image.tmdb.org/t/p/original/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
        },
      ],
    },
    createdAt: new Date("2023-12-03T12:15:00Z"),
  },
  {
    id: "3",
    content: "Can't stop watching this series!",
    privacy: "PUBLIC",
    totalLikes: 15,
    totalComments: 0,
    isLikedByCurrentUser: true,
    owner: {
      id: "user3",
      username: "Alice Brown",
      handle: "alicebrown",
    },
    media: {
      id: "media2",
      title: "Breaking Bad",
      type: "TV",
      posterImage:
        "https://image.tmdb.org/t/p/original/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
      coverImage:
        "https://image.tmdb.org/t/p/original/7cqKGQMnNabzOpi7qaIgZvQ7NGV.jpg",
      year: "2008",
      rating: "9.8",
      status: "Completed",
      createdAt: new Date("2023-12-04T09:00:00Z"),
    },
    collection: null,
    createdAt: new Date("2023-12-05T14:00:00Z"),
  },
  {
    id: "4",
    content: "Bruh what the fuck",
    privacy: "PUBLIC",
    totalLikes: 15,
    totalComments: 0,
    isLikedByCurrentUser: false,
    owner: {
      id: "user4",
      username: "Jeff Killer",
      handle: "jeffthekiller",
    },
    media: null,
    collection: null,
    createdAt: new Date("2023-12-05T14:00:00Z"),
  },
];

export const tempPostComments: TPostComment[] = [
  {
    id: "1",
    author: {
      id: "1",
      handle: "@thebigguy",
      username: "The Big Guy",
    },
    content: "Awesome bro what the fuckkkkk",
    createdAt: new Date("2023-12-05T14:00:00Z"),
    postId: "2",
  },
  {
    id: "2",
    author: {
      id: "777",
      handle: "@rikitiu",
      username: "Riki Tiu",
    },
    content: "FIRE SHEESHH!!!",
    createdAt: new Date("2023-13-05T14:00:00Z"),
    postId: "2",
  },
  {
    id: "3",
    author: {
      id: "999",
      handle: "@riacordero",
      username: "Ria Cordero",
    },
    content: "Burikaaaaaaaaaaaaat!",
    createdAt: new Date("2023-14-05T14:00:00Z"),
    postId: "2",
  },
];
