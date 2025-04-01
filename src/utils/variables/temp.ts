import {
  TCollection,
  TCollectionItem,
  TPost,
  TPostComment,
} from "../types/social/social";

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
      avatar:
        "https://creatorset.com/cdn/shop/files/preview_images/Screenshot_2024-04-24_173231_530x@2x.png?v=1713973028",
    },
    media: {
      id: "media1",
      title: "Attack on Titan",
      description:
        "Many years ago, the last remnants of humanity were forced to retreat behind the towering walls of a fortified city to escape the massive, man-eating Titans that roamed the land outside their fortress. Only the heroic members of the Scouting Legion dared to stray beyond the safety of the walls – but even those brave warriors seldom returned alive. Those within the city clung to the illusion of a peaceful existence until the day that dream was shattered, and their slim chance at survival was reduced to one horrifying choice: kill – or be devoured!",
      type: "ANIME",
      posterImage:
        "https://image.tmdb.org/t/p/original/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
      coverImage:
        "https://image.tmdb.org/t/p/original/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg",
      year: "2013",
      rating: "9.5",
      status: "Completed",
      // createdAt: new Date("2023-12-01T10:00:00Z"),
    },
    collection: null,
    createdAt: "",
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
      avatar: "https://i.redd.it/91ofcs730ij61.png",
    },
    media: null,
    collection: {
      id: "collection1",
      owner: {
        id: "user2",
        username: "Ria Cordero",
        handle: "riacordero",
        avatar: "https://i.redd.it/91ofcs730ij61.png",
      },
      name: "Top Movies",
      privacy: "PUBLIC",
      photo: null,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum id voluptatem reiciendis corporis iusto cumque veritatis voluptatum, inventore officia perspiciatis quod in ratione autem molestias.",
      previewMedias: [
        {
          title: "Alien Romulus",
          type: "MOVIE",
          year: "2024",
          coverImage:
            "https://image.tmdb.org/t/p/original/iJaSpQNZ8GsqVDWfbCXmyZQXZ5l.jpg",
          posterImage:
            "https://image.tmdb.org/t/p/original/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
        },
        {
          title: "Breaking Bad",
          type: "TV",
          year: "2008",
          posterImage:
            "https://image.tmdb.org/t/p/original/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
          coverImage:
            "https://image.tmdb.org/t/p/original/gc8PfyTqzqltKPW3X0cIVUGmagz.jpg",
        },
      ],
    },
    createdAt: "",
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
      username: "Librong Jems",
      handle: "thegoat",
      avatar:
        "https://b.fssta.com/uploads/application/nba/headshots/1120.vresize.350.350.medium.27.png",
    },
    media: {
      id: "media2",
      title: "Breaking Bad",
      description:
        "Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
      type: "TV",
      posterImage:
        "https://image.tmdb.org/t/p/original/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
      coverImage:
        "https://image.tmdb.org/t/p/original/gc8PfyTqzqltKPW3X0cIVUGmagz.jpg",
      year: "2008",
      rating: "9.8",
      status: "Completed",
      // createdAt: new Date("2023-12-04T09:00:00Z"),
    },
    collection: null,
    createdAt: "",
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
      username: "Jeff The Killer",
      handle: "jeffthekiller",
      avatar:
        "https://assets.bigcartel.com/account_images/1265378/KawaiiNekoCo_LogoSymbol.png?auto=format&fit=max&h=1200&w=1200",
    },
    media: null,
    collection: null,
    createdAt: "",
  },
];

export const tempPostComments: TPostComment[] = [
  {
    id: "1",
    author: {
      id: "1",
      handle: "thebigguy",
      username: "The Big Guy",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuDSrq5ajYlrjwPGHl1BGcHSUAOEGHM535mBuAWzuttq6JF3LFINBpp3kmMUZU8DHRJKw&usqp=CAU",
    },
    content: "Awesome bro what the fuckkkkk",
    createdAt: "",
    postId: "2",
  },
  {
    id: "2",
    author: {
      id: "777",
      handle: "rikitiu",
      username: "Riki Tiu",
      avatar:
        "https://creatorset.com/cdn/shop/files/preview_images/Screenshot_2024-04-24_173231_530x@2x.png?v=1713973028",
    },
    content: "FIRE SHEESHH!!!",
    createdAt: "",
    postId: "2",
  },
  {
    id: "3",
    author: {
      id: "999",
      handle: "riacordero",
      username: "Ria Cordero",
      avatar: "https://i.redd.it/91ofcs730ij61.png",
    },
    content: "Burikaaaaaaaaaaaaat!",
    createdAt: "",
    postId: "2",
  },
];

export const tempCollections: TCollection[] = [
  {
    id: "1",
    name: "my top 10 movies",
    photo: null,
    description: "This is my most favorite movies",
    previewMedias: [
      {
        title: "The Wild Robot",
        type: "MOVIE",
        year: "2024",
        posterImage:
          "https://image.tmdb.org/t/p/original/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
        coverImage:
          "https://image.tmdb.org/t/p/original/mQZJoIhTEkNhCYAqcHrQqhENLdu.jpg",
      },
      {
        title: "Venom: The Last Dance",
        type: "MOVIE",
        year: "2024",
        posterImage:
          "https://image.tmdb.org/t/p/original/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
        coverImage:
          "https://image.tmdb.org/t/p/original/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg",
      },
      {
        title: "Fight Club",
        type: "MOVIE",
        year: "1999",
        posterImage:
          "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        coverImage:
          "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
      },
      {
        title: "Arena Wars",
        type: "MOVIE",
        year: "2024",
        posterImage:
          "https://image.tmdb.org/t/p/original/4dRtXjk1rcsZlaMJpBn6Nh9cTfO.jpg",
        coverImage:
          "https://image.tmdb.org/t/p/original/5O0mkQGfOQM4OktFOCep9YmXK79.jpg",
      },
    ],
    privacy: "FRIENDS_ONLY",
    owner: tempPosts[0].owner,
  },
  {
    id: "2",
    name: "goated films",
    description: "ts goated",
    photo: null,
    previewMedias: [
      {
        title: "The Substance",
        type: "MOVIE",
        year: "2024",
        coverImage:
          "https://image.tmdb.org/t/p/original/7h6TqPB3ESmjuVbxCxAeB1c9OB1.jpg",
        posterImage:
          "https://image.tmdb.org/t/p/original/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
      },
      {
        title: "Alien Romulus",
        type: "MOVIE",
        year: "2024",
        coverImage:
          "https://image.tmdb.org/t/p/original/iJaSpQNZ8GsqVDWfbCXmyZQXZ5l.jpg",
        posterImage:
          "https://image.tmdb.org/t/p/original/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
      },
      {
        title: "Moana",
        type: "MOVIE",
        year: "2024",
        coverImage:
          "https://image.tmdb.org/t/p/original/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg",
        posterImage:
          "https://image.tmdb.org/t/p/original/4YZpsylmjHbqeWzjKpUEF8gcLNW.jpg",
      },
      {
        title: "Despicable Me 4",
        year: "2024",
        type: "MOVIE",
        coverImage:
          "https://image.tmdb.org/t/p/original/lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
        posterImage:
          "https://image.tmdb.org/t/p/original/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      },
    ],
    privacy: "PUBLIC",
    owner: tempPosts[0].owner,
  },
  {
    id: "3",
    name: "bruh",
    description: "idk",
    previewMedias: [],
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRere1avdwT5CfQCpT0bRsT24SnWZFRMMOZXw&s",
    privacy: "FRIENDS_ONLY",
    owner: tempPosts[0].owner,
  },
  {
    id: "4",
    name: "best anime",
    description: "best animes OAT",
    photo: null,
    previewMedias: [
      {
        title: "Your Name",
        year: "2016",
        type: "MOVIE",
        posterImage:
          "https://image.tmdb.org/t/p/original/vfJFJPepRKapMd5G2ro7klIRysq.jpg",
        coverImage:
          "https://image.tmdb.org/t/p/original/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg",
      },
      {
        title: "A Silent Voice",
        year: "2017",
        type: "MOVIE",
        posterImage:
          "https://image.tmdb.org/t/p/original/tuFaWiqX0TXoWu7DGNcmX3UW7sT.jpg",
        coverImage:
          "https://image.tmdb.org/t/p/original/5lAMQMWpXMsirvtLLvW7cJgEPkU.jpg",
      },
      {
        title: "Bleach: The Movie",
        year: "2014",
        type: "MOVIE",
        posterImage:
          "https://image.tmdb.org/t/p/original/pd7V5iCB19VBPJkihxFXFwSRW2M.jpg",
        coverImage:
          "https://image.tmdb.org/t/p/original/5KGQEaE519pOD9DltmWBo6OcuH1.jpg",
      },
    ],
    privacy: "FRIENDS_ONLY",
    owner: tempPosts[0].owner,
  },
  {
    id: "5",
    name: "just shrek lorem ipsum dolor sit amet lorem ipsum dolor",
    photo: null,
    description: "just shrek lorem ipsum dolor sit amet",
    previewMedias: [
      {
        title: "Shrek",
        year: "2002",
        type: "MOVIE",
        posterImage:
          "https://image.tmdb.org/t/p/original/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
        coverImage:
          "https://image.tmdb.org/t/p/original/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
      },
      {
        title: "Shrek 2",
        year: "2004",
        type: "MOVIE",
        posterImage:
          "https://image.tmdb.org/t/p/original/2yYP0PQjG8zVqturh1BAqu2Tixl.jpg",
        coverImage:
          "https://image.tmdb.org/t/p/original/8ohobj5lAIbl5XWw11FywS3IRrS.jpg",
      },
      {
        title: "Shrek Forever After",
        year: "2011",
        type: "MOVIE",
        posterImage:
          "https://image.tmdb.org/t/p/original/6HrfPZtKcGmX2tUWW3cnciZTaSD.jpg",
        coverImage:
          "https://image.tmdb.org/t/p/original/xZ2we4gdiwQmg6D1w9qHlAm5yIf.jpg",
      },
    ],
    privacy: "FRIENDS_ONLY",
    owner: tempPosts[0].owner,
  },
];

export const tempCollectionItems: TCollectionItem[] = [
  {
    id: "1",
    collectionId: "1",
    media: {
      id: "1",
      coverImage:
        "https://artworks.thetvdb.com/banners/fanart/original/79481-17.jpg",
      // createdAt: new Date(),
      posterImage:
        "https://artworks.thetvdb.com/banners/v4/series/79481/posters/6149bfa178b20.jpg",
      rating: "8.8",
      status: null,
      title: "Death Note",
      description:
        "Light Yagami is an ace student with great prospects—and he’s bored out of his mind. But all that changes when he finds the Death Note, a notebook dropped by a rogue Shinigami death god. Any human whose name is written in the notebook dies, and Light has vowed to use the power of the Death Note to rid the world of evil. But will Light succeed in his noble goal, or will the Death Note turn him into the very thing he fights against?",
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
      // createdAt: new Date(),
      posterImage:
        "https://image.tmdb.org/t/p/original/cioNnsPSHJH9gsUSETPFHh0m6MT.jpg",
      rating: "8.5",
      status: null,
      title: "The Wild Robot",
      description:
        "After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.",
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
      // createdAt: new Date(),
      posterImage:
        "https://image.tmdb.org/t/p/original/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
      rating: "8.8",
      status: null,
      title: "Alien: Romulus",
      description:
        "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.",
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
      // createdAt: new Date(),
      posterImage:
        "https://image.tmdb.org/t/p/original/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg",
      rating: "8.8",
      status: null,
      title: "The Boys",
      description:
        "A group of vigilantes known informally as “The Boys” set out to take down corrupt superheroes with no more than blue-collar grit and a willingness to fight dirty.",
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
      // createdAt: new Date(),
      posterImage:
        "https://image.tmdb.org/t/p/original/vfJFJPepRKapMd5G2ro7klIRysq.jpg",
      rating: "8.8",
      status: null,
      title: "Your Name.",
      description:
        "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.",
      type: "ANIME",
      year: "2016",
    },
  },
];
