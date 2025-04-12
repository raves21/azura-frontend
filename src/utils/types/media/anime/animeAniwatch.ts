export type AnimeInfoAniwatch = {
  info: Info;
  moreInfo: MoreInfo;
};

export type Info = {
  id: string;
  anilistId: number;
  malId: number;
  name: string;
  poster: string;
  description: string;
  stats: Stats;
  promotionalVideos: PromotionalVideo[];
  charactersVoiceActors: CharactersVoiceActor[];
};

export type CharactersVoiceActor = {
  character: Character;
  voiceActor: Character;
};

export type Character = {
  id: string;
  poster: string;
  name: string;
  cast: Cast;
};

export enum Cast {
  Japanese = "Japanese",
  Main = "Main",
  Supporting = "Supporting",
}

export type PromotionalVideo = {
  title: string;
  source: string;
  thumbnail: string;
};

export type Stats = {
  rating: string;
  quality: string;
  episodes: Episodes;
  type: string;
  duration: string;
};

export type Episodes = {
  sub: number;
  dub: number;
};

export type MoreInfo = {
  japanese: string;
  synonyms: string;
  aired: string;
  premiered: string;
  duration: string;
  status: string;
  malscore: string;
  genres: string[];
  studios: string;
  producers: string[];
};

export interface AniwatchEpisodes {
  data: AniwatchEpisode[];
}

export interface AniwatchEpisode {
  title: string;
  episodeId: string;
  number: number;
  isFiller: boolean;
}
