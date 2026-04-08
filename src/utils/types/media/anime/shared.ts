// import { AniwatchEpisode } from "./animeAniwatch";
import { AnimeInfoAnizip, AnizipEpisodes } from "./animeAnizip";
import { ZencloudEpisode } from "./animeZencloud";

export type AnimeEpisodesData = {
  anizipEps: AnimeInfoAnizip;
};

export type ZencloudEpisodesData = {
  anizipEps: AnizipEpisodes;
  allZencloudEps: ZencloudEpisode[];
};
