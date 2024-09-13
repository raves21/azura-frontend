
export type AnimeInfoAnizip = {
  titles: Titles;
  episodes: Episodes;
  episodeCount: number;
  specialCount: number;
  images: Image[];
};

export type Episodes = {
  [episodeNumber: string]: AnizipEpisode;
};

export type AnizipEpisode = {
  episodeNumber: number;
  title: {en: string};
  overview: string;
  image: string;
};

export type Image = {
  coverType: string;
  url: string;
};

export type Titles = {
  ja: string;
  en: string;
};
